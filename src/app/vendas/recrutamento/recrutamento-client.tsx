
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
  Lock
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

const STORAGE_KEY = "sapient_recruitment_v8";

export function RecrutamentoClient() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.step < 4) {
          setStep(parsed.step || 1);
          setFormData(parsed.formData || { name: "", email: "", phone: "", objection: "" });
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
        step, formData, audioBase64, consentAccepted
      }));
    }
  }, [step, formData, audioBase64, consentAccepted]);

  const stopAllRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecording = async () => {
    setShowMicDialog(false);
    setIsProcessingAudio(true); // Trava enquanto solicita permissão
    setAudioBase64(null);
    setAudioPreviewUrl(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setIsProcessingAudio(true); // Trava enquanto processa o blob final
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

      mediaRecorder.start();
      setIsRecording(true);
      setIsProcessingAudio(false); // Libera o botão para o usuário poder PARAR a gravação
      toast({ title: "GRAVANDO", description: "Fale com clareza e autoridade.", className: "bg-primary text-white font-black uppercase text-[9px]" });
    } catch (err) {
      console.error(err);
      setIsProcessingAudio(false);
      toast({ title: "ERRO DE HARDWARE", description: "Microfone não encontrado ou bloqueado pelo navegador.", variant: "destructive" });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.name.trim() || !formData.email.trim() || !consentAccepted)) {
      toast({ title: "Atenção", description: "Preencha seus dados e aceite os termos de privacidade para continuar.", variant: "destructive" });
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
        objectionHandling: formData.objection
      });
      setEvaluation(result);
      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
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
      toast({ title: "Erro na Análise", description: "Falha ao conectar com o motor de IA. Tente novamente.", variant: "destructive" });
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
              O Studio Sapient avaliará sua autoridade e tom de voz. Fale com o Sr. Jorge como se estivesse em uma reunião real. Garanta que seu navegador tenha permissão de acesso.
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase">Recrutamento de Elite</Badge>
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
                  <h2 className="text-2xl font-black uppercase tracking-tighter">1. Dados do Candidato</h2>
                  <p className="text-white/40 text-sm">Preencha seus dados oficiais e aceite os termos de segurança para liberar o hardware de avaliação.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Seu Melhor E-mail" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><Lock size={80} /></div>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo de Segurança Sapient (LGPD)
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] text-white/60 leading-relaxed font-medium">
                      Para participar deste processo seletivo, você deve concordar com o tratamento de seus dados. Sua voz será gravada e processada por nossos motores de IA exclusivamente para fins de avaliação comercial. Seus dados não serão compartilhados com terceiros e estão protegidos sob criptografia militar.
                    </p>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                      <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} className="mt-1" />
                      <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer">
                        CONCORDO COM OS TERMOS DE PRIVACIDADE E AUTORIZO A CAPTURA DE ÁUDIO PARA FINS DE RECRUTAMENTO.
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Avaliação Estratégica <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Building2 size={16} /> LEAD: Marmoraria Granito Fino</div>
                  <h3 className="text-2xl font-black uppercase">O Desafio do Sr. Jorge</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Marmoraria tradicional, 30 anos de mercado. O Sr. Jorge acredita que "site é frescura" e que o "boca a boca" é suficiente. Ele é prático e focado em lucro imediato.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                      <h4 className="text-[9px] font-black uppercase text-cyan-400 mb-2 flex items-center gap-2"><AlertCircle size={12}/> Gargalos Críticos</h4>
                      <ul className="text-[10px] text-white/40 space-y-1 list-disc pl-4">
                        <li>Site antigo não abre em celulares (perda de 85% dos orçamentos).</li>
                        <li>Invisível no Google Meu Negócio (Concorrência aparece primeiro).</li>
                        <li>Branding amador afasta arquitetos de projetos de luxo.</li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                      <h4 className="text-[9px] font-black uppercase text-primary mb-2 flex items-center gap-2"><Search size={12}/> O que é Google Meu Negócio?</h4>
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        É a ficha da empresa no Google Maps. Se o Sr. Jorge não está bem posicionado lá, ele não recebe chamadas de quem busca "Marmoraria perto de mim".
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02] relative">
                  <button 
                    onClick={() => isRecording ? stopAllRecording() : setShowMicDialog(true)}
                    disabled={isProcessingAudio}
                    className={cn(
                      "h-32 w-32 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-10",
                      isRecording ? "bg-red-500 scale-110 animate-pulse" : "bg-primary text-white hover:scale-105",
                      isProcessingAudio && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isRecording ? <MicOff size={40} /> : <Mic size={40} />}
                  </button>

                  <div className="text-center space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-white">
                      {isRecording ? "GRAVANDO... CLIQUE PARA PARAR" : audioBase64 ? "ÁUDIO CAPTURADO COM SUCESSO" : "INICIAR GRAVAÇÃO DO PITCH"}
                    </p>
                    <p className="text-[9px] text-white/30 uppercase font-black">
                      {isRecording ? "Sua voz está sendo capturada pelo motor Sapient" : "Grave sua abordagem comercial ao Sr. Jorge"}
                    </p>
                  </div>

                  {isProcessingAudio && (
                    <div className="flex items-center gap-2 text-primary animate-pulse">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Processando Áudio...</span>
                    </div>
                  )}

                  {audioPreviewUrl && !isRecording && !isProcessingAudio && (
                    <div className="w-full max-w-md space-y-4 text-center animate-in zoom-in px-4">
                      <div className="h-px w-full bg-white/10 mb-6" />
                      <p className="text-[9px] font-black uppercase text-green-400 flex items-center justify-center gap-2"><Volume2 size={12}/> Ouça seu pitch antes de confirmar:</p>
                      <audio controls src={audioPreviewUrl} className="w-full h-12 rounded-full bg-white/10" />
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleNextStep} 
                  disabled={!audioBase64 || isRecording || isProcessingAudio}
                  className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] w-full md:w-auto shadow-xl transition-all disabled:opacity-30 disabled:grayscale"
                >
                  Confirmar Abordagem Vocal <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-3 text-orange-400 font-black uppercase text-[10px] mb-4"><MessageSquare size={16} /> O Sr. Jorge questiona o valor:</div>
                  <p className="text-sm font-medium italic leading-relaxed text-white">
                    "Olha, eu já vendo bem sem site. O boca a boca sempre funcionou. Por que eu gastaria dinheiro com isso agora? Parece coisa de quem tem dinheiro sobrando."
                  </p>
                </div>
                <Textarea 
                  value={formData.objection} 
                  onChange={(e) => setFormData({...formData, objection: e.target.value})}
                  placeholder="Responda por escrito: Como você contorna essa objeção usando argumentos de ROI e os gargalos técnicos identificados?" 
                  className="bg-white/5 border-white/10 min-h-[200px] rounded-[2rem] p-8 font-bold text-lg"
                />
                <Button onClick={handleSubmit} disabled={isLoading} className="h-24 w-full bg-primary rounded-full font-black uppercase text-[12px] shadow-2xl">
                  {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Finalizar Análise de Autoridade"} <Zap size={20} className="ml-2" />
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
                  <h2 className="text-4xl font-black uppercase">Resultado: {evaluation.verdict}</h2>
                  <Badge variant="outline" className="text-white/40 border-white/10 px-6 py-2">Índice de Persuasão: {evaluation.score}%</Badge>
                </div>
                <div className="p-10 rounded-[3rem] bg-primary text-white">
                  <h4 className="font-black uppercase text-xl mb-4">Dossiê do Diretor Sapient</h4>
                  <p className="text-lg font-medium leading-relaxed italic">"{evaluation.feedback}"</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-4">
                    <h5 className="text-[10px] font-black uppercase text-green-400">Destaques Positivos</h5>
                    {evaluation.strongPoints.map((p, i) => <div key={i} className="text-xs text-white/60 flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> {p}</div>)}
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 space-y-4">
                    <h5 className="text-[10px] font-black uppercase text-red-400">Pontos de Gargalo Vocal/Técnico</h5>
                    {evaluation.weakPoints.map((p, i) => <div key={i} className="text-xs text-white/60 flex items-center gap-2"><AlertCircle size={12} className="text-red-500"/> {p}</div>)}
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={() => window.location.href = '/'} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px]">Encerrar Teste</Button>
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
