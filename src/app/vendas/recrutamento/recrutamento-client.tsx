
'use client';

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Mic, 
  MicOff, 
  CheckCircle2, 
  Zap, 
  Loader2, 
  ChevronRight,
  BrainCircuit,
  MessageSquare,
  Trophy,
  Building2,
  AlertCircle,
  Volume2,
  ShieldCheck,
  RotateCcw,
  Search,
  PlayCircle,
  Info
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { evaluateSalesCandidate, type SalesEvaluationOutput } from "@/ai/flows/sales-evaluator-flow";
import { useFirebase, useFirestore, initiateAnonymousSignIn } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "sapient_recruitment_v6";

export function RecrutamentoClient() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMicDialog, setShowMicDialog] = useState(false);
  const [evaluation, setEvaluation] = useState<SalesEvaluationOutput | null>(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    objection: ""
  });

  const { toast } = useToast();
  const { auth } = useFirebase();
  const db = useFirestore();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.step < 4) {
          setStep(parsed.step || 1);
          setFormData(parsed.formData || { name: "", email: "", phone: "", objection: "" });
          setTranscription(parsed.transcription || "");
          setAudioBase64(parsed.audioBase64 || null);
          setConsentAccepted(parsed.consentAccepted || false);
        }
      } catch (e) { console.error(e); }
    }
    if (auth) initiateAnonymousSignIn(auth);
  }, [auth]);

  useEffect(() => {
    if (step < 4) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        step, formData, transcription, audioBase64, consentAccepted
      }));
    }
  }, [step, formData, transcription, audioBase64, consentAccepted]);

  const stopAllRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecording = async () => {
    setShowMicDialog(false);
    setIsProcessingAudio(true);
    setAudioBase64(null);
    setAudioPreviewUrl(null);
    setTranscription("");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const previewUrl = URL.createObjectURL(audioBlob);
        setAudioPreviewUrl(previewUrl);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioBase64(reader.result as string);
          setIsProcessingAudio(false);
        };
      };

      // Opcional: Transcrição ao vivo para feedback
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.lang = 'pt-BR';
        recognition.onresult = (event: any) => {
          let text = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) text += event.results[i][0].transcript;
          }
          if (text) setTranscription(prev => (prev + " " + text).trim());
        };
        recognition.start();
      }

      mediaRecorder.start();
      setIsRecording(true);
      toast({ title: "GRAVANDO", description: "Fale com clareza e autoridade.", className: "bg-primary text-white font-black uppercase text-[9px]" });
    } catch (err) {
      console.error(err);
      setIsProcessingAudio(false);
      toast({ title: "ERRO DE HARDWARE", description: "Microfone não encontrado ou bloqueado.", variant: "destructive" });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.name.trim() || !consentAccepted)) {
      toast({ title: "Atenção", description: "Preencha seu nome e aceite os termos.", variant: "destructive" });
      return;
    }
    if (step === 2 && !audioBase64) {
      toast({ title: "Atenção", description: "Grave seu áudio antes de prosseguir.", variant: "destructive" });
      return;
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!formData.objection.trim()) return;
    setIsLoading(true);
    try {
      const result = await evaluateSalesCandidate({
        candidateName: formData.name,
        pitchAudioUri: audioBase64!,
        pitchTranscription: transcription,
        objectionHandling: formData.objection
      });
      setEvaluation(result);
      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
          pitchTranscription: transcription,
          pitchAudioUri: audioBase64,
          score: result.score,
          verdict: result.verdict,
          aiFeedback: result.feedback,
          timestamp: serverTimestamp()
        });
      }
      setStep(4);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(error);
      toast({ title: "Erro na Análise", description: "Verifique sua conexão e tente novamente.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <AlertDialog open={showMicDialog} onOpenChange={setShowMicDialog}>
        <AlertDialogContent className="bg-[#121216] border-white/10 text-white rounded-[2.5rem]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl font-black uppercase flex items-center gap-3">
              <Mic className="text-primary" /> Ativar Microfone
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/50">
              O Studio Sapient avaliará sua autoridade e tom de voz. Você poderá ouvir sua gravação antes de enviar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white/50 rounded-full font-black text-[10px] uppercase">Agora não</AlertDialogCancel>
            <AlertDialogAction onClick={startRecording} className="bg-primary hover:bg-primary/90 rounded-full font-black text-[10px] uppercase">Iniciar Captura</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase">Recrutamento Estratégico</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase">Roleplay: <span className="text-primary italic lowercase">Sr. Jorge.</span></h1>
            </div>
            {step > 1 && step < 4 && (
              <button onClick={() => { localStorage.removeItem(STORAGE_KEY); window.location.reload(); }} className="text-[8px] font-black uppercase tracking-widest text-white/20 hover:text-white flex items-center gap-2">
                <RotateCcw size={12} /> Reiniciar Teste
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={cn("h-1 flex-1 rounded-full", step >= s ? "bg-primary" : "bg-white/10")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação Profissional</h2>
                  <p className="text-white/40 text-sm">Preencha seus dados para vincular à sua avaliação técnica.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="E-mail Profissional" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[9px]"><ShieldCheck size={16} /> LGPD & Proteção de Dados</div>
                  <div className="flex items-start gap-4">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} className="mt-1" />
                    <label htmlFor="consent" className="text-[10px] text-white/40 leading-relaxed cursor-pointer">
                      Autorizo o Studio Sapient a processar minha voz e respostas exclusivamente para este processo seletivo. Seus dados estão blindados e não serão compartilhados.
                    </label>
                  </div>
                </div>
                <Button onClick={handleNextStep} className="h-16 px-12 bg-primary rounded-full font-black uppercase text-[10px] shadow-xl">Começar Simulação <ChevronRight size={16} /></Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Building2 size={16} /> CLIENTE: Marmoraria Granito Fino</div>
                  <h3 className="text-2xl font-black uppercase">Cenário Sr. Jorge</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Marmoraria de elite. O Sr. Jorge é prático e acha que design é luxo desnecessário. 
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                      <h4 className="text-[9px] font-black uppercase text-cyan-400 mb-2 flex items-center gap-2"><AlertCircle size={12}/> Gargalos Técnicos</h4>
                      <ul className="text-[10px] text-white/40 space-y-1 list-disc pl-4">
                        <li>Site não abre em celular (85% do tráfego).</li>
                        <li>GMN abandonado (perda de visibilidade local).</li>
                        <li>Branding amador afasta arquitetos de luxo.</li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                      <h4 className="text-[9px] font-black uppercase text-primary mb-2 flex items-center gap-2"><Info size={12}/> Google Meu Negócio</h4>
                      <p className="text-[10px] text-white/40 leading-relaxed">É a vitrine local. Se o Sr. Jorge não aparece bem no Maps, ele está "invisível" para quem busca marmoraria na região.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button 
                    onClick={() => isRecording ? stopAllRecording() : setShowMicDialog(true)}
                    disabled={isProcessingAudio}
                    className={cn(
                      "h-28 w-28 rounded-full flex items-center justify-center transition-all shadow-2xl relative",
                      isRecording ? "bg-red-500 scale-110" : "bg-primary text-white hover:scale-105",
                      isProcessingAudio && "opacity-50"
                    )}
                  >
                    {isRecording ? <MicOff size={32} className="animate-pulse" /> : <Mic size={32} />}
                  </button>

                  {isProcessingAudio && (
                    <div className="flex items-center gap-2 text-primary animate-pulse">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Processando Áudio...</span>
                    </div>
                  )}

                  {audioPreviewUrl && !isRecording && !isProcessingAudio && (
                    <div className="w-full max-w-md space-y-4 text-center animate-in zoom-in">
                      <p className="text-[9px] font-black uppercase text-green-400 flex items-center justify-center gap-2"><Volume2 size={12}/> Áudio Pronto. Ouça antes de prosseguir:</p>
                      <audio controls src={audioPreviewUrl} className="w-full h-10 rounded-full" />
                    </div>
                  )}
                  
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    {isRecording ? "Gravando Pitch..." : audioBase64 ? "Pitch Gravado com Sucesso" : "Clique para iniciar seu pitch de abordagem"}
                  </p>
                </div>

                <Button 
                  onClick={handleNextStep} 
                  disabled={!audioBase64 || isRecording || isProcessingAudio}
                  className="h-16 px-12 bg-primary rounded-full font-black uppercase text-[10px] w-full md:w-auto shadow-xl transition-all disabled:opacity-30"
                >
                  Confirmar Abordagem <ChevronRight size={16} />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-3 text-orange-400 font-black uppercase text-[10px] mb-4"><MessageSquare size={16} /> Objeção do Sr. Jorge</div>
                  <p className="text-sm font-medium italic leading-relaxed text-white">
                    "Meu filho, eu já vendo bem sem site há 30 anos. Por que eu gastaria com isso agora? O boca a boca é o que manda aqui."
                  </p>
                </div>
                <Textarea 
                  value={formData.objection} 
                  onChange={(e) => setFormData({...formData, objection: e.target.value})}
                  placeholder="Contorne a objeção focando em ROI e perda de mercado..." 
                  className="bg-white/5 border-white/10 min-h-[200px] rounded-[2rem] p-8 font-bold"
                />
                <Button onClick={handleSubmit} disabled={isLoading} className="h-20 w-full bg-primary rounded-full font-black uppercase text-[11px] shadow-2xl">
                  {isLoading ? <Loader2 className="animate-spin mr-3" /> : "Finalizar Análise IA"} <Zap size={16} className="ml-2" />
                </Button>
              </div>
            )}

            {step === 4 && evaluation && (
              <div className="space-y-12 animate-in zoom-in duration-700">
                <div className="text-center space-y-6">
                  <div className={cn(
                    "h-24 w-24 rounded-full flex items-center justify-center mx-auto shadow-2xl",
                    evaluation.verdict === 'APROVADO' ? "bg-green-500" : evaluation.verdict === 'TREINAMENTO' ? "bg-orange-500" : "bg-red-500"
                  )}>
                    {evaluation.verdict === 'APROVADO' ? <Trophy size={40} /> : <BrainCircuit size={40} />}
                  </div>
                  <h2 className="text-4xl font-black uppercase">Veredito: {evaluation.verdict}</h2>
                  <Badge variant="outline" className="text-white/40 border-white/10 px-6 py-2">Score de Autoridade: {evaluation.score}%</Badge>
                </div>
                <div className="p-10 rounded-[3rem] bg-primary text-white">
                  <h4 className="font-black uppercase text-xl mb-4">Feedback do Diretor Lucas</h4>
                  <p className="text-lg font-medium leading-relaxed italic">"{evaluation.feedback}"</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-4">
                    <h5 className="text-[10px] font-black uppercase text-green-400">Pontos Fortes</h5>
                    {evaluation.strongPoints.map((p, i) => <div key={i} className="text-xs text-white/60 flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> {p}</div>)}
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 space-y-4">
                    <h5 className="text-[10px] font-black uppercase text-red-400">Gargalos Identificados</h5>
                    {evaluation.weakPoints.map((p, i) => <div key={i} className="text-xs text-white/60 flex items-center gap-2"><AlertCircle size={12} className="text-red-500"/> {p}</div>)}
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={() => window.location.href = '/'} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px]">Voltar ao Início</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
