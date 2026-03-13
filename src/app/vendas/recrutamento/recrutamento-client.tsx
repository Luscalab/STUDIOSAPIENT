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
  Database,
  Info,
  Server,
  MousePointer2,
  Sparkles,
  ShieldAlert,
  Globe,
  BarChart3,
  Dna,
  Lock,
  Volume2,
  Smile,
  Megaphone
} from "lucide-react";
import { useFirebase, useFirestore, useDoc, initiateSignOut, useMemoFirebase, setDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LocalBrain } from "@/components/ai/LocalBrain";

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
        setStep(63);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    { title: "Engenharia Web", icon: <Code size={24} />, step: 9, done: !!formData.ansSites },
    { title: "Semiótica & Design", icon: <Palette size={24} />, step: 15, done: !!formData.ansDesign },
    { title: "Sistemas IA", icon: <Brain size={24} />, step: 21, done: !!formData.ansChat },
    { title: "Gestão Social", icon: <Users size={24} />, step: 27, done: !!formData.ansSocial },
    { title: "Narrativa Visual", icon: <FileText size={24} />, step: 33, done: !!formData.ansNarrativa },
    { title: "Estratégia de Nicho", icon: <Target size={24} />, step: 39, done: !!formData.ansNichos },
    { title: "Negociação de Valor", icon: <PieChart size={24} />, step: 45, done: !!formData.ansPreco },
    { title: "Audição Técnica", icon: <Mic size={24} />, step: 51, done: !!audio1Base64 },
    { title: "Pitch de Elite", icon: <Trophy size={24} />, step: 57, done: !!audioFinalBase64 },
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
                    onClick={() => { 
                      setStep(m.step); 
                      setView('training');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
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
                    <p className="text-sm font-bold text-white/80">A imersão técnica exige cerca de 60 minutos para absorção total. Não pule etapas.</p>
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
                  {Array.from({ length: 63 }).map((_, i) => (
                    <div key={i} className={cn("h-1 min-w-[8px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
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

                {/* MÓDULO 01: ADS & GMN (5 SEÇÕES) */}
                {step === 3 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Conceito</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Tráfego de Intenção <br/>vs Interrupção</h2>
                    <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
                      Diferente do Instagram (onde o usuário está apenas passando o tempo), o Google Ads captura a **Intenção de Compra**. Nós aparecemos quando o cliente está gritando por socorro. Isso encurta o ciclo de venda em até 70%.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Glossário) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Glossário Técnico</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">ROAS</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Return on Ad Spend. Se o cliente investe R$ 1.000 e vende R$ 10.000, o ROAS é 10. É a nossa métrica de sucesso absoluta.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">CPC & Índice de Qualidade</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">O Google cobra menos de quem tem sites rápidos. Nossa engenharia barateia o custo por clique do cliente.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (GMN) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Dominância Local</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Google Meu Negócio</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      É o maior ativo de uma empresa local. Um perfil sem fotos profissionais e sem posts semanais é uma **porta fechada**. Nós transformamos o GMN em um canal de chamadas diretas para o WhatsApp.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (O Balde Furado) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Engenharia</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Balde Furado</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Anúncio sem site profissional é queimar dinheiro. Se o site demora 5 segundos para abrir, 50% das pessoas desistem antes de ver a oferta. Nós soldamos o balde antes de abrir a torneira de tráfego.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Perguntas de Ouro</h3>
                    <div className="p-8 rounded-[3rem] bg-primary/10 border border-primary/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "Se eu buscar pelo seu serviço agora, sua clínica aparece nos 3 primeiros ou estou dando meu dinheiro para o seu concorrente?"
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 01 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 8 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio Técnico: Ads & GMN</h3>
                    <p className="text-white/40">Um cliente investe R$ 2.000/mês, mas o site dele demora 10s para carregar. Como você usa o conceito de **Índice de Qualidade** e **Hemorragia de Verba** para convencê-lo de que ele está perdendo dinheiro?</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Sua resposta estratégica..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansAds} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Engenharia Web <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 02: ENGENHARIA WEB (5 SEÇÕES) */}
                {step === 9 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Fundamentos</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Engenharia vs <br/>Amadorismo CMS</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Agências comuns usam WordPress (uma ferramenta de blog de 20 anos). Nós usamos **Engenharia de Software (Next.js)**. Isso significa que não temos limites de design e o site é imune a 99% dos vírus comuns de plugins.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Glossário) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 10 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Glossário Técnico</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">LCP (Largest Contentful Paint)</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Tempo que o conteúdo principal leva para aparecer. O ideal é menos de 1.5s. WordPress raramente atinge isso sem quebrar.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">SSR (Server-Side Rendering)</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">O site já nasce pronto no servidor para o Google ler. É a diferença entre estar na página 1 ou na 10.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Segurança) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 11 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Segurança</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Blindagem de Dados</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Em um site WordPress, um plugin de galeria desatualizado pode abrir as portas para um hacker. Em nossa engenharia Next.js, não existem plugins de terceiros rodando no código base. É segurança bancária para empresas sérias.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Mobile) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 12 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Mobile First</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Otimização para o 4G</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Não basta o site "ajustar" na tela. Ele precisa ser leve para o 4G instável da rua. Nossa engenharia remove códigos inúteis, carregando apenas o que o usuário vai ver. Isso garante que o lead não desista por lentidão.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 13 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Perguntas de Ouro</h3>
                    <div className="p-8 rounded-[3rem] bg-cyan-500/10 border border-cyan-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "Seu site foi feito por um designer ou por um engenheiro? Porque design atrai, mas engenharia é o que faz o site não travar na hora da venda."
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 02 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 14 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Engenharia Web</h3>
                    <p className="text-white/40">Como você provaria para um cliente que o site dele feito no WordPress está, na verdade, fazendo ele perder dinheiro todos os meses no Google Ads?</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Defesa técnica..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansSites} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Design Estratégico <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 03: DESIGN & SEMIÓTICA (5 SEÇÕES) */}
                {step === 15 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Fundamentos</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Psicologia de Valor <br/>& Semiótica</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Design não é sobre ser "bonito". É sobre **comunicação subconsciente**. O cérebro julga a competência em milissegundos. Um design de elite remove a barreira de desconfiança e autoriza o aumento do ticket médio.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Glossário) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 16 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Glossário Técnico</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Semiótica</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">O estudo de como símbolos e cores geram significados automáticos. Ex: Roxo comunica sofisticação e criatividade no nosso ecossistema.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Hierarquia Visual</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Guiar o olho do cliente para o que realmente gera venda, eliminando distrações inúteis.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Barreira de Confiança) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 17 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Conceitos</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Barreira de Confiança</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Se o seu design parece amador, o cliente assume que seu serviço também é. Um design de elite remove essa dúvida inicial, permitindo que a reunião comercial foque na solução e não na validação da sua capacidade técnica.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Autoridade) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 18 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Autoridade</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Identidade de Prestígio</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Fugimos do Canva genérico. Nossas marcas são desenhadas do zero para transmitir solidez e exclusividade absoluta. É a diferença entre ser "um profissional" e ser "A Referência".
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 19 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Perguntas de Ouro</h3>
                    <div className="p-8 rounded-[3rem] bg-purple-500/10 border border-purple-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "Sua marca atual atrai o cliente que chora desconto ou o cliente que valoriza seu tempo? Porque a culpa disso é da sua comunicação visual."
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 03 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 20 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Barreira de Confiança</h3>
                    <p className="text-white/40">Como você explicaria ao cliente que o logotipo dele feito no Canva está impedindo-o de cobrar 3x mais caro pelo serviço?</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansDesign} onChange={(e) => setFormData({...formData, ansDesign: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Sua explicação de valor..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansDesign} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Sistemas IA <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 04: SISTEMAS IA (5 SEÇÕES) */}
                {step === 21 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Fundamentos</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">IA que Resolve <br/>e Vende</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Esqueça os "chatbots" de menus que irritam o cliente. Nós implementamos **Agentes Cognitivos** que conversam como humanos e qualificam o lead 24h por dia.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Glossário) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 22 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Glossário Técnico</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">LLM (Large Language Model)</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">O motor de inteligência por trás da conversa (ex: Gemini). É o que permite a IA entender contextos complexos.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">RAG (Retrieval-Augmented Generation)</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Alimentar a IA com documentos reais da empresa para evitar que ela invente informações.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Qualificação) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 23 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Qualificação</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Filtro de Lucro</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      A IA atende 1.000 pessoas, descobre quem tem orçamento e entrega para o comercial apenas quem está pronto para comprar. Isso economiza salários e multiplica a produtividade.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Integração) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 24 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Integração</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Onipresença Digital</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Nossas IAs rodam no WhatsApp, no site e até no Instagram. Onde o cliente chamar, a Sapient responde com autoridade técnica, sem que o dono da empresa precise estar online.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 25 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Perguntas de Ouro</h3>
                    <div className="p-8 rounded-[3rem] bg-indigo-500/10 border border-indigo-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "Quanto dinheiro você perde hoje por demorar mais de 10 minutos para responder um lead no WhatsApp? Porque a IA nunca dorme."
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 04 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 26 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: IA & Escala</h3>
                    <p className="text-white/40">Como você venderia uma IA para um dono de negócio que acha que "o atendimento humano é insubstituível", provando que ele está perdendo vendas por demora?</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Sua resposta estratégica..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansChat} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Gestão Social <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 05: GESTÃO SOCIAL (5 SEÇÕES) */}
                {step === 27 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Fundamentos</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Redes de Impacto</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Transformamos o Instagram em um portfólio de autoridade. O objetivo não é ser "blogueiro", mas ser visto como o especialista mais confiável do nicho.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Glossário) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 28 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Glossário Técnico</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Curadoria de Autoridade</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Selecionar o que postar para que o cliente sinta que você detém um conhecimento superior e exclusivo.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Decisores vs Seguidores</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Focamos em atrair quem tem o poder de compra (decisor), não apenas quem quer entretenimento.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Funil Educativo) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 29 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Estratégia</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Funil de Conteúdo</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Cada postagem deve educar o cliente sobre o valor da sua solução. O feed da Sapient transforma dúvidas em desejo de compra através de design estratégico e copywriting de elite.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Bio-Conversão) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 30 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Conversão</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Bio de Alta Performance</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      A biografia do Instagram é a sua página de vendas rápida. Ela deve conter uma promessa clara, prova de autoridade e um link direto para o fechamento. Menos frases reflexivas, mais gatilhos de lucro.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 31 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Perguntas de Ouro</h3>
                    <div className="p-8 rounded-[3rem] bg-pink-500/10 border border-pink-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "Se o seu cliente ideal abrir seu perfil agora, ele te contrata pelo seu valor ou te segue apenas pelas suas dicas gratuitas?"
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 05 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 32 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Social & Autoridade</h3>
                    <p className="text-white/40">Como você convenceria um cliente que postar 3x ao dia sem estratégia visual está na verdade destruindo a autoridade dele?</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansSocial} onChange={(e) => setFormData({...formData, ansSocial: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Sua análise estratégica..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansSocial} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Narrativa Visual <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 06: NARRATIVA VISUAL (5 SEÇÕES) */}
                {step === 33 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Fundamentos</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Dossiês de Venda <br/>& Fechamento</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Agências comuns enviam PDFs em Word. Nós enviamos **Dossiês de Venda de Luxo**. O objetivo é remover a névoa informacional e tornar o preço irrelevante perante o benefício.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Glossário) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 34 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Glossário Técnico</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Névoa Informacional</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Quando o excesso de termos técnicos confunde o cliente e trava a venda. O dossiê atua como um filtro de clareza.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Emotional Anchoring</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Ancorar a solução na dor do cliente, mostrando visualmente o prejuízo de não contratar.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Argumento do Sócio) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 35 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Estratégia</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Argumento do Sócio</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Muitas vezes o dono quer, mas o sócio nega por preço. O dossiê é feito para que, mesmo sem você na sala, a proposta venda por si só através de infográficos técnicos irrebatíveis.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Hierarquia de Desejo) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 36 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Impacto</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Hierarquia de Desejo</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Organizamos a informação de forma que o cliente siga um caminho emocional até a decisão. Primeiro a dor, depois a cura, por fim o valor do investimento. É engenharia de fechamento.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 37 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Perguntas de Ouro</h3>
                    <div className="p-8 rounded-[3rem] bg-orange-500/10 border border-orange-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "Você envia seu preço por mensagem de texto ou apresenta um documento que justifica cada centavo do investimento?"
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 06 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 38 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Dossiê de Elite</h3>
                    <p className="text-white/40">O cliente diz: "Me manda os valores pelo WhatsApp mesmo". Como você reverte isso para apresentar um **Dossiê de Venda** e não ser comparado por preço?</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansNarrativa} onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Sua resposta estratégica..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansNarrativa} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Estratégias de Nicho <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 07: ESTRATÉGIA DE NICHO (5 SEÇÕES) */}
                {step === 39 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 07: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Fundamentos</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">O Consultor <br/>Camaleão</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Você não vende para todos. Você vende para nichos específicos onde a dor financeira é aguda. Cada mercado exige um diagnóstico diferente.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Saúde) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 40 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 07: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Nicho: Saúde</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Agenda vs Autoridade</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Médicos e Clínicas sofrem com agenda furada e dependência de convênios. Nossa solução é IA de qualificação + Ads Local. Eles param de ser reféns e passam a escolher seus pacientes.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Direito) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 41 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 07: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Nicho: Direito</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Sobriedade e Escassez</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Advogados vendem confiança. Se o site ou Instagram deles é comum, eles não cobram honorários de elite. Atacamos com semiótica de autoridade e buscas de urgência no Google.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Varejo/Tech) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 42 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 07: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Nicho: Varejo/Tech</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Escala Sem Ruído</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      O gargalo aqui é a velocidade do site e o suporte. Solução: Engenharia de Sites (LCP &lt; 1.5s) + IA de suporte 24/7 para não perder vendas noturnas.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 43 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 07: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Diagnóstico por Nicho</h3>
                    <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "Para o médico: Qual sua taxa de no-show? Para o advogado: Qual a primeira coisa que o cliente vê quando te busca no Google?"
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 07 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 44 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Nichos Estratégicos</h3>
                    <p className="text-white/40">Escolha um dos nichos acima e descreva qual o primeiro "gargalo" que você atacaria em uma ligação de 30 segundos usando os termos técnicos que aprendeu.</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansNichos} onChange={(e) => setFormData({...formData, ansNichos: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Sua estratégia de abordagem..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansNichos} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Negociação de Valor <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 08: NEGOCIAÇÃO DE VALOR (5 SEÇÕES) */}
                {step === 45 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 08: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Fundamentos</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Matemática <br/>do Lucro</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Na Sapient, não vendemos horas de trabalho. Vendemos **ROI gerado**. Se nosso ecossistema traz R$ 50k/mês para o cliente, cobrar R$ 5k é barato.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Glossário) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 46 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 08: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Glossário Técnico</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Ancoragem de Valor</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Comparar o preço da Sapient com o lucro que o cliente está perdendo hoje.</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-primary font-black uppercase text-xs">Lucro Cessante</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">O dinheiro que o cliente NÃO ganha por causa de um processo comercial amador.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Escala de Preços) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 47 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 08: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Matriz de Investimento</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Escala de Investimento</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Domínio Local: R$ 1.5k-3k/mês. Engenharia Web: R$ 3k-15k. Ecossistema Full: R$ 5k-15k/mês. O cliente deve entender que o projeto se paga no primeiro mês.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Matador de Objeções) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 48 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 08: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Matador de Objeções</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">"Está Caro"</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Caro é pagar R$ 2.000 em anúncios e ter um site que não converte. Nossa solução é o fim do desperdício. O senhor não está comprando um site, está comprando a interrupção do seu prejuízo.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 49 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 08: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Briefing</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Perguntas de Ouro</h3>
                    <div className="p-8 rounded-[3rem] bg-amber-500/10 border border-amber-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        "O senhor prefere pagar mais barato para continuar perdendo leads ou investir o justo para começar a dominar o mercado?"
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste do Módulo 08 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 50 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Objeção de Preço</h3>
                    <p className="text-white/40">O cliente diz: "O site está caro". Como você utiliza o argumento do **Lucro Cessante** (o dinheiro que ele já está perdendo) para ancorar o preço da Sapient?</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                        <Textarea value={formData.ansPreco} onChange={(e) => setFormData({...formData, ansPreco: e.target.value})} className="min-h-[250px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white text-lg" placeholder="Sua defesa comercial de elite..." />
                      </div>
                      <div className="lg:col-span-4">
                        <LocalBrain text={formData.ansPreco} />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Preparação Vocal <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 09: PREPARAÇÃO VOCAL (5 SEÇÕES) */}
                {step === 51 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 09: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Oratória de Impacto</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">A Voz do <br/>Estrategista</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Em uma ligação outbound, o cliente não te vê. Sua voz é seu design. Ela deve projetar **autoridade técnica**, calma e segurança. Evite vícios de linguagem (hmmm, ééé) e mantenha um ritmo cadenciado.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Gatilho de Interrupção) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 52 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 09: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Gatilhos</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Gancho dos 3 Segundos</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Você tem 3 segundos para não ser desligado. Não peça "licença para falar". Vá direto ao ponto técnico: "Identifiquei uma falha de 8 segundos no carregamento da sua página de vendas."
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Tonality) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 53 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 09: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Vocal</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">A "Voz do Cirurgião"</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      O cirurgião não corre para dar o diagnóstico. Ele fala com clareza e autoridade. Baixe o tom da voz no final das frases. Isso transmite que você detém o conhecimento que o cliente precisa.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Espelhamento) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 54 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 09: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Psicologia</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Efeito Curiosidade</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Não entregue toda a solução por telefone. Dê o diagnóstico (o erro) e guarde a cura para a reunião. Sua voz deve sinalizar que existe um método proprietário que resolve o problema.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Briefing Vocal) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 55 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 09: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Preparação Final</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">O Desafio de 40 Segundos</h3>
                    <div className="p-8 rounded-[3rem] bg-indigo-500/10 border border-indigo-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        No próximo passo, você gravará um áudio. Respire fundo, sorria levemente (isso muda o timbre) e fale como se o cliente estivesse perdendo mil reais por minuto.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Prova de Voz 01 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* TESTE DE VOZ 01 (ETAPA 56) */}
                {step === 56 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="text-center space-y-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6"><Mic size={32} /></div>
                      <h2 className="text-3xl font-black uppercase">O Desafio do Cirurgião</h2>
                      <p className="text-white/40 max-w-md mx-auto">Você ligou para um dono de clínica. O site dele demora 8s e o GMN está sem fotos. <strong>Você tem 40s para marcar a reunião usando o gatilho da hemorragia financeira e os termos técnicos que aprendeu.</strong></p>
                    </div>
                    
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 flex flex-col items-center gap-6">
                      <div className="flex flex-col items-center gap-4">
                        {isRecording ? (
                          <Button onClick={stopRecording} className="h-24 w-24 rounded-full bg-red-500 animate-pulse border-4 border-red-500/20 transition-all scale-110 shadow-[0_0_40px_rgba(239,68,68,0.4)]">
                            <MicOff size={32}/>
                          </Button>
                        ) : (
                          <Button onClick={() => startRecording('audio1')} className="h-24 w-24 rounded-full bg-primary shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
                            <Mic size={40}/>
                          </Button>
                        )}
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
                          {isRecording ? "Gravando Resposta..." : audio1Base64 ? "Clique para regravar" : "Clique para iniciar"}
                        </p>
                      </div>
                      
                      {audio1Base64 && (
                        <div className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 animate-in zoom-in-95">
                          <p className="text-[8px] font-black uppercase text-green-500 tracking-widest text-center">Arquivo Processado com Sucesso</p>
                          <audio controls className="w-full h-10 filter invert opacity-80">
                            <source src={audio1Base64} type="audio/webm" />
                          </audio>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button disabled={!audio1Base64} onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Trilha de Pitch <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 10: TRILHA DE PITCH (5 SEÇÕES) */}
                {step === 57 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 10: Seção 1/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Branding Pessoal</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">O Pitch <br/>Inquestionável</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Seu pitch final deve mostrar que você é o sócio estratégico que o cliente sonha ter. Não é sobre currículo, é sobre a capacidade de **resolver o problema técnico dele com um ecossistema completo.**
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Síntese de Pilares) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 58 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 10: Seção 2/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Estratégia</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">A Síntese Sapient</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Combine Ads, Engenharia e IA em uma única visão de lucro. "Eu ajudo empresas a pararem de queimar verba no Google através de sites de alta engenharia e triagem automática por IA."
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Vocal Energy) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 59 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 10: Seção 3/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Energia</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Entusiasmo Técnico</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Entusiasmo não é falar gritando. É a convicção nos dados. Transmita que você acredita piamente que o ROI do seu cliente vai explodir com a nossa metodologia. O tom deve ser vibrante e decisivo.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (O Fechamento) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 60 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 10: Seção 4/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Call to Action</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">A Chamada Direta</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Não termine com "o que você acha?". Termine com autoridade: "Estou pronto para auditar seu processo e escalar seu faturamento. Vamos começar?" A segurança no CTA é o que separa o amador do elite.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Seção (Dossiê Vocal) <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 61 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 10: Seção 5/5</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Checklist Final</Badge>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Sua Assinatura de Valor</h3>
                    <div className="p-8 rounded-[3rem] bg-cyan-500/10 border border-cyan-500/20 space-y-4">
                      <p className="text-white font-bold text-sm italic leading-relaxed">
                        No próximo passo, grave seu Pitch Final de 60s. Nele, você deve se vender como a solução definitiva para o crescimento da agência. Boa sorte, estrategista.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Pitch de Elite <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* TESTE DE VOZ 02 (ETAPA 62) */}
                {step === 62 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-black uppercase">O Pitch de Elite</h2>
                      <p className="text-white/40 max-w-md mx-auto">Por que você é o consultor que a studiosapient precisa para dominar o mercado? Demonstre seu domínio sobre os pilares da agência (Ads, Engenharia, IA e Semiótica) em 60s.</p>
                    </div>
                    
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 flex flex-col items-center gap-6">
                      <div className="flex flex-col items-center gap-4">
                        {isRecording ? (
                          <Button onClick={stopRecording} className="h-24 w-24 rounded-full bg-red-500 animate-pulse border-4 border-red-500/20 transition-all scale-110 shadow-[0_0_40px_rgba(239,68,68,0.4)]">
                            <MicOff size={32}/>
                          </Button>
                        ) : (
                          <Button onClick={() => startRecording('final')} className="h-24 w-24 rounded-full bg-primary shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
                            <Mic size={40}/>
                          </Button>
                        )}
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
                          {isRecording ? "Gravando Pitch..." : audioFinalBase64 ? "Clique para regravar" : "Clique para iniciar"}
                        </p>
                      </div>
                      
                      {audioFinalBase64 && (
                        <div className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 animate-in zoom-in-95">
                          <p className="text-[8px] font-black uppercase text-green-500 tracking-widest text-center">Pitch Final Processado</p>
                          <audio controls className="w-full h-10 filter invert opacity-80">
                            <source src={audioFinalBase64} type="audio/webm" />
                          </audio>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button disabled={!audioFinalBase64 || isLoading} onClick={handleSubmit} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">
                        {isLoading ? <Loader2 className="animate-spin" /> : "Enviar Dossiê Final para Avaliação"}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 63 && (
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
