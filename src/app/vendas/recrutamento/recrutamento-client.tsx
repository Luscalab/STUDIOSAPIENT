
'use client';

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mic, 
  MicOff, 
  Play, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Loader2, 
  ChevronRight,
  BrainCircuit,
  MessageSquare,
  Trophy
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
  const [isLoading, setIsLoading] = useState(false);
  const [showMicDialog, setShowMicDialog] = useState(false);
  const [evaluation, setEvaluation] = useState<SalesEvaluationOutput | null>(null);
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

  // Garantir que o usuário tenha uma sessão anônima para identificação
  useEffect(() => {
    if (auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [auth]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscription = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscription += event.results[i][0].transcript;
        }
        setTranscription(currentTranscription);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          toast({
            title: "Microfone Bloqueado",
            description: "Você precisa permitir o acesso ao microfone nas configurações do navegador.",
            variant: "destructive"
          });
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [toast]);

  const handleStartRecording = () => {
    setShowMicDialog(true);
  };

  const confirmMicAccess = async () => {
    setShowMicDialog(false);
    try {
      // Solicita permissão explicitamente via API moderna para forçar o pop-up do navegador
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setTranscription("");
      recognitionRef.current?.start();
      setIsRecording(true);
      
      toast({
        title: "Microfone Ativo",
        description: "Pode começar a falar o seu pitch.",
        className: "bg-green-600 text-white font-black"
      });
    } catch (err) {
      toast({
        title: "Permissão Negada",
        description: "Não conseguimos acessar seu microfone. Verifique as permissões do site.",
        variant: "destructive"
      });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      handleStartRecording();
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        toast({ 
          title: "Campos Obrigatórios", 
          description: "Por favor, informe seu nome e e-mail para continuar.", 
          variant: "destructive" 
        });
        return;
      }
    }
    if (step === 2 && !transcription.trim() && !isRecording) {
      toast({ 
        title: "Pitch Ausente", 
        description: "Você precisa realizar o teste de locução antes de prosseguir.", 
        variant: "destructive" 
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!formData.objection.trim()) {
      toast({ title: "Erro", description: "Responda à objeção para prosseguir.", variant: "destructive" });
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
          pitchTranscription: transcription,
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
      toast({ title: "Erro", description: "Falha ao processar avaliação. Tente novamente.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Pop-up de Permissão de Microfone */}
      <AlertDialog open={showMicDialog} onOpenChange={setShowMicDialog}>
        <AlertDialogContent className="bg-[#121216] border-white/10 text-white rounded-[2rem]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl font-black uppercase tracking-tighter">
              Acesso ao Microfone
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-base leading-relaxed">
              Para avaliar sua <span className="text-white font-bold">locução e dicção</span>, precisamos capturar o seu áudio durante o pitch. Suas informações são processadas por nossa IA de recrutamento. 
              <br /><br />
              Deseja permitir o acesso agora?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel className="bg-transparent border-white/10 text-white/50 hover:bg-white/5 rounded-full uppercase font-black text-[10px] tracking-widest">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmMicAccess}
              className="bg-primary hover:bg-primary/90 text-white rounded-full uppercase font-black text-[10px] tracking-widest px-8"
            >
              Permitir e Gravar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] opacity-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center md:text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">
                Processo de Recrutamento Interno
              </Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                Módulo de <span className="text-primary italic">Alta Performance.</span>
              </h1>
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                Estamos em busca de fechadores que entendem o valor do design estratégico. Teste suas habilidades agora.
              </p>
            </div>

            {/* Stepper Progress */}
            <div className="flex items-center gap-4 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-500",
                    step >= s ? "bg-primary" : "bg-white/10"
                  )} 
                />
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-3xl">
              
              {/* STEP 1: Dados Básicos */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Identificação</h2>
                    <p className="text-white/40 text-sm">Inicie sua jornada no ecossistema studiosapient.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Nome Completo</label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/5 border-white/10 h-14 rounded-xl focus:ring-primary"
                        placeholder="Ex: João Silva"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">E-mail Corporativo</label>
                      <Input 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-white/5 border-white/10 h-14 rounded-xl focus:ring-primary"
                        placeholder="contato@exemplo.com"
                      />
                    </div>
                  </div>
                  <Button onClick={handleNextStep} className="h-16 px-12 bg-primary hover:bg-primary/90 rounded-full font-black uppercase tracking-widest text-[10px] w-full md:w-auto">
                    Iniciar Avaliação <ChevronRight className="ml-2" />
                  </Button>
                </div>
              )}

              {/* STEP 2: Teste de Áudio/Pitch */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="space-y-2">
                    <Badge className="bg-cyan-500/10 text-cyan-400 mb-4">Teste de Voz & Pitch</Badge>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Desafio: O Elevador Pitch</h2>
                    <p className="text-white/40 text-sm leading-relaxed">
                      Você tem 60 segundos. Como você apresentaria a <span className="text-white font-bold">studiosapient</span> para um CEO que está perdendo autoridade visual? Clique no microfone e fale.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-8 py-10 border-2 border-dashed border-white/10 rounded-[2rem] bg-white/[0.02]">
                    <button 
                      onClick={toggleRecording}
                      className={cn(
                        "h-24 w-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl",
                        isRecording ? "bg-red-500 animate-pulse" : "bg-primary text-white hover:scale-105"
                      )}
                    >
                      {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
                    </button>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                      {isRecording ? "GRAVANDO E TRANSCREVENDO..." : "CLIQUE PARA COMEÇAR A FALAR"}
                    </p>
                    
                    <div className="w-full px-8">
                       <div className="min-h-[100px] p-6 rounded-xl bg-black/40 border border-white/5 text-sm italic text-white/60 leading-relaxed">
                         {transcription || "Sua fala aparecerá aqui em tempo real..."}
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Button onClick={handleNextStep} disabled={!transcription && !isRecording} className="h-16 px-12 bg-primary hover:bg-primary/90 rounded-full font-black uppercase tracking-widest text-[10px]">
                      Confirmar Pitch <ChevronRight className="ml-2" />
                    </Button>
                    <Button variant="ghost" onClick={() => setTranscription("")} className="text-white/40 hover:text-white uppercase tracking-widest text-[9px] font-black">
                      Limpar
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Objeção */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="space-y-2">
                    <Badge className="bg-primary/10 text-primary mb-4">Capacidade de Fechamento</Badge>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">O Momento da Verdade</h2>
                    <p className="text-white/40 text-sm leading-relaxed">
                      O cliente diz: <span className="text-white italic">"O projeto é incrível, mas o orçamento de vocês é o dobro do que meu sobrinho cobrou."</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Sua Resposta Estratégica</label>
                    <Textarea 
                      value={formData.objection}
                      onChange={(e) => setFormData({...formData, objection: e.target.value})}
                      className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 focus:ring-primary text-sm leading-relaxed"
                      placeholder="Como você converteria essa dúvida em fechamento?"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                    className="h-20 px-12 bg-primary hover:bg-primary/90 rounded-full font-black uppercase tracking-widest text-[10px] w-full shadow-2xl shadow-primary/20"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" /> ENVIANDO PARA DIRETORIA...
                      </>
                    ) : (
                      <>SOLICITAR VEREDITO IA <Zap className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              )}

              {/* STEP 4: Feedback Final */}
              {step === 4 && evaluation && (
                <div className="space-y-10 animate-in zoom-in duration-700">
                  <div className="text-center space-y-4">
                    <div className={cn(
                      "h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6",
                      evaluation.verdict === 'APROVADO' ? "bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.4)]" : "bg-orange-500"
                    )}>
                      {evaluation.verdict === 'APROVADO' ? <Trophy size={40} /> : <BrainCircuit size={40} />}
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Veredito: <span className="text-primary">{evaluation.verdict}</span></h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Score de Performance: {evaluation.score}%</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 flex items-center gap-2">
                        <CheckCircle2 size={16} /> Pontos Fortes
                      </h4>
                      <ul className="space-y-2">
                        {evaluation.strongPoints.map((p, i) => (
                          <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                            <span className="text-primary mt-1">•</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                        <TrendingUp size={16} /> Melhoria Necessária
                      </h4>
                      <ul className="space-y-2">
                        {evaluation.weakPoints.map((p, i) => (
                          <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                            <span className="text-primary mt-1">•</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] bg-primary text-white space-y-6">
                    <div className="flex items-center gap-4">
                      <MessageSquare className="h-6 w-6" />
                      <h4 className="font-black uppercase tracking-tighter text-xl">Feedback da Diretoria</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-90 italic">
                      "{evaluation.feedback}"
                    </p>
                  </div>

                  <div className="text-center pt-8">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">Nossa equipe entrará em contato se o seu perfil for selecionado.</p>
                     <Button onClick={() => window.location.href = '/'} variant="outline" className="h-14 px-10 border-white/10 rounded-full font-black uppercase tracking-widest text-[9px]">
                       Voltar ao Início
                     </Button>
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
