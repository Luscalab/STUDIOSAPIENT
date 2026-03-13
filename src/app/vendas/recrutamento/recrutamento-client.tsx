
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Mic, 
  MicOff, 
  Zap, 
  Loader2, 
  ChevronRight,
  ChevronLeft,
  Trophy,
  ShieldCheck,
  LogOut,
  Target,
  Search,
  Activity,
  Smartphone,
  Eye,
  MessageSquare,
  FileText,
  Users,
  Briefcase,
  Gem,
  Palette,
  TrendingUp,
  UserCircle,
  Brain,
  Code,
  PieChart,
  Lightbulb,
  BookOpen,
  Layout,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database
} from "lucide-react";
import { useFirebase, useFirestore, useDoc, initiateSignOut, useMemoFirebase, setDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function RecrutamentoClient() {
  const [view, setView] = useState<'dashboard' | 'training' | 'profile'>('dashboard');
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  
  const [audio1Base64, setAudio1Base64] = useState<string | null>(null);
  const [audioFinalBase64, setAudioFinalBase64] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [outboundAccepted, setOutboundAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    cityState: "",
    currentOccupation: "",
    experience: "",
    ansAds: "",
    ansSites: "",
    ansDesign: "",
    ansChat: "",
    ansSocial: "",
    ansNarrativa: "",
    ansNichos: "",
    ansPreco: "",
    audioObjeçãoAds: "",
    pitchAudioUri: "",
    consentAccepted: false,
    consentTimestamp: ""
  });

  const { toast } = useToast();
  const { auth, user, isUserLoading } = useFirebase();
  const db = useFirestore();
  const router = useRouter();
  
  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'sales_profiles', user.uid);
  }, [db, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/vendas/auth");
    }
    if (user && formData.email === "") {
      setFormData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        ...profile,
        consentAccepted: true
      }));
      setConsentAccepted(true);
    }
  }, [profile]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const handleSignOut = () => {
    initiateSignOut(auth);
    router.push("/vendas/auth");
  };

  const startRecording = async (target: 'audio1' | 'final') => {
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
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const b64 = reader.result as string;
          if (target === 'audio1') {
            setAudio1Base64(b64);
            setFormData(prev => ({ ...prev, audioObjeçãoAds: b64 }));
          } else {
            setAudioFinalBase64(b64);
            setFormData(prev => ({ ...prev, pitchAudioUri: b64 }));
          }
          setIsProcessingAudio(false);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({ title: "MICROFONE ATIVO", description: "Gravando resposta vocal." });
    } catch (err) {
      toast({ title: "ERRO DE HARDWARE", description: "Microfone não encontrado ou bloqueado.", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !consentAccepted) {
        toast({ title: "Dados Incompletos", description: "Preencha os campos obrigatórios e aceite os termos.", variant: "destructive" });
        return;
      }
      if (profileRef) {
        const profileData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          instagram: formData.instagram,
          cityState: formData.cityState,
          currentOccupation: formData.currentOccupation,
          experience: formData.experience,
          consentAccepted: true,
          consentTimestamp: new Date().toISOString()
        };
        setDocumentNonBlocking(profileRef, profileData, { merge: true });
      }
    }
    if (step === 2 && !outboundAccepted) {
      toast({ title: "Confirmação Necessária", description: "Confirme que entende o modelo Outbound.", variant: "destructive" });
      return;
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!audioFinalBase64) {
      toast({ title: "Falta o Áudio Final", description: "Grave seu pitch final para concluir.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    const candidateData = {
      ...formData,
      userId: user?.uid,
      timestamp: serverTimestamp(),
      status: 'PENDENTE_AVALIACAO_HUMANA'
    };

    const colRef = collection(db, 'sales_candidates');
    addDocumentNonBlocking(colRef, candidateData)
      .then(() => {
        setIsLoading(false);
        setStep(23);
      })
      .catch((err) => {
        console.error(err);
        toast({ title: "Erro ao Enviar", description: "Não foi possível salvar seu dossiê.", variant: "destructive" });
        setIsLoading(false);
      });
  };

  const startTraining = () => {
    if (!profile) {
      setStep(1);
    } else {
      setStep(2);
    }
    setView('training');
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  const modules = [
    { title: "Performance Ads", icon: <TrendingUp size={24} />, step: 3, done: !!formData.ansAds },
    { title: "Engenharia Web", icon: <Code size={24} />, step: 5, done: !!formData.ansSites },
    { title: "Semiótica & Design", icon: <Palette size={24} />, step: 7, done: !!formData.ansDesign },
    { title: "Sistemas IA", icon: <Brain size={24} />, step: 9, done: !!formData.ansChat },
    { title: "Gestão Social", icon: <Users size={24} />, step: 11, done: !!formData.ansSocial },
    { title: "Narrativa Visual", icon: <FileText size={24} />, step: 13, done: !!formData.ansNarrativa },
    { title: "Estratégia de Nicho", icon: <Target size={24} />, step: 15, done: !!formData.ansNichos },
    { title: "Negociação de Valor", icon: <PieChart size={24} />, step: 17, done: !!formData.ansPreco },
    { title: "Audição Técnica", icon: <Mic size={24} />, step: 19, done: !!audio1Base64 },
    { title: "Pitch de Elite", icon: <Trophy size={24} />, step: 20, done: !!audioFinalBase64 },
  ];

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">
                Ambiente de Imersão Sapient
              </Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
                Painel do <span className="text-primary italic lowercase">consultor.</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 p-5 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl">
               <div className="text-right">
                 <p className="text-[8px] font-black uppercase text-white/20 tracking-widest">Logado como</p>
                 <p className="text-xs font-bold text-white uppercase">{profile?.name || user?.email?.split('@')[0]}</p>
               </div>
               
               <Dialog>
                 <DialogTrigger asChild>
                   <button className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg">
                     <UserCircle size={22} />
                   </button>
                 </DialogTrigger>
                 <DialogContent className="bg-[#0c0a1a] border-white/10 text-white rounded-[3rem] max-w-md p-10">
                   <DialogHeader>
                     <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Ficha Técnica</DialogTitle>
                   </DialogHeader>
                   <div className="space-y-6 py-6">
                     <div className="grid grid-cols-1 gap-6">
                       <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                         <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">Nome Completo</p>
                         <p className="text-sm font-bold">{profile?.name || '-'}</p>
                       </div>
                       <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                         <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">WhatsApp</p>
                         <p className="text-sm font-bold">{profile?.phone || '-'}</p>
                       </div>
                       <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                         <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">Localização</p>
                         <p className="text-sm font-bold">{profile?.cityState || '-'}</p>
                       </div>
                     </div>
                   </div>
                 </DialogContent>
               </Dialog>

               <button onClick={handleSignOut} className="h-12 w-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                 <LogOut size={22} />
               </button>
            </div>
          </div>

          {view === 'dashboard' ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-10 rounded-[3rem] bg-primary text-white space-y-6 shadow-2xl shadow-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                    <Zap size={120} />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Formação Ativa</p>
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Mestre em <br/>Estratégia.</h3>
                    <Button onClick={startTraining} className="bg-white text-black hover:bg-white/90 rounded-full font-black uppercase text-[10px] px-8 h-12">
                      {profile ? "Continuar Imersão" : "Iniciar Imersão"} <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-2 p-10 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="text-xl font-black uppercase tracking-tighter">Seu Desempenho</h4>
                      <p className="text-sm text-white/40 font-medium">Módulos concluídos e validações técnicas.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-primary leading-none">
                        {modules.filter(m => m.done).length}/{modules.length}
                      </p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mt-2">Checkpoints</p>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mt-8">
                    <div 
                      className="h-full bg-primary transition-all duration-1000 shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                      style={{ width: `${(modules.filter(m => m.done).length / modules.length) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {modules.map((m, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setStep(m.step); setView('training'); }}
                    className={cn(
                      "p-8 rounded-[2.5rem] border transition-all duration-500 text-left group relative overflow-hidden h-[240px] flex flex-col justify-between",
                      m.done 
                        ? "bg-green-500/5 border-green-500/20 hover:bg-green-500/10" 
                        : "bg-white/5 border-white/10 hover:border-primary/30 hover:bg-white/10"
                    )}
                  >
                    <div className="relative z-10 flex justify-between items-start">
                      <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                        m.done ? "bg-green-500 text-white" : "bg-white/5 text-white/40 group-hover:bg-primary group-hover:text-white"
                      )}>
                        {m.done ? <CheckCircle2 size={24} /> : m.icon}
                      </div>
                      {m.done && <Badge className="bg-green-500 text-white border-none text-[7px] font-black uppercase px-3 py-1">Validado</Badge>}
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">Módulo {String(idx + 1).padStart(2, '0')}</p>
                      <h5 className="text-lg font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">{m.title}</h5>
                    </div>

                    <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                      {m.icon}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-8 rounded-[3rem] bg-amber-500/5 border border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Clock size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/60">Análise de Tempo</p>
                    <p className="text-sm font-bold text-white/80">A imersão técnica exige cerca de 45 minutos para absorção total. Não pule etapas.</p>
                  </div>
                </div>
                <Button variant="outline" className="border-white/10 text-white/40 hover:text-white hover:bg-white/5 rounded-full font-black uppercase text-[10px] px-10 h-14">
                  Suporte Técnico
                </Button>
              </div>

            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              <div className="flex items-center gap-4 mb-12">
                <button 
                  onClick={() => setView('dashboard')}
                  className="h-14 px-8 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all font-black uppercase text-[9px] flex items-center gap-3"
                >
                  <ChevronLeft size={16} /> Voltar ao Painel
                </button>
                
                <div className="flex-1 flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <div key={i} className={cn("h-1 min-w-[12px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação Profissional</h2>
                        <p className="text-white/40 text-sm">Precisamos vincular seu desempenho técnico ao seu perfil oficial.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                      <Input disabled value={formData.email} placeholder="E-mail *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold opacity-50" />
                      <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                      <Input value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="Instagram" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                      <Input value={formData.cityState} onChange={(e) => setFormData({...formData, cityState: e.target.value})} placeholder="Cidade/Estado" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                      <Input value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} placeholder="Experiência em Vendas" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                      <div className="flex items-start gap-4">
                        <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                        <label htmlFor="consent" className="text-[11px] text-white/60 font-bold leading-tight cursor-pointer uppercase">Aceito os protocolos de proteção de dados e conduta ética Sapient. *</label>
                      </div>
                    </div>
                    <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] w-full md:w-auto">
                      Gravar Dados & Iniciar <ChevronRight size={18} />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="p-8 md:p-12 rounded-[3rem] bg-amber-500/10 border border-amber-500/20 space-y-8">
                      <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px] tracking-widest"><Zap size={16} /> Briefing de Operação</div>
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">MÉTODO: OUTBOUND CIRÚRGICO</h3>
                      <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
                        Na Sapient, não "vendemos". Nós <strong>diagnosticamos</strong>. O cliente está ocupado, você o interrompe com uma informação de alto valor: o gargalo que está matando o ROI dele.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-4">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">O GATILHO:</p>
                          <p className="text-sm text-white/70 italic">"Seu site leva 8 segundos para carregar no celular. Você está pagando por cliques que nunca chegam a ver sua oferta."</p>
                        </div>
                        <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-4">
                          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">A NUANCE:</p>
                          <p className="text-sm text-white/70 italic">O Outbound exige autoridade vocal imediata. Você é o cirurgião, o cliente é o paciente com hemorragia financeira.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-white/5">
                        <Checkbox id="outbound" checked={outboundAccepted} onCheckedChange={(c) => setOutboundAccepted(c === true)} />
                        <label htmlFor="outbound" className="text-xs text-white/60 font-bold leading-tight cursor-pointer uppercase">Entendo que meu valor está na interrupção técnica e diagnóstica.</label>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Módulo 01 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 01: ADS & GMN - TEORIA */}
                {step === 3 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Inteligência de Tráfego</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Performance Ads & GMN</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Target size={20} /> Tráfego de Intenção</h4>
                        <p className="text-white/50 text-sm leading-relaxed">Capturamos a dor ativa. Quando alguém busca por um serviço no Google, a janela de compra está aberta. Se a empresa não aparece, ela está cedendo mercado para a concorrência.</p>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                          <p className="text-[9px] font-black text-white/30 uppercase">Nuance Sapient:</p>
                          <p className="text-xs text-white/80 italic font-medium">"O Google pune anúncios que levam a sites lentos (WordPress). Vender o site premium é, na verdade, baratear o custo por clique do cliente."</p>
                        </div>
                      </div>
                      
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Search size={20} /> Briefing de Diagnóstico</h4>
                        <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Quantos leads chegam hoje pelo Google?</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> O perfil do GMN tem fotos profissionais e depoimentos recentes?</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Você sabe qual o custo real de cada cliente novo?</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Conhecimento Ads <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio Técnico: Ads</h3>
                    <p className="text-white/40">Como você explicaria ao cliente que estar no topo do Google não é vaidade, mas sim a prevenção de perda de lucro imediata?</p>
                    <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua resposta estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Sites <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 02: SITES PREMIUM - TEORIA */}
                {step === 5 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Engenharia de Conversão</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Sites de Alta Fidelidade</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Code size={20} /> Next.js vs WordPress</h4>
                        <p className="text-white/50 text-sm leading-relaxed">Sites em WordPress são pesados e vulneráveis. Nós entregamos **Engenharia de Software (Next.js)**. Isso significa carregamento sub-segundo, segurança absoluta e SEO técnico nativo.</p>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                          <p className="text-[9px] font-black text-white/30 uppercase">Argumento de Venda:</p>
                          <p className="text-xs text-white/80 italic font-medium">"Um site lento é um balde furado. Você coloca dinheiro em anúncios, mas o cliente desiste antes da página abrir. Nós consertamos o balde."</p>
                        </div>
                      </div>
                      
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Database size={20} /> Nuances Técnicas</h4>
                        <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> LCP (Velocidade de Carga) menor que 1.5s</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Código limpo sem plugins desnecessários</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Mobile-First: Experiência impecável no celular</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Engenharia <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Engenharia Web</h3>
                    <p className="text-white/40">O cliente diz: "Mas meu site atual funciona". Como você prova que a engenharia de código proprietária em Next.js vai aumentar o ROI dele comparado ao WordPress atual?</p>
                    <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Defesa técnica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Design <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 03: DESIGN ESTRATÉGICO - TEORIA */}
                {step === 7 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Psicologia de Valor</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Design & Semiótica de Elite</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Palette size={20} /> Semiótica de Autoridade</h4>
                        <p className="text-white/50 text-sm leading-relaxed">Design não é "deixar bonitinho". É criar uma **Barreira de Confiança**. Usamos semiótica para comunicar prestígio e segurança. O cliente deve sentir que o serviço é premium antes de ler o preço.</p>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                          <p className="text-[9px] font-black text-white/30 uppercase">Nuance de Venda:</p>
                          <p className="text-xs text-white/80 italic font-medium">"Sua marca está vestida para uma reunião de R$ 100 ou de R$ 10.000? O design estratégico define o quanto você pode cobrar."</p>
                        </div>
                      </div>
                      
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Gem size={20} /> Diferenciais Sapient</h4>
                        <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Identidade autoral sem templates</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Hierarquia visual focada em conversão</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Alinhamento com o público decisor</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Semiótica <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 8 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Barreira de Confiança</h3>
                    <p className="text-white/40">Como você venderia um projeto de rebranding para um cliente que acha que "o logotipo atual (feito no Canva) já atende"?</p>
                    <Textarea value={formData.ansDesign} onChange={(e) => setFormData({...formData, ansDesign: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua explicação de valor..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para IA <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 04: CHAT IA - TEORIA */}
                {step === 9 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Automação Cognitiva</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Sistemas IA & Atendimento</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Brain size={20} /> Agentes de Qualificação</h4>
                        <p className="text-white/50 text-sm leading-relaxed">Não instalamos chatbots de "aperte 1 para vendas". Criamos **Agentes Cognitivos** que conversam, filtram e qualificam leads 24h. O dono só recebe o contato de quem já está pronto para comprar.</p>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                          <p className="text-[9px] font-black text-white/30 uppercase">Nuance Operacional:</p>
                          <p className="text-xs text-white/80 italic font-medium">"A IA é o filtro de curiosos. Ela economiza 4h diárias da equipe humana, permitindo foco total no fechamento."</p>
                        </div>
                      </div>
                      
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><MessageSquare size={20} /> Omnicanalidade</h4>
                        <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Integração Site, WhatsApp e Instagram</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Agendamento automático de consultas/reuniões</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Memória de contexto e suporte multilingue</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar IA <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 10 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: IA & Tempo</h3>
                    <p className="text-white/40">Como você venderia uma IA para uma empresa que recebe 200 mensagens por dia mas o comercial demora 2h para responder cada uma?</p>
                    <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua resposta estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Social <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 05: GESTÃO SOCIAL - TEORIA */}
                {step === 11 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Influência de Autoridade</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Gestão Social & Prova de Valor</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Users size={20} /> Curadoria Estratégica</h4>
                        <p className="text-white/50 text-sm leading-relaxed">Não fazemos "posts". Fazemos **Curadoria de Autoridade**. O feed do cliente deve ser o portfólio inquestionável de sua competência. Cada peça de conteúdo educa o cliente para aceitar o preço premium.</p>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                          <p className="text-[9px] font-black text-white/30 uppercase">Nuance Social:</p>
                          <p className="text-xs text-white/80 italic font-medium">"Seguidor é vaidade. Decisor é faturamento. Nosso foco é atrair o decisor através de design e copy de alto nível."</p>
                        </div>
                      </div>
                      
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Activity size={20} /> Funil de Conteúdo</h4>
                        <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Atração: Conteúdo de topo de funil</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Autoridade: Depoimentos e Processos</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Conversão: Chamadas para diagnóstico</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Social <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 12 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Social & Venda</h3>
                    <p className="text-white/40">Como você provaria para um cliente que ter 100 mil seguidores mas um visual amador está na verdade afastando os clientes de alto padrão?</p>
                    <Textarea value={formData.ansSocial} onChange={(e) => setFormData({...formData, ansSocial: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua análise de autoridade..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Narrativa <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 06: NARRATIVA VISUAL - TEORIA */}
                {step === 13 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Engenharia de Fechamento</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Narrativa Visual & Dossiês</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><FileText size={20} /> Dossiês vs Orçamentos</h4>
                        <p className="text-white/50 text-sm leading-relaxed">Não enviamos orçamentos em PDF simples. Enviamos **Dossiês de Venda de Luxo**. Transformamos processos técnicos chatos em jornadas visuais emocionantes. Onde o cliente vê clareza, ele sente segurança para investir.</p>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                          <p className="text-[9px] font-black text-white/30 uppercase">Nuance Comercial:</p>
                          <p className="text-xs text-white/80 italic font-medium">"A Narrativa Visual remove a 'névoa informacional'. Se o cliente não entende o valor em 3 segundos, ele foca no preço. O Dossiê impede isso."</p>
                        </div>
                      </div>
                      
                      <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Lightbulb size={20} /> O Poder da Clareza</h4>
                        <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Infográficos que explicam o ROI</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Apresentações que anulam objeções antes delas surgirem</li>
                          <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Padronização de alto luxo em todos os canais</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Narrativa <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 14 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Dossiê de Elite</h3>
                    <p className="text-white/40">Como um dossiê visual de alta fidelidade pode encurtar o tempo de decisão de um CEO que tem pouco tempo para ler propostas?</p>
                    <Textarea value={formData.ansNarrativa} onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua resposta..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Nichos <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULOS DE FECHAMENTO */}
                {step === 15 && (
                  <div className="space-y-8 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest px-6 py-2">Módulo Final 01: Visão de Mercado</Badge>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Estratégias de Nicho</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="text-primary font-bold text-xs uppercase">Beleza & Pet</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Agenda furada e baixa fidelização. Solução: IA Qualificadora + GMN Ativo para busca local + Design que comunica higiene e luxo.</p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="text-cyan-400 font-bold text-xs uppercase">Saúde & Direito</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Imagem amadora e dependência de indicação. Solução: Semiótica de Autoridade + Dossiês Visuais + Google Ads Cirúrgico.</p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="text-amber-400 font-bold text-xs uppercase">Varejo & Tech</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Conversão baixa no site e suporte lento. Solução: Engenharia de Sites (LCP < 1s) + IA de suporte 24/7 + Ads de Urgência.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Nicho <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 16 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Nichos</h3>
                    <p className="text-white/40">Qual seria sua abordagem estratégica para um dono de clínica de luxo que tem um site que "parece um blog de 2010" e não faz anúncios?</p>
                    <Textarea value={formData.ansNichos} onChange={(e) => setFormData({...formData, ansNichos: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua estratégia..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Ver Precificação <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 17 && (
                  <div className="space-y-8 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest px-6 py-2">Módulo Final 02: Matemática do Lucro</Badge>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Precificação Estratégica</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[8px] font-black uppercase text-white/30">
                            <th className="py-4">Combos Sapient</th>
                            <th className="py-4">Investimento</th>
                            <th className="py-4">Foco do Produto</th>
                          </tr>
                        </thead>
                        <tbody className="text-[10px] font-bold">
                          <tr className="border-b border-white/5">
                            <td className="py-4">DOMÍNIO LOCAL (Ads + GMN)</td>
                            <td className="py-4 text-primary">R$ 1.5k - R$ 3k/mês</td>
                            <td className="py-4 text-white/40">Gerar chamadas e visitas imediatas</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-4">ENGENHARIA WEB (Site Next.js)</td>
                            <td className="py-4 text-primary">R$ 3k - R$ 15k (Projeto)</td>
                            <td className="py-4 text-white/40">Eliminar perda de leads e dar autoridade</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-4">SISTEMA IA (Automação)</td>
                            <td className="py-4 text-primary">R$ 2k - R$ 8k (Setup)</td>
                            <td className="py-4 text-white/40">Escalar atendimento sem contratar humanos</td>
                          </tr>
                          <tr>
                            <td className="py-4">ECOSSISTEMA FULL (All-in)</td>
                            <td className="py-4 text-primary">R$ 5k - R$ 15k/mês</td>
                            <td className="py-4 text-white/40">Domínio total do mercado e escala agressiva</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Negociação <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 18 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Objeção de Preço</h3>
                    <p className="text-white/40">O cliente diz: "Achei caro, tem uma agência aqui do bairro que faz por 1/3 do valor". Como você ancora o valor da Sapient no ROI e na Engenharia de Elite?</p>
                    <Textarea value={formData.ansPreco} onChange={(e) => setFormData({...formData, ansPreco: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua defesa comercial..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Prova de Voz 01 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 19 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="text-center space-y-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6"><Mic size={32} /></div>
                      <h2 className="text-3xl font-black uppercase">O Desafio do Cirurgião</h2>
                      <p className="text-white/40 max-w-md mx-auto">Você ligou para um dono de clínica. O site dele demora 8s e o GMN está sem fotos. <strong>Você tem 40s para marcar a reunião usando o gatilho da hemorragia financeira.</strong></p>
                    </div>
                    
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 flex flex-col items-center gap-6">
                      {isRecording ? (
                        <Button onClick={stopRecording} className="h-20 w-20 rounded-full bg-red-500 animate-pulse"><MicOff size={32}/></Button>
                      ) : (
                        <Button onClick={() => startRecording('audio1')} className="h-24 w-24 rounded-full bg-primary shadow-2xl shadow-primary/40"><Mic size={40}/></Button>
                      )}
                      {audio1Base64 && <Badge className="bg-green-500/20 text-green-500 border-none">Resposta Gravada</Badge>}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button disabled={!audio1Base64} onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Última Etapa <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 20 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-black uppercase">O Pitch de Elite</h2>
                      <p className="text-white/40 max-w-md mx-auto">Por que você é o consultor que a studiosapient precisa para dominar o mercado? <strong>Venda sua autoridade em 60s.</strong></p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 flex flex-col items-center gap-6">
                      {isRecording ? (
                        <Button onClick={stopRecording} className="h-20 w-20 rounded-full bg-red-500 animate-pulse"><MicOff size={32}/></Button>
                      ) : (
                        <Button onClick={() => startRecording('final')} className="h-24 w-24 rounded-full bg-primary shadow-2xl shadow-primary/40"><Mic size={40}/></Button>
                      )}
                      {audioFinalBase64 && <Badge className="bg-green-500/20 text-green-500 border-none">Pitch Final Gravado</Badge>}
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button disabled={!audioFinalBase64 || isLoading} onClick={handleSubmit} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">
                        {isLoading ? <Loader2 className="animate-spin" /> : "Enviar Dossiê para Lucas Souza"}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 23 && (
                  <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                    <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse"><Trophy size={40} className="text-white" /></div>
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Imersão Concluída.</h2>
                      <p className="text-xl text-white/50 font-medium">Seu dossiê técnico foi enviado com sucesso. O Lucas Souza analisará seu perfil e audições vocais nas próximas 48 horas.</p>
                    </div>
                    <div className="pt-8"><Button onClick={() => setView('dashboard')} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px] hover:bg-white/5">Voltar ao Painel</Button></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
