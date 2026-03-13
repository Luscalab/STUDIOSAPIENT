
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
  Sparkles
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

                {/* MÓDULO 01: ADS & GMN - TEORIA AMPLIADA */}
                {step === 3 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01: Inteligência de Tráfego</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Performance Ads &amp; GMN</h2>
                    
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Target size={20} /> O que vendemos?</h4>
                          <p className="text-white/50 text-sm leading-relaxed">Não vendemos "cliques", vendemos <strong>Tráfego de Intenção</strong>. Capturamos o cliente no exato momento em que ele digita sua dor no Google. Se ele busca por "Médico em SP", ele precisa agora. Estar lá é obrigação estratégica.</p>
                          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                            <p className="text-[9px] font-black text-white/30 uppercase">Glossário Técnico:</p>
                            <p className="text-[10px] text-white/80 font-medium">
                              <strong>CPC:</strong> Custo que o cliente paga por cada clique.<br/>
                              <strong>GMN:</strong> Google Meu Negócio. O perfil local que aparece no mapa.<br/>
                              <strong>ROAS:</strong> O quanto retornou em venda para cada R$ 1 investido.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Briefcase size={20} /> Briefing Diagnóstico</h4>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Pergunte isso ao cliente:</p>
                          <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Você sabe quanto custa cada cliente novo que chega hoje?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Se eu buscar seu serviço no Google agora, você aparece no mapa?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Seu site atual ajuda ou atrapalha a conversão dos anúncios?</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/20">
                        <h5 className="text-primary font-black uppercase text-[10px] mb-4 flex items-center gap-2"><Info size={14}/> Nuance de Elite: O Índice de Qualidade</h5>
                        <p className="text-sm text-white/60 leading-relaxed">
                          O Google pune sites lentos (WordPress mal feitos) cobrando mais caro por cada clique. Nossa **Engenharia Web** barateia o anúncio do cliente. Vendemos a economia de verba através da tecnologia.
                        </p>
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
                    <p className="text-white/40">O cliente diz que "já faz anúncios mas não vê retorno". Como você utiliza o conceito de **Índice de Qualidade** e **GMN** para diagnosticar o erro dele?</p>
                    <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua resposta estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Sites <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 02: SITES PREMIUM - TEORIA AMPLIADA */}
                {step === 5 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02: Engenharia de Conversão</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Engenharia vs Amadorismo</h2>
                    
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Server size={20} /> Por que Next.js?</h4>
                          <p className="text-white/50 text-sm leading-relaxed">Enquanto agências comuns usam WordPress (um sistema de 20 anos atrás cheio de falhas), nós usamos **Engenharia de Software (Next.js/React)**. Isso garante segurança militar e velocidade instantânea.</p>
                          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                            <p className="text-[9px] font-black text-white/30 uppercase">Glossário Técnico:</p>
                            <p className="text-[10px] text-white/80 font-medium">
                              <strong>LCP:</strong> Largest Contentful Paint. O tempo que a parte principal do site leva para abrir. (Meta: &lt; 1.5s).<br/>
                              <strong>SSR:</strong> Server-Side Rendering. O site já vem pronto do servidor, sem delay.<br/>
                              <strong>On-page SEO:</strong> Código limpo que o Google entende perfeitamente.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><MousePointer2 size={20} /> Briefing Diagnóstico</h4>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Diagnóstico de Performance:</p>
                          <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Você já testou a velocidade do seu site no 4G de um celular antigo?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Seu site atual permite que o cliente agende uma consulta em 2 cliques?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Quando seu site cai ou trava, quem resolve em menos de 10 minutos?</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-10 rounded-[3rem] bg-cyan-500/5 border border-cyan-500/20">
                        <h5 className="text-cyan-400 font-black uppercase text-[10px] mb-4 flex items-center gap-2"><Sparkles size={14}/> Argumento de Ouro: O Balde Furado</h5>
                        <p className="text-sm text-white/60 leading-relaxed">
                          Colocar dinheiro em anúncios levando para um site lento é jogar água em um balde furado. O cliente clica, o anúncio é cobrado, mas o site não abre e o cliente desiste. Nós primeiro consertamos o balde com **Engenharia**, depois abrimos a torneira do tráfego.
                        </p>
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
                    <p className="text-white/40">Como você provaria para um cliente que o site dele feito no WordPress está, na verdade, fazendo ele perder dinheiro todos os meses no Google Ads?</p>
                    <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Defesa técnica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Design <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 03: DESIGN ESTRATÉGICO - TEORIA AMPLIADA */}
                {step === 7 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03: Psicologia de Valor</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Design &amp; Semiótica</h2>
                    
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Gem size={20} /> Barreira de Confiança</h4>
                          <p className="text-white/50 text-sm leading-relaxed">Design não é estética, é <strong>Semiótica</strong>. O cliente julga sua competência técnica pela sua aparência visual nos primeiros 3 segundos. Se sua marca parece amadora, ele assume que seu serviço também é.</p>
                          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                            <p className="text-[9px] font-black text-white/30 uppercase">Glossário Técnico:</p>
                            <p className="text-[10px] text-white/80 font-medium">
                              <strong>Semiótica:</strong> Estudo de como as imagens comunicam mensagens subliminares.<br/>
                              <strong>Brand Equity:</strong> O valor financeiro que a marca agrega ao produto.<br/>
                              <strong>Hierarquia Visual:</strong> Guiar o olho do cliente para o botão de compra.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Activity size={20} /> Briefing de Posicionamento</h4>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Teste de Autoridade:</p>
                          <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Sua marca atual condiz com o valor que você cobra hoje?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> O cliente que te paga R$ 5.000 se sente seguro ao ver seu Instagram?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Você é visto como "mais um" ou como a "autoridade máxima" do nicho?</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-10 rounded-[3rem] bg-purple-500/5 border border-purple-500/20">
                        <h5 className="text-purple-400 font-black uppercase text-[10px] mb-4 flex items-center gap-2"><ShieldCheck size={14}/> O Poder do Rebranding</h5>
                        <p className="text-sm text-white/60 leading-relaxed">
                          Um design profissional remove a fricção da venda. Quando a percepção de valor é alta, o cliente para de questionar o preço e começa a questionar se você tem agenda disponível. O design é a nossa **Venda Silenciosa**.
                        </p>
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
                    <p className="text-white/40">Como você explicaria ao cliente que o logotipo dele feito no Canva está impedindo-o de cobrar 3x mais caro pelo serviço?</p>
                    <Textarea value={formData.ansDesign} onChange={(e) => setFormData({...formData, ansDesign: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua explicação de valor..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para IA <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 04: CHAT IA - TEORIA AMPLIADA */}
                {step === 9 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04: Automação Cognitiva</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Agentes IA &amp; Qualificação</h2>
                    
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Brain size={20} /> Além dos Chatbots</h4>
                          <p className="text-white/50 text-sm leading-relaxed">Esqueça os menus de "aperte 1 para vendas". Nós implementamos **Agentes Cognitivos** baseados em **LLMs** que entendem o contexto e a dor do cliente. Eles não apenas respondem, eles qualificam e convencem.</p>
                          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                            <p className="text-[9px] font-black text-white/30 uppercase">Glossário Técnico:</p>
                            <p className="text-[10px] text-white/80 font-medium">
                              <strong>LLM:</strong> Large Language Model. A tecnologia que permite a conversa humana.<br/>
                              <strong>Lead Scoring:</strong> IA dando nota para o cliente baseado no potencial de compra.<br/>
                              <strong>RAG:</strong> Alimentar a IA com dados específicos da empresa para que ela nunca erre.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Activity size={20} /> Briefing de Eficiência</h4>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Teste de Tempo:</p>
                          <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Quanto tempo sua equipe perde respondendo dúvidas repetitivas?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Você atende clientes de madrugada ou perde esses leads?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Qual a porcentagem de curiosos que seu comercial atende hoje?</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/20">
                        <h5 className="text-indigo-400 font-black uppercase text-[10px] mb-4 flex items-center gap-2"><Zap size={14}/> O Filtro de Lucro</h5>
                        <p className="text-sm text-white/60 leading-relaxed">
                          A IA da Sapient é um filtro. Ela atende 1.000 pessoas por dia e entrega para o dono apenas os 10 que realmente têm dinheiro e urgência. Isso economiza salários e aumenta a conversão do time humano.
                        </p>
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
                    <p className="text-white/40">Como você venderia uma IA para um dono de negócio que acha que "o atendimento humano é insubstituível", provando que ele está perdendo vendas por demora?</p>
                    <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua resposta estratégica..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Social <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 05: GESTÃO SOCIAL - TEORIA AMPLIADA */}
                {step === 11 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05: Influência de Autoridade</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Curadoria de Autoridade</h2>
                    
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Users size={20} /> Menos Posts, Mais Vendas</h4>
                          <p className="text-white/50 text-sm leading-relaxed">Não fazemos "postagens". Fazemos **Curadoria de Autoridade**. Cada peça no feed do cliente é desenhada para educar o mercado e mostrar que ele é a escolha óbvia. O feed é o portfólio de luxo dele.</p>
                          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                            <p className="text-[9px] font-black text-white/30 uppercase">Glossário Técnico:</p>
                            <p className="text-[10px] text-white/80 font-medium">
                              <strong>Autoridade Percebida:</strong> Quando o cliente assume que você é bom sem nunca ter falado com você.<br/>
                              <strong>Social Proof:</strong> Prova social estruturada para gerar desejo.<br/>
                              <strong>Growth Estratégico:</strong> Crescer com decisores, não com seguidores curiosos.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Eye size={20} /> Briefing de Percepção</h4>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Teste de Feed:</p>
                          <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Se um grande investidor abrir seu Instagram agora, ele te contrataria?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Suas postagens educam o cliente sobre seu método ou são apenas frases motivacionais?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Você está atraindo quem quer preço ou quem quer resultado?</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-10 rounded-[3rem] bg-pink-500/5 border border-pink-500/20">
                        <h5 className="text-pink-400 font-black uppercase text-[10px] mb-4 flex items-center gap-2"><Target size={14}/> O Imã de Decisores</h5>
                        <p className="text-sm text-white/60 leading-relaxed">
                          Nossa gestão social foca no **Decisor**. Não queremos 100 mil adolescentes curtindo, queremos 100 CEOs observando. O conteúdo Sapient é feito para gerar o pensamento: "Eu preciso desse cara no meu time".
                        </p>
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
                    <p className="text-white/40">Como você convenceria um cliente que postar 3x ao dia sem estratégia visual está na verdade destruindo a autoridade dele?</p>
                    <Textarea value={formData.ansSocial} onChange={(e) => setFormData({...formData, ansSocial: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua análise de autoridade..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Narrativa <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULO 06: NARRATIVA VISUAL - TEORIA AMPLIADA */}
                {step === 13 && (
                  <div className="space-y-10 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06: Engenharia de Fechamento</Badge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Narrativa Visual &amp; Dossiês</h2>
                    
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><FileText size={20} /> Matar a Objeção na Proposta</h4>
                          <p className="text-white/50 text-sm leading-relaxed">Não enviamos orçamentos em PDF branco. Enviamos **Dossiês de Venda de Luxo**. O objetivo é remover a "Névoa Informacional". Se o cliente vê clareza no método, ele não sente medo do preço.</p>
                          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                            <p className="text-[9px] font-black text-white/30 uppercase">Glossário Técnico:</p>
                            <p className="text-[10px] text-white/80 font-medium">
                              <strong>Névoa Informacional:</strong> Quando o cliente não entende o que você faz e foca apenas no preço.<br/>
                              <strong>Storytelling Comercial:</strong> A sequência lógica de fatos que leva ao "sim".<br/>
                              <strong>Infográfico de Valor:</strong> Desenhar o lucro do cliente para ele entender rápido.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                          <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Lightbulb size={20} /> Briefing de Apresentação</h4>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Teste de Proposta:</p>
                          <ul className="space-y-4 text-xs font-bold text-white/60 uppercase">
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Seu cliente entende seu diferencial técnico em menos de 1 minuto lendo sua proposta?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Sua proposta atual parece um boleto ou um passaporte para o próximo nível?</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Você envia o preço por texto no WhatsApp ou apresenta um documento de autoridade?</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-10 rounded-[3rem] bg-orange-500/5 border border-orange-500/20">
                        <h5 className="text-orange-400 font-black uppercase text-[10px] mb-4 flex items-center gap-2"><Activity size={14}/> A Arma do Fechamento</h5>
                        <p className="text-sm text-white/60 leading-relaxed">
                          O Dossiê da Sapient é feito para ser compartilhado entre sócios. Ele fala sozinho. Quando o dono da empresa mostra para o sócio, a narrativa visual já vendeu a ideia. Reduzimos o ciclo de decisão de semanas para minutos.
                        </p>
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
                    <p className="text-white/40">O cliente diz: "Me manda os valores pelo WhatsApp mesmo". Como você reverte isso para apresentar um **Dossiê de Venda** e não ser comparado por preço?</p>
                    <Textarea value={formData.ansNarrativa} onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua resposta..." />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Nichos <ChevronRight size={16}/></Button>
                    </div>
                  </div>
                )}

                {/* MÓDULOS DE FECHAMENTO - ESTRATÉGIA AMPLIADA */}
                {step === 15 && (
                  <div className="space-y-8 animate-in fade-in">
                    <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest px-6 py-2">Módulo Final 01: Visão de Mercado</Badge>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Estratégias de Nicho</h2>
                    <p className="text-white/40 text-sm max-w-2xl">Cada mercado tem um "sangramento" diferente. Aprenda a identificar onde dói para aplicar a cura Sapient correta.</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="text-primary font-bold text-xs uppercase">Beleza &amp; Pet</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Agenda furada e baixa fidelização. <br/>Solução: IA Qualificadora + GMN Ativo para busca local + Design que comunica higiene e luxo.</p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="text-cyan-400 font-bold text-xs uppercase">Saúde &amp; Direito</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Imagem amadora e dependência de indicação. <br/>Solução: Semiótica de Autoridade + Dossiês Visuais + Google Ads Cirúrgico.</p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="text-amber-400 font-bold text-xs uppercase">Varejo &amp; Tech</h4>
                        <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Conversão baixa no site e suporte lento. <br/>Solução: Engenharia de Sites (LCP &lt; 1.5s) + IA de suporte 24/7 + Ads de Urgência.</p>
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
                    <p className="text-white/40">Escolha um dos nichos acima e descreva qual o primeiro "gargalo" que você atacaria em uma ligação de 30 segundos.</p>
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
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Ancoragem de Valor</h2>
                    <p className="text-white/40 text-sm">Não cobramos pelo tempo gasto, mas pelo ROI entregue. Use esta tabela como base de ancoragem:</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[8px] font-black uppercase text-white/30">
                            <th className="py-4">Combos Sapient</th>
                            <th className="py-4">Investimento</th>
                            <th className="py-4">Valor Entregue</th>
                          </tr>
                        </thead>
                        <tbody className="text-[10px] font-bold">
                          <tr className="border-b border-white/5">
                            <td className="py-4">DOMÍNIO LOCAL (Ads + GMN)</td>
                            <td className="py-4 text-primary">R$ 1.5k - R$ 3k/mês</td>
                            <td className="py-4 text-white/40">Agenda cheia e chamadas diárias</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-4">ENGENHARIA WEB (Site Next.js)</td>
                            <td className="py-4 text-primary">R$ 3k - R$ 15k (Projeto)</td>
                            <td className="py-4 text-white/40">Fim da perda de leads por lentidão</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-4">SISTEMA IA (Automação)</td>
                            <td className="py-4 text-primary">R$ 2k - R$ 8k (Setup)</td>
                            <td className="py-4 text-white/40">Equipe comercial 10x mais produtiva</td>
                          </tr>
                          <tr>
                            <td className="py-4">ECOSSISTEMA FULL (All-in)</td>
                            <td className="py-4 text-primary">R$ 5k - R$ 15k/mês</td>
                            <td className="py-4 text-white/40">Dominância absoluta do mercado local</td>
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
                    <p className="text-white/40">O cliente diz: "O site está caro". Como você utiliza o argumento do **Lucro Cessante** (o dinheiro que ele já está perdendo) para ancorar o preço da Sapient?</p>
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
