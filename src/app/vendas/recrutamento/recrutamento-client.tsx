
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
  RotateCcw,
  BarChart3,
  Search,
  Smartphone,
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
  const streamRef = useRef<MediaStream | null>(null);

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
      } catch (e) {
        console.error("Erro ao carregar progresso:", e);
      }
    }

    if (auth) {
      initiateAnonymousSignIn(auth);
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsBrowserSupported(false);
    }
  }, [auth]);

  useEffect(() => {
    if (step < 4) {
      const stateToSave = {
        step,
        formData,
        transcription,
        audioBase64,
        consentAccepted
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [step, formData, transcription, audioBase64, consentAccepted]);

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const stopAllRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const confirmMicAccess = async () => {
    setShowMicDialog(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
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
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'pt-BR';

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscription(prev => (prev + " " + currentTranscript).trim());
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error", event.error);
        if (event.error === 'not-allowed') {
          toast({ title: "Acesso Negado", description: "O microfone foi bloqueado pelo navegador.", variant: "destructive" });
          stopAllRecording();
        }
      };

      recognition.onend = () => {
        if (isRecording && recognitionRef.current) {
          try { recognitionRef.current.start(); } catch(e) {}
        }
      };

      recognition.start();
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({ 
        title: "Microfone Ativo", 
        description: "Pode começar a falar. O sistema está ouvindo.",
        className: "bg-primary text-white border-none font-bold"
      });
    } catch (err) {
      console.error("Hardware Error", err);
      toast({ 
        title: "Erro de Hardware", 
        description: "Certifique-se de que o microfone não está em uso por outro app.", 
        variant: "destructive" 
      });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopAllRecording();
    } else {
      if (!isBrowserSupported) {
        toast({ title: "Navegador incompatível", description: "O recurso de transcrição requer Google Chrome ou Safari.", variant: "destructive" });
        return;
      }
      setShowMicDialog(true);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim() || !consentAccepted) {
        toast({ title: "Atenção", description: "Preencha seus dados e aceite os termos de segurança.", variant: "destructive" });
        return;
      }
    }
    if (step === 2) {
      if (isRecording) stopAllRecording();
      if (!transcription.trim()) {
        toast({ title: "Abordagem Vazia", description: "Precisamos que você fale seu pitch para a avaliação.", variant: "destructive" });
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!formData.objection.trim()) {
      toast({ title: "Atenção", description: "Responda à objeção do Sr. Jorge para completar a simulação.", variant: "destructive" });
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
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Submit Error", error);
      toast({ title: "Falha na Análise", description: "Ocorreu um erro ao processar sua avaliação. Tente novamente.", variant: "destructive" });
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
              <Mic className="text-primary" /> Ativar Microfone
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-base leading-relaxed">
              O Studio Sapient utiliza sua voz para avaliar a autoridade e clareza da sua locução. Ao permitir, sua fala será transcrita e gravada para análise do nosso Diretor Comercial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-transparent border-white/10 text-white/50 hover:bg-white/5 rounded-full uppercase font-black text-[10px] tracking-widest h-12 px-6">Agora não</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMicAccess} className="bg-primary hover:bg-primary/90 text-white rounded-full uppercase font-black text-[10px] tracking-widest px-10 h-12 border-none">Iniciar Captura</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="text-center md:text-left">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">Portal de Talentos Sapient</Badge>
                <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">Roleplay de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium lowercase">consultoria comercial.</span></h1>
              </div>
              
              {step > 1 && step < 4 && (
                <button onClick={resetProgress} className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] -z-10" />

              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação Profissional</h2>
                    <p className="text-white/40 text-sm leading-relaxed">Bem-vindo à studiosapient. Este teste simula uma negociação real. <br/> Seja estratégico, use dados e prove que você não é apenas um vendedor, mas um parceiro de crescimento.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Seu Nome Completo</label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold focus:border-primary/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">E-mail Corporativo</label>
                      <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold focus:border-primary/50" />
                    </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-6">
                    <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-[9px]">
                      <ShieldCheck size={16} /> Proteção de Dados e Transparência (LGPD)
                    </div>
                    <div className="flex items-start gap-4">
                      <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(checked) => setConsentAccepted(checked === true)} className="mt-1.5 border-white/20 h-5 w-5 data-[state=checked]:bg-primary" />
                      <label htmlFor="consent" className="text-xs text-white/50 leading-relaxed cursor-pointer select-none">
                        Autorizo a studiosapient a capturar e processar minha voz e dados profissionais exclusivamente para avaliação de perfil comercial. Seus dados estão criptografados e serão excluídos após o ciclo de recrutamento.
                      </label>
                    </div>
                  </div>

                  <Button onClick={handleNextStep} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl hover:scale-105 transition-all">Acessar Briefing do Caso <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <div className="p-10 rounded-[3rem] bg-primary/10 border border-primary/20 space-y-6">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]"><Building2 size={16} /> LEAD: Marmoraria Granito Fino</div>
                        <div className="space-y-4">
                          <h3 className="text-2xl font-black uppercase tracking-tight">O Perfil do Sr. Jorge</h3>
                          <p className="text-sm text-white/70 leading-relaxed">
                            Dono há 25 anos. Conservador, focado em lucro imediato e acha que "design e site" são gastos desnecessários. Ele acredita que o "boca a boca" é suficiente, mas sente que o movimento caiu 30% nos últimos 12 meses.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-2"><BarChart3 size={14} className="text-primary"/> Diagnóstico de Gargalos (Seu Trunfo)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex gap-4 items-start">
                            <Smartphone className="text-primary h-5 w-5 shrink-0" />
                            <div>
                              <p className="font-bold text-xs uppercase mb-1">Mobile Inexistente</p>
                              <p className="text-[10px] text-white/40">85% dos clientes buscam pelo celular, mas o site do Sr. Jorge não carrega fotos em smartphones.</p>
                            </div>
                          </div>
                          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex gap-4 items-start">
                            <Search className="text-primary h-5 w-5 shrink-0" />
                            <div>
                              <p className="font-bold text-xs uppercase mb-1">Invisibilidade Local</p>
                              <p className="text-[10px] text-white/40">Perdendo para concorrentes novos no Google por falta de ficha técnica otimizada (GMN).</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase text-orange-400"><Info size={14}/> Objetivo do Pitch</div>
                      <p className="text-xs text-white/50 leading-relaxed italic">
                        "Você não quer vender um site. Você quer mostrar que o Sr. Jorge está deixando dinheiro na mesa para concorrentes amadores que têm presença digital. Use os gargalos acima para gerar urgência."
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02] relative">
                    <button 
                      onClick={toggleRecording} 
                      className={cn(
                        "h-28 w-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative z-10", 
                        isRecording ? "bg-red-500 scale-110 shadow-red-500/30" : "bg-primary text-white hover:scale-105"
                      )}
                    >
                      {isRecording ? <MicOff size={36} className="animate-pulse" /> : <Mic size={36} />}
                      {isRecording && <span className="absolute -inset-4 border-2 border-red-500/20 rounded-full animate-ping" />}
                    </button>
                    
                    <div className="w-full px-8">
                       <div className="min-h-[140px] p-8 rounded-[2rem] bg-black/40 border border-white/5 text-sm italic text-white/60 leading-relaxed text-center">
                         {transcription || (isRecording ? "Ouvindo seu diagnóstico..." : "Realize sua abordagem inicial (Áudio). Foque nos problemas do Sr. Jorge.")}
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                      {audioBase64 && !isRecording && (
                        <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 px-6 py-4 rounded-full">
                          <Volume2 className="h-4 w-4 text-green-400" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Locução Capturada</span>
                        </div>
                      )}
                      {transcription && (
                        <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 px-6 py-4 rounded-full">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-primary">Diagnóstico Transcrito</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={handleNextStep} 
                    disabled={!transcription.trim() || isRecording} 
                    className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl w-full md:w-auto hover:scale-105 transition-all disabled:opacity-30"
                  >
                    Confirmar Abordagem Técnica <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20 space-y-4">
                    <div className="flex items-center gap-3 text-orange-400 font-black uppercase tracking-[0.2em] text-[10px]"><AlertCircle size={16} /> A Resistência do Sr. Jorge</div>
                    <p className="text-sm text-white font-medium leading-relaxed italic">
                      "Meu filho, eu já vendo bem há 25 anos sem esse negócio de internet. O meu público é de elite, eles não ficam no Google. Por que eu gastaria 10 mil reais com isso agora se o dinheiro já entra?"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Sua Resposta Estratégica (Texto)</label>
                    <Textarea value={formData.objection} onChange={(e) => setFormData({...formData, objection: e.target.value})} className="bg-white/5 border-white/10 min-h-[220px] rounded-[2rem] p-8 text-base focus:ring-primary/20 focus:border-primary/50" placeholder="Use o fator concorrência, o ROI ou o 'Custo do Silêncio' para convencer o Sr. Jorge a agendar uma conversa com o Lucas..." />
                  </div>

                  <Button onClick={handleSubmit} disabled={isLoading} className="h-20 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[11px] w-full border-none shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50">
                    {isLoading ? <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> NOSSO MOTOR DE IA ESTÁ ANALISANDO SEU PERFIL...</> : <>FINALIZAR E RECEBER FEEDBACK DO DIRETOR <Zap className="ml-2 h-4 w-4" /></>}
                  </Button>
                </div>
              )}

              {step === 4 && evaluation && (
                <div className="space-y-12 animate-in zoom-in duration-1000">
                  <div className="text-center space-y-6">
                    <div className={cn(
                      "h-28 w-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl", 
                      evaluation.verdict === 'APROVADO' ? "bg-green-500" : evaluation.verdict === 'TREINAMENTO' ? "bg-orange-500" : "bg-red-500"
                    )}>
                      {evaluation.verdict === 'APROVADO' ? <Trophy size={48} /> : <BrainCircuit size={48} />}
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Veredito: {evaluation.verdict}</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Métrica de Performance Estratégica: {evaluation.score}%</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 flex items-center gap-3"><CheckCircle2 size={20} /> Pontos de Autoridade</h4>
                      <ul className="space-y-3">{evaluation.strongPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-3"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {p}</li>))}</ul>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-3"><TrendingUp size={20} /> Gargalos de Melhoria</h4>
                      <ul className="space-y-3">{evaluation.weakPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-3"><span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {p}</li>))}</ul>
                    </div>
                  </div>

                  <div className="p-12 rounded-[3rem] bg-primary text-white space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><MessageSquare size={120} /></div>
                    <div className="flex items-center gap-4 relative z-10"><MessageSquare className="h-8 w-8" /><h4 className="font-black uppercase tracking-tighter text-2xl">Avaliação Técnica do Diretor</h4></div>
                    <p className="text-base md:text-lg font-medium leading-relaxed italic relative z-10">"{evaluation.feedback}"</p>
                  </div>

                  <div className="text-center pt-8">
                     <Button onClick={() => window.location.href = '/'} variant="outline" className="h-16 px-12 border-white/10 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/5">Voltar ao Site Principal</Button>
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
