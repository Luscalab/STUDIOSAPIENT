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
  Target,
  TrendingUp,
  Layout,
  Palette,
  Bot,
  Users,
  BookOpen,
  Search,
  Activity,
  AlertCircle,
  Video,
  Layers,
  MapPin,
  CircleDollarSign,
  Briefcase,
  Stethoscope,
  Scale,
  Home,
  ShoppingBag,
  Sparkles,
  Utensils,
  Dog,
  Music,
  Stethoscope as StethoscopeIcon,
  PhoneCall,
  Coins
} from "lucide-react";
import { useFirebase, useFirestore, initiateAnonymousSignIn } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
    pitchFinalAudio: ""
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
            setFormData(prev => ({ ...prev, pitchFinalAudio: b64 }));
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

  const handleSubmit = async () => {
    if (!audioFinalBase64) {
      toast({ title: "Falta o Áudio Final", description: "Grave seu pitch final para concluir.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    try {
      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
          timestamp: serverTimestamp(),
          status: 'PENDENTE_AVALIACAO_HUMANA'
        });
      }
      setStep(21); 
    } catch (error) {
      console.error(error);
      toast({ title: "Erro no Envio", description: "Ocorreu um problema ao salvar seu dossiê.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Treinamento de Consultoria Sapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Formação <span className="text-primary italic lowercase">estratégica.</span></h1>
            </div>
          </div>

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
                    <p className="text-white/40 text-sm">Seus dados e áudios são protegidos por criptografia de nível bancário.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="E-mail" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp (DDD + Número)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.cityState} onChange={(e) => setFormData({...formData, cityState: e.target.value})} placeholder="Cidade / Estado" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="Instagram (@usuario)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="LinkedIn (URL do Perfil)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.currentOccupation} onChange={(e) => setFormData({...formData, currentOccupation: e.target.value})} placeholder="Ocupação Atual" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} placeholder="Tempo de Experiência em Vendas" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo de Dados
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed uppercase font-bold">
                    Suas respostas e arquivos de áudio são armazenados de forma segura e utilizados apenas para este processo seletivo. Garantimos privacidade total sob infraestrutura Google Firebase.
                  </p>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">Aceito os termos de segurança e proteção de dados.</label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Próximo Passo <ChevronRight size={18} />
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
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-amber-300 uppercase">O QUE VOCÊ RECEBE:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">O nome do lead, o contato direto e o diagnóstico pronto de onde ele está <strong>vazando dinheiro</strong> agora.</p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-primary uppercase">O SEU DESAFIO:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">O cliente não está esperando sua ligação. Você deve ser um <strong>Cirurgião</strong>: interromper, mostrar o problema e fechar a reunião.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20">
                    <Checkbox id="outbound" checked={outboundAccepted} onCheckedChange={(c) => setOutboundAccepted(c === true)} />
                    <label htmlFor="outbound" className="text-xs text-white font-bold leading-tight cursor-pointer uppercase">
                      Entendo que a dinâmica é Outbound Ativo e receberei leads com gargalos já explicados para agir com precisão.
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Treinamento <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> Módulo 01: Mentalidade Comercial</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">COMO VENDEMOS: VALOR &gt; PREÇO</h3>
                  <p className="text-lg text-white/60 leading-relaxed">Não somos "tiradores de pedido". O cliente não quer um site, ele quer que o telefone toque. O site é o meio, o lucro é o fim.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-indigo-300 uppercase">DICA DE AUTORIDADE:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">"Sempre que o cliente focar no preço, é porque você ainda não mostrou o tamanho do prejuízo que o gargalo dele está causando."</p>
                    </div>
                    <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 space-y-4">
                      <p className="text-[10px] font-black text-red-400 uppercase">O QUE EVITAR:</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">Falar de "recursos técnicos" (ex: "temos SSL"). Fale de "benefícios de negócio" (ex: "seus dados e dos seus clientes estarão protegidos").</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">ONDE O DINHEIRO ESTÁ VAZANDO?</h3>
                  <p className="text-lg text-white/60 leading-relaxed">Um gargalo é qualquer ponto no processo que impede a venda. Você precisa ensinar o cliente a ver esse vazamento.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Site Lento</h4>
                      <p className="text-[11px] text-white/50 leading-relaxed">Explicação Leiga: É como ter uma loja linda com a porta emperrada. O cliente tenta entrar, não consegue e vai no vizinho.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Ads sem Filtro</h4>
                      <p className="text-[11px] text-white/50 leading-relaxed">Explicação Leiga: Você está pagando para distribuir panfletos na cidade inteira, quando só quem mora no seu bairro pode comprar de você.</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A BUSCA DE URGÊNCIA.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[8px]"><MapPin size={12}/> GOOGLE MEU NEGÓCIO (GMN)</div>
                      <p className="text-[11px] text-white/50 leading-relaxed">É o mapa do Google. Se está sem fotos ou avaliações, a empresa parece abandonada. É o cartão de visitas local.</p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex items-center gap-2 text-red-400 font-black uppercase text-[8px]"><Search size={12}/> FILTRO DE INTENÇÃO</div>
                      <p className="text-[11px] text-white/50 leading-relaxed">Jargão: Usar palavras negativas (ex: "grátis", "preço") para impedir que curiosos cliquem no seu anúncio e gastem seu dinheiro.</p>
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
                    <p className="text-sm font-bold">Dr. Ricardo gastou R$ 5.000 no Google e diz que "só vem curioso querendo saber o preço". Ele quer parar os anúncios.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Como você explica para ele o conceito de "Filtro de Intenção" de forma leiga?</p>
                </div>
                <Textarea value={formData.ansAds} onChange={(e) => setFormData({...formData, ansAds: e.target.value})} placeholder="Sua explicação estratégica..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
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
                  <p className="text-sm text-black/60 leading-relaxed">Mande um áudio para o Dr. Ricardo explicando que o Google funciona, mas ele está "pescando no lugar errado sem isca". Termine marcando uma conversa de 5 min.</p>
                </div>
                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button onClick={() => isRecording ? stopAllRecording('audio1') : startRecording('audio1')} className={cn("h-24 w-24 rounded-full flex items-center justify-center transition-all shadow-2xl border-4", isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105")}>
                    {isRecording ? <MicOff size={30} /> : <Mic size={30} />}
                  </button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{isRecording ? "GRAVANDO..." : audio1Base64 ? "RESPOSTA GRAVADA" : "Clique para Gravar"}</p>
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
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> Módulo 04: Vitrine Digital</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A PRIMEIRA IMPRESSÃO É A VENDA.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-cyan-400 uppercase">VELOCIDADE (LCP)</p>
                      <p className="text-[11px] text-white/50">Jargão: Tempo de carregamento. Se o site demora +3s, o cliente volta para o Google e clica no seu concorrente.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-cyan-400 uppercase">MOBILE FIRST</p>
                      <p className="text-[11px] text-white/50">Sites que não funcionam perfeitamente no celular são invisíveis. 90% das vendas começam na palma da mão.</p>
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
                <div className="p-8 rounded-[2.5rem] bg-pink-500/10 border border-pink-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-pink-400 font-black uppercase text-[10px]"><Palette size={16} /> Módulo 05: Psicologia de Valor</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O QUE O OLHAR COMPRA.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-pink-400 uppercase">SEMIÓTICA DE VALOR</p>
                      <p className="text-[11px] text-white/50">Jargão: Estudo dos símbolos. Usamos cores, fontes e formas para dizer "sou autoridade" sem precisar abrir a boca.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-pink-400 uppercase">GARGALO: AMADORISMO</p>
                      <p className="text-[11px] text-white/50">Se sua imagem parece barata, você só atrai clientes que brigam por centavos.</p>
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
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> DESAFIO 02: SITES &amp; DESIGN</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase">BRIEFING CLIENTE:</p>
                    <p className="text-sm font-bold">Dra. Helena é advogada criminalista. O site dela é rosa claro e leva 15s para abrir. Ela quer cobrar R$ 30k de honorários.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Por que ela não vai conseguir fechar contratos de R$ 30k com esse site atual?</p>
                </div>
                <Textarea value={formData.ansSites} onChange={(e) => setFormData({...formData, ansSites: e.target.value})} placeholder="Analise os gargalos de autoridade e técnicos..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Automação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> Módulo 06: Chat IA &amp; Automação</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O ATENDENTE INCANSÁVEL.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-violet-400 uppercase">GARGALO: ATENDIMENTO LENTO</p>
                      <p className="text-[11px] text-white/50">Lead quente esfria em 5 minutos. Se você demora 1 hora para responder, o cliente já comprou de outro.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-violet-400 uppercase">CUSTO DE OPORTUNIDADE</p>
                      <p className="text-[11px] text-white/50">Quanto dinheiro a empresa perde por não atender leads no final de semana ou feriado?</p>
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
                <div className="p-8 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-blue-400 font-black uppercase text-[10px]"><Users size={16} /> Módulo 07: Gestão de Autoridade</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">PROVA DE COMPETÊNCIA.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-blue-400 uppercase">CURADORIA DE VALOR</p>
                      <p className="text-[11px] text-white/50">Não postamos por postar. Cada post ensina o seu cliente a desejar seu serviço mais caro.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-blue-400 uppercase">MÉTRICAS DE VAIDADE</p>
                      <p className="text-[11px] text-white/50">Jargão: Curtidas e seguidores que não pagam contas. Focamos em alcance para DECISORES.</p>
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
                    <p className="text-sm font-bold">Imobiliária recebe 300 leads por dia no WhatsApp. A secretária só consegue responder 50. Eles reclamam que leads "desistem rápido".</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">Como você explica o conceito de "Custo de Oportunidade" para esse dono da imobiliária?</p>
                </div>
                <Textarea value={formData.ansChat} onChange={(e) => setFormData({...formData, ansChat: e.target.value})} placeholder="Seu argumento de lucro..." className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold" />
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Estratégias por Nicho <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {step === 14 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px]"><Briefcase size={16} /> Módulo 08: Especialização (Parte 1)</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">FALE A LÍNGUA DO CLIENTE.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[9px]"><StethoscopeIcon size={14}/> SAÚDE</div>
                      <p className="text-[11px] text-white/50">Gargalo: Agenda vazia por falta de confiança. Argumento: Autoridade Visual + GMN impecável.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Scale size={14}/> DIREITO</div>
                      <p className="text-[11px] text-white/50">Gargalo: Proibição de propaganda direta. Argumento: Educação de Valor e Semiótica Profissional.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[9px]"><Home size={14}/> IMOBILIÁRIO</div>
                      <p className="text-[11px] text-white/50">Gargalo: Ciclo de venda longo. Argumento: IA para qualificação e Landing Pages rápidas para plantas.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><ShoppingBag size={14}/> VAREJO LOCAL</div>
                      <p className="text-[11px] text-white/50">Gargalo: Inexistente no mapa. Argumento: Domínio Total de buscas no bairro via Google Maps.</p>
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
                  <div className="flex items-center gap-3 text-rose-400 font-black uppercase text-[10px]"><Sparkles size={16} /> Módulo 09: Especialização (Parte 2)</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">DO ESTILO AO SABOR.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><Sparkles size={14}/> BELEZA &amp; ESTÉTICA</div>
                      <p className="text-[11px] text-white/50">Gargalo: Guerra de preços. Argumento: Design de Luxo para atrair quem paga pelo resultado, não pela promoção.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Dog size={14}/> PET SHOPS &amp; VET</div>
                      <p className="text-[11px] text-white/50">Gargalo: Insegurança dos donos. Argumento: Social Media que gera confiança e GMN com avaliações de impacto.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-orange-400 font-black uppercase text-[9px]"><Utensils size={14}/> RESTAURANTES &amp; DELIVERY</div>
                      <p className="text-[11px] text-white/50">Gargalo: Taxas do iFood. Argumento: Site próprio de pedidos e Ads Geográfico para fidelizar vizinhos.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px]"><Music size={14}/> LOUNGES &amp; SHOWS</div>
                      <p className="text-[11px] text-white/50">Gargalo: Atendimento de reservas. Argumento: IA para automação de listas e Narrativa Visual para gerar desejo.</p>
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
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">COMO INTERROMPER COM AUTORIDADE.</h3>
                  <p className="text-lg text-white/60 leading-relaxed">No Outbound Ativo, o cliente não te espera. Você deve ser um "cirurgião": entrar no assunto, mostrar o vazamento de dinheiro e sair com a reunião marcada.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-cyan-400 uppercase">O SEGREDO: O OURO NO INÍCIO</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">"Olá [Nome], vi que seu link da Bio está quebrado e você está perdendo leads do Instagram. Tenho o rascunho da solução. Podemos falar?"</p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <p className="text-[10px] font-black text-red-400 uppercase">EVITE O TELEMARKETING</p>
                      <p className="text-sm text-white/70 italic leading-relaxed">Não pergunte "tudo bem?". Não peça "um minutinho". Vá direto ao problema que você encontrou para ele.</p>
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
                    <p className="text-sm font-bold">"Lounge 77". Você viu que o link do WhatsApp na Bio deles não funciona. O dono está ocupado. Ligue e marque a reunião.</p>
                  </div>
                  <p className="text-xs font-bold text-black/40 uppercase italic">Grave seu áudio de 30-45 segundos aplicando o Método Cirurgião.</p>
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
                <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-green-400 font-black uppercase text-[10px]"><CircleDollarSign size={16} /> Módulo 11: Planos &amp; Ecossistema</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">VENDA A SOLUÇÃO, NÃO A TABELA.</h3>
                  <p className="text-lg text-white/60 leading-relaxed">Nós buscamos o ecossistema ideal para tampar todos os vazamentos de lucro do cliente. Aqui estão as faixas de investimento:</p>
                  <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div><p className="text-[10px] font-black text-green-400 uppercase mb-1">SOLUÇÃO PONTUAL</p><p className="text-[11px] text-white/50">Ex: Só Ads ou Só Site. R$ 2.5k - 5k/mês.</p></div>
                    </div>
                    <div className="p-6 rounded-3xl bg-primary/20 border border-primary/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
                      <div className="absolute top-0 right-0 p-2"><Badge className="bg-primary text-white text-[7px] uppercase">MAIS RECOMENDADO</Badge></div>
                      <div><p className="text-[10px] font-black text-primary uppercase mb-1">ECOSSISTEMA BASE</p><p className="text-[11px] text-white/50">Ads + Landing Page + GMN. R$ 6k - 10k/mês.</p></div>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div><p className="text-[10px] font-black text-white/60 uppercase mb-1">AUTORIDADE TOTAL</p><p className="text-[11px] text-white/50">Tudo acima + IA + Social + Dossiês. R$ 15k+/mês.</p></div>
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
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Video size={16} /> Módulo 12: Postura &amp; Etiqueta</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O CLIENTE COMPRA VOCÊ.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <p className="text-[9px] font-black uppercase text-primary">VÍDEO CHAMADA</p>
                      <p className="text-[10px] text-slate-500">Luz frontal, fundo limpo e olho na câmera. Você é o espelho da agência.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <p className="text-[9px] font-black uppercase text-primary">ÁUDIOS WHATSAPP</p>
                      <p className="text-[10px] text-slate-500">Máximo 1 minuto. Fale da dor e termine sempre com uma pergunta de ação.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <p className="text-[9px] font-black uppercase text-primary">REUNIÃO</p>
                      <p className="text-[10px] text-slate-500">Ouça 80% e fale 20%. Deixe o cliente confessar o gargalo dele.</p>
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
                  <p className="text-sm text-black/60 leading-relaxed">Grave um pitch de 2 min para um empresário do nicho à sua escolha. Venda o ECOSSISTEMA BASE focando em um gargalo real. Seja o Cirurgião.</p>
                </div>
                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button onClick={() => isRecording ? stopAllRecording('final') : startRecording('final')} className={cn("h-32 w-32 rounded-full flex items-center justify-center transition-all shadow-2xl border-4", isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105")}>
                    {isRecording ? <MicOff size={40} /> : <Mic size={40} />}
                  </button>
                  <p className="text-sm font-black uppercase tracking-widest text-white">{isRecording ? "GRAVANDO PITCH..." : audioFinalBase64 ? "PITCH PRONTO" : "Pressione para Gravar"}</p>
                  {audioFinalPreviewUrl && !isRecording && <audio controls src={audioFinalPreviewUrl} className="w-full max-w-md h-12 rounded-full bg-white/5" />}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleSubmit} disabled={isLoading || !audioFinalBase64 || isRecording} className="h-24 flex-1 bg-primary rounded-full font-black uppercase text-[12px] shadow-2xl">
                    {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Enviar Dossiê de Recrutamento"} <Zap size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 21 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse"><Trophy size={40} className="text-white" /></div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Formação Protocolada.</h2>
                  <p className="text-xl text-white/50 font-medium">Seus dados e áudios foram salvos com sucesso. Analisaremos seu perfil estrategicamente.</p>
                </div>
                <div className="pt-8"><Button onClick={() => window.location.href = '/'} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px]">Voltar para o Início</Button></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
