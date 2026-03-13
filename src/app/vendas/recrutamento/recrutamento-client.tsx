
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
  Eye
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Formação Consultiva Sapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Formação <span className="text-primary italic lowercase">estratégica.</span></h1>
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
                    <p className="text-white/40 text-sm">Seus dados e áudios são protegidos por criptografia de alto nível em servidores Google.</p>
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
                    Em conformidade com a LGPD, seus dados são armazenados de forma isolada e utilizados exclusivamente para este processo de seleção comercial. Garantimos que nenhuma informação será compartilhada com terceiros. Seus áudios de teste são deletados após a avaliação humana.
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
                    Diferente de agências tradicionais, aqui você não espera o lead chegar. Nós entregamos <strong>"O Ouro"</strong> nas suas mãos.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">O QUE VOCÊ RECEBE:</p>
                      <ul className="space-y-3">
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> O nome do lead e o contato direto.</li>
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> O diagnóstico pronto de onde ele está <strong>vazando dinheiro</strong> agora.</li>
                        <li className="flex gap-2 text-sm text-white/70 italic"><CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" /> O argumento matador para abrir a porta.</li>
                      </ul>
                    </div>
                    <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">O SEU DESAFIO:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">O cliente não está esperando sua ligação. Você deve ser um <strong>Cirurgião</strong>: interromper o dia dele, mostrar o problema óbvio que ele não viu e fechar a reunião estratégica.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20">
                    <Checkbox id="outbound" checked={outboundAccepted} onCheckedChange={(c) => setOutboundAccepted(c === true)} />
                    <label htmlFor="outbound" className="text-xs text-white font-bold leading-tight cursor-pointer uppercase">
                      Entendo que a dinâmica é Outbound Ativo e receberei leads com gargalos já explicados para agir com precisão cirúrgica.
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Entendido, Iniciar Formação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> Módulo 01: Mentalidade Comercial</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">COMO VENDEMOS: VALOR &gt; PREÇO</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed">Não somos "tiradores de pedido". O cliente não quer um site, ele quer que o telefone toque. O site é o meio, o lucro é o fim.</p>
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-indigo-300 uppercase">A REGRA DO 10X:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Nossas soluções visam trazer pelo menos 10x o valor investido de volta para o cliente através de eficiência e novos contratos.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">O QUE EVITAR:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Falar de "recursos técnicos" (ex: "temos SSL"). O cliente não liga para isso. Fale de "segurança do patrimônio digital".</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O CONCEITO DO BALDE FURADO.</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 rounded-[2rem] bg-black/40 border border-white/5">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">ANALOGIA DO BALDE:</h4>
                        <p className="text-sm text-white/60 leading-relaxed italic">"Anúncios são a água que você joga no balde. Se o site do cliente é lento ou amador, o balde está furado. Jogar mais água (anúncios) só faz ele gastar mais dinheiro sem encher o balde (lucro)."</p>
                      </div>
                      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">MATEMÁTICA DO GARGALO:</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">Se de 1000 pessoas que entram no site, apenas 1 compra, a taxa é de 0,1%. Se dobramos a velocidade do site e 5 pessoas compram, a taxa vai para 0,5%. O cliente faturou 5x mais com o MESMO investimento em anúncios.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Ads sem Filtro</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">Explicação Leiga: É como pagar para distribuir panfletos de luxo no bairro errado. Você gasta com papel e mão de obra, mas quem recebe não tem dinheiro para comprar.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Redes "Cidades Fantasmas"</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">Explicação Leiga: Um perfil sem postagens recentes parece uma empresa que faliu. O cliente clica no anúncio, vai no Instagram conferir e desiste porque acha que a empresa fechou.</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DOMÍNIO DE BUSCA LOCAL.</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card Google Meu Negócio Detalhado */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><MapPin size={14}/> O ECOSSISTEMA GMN</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Não é só "estar no mapa". O GMN otimizado pela Sapient inclui: 
                          <br/><br/>
                          1. <strong>Geo-Tagging:</strong> Fotos com coordenadas GPS para o Google entender que você é o mais relevante do bairro.
                          <br/>
                          2. <strong>Curadoria de Prova Social:</strong> Respostas com palavras-chave estratégicas para subir o ranking.
                          <br/>
                          3. <strong>Atualização Semanal:</strong> Mostramos que a empresa está "viva" e pronta para atender.
                        </p>
                        <div className="p-4 bg-cyan-400/5 rounded-2xl border border-cyan-400/10">
                          <p className="text-[10px] font-black text-cyan-400 uppercase mb-1 italic">Tradução de Venda:</p>
                          <p className="text-[11px] text-white/40 italic">"O Google é o novo Páginas Amarelas. Se você não está no Top 3 do mapa, você é invisível para quem tem pressa."</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Google Ads & Filtro Detalhado */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-red-400 font-black uppercase text-[9px]"><Search size={14}/> FILTRO DE INTENÇÃO (NEGATIVAÇÃO)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          O maior ralo de dinheiro no Ads é o clique errado. Nós configuramos:
                          <br/><br/>
                          1. <strong>Negativação Cirúrgica:</strong> Bloqueamos termos como "vagas", "grátis", "curso" e "barato".
                          <br/>
                          2. <strong>Foco em Fundo de Funil:</strong> Anunciamos para quem busca "Contratar advogado" e não apenas "O que é direito".
                          <br/>
                          3. <strong>Monitoramento de ROAS:</strong> Garantimos que o lucro seja maior que o investimento.
                        </p>
                        <div className="p-4 bg-red-400/5 rounded-2xl border border-red-400/10">
                          <p className="text-[10px] font-black text-red-400 uppercase mb-1 italic">Tradução de Venda:</p>
                          <p className="text-[11px] text-white/40 italic">"Parar de anunciar é como parar o relógio para economizar tempo. Você economiza centavos em cliques e perde milhares em contratos."</p>
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
                    <p className="text-sm font-bold">Dr. Ricardo gastou R$ 5.000 no Google e diz que "só vem curioso querendo saber o preço". Ele quer parar os anúncios agora porque "Google não funciona".</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Como você explica para ele o conceito de "Filtro de Intenção" usando a analogia do segurança na porta?</p>
                </div>
                <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} placeholder="Escreva aqui sua explicação estratégica..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
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
                  <p className="text-sm text-black/60 leading-relaxed">Mande um áudio para o Dr. Ricardo explicando que o Google funciona, mas ele está "pescando no lugar errado sem isca". Termine marcando uma conversa de 5 min para mostrar onde a verba está sendo desperdiçada.</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O PATRIMÔNIO DIGITAL DE ALTA PERFORMANCE.</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card Infraestrutura & Velocidade */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><Activity size={14}/> INFRAESTRUTURA PROPRIETÁRIA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Diferente de agências que usam templates prontos (WordPress/Wix), a Sapient constrói com código limpo:
                          <br/><br/>
                          1. <strong>Core Web Vitals (LCP):</strong> Nosso foco é o carregamento em menos de 2s. Isso faz o Google te amar e o cliente não desistir.
                          <br/>
                          2. <strong>Hospedagem Blindada:</strong> Servidores de alta performance com redundância global.
                          <br/>
                          3. <strong>SEO On-Page Nativo:</strong> O site já nasce estruturado para os algoritmos.
                        </p>
                        <div className="p-4 bg-cyan-400/5 rounded-2xl border border-cyan-400/10">
                          <p className="text-[10px] font-black text-cyan-400 uppercase mb-1 italic">Gargalo do Cliente:</p>
                          <p className="text-[11px] text-white/40 italic">"Um site lento é como uma secretária que demora 30 minutos para atender o telefone. O cliente já desligou."</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Conversão & Mobile */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Smartphone size={14}/> ENGENHARIA DE CONVERSÃO</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          O site é desenhado para o fechamento:
                          <br/><br/>
                          1. <strong>Mobile First Real:</strong> Experiência impecável no polegar do cliente (90% do tráfego).
                          <br/>
                          2. <strong>Hierarquia de CTAs:</strong> Botões de ação posicionados onde o olho do cliente descansa.
                          <br/>
                          3. <strong>Carregamento Progressivo:</strong> O conteúdo mais importante aparece primeiro.
                        </p>
                        <div className="p-4 bg-indigo-400/5 rounded-2xl border border-indigo-400/10">
                          <p className="text-[10px] font-black text-indigo-400 uppercase mb-1 italic">Verdade Dura:</p>
                          <p className="text-[11px] text-white/40 italic">"Se seu site não carrega em 3 segundos, você já perdeu 50% dos seus clientes potenciais."</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O DESIGN COMO BARREIRA DE CONFIANÇA.</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card Semiótica & Cognição */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><Eye size={14}/> SEMIÓTICA DE VALOR</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Não é sobre "ser bonito", é sobre ser respeitado:
                          <br/><br/>
                          1. <strong>Psicologia Cromática:</strong> Cores que evocam urgência (Saúde) ou solidez (Direito).
                          <br/>
                          2. <strong>Tipografia de Autoridade:</strong> Fontes que transmitem tradição ou inovação instantaneamente.
                          <br/>
                          3. <strong>Branding Cognitivo:</strong> Organizar a marca para que o cérebro do cliente entenda: "Isso é caro e vale a pena".
                        </p>
                        <div className="p-4 bg-pink-400/5 rounded-2xl border border-pink-400/10">
                          <p className="text-[10px] font-black text-pink-400 uppercase mb-1 italic">Conceito Chave:</p>
                          <p className="text-[11px] text-white/40 italic">"As pessoas compram primeiro com os olhos. Se sua imagem é amadora, o cliente assume que seu serviço também é."</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Otimização de Ambientes */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Layers size={14}/> ARQUITETURA DA MARCA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Entregamos um ecossistema visual coerente:
                          <br/><br/>
                          1. <strong>Manual de Identidade:</strong> Regras de uso para nunca mais parecer bagunçado.
                          <br/>
                          2. <strong>Otimização de Perfil:</strong> Bio, destaques e avatar alinhados com o novo posicionamento.
                          <br/>
                          3. <strong>Assets de Autoridade:</strong> Cartões digitais e assinaturas de e-mail profissionais.
                        </p>
                        <div className="p-4 bg-amber-400/5 rounded-2xl border border-amber-400/10">
                          <p className="text-[10px] font-black text-amber-400 uppercase mb-1 italic">Verdade de Mercado:</p>
                          <p className="text-[11px] text-white/40 italic">"Design profissional não é um custo, é uma vacina contra clientes que choram por preço."</p>
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
                    <p className="text-sm font-bold">Dra. Helena é advogada criminalista. O site dela é rosa claro, usa fotos de flores e leva 15s para abrir. Ela quer cobrar R$ 30k de honorários iniciais e diz que ninguém fecha.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Aponte os 2 maiores gargalos (técnico e de autoridade) e como você explicaria isso para ela de forma a não ofender, mas convencê-la a mudar?</p>
                </div>
                <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} placeholder="Sua análise estratégica aqui..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">INTELIGÊNCIA QUE QUALIFICA E VENDE.</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card Velocidade & Retenção */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-violet-400 font-black uppercase text-[9px]"><Zap size={14}/> SPEED TO LEAD (RETENÇÃO)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          O lead esfria a cada minuto sem resposta:
                          <br/><br/>
                          1. <strong>Resposta em 30 Segundos:</strong> Nossa IA aborda o cliente no ápice da dor dele.
                          <br/>
                          2. <strong>Atendimento 24/7:</strong> Você para de perder vendas no sábado à noite ou feriados.
                          <br/>
                          3. <strong>Omnicanalidade:</strong> Mesma inteligência no Site, WhatsApp e Instagram.
                        </p>
                        <div className="p-4 bg-violet-400/5 rounded-2xl border border-violet-400/10">
                          <p className="text-[10px] font-black text-violet-400 uppercase mb-1 italic">Dado Real:</p>
                          <p className="text-[11px] text-white/40 italic">"Chances de conversão caem 10x se você demora mais de 5 minutos para responder o lead."</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Qualificação & Filtro */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px]"><Cpu size={14}/> QUALIFICAÇÃO (LEAD SCORING)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Filtramos o joio do trigo antes de chegar no humano:
                          <br/><br/>
                          1. <strong>Perguntas Estratégicas:</strong> A IA descobre o orçamento e o prazo do cliente.
                          <br/>
                          2. <strong>Agendamento Automático:</strong> O lead já cai na agenda do vendedor pronto para o fechamento.
                          <br/>
                          3. <strong>Triagem de Urgência:</strong> Prioriza leads que precisam de solução imediata.
                        </p>
                        <div className="p-4 bg-cyan-400/5 rounded-2xl border border-cyan-400/10">
                          <p className="text-[10px] font-black text-cyan-400 uppercase mb-1 italic">Alívio Operacional:</p>
                          <p className="text-[11px] text-white/40 italic">"Sua equipe foca em vender, não em dar 'bom dia' para curiosos."</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O FEED COMO PORTFÓLIO DE VALOR.</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card Curadoria & Conteúdo */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[9px]"><MousePointer2 size={14}/> CURADORIA ESTRATÉGICA</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Postar por postar não paga as contas:
                          <br/><br/>
                          1. <strong>Conteúdo Educativo:</strong> Ensinamos o cliente por que o seu serviço é a única solução lógica.
                          <br/>
                          2. <strong>Estética Premium:</strong> O visual do seu Instagram deve gritar "empresa séria" no primeiro segundo.
                          <br/>
                          3. <strong>Foco em Decisores:</strong> Falamos para quem tem o cartão na mão, não para quem busca dicas grátis.
                        </p>
                        <div className="p-4 bg-blue-400/5 rounded-2xl border border-blue-400/10">
                          <p className="text-[10px] font-black text-blue-400 uppercase mb-1 italic">Regra de Ouro:</p>
                          <p className="text-[11px] text-white/40 italic">"Seguidor é métrica de vaidade. Autoridade é métrica de lucro."</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Otimização de Perfil Completa */}
                    <div className="space-y-6">
                      <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><CheckCircle2 size={14}/> BLINDAGEM DE PERFIL</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Otimizamos o "Ambiente de Recepção":
                          <br/><br/>
                          1. <strong>Bio Narrativa:</strong> Uma promessa clara que remove qualquer dúvida sobre o que você faz.
                          <br/>
                          2. <strong>Destaques de Conversão:</strong> Provas sociais, FAQ e bastidores que geram desejo imediato.
                          <br/>
                          3. <strong>Engenharia de Link da Bio:</strong> Direcionamento cirúrgico para o WhatsApp ou LP de Venda.
                        </p>
                        <div className="p-4 bg-indigo-400/5 rounded-2xl border border-indigo-400/10">
                          <p className="text-[10px] font-black text-indigo-400 uppercase mb-1 italic">Insight:</p>
                          <p className="text-[11px] text-white/40 italic">"Seu Instagram é a sua segunda vitrine. Se o cliente clica no anúncio e cai num perfil bagunçado, ele foge."</p>
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
                    <p className="text-sm font-bold">Imobiliária recebe 300 leads por dia no WhatsApp vindo de anúncios. A secretária só consegue responder 50. Eles reclamam que os leads "desistem rápido" e o dono quer cortar o marketing.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Use o conceito de "Custo de Oportunidade" para convencê-lo de que o problema não é o marketing, mas o gargalo no atendimento que a IA resolveria.</p>
                </div>
                <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} placeholder="Seu argumento de lucro aqui..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">FALE A LÍNGUA DO CLIENTE.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[9px]"><StethoscopeIcon size={14}/> SAÚDE</div>
                      <p className="text-[11px] text-white/50">Gargalo: Agenda vazia por falta de confiança. Argumento: "Doutor, o paciente busca segurança. Se seu GMN não tem avaliações e seu site é amador, ele escolhe o vizinho mesmo você sendo melhor tecnicamente."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Layers size={14}/> DIREITO</div>
                      <p className="text-[11px] text-white/50">Gargalo: Proibição de propaganda direta. Argumento: "Doutor, não vendemos anúncios, vendemos Autoridade. Criamos conteúdo técnico que ensina o cliente a te procurar pela sua expertise."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[9px]"><MapPin size={14}/> IMOBILIÁRIO</div>
                      <p className="text-[11px] text-white/50">Gargalo: Ciclo de venda longo e lead frio. Argumento: "IA qualifica o comprador às 2h da manhã. Quando seu corretor acorda, o lead já disse qual planta ele quer e quanto pode pagar."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><ShoppingBag size={14}/> VAREJO LOCAL</div>
                      <p className="text-[11px] text-white/50">Gargalo: Invisível no bairro. Argumento: "Se eu estou no quarteirão ao lado e busco seu produto, sua loja é a primeira a aparecer com o trajeto do Google Maps?"</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DO ESTILO AO SABOR.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><Sparkles size={14}/> BELEZA &amp; ESTÉTICA</div>
                      <p className="text-[11px] text-white/50">Gargalo: Guerra de preços. Argumento: "Você quer ser a manicure barata ou a especialista em reconstrução? O design profissional te tira da vala comum das promoções."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Dog size={14}/> PET SHOPS &amp; VET</div>
                      <p className="text-[11px] text-white/50">Gargalo: Insegurança dos donos. Argumento: "Donos de pet são pais. Eles compram de quem transmite mais confiança e carinho técnico. Suas redes passam isso?"</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-orange-400 font-black uppercase text-[9px]"><Utensils size={14}/> RESTAURANTES &amp; DELIVERY</div>
                      <p className="text-[11px] text-white/50">Gargalo: Taxas do iFood e salão vazio. Argumento: "Site próprio de pedidos economiza 30% em taxas. Ads geográfico traz o vizinho no meio da semana."</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Music size={14}/> LOUNGES &amp; SHOWS</div>
                      <p className="text-[11px] text-white/50">Gargalo: Caos nas reservas de mesa. Argumento: "IA automatiza a lista VIP e reservas 24h. Sua equipe foca em servir, não em digitar no WhatsApp."</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">COMO INTERROMPER COM VALOR.</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed">No Outbound Ativo, o cliente não te espera. Você deve ser um "cirurgião": entrar no assunto, mostrar o vazamento de dinheiro e sair com a reunião marcada.</p>
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">A ESTRUTURA DO GANCHO:</p>
                        <ul className="space-y-2 text-xs text-white/40 italic">
                          <li>1. Hook (Problema Óbvio): "Notei que seu link da Bio está quebrado..."</li>
                          <li>2. O Ouro (Consequência Financeira): "...isso está fazendo você perder pelo menos 5 leads por dia."</li>
                          <li>3. A Solução (Rascunho): "Tenho o rascunho de como resolver isso agora."</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">NUNCA FAÇA ISSO:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Não pergunte "tudo bem?". Não peça "um minutinho". Não tente ser amiguinho. Seja o especialista que resolve o incêndio que o cliente nem sabia que existia.</p>
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
                    <p className="text-sm font-bold">"Lounge 77". Você viu que o link do WhatsApp na Bio deles no Instagram dá erro 404. O dono está ocupado no salão. Ligue e marque a reunião.</p>
                  </div>
                  <p className="text-xs font-bold text-black/40 uppercase italic">Grave seu áudio de 30-45 segundos aplicando o Método Cirurgião (Hook &gt; Ouro &gt; CTA).</p>
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
                  <div className="flex items-center gap-3 text-green-400 font-black uppercase text-[10px]"><CircleDollarSign size={16} /> Módulo 11: Planos &amp; Precificação Estratégica</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">VENDA O ECOSSISTEMA, NÃO A TABELA.</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-lg text-white/60 leading-relaxed">Identificamos o ecossistema ideal para estancar os vazamentos de lucro. Abaixo estão as bases médias de investimento:</p>
                      <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-2">
                        <p className="text-[10px] font-black text-green-400 uppercase">SOLUÇÃO PONTUAL</p>
                        <p className="text-sm text-white/70">Ex: Só Ads ou Só Site. R$ 2.5k - 5k/mês.</p>
                        <p className="text-[9px] text-white/30 italic">Ideal para: Testes rápidos ou orçamentos muito enxutos.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 rounded-3xl bg-primary/20 border border-primary/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2"><Badge className="bg-primary text-white text-[7px] uppercase">CARRO-CHEFE</Badge></div>
                        <p className="text-[10px] font-black text-primary uppercase mb-1">ECOSSISTEMA BASE</p>
                        <p className="text-sm text-white/70">Ads + Landing Page + GMN. R$ 6k - 10k/mês.</p>
                        <p className="text-[9px] text-white/40 mt-2">Por que vender: É o combo que garante ROI real e escala imediata.</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black text-white/60 uppercase mb-1">AUTORIDADE TOTAL</p>
                        <p className="text-sm text-white/70">Tudo acima + IA + Social + Dossiês. R$ 15k+/mês.</p>
                        <p className="text-[9px] text-white/30 mt-2">Ideal para: Grandes empresas que buscam domínio absoluto de mercado.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
                    <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]">
                      <Coins size={18} /> Política de Flexibilidade e Impacto
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <p className="text-xs text-white/50 leading-relaxed font-medium">
                        Estes são <strong>valores base</strong>. Nossa precificação é estratégica e flexível: empresas de grande porte investem valores condizentes com o mercado de alto padrão, garantindo a entrega de máxima sofisticação técnica.
                      </p>
                      <p className="text-xs text-white/50 leading-relaxed font-medium">
                        Contudo, a <strong>studiosapient</strong> realiza descontos para empresas de pequeno porte e profissionais autônomos, <strong>a fim de expandir o alcance da sapient studio</strong> e democratizar soluções profissionais que antes eram acessíveis apenas para gigantes.
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O CLIENTE COMPRA VOCÊ.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">VÍDEO CHAMADA</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Luz frontal, fundo limpo e olho na câmera. Se sua conexão falha ou sua imagem está escura, você perde autoridade instantaneamente.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">ÁUDIOS WHATSAPP</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Máximo 1:30 min. Use tom firme, sem gírias. Fale da dor e termine sempre com uma pergunta clara de ação.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest">A REUNIÃO</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Ouça 80% e fale 20%. Deixe o cliente confessar o gargalo dele. Você só entrega o rascunho da solução no final.</p>
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
                  <p className="text-sm text-black/60 leading-relaxed">Grave um pitch de até 2 min para um empresário de um nicho à sua escolha. Venda o ECOSSISTEMA BASE focando em um gargalo real que você encontrou. Demonstre autoridade, clareza e postura cirúrgica.</p>
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
