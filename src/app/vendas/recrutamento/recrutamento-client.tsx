
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
  TrendingUp
} from "lucide-react";
import { useFirebase, useFirestore, useDoc, initiateSignOut, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
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
      setFormData(prev => ({ ...prev, email: user.email || "", name: user.displayName || "" }));
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
      // CAMPOS OBRIGATÓRIOS: Nome, Email, WhatsApp e Consentimento
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !consentAccepted) {
        toast({ title: "Dados Incompletos", description: "Preencha os campos obrigatórios (Nome, E-mail e WhatsApp) e aceite os termos.", variant: "destructive" });
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
    addDoc(colRef, candidateData)
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Dashboard de Treinamento studiosapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Imersão <span className="text-primary italic lowercase">comercial.</span></h1>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
               <div className="text-right">
                 <p className="text-[8px] font-black uppercase text-white/20 tracking-widest">Bem-vindo,</p>
                 <p className="text-[10px] font-bold text-white uppercase">{user?.displayName || user?.email?.split('@')[0]}</p>
               </div>
               <button onClick={handleSignOut} className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                 <LogOut size={18} />
               </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className={cn("h-1 min-w-[15px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Perfil do Colaborador</h2>
                    <p className="text-white/40 text-sm">Preencha sua identificação profissional para começar. Campos com (*) são obrigatórios.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input disabled value={formData.email} placeholder="E-mail *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold opacity-50" />
                  <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp (DDD + Número) *" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="Instagram (@usuario)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.cityState} onChange={(e) => setFormData({...formData, cityState: e.target.value})} placeholder="Cidade/Estado" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.currentOccupation} onChange={(e) => setFormData({...formData, currentOccupation: e.target.value})} placeholder="Ocupação Atual" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} placeholder="Tempo em Vendas" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo de Segurança Sapient
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => {
                      setConsentAccepted(c === true);
                      setFormData(prev => ({ ...prev, consentAccepted: c === true, consentTimestamp: new Date().toISOString() }));
                    }} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">Confirmo ciência dos protocolos de segurança e conduta. *</label>
                  </div>
                </div>
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Salvar Perfil e Iniciar <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Zap size={16} /> BRIEFING DE OPERAÇÃO</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">MÉTODO: OUTBOUND ATIVO</h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Você não espera o cliente. Você o interrompe com <strong>"Ouro"</strong>: um diagnóstico de vazamento de lucro que ele nem sabia que tinha.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">SUA FERRAMENTA:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">Diagnóstico pronto do gargalo (LCP alto, GMN abandonado, Semiótica fraca).</p>
                    </div>
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">SEU PAPEL:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">Ser o <strong>Cirurgião</strong>: diagnosticar o problem em 30s e marcar a reunião estratégica.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20">
                    <Checkbox id="outbound" checked={outboundAccepted} onCheckedChange={(c) => setOutboundAccepted(c === true)} />
                    <label htmlFor="outbound" className="text-xs text-white font-bold leading-tight cursor-pointer uppercase">Entendo que o cliente não me espera e meu valor está na interrupção cirúrgica.</label>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Ads & GMN <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 01</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Performance Ads & GMN</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs"><Search size={16} /> Capturando Urgência</h4>
                    <p className="text-white/50 text-sm leading-relaxed">No Google Ads, pescamos o cliente no momento da dor. Se ele busca por sua solução, ele é um decisor pronto.</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] text-primary font-bold italic">
                      "É como ter um outdoor na frente de quem acabou de furar o pneu."
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-cyan-400 font-black uppercase text-xs"><Target size={16} /> Ouro no GMN</h4>
                    <p className="text-white/50 text-sm leading-relaxed">O Google Meu Negócio é a recepção digital. Otimizamos fotos, avaliações e palavras-chave locais para gerar chamadas diretas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Fazer Teste Técnico <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Ads & GMN</h3>
                <p className="text-white/40">Como você explicaria para um dono de clínica que o GMN dele está "abandonado" e perdendo vendas?</p>
                <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl p-6 font-medium" placeholder="Sua resposta..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Etapa <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 02</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Sites Premium: A Porta de Vidro</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs"><Activity size={16} /> O Gargalo do LCP</h4>
                    <p className="text-white/50 text-sm leading-relaxed">LCP é o tempo que a maior parte do site leva para carregar. Se for alto, o cliente desiste antes de ver seu rosto.</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] text-primary font-bold italic">
                      "Um site lento é uma porta de vidro trancada: o cliente vê o que quer, mas não consegue entrar."
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-cyan-400 font-black uppercase text-xs"><Smartphone size={16} /> Engenharia Proprietária</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Não usamos templates pesados. Criamos o código do zero para garantir velocidade máxima no celular, onde 90% das vendas ocorrem.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Testar Conhecimento <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Engenharia Web</h3>
                <p className="text-white/40">Um cliente diz: "Já tenho site, meu Instagram já resolve". Como você prova que ele está perdendo dinheiro por falta de uma infraestrutura proprietária?</p>
                <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl p-6 font-medium" placeholder="Sua resposta estratégica..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Design <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 03</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Design & Semiótica de Valor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs"><Eye size={16} /> Barreira de Confiança</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Não fazemos logo. Fazemos barreira de confiança. O design certo encurta o ciclo de venda porque o cliente já sente que você é o melhor.</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] text-primary font-bold italic">
                      "Sua marca está vestida de pijama para uma reunião de gala? O design premium justifica o preço alto."
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-cyan-400 font-black uppercase text-xs"><Gem size={16} /> Autoridade Visual</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Cada cor e fonte é escolhida para comunicar prestígio. Removemos a dúvida do decisor através da excelência estética.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Teste de Design <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Autoridade Visual</h3>
                <p className="text-white/40">Explique a diferença entre "fazer um logo" e "construir uma barreira de confiança visual".</p>
                <Textarea value={formData.ansDesign} onChange={(e) => setFormData({...formData, ansDesign: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl p-6 font-medium" placeholder="Sua resposta..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para IA <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 04</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">IA: Atendimento Inteligente</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs"><MessageSquare size={16} /> Segurança Qualificador</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Nossa IA no WhatsApp não apenas responde, ela separa o "curioso" do "decisor". É um filtro de tempo para o dono do negócio.</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] text-primary font-bold italic">
                      "É como ter um segurança na porta que só deixa entrar quem tem o convite do fechamento."
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-cyan-400 font-black uppercase text-xs"><Activity size={16} /> Escala 24/7</h4>
                    <p className="text-white/50 text-sm leading-relaxed">O negócio nunca para. Enquanto o cliente dorme, a IA qualifica e já agenda a reunião estratégica no CRM.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Teste de IA <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Inteligência Artificial</h3>
                <p className="text-white/40">Como você venderia um Chatbot Inteligente para um dono de restaurante que diz que "prefere o contato humano"?</p>
                <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl p-6 font-medium" placeholder="Sua resposta..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Social <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 05</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Gestão Social & Dossiês</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs"><Users size={16} /> Curadoria de Autoridade</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Não fazemos "postzinho". Criamos curadoria estratégica que educa o seguidor para se tornar um cliente pagador.</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] text-primary font-bold italic">
                      "É melhor ter 100 seguidores que compram do que 100 mil que dão parabéns."
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-cyan-400 font-black uppercase text-xs"><FileText size={16} /> Narrativas de Venda</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Transformamos propostas comerciais em Dossiês de Luxo. O cliente entende visualmente o ROI antes mesmo de ler o texto.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Teste de Social <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 12 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Social & Narrativa</h3>
                <p className="text-white/40">O que é mais importante em um perfil profissional: ter 100 mil seguidores ou 100 decisões de compra tomadas?</p>
                <Textarea value={formData.ansSocial} onChange={(e) => setFormData({...formData, ansSocial: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl p-6 font-medium" placeholder="Sua resposta..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Nichos <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 13 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 06</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Estratégias de Nicho (Parte 1)</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                    <h4 className="text-primary font-bold text-xs uppercase">Beleza & Pet Shop</h4>
                    <p className="text-[10px] text-white/40">Gargalo: Agenda vazia e briga por preço. Solução: GMN Ativo e Prova Social de Luxo.</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                    <h4 className="text-cyan-400 font-bold text-xs uppercase">Alimentos & Lounges</h4>
                    <p className="text-[10px] text-white/40">Gargalo: Atendimento lento no WhatsApp. Solução: IA Qualificadora e Cardápio Digital Premium.</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                    <h4 className="text-amber-400 font-bold text-xs uppercase">Médicos & Advogados</h4>
                    <p className="text-[10px] text-white/40">Gargalo: Imagem amadora. Solução: Semiótica de Autoridade e Site de Alta Fidelidade.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Ver Mais Nichos <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 14 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 07</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Estratégias de Nicho (Parte 2)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs"><Briefcase size={16} /> Mercado de Alimentos</h4>
                    <p className="text-white/50 text-sm leading-relaxed">A dependência de taxas de delivery mata o lucro. Ensinamos a vender a transição para canais próprios via WhatsApp + IA.</p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                    <h4 className="flex items-center gap-2 text-cyan-400 font-black uppercase text-xs"><Zap size={16} /> Lounges & Eventos</h4>
                    <p className="text-white/50 text-sm leading-relaxed">O gargalo é a reserva. Atendimento lento perde o cliente para o concorrente. Solução: IA Qualificadora de Reservas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Teste de Nicho <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 15 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Nichos Específicos</h3>
                <p className="text-white/40">Como você abordaria um dono de Pet Shop que tem muitas curtidas, mas a agenda está sempre com buracos?</p>
                <Textarea value={formData.ansNichos} onChange={(e) => setFormData({...formData, ansNichos: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl p-6 font-medium" placeholder="Sua estratégia..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Precificação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 16 && (
              <div className="space-y-8 animate-in fade-in">
                <Badge className="bg-primary/10 text-primary uppercase text-[9px] tracking-widest">Mini-Curso 08</Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Precificação Estratégica</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[8px] font-black uppercase text-white/30">
                        <th className="py-4">Serviço Base</th>
                        <th className="py-4">Investimento Sugerido</th>
                        <th className="py-4">Público Alvo</th>
                      </tr>
                    </thead>
                    <tbody className="text-[10px] font-bold">
                      <tr className="border-b border-white/5">
                        <td className="py-4">Combo Local (Ads + GMN)</td>
                        <td className="py-4 text-primary">R$ 1.200 - R$ 2.500/mês</td>
                        <td className="py-4 text-white/40">Pequenos Negócios Locais</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4">Ecossistema Full (Site + Ads + Social)</td>
                        <td className="py-4 text-primary">R$ 3.500 - R$ 7.000/mês</td>
                        <td className="py-4 text-white/40">Empresas em Escala</td>
                      </tr>
                      <tr>
                        <td className="py-4">Dossiê Visual (Design Único)</td>
                        <td className="py-4 text-primary">R$ 2.000 - R$ 15.000 (Projeto)</td>
                        <td className="py-4 text-white/40">Profissionais Liberais Premium</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-white/60">
                  <p><strong>Atenção:</strong> Somos flexíveis. Empresas grandes pagam valor de mercado. Pequenos negócios que queremos ajudar a crescer recebem descontos estratégicos da Sapient Studio.</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Teste de Preço <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 17 && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Desafio: Negociação</h3>
                <p className="text-white/40">O cliente diz: "Achei caro, fulano faz por R$ 300". Como você defende o valor do ecossistema Sapient?</p>
                <Textarea value={formData.ansPreco} onChange={(e) => setFormData({...formData, ansPreco: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl p-6 font-medium" placeholder="Sua defesa comercial..." />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Desafio de Voz <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 18 && (
              <div className="space-y-8 animate-in fade-in">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6"><Mic size={32} /></div>
                  <h2 className="text-3xl font-black uppercase">O Desafio do Cirurgião</h2>
                  <p className="text-white/40 max-w-md mx-auto">Você ligou para um dono de Lounge. O site dele demora 8s para carregar e o GMN está sem fotos. <strong>Você tem 40 segundos para marcar uma reunião.</strong></p>
                </div>
                
                <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 flex flex-col items-center gap-6">
                  {isRecording ? (
                    <Button onClick={stopRecording} className="h-20 w-20 rounded-full bg-red-500 animate-pulse"><MicOff size={32}/></Button>
                  ) : (
                    <Button onClick={() => startRecording('audio1')} className="h-24 w-24 rounded-full bg-primary shadow-2xl shadow-primary/40"><Mic size={40}/></Button>
                  )}
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{isRecording ? "Gravando..." : "Toque para Gravar"}</p>
                  {audio1Base64 && <Badge className="bg-green-500/20 text-green-500 border-none">Pitch Gravado com Sucesso</Badge>}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button disabled={!audio1Base64} onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Etapa <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 19 && (
              <div className="space-y-8 animate-in fade-in">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black uppercase">Último Teste: O Pitch Final</h2>
                  <p className="text-white/40 max-w-md mx-auto">Resuma em um áudio final por que você é o consultor de elite que a studiosapient precisa.</p>
                </div>
                <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 flex flex-col items-center gap-6">
                  {isRecording ? (
                    <Button onClick={stopRecording} className="h-20 w-20 rounded-full bg-red-500 animate-pulse"><MicOff size={32}/></Button>
                  ) : (
                    <Button onClick={() => startRecording('final')} className="h-24 w-24 rounded-full bg-primary shadow-2xl shadow-primary/40"><Mic size={40}/></Button>
                  )}
                  {audioFinalBase64 && <Badge className="bg-green-500/20 text-green-500 border-none">Áudio Final Gravado</Badge>}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button disabled={!audioFinalBase64 || isLoading} onClick={handleSubmit} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">
                    {isLoading ? <Loader2 className="animate-spin" /> : "Enviar Dossiê de Recrutamento"}
                  </Button>
                </div>
              </div>
            )}

            {step === 23 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse"><Trophy size={40} className="text-white" /></div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Formação Concluída.</h2>
                  <p className="text-xl text-white/50 font-medium">Seu dossiê de consultor de elite foi salvo com sucesso vinculado à sua conta.</p>
                </div>
                <div className="pt-8"><Button onClick={() => window.location.href = '/'} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px] hover:bg-white/5">Voltar para o Início</Button></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
