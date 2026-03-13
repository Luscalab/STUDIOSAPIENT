
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
  Dna
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

                {/* MÓDULO 01: ADS & GMN (EXTENSIVO) */}
                {step === 3 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Inteligência de Tráfego</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Domínio de Tráfego <br/>de Intenção</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><BookOpen className="text-primary" /> O Conceito Sapient</h4>
                          <p className="text-white/60 leading-relaxed">
                            Agências comuns vendem "cliques". Nós vendemos **Escala Previsível**. O tráfego pago da Sapient é baseado em **Intenção de Busca**. Não interrompemos o usuário com dancinhas; nós aparecemos quando ele grita por socorro no Google.
                          </p>
                          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                            <h5 className="text-[10px] font-black uppercase text-primary tracking-widest">Diferencial Técnico: Índice de Qualidade</h5>
                            <p className="text-xs text-white/40 leading-relaxed">
                              O Google cobra mais caro de quem tem sites lentos. Nossa engenharia web barateia o anúncio. Se o site do cliente é amador, ele está **queimando verba**. Nós somos a única agência que solda o balde antes de abrir a torneira.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Globe className="text-cyan-400" /> A Máquina GMN (Local)</h4>
                          <p className="text-white/60 leading-relaxed">
                            O Google Meu Negócio é o maior ativo de uma empresa local. Um perfil sem fotos profissionais, sem avaliações e sem posts semanais é uma **porta fechada**. Nós transformamos o GMN em um canal de chamadas diretas.
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6">
                          <h5 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Dna size={16}/> Glossário Técnico</h5>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">ROAS (Return on Ad Spend)</p>
                              <p className="text-[9px] text-white/30 italic">Quanto dinheiro voltou para cada R$ 1,00 investido.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">CPC (Custo por Clique)</p>
                              <p className="text-[9px] text-white/30 italic">O "pedágio" que o Google cobra por cada visita qualificada.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Negativação de Termos</p>
                              <p className="text-[9px] text-white/30 italic">Bloquear buscas como "grátis" ou "vagas" para economizar verba.</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-primary/10 border border-primary/20 space-y-4">
                          <h5 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2"><Target size={16}/> Briefing de Ouro</h5>
                          <p className="text-[10px] text-white/60 font-bold italic leading-relaxed">
                            Pergunte ao cliente: "Se eu buscar seu serviço agora, sua clínica aparece nos 3 primeiros ou estou dando meu dinheiro para o seu concorrente?"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Módulo 01 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio Técnico: Ads & GMN</h3>
                    <p className="text-white/40">Um cliente investe R$ 2.000/mês, mas o site dele demora 10s para carregar. Como você usa o conceito de **Índice de Qualidade** e **Hemorragia de Verba** para convencê-lo de que ele está perdendo dinheiro?</p>
                    <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua resposta estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Módulo 02 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 02: ENGENHARIA WEB (EXTENSIVO) */}
                {step === 5 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Engenharia de Conversão</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Engenharia vs <br/>Amadorismo Web</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Server className="text-primary" /> Por que Next.js?</h4>
                          <p className="text-white/60 leading-relaxed">
                            90% das agências usam WordPress (um sistema de 20 anos atrás). Nós usamos **Engenharia de Software (Next.js/React)**. O WordPress é pesado, lento e vulnerável a vírus. O Next.js é blindado, carrega instantaneamente e é o queridinho do algoritmo do Google.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-2">
                              <p className="text-[10px] font-black text-red-400 uppercase">MERCADO COMUM</p>
                              <p className="text-[9px] text-white/40">WordPress, Wix, Plugins lentos, Segurança frágil.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-2">
                              <p className="text-[10px] font-black text-green-400 uppercase">SAPIENT STUDIO</p>
                              <p className="text-[9px] text-white/40">Next.js, SSR, Segurança Bancária, LCP &lt; 1.5s.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Smartphone className="text-cyan-400" /> Mobile First Real</h4>
                          <p className="text-white/60 leading-relaxed">
                            Não basta o site "ajustar" na tela. Ele precisa ser **otimizado para o 4G da rua**. Se o cliente está no trânsito e seu site não abre em 2 segundos, você perdeu a venda. Nossa engenharia garante performance extrema onde o dinheiro acontece: no celular.
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6">
                          <h5 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Zap size={16}/> Termos de Engenharia</h5>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">LCP (Largest Contentful Paint)</p>
                              <p className="text-[9px] text-white/30 italic">Tempo que o conteúdo principal leva para aparecer. O ideal é menos de 1.5s.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">SSR (Server-Side Rendering)</p>
                              <p className="text-[9px] text-white/30 italic">O site já nasce pronto no servidor, o Google ama isso para SEO.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Hydration</p>
                              <p className="text-[9px] text-white/30 italic">Processo onde o código se torna interativo para o usuário clicar.</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-cyan-500/10 border border-cyan-500/20 space-y-4">
                          <h5 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2"><MousePointer2 size={16}/> Pergunta de Briefing</h5>
                          <p className="text-[10px] text-white/60 font-bold italic leading-relaxed">
                            "Seu site foi feito por um designer ou por um engenheiro? Porque design atrai, mas engenharia é o que faz o site não travar na hora da venda."
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Módulo 02 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Engenharia Web</h3>
                    <p className="text-white/40">Como você provaria para um cliente que o site dele feito no WordPress está, na verdade, fazendo ele perder dinheiro todos os meses no Google Ads?</p>
                    <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Defesa técnica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Módulo 03 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 03: DESIGN & SEMIÓTICA (EXTENSIVO) */}
                {step === 7 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Psicologia de Valor</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Design Estratégico & <br/>Semiótica de Luxo</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Gem className="text-primary" /> A Venda Silenciosa</h4>
                          <p className="text-white/60 leading-relaxed">
                            Design não é sobre "ser bonito". É sobre **Semiótica**. O cérebro humano julga a competência técnica em milissegundos. Se sua marca parece amadora, o cliente assume que seu serviço também é. Um design de elite remove a barreira de desconfiança e permite cobrar o preço justo.
                          </p>
                          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                            <h5 className="text-[10px] font-black uppercase text-primary tracking-widest">O Conceito de Barreira de Confiança</h5>
                            <p className="text-xs text-white/40 leading-relaxed">
                              Quando o design é impecável, o cliente não questiona sua expertise. Ele entra na reunião pronto para ouvir a solução, não para testar sua capacidade. O design Sapient é um **filtro de autoridade**.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Palette className="text-cyan-400" /> Semiótica de Nicho</h4>
                          <p className="text-white/60 leading-relaxed">
                            Cores e formas comunicam mensagens subconscientes. No nicho de saúde, usamos tons que transmitem higiene e tecnologia. No jurídico, autoridade e solidez. Fugimos do Canva genérico para criar universos visuais exclusivos que ninguém consegue copiar.
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6">
                          <h5 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Sparkles size={16}/> Glossário de Valor</h5>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Semiótica</p>
                              <p className="text-[9px] text-white/30 italic">O estudo de como símbolos e cores geram significados automáticos.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Brand Equity</p>
                              <p className="text-[9px] text-white/30 italic">O valor "invisível" que faz uma marca valer mais que o produto em si.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Hierarquia Visual</p>
                              <p className="text-[9px] text-white/30 italic">Guiar o olho do cliente para o que realmente gera venda.</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-purple-500/10 border border-purple-500/20 space-y-4">
                          <h5 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2"><Activity size={16}/> Pergunta de Briefing</h5>
                          <p className="text-[10px] text-white/60 font-bold italic leading-relaxed">
                            "Sua marca atual atrai o cliente que chora desconto ou o cliente que valoriza seu tempo? Porque a culpa disso é da sua comunicação visual."
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Módulo 03 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 8 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Barreira de Confiança</h3>
                    <p className="text-white/40">Como você explicaria ao cliente que o logotipo dele feito no Canva está impedindo-o de cobrar 3x mais caro pelo serviço?</p>
                    <Textarea value={formData.ansDesign} onChange={(e) => setFormData({...formData, ansDesign: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua explicação de valor..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Módulo 04 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 04: CHAT IA (EXTENSIVO) */}
                {step === 9 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Automação Cognitiva</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Agentes IA & <br/>Qualificação de Leads</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Brain className="text-primary" /> IA que Resolve e Vende</h4>
                          <p className="text-white/60 leading-relaxed">
                            Esqueça os "chatbots" de menus que irritam o cliente. Nós implementamos **Agentes Cognitivos** baseados em **LLMs** (Cérebros Digitais). Eles conversam como humanos, tiram dúvidas técnicas e, o mais importante: **Qualificam o lead**.
                          </p>
                          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                            <h5 className="text-[10px] font-black uppercase text-primary tracking-widest">O Filtro de Lucro</h5>
                            <p className="text-xs text-white/40 leading-relaxed">
                              A IA Sapient atende 1.000 pessoas no WhatsApp, descobre quem tem orçamento para pagar e entrega para o dono da empresa apenas o "filé mignon". Isso economiza salários e multiplica a produtividade da equipe comercial.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Database className="text-cyan-400" /> RAG: Memória Proprietária</h4>
                          <p className="text-white/60 leading-relaxed">
                            Nossa IA não "inventa" respostas. Usamos uma técnica chamada **RAG**, onde alimentamos o cérebro da IA com os dados reais da empresa (preços, serviços, horários). Ela se torna a colaboradora mais experiente da empresa, disponível 24h por dia.
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6">
                          <h5 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Cpu size={16}/> Glossário IA</h5>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">LLM (Large Language Model)</p>
                              <p className="text-[9px] text-white/30 italic">O motor de inteligência por trás da conversa (ex: Gemini).</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">RAG</p>
                              <p className="text-[9px] text-white/30 italic">Alimentar a IA com documentos reais para evitar alucinações.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Lead Scoring</p>
                              <p className="text-[9px] text-white/30 italic">IA dá nota para o cliente baseado no interesse dele.</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-indigo-500/10 border border-indigo-500/20 space-y-4">
                          <h5 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2"><Zap size={16}/> Pergunta de Briefing</h5>
                          <p className="text-[10px] text-white/60 font-bold italic leading-relaxed">
                            "Quanto dinheiro você perde hoje por demorar mais de 10 minutos para responder um lead no WhatsApp? Porque a IA nunca dorme."
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Módulo 04 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 10 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: IA & Escala</h3>
                    <p className="text-white/40">Como você venderia uma IA para um dono de negócio que acha que "o atendimento humano é insubstituível", provando que ele está perdendo vendas por demora?</p>
                    <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua resposta estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Módulo 05 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 05: GESTÃO SOCIAL (EXTENSIVO) */}
                {step === 11 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Influência de Autoridade</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Curadoria Social & <br/>Atração de Decisores</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Users className="text-primary" /> O Funil Educativo</h4>
                          <p className="text-white/60 leading-relaxed">
                            Rede social não é para postar "Bom dia". É para construir **Autoridade Percebida**. Cada peça no feed deve educar o cliente e mostrar que você é o especialista de elite. Nós transformamos o Instagram de um "perfil amador" em um **Portfólio de Luxo**.
                          </p>
                          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                            <h5 className="text-[10px] font-black uppercase text-primary tracking-widest">O Decisor vs O Seguidor</h5>
                            <p className="text-xs text-white/40 leading-relaxed">
                              Não queremos 100 mil curtidas de adolescentes. Queremos 100 visualizações de CEOs e donos de empresas. O conteúdo Sapient é desenhado para atrair quem tem o cartão de crédito na mão, eliminando métricas de vaidade.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Eye className="text-cyan-400" /> Bio-Otimização</h4>
                          <p className="text-white/60 leading-relaxed">
                            A bio do Instagram é a sua página de vendas. Se ela não responde "O que você faz?", "Para quem você faz?" e "Como eu te contrato?" em 3 segundos, você está perdendo dinheiro todos os dias. Nossa gestão começa na raiz da autoridade visual.
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6">
                          <h5 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><TrendingUp size={16}/> Métricas de Elite</h5>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Autoridade Percebida</p>
                              <p className="text-[9px] text-white/30 italic">Quando o cliente decide te contratar antes mesmo de falar com você.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Social Proof (Prova Social)</p>
                              <p className="text-[9px] text-white/30 italic">Depoimentos e resultados estruturados de forma estratégica.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Engajamento Qualificado</p>
                              <p className="text-[9px] text-white/30 italic">Comentários de potenciais clientes, não de robôs ou amigos.</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-pink-500/10 border border-pink-500/20 space-y-4">
                          <h5 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2"><Target size={16}/> Pergunta de Briefing</h5>
                          <p className="text-[10px] text-white/60 font-bold italic leading-relaxed">
                            "Se um grande investidor abrir seu Instagram agora, ele vê um amador tentando vender algo ou uma autoridade que ele precisa contratar?"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Módulo 05 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 12 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Social & Autoridade</h3>
                    <p className="text-white/40">Como você convenceria um cliente que postar 3x ao dia sem estratégia visual está na verdade destruindo a autoridade dele?</p>
                    <Textarea value={formData.ansSocial} onChange={(e) => setFormData({...formData, ansSocial: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua análise estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Módulo 06 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 06: NARRATIVA VISUAL (EXTENSIVO) */}
                {step === 13 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Engenharia de Fechamento</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Narrativa Visual & <br/>Dossiês de Venda</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><FileText className="text-primary" /> Matar a Objeção na Origem</h4>
                          <p className="text-white/60 leading-relaxed">
                            Agências comuns enviam orçamentos em Word ou PDFs brancos. Nós enviamos **Dossiês de Venda de Luxo**. O objetivo é remover a **Névoa Informacional**. Se o cliente não entende seu processo, ele foca no preço. Se ele entende seu valor visualmente, ele foca no benefício.
                          </p>
                          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                            <h5 className="text-[10px] font-black uppercase text-primary tracking-widest">O Argumento do Sócio</h5>
                            <p className="text-xs text-white/40 leading-relaxed">
                              Muitas vezes você fala com o dono, mas quem decide é o sócio que não estava na reunião. Se você envia apenas um valor, o sócio diz "tá caro". Se você envia um Dossiê Sapient, o sócio diz "isso aqui é o que a gente precisa".
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Lightbulb className="text-cyan-400" /> Emotional Anchoring</h4>
                          <p className="text-white/60 leading-relaxed">
                            Nossos dossiês usam gatilhos mentais visuais para ancorar a solução na dor do cliente. Mostramos o gráfico do "Lucro Cessante" para que o cliente sinta o peso de **não contratar** a Sapient. A proposta deixa de ser um custo e vira uma proteção de patrimônio.
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6">
                          <h5 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Activity size={16}/> Engenharia Narrativa</h5>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Névoa Informacional</p>
                              <p className="text-[9px] text-white/30 italic">Quando o excesso de termos técnicos confunde o cliente e trava a venda.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Information Scent</p>
                              <p className="text-[9px] text-white/30 italic">Deixar pistas visuais que guiam o cliente até o botão de fechar.</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-white uppercase">Clareza Cognitiva</p>
                              <p className="text-[9px] text-white/30 italic">Explicar processos complexos através de infográficos de elite.</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-orange-500/10 border border-orange-500/20 space-y-4">
                          <h5 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2"><PieChart size={16}/> Pergunta de Briefing</h5>
                          <p className="text-[10px] text-white/60 font-bold italic leading-relaxed">
                            "Você envia seu preço por mensagem de texto ou apresenta um documento que justifica cada centavo do investimento?"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Módulo 06 <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 14 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Dossiê de Elite</h3>
                    <p className="text-white/40">O cliente diz: "Me manda os valores pelo WhatsApp mesmo". Como você reverte isso para apresentar um **Dossiê de Venda** e não ser comparado por preço?</p>
                    <Textarea value={formData.ansNarrativa} onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua resposta estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Estratégias <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULOS DE FECHAMENTO (EXTENSIVO) */}
                {step === 15 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest px-6 py-2">Módulo Final 01: Visão de Mercado</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Estratégias de Nicho: <br/>Onde a Dor Sangra</h2>
                    <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
                      Como consultor Sapient, você precisa ser um camaleão técnico. Cada mercado tem um sangramento financeiro específico. Abaixo, o roteiro de diagnóstico para cada um deles:
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-3 text-primary"><ShieldAlert size={20}/> <h4 className="font-bold text-xs uppercase">Beleza & Saúde (High Ticket)</h4></div>
                        <p className="text-[11px] text-white/40 leading-relaxed">
                          **A Dor:** Agenda furada, dependência extrema de indicação e imagem que não condiz com o preço da consulta.<br/>
                          **A Cura:** IA que qualifica quem pode pagar + GMN que domina a busca local + Design que comunica higiene e prestígio.
                        </p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-3 text-cyan-400"><Globe size={20}/> <h4 className="font-bold text-xs uppercase">Direito & Consultoria</h4></div>
                        <p className="text-[11px] text-white/40 leading-relaxed">
                          **A Dor:** Dificuldade em cobrar honorários de elite porque o site e o Instagram parecem amadores.<br/>
                          **A Cura:** Semiótica de Autoridade + Dossiês de Venda de Luxo + Google Ads Cirúrgico para buscas de urgência.
                        </p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-3 text-amber-400"><TrendingUp size={20}/> <h4 className="font-bold text-xs uppercase">Varejo & Tech (Escala)</h4></div>
                        <p className="text-[11px] text-white/40 leading-relaxed">
                          **A Dor:** Conversão baixa no site por lentidão e suporte humano que não dá conta da demanda noturna.<br/>
                          **A Cura:** Engenharia de Sites (LCP &lt; 1.5s) + IA de suporte 24/7 com memória real (RAG).
                        </p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-3 text-indigo-400"><BarChart3 size={20}/> <h4 className="font-bold text-xs uppercase">Imóveis & Indústria</h4></div>
                        <p className="text-[11px] text-white/40 leading-relaxed">
                          **A Dor:** Ciclo de venda longo e consultores perdendo tempo com curiosos que não têm crédito.<br/>
                          **A Cura:** Narrativa Visual de Impacto + Sistemas de Qualificação IA + Performance Local Dominante.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Conhecimento de Nicho <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 16 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Nichos Estratégicos</h3>
                    <p className="text-white/40">Escolha um dos nichos acima e descreva qual o primeiro "gargalo" que você atacaria em uma ligação de 30 segundos usando os termos técnicos que aprendeu.</p>
                    <Textarea value={formData.ansNichos} onChange={(e) => setFormData({...formData, ansNichos: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua estratégia de abordagem..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Ver Precificação & Valor <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 17 && (
                  <div className="space-y-10 animate-in fade-in">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest px-6 py-2">Módulo Final 02: Matemática do Lucro</Badge>
                      <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[8px] uppercase tracking-widest">Curso Extensivo</Badge>
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Ancoragem de Valor <br/>& ROI Real</h2>
                    <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
                      Na Sapient, não cobramos pelo "tempo gasto". Cobramos pelo **ROI gerado**. Se o nosso ecossistema traz um cliente de R$ 50.000 para o médico, cobrar R$ 5.000 é barato. Use esta tabela como base de ancoragem:
                    </p>
                    <div className="overflow-x-auto rounded-3xl border border-white/10 overflow-hidden">
                      <table className="w-full text-left border-collapse bg-white/5">
                        <thead>
                          <tr className="border-b border-white/10 text-[8px] font-black uppercase text-white/30">
                            <th className="p-6">Ecossistema Sapient</th>
                            <th className="p-6">Investimento Estimado</th>
                            <th className="p-6">Valor Entregue (Ancoragem)</th>
                          </tr>
                        </thead>
                        <tbody className="text-[10px] font-bold">
                          <tr className="border-b border-white/5 hover:bg-white/10 transition-colors">
                            <td className="p-6">DOMÍNIO LOCAL (Ads + GMN)</td>
                            <td className="p-6 text-primary">R$ 1.5k - R$ 3k/mês</td>
                            <td className="p-6 text-white/40">Fim da dependência de indicações. Chamadas diárias.</td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/10 transition-colors">
                            <td className="p-6">ENGENHARIA WEB (Site Next.js)</td>
                            <td className="p-6 text-primary">R$ 3k - R$ 15k (Projeto)</td>
                            <td className="p-6 text-white/40">Fim da perda de leads por lentidão. SEO de Elite.</td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/10 transition-colors">
                            <td className="p-6">SISTEMA IA (Automação)</td>
                            <td className="p-6 text-primary">R$ 2k - R$ 8k (Setup)</td>
                            <td className="p-6 text-white/40">Equipe comercial 10x mais produtiva. Filtro de curiosos.</td>
                          </tr>
                          <tr className="hover:bg-white/10 transition-colors">
                            <td className="p-6">ECOSSISTEMA FULL (All-in)</td>
                            <td className="p-6 text-primary">R$ 5k - R$ 15k/mês</td>
                            <td className="p-6 text-white/40">Dominância absoluta do mercado. Barreira de concorrência.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-4">
                      <h5 className="text-[10px] font-black uppercase text-white tracking-widest flex items-center gap-2"><ShieldCheck size={14}/> O Argumento do Lucro Cessante</h5>
                      <p className="text-xs text-white/60 leading-relaxed italic">
                        "O senhor não está pagando R$ 5.000 para a Sapient. O senhor está parando de perder R$ 20.000 todos os meses por causa de um processo comercial amador. Nosso projeto se paga sozinho no primeiro mês."
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Validar Negociação <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 18 && (
                  <div className="space-y-8 animate-in fade-in">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Objeção de Preço</h3>
                    <p className="text-white/40">O cliente diz: "O site está caro". Como você utiliza o argumento do **Lucro Cessante** (o dinheiro que ele já está perdendo) para ancorar o preço da Sapient?</p>
                    <Textarea value={formData.ansPreco} onChange={(e) => setFormData({...formData, ansPreco: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua defesa comercial de elite..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Prova de Voz 01: O Cirurgião <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 19 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="text-center space-y-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6"><Mic size={32} /></div>
                      <h2 className="text-3xl font-black uppercase">O Desafio do Cirurgião</h2>
                      <p className="text-white/40 max-w-md mx-auto">Você ligou para um dono de clínica. O site dele demora 8s e o GMN está sem fotos. <strong>Você tem 40s para marcar a reunião usando o gatilho da hemorragia financeira e os termos técnicos que aprendeu.</strong></p>
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
                      <Button disabled={!audio1Base64} onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Última Etapa: Pitch Final <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {step === 20 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-black uppercase">O Pitch de Elite</h2>
                      <p className="text-white/40 max-w-md mx-auto">Por que você é o consultor que a studiosapient precisa para dominar o mercado? Demonstre seu domínio sobre os pilares da agência (Ads, Engenharia, IA e Semiótica) em 60s.</p>
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
