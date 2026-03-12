
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
  TrendingUp, 
  Loader2, 
  ChevronRight,
  BrainCircuit,
  MessageSquare,
  Trophy,
  Building2,
  AlertCircle,
  Volume2,
  ShieldCheck,
  Lock,
  RotateCcw
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

const STORAGE_KEY = "sapient_recruitment_v1";

export function RecrutamentoClient() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMicDialog, setShowMicDialog] = useState(false);
  const [evaluation, setEvaluation] = useState<SalesEvaluationOutput | null>(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    objection: ""
  });

  const { toast } = useToast();
  const { auth } = useFirebase();
  const db = useFirestore();
  
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Recuperar progresso ao montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStep(parsed.step || 1);
        setFormData(parsed.formData || { name: "", email: "", phone: "", objection: "" });
        setTranscription(parsed.transcription || "");
        setAudioBase64(parsed.audioBase64 || null);
        setConsentAccepted(parsed.consentAccepted || false);
        setEvaluation(parsed.evaluation || null);
        
        if (parsed.step > 1) {
          toast({
            title: "Progresso Recuperado",
            description: "Você voltou de onde parou.",
            className: "bg-primary text-white"
          });
        }
      } catch (e) {
        console.error("Erro ao carregar progresso:", e);
      }
    }

    if (auth) {
      initiateAnonymousSignIn(auth);
    }

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsBrowserSupported(false);
      }
    }
  }, [auth]);

  // Salvar progresso ao mudar estados
  useEffect(() => {
    const stateToSave = {
      step,
      formData,
      transcription,
      audioBase64,
      consentAccepted,
      evaluation
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [step, formData, transcription, audioBase64, consentAccepted, evaluation]);

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const stopAllRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsRecording(false);
  };

  const handleStartRecording = () => {
    if (!isBrowserSupported) {
      toast({ 
        title: "Navegador incompatível", 
        description: "O reconhecimento de voz requer Chrome, Edge ou Safari atualizado.", 
        variant: "destructive" 
      });
      return;
    }
    setShowMicDialog(true);
  };

  const confirmMicAccess = async () => {
    setShowMicDialog(false);
    try {
      // Solicitação explícita de permissão ao hardware
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioBase64(reader.result as string);
        };
      };

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        let fullTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript;
        }
        setTranscription(fullTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Erro reconhecimento:", event.error);
        if (event.error === 'not-allowed') {
          toast({ title: "Acesso Negado", description: "O microfone foi bloqueado pelo navegador.", variant: "destructive" });
        }
        stopAllRecording();
      };

      recognitionRef.current.onend = () => {
        // Se ainda deveria estar gravando, tenta reiniciar (evita silêncio parando o serviço)
        if (isRecording) {
           try { recognitionRef.current.start(); } catch(e) {}
        }
      };

      setTranscription("");
      setAudioBase64(null);
      
      recognitionRef.current.start();
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({ 
        title: "Sr. Jorge na Linha", 
        description: "O áudio está sendo capturado e transcrito.",
        className: "bg-primary text-white border-none font-bold"
      });
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
      toast({ 
        title: "Erro de Hardware", 
        description: "Não foi possível ativar o microfone. Verifique se ele está conectado ou se a permissão foi concedida.", 
        variant: "destructive" 
      });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopAllRecording();
    } else {
      handleStartRecording();
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        toast({ title: "Dados Incompletos", description: "Preencha seu nome e e-mail.", variant: "destructive" });
        return;
      }
      if (!consentAccepted) {
        toast({ title: "Aviso de Privacidade", description: "Você deve aceitar os termos de uso de dados para prosseguir.", variant: "destructive" });
        return;
      }
    }
    if (step === 2) {
      if (isRecording) {
        stopAllRecording();
      }
      if (!transcription.trim()) {
        toast({ title: "Pitch Necessário", description: "Grave seu áudio para prosseguir.", variant: "destructive" });
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!formData.objection.trim()) {
      toast({ title: "Atenção", description: "Sua resposta à objeção é fundamental para a avaliação.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const result = await evaluateSalesCandidate({
        candidateName: formData.name,
        pitchTranscription: transcription,
        objectionHandling: formData.objection
      });

      setEvaluation(result);

      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
          consentAccepted: true,
          consentTimestamp: new Date().toISOString(),
          pitchTranscription: transcription,
          pitchAudioUri: audioBase64,
          aiFeedback: result.feedback,
          score: result.score,
          verdict: result.verdict,
          strongPoints: result.strongPoints,
          weakPoints: result.weakPoints,
          timestamp: serverTimestamp()
        });
      }

      setStep(4);
      // Limpa cache ao finalizar com sucesso
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(error);
      toast({ title: "Falha na Análise", description: "Houve um erro ao processar sua avaliação. Tente novamente.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <AlertDialog open={showMicDialog} onOpenChange={setShowMicDialog}>
        <AlertDialogContent className="bg-[#121216] border-white/10 text-white rounded-[2.5rem] p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Mic className="text-primary" /> Ativar Dispositivo
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-base leading-relaxed">
              Precisamos de acesso ao seu microfone para capturar sua locução. Certifique-se de estar em um ambiente silencioso para melhor precisão da IA.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-transparent border-white/10 text-white/50 hover:bg-white/5 rounded-full uppercase font-black text-[10px] tracking-widest h-12">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMicAccess} className="bg-primary hover:bg-primary/90 text-white rounded-full uppercase font-black text-[10px] tracking-widest px-10 h-12 border-none">Dar Permissão</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="text-center md:text-left">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">Processo de Elite</Badge>
                <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">Simulação de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium lowercase">vendas.</span></h1>
              </div>
              
              {step > 1 && step < 4 && (
                <button 
                  onClick={resetProgress}
                  className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all"
                >
                  <RotateCcw size={12} /> Reiniciar Teste
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all duration-700", step >= s ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/10")} />
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <BrainCircuit size={300} className="text-white" />
              </div>

              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Ficha do Candidato</h2>
                    <p className="text-white/40 text-sm">Inicie sua jornada para se tornar um consultor da studiosapient.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Nome Completo</label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold" placeholder="Digite seu nome" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">E-mail de Contato</label>
                      <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold" placeholder="seu@email.com" />
                    </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-6">
                    <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-[9px]">
                      <ShieldCheck size={16} /> Segurança de Dados (LGPD)
                    </div>
                    <div className="flex items-start gap-4">
                      <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(checked) => setConsentAccepted(checked === true)} className="mt-1.5 border-white/20 h-5 w-5 rounded-md" />
                      <label htmlFor="consent" className="text-xs md:text-sm text-white/50 leading-relaxed cursor-pointer select-none">
                        Autorizo a <span className="text-white font-bold">studiosapient.</span> a capturar e processar minha voz e dados de contato para fins exclusivos de recrutamento e treinamento, garantindo a proteção e sigilo absoluto conforme a legislação vigente.
                      </label>
                    </div>
                  </div>

                  <Button onClick={handleNextStep} disabled={!consentAccepted} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl transition-all hover:scale-105">Prosseguir para Briefing <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                  <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-4">
                    <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]"><Building2 size={16} /> Cenário: Marmoraria Granito Fino</div>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed italic">
                      "Sr. Jorge acha que site é frescura. Prove em 60 segundos que o descaso digital dele é lucro na mesa dos concorrentes."
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                    <button 
                      onClick={toggleRecording} 
                      className={cn(
                        "h-28 w-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative", 
                        isRecording ? "bg-red-500 scale-110 shadow-red-500/20" : "bg-primary text-white hover:scale-105"
                      )}
                    >
                      {isRecording ? <MicOff size={36} className="animate-pulse" /> : <Mic size={36} />}
                      {isRecording && (
                        <div className="absolute -inset-4 rounded-full border-2 border-red-500 animate-ping opacity-20" />
                      )}
                    </button>
                    <div className="text-center space-y-2">
                      <p className={cn("text-[10px] font-black uppercase tracking-[0.4em] transition-colors", isRecording ? "text-red-500" : "text-white/30")}>
                        {isRecording ? "SISTEMA CAPTURANDO..." : "APERTE PARA FALAR"}
                      </p>
                    </div>
                    
                    <div className="w-full px-8">
                       <div className="min-h-[140px] p-8 rounded-[2rem] bg-black/40 border border-white/5 text-sm md:text-base italic text-white/60 leading-relaxed text-center">
                         {transcription || "Sua voz será transcrita aqui em tempo real..."}
                       </div>
                    </div>

                    {audioBase64 && !isRecording && (
                      <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 px-6 py-4 rounded-full">
                        <Volume2 className="h-4 w-4 text-green-400" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Áudio gravado com sucesso</span>
                      </div>
                    )}
                  </div>

                  <Button onClick={handleNextStep} disabled={!transcription.trim() && !isRecording} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl transition-all hover:scale-105 w-full md:w-auto">Confirmar Locução <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                  <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20 space-y-4">
                    <div className="flex items-center gap-3 text-orange-400 font-black uppercase tracking-[0.2em] text-[10px]"><AlertCircle size={16} /> Objeção do Sr. Jorge</div>
                    <p className="text-sm md:text-base text-white font-medium leading-relaxed italic">
                      "Meu negócio é tradicional. Vendo há 20 anos sem esse tal de site. Por que gastar com isso agora?"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Réplica Estratégica</label>
                    <Textarea value={formData.objection} onChange={(e) => setFormData({...formData, objection: e.target.value})} className="bg-white/5 border-white/10 min-h-[220px] rounded-[2rem] p-8 text-base font-medium leading-relaxed focus:ring-primary/20" placeholder="Use o fator concorrência para quebrar essa objeção..." />
                  </div>

                  <Button onClick={handleSubmit} disabled={isLoading} className="h-20 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[11px] w-full border-none shadow-2xl transition-all hover:bg-primary/90">
                    {isLoading ? <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> IA ANALISANDO PERFORMANCE...</> : <>OBTER VEREDITO FINAL <Zap className="ml-2 h-4 w-4 fill-current" /></>}
                  </Button>
                </div>
              )}

              {step === 4 && evaluation && (
                <div className="space-y-12 animate-in zoom-in duration-1000 relative z-10">
                  <div className="text-center space-y-6">
                    <div className={cn(
                      "h-28 w-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl transition-all duration-1000", 
                      evaluation.verdict === 'APROVADO' ? "bg-green-500 shadow-green-500/20" : "bg-primary shadow-primary/20"
                    )}>
                      {evaluation.verdict === 'APROVADO' ? <Trophy size={48} /> : <BrainCircuit size={48} />}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Veredito: {evaluation.verdict}</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Métrica de Conversão: {evaluation.score}%</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 flex items-center gap-3"><CheckCircle2 size={20} /> Pontos Fortes</h4>
                      <ul className="space-y-3">{evaluation.strongPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-3"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {p}</li>))}</ul>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-3"><TrendingUp size={20} /> Gaps Técnicos</h4>
                      <ul className="space-y-3">{evaluation.weakPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-3"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {p}</li>))}</ul>
                    </div>
                  </div>

                  <div className="p-12 rounded-[3rem] bg-primary text-white space-y-6 shadow-2xl">
                    <div className="flex items-center gap-4"><MessageSquare className="h-8 w-8" /><h4 className="font-black uppercase tracking-tighter text-2xl">Feedback Sapient</h4></div>
                    <p className="text-base md:text-lg font-medium leading-relaxed italic">"{evaluation.feedback}"</p>
                  </div>

                  <div className="text-center pt-8">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 max-w-lg mx-auto">Sua avaliação foi registrada em nosso ecossistema de talentos.</p>
                     <Button onClick={() => window.location.href = '/'} variant="outline" className="h-16 px-12 border-white/10 hover:bg-white/5 rounded-full font-black uppercase tracking-widest text-[10px]">Voltar para Início</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
