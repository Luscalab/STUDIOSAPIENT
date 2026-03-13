
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
  MessageSquare
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
        setStep(21);
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Treinamento Estratégico Sapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Formação <span className="text-primary italic lowercase">comercial.</span></h1>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={cn("h-1 min-w-[20px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação &amp; Perfil Profissional</h2>
                    <p className="text-white/40 text-sm">Seus dados são protegidos por criptografia de alto nível em servidores Google Cloud.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-white/40 ml-2">Dados de Contato</p>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="E-mail Corporativo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp (DDD + Número)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-white/40 ml-2">Presença Digital &amp; Carreira</p>
                    <Input value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="Instagram (@usuario)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="LinkedIn (URL do Perfil)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                    <Input value={formData.currentOccupation} onChange={(e) => setFormData({...formData, currentOccupation: e.target.value})} placeholder="Ocupação Atual" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  </div>
                  <Input value={formData.cityState} onChange={(e) => setFormData({...formData, cityState: e.target.value})} placeholder="Cidade / Estado" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} placeholder="Anos de Experiência em Vendas" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo de Segurança de Dados
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed uppercase font-bold">
                    Em conformidade com a LGPD, seus dados são armazenados de forma isolada e utilizados exclusivamente para este processo. Garantimos que nenhuma informação será compartilhada. Seus áudios de teste são deletados após a avaliação humana.
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
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">Confirmo a veracidade das informações e aceito os termos de proteção de dados.</label>
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
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Zap size={16} /> BRIEFING DE OPERAÇÃO: O MÉTODO SAPIENT</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DINÂMICA DE OUTBOUND ATIVO</h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Aqui você não espera o lead chegar. Nós entregamos <strong>"O Ouro"</strong> nas suas mãos: o contato e o diagnóstico do que está errado.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">O QUE VOCÊ RECEBE:</p>
                      <ul className="space-y-3">
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> Contato direto do decisor.</li>
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> O diagnóstico pronto de onde o dinheiro está <strong>vazando</strong>.</li>
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> O argumento cirúrgico para abrir a porta.</li>
                      </ul>
                    </div>
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">O SEU DESAFIO:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">O cliente não está esperando sua ligação. Você deve interromper o dia dele, mostrar o problema óbvio que ele não viu e fechar a reunião estratégica.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20">
                    <Checkbox id="outbound" checked={outboundAccepted} onCheckedChange={(c) => setOutboundAccepted(c === true)} />
                    <label htmlFor="outbound" className="text-xs text-white font-bold leading-tight cursor-pointer uppercase">
                      Entendo que a dinâmica é Outbound Ativo e receberei leads com gargalos explicados para agir com precisão.
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Formação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> Módulo 01: Mentalidade de Valor</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">VENDEMOS LUCRO, NÃO SERVIÇOS</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed">O cliente não quer um site, ele quer que o telefone toque. O site é o meio, o faturamento é o fim.</p>
                      
                      <div className="p-6 bg-primary/10 rounded-3xl border border-primary/20">
                        <h4 className="text-[10px] font-black text-primary uppercase mb-2">TRADUÇÃO PARA O CLIENTE:</h4>
                        <p className="text-sm text-white/70 italic">"Não estamos aqui para te vender um site novo. Estamos aqui para consertar a sua vitrine que está afastando clientes hoje."</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">ERRO AMADOR:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Falar de "recursos técnicos" (ex: "temos HTTPS"). O cliente não liga para isso. Fale de "proteção contra perda de dados".</p>
                      </div>
                      <div className="p-6 bg-green-500/10 rounded-3xl border border-green-500/20 space-y-4">
                        <p className="text-[10px] font-black text-green-400 uppercase">DICA DE AUTORIDADE:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">"Sempre que o cliente focar no preço, é porque você ainda não mostrou o tamanho do prejuízo que o gargalo dele está causando."</p>
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
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Search size={16} /> Módulo 02: O Caçador de Gargalos</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O CONCEITO DO BALDE FURADO</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 rounded-[2rem] bg-black/40 border border-white/5">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">ANALOGIA DO BALDE:</h4>
                        <p className="text-sm text-white/60 leading-relaxed italic">"Anúncios são a água que você joga no balde. Se o seu site é lento ou amador, o balde está furado. Jogar mais água (anúncios) só faz você gastar dinheiro sem encher o balde (lucro)."</p>
                      </div>
                      
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                        <h4 className="text-[10px] font-black text-white/40 uppercase mb-2 italic">Dicionário Leigo:</h4>
                        <ul className="space-y-2 text-[11px] text-white/60">
                          <li><strong>LCP (Velocidade):</strong> É o tempo que a porta da sua loja leva para abrir. Se demorar, o cliente vai pro vizinho.</li>
                          <li><strong>SEO:</strong> É o quão fácil o Google te encontra quando alguém grita por ajuda no seu bairro.</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Ads sem Filtro</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">É como pagar para distribuir panfletos de luxo no bairro errado. Você gasta com papel, mas quem recebe não tem dinheiro para comprar.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Redes "Cidades Fantasmas"</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">Um perfil sem postagens parece uma empresa falida. O cliente clica no anúncio, confere o Instagram e desiste porque acha que fechou.</p>
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
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> Módulo 03: Performance Ads &amp; GMN</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DOMÍNIO DE BUSCA LOCAL</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><MapPin size={14}/> O ECOSSISTEMA GMN</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Não é só estar no mapa. É ser a 1ª opção do bairro.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"O Google Meu Negócio é a sua fachada digital. Se ela está suja ou sem avaliações, o cliente nem atravessa a rua pra te ver."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-red-400 font-black uppercase text-[9px]"><Search size={14}/> FILTRO DE INTENÇÃO</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Bloqueamos quem busca "grátis" ou "curso" para focar em quem quer contratar.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"Estamos colocando um segurança na porta do seu anúncio para barrar quem só quer olhar e deixar entrar quem está com o cartão na mão."</p>
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
                    <p className="text-sm font-bold">Dr. Ricardo gastou R$ 5.000 no Google e diz que "só vem curioso querendo saber o preço". Ele quer parar tudo.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Como você explica para ele o conceito de "Filtro de Intenção" usando uma linguagem simples que mostre que o problema não é o Google, mas a falta de "segurança" na porta?</p>
                </div>
                <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} placeholder="Escreva aqui sua explicação estratégica e simples..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
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
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">LIDANDO COM A NEGATIVA</h3>
                  <p className="text-sm text-black/60 leading-relaxed">Grave um áudio para o Dr. Ricardo explicando que ele está "pescando no lugar errado". Use a linguagem leiga que aprendeu. Termine marcando uma conversa de 5 min para mostrar onde a verba está sendo desperdiçada.</p>
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
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Globe size={16} /> Módulo 04: Sites Premium &amp; Engenharia</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O PATRIMÔNIO DIGITAL DE ALTA PERFORMANCE</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><Activity size={14}/> INFRAESTRUTURA PROPRIETÁRIA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Código limpo para carregar em menos de 2 segundos.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"Seu site hoje é como uma secretária que demora 30 minutos para atender o telefone. O cliente já desligou e ligou para o outro."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Smartphone size={14}/> ENGENHARIA DE CONVERSÃO</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Botões de ação onde o olho do cliente descansa.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"Estamos desenhando o caminho do cliente para que ele não precise pensar. Ele entra, entende seu valor e clica no botão."</p>
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
                  <div className="flex items-center gap-3 text-pink-400 font-black uppercase text-[10px]"><Palette size={16} /> Módulo 05: Design Estratégico &amp; Semiótica</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O DESIGN COMO BARREIRA DE CONFIANÇA</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><Eye size={14}/> SEMIÓTICA DE VALOR</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">O que a marca diz sem usar palavras.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"As pessoas compram com os olhos primeiro. Se sua imagem parece amadora, o cliente assume que seu serviço também é. Design profissional é uma vacina contra quem chora por preço."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Layers size={14}/> ARQUITETURA DA MARCA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Otimizamos o perfil (Bio, Destaques, Avatar).</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"Seu Instagram é a sua segunda vitrine. Se o cliente entra e vê tudo bagunçado, ele foge por insegurança."</p>
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
                    <p className="text-sm font-bold">Dra. Helena é advogada criminal. O site dela é rosa, usa flores e leva 15s para abrir. Ela quer cobrar R$ 30k de honorários, mas ninguém fecha.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Aponte os 2 maiores gargalos usando a linguagem simples que aprendeu. Como você convenceria ela de que o problema é a "confiança visual" e a "porta emperrada" do site?</p>
                </div>
                <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} placeholder="Sua análise estratégica e simples aqui..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Automação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> Módulo 06: Chat IA &amp; Automação de Escala</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">INTELIGÊNCIA QUE QUALIFICA E VENDE</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-violet-400 font-black uppercase text-[9px]"><Zap size={14}/> SPEED TO LEAD</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Resposta em 30 segundos no WhatsApp.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"O lead esfria rápido. Se você não responde na hora da dor dele, ele já buscou o próximo no Google. Nossa IA garante que ninguém fique no vácuo."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><Cpu size={14}/> QUALIFICAÇÃO</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Filtramos o joio do trigo antes do humano.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"Sua equipe hoje gasta tempo dando 'bom dia' para curiosos. Nossa IA faz a triagem: só passa para o seu WhatsApp quem realmente tem orçamento e intenção de compra."</p>
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
                  <div className="flex items-center gap-3 text-blue-400 font-black uppercase text-[10px]"><Users size={16} /> Módulo 07: Gestão de Autoridade Social</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O FEED COMO PORTFÓLIO DE VALOR</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[9px]"><MousePointer2 size={14}/> CURADORIA ESTRATÉGICA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Focamos em Decisores, não em Seguidores.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"Seguidor é métrica de vaidade. Autoridade é métrica de lucro. Criamos conteúdo que educa o seu cliente ideal a te procurar pela sua expertise, não por preço."</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><CheckCircle2 size={14}/> BLINDAGEM DE PERFIL</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Bio Narrativa e Destaques de Conversão.</p>
                        
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                          <h4 className="text-[10px] font-black text-primary uppercase mb-1">COMO EXPLICAR AO CLIENTE:</h4>
                          <p className="text-[11px] text-white/40 italic">"Seu perfil no Instagram deve ser uma prova social 24h por dia. Quando alguém te descobre, ela precisa sentir na hora que você é a escolha óbvia."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-blue-500 text-white rounded-full font-black uppercase text-[10px]">Testar Social <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 13 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> DESAFIO 03: ESCALA &amp; ATENDIMENTO</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-violet-400 mb-2 uppercase">BRIEFING CLIENTE:</p>
                    <p className="text-sm font-bold">Imobiliária recebe 300 leads por dia vindo de anúncios. A secretária só responde 50. O dono quer cortar o marketing porque "leads desistem".</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Como você explicaria o conceito de "Custo de Oportunidade" e "Speed to Lead" sem usar esses nomes difíceis, focando no dinheiro que ele está deixando na mesa?</p>
                </div>
                <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} placeholder="Seu argumento de lucro simplificado aqui..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Estratégias por Nicho <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 14 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px]"><Briefcase size={16} /> Módulo 08: Especialização por Nicho (Parte 1)</div>
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

            {step === 15 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-rose-500/10 border border-rose-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-rose-400 font-black uppercase text-[10px]"><Sparkles size={16} /> Módulo 09: Especialização por Nicho (Parte 2)</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DO ESTILO AO SABOR</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><Sparkles size={14}/> BELEZA &amp; ESTÉTICA</div>
                      <p className="text-[11px] text-white/50">"O design profissional te tira da vala comum das promoções. Você passa a ser escolhida pelo seu resultado, não pelo seu preço baixo."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-orange-400 font-black uppercase text-[9px]"><Utensils size={14}/> RESTAURANTES</div>
                      <p className="text-[11px] text-white/50">"Site próprio de pedidos economiza 30% em taxas de aplicativos. Anúncios locais trazem o vizinho no meio da semana."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Music size={14}/> LOUNGES &amp; SHOWS</div>
                      <p className="text-[11px] text-white/50">"IA automatiza a lista VIP e reservas 24h. Sua equipe foca em servir bem, não em digitar no WhatsApp."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Dog size={14}/> PET SHOPS</div>
                      <p className="text-[11px] text-white/50">"Donos de pet compram de quem transmite confiança técnica e carinho. Suas redes sociais passam isso hoje?"</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-rose-500 text-white rounded-full font-black uppercase text-[10px]">O Método Cirurgião <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 16 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><PhoneCall size={16} /> Módulo 10: O Consultor Cirurgião</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">COMO INTERROMPER COM VALOR</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed">No Outbound, o cliente não te espera. Você deve mostrar o vazamento de dinheiro e sair com a reunião marcada.</p>
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">A ESTRUTURA DO GANCHO:</p>
                        <ul className="space-y-2 text-xs text-white/40 italic">
                          <li>1. Hook (Problema): "Notei que sua vitrine digital está com a porta emperrada..."</li>
                          <li>2. O Ouro (Prejuízo): "...isso está fazendo você perder leads qualificados agora."</li>
                          <li>3. A Solução: "Desenhei um rascunho de como resolver isso."</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">NUNCA FAÇA ISSO:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Não peça "um minutinho". Não tente ser amiguinho. Seja o especialista que resolve o incêndio que o cliente nem sabia que existia.</p>
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

            {step === 17 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Mic size={16} /> DESAFIO: ABERTURA CIRÚRGICA</div>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] font-black text-primary mb-2 uppercase">BRIEFING CLIENTE:</p>
                    <p className="text-sm font-bold">"Lounge 77". O link do WhatsApp na Bio deles no Instagram dá erro 404. O dono está ocupado.</p>
                  </div>
                  <p className="text-xs font-bold text-black/40 uppercase italic">Grave seu áudio de 30-45 segundos aplicando o Método Cirurgião. Use a linguagem simples (vitrine, porta emperrada, vazamento).</p>
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

            {step === 18 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-10">
                  <div className="flex items-center gap-3 text-green-400 font-black uppercase text-[10px]"><CircleDollarSign size={16} /> Módulo 11: Planos &amp; Ecossistemas Estratégicos</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">MONTANDO A SOLUÇÃO IDEAL</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Plano Essencial */}
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4 flex flex-col">
                      <Badge className="bg-white/10 text-white border-none w-fit text-[7px] uppercase">O ESSENCIAL</Badge>
                      <h4 className="text-lg font-black uppercase">Visibilidade Local</h4>
                      <p className="text-[10px] text-white/40">GMN Otimizado + Pequenas campanhas locais.</p>
                      <p className="text-xl font-black text-green-400 mt-auto">R$ 2.5k - 4k/mês</p>
                      <p className="text-[8px] text-white/20 italic">Ideal para: Profissionais Liberais autônomos.</p>
                    </div>

                    {/* Plano Máquina de Vendas */}
                    <div className="p-6 rounded-3xl bg-primary/20 border border-primary/30 space-y-4 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2"><Zap className="h-4 w-4 text-primary animate-pulse" /></div>
                      <Badge className="bg-primary text-white border-none w-fit text-[7px] uppercase">MAIS VENDIDO</Badge>
                      <h4 className="text-lg font-black uppercase">Máquina de Vendas</h4>
                      <p className="text-[10px] text-white/40">Ads + Site de Alta Conversão + GMN.</p>
                      <p className="text-xl font-black text-white mt-auto">R$ 6k - 10k/mês</p>
                      <p className="text-[8px] text-white/40 italic">Foco: Gerar leads qualificados todo dia.</p>
                    </div>

                    {/* Plano Autoridade Total */}
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4 flex flex-col">
                      <Badge className="bg-amber-500/20 text-amber-400 border-none w-fit text-[7px] uppercase">DOMÍNIO TOTAL</Badge>
                      <h4 className="text-lg font-black uppercase">Ecossistema Sapient</h4>
                      <p className="text-[10px] text-white/40">Tudo integrado + Chat IA + Gestão Social.</p>
                      <p className="text-xl font-black text-amber-400 mt-auto">R$ 15k - 25k+/mês</p>
                      <p className="text-[8px] text-white/20 italic">Foco: Grandes empresas e autoridade absoluta.</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
                    <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]">
                      <Coins size={18} /> Política de Flexibilidade e Impacto
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <p className="text-xs text-white/50 leading-relaxed font-medium">
                        Estes são <strong>valores base</strong>. Nossa precificação é estratégica: grandes empresas investem valores condizentes com o mercado de alto padrão.
                      </p>
                      <p className="text-xs text-white/50 leading-relaxed font-medium">
                        Contudo, realizamos <strong>descontos para empresas de pequeno porte</strong> a fim de democratizar a alta performance e expandir o alcance do estúdio.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-green-500 text-white rounded-full font-black uppercase text-[10px]">Postura &amp; Autoridade <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 19 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Video size={16} /> Módulo 12: Postura &amp; Etiqueta Comercial</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O CLIENTE COMPRA VOCÊ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">VÍDEO CHAMADA</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Luz frontal e olho na câmera. Se sua imagem está escura, você perde autoridade instantaneamente.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">ÁUDIOS WHATSAPP</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Máximo 1:30 min. Use tom firme, sem gírias. Fale da dor e termine com uma pergunta de ação.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">A REUNIÃO</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Ouça 80%. Deixe o cliente confessar o gargalo dele. Você só entrega a solução no final.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Pitch Final <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 20 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Trophy size={16} /> O DESAFIO FINAL</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">SIMULAÇÃO DE FECHAMENTO</h3>
                  <p className="text-sm text-black/60 leading-relaxed">Grave um pitch de até 2 min para um empresário. Venda o <strong>MÁQUINA DE VENDAS</strong> (Ads + Site + GMN). Use obrigatoriamente a linguagem simples (vitrine, ralo de dinheiro, segurança na porta). Demonstre postura cirúrgica.</p>
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
                    {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Enviar Dossiê Comercial"} <Zap size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 21 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse"><Trophy size={40} className="text-white" /></div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Formação Concluída.</h2>
                  <p className="text-xl text-white/50 font-medium">Seus dados e áudios foram salvos com sucesso em nosso sistema de avaliação humana. Analisaremos seu perfil estrategicamente em até 48 horas e entraremos em contato via WhatsApp.</p>
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
