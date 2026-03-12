
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
  Volume2
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

  useEffect(() => {
    if (auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [auth]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
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
          console.error("Erro no reconhecimento de fala:", event.error);
          stopAllRecording();
          if (event.error === 'not-allowed') {
            toast({ title: "Acesso Negado", description: "Por favor, libere o microfone no navegador.", variant: "destructive" });
          }
        };
      } else {
        setIsBrowserSupported(false);
      }
    }
  }, [toast]);

  const stopAllRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleStartRecording = () => {
    if (!isBrowserSupported) {
      toast({ title: "Navegador incompatível", description: "Use Chrome ou Edge para o teste.", variant: "destructive" });
      return;
    }
    setShowMicDialog(true);
  };

  const confirmMicAccess = async () => {
    setShowMicDialog(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup MediaRecorder for actual audio storage
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
          const base64Audio = reader.result as string;
          setAudioBase64(base64Audio);
        };
      };

      setTranscription("");
      setAudioBase64(null);
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
        mediaRecorder.start();
        setIsRecording(true);
        toast({ 
          title: "Gravando...", 
          description: "O Sr. Jorge está ouvindo. Seja direto!", 
          className: "bg-primary text-white font-black border-none" 
        });
      }
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
      toast({ title: "Erro de Permissão", description: "Não conseguimos acessar seu microfone.", variant: "destructive" });
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
      if (!formData.name.trim() || !formData.email.trim() || !consentAccepted) {
        toast({ title: "Atenção", description: "Preencha seus dados e aceite os termos.", variant: "destructive" });
        return;
      }
    }
    if (step === 2 && !transcription.trim() && !isRecording) {
      toast({ title: "Pitch em Branco", description: "Você precisa gravar sua abordagem.", variant: "destructive" });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!formData.objection.trim()) {
      toast({ title: "Atenção", description: "Responda à objeção para finalizar.", variant: "destructive" });
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
          pitchAudioUri: audioBase64, // Salva o áudio real
          aiFeedback: result.feedback,
          score: result.score,
          verdict: result.verdict,
          strongPoints: result.strongPoints,
          weakPoints: result.weakPoints,
          timestamp: serverTimestamp()
        });
      }

      setStep(4);
    } catch (error) {
      console.error(error);
      toast({ title: "Erro na Avaliação", description: "Falha ao processar dados com a IA.", variant: "destructive" });
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
            <AlertDialogTitle className="font-headline text-3xl font-black uppercase tracking-tighter">Ligando para o Sr. Jorge...</AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-base leading-relaxed">
              Sua voz será gravada e transcrita. O Sr. Jorge é prático: foque no problema dele e como o Studio Sapient resolve.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-transparent border-white/10 text-white/50 hover:bg-white/5 rounded-full uppercase font-black text-[10px] tracking-widest h-12">Agora não</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMicAccess} className="bg-primary hover:bg-primary/90 text-white rounded-full uppercase font-black text-[10px] tracking-widest px-10 h-12 border-none">Atender Ligação</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            <div className="mb-12 text-center md:text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">Recrutamento de Vendas studiosapient.</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6 uppercase">Roleplay de <br/><span className="text-primary italic font-medium lowercase">performance.</span></h1>
            </div>

            <div className="flex items-center gap-4 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all duration-700", step >= s ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/10")} />
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl">
              
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Dados do Consultor</h2>
                    <p className="text-white/40 text-sm">Precisamos saber quem está no comando desta negociação.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Nome</label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">E-mail</label>
                      <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold" placeholder="email@exemplo.com" />
                    </div>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex items-start gap-4">
                      <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(checked) => setConsentAccepted(checked === true)} className="mt-1.5 border-white/20 h-5 w-5 rounded-md" />
                      <label htmlFor="consent" className="text-xs md:text-sm text-white/50 leading-relaxed cursor-pointer select-none">
                        Autorizo a <span className="text-white font-bold">studiosapient.</span> a processar e armazenar minha voz e dados para este processo seletivo, em conformidade com a LGPD.
                      </label>
                    </div>
                  </div>
                  <Button onClick={handleNextStep} disabled={!consentAccepted} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl transition-all hover:scale-105">Aceitar e Iniciar <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/20 space-y-4">
                    <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]"><Building2 size={16} /> Briefing: Marmoraria Granito Fino</div>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed italic">
                      "O site do Sr. Jorge é de 2010. Ele está perdendo orçamentos de luxo porque os arquitetos novos não o acham no celular. Use isso a seu favor."
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                    <button 
                      onClick={toggleRecording} 
                      className={cn(
                        "h-28 w-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl", 
                        isRecording ? "bg-red-500 scale-110 shadow-red-500/20" : "bg-primary text-white hover:scale-105"
                      )}
                    >
                      {isRecording ? <MicOff size={36} className="animate-pulse" /> : <Mic size={36} />}
                    </button>
                    <div className="text-center space-y-2">
                      <p className={cn("text-[10px] font-black uppercase tracking-[0.4em] transition-colors", isRecording ? "text-red-500" : "text-white/30")}>
                        {isRecording ? "GRAVANDO ÁUDIO E TEXTO..." : "CLIQUE E FALE SEU PITCH"}
                      </p>
                    </div>
                    
                    <div className="w-full px-8">
                       <div className="min-h-[120px] p-8 rounded-[2rem] bg-black/40 border border-white/5 text-sm md:text-base italic text-white/60 leading-relaxed">
                         {transcription || "Sua abordagem aparecerá aqui..."}
                       </div>
                    </div>

                    {audioBase64 && !isRecording && (
                      <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 px-6 py-4 rounded-full">
                        <Volume2 className="h-4 w-4 text-green-400" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Áudio capturado com sucesso</span>
                      </div>
                    )}
                  </div>

                  <Button onClick={handleNextStep} disabled={!transcription.trim() && !isRecording} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl transition-all hover:scale-105">Confirmar Gravação <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-8 rounded-[2rem] bg-orange-500/10 border border-orange-500/20 space-y-4">
                    <div className="flex items-center gap-3 text-orange-400 font-black uppercase tracking-[0.2em] text-[10px]"><AlertCircle size={16} /> Objeção do Sr. Jorge</div>
                    <p className="text-sm md:text-base text-white font-medium leading-relaxed italic">
                      "Meu negócio é tradicional. Design pra mim é frescura de gente nova. Por que eu deveria gastar dinheiro com isso agora?"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Sua Resposta Estratégica</label>
                    <Textarea value={formData.objection} onChange={(e) => setFormData({...formData, objection: e.target.value})} className="bg-white/5 border-white/10 min-h-[220px] rounded-[2rem] p-8 text-base font-medium leading-relaxed" placeholder="Como você prova que design é lucro e não gasto?" />
                  </div>

                  <Button onClick={handleSubmit} disabled={isLoading} className="h-20 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[11px] w-full border-none shadow-2xl transition-all hover:bg-primary/90">
                    {isLoading ? <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> PROCESSANDO PERFORMANCE...</> : <>FINALIZAR E OBTER RESULTADO <Zap className="ml-2 h-4 w-4 fill-current" /></>}
                  </Button>
                </div>
              )}

              {step === 4 && evaluation && (
                <div className="space-y-12 animate-in zoom-in duration-1000">
                  <div className="text-center space-y-6">
                    <div className={cn(
                      "h-28 w-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl transition-all duration-1000", 
                      evaluation.verdict === 'APROVADO' ? "bg-green-500 shadow-green-500/20" : "bg-primary shadow-primary/20"
                    )}>
                      {evaluation.verdict === 'APROVADO' ? <Trophy size={48} /> : <BrainCircuit size={48} />}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Veredito: {evaluation.verdict}</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Score Comercial: {evaluation.score}%</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 flex items-center gap-3"><CheckCircle2 size={20} /> Forças</h4>
                      <ul className="space-y-3">{evaluation.strongPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-3"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {p}</li>))}</ul>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-3"><TrendingUp size={20} /> Melhorias</h4>
                      <ul className="space-y-3">{evaluation.weakPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-3"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {p}</li>))}</ul>
                    </div>
                  </div>

                  <div className="p-12 rounded-[3rem] bg-primary text-white space-y-6 shadow-2xl">
                    <div className="flex items-center gap-4"><MessageSquare className="h-8 w-8" /><h4 className="font-black uppercase tracking-tighter text-2xl">Feedback Sapient</h4></div>
                    <p className="text-base md:text-lg font-medium leading-relaxed italic">"{evaluation.feedback}"</p>
                  </div>

                  <div className="text-center pt-8">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 max-w-lg mx-auto">Sua avaliação técnica foi salva. O áudio do seu pitch será analisado pela diretoria.</p>
                     <Button onClick={() => window.location.href = '/'} variant="outline" className="h-16 px-12 border-white/10 hover:bg-white/5 rounded-full font-black uppercase tracking-widest text-[10px]">Voltar ao Início</Button>
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
