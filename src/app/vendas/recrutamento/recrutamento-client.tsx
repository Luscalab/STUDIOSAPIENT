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
  Shield,
  Building2,
  Users2,
  AlertCircle
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
  const recognitionRef = useRef<any>(null);

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
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const handleStartRecording = () => {
    setShowMicDialog(true);
  };

  const confirmMicAccess = async () => {
    setShowMicDialog(false);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setTranscription("");
      recognitionRef.current?.start();
      setIsRecording(true);
      toast({ title: "Microfone Ativo", description: "Pode começar a falar o seu pitch.", className: "bg-green-600 text-white font-black" });
    } catch (err) {
      toast({ title: "Permissão Negada", description: "Verifique as permissões do site.", variant: "destructive" });
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
      if (!formData.name.trim() || !formData.email.trim() || !consentAccepted) {
        toast({ title: "Atenção", description: "Preencha seus dados e aceite os termos.", variant: "destructive" });
        return;
      }
    }
    if (step === 2 && !transcription.trim() && !isRecording) {
      toast({ title: "Pitch Ausente", description: "Fale sua abordagem inicial.", variant: "destructive" });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!formData.objection.trim()) {
      toast({ title: "Atenção", description: "Responda à objeção do Sr. Jorge.", variant: "destructive" });
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
      toast({ title: "Erro", description: "Falha ao processar avaliação.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <AlertDialog open={showMicDialog} onOpenChange={setShowMicDialog}>
        <AlertDialogContent className="bg-[#121216] border-white/10 text-white rounded-[2rem]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl font-black uppercase tracking-tighter">Iniciando Simulação</AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-base leading-relaxed">
              Você entrará agora em um **Roleplay Realista**. Ative seu microfone para realizar a abordagem inicial ao Sr. Jorge. Sua dicção e persuasão serão avaliadas por nossa IA.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white/50 hover:bg-white/5 rounded-full uppercase font-black text-[10px] tracking-widest">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMicAccess} className="bg-primary hover:bg-primary/90 text-white rounded-full uppercase font-black text-[10px] tracking-widest px-8">Permitir e Gravar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            <div className="mb-12 text-center md:text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">Recrutamento studiosapient.</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6">Teste de Elite.</h1>
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                Briefing: Você está ligando para o **Sr. Jorge**, dono de uma Marmoraria de Luxo. Ele é cético sobre marketing digital.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", step >= s ? "bg-primary" : "bg-white/10")} />
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-3xl">
              
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Identificação</h2>
                    <p className="text-white/40 text-sm">Proteção LGPD ativa para seus dados e sua voz.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Nome Completo</label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10 h-14 rounded-xl" placeholder="Ex: João Silva" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">E-mail</label>
                      <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10 h-14 rounded-xl" placeholder="contato@exemplo.com" />
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex items-start gap-4">
                      <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(checked) => setConsentAccepted(checked === true)} className="mt-1 border-white/20" />
                      <label htmlFor="consent" className="text-[11px] md:text-xs text-white/50 leading-relaxed cursor-pointer select-none">
                        Concordo com o processamento dos meus dados e gravação de voz para fins de recrutamento pela <span className="text-white font-bold">studiosapient</span>. Minha performance será analisada por IA.
                      </label>
                    </div>
                  </div>
                  <Button onClick={handleNextStep} disabled={!consentAccepted} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px]">Iniciar Roleplay <ChevronRight className="ml-2" /></Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-4">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]"><Building2 size={14} /> Cenário: Marmoraria Granito Fino</div>
                    <p className="text-sm text-white/80 leading-relaxed italic">
                      "Sr. Jorge é prático. Ele não tem tempo. O site dele é antigo e não funciona no mobile. O objetivo desta ligação é gerar curiosidade sobre como ele está perdendo vendas para concorrentes mais novos."
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-8 py-10 border-2 border-dashed border-white/10 rounded-[2rem] bg-white/[0.02]">
                    <button onClick={toggleRecording} className={cn("h-24 w-24 rounded-full flex items-center justify-center transition-all duration-500", isRecording ? "bg-red-500 animate-pulse" : "bg-primary text-white hover:scale-105")}>
                      {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
                    </button>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                      {isRecording ? "TRANSCREVENDO AO VIVO..." : "CLIQUE E FAÇA A ABORDAGEM INICIAL"}
                    </p>
                    <div className="w-full px-8">
                       <div className="min-h-[100px] p-6 rounded-xl bg-black/40 border border-white/5 text-sm italic text-white/60 leading-relaxed">
                         {transcription || "Sua fala aparecerá aqui..."}
                       </div>
                    </div>
                  </div>

                  <Button onClick={handleNextStep} disabled={!transcription && !isRecording} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px]">Confirmar Abordagem <ChevronRight className="ml-2" /></Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 space-y-4">
                    <div className="flex items-center gap-2 text-orange-400 font-black uppercase tracking-widest text-[10px]"><AlertCircle size={14} /> Objeção do Sr. Jorge</div>
                    <p className="text-sm text-white font-medium leading-relaxed italic">
                      "Meu filho, eu já vendo bem há 20 anos sem site bonito. Isso aí é gasto, não é investimento. O que você me diz?"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Sua Resposta e Agendamento</label>
                    <Textarea value={formData.objection} onChange={(e) => setFormData({...formData, objection: e.target.value})} className="bg-white/5 border-white/10 min-h-[180px] rounded-2xl p-6 text-sm" placeholder="Como você contorna isso e agenda uma reunião com o Diretor Lucas?" />
                  </div>

                  <Button onClick={handleSubmit} disabled={isLoading} className="h-20 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] w-full">
                    {isLoading ? <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> ENVIANDO PARA DIRETORIA...</> : <>OBTER VEREDITO IA <Zap className="ml-2 h-4 w-4" /></>}
                  </Button>
                </div>
              )}

              {step === 4 && evaluation && (
                <div className="space-y-10 animate-in zoom-in duration-700">
                  <div className="text-center space-y-4">
                    <div className={cn("h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl", evaluation.verdict === 'APROVADO' ? "bg-green-500" : "bg-orange-500")}>
                      {evaluation.verdict === 'APROVADO' ? <Trophy size={40} /> : <BrainCircuit size={40} />}
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Veredito: <span className="text-primary">{evaluation.verdict}</span></h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Score de Performance Comercial: {evaluation.score}%</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 flex items-center gap-2"><CheckCircle2 size={16} /> Pontos Fortes</h4>
                      <ul className="space-y-2">{evaluation.strongPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-2"><span className="text-primary mt-1">•</span> {p}</li>))}</ul>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-2"><TrendingUp size={16} /> Oportunidades</h4>
                      <ul className="space-y-2">{evaluation.weakPoints.map((p, i) => (<li key={i} className="text-sm text-white/60 flex items-start gap-2"><span className="text-primary mt-1">•</span> {p}</li>))}</ul>
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] bg-primary text-white space-y-6">
                    <div className="flex items-center gap-4"><MessageSquare className="h-6 w-6" /><h4 className="font-black uppercase tracking-tighter text-xl">Feedback da studiosapient.</h4></div>
                    <p className="text-sm font-medium leading-relaxed opacity-90 italic">"{evaluation.feedback}"</p>
                  </div>

                  <div className="text-center pt-8">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">Nossa diretoria analisará os dados do seu teste e entrará em contato.</p>
                     <Button onClick={() => window.location.href = '/'} variant="outline" className="h-14 px-10 border-white/10 rounded-full font-black uppercase tracking-widest text-[9px]">Sair do Teste</Button>
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
