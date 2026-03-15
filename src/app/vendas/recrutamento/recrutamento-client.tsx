'use client';

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
  Megaphone,
  Camera,
  Upload,
  BookMarked,
  Filter,
  ExternalLink,
  Mail,
  Star,
  MapPin,
  Quote,
  MessageCircle,
  CalendarDays,
  History,
  AlertCircle,
  Copy
} from "lucide-react";
import { useFirebase, useFirestore, useDoc, useCollection, initiateSignOut, useMemoFirebase, setDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase";
import { collection, doc, query, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function RecrutamentoClient() {
  const [view, setView] = useState<'dashboard' | 'training' | 'profile' | 'leads'>('dashboard');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    cityState: "",
    currentOccupation: "",
    experience: "",
    photoUri: "",
    resumeUri: "",
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

  const [leadSearch, setLeadSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isMeetingDialogOpen, setIsMeetingAgendamentoOpen] = useState(false);
  const [meetingData, setMeetingData] = useState({ date: "", time: "", notes: "" });

  const { toast } = useToast();
  const { auth, user, isUserLoading } = useFirebase();
  const db = useFirestore();
  const router = useRouter();
  
  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'sales_profiles', user.uid);
  }, [db, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  const leadsQuery = useMemoFirebase(() => {
    if (!db || !profile?.leadsEnabled) return null;
    return query(collection(db, 'commercial_leads'), orderBy('createdAt', 'desc'));
  }, [db, profile?.leadsEnabled]);

  const { data: leads, isLoading: isLeadsLoading } = useCollection(leadsQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/vendas/auth");
    }
    if (user && formData.email === "") {
      setFormData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user, isUserLoading, router, formData.email]);

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

  const getInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSignOut = () => {
    initiateSignOut(auth);
    router.push("/vendas/auth");
  };

  const handleCopy = (text: string, label: string) => {
    if (!text || text === "-" || typeof window === 'undefined') return;
    try {
      if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          toast({
            title: `[ ${label.toUpperCase()} COPIADO ]`,
            description: "Pronto para uso na sua área de transferência.",
            className: "bg-black border-primary text-white font-black uppercase tracking-widest text-[9px]"
          });
        }).catch(e => console.warn("Clipboard access denied", e));
      }
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  const maskEmail = (email: any) => {
    try {
      const sEmail = String(email || "");
      if (!sEmail || sEmail === "-" || !sEmail.includes('@')) return sEmail || "-";
      const parts = sEmail.split('@');
      const userPart = parts[0] || "";
      const domainPart = parts[1] || "";
      const maskedUser = userPart.length > 3 ? userPart.substring(0, 3) + "***" : userPart + "***";
      return `${maskedUser}@***.com`;
    } catch {
      return String(email || "-");
    }
  };

  const maskPhone = (phone: any) => {
    try {
      const sPhone = String(phone || "");
      if (!sPhone || sPhone === "-") return "-";
      const digits = sPhone.replace(/\D/g, '');
      if (digits.length < 8) return sPhone;
      return `${sPhone.substring(0, 4)} **** ${sPhone.slice(-2)}`;
    } catch {
      return String(phone || "-");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'photoUri' | 'resumeUri') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 800000) {
      toast({ title: "Arquivo muito grande", description: "Limite de 800KB para uploads.", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setFormData(prev => ({ ...prev, [field]: result }));
      if (profileRef) setDocumentNonBlocking(profileRef, { [field]: result }, { merge: true });
      toast({ title: "UPLOAD CONCLUÍDO" });
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.name.trim() || !consentAccepted)) {
      toast({ title: "Dados Incompletos", variant: "destructive" });
      return;
    }
    if (step === 1 && profileRef) {
      setDocumentNonBlocking(profileRef, { ...formData, consentAccepted: true, consentTimestamp: new Date().toISOString() }, { merge: true });
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateLeadStatus = (leadId: string, status: string) => {
    if (!leadId) return;
    const leadRef = doc(db, 'commercial_leads', leadId);
    updateDocumentNonBlocking(leadRef, { 
      status, 
      updatedBy: user?.uid,
      lastUpdateAt: new Date().toISOString()
    });
    toast({ title: "Status Atualizado", description: `Progresso salvo para ${status.replace(/_/g, ' ')}.` });
    setSelectedLead((prev: any) => prev ? { ...prev, status } : null);
  };

  const handleScheduleMeeting = () => {
    if (!selectedLead || !meetingData.date || !meetingData.time) {
      toast({ title: "Dados incompletos", variant: "destructive" });
      return;
    }
    try {
      const meetingIso = new Date(`${meetingData.date}T${meetingData.time}`).toISOString();
      const leadRef = doc(db, 'commercial_leads', selectedLead.id);
      updateDocumentNonBlocking(leadRef, { 
        status: 'REUNIAO_AGENDADA',
        meetingDate: meetingIso,
        meetingNotes: meetingData.notes,
        updatedBy: user?.uid,
        lastUpdateAt: new Date().toISOString()
      });
      setIsMeetingAgendamentoOpen(false);
      toast({ title: "Reunião Registrada", description: "O setor administrativo foi notificado." });
      setSelectedLead((prev: any) => prev ? { ...prev, status: 'REUNIAO_AGENDADA', meetingDate: meetingIso } : null);
    } catch (e) {
      toast({ title: "Erro na Data", description: "Verifique o formato inserido.", variant: "destructive" });
    }
  };

  const getAlgorithmInsight = (rating: any) => {
    const r = parseFloat(String(rating || "4.0").replace(',', '.')) || 4.0;
    if (r >= 4.8) return {
      label: "AUTORIDADE DE ELITE",
      color: "text-green-400",
      bg: "bg-green-400/10",
      desc: "O algoritmo do Google já prioriza esta empresa. O erro aqui é a estagnação por excesso de confiança.",
      focus: "Escala agressiva via Ads e manutenção de prestígio visual."
    };
    if (r >= 4.5) return {
      label: "ALTO PADRÃO COMPETITIVO",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      desc: "Empresa bem posicionada, mas brigando por preço nos detalhes. O algoritmo exige diferenciação visual.",
      focus: "Narrativa de Luxo e Design Autoral para filtrar clientes de maior ticket."
    };
    if (r >= 4.0) return {
      label: "ZONA DE CONFORTO",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      desc: "Risco alto de perda de posição para novos players. O algoritmo entrega alcance, mas a conversão está caindo.",
      focus: "Engenharia de Conversão e Gestão Social ativa para reter autoridade."
    };
    return {
      label: "BARREIRA DE CONFIANÇA",
      color: "text-red-400",
      bg: "bg-red-400/10",
      desc: "O algoritmo penaliza o alcance orgânico devido à nota baixa. Existe um atrito de confiança imediato.",
      focus: "Gestão de Reputação Urgente e Reestruturação completa da vitrine digital."
    };
  };

  const modules = [
    { title: "Performance Ads", icon: <TrendingUp size={24} />, step: 3, done: !!formData.ansAds },
    { title: "Engenharia Web", icon: <Code size={24} />, step: 9, done: !!formData.ansSites },
    { title: "Semiótica & Design", icon: <Palette size={24} />, step: 15, done: !!formData.ansDesign },
    { title: "Sistemas IA", icon: <Brain size={24} />, step: 21, done: !!formData.ansChat },
    { title: "Gestão Social", icon: <Users size={24} />, step: 27, done: !!formData.ansSocial },
    { title: "Narrativa Visual", icon: <FileText size={24} />, step: 33, done: !!formData.ansNarrativa },
    { title: "Estratégia de Nicho", icon: <Target size={24} />, step: 39, done: !!formData.ansNichos },
    { title: "Negociação de Valor", icon: <PieChart size={24} />, step: 45, done: !!formData.ansPreco },
  ];

  const filteredLeads = leads?.filter(l => 
    (l.companyName || "").toLowerCase().includes(leadSearch.toLowerCase()) || 
    (l.category || "").toLowerCase().includes(leadSearch.toLowerCase())
  );

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CONTATO_INICIADO': return 'Contato Iniciado';
      case 'NEGOCIACAO': return 'Em Negociação';
      case 'AGUARDANDO_RETORNO': return 'Aguardando Retorno';
      case 'REUNIAO_AGENDADA': return 'Reunião Agendada';
      case 'FECHADO': return 'Fechado / Ganho';
      case 'PERDIDO': return 'Perdido';
      default: return 'Novo Lead';
    }
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-24 pb-20 md:pt-48">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 md:px-6 py-1.5 md:py-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest">Portal de Imersão Sapient</Badge>
              <h1 className="font-headline text-3xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">Painel do <span className="text-primary italic lowercase">consultor.</span></h1>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 bg-white/5 p-3 md:p-5 rounded-2xl md:rounded-[2.5rem] border border-white/10 backdrop-blur-3xl w-full md:w-auto">
               <div className="text-left md:text-right flex-1 md:flex-none">
                 <p className="text-[7px] md:text-[8px] font-black uppercase text-white/20 tracking-widest">Bem-vindo,</p>
                 <p className="text-[10px] md:text-xs font-bold text-white uppercase truncate max-w-[150px]">{profile?.name || user?.email?.split('@')[0]}</p>
               </div>
               
               <div className="flex gap-2">
                 <Dialog>
                   <DialogTrigger asChild>
                     <button className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all overflow-hidden">
                       {formData.photoUri ? <img src={formData.photoUri} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-black text-xs">{getInitials(formData.name || "")}</div>}
                     </button>
                   </DialogTrigger>
                   <DialogContent className="bg-[#0c0a1a] border-white/10 text-white rounded-[3rem] p-10">
                     <DialogHeader><DialogTitle className="text-2xl font-black uppercase">Ficha Técnica</DialogTitle></DialogHeader>
                     <div className="flex flex-col items-center gap-6 py-6">
                        <div className="h-24 w-24 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden relative group">
                          {formData.photoUri ? <img src={formData.photoUri} alt="" className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-black text-2xl">{getInitials(formData.name || "")}</div>}
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                            <Camera size={20} /><input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'photoUri')} className="hidden" />
                          </label>
                        </div>
                        <label className="w-full h-14 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-all">
                          <Upload size={16} /><span className="text-[9px] font-black uppercase tracking-widest">{formData.resumeUri ? "Atualizar Currículo" : "Anexar Currículo"}</span>
                          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resumeUri')} className="hidden" />
                        </label>
                     </div>
                   </DialogContent>
                 </Dialog>
                 <button onClick={handleSignOut} className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><LogOut size={20} /></button>
               </div>
            </div>
          </div>

          {view === 'dashboard' ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-10 rounded-[3rem] bg-primary text-white space-y-6 shadow-2xl relative overflow-hidden group">
                  <Zap size={100} className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                  <div className="relative z-10 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Formação Ativa</p>
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Mestre em <br/>Estratégia.</h3>
                    <Button onClick={() => setView('training')} className="bg-white text-black hover:bg-white/90 rounded-full font-black uppercase text-[10px] px-8 h-12 shadow-xl">Continuar Imersão <ChevronRight size={14} /></Button>
                  </div>
                </div>

                {profile?.leadsEnabled && (
                  <div className="p-10 rounded-[3rem] bg-cyan-500 text-black space-y-6 shadow-2xl relative overflow-hidden group">
                    <Database size={100} className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Base de Prospecção</p>
                      <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Painel de <br/>Leads Elite.</h3>
                      <Button onClick={() => setView('leads')} className="bg-black text-white hover:bg-black/90 rounded-full font-black uppercase text-[10px] px-8 h-12 shadow-xl">Acessar Leads <ChevronRight size={14} /></Button>
                    </div>
                  </div>
                )}

                <div className={cn("p-10 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col justify-between", profile?.leadsEnabled ? "md:col-span-1" : "md:col-span-2")}>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-black uppercase tracking-tighter">Seu Desempenho</h4>
                    <p className="text-4xl font-black text-primary leading-none">{modules.filter(m => m.done).length}/{modules.length}</p>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mt-8">
                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(modules.filter(m => m.done).length / modules.length) * 100}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4"><div className="h-px flex-1 bg-white/10" /><div className="flex items-center gap-3 text-white/40"><BookMarked size={16} className="text-primary" /><h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Treinamentos & Imersão Técnica</h4></div><div className="h-px flex-1 bg-white/10" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {modules.map((m, idx) => (
                    <button key={idx} onClick={() => { setStep(m.step); setView('training'); window.scrollTo({top:0, behavior:'smooth'}); }} className={cn("p-8 rounded-[2.5rem] border transition-all duration-500 text-left group relative overflow-hidden h-[240px] flex flex-col justify-between", m.done ? "bg-green-500/5 border-green-500/20 hover:bg-green-500/10" : "bg-white/5 border-white/10 hover:border-primary/30")}>
                      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-lg", m.done ? "bg-green-500 text-white" : "bg-white/5 text-white/40 group-hover:bg-primary group-hover:text-white")}>{m.done ? <CheckCircle2 size={24} /> : m.icon}</div>
                      <div className="relative z-10"><p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">Módulo {String(idx + 1).padStart(2, '0')}</p><h5 className="text-lg font-black uppercase tracking-tighter group-hover:text-primary transition-colors">{m.title}</h5></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : view === 'leads' ? (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <button onClick={() => setView('dashboard')} className="h-14 px-8 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white transition-all font-black uppercase text-[9px] flex items-center gap-3"><ChevronLeft size={14} /> Voltar ao Painel</button>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                  <input type="text" placeholder="Buscar por empresa ou categoria..." value={leadSearch} onChange={(e) => setLeadSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-6 rounded-2xl font-bold focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLeads?.length === 0 ? (
                  <div className="col-span-full p-20 text-center bg-white/5 border border-dashed border-white/10 rounded-[3rem] space-y-4">
                    <Database size={40} className="mx-auto text-white/10" />
                    <p className="text-white/20 font-black uppercase tracking-widest text-xs">Nenhum lead estratégico disponível.</p>
                  </div>
                ) : filteredLeads?.map((l) => (
                  <div key={l.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 hover:bg-white/10 transition-all group relative overflow-hidden border-t-4 border-t-primary/20">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest">{getStatusLabel(l.status)}</Badge>
                      <Badge className={cn("text-[8px] font-black py-1 px-3 border-none", (parseFloat(String(l.googleRating).replace(',','.')) || 0) >= 4.5 ? "bg-green-500 text-white" : "bg-amber-500 text-black")}>
                        <Star size={8} className="mr-1 fill-current" /> {l.googleRating || "4.0"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">{l.companyName}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                        <UserCircle size={12} className="text-primary" /> {l.decisionMaker || l.contactName || "Responsável"}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        <Lock size={10} className="text-primary/40" /> {maskEmail(l.email)}
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedLead(l)}
                      className="w-full h-14 bg-white text-black hover:bg-primary hover:text-white rounded-2xl font-black uppercase text-[9px] tracking-widest shadow-xl transition-all"
                    >
                      Ver Estratégia Completa <ChevronRight size={14} className="ml-2" />
                    </Button>
                  </div>
                ))}
              </div>

              <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
                <SheetContent className="bg-[#08070b] border-l-white/10 text-white p-0 sm:max-w-xl w-full overflow-y-auto no-scrollbar">
                  {selectedLead && (
                    <div className="space-y-0 pb-32">
                      <SheetHeader className="sr-only">
                        <SheetTitle>{selectedLead.companyName}</SheetTitle>
                        <SheetDescription>Dossiê estratégico de prospecção</SheetDescription>
                      </SheetHeader>

                      <div className="p-8 md:p-12 space-y-8 bg-gradient-to-b from-white/5 to-transparent">
                        <div className="space-y-4">
                          <button onClick={() => setSelectedLead(null)} className="text-primary font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-2 mb-6">
                            <ChevronLeft size={14} /> Voltar aos Leads
                          </button>
                          <div className="flex items-center gap-3 text-red-500 mb-2">
                            <ShieldAlert size={16} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Acesso Restrito - Área Monitorada</span>
                          </div>
                          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">{selectedLead.companyName}</h2>
                          <div className="flex flex-wrap gap-3 items-center">
                            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 uppercase tracking-widest font-black text-[9px]">
                              {getStatusLabel(selectedLead.status)}
                            </Badge>
                            <Badge className={cn("px-4 py-2 uppercase tracking-widest font-black text-[9px] border-none", (parseFloat(String(selectedLead.googleRating).replace(',','.')) || 0) >= 4.5 ? "bg-green-500 text-white" : "bg-amber-500 text-black")}>
                              <Star size={10} className="mr-1 fill-current inline" /> {selectedLead.googleRating || "4.0"} Google Maps
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary"><UserCircle size={20} /></div>
                            <div>
                              <p className="text-[7px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Decisor Principal</p>
                              <p className="text-xs font-black uppercase tracking-tight">{selectedLead.decisionMaker || selectedLead.contactName || "Responsável"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary"><MapPin size={20} /></div>
                            <div>
                              <p className="text-[7px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Localização & Raio</p>
                              <p className="text-xs font-black uppercase tracking-tight">{selectedLead.region || "Geral"} — {selectedLead.address || "Endereço não informado"}</p>
                            </div>
                          </div>
                          {selectedLead.website && selectedLead.website !== "-" && (
                            <a href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`} target="_blank" className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary"><Globe size={20} /></div>
                              <div>
                                <p className="text-[7px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Vitrine Digital</p>
                                <p className="text-xs font-black uppercase tracking-tight text-primary">Acessar Site Oficial <ExternalLink size={10} className="inline ml-1" /></p>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="px-8 md:px-12 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-white/10" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Algoritmo Google Maps</h3>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        
                        {(() => {
                          const insight = getAlgorithmInsight(selectedLead.googleRating);
                          return (
                            <div className={cn("p-6 rounded-[2.5rem] border border-white/5 space-y-4", insight.bg)}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <AlertCircle className={cn("h-5 w-5", insight.color)} />
                                  <span className={cn("text-[10px] font-black uppercase tracking-widest", insight.color)}>{insight.label}</span>
                                </div>
                                <div className="h-1 w-12 bg-white/10 rounded-full" />
                              </div>
                              <p className="text-sm text-white/70 font-medium leading-relaxed italic">{insight.desc}</p>
                              <div className="pt-2 border-t border-white/5">
                                <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Foco da Negociação:</p>
                                <p className="text-xs font-bold text-white uppercase">{insight.focus}</p>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="px-8 md:px-12 pt-8 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-white/10" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Gestão de Progresso</h3>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <button onClick={() => updateLeadStatus(selectedLead.id, 'CONTATO_INICIADO')} className={cn("py-4 rounded-xl font-black uppercase text-[8px] tracking-widest border transition-all", selectedLead.status === 'CONTATO_INICIADO' ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10")}>Contato Iniciado</button>
                          <button onClick={() => updateLeadStatus(selectedLead.id, 'NEGOCIACAO')} className={cn("py-4 rounded-xl font-black uppercase text-[8px] tracking-widest border transition-all", selectedLead.status === 'NEGOCIACAO' ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10")}>Em Negociação</button>
                          <button onClick={() => updateLeadStatus(selectedLead.id, 'AGUARDANDO_RETORNO')} className={cn("py-4 rounded-xl font-black uppercase text-[8px] tracking-widest border transition-all", selectedLead.status === 'AGUARDANDO_RETORNO' ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10")}>Aguardando Retorno</button>
                          
                          <Dialog open={isMeetingDialogOpen} onOpenChange={setIsMeetingAgendamentoOpen}>
                            <DialogTrigger asChild>
                              <button className={cn("py-4 rounded-xl font-black uppercase text-[8px] tracking-widest border transition-all", selectedLead.status === 'REUNIAO_AGENDADA' ? "bg-green-500 border-green-500 text-white" : "bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white")}>Registrar Reunião</button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#0c0a1a] border-white/10 text-white rounded-[3rem] p-10">
                              <DialogHeader><DialogTitle className="text-2xl font-black uppercase">Agendar Fechamento</DialogTitle></DialogHeader>
                              <div className="space-y-4 py-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-white/30">Data</Label><Input type="date" value={meetingData.date} onChange={(e) => setMeetingData({...meetingData, date: e.target.value})} className="bg-white/5 border-white/10" /></div>
                                  <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-white/30">Hora</Label><Input type="time" value={meetingData.time} onChange={(e) => setMeetingData({...meetingData, time: e.target.value})} className="bg-white/5 border-white/10" /></div>
                                </div>
                                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-white/30">Pauta / Observações</Label><Textarea value={meetingData.notes} onChange={(e) => setMeetingData({...meetingData, notes: e.target.value})} className="bg-white/5 border-white/10" placeholder="Ex: Apresentação de dossiê visual e proposta comercial..." /></div>
                              </div>
                              <DialogFooter><Button onClick={handleScheduleMeeting} className="w-full h-14 bg-green-500 hover:bg-green-600 rounded-2xl font-black uppercase text-[10px]">Gravar Reunião na Base</Button></DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <div className="p-8 md:p-12 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-white/10" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">O Diagnóstico</h3>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <div className="p-8 rounded-[2rem] bg-white/[0.03] border-l-4 border-l-primary space-y-4">
                          <div className="text-white/60 text-sm md:text-base leading-relaxed font-medium">
                            {selectedLead.bottlenecks && selectedLead.bottlenecks !== "-" ? (
                              <div className="space-y-4">
                                {selectedLead.bottlenecks.split('\n').map((line: string, i: number) => line.trim() && (
                                  <div key={i} className="flex gap-3">
                                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    <p>{line}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="italic text-white/20">Nenhum gargalo técnico identificado preliminarmente.</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="px-8 md:px-12 pb-12 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-white/10" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Plano de Ataque</h3>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(selectedLead.suggestedServices) ? selectedLead.suggestedServices : ["Sites Premium", "Performance Ads"]).map((service: string, i: number) => (
                            <Badge key={i} className="bg-primary text-white border-none px-4 py-2 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/10">{service}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="px-8 md:px-12 pb-24 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-white/10" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Script de Guerra</h3>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <blockquote className="relative p-8 rounded-[2.5rem] bg-white/5 border border-white/5 overflow-hidden">
                          <Quote className="absolute -top-4 -left-4 h-24 w-24 text-white/[0.02] -z-0" />
                          <p className="relative z-10 text-lg md:text-xl text-white italic font-medium leading-relaxed tracking-tight">
                            {selectedLead.salesScript && selectedLead.salesScript !== "-" ? selectedLead.salesScript : "Foque na autoridade visual e na dor de não ser encontrado localmente."}
                          </p>
                        </blockquote>

                        <div className="pt-8 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <a href={`https://wa.me/${(String(selectedLead.phone || "")).replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${selectedLead.decisionMaker || selectedLead.contactName || "Responsável"}, sou consultor da studiosapient...`)}`} target="_blank" className="h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-green-500/20 hover:scale-105 transition-all"><MessageCircle size={18} /> Iniciar WhatsApp</a>
                              <Button onClick={() => handleCopy(selectedLead.phone, "Número")} variant="outline" className="h-12 border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10"><Copy size={14} className="mr-2" /> Copiar Número</Button>
                            </div>
                            
                            {selectedLead.email && selectedLead.email !== "-" && (
                              <div className="flex flex-col gap-2">
                                <a href={`mailto:${selectedLead.email}`} className="h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-primary hover:text-white transition-all"><Mail size={18} /> Enviar E-mail</a>
                                <Button onClick={() => handleCopy(selectedLead.email, "E-mail")} variant="outline" className="h-12 border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10"><Copy size={14} className="mr-2" /> Copiar E-mail</Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-12">
                <button onClick={() => setView('dashboard')} className="h-14 px-8 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white transition-all font-black uppercase text-[9px] flex items-center gap-3"><ChevronLeft size={14} /> Voltar ao Painel</button>
                <div className="flex-1 flex items-center gap-2 overflow-x-auto py-2 px-1 no-scrollbar scroll-smooth">
                  {Array.from({ length: 63 }).map((_, i) => (<div key={i} className={cn("h-1 min-w-[8px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-6 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="space-y-4"><h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação Profissional</h2><p className="text-white/40 text-sm">Vincule seu desempenho ao seu perfil oficial.</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                      <div className="space-y-4"><p className="text-[10px] font-black uppercase text-primary tracking-widest">Foto de Perfil</p><div className="flex items-center gap-6"><div className="h-20 w-20 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden relative">{formData.photoUri ? <img src={formData.photoUri} alt="" className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-black text-xl uppercase">{getInitials(formData.name || "")}</div>}</div><label className="h-12 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[9px] tracking-widest cursor-pointer transition-all"><Upload size={14} /> Selecionar Foto<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'photoUri')} className="hidden" /></label></div></div>
                      <div className="space-y-4"><p className="text-[10px] font-black uppercase text-primary tracking-widest">Currículo Profissional</p><label className={cn("h-20 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all", formData.resumeUri ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-black/40 hover:bg-white/5")}>{formData.resumeUri ? <><CheckCircle2 className="text-green-500" size={20} /><span className="text-[9px] font-black text-green-500 uppercase">Documento Pronto</span></> : <><FileText className="text-white/20" size={20} /><span className="text-[9px] font-black text-white/40 uppercase">Anexar Currículo</span></>}<input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resumeUri')} className="hidden" /></label></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                      <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 flex items-start gap-4"><Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} className="mt-1" /><label htmlFor="consent" className="text-[11px] text-white/60 font-bold leading-tight cursor-pointer uppercase">Aceito os protocolos de proteção de dados e conduta ética Sapient. *</label></div>
                    <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] w-full md:w-auto shadow-2xl shadow-primary/30">Gravar Dados & Iniciar <ChevronRight size={16} className="ml-2" /></Button>
                  </div>
                )}

                {step > 1 && step < 63 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="flex items-center gap-4"><Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo Progressivo: Passo {step}/63</Badge></div>
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed italic">Carregando conteúdo técnico especializado...</p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px] hover:bg-white/5"><ChevronLeft size={14}/></Button>
                      <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px] shadow-xl">Próximo Conteúdo <ChevronRight size={14} className="ml-2"/></Button>
                    </div>
                  </div>
                )}

                {step === 63 && (
                  <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                    <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse"><Trophy size={32} className="text-white" /></div>
                    <div className="space-y-4"><h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Imersão Concluída.</h2><p className="text-xl text-white/50 font-medium">Seu dossiê técnico foi enviado com sucesso. Aguarde a análise em até 48h.</p></div>
                    <Button onClick={() => { setView('dashboard'); setStep(1); window.scrollTo({top:0, behavior:'smooth'}); }} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px] hover:bg-white/5">Voltar ao Painel</Button>
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