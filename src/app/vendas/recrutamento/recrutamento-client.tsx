
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
  TrendingUp,
  Layout,
  Palette,
  Bot,
  Users,
  BookOpen,
  Search,
  Video,
  Layers,
  MapPin,
  CircleDollarSign,
  Briefcase,
  ShoppingBag,
  Sparkles,
  Utensils,
  Dog,
  Music,
  Stethoscope as StethoscopeIcon,
  PhoneCall,
  Target,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Coins,
  Globe,
  Activity,
  Cpu,
  MousePointer2,
  Lock,
  Eye,
  MessageSquare,
  FileText
} from "lucide-react";
import { useFirebase, useFirestore, initiateAnonymousSignIn } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function RecrutamentoClient() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [audio1Base64, setAudio1Base64] = useState<string | null>(null);
  const [audio1PreviewUrl, setAudio1PreviewUrl] = useState<string | null>(null);
  const [audio2Base64, setAudio2Base64] = useState<string | null>(null);
  const [audio2PreviewUrl, setAudio2PreviewUrl] = useState<string | null>(null);
  const [audioFinalBase64, setAudioFinalBase64] = useState<string | null>(null);
  const [audioFinalPreviewUrl, setAudioFinalPreviewUrl] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [outboundAccepted, setOutboundAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    linkedin: "",
    cityState: "",
    currentOccupation: "",
    experience: "",
    ansAds: "",
    ansSites: "",
    ansChat: "",
    ansSocial: "",
    ansNarrativa: "",
    audioObjeçãoAds: "",
    audioCirurgiao: "",
    pitchAudioUri: "",
    consentAccepted: false,
    consentTimestamp: ""
  });

  const { toast } = useToast();
  const { auth } = useFirebase();
  const db = useFirestore();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (auth) initiateAnonymousSignIn(auth);
  }, [auth]);

  const stopAllRecording = (target: 'audio1' | 'audio2' | 'final') => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecording = async (target: 'audio1' | 'audio2' | 'final') => {
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
        const url = URL.createObjectURL(audioBlob);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const b64 = reader.result as string;
          if (target === 'audio1') {
            setAudio1Base64(b64);
            setAudio1PreviewUrl(url);
            setFormData(prev => ({ ...prev, audioObjeçãoAds: b64 }));
          } else if (target === 'audio2') {
            setAudio2Base64(b64);
            setAudio2PreviewUrl(url);
            setFormData(prev => ({ ...prev, audioCirurgiao: b64 }));
          } else {
            setAudioFinalBase64(b64);
            setAudioFinalPreviewUrl(url);
            setFormData(prev => ({ ...prev, pitchAudioUri: b64 }));
          }
          setIsProcessingAudio(false);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({ title: "MICROFONE ATIVO", description: "Gravando resposta vocal.", className: "bg-primary text-white font-black uppercase text-[9px]" });
    } catch (err) {
      toast({ title: "ERRO DE HARDWARE", description: "Microfone não encontrado ou bloqueado.", variant: "destructive" });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !consentAccepted)) {
      toast({ title: "Dados Incompletos", description: "Preencha sua identificação e aceite os termos de segurança.", variant: "destructive" });
      return;
    }
    if (step === 2 && !outboundAccepted) {
      toast({ title: "Confirmação Necessária", description: "Você precisa confirmar que entende a dinâmica de Outbound Ativo.", variant: "destructive" });
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
      timestamp: serverTimestamp(),
      status: 'PENDENTE_AVALIACAO_HUMANA'
    };

    const colRef = collection(db, 'sales_candidates');
    
    addDoc(colRef, candidateData)
      .then(() => {
        setIsLoading(false);
        setStep(23); // Ajustado para nova contagem de passos
      })
      .catch((serverError) => {
        setIsLoading(false);
        const permissionError = new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: candidateData,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ title: "Erro no Envio", description: "Ocorreu um problema ao salvar seu dossiê.", variant: "destructive" });
      });
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Recrutamento Técnico studiosapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Imersão <span className="text-primary italic lowercase">comercial.</span></h1>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className={cn("h-1 min-w-[15px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação &amp; Perfil Profissional</h2>
                    <p className="text-white/40 text-sm">Proteção de dados em nível bancário via Google Firebase.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-white/40 ml-2">Identidade</p>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="E-mail" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp (DDD + Número)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-white/40 ml-2">Redes Sociais &amp; Carreira</p>
                    <Input value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="Instagram (@usuario)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="LinkedIn (URL)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.currentOccupation} onChange={(e) => setFormData({...formData, currentOccupation: e.target.value})} placeholder="Profissão Atual" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  </div>
                  <Input value={formData.cityState} onChange={(e) => setFormData({...formData, cityState: e.target.value})} placeholder="Cidade / Estado" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} placeholder="Tempo em Vendas" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo de Segurança LGPD
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed uppercase font-bold">
                    Seus dados são criptografados e não compartilhados. Os áudios de teste são utilizados apenas para esta avaliação humana e deletados permanentemente após o processo.
                  </p>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => {
                      setConsentAccepted(c === true);
                      setFormData(prev => ({ 
                        ...prev, 
                        consentAccepted: c === true,
                        consentTimestamp: new Date().toISOString()
                      }));
                    }} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">Aceito os termos de proteção de dados.</label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Treinamento <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Zap size={16} /> ENTENDA A OPERAÇÃO</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DINÂMICA: OUTBOUND ATIVO</h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Você receberá leads qualificados com o <strong>"Diagnóstico de Ouro"</strong> pronto.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">O QUE NÓS DAMOS:</p>
                      <ul className="space-y-3">
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> Contato direto do dono.</li>
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> Onde ele está perdendo dinheiro.</li>
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> O argumento matador pra ele te ouvir.</li>
                      </ul>
                    </div>
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">O SEU PAPEL:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">O cliente não te espera. Você deve ser um <strong>Cirurgião</strong>: interromper o dia dele, mostrar o problema e marcar a reunião estratégica.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20">
                    <Checkbox id="outbound" checked={outboundAccepted} onCheckedChange={(c) => setOutboundAccepted(c === true)} />
                    <label htmlFor="outbound" className="text-xs text-white font-bold leading-tight cursor-pointer uppercase">
                      Entendo que receberei diagnósticos prontos para agir via Outbound Ativo.
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Módulo 01 <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> Módulo 01: Mentalidade de Valor</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">NÃO VENDEMOS SERVIÇOS, VENDEMOS LUCRO</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed">O cliente não quer um "site novo", ele quer parar de perder vendas. O site é apenas a ferramenta.</p>
                      
                      <div className="p-6 bg-primary/10 rounded-3xl border border-primary/20">
                        <h4 className="text-[10px] font-black text-primary uppercase mb-2">TRADUÇÃO LEIGA:</h4>
                        <p className="text-sm text-white/70 italic">"Doutor, não vim te vender um site. Vim consertar a sua porta que está emperrada e impedindo o paciente de entrar."</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">EVITE ISTO:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Falar de "linguagem de programação" ou "pixel". Isso assusta o cliente e não prova valor.</p>
                      </div>
                      <div className="p-6 bg-green-500/10 rounded-3xl border border-green-500/20 space-y-4">
                        <p className="text-[10px] font-black text-green-400 uppercase">DICA DE OURO:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">"O cliente só reclama do preço quando ele ainda não entendeu o tamanho do prejuízo que o problema dele está causando."</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Entendido, Próximo <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Search size={16} /> Módulo 02: Caçador de Gargalos</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O CONCEITO DO BALDE FURADO</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 rounded-[2rem] bg-black/40 border border-white/5">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">ANALOGIA DO BALDE:</h4>
                        <p className="text-sm text-white/60 leading-relaxed italic">"Anúncios são a água que você joga no balde. Se o seu site é lento ou amador, o balde está furado. Jogar mais água (anúncios) só faz você gastar dinheiro sem encher o balde (lucro)."</p>
                      </div>
                      
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                        <h4 className="text-[10px] font-black text-white/40 uppercase mb-2">TRADUÇÃO PARA O CLIENTE:</h4>
                        <ul className="space-y-2 text-[11px] text-white/60">
                          <li><strong>LCP (Velocidade):</strong> É o tempo que sua secretária leva pra abrir a porta. Se demorar, o cliente vai pro vizinho.</li>
                          <li><strong>Ads sem Negativação:</strong> É pagar pra entregar panfleto de luxo no bairro errado. Desperdício de papel.</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Redes "Cidades Fantasmas"</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">Um perfil sem postagens recentes parece uma empresa fechada. O cliente clica no anúncio, confere o Instagram e desiste porque acha que faliu.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Velocidade</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">A cada 1 segundo extra de carregamento, você perde 7% de conversão. Se o site leva 10s, você está expulsando o cliente da loja.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-amber-500 text-white rounded-full font-black uppercase text-[10px]">Dominar Diagnóstico <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> Módulo 03: Ads &amp; GMN</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DOMÍNIO DE BUSCA LOCAL</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><MapPin size={14}/> GOOGLE MEU NEGÓCIO (GMN)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Não é apenas "estar no mapa". É ter uma fachada digital impecável com fotos profissionais e avaliações curadas.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"O GMN é sua vitrine de rua. Se as fotos estão feias e ninguém avalia, o cliente nem estaciona o carro."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-red-400 font-black uppercase text-[9px]"><Search size={14}/> FILTRO DE INTENÇÃO (ADS)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Focamos em quem quer comprar AGORA. Negativamos palavras como "curso", "grátis" ou "como fazer".</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Estamos colocando um segurança na porta pra barrar os curiosos e deixar entrar só quem está com o cartão na mão."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Teste Ads <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> DESAFIO 01: ADS</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-primary mb-2 uppercase">BRIEFING CLIENTE:</p>
                    <p className="text-sm font-bold">Empresário diz: "Já fiz anúncio no Google e só veio gente querendo saber preço ou pedindo emprego. É jogar dinheiro fora."</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Como você explica para ele o conceito de "Filtro de Intenção" e "Segurança na Porta" sem usar termos técnicos?</p>
                </div>
                <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} placeholder="Sua resposta estratégica aqui..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Voz <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Mic size={16} /> DESAFIO de VOZ: REVERSÃO</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">LIDANDO COM A OBJEÇÃO</h3>
                  <p className="text-sm text-black/60 leading-relaxed">Grave um áudio de até 1 min para o cliente que disse que "anúncio não funciona". Use as analogias leigas que aprendeu. Foque no "Filtro de Intenção".</p>
                </div>
                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button onClick={() => isRecording ? stopAllRecording('audio1') : startRecording('audio1')} className={cn("h-24 w-24 rounded-full flex items-center justify-center transition-all shadow-2xl border-4", isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105")}>
                    {isRecording ? <MicOff size={30} /> : <Mic size={30} />}
                  </button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{isRecording ? "GRAVANDO RESPOSTA..." : audio1Base64 ? "RESPOSTA GRAVADA" : "Pressione para Gravar"}</p>
                  {audio1PreviewUrl && !isRecording && <audio controls src={audio1PreviewUrl} className="h-10 opacity-50" />}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} disabled={!audio1Base64 || isRecording} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próximo Módulo <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Globe size={16} /> Módulo 04: Sites Premium</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">AMBIENTES DE CONVERSÃO VS REDES SOCIAIS</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><Smartphone size={14}/> TRÁFEGO DE PASSAGEM</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">No Instagram, o cliente está "passeando". No Site, ele está "negociando". O site é sua propriedade, o Instagram é um terreno alugado.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"O Instagram é o panfleto. O Site é a sua sala de reuniões climatizada e exclusiva."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Activity size={14}/> ENGENHARIA PROPRIETÁRIA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Não usamos templates pesados. Criamos código limpo que carrega em 2 segundos. Velocidade = Venda.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Seu site hoje demora 10s pra abrir. É como se o cliente batesse na porta e você demorasse 10 minutos pra gritar 'quem é?'."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Design <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-pink-500/10 border border-pink-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-pink-400 font-black uppercase text-[10px]"><Palette size={16} /> Módulo 05: Design &amp; Semiótica</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O DESIGN COMO BARREIRA DE CONFIANÇA</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><Eye size={14}/> SEMIÓTICA (O QUE O OLHO DIZ)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">O cérebro decide se confia em 0.05 segundos. Se o visual é pobre, o cliente assume que o serviço é amador.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Design profissional é uma vacina contra quem chora por preço. Se você parece caro, o cliente não pede desconto."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Layers size={14}/> IDENTIDADE DE PRESTÍGIO</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Cores e fontes que transmitem solidez. Não é apenas "beleza", é engenharia de percepção de valor.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Estamos transformando seu uniforme de pelada num terno de gala. O jogo muda quando a imagem muda."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-pink-500 text-white rounded-full font-black uppercase text-[10px]">Testar Visão <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Globe size={16} /> DESAFIO 02: SITES &amp; DESIGN</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase">BRIEFING CLIENTE:</p>
                    <p className="text-sm font-bold">Advogada Helena cobra R$ 20k de honorários, mas seu site é rosa com flores e leva 15s para abrir no celular. Ela não fecha contratos.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Quais são os 2 gargalos óbvios aqui? Como você explica que a "Porta Emperrada" e o "Visual Amador" estão matando o lucro dela?</p>
                </div>
                <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} placeholder="Sua análise técnica simplificada..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Automação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> Módulo 06: Chat IA &amp; Speed to Lead</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A INTELIGÊNCIA QUE NÃO DORME</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-violet-400 font-black uppercase text-[9px]"><Zap size={14}/> SPEED TO LEAD (VELOCIDADE)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Quem responde em menos de 5 minutos tem 21x mais chance de fechar. Lead esfria rápido.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"O lead é como pão quente. Se você não entrega na hora, ele endurece e o cliente vai na padaria da frente."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><Cpu size={14}/> TRIAGEM &amp; QUALIFICAÇÃO</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">A IA responde dúvidas e filtra o "curioso". Só passa pro vendedor humano quem realmente pode pagar.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Sua equipe hoje gasta tempo dando 'bom dia' pra quem só quer olhar. Nossa IA é o porteiro que só deixa subir quem tem agendamento."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Social <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 12 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-blue-400 font-black uppercase text-[10px]"><Users size={16} /> Módulo 07: Gestão Social &amp; Perfil</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O FEED COMO PORTFÓLIO DE AUTORIDADE</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[9px]"><MousePointer2 size={14}/> CURADORIA DE DECISORES</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Não buscamos seguidores, buscamos clientes. Postamos conteúdo que ensina o cliente a te contratar.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Seguidor é vaidade. Autoridade é lucro. Estamos limpando a poeira da sua vitrine social pra você parecer o especialista que é."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Activity size={14}/> OTIMIZAÇÃO DE BIO &amp; DESTAQUES</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Arrumamos a "Bio Narrativa" e criamos destaques que vendem 24h por dia. Cada detalhe conta.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Sua Bio hoje está confusa. Estamos transformando ela numa placa de sinalização clara: 'Clique aqui e resolva seu problema'."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-blue-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Narrativa <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 13 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px]"><FileText size={16} /> Módulo 08: Narrativa Visual &amp; Dossiês</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O PODER DA CLAREZA VISUAL</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[9px]"><Target size={14}/> INFOGRÁFICOS DE VALOR</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Transformamos propostas de 20 páginas em 1 único infográfico que o cliente entende e deseja comprar.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Pare de explicar seu serviço e comece a mostrar o resultado. Desenvolvemos o mapa visual da sua superioridade técnica."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><Briefcase size={14}/> DOSSIÊS DE VENDA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Apresentações de alto padrão para fechamentos de alto ticket. Clareza é a nova moeda de troca.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR:</h4>
                          <p className="text-[11px] text-white/40 italic">"Sua proposta hoje é um Word sem graça. O Dossiê Sapient é um ativo de luxo que faz o cliente sentir que seu preço é baixo perto do valor."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-emerald-500 text-white rounded-full font-black uppercase text-[10px]">Testar Conhecimento <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 14 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Activity size={16} /> DESAFIO 03: ESCALA &amp; ATENDIMENTO</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-violet-400 mb-2 uppercase">BRIEFING CLIENTE:</p>
                    <p className="text-sm font-bold">Imobiliária recebe 300 leads por dia, mas a secretária só responde 50. O dono quer parar o tráfego porque "não dá conta".</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Como você explicaria o "Custo de Oportunidade" e o "Pão Quente" (Speed to Lead) sem usar esses nomes, focando no dinheiro que ele perde?</p>
                </div>
                <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} placeholder="Sua resposta persuasiva..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Estratégias por Nicho <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 15 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px]"><Briefcase size={16} /> Módulo 09: Especialização por Nicho (Parte 1)</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">FALE A LÍNGUA DO CLIENTE</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[9px]"><StethoscopeIcon size={14}/> SAÚDE</div>
                      <p className="text-[11px] text-white/50">"Doutor, o paciente busca segurança. Se o seu site é amador, ele escolhe o vizinho mesmo você sendo melhor tecnicamente."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Layers size={14}/> DIREITO</div>
                      <p className="text-[11px] text-white/50">"Doutor, não vendemos anúncios, vendemos Autoridade. Criamos conteúdo técnico que ensina o cliente a te procurar."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[9px]"><MapPin size={14}/> IMOBILIÁRIO</div>
                      <p className="text-[11px] text-white/50">"A IA qualifica o comprador às 2h da manhã. Quando seu corretor acorda, o lead já disse quanto pode pagar."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><ShoppingBag size={14}/> VAREJO LOCAL</div>
                      <p className="text-[11px] text-white/50">"Se eu busco seu produto no Google Maps, sua loja é a primeira a aparecer com o trajeto pronto?"</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-emerald-500 text-white rounded-full font-black uppercase text-[10px]">Mais Nichos <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 16 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-rose-500/10 border border-rose-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-rose-400 font-black uppercase text-[10px]"><Sparkles size={16} /> Módulo 10: Especialização por Nicho (Parte 2)</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DO ESTILO AO SABOR</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><Sparkles size={14}/> BELEZA &amp; ESTÉTICA</div>
                      <p className="text-[11px] text-white/50">"O design profissional te tira da vala comum das promoções. Você passa a ser escolhida pelo seu resultado, não pelo seu preço."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-orange-400 font-black uppercase text-[9px]"><Utensils size={14}/> RESTAURANTES</div>
                      <p className="text-[11px] text-white/50">"Anúncios locais trazem o cliente no meio da semana. A IA automatiza reservas e lista de espera 24h."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Music size={14}/> LOUNGES &amp; SHOWS</div>
                      <p className="text-[11px] text-white/50">"Não perca vendas por link quebrado na Bio. Monitoramos seu WhatsApp e automatizamos o RSVP."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Dog size={14}/> PET SHOPS</div>
                      <p className="text-[11px] text-white/50">"Donos de pet compram de quem transmite carinho e técnica. Suas redes sociais provam isso hoje?"</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-rose-500 text-white rounded-full font-black uppercase text-[10px]">O Método Cirurgião <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 17 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><PhoneCall size={16} /> Módulo 11: O Consultor Cirurgião</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A ARTE DA INTERRUPÇÃO COM VALOR</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed">No Outbound, você deve mostrar o vazamento de lucro nos primeiros 30 segundos.</p>
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">A ESTRUTURA DO GANCHO:</p>
                        <ul className="space-y-2 text-xs text-white/40 italic">
                          <li>1. Hook: "Notei que a porta do seu site está emperrada..."</li>
                          <li>2. O Ouro: "...isso te fez perder 15 leads só hoje."</li>
                          <li>3. Ação: "Desenhei o rascunho da solução. Vamos conversar?"</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">TELEMARKETING NUNCA:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Não peça "um minutinho". Não tente ser "amigo". Seja o especialista que resolve o incêndio que o dono não viu.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Desafio Cirurgião <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 18 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Mic size={16} /> DESAFIO: ABERTURA CIRÚRGICA</div>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] font-black text-primary mb-2 uppercase">BRIEFING CLIENTE:</p>
                    <p className="text-sm font-bold">"Restaurante Bella". O link de reservas no Instagram deles vai pra uma página fora do ar (Erro 404).</p>
                  </div>
                  <p className="text-xs font-bold text-black/40 uppercase italic">Grave seu áudio de 45s aplicando o Método Cirurgião. Foque na "Porta Fechada" e na perda de clientes no sábado à noite.</p>
                </div>
                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button onClick={() => isRecording ? stopAllRecording('audio2') : startRecording('audio2')} className={cn("h-24 w-24 rounded-full flex items-center justify-center transition-all shadow-2xl border-4", isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105")}>
                    {isRecording ? <MicOff size={30} /> : <Mic size={30} />}
                  </button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{isRecording ? "GRAVANDO..." : audio2Base64 ? "ABERTURA GRAVADA" : "Clique para Gravar"}</p>
                  {audio2PreviewUrl && !isRecording && <audio controls src={audio2PreviewUrl} className="h-10 opacity-50" />}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} disabled={!audio2Base64 || isRecording} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Preços &amp; Ecossistema <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 19 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-green-400 font-black uppercase text-[10px]"><CircleDollarSign size={16} /> Módulo 12: Engenharia de Combos</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">MONTANDO A SOLUÇÃO IDEAL</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4 flex flex-col">
                      <Badge className="bg-white/10 text-white border-none w-fit text-[7px] uppercase">START LOCAL</Badge>
                      <h4 className="text-lg font-black uppercase">Visibilidade GMN</h4>
                      <p className="text-[10px] text-white/40">Otimização de Perfil + Curadoria de Fotos + Pequenos Ads Locais.</p>
                      <p className="text-xl font-black text-green-400 mt-auto">R$ 2.5k - 4k/mês</p>
                    </div>

                    <div className="p-6 rounded-3xl bg-primary/20 border border-primary/30 space-y-4 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2"><Zap className="h-4 w-4 text-primary animate-pulse" /></div>
                      <Badge className="bg-primary text-white border-none w-fit text-[7px] uppercase">MÁQUINA DE VENDAS</Badge>
                      <h4 className="text-lg font-black uppercase">Ads + Site + GMN</h4>
                      <p className="text-[10px] text-white/40">Ambiente de Conversão Premium + Tráfego de Intenção + GMN.</p>
                      <p className="text-xl font-black text-white mt-auto">R$ 6k - 10k/mês</p>
                    </div>

                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4 flex flex-col">
                      <Badge className="bg-amber-500/20 text-amber-400 border-none w-fit text-[7px] uppercase">AUTORIDADE TOTAL</Badge>
                      <h4 className="text-lg font-black uppercase">Ecossistema Sapient</h4>
                      <p className="text-[10px] text-white/40">Tudo integrado + Chat IA + Gestão Social + Dossiês de Venda.</p>
                      <p className="text-xl font-black text-amber-400 mt-auto">R$ 15k - 25k+/mês</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
                    <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]">
                      <Coins size={18} /> Política de Flexibilidade e Impacto
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed font-medium">
                      Estes são <strong>valores base</strong>. Grandes empresas pagam o valor de mercado. Empresas menores recebem descontos estratégicos para acelerar seu crescimento e expandir o alcance do Sapient Studio.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-green-500 text-white rounded-full font-black uppercase text-[10px]">Postura &amp; Fechamento <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 20 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Video size={16} /> Módulo 13: Postura &amp; Etiqueta Comercial</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O CLIENTE COMPRA VOCÊ PRIMEIRO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">VÍDEO CHAMADA</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Olho na câmera, luz frontal. Se sua imagem está escura, você parece um amador escondido.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">ÁUDIOS CURTOS</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Máximo 1:15 min. Sem gírias. Tom firme. Fale do prejuízo e termine com uma pergunta de ação.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">FECHAMENTO</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Ouça 80%. Deixe o cliente confessar o gargalo dele. Você só entrega o remédio no final.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Pitch Final <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 21 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Trophy size={16} /> O DESAFIO FINAL</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">SIMULAÇÃO DE FECHAMENTO</h3>
                  <p className="text-sm text-black/60 leading-relaxed">Grave um pitch de até 2 min vendendo o combo <strong>MÁQUINA DE VENDAS</strong>. Use obrigatoriamente a linguagem leiga (vitrine, ralo de dinheiro, porta emperrada). Demonstre autoridade absoluta.</p>
                </div>
                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button onClick={() => isRecording ? stopAllRecording('final') : startRecording('final')} className={cn("h-32 w-32 rounded-full flex items-center justify-center transition-all shadow-2xl border-4", isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105")}>
                    {isRecording ? <MicOff size={40} /> : <Mic size={40} />}
                  </button>
                  <p className="text-sm font-black uppercase tracking-widest text-white">{isRecording ? "GRAVANDO PITCH..." : audioFinalBase64 ? "PITCH PRONTO PARA ENVIO" : "Pressione para Gravar"}</p>
                  {audioFinalPreviewUrl && !isRecording && <audio controls src={audioFinalPreviewUrl} className="w-full max-w-md h-12 rounded-full bg-white/5" />}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleSubmit} disabled={isLoading || !audioFinalBase64 || isRecording} className="h-24 flex-1 bg-primary rounded-full font-black uppercase text-[12px] shadow-2xl shadow-primary/30">
                    {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Enviar Dossiê de Recrutamento"} <Zap size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 22 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse"><Trophy size={40} className="text-white" /></div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Formação Concluída.</h2>
                  <p className="text-xl text-white/50 font-medium">Seu dossiê técnico e vocal foi salvo com sucesso. Analisaremos seu perfil estrategicamente em até 48 horas e entraremos em contato via WhatsApp.</p>
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
