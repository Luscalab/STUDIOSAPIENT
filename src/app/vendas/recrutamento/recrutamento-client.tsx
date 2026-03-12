
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
  Smartphone,
  Info,
  PlayCircle,
  FileText
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

const STORAGE_KEY = "sapient_recruitment_v5";

export function RecrutamentoClient() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
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
      try { recognitionRef.current.stop(); } catch(e) {}
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
    setAudioBase64(null);
    setAudioPreviewUrl(null);
    setTranscription("");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const previewUrl = URL.createObjectURL(audioBlob);
        setAudioPreviewUrl(previewUrl);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioBase64(reader.result as string);
        };
      };

      // Inicia o reconhecimento em paralelo (Web Speech API)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
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
      
      toast({ 
        title: "SISTEMA ATIVO", 
        description: "Ouvindo seu pitch...",
        className: "bg-primary text-white border-none font-black uppercase tracking-widest text-[9px]"
      });
    } catch (err) {
      console.error("Mic Access Error", err);
      toast({ title: "Erro de Hardware", description: "Certifique-se de que o microfone está conectado e permitido.", variant: "destructive" });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopAllRecording();
    } else {
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
      if (!audioBase64) {
        toast({ title: "Atenção", description: "Grave seu áudio antes de prosseguir.", variant: "destructive" });
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        pitchTranscription: transcription || "[Áudio capturado para avaliação manual]",
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
      console.error("AI Analysis Error", error);
      toast({ title: "Erro na IA", description: "Não conseguimos processar a análise. Verifique sua conexão.", variant: "destructive" });
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
              <Mic className="text-primary" /> Ativar Captura
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-base leading-relaxed">
              O Studio Sapient utiliza sua voz para avaliar autoridade e clareza. Você poderá ouvir o áudio antes de enviar. O hardware será liberado após o teste.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-transparent border-white/10 text-white/50 hover:bg-white/5 rounded-full uppercase font-black text-[10px] tracking-widest h-12 px-6">Agora não</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMicAccess} className="bg-primary hover:bg-primary/90 text-white rounded-full uppercase font-black text-[10px] tracking-widest px-10 h-12 border-none">Permitir Hardware</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="text-center md:text-left">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">Processo Seletivo de Elite</Badge>
                <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">Roleplay de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium lowercase">vendas estratégicas.</span></h1>
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
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Registro de Candidato</h2>
                    <p className="text-white/40 text-sm leading-relaxed">Seu desempenho será avaliado por nossa IA e posteriormente revisado pelo Diretor Comercial. Garantimos a proteção total dos seus dados.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Nome Completo</label>
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Como no documento..." className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold focus:border-primary/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">E-mail Profissional</label>
                      <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@email.com" className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-bold focus:border-primary/50" />
                    </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-6">
                    <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-[9px]">
                      <ShieldCheck size={16} /> Blindagem de Dados & Privacidade (LGPD)
                    </div>
                    <div className="flex items-start gap-4">
                      <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(checked) => setConsentAccepted(checked === true)} className="mt-1.5 border-white/20 h-5 w-5 data-[state=checked]:bg-primary" />
                      <label htmlFor="consent" className="text-xs text-white/50 leading-relaxed cursor-pointer select-none">
                        Autorizo o Studio Sapient a capturar e processar minha voz e respostas exclusivamente para este processo de seleção comercial. Meus dados não serão compartilhados com terceiros.
                      </label>
                    </div>
                  </div>

                  <Button onClick={handleNextStep} className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl hover:scale-105 transition-all">Aceitar & Iniciar Roleplay <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-10 rounded-[3rem] bg-primary/10 border border-primary/20 space-y-6">
                    <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]"><Building2 size={16} /> LEAD: Marmoraria Granito Fino</div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Cenário: Sr. Jorge</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Marmoraria de luxo com faturamento estagnado. O Sr. Jorge é conservador e acha que "internet é para quem não tem o que fazer". 
                    </p>
                    <div className="p-6 rounded-2xl bg-[#08070b]/50 border border-primary/10 space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2"><AlertCircle size={14} className="text-red-500" /> Diagnóstico de Gargalos:</h4>
                      <ul className="text-xs text-white/60 space-y-2 list-disc pl-4">
                        <li>O site atual leva 12 segundos para carregar e não abre em celulares (85% do tráfego).</li>
                        <li>O Google Meu Negócio está abandonado: fotos de 2018 e 2 avaliações negativas sem resposta.</li>
                        <li>Arquitetos da região estão indicando o concorrente novo que tem um perfil "premium" no Google Maps.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2"><Search size={14} /> O que é o Google Meu Negócio?</h4>
                       <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                         É a vitrine local gratuita do Google. Quando um cliente busca "Marmoraria", o Google mostra o mapa. Se o Sr. Jorge não tem fotos boas, horário atualizado e avaliações, ele está "fechado" para o mundo digital.
                       </p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Zap size={14} /> Dica de Abordagem:</h4>
                       <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                         Foque no **Custo de Oportunidade**. Quanto o Sr. Jorge está perdendo por cada cliente que entra no site pelo celular, se frustra e liga para o concorrente? O design aqui é uma ferramenta de lucro.
                       </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02] relative">
                    <button 
                      onClick={toggleRecording} 
                      className={cn(
                        "h-28 w-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative z-10", 
                        isRecording ? "bg-red-500 scale-110" : "bg-primary text-white"
                      )}
                    >
                      {isRecording ? <MicOff size={36} className="animate-pulse" /> : <Mic size={36} />}
                      {isRecording && <span className="absolute -inset-4 border-2 border-red-500/20 rounded-full animate-ping" />}
                    </button>
                    
                    {audioPreviewUrl && !isRecording && (
                      <div className="w-full max-w-md space-y-4 text-center animate-in zoom-in duration-500">
                        <div className="flex items-center justify-center gap-3 text-green-400 font-black uppercase tracking-widest text-[9px]">
                          <Volume2 size={14} /> Áudio Capturado. Ouça antes de enviar:
                        </div>
                        <audio controls src={audioPreviewUrl} className="w-full h-12 rounded-full brightness-75 contrast-125" />
                      </div>
                    )}

                    <div className="text-center px-8">
                      <p className="text-xs font-bold text-white/40">
                        {isRecording ? "Gravando... Pressione para parar." : audioBase64 ? "Pitch gravado com sucesso." : "Clique no ícone para iniciar sua gravação."}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleNextStep} 
                    disabled={!audioBase64 || isRecording} 
                    className="h-16 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[10px] border-none shadow-xl w-full md:w-auto hover:scale-105 transition-all disabled:opacity-30"
                  >
                    Confirmar Abordagem <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20 space-y-4">
                    <div className="flex items-center gap-3 text-orange-400 font-black uppercase tracking-[0.2em] text-[10px]"><AlertCircle size={16} /> A Objeção Crítica</div>
                    <p className="text-sm text-white font-medium leading-relaxed italic">
                      Sr. Jorge: "Rapaz, eu vendo marmore há 30 anos sem esse negócio de site. Por que eu gastaria dinheiro com isso agora? O boca a boca ainda é o melhor negócio."
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Sua Resposta Estratégica (Texto)</label>
                    <Textarea 
                      value={formData.objection} 
                      onChange={(e) => setFormData({...formData, objection: e.target.value})} 
                      className="bg-white/5 border-white/10 min-h-[220px] rounded-[2rem] p-8 text-base focus:ring-primary/20 focus:border-primary/50" 
                      placeholder="Use os dados do Google Meu Negócio e a falha no mobile para contornar..." 
                    />
                  </div>

                  <Button onClick={handleSubmit} disabled={isLoading} className="h-20 px-12 bg-primary rounded-full font-black uppercase tracking-widest text-[11px] w-full border-none shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50">
                    {isLoading ? <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> IA ANALISANDO PERFORMANCE...</> : <>FINALIZAR E RECEBER VEREDITO <Zap className="ml-2 h-4 w-4" /></>}
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
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">SCORE DE AUTORIDADE: {evaluation.score}%</p>
                  </div>

                  <div className="p-12 rounded-[3rem] bg-primary text-white space-y-6 shadow-2xl">
                    <div className="flex items-center gap-4"><MessageSquare className="h-8 w-8" /><h4 className="font-black uppercase tracking-tighter text-2xl">Feedback do Diretor (IA)</h4></div>
                    <p className="text-base md:text-lg font-medium leading-relaxed italic">"{evaluation.feedback}"</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-4">Pontos de Autoridade</h4>
                        <ul className="space-y-2">
                           {evaluation.strongPoints.map((p, i) => <li key={i} className="text-xs text-white/60 flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500" /> {p}</li>)}
                        </ul>
                     </div>
                     <div className="p-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-4">Gargalos de Venda</h4>
                        <ul className="space-y-2">
                           {evaluation.weakPoints.map((p, i) => <li key={i} className="text-xs text-white/60 flex items-center gap-2"><AlertCircle size={12} className="text-red-500" /> {p}</li>)}
                        </ul>
                     </div>
                  </div>

                  <div className="text-center pt-8">
                     <Button onClick={() => window.location.href = '/'} variant="outline" className="h-16 px-12 border-white/10 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/5">Finalizar Sessão</Button>
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
