
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
  Lightbulb
} from "lucide-react";
import { useFirebase, useFirestore, useDoc, initiateSignOut, useMemoFirebase, setDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function RecrutamentoClient() {
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
    if (profile && step === 1) {
      setFormData(prev => ({
        ...prev,
        ...profile,
        consentAccepted: true
      }));
      setConsentAccepted(true);
      setStep(2);
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
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Imersão Comercial Sapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">Domínio <span className="text-primary italic lowercase">estratégico.</span></h1>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
               <div className="text-right">
                 <p className="text-[8px] font-black uppercase text-white/20 tracking-widest">Consultor,</p>
                 <p className="text-[10px] font-bold text-white uppercase">{profile?.name || user?.email?.split('@')[0]}</p>
               </div>
               
               <Dialog>
                 <DialogTrigger asChild>
                   <button className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                     <UserCircle size={18} />
                   </button>
                 </DialogTrigger>
                 <DialogContent className="bg-[#0c0a1a] border-white/10 text-white rounded-[2rem] max-w-md">
                   <DialogHeader>
                     <DialogTitle className="text-xl font-black uppercase tracking-tighter">Dados do Consultor</DialogTitle>
                   </DialogHeader>
                   <div className="space-y-4 py-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                         <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">Nome</p>
                         <p className="text-xs font-bold">{profile?.name || '-'}</p>
                       </div>
                       <div className="space-y-1">
                         <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">WhatsApp</p>
                         <p className="text-xs font-bold">{profile?.phone || '-'}</p>
                       </div>
                     </div>
                   </div>
                 </DialogContent>
               </Dialog>

               <button onClick={handleSignOut} className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                 <LogOut size={18} />
               </button>
            </div>
          </div>

          {/* BARRA DE PROGRESSO REALISTA */}
          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className={cn("h-1 min-w-[15px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação Profissional</h2>
                    <p className="text-white/40 text-sm">Bem-vindo à Sapient. Precisamos do seu perfil oficial para vincular seu desempenho à nossa base de consultores.</p>
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
                  Iniciar Formação <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
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

            {/* MÓDULO 01: ADS & GMN */}
            {step === 3 && (
              <div className="space-y-10 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 01</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Performance Ads & GMN</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Target size={20} /> Tráfego de Intenção</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Diferente do Facebook (interrupção), o <strong>Google Ads</strong> captura a intenção real. O cliente busca "Clínica Odontológica em SP". Se você não está no topo, você não existe.</p>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-white/30 uppercase">Nuance Técnica:</p>
                      <p className="text-xs text-white/80 italic font-medium">"O Google pune anúncios que levam a sites lentos, cobrando mais caro pelo clique. Vender o site premium é baratear o Ads."</p>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Search size={20} /> Briefing de GMN</h4>
                    <p className="text-white/50 text-sm leading-relaxed">O Google Meu Negócio é a fachada. Se está abandonado (sem fotos novas, sem respostas), o cliente desiste.</p>
                    <ul className="space-y-2 text-[10px] font-bold text-white/40 uppercase">
                      <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Fotos de Alta Resolução</li>
                      <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Prova Social (Depoimentos)</li>
                      <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Atualização Semanal</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Conhecimento <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio Técnico: Ads</h3>
                <p className="text-white/40">Como você provaria matematicamente para um cliente que o site lento dele está fazendo ele "rasgar dinheiro" no Google Ads?</p>
                <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium text-white" placeholder="Sua resposta estratégica..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Sites <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* MÓDULO 02: SITES PREMIUM */}
            {step === 5 && (
              <div className="space-y-10 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 02</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Engenharia de Sites Premium</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Code size={20} /> Next.js vs WordPress</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Não usamos WordPress ou Elementor. Nossos sites são construídos em <strong>Next.js (Engenharia de Elite)</strong>. Isso significa carregamento instantâneo e segurança contra invasões.</p>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-white/30 uppercase">Nuance de Produto:</p>
                      <p className="text-xs text-white/80 italic font-medium">"WordPress é um template. Sapient é Engenharia. Um é um carro de série, o outro é um Fórmula 1 desenhado para a sua marca."</p>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Smartphone size={20} /> A Nuance do LCP</h4>
                    <p className="text-white/50 text-sm leading-relaxed">LCP (Largest Contentful Paint) é a velocidade com que o conteúdo principal aparece. Se passar de 2.5s, o cliente vai embora.</p>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">O FOCO SAPIEINT: 0.8s a 1.2s</p>
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
                <p className="text-white/40">Um cliente diz: "Vou fazer com um sobrinho no Wix". Como você defende a nossa engenharia de código proprietário em Next.js?</p>
                <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Defesa técnica..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Design <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* MÓDULO 03: DESIGN ESTRATÉGICO */}
            {step === 7 && (
              <div className="space-y-10 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 03</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Design & Semiótica de Valor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Palette size={20} /> Semiótica de Luxo</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Design não é estética, é <strong>comando mental</strong>. Usamos cores e formas para comunicar Prestígio, Rapidez ou Acolhimento antes do cliente ler uma palavra.</p>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-white/30 uppercase">A Nuance:</p>
                      <p className="text-xs text-white/80 italic font-medium">"O roxo da Sapient comunica Criatividade + Elite. O preto comunica Mistério + Autoridade. É uma barreira de confiança visual."</p>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Gem size={20} /> Briefing de Marca</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Perguntamos ao cliente: "Se sua marca fosse uma pessoa, como ela estaria vestida?" - Isso define o tom visual do projeto.</p>
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
                <p className="text-white/40">Explique por que um médico que atende consultas de R$ 800 não pode ter um logotipo feito no Canva por R$ 50.</p>
                <Textarea value={formData.ansDesign} onChange={(e) => setFormData({...formData, ansDesign: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua explicação de valor..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para IA <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* MÓDULO 04: CHAT IA */}
            {step === 9 && (
              <div className="space-y-10 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 04</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Sistemas de Atendimento IA</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Brain size={20} /> Agentes de Venda</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Nossa IA não é um chatbot burro de árvore de opções. É um <strong>Agente Cognitivo</strong> que entende o contexto e qualifica o lead antes de passar para o humano.</p>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-white/30 uppercase">Nuance de Atendimento:</p>
                      <p className="text-xs text-white/80 italic font-medium">"A IA é o segurança da porta. Ela tira as dúvidas comuns e só deixa passar para o WhatsApp do dono quem realmente quer comprar."</p>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><MessageSquare size={20} /> Omnicanalidade</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Integramos o cérebro da IA no Site, WhatsApp e Instagram. Atendimento 24h que nunca esquece de seguir o script de venda.</p>
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
                <p className="text-white/40">Como você venderia uma IA para um dono de restaurante que gasta 4h por dia respondendo "Qual o valor da entrega?" no WhatsApp?</p>
                <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua resposta estratégica..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Social <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* MÓDULO 05: GESTÃO SOCIAL */}
            {step === 11 && (
              <div className="space-y-10 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 05</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Gestão Social & Autoridade</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><Users size={20} /> Curadoria de Elite</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Não postamos por postar. Criamos <strong>Curadoria de Autoridade</strong>. O feed deve ser o portfólio que justifica o seu preço premium.</p>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-white/30 uppercase">Nuance de Redes:</p>
                      <p className="text-xs text-white/80 italic font-medium">"Seguidor é métrica de vaidade. Decisor é métrica de lucro. Nosso social foca em atrair o decisor."</p>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Activity size={20} /> Funil de Conteúdo</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Topo (Atração), Meio (Educação) e Fundo (Desejo). Cada post tem uma função no cérebro do seguidor.</p>
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
                <p className="text-white/40">O que você diria para um cliente que tem 100k seguidores mas não consegue fechar um contrato de R$ 5.000?</p>
                <Textarea value={formData.ansSocial} onChange={(e) => setFormData({...formData, ansSocial: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua análise de autoridade..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Narrativa <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* MÓDULO 06: NARRATIVA VISUAL (NOVO) */}
            {step === 13 && (
              <div className="space-y-10 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest px-6 py-2">Módulo 06</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Narrativa Visual & Dossiês</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-primary font-black uppercase text-xs"><FileText size={20} /> Dossiês de Venda</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Não enviamos orçamentos. Enviamos <strong>Dossiês de Luxo</strong>. São apresentações que traduzem processos complexos em imagens que geram desejo imediato.</p>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-white/30 uppercase">Nuance de Fechamento:</p>
                      <p className="text-xs text-white/80 italic font-medium">"A Narrativa Visual remove a 'névoa informacional'. O cliente entende o benefício em 3 segundos sem ler um parágrafo."</p>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase text-xs"><Lightbulb size={20} /> Infográficos de ROI</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Desenhamos o caminho do dinheiro do cliente. Ele vê o investimento entrando e o lucro saindo de forma visualmente inquestionável.</p>
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
                <p className="text-white/40">Por que um PDF de "Proposta Comercial" comum mata a venda para um decisor de alto nível?</p>
                <Textarea value={formData.ansNarrativa} onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua resposta..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Nichos <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* MÓDULOS DE FECHAMENTO (NICHOS, PREÇO, VOZ) */}
            {step === 15 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest px-6 py-2">Módulo Final 01</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Estratégias de Nicho</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                    <h4 className="text-primary font-bold text-xs uppercase">Beleza & Pet</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Agenda furada. Solução: IA Qualificadora + GMN Ativo para busca local.</p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                    <h4 className="text-cyan-400 font-bold text-xs uppercase">Saúde & Direito</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Imagem amadora. Solução: Semiótica de Autoridade + Dossiês Visuais.</p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                    <h4 className="text-amber-400 font-bold text-xs uppercase">Varejo & Tech</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed">Gargalo: Conversão baixa. Solução: Engenharia de Sites (LCP < 1s) + Ads de Urgência.</p>
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
                <p className="text-white/40">Como você abordaria o dono de uma clínica de luxo que tem um site que "parece um blog de 2010"?</p>
                <Textarea value={formData.ansNichos} onChange={(e) => setFormData({...formData, ansNichos: e.target.value})} className="min-h-[180px] bg-white/5 border-white/10 rounded-[2rem] p-8 font-medium" placeholder="Sua estratégia..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Ver Precificação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 17 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest px-6 py-2">Módulo Final 02</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Precificação Estratégica</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[8px] font-black uppercase text-white/30">
                        <th className="py-4">Combos Sapient</th>
                        <th className="py-4">Investimento</th>
                        <th className="py-4">Foco</th>
                      </tr>
                    </thead>
                    <tbody className="text-[10px] font-bold">
                      <tr className="border-b border-white/5">
                        <td className="py-4">DOMÍNIO LOCAL (Ads + GMN)</td>
                        <td className="py-4 text-primary">R$ 1.5k - R$ 3k/mês</td>
                        <td className="py-4 text-white/40">Gerar chamadas hoje</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4">ENGENHARIA WEB (Site Next.js)</td>
                        <td className="py-4 text-primary">R$ 3k - R$ 15k (Projeto)</td>
                        <td className="py-4 text-white/40">Conversão imbatível</td>
                      </tr>
                      <tr>
                        <td className="py-4">ECOSSISTEMA FULL (All-in)</td>
                        <td className="py-4 text-primary">R$ 5k - R$ 15k/mês</td>
                        <td className="py-4 text-white/40">Escala agressiva</td>
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
                <p className="text-white/40">O cliente diz: "Mas o rapaz do Instagram faz por R$ 500". Como você explica que a Sapient joga outro jogo?</p>
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
                  <p className="text-white/40 max-w-md mx-auto">Você ligou para um dono de clínica. O site dele demora 8s e o GMN está sem fotos. <strong>Você tem 40s para marcar a reunião.</strong></p>
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
                  <p className="text-white/40 max-w-md mx-auto">Por que você deve ser o próximo consultor de elite da studiosapient? <strong>Venda-se em 60s.</strong></p>
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
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Dossiê Enviado.</h2>
                  <p className="text-xl text-white/50 font-medium">Sua formação técnica foi concluída. O Lucas Souza analisará seu dossiê e audições em breve.</p>
                </div>
                <div className="pt-8"><Button onClick={() => window.location.href = '/'} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px] hover:bg-white/5">Voltar ao Site Oficial</Button></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
