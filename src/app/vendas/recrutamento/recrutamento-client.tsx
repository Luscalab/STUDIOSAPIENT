
'use client';

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
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
  Trophy,
  Building2,
  AlertCircle,
  Volume2,
  ShieldCheck,
  Target
} from "lucide-react";
import { evaluateSalesCandidate, type SalesEvaluationOutput } from "@/ai/flows/sales-evaluator-flow";
import { useFirebase, useFirestore, initiateAnonymousSignIn } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const LocalBrain = dynamic(
  () => import("@/components/ai/LocalBrain").then((mod) => mod.LocalBrain),
  { ssr: false, loading: () => <div className="h-12 w-full rounded-2xl bg-white/5 animate-pulse flex items-center justify-center text-[10px] font-black text-white/20 uppercase tracking-widest">Aguarde enquanto carrego o ambiente de recrutamento...</div> }
);

const STORAGE_KEY = "sapient_recruitment_v15";

export function RecrutamentoClient() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [pitchTranscription, setPitchTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  const recognitionRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.step < 4) {
          setStep(parsed.step || 1);
          setFormData(parsed.formData || { name: "", email: "", phone: "", objection: "" });
          setConsentAccepted(parsed.consentAccepted || false);
        }
      } catch (e) { console.error(e); }
    }
    if (auth) initiateAnonymousSignIn(auth);

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'pt-BR';

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              setPitchTranscription(prev => prev + ' ' + event.results[i][0].transcript);
            } else {
              currentTranscript += event.results[i][0].transcript;
            }
          }
        };
      }
    }
    
    return () => stopAllRecording();
  }, [auth]);

  useEffect(() => {
    if (step < 4) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        step, formData, consentAccepted
      }));
    }
  }, [step, formData, consentAccepted]);

  const stopAllRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecording = async () => {
    setAudioBase64(null);
    setAudioPreviewUrl(null);
    setPitchTranscription("");
    
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
        setIsProcessingAudio(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioPreviewUrl(URL.createObjectURL(audioBlob));

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioBase64(reader.result as string);
          setIsProcessingAudio(false);
        };
      };

      mediaRecorder.start();
      if (recognitionRef.current) recognitionRef.current.start();
      setIsRecording(true);
      toast({ title: "CAPTURA ATIVA", description: "O motor neural está ouvindo sua voz.", className: "bg-primary text-white font-black uppercase text-[9px]" });
    } catch (err) {
      toast({ title: "ERRO DE HARDWARE", description: "Microfone não encontrado ou bloqueado.", variant: "destructive" });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.name.trim() || !formData.email.trim() || !consentAccepted)) {
      toast({ title: "Dados Incompletos", description: "Preencha sua identificação e aceite os termos.", variant: "destructive" });
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
        pitchTranscription: pitchTranscription,
        objectionHandling: formData.objection
      });
      setEvaluation(result);
      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
          pitchTranscription: pitchTranscription,
          score: result.score,
          verdict: result.verdict,
          aiFeedback: result.feedback,
          timestamp: serverTimestamp()
        });
      }
      setStep(4);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      toast({ title: "Erro na Análise", description: "O motor de IA remoto falhou. Tente novamente.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase">Ambiente de Recrutamento</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Pipeline <span className="text-primary italic lowercase">neural.</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={cn("h-1 flex-1 rounded-full", step >= s ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação</h2>
                    <p className="text-white/40 text-sm">Insira seus dados para inicializar os modelos neurais.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Seu E-mail" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo de Acesso
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">
                      Autorizo o processamento de minha voz e dados por modelos de IA studiosapient.
                    </label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Próxima Etapa <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Building2 size={16} /> CLIENTE: Marmoraria Granito Fino</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">O "Boca a Boca" do Sr. Jorge</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Ele acredita que indicação é tudo. Você precisa explicar que o <strong>Google Meu Negócio</strong> gera chamadas imediatas de quem está buscando mármore <em>agora</em> no bairro dele.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button 
                    onClick={() => isRecording ? stopAllRecording() : startRecording()}
                    className={cn(
                      "h-32 w-32 rounded-full flex items-center justify-center transition-all shadow-2xl border-4",
                      isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105"
                    )}
                  >
                    {isRecording ? <MicOff size={40} /> : <Mic size={40} />}
                  </button>

                  <div className="text-center space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-white">
                      {isRecording ? "GRAVANDO..." : audioBase64 ? "ÁUDIO PRONTO" : "Pressione para Gravar Pitch"}
                    </p>
                  </div>

                  {audioPreviewUrl && !isRecording && (
                    <div className="w-full max-w-md space-y-4 text-center animate-in zoom-in">
                      <div className="h-px w-full bg-white/10" />
                      <p className="text-[9px] font-black uppercase text-cyan-400 flex items-center justify-center gap-2"><Volume2 size={12}/> Revisão de Pitch:</p>
                      <audio controls src={audioPreviewUrl} className="w-full h-12 rounded-full bg-white/5" />
                    </div>
                  )}
                </div>

                <LocalBrain text={pitchTranscription} />

                <Button 
                  onClick={handleNextStep} 
                  disabled={!audioBase64 || isRecording || isProcessingAudio}
                  className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] w-full md:w-auto shadow-xl disabled:opacity-30"
                >
                  {isProcessingAudio ? <Loader2 className="animate-spin" /> : "Confirmar Pitch"} <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20">
                  <p className="text-sm font-medium italic leading-relaxed text-white">
                    "O boca a boca sempre me serviu. Por que investir nisso agora? Parece gasto desnecessário."
                  </p>
                </div>

                <Textarea 
                  value={formData.objection} 
                  onChange={(e) => setFormData({...formData, objection: e.target.value})}
                  placeholder="Contorne a objeção focando em ROI e Escala..." 
                  className="bg-white/5 border-white/10 min-h-[200px] rounded-[2rem] p-8 font-bold text-lg"
                />
                
                <Button onClick={handleSubmit} disabled={isLoading} className="h-24 w-full bg-primary rounded-full font-black uppercase text-[12px] shadow-2xl">
                  {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Gerar Dossiê Final"} <Zap size={20} className="ml-2" />
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
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Dossiê: {evaluation.verdict}</h2>
                </div>
                <div className="p-10 rounded-[3rem] bg-primary text-white">
                  <h4 className="font-black uppercase text-xl mb-4">Feedback Diretor Lucas</h4>
                  <p className="text-lg font-medium leading-relaxed italic">"{evaluation.feedback}"</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-4">
                    <h5 className="text-[10px] font-black uppercase text-green-400">Pontos Fortes</h5>
                    {evaluation.strongPoints.map((p, i) => <div key={i} className="text-xs text-white/60 flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> {p}</div>)}
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 space-y-4">
                    <h5 className="text-[10px] font-black uppercase text-red-400">Pontos de Melhoria</h5>
                    {evaluation.weakPoints.map((p, i) => <div key={i} className="text-xs text-white/60 flex items-center gap-2"><AlertCircle size={12} className="text-red-500"/> {p}</div>)}
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={() => window.location.href = '/'} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px]">Voltar para Início</Button>
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
