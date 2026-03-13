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
  ShoppingBag
} from "lucide-react";
import { useFirebase, useFirestore, initiateAnonymousSignIn } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function RecrutamentoClient() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [audio2Base64, setAudio2Base64] = useState<string | null>(null);
  const [audio2PreviewUrl, setAudio2PreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ansAds: "",
    ansSites: "",
    ansDesign: "",
    ansChat: "",
    ansSocial: "",
    ansNarrativa: "",
    audioAdsBase64: "", 
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

  const stopAllRecording = (target: 'audio1' | 'audio2') => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecording = async (target: 'audio1' | 'audio2') => {
    if (target === 'audio1') {
      setAudioBase64(null);
      setAudioPreviewUrl(null);
    } else {
      setAudio2Base64(null);
      setAudio2PreviewUrl(null);
    }
    
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
          if (target === 'audio1') {
            setAudioBase64(reader.result as string);
            setAudioPreviewUrl(url);
            setFormData(prev => ({ ...prev, audioAdsBase64: reader.result as string }));
          } else {
            setAudio2Base64(reader.result as string);
            setAudio2PreviewUrl(url);
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
    if (step === 1 && (!formData.name.trim() || !formData.email.trim() || !consentAccepted)) {
      toast({ title: "Dados Incompletos", description: "Preencha sua identificação e aceite os termos de segurança.", variant: "destructive" });
      return;
    }
    if (step === 6 && !audioBase64) {
      toast({ title: "Áudio Obrigatório", description: "Grave sua resposta estratégica para o Dr. Ricardo.", variant: "destructive" });
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
    if (!audio2Base64) {
      toast({ title: "Falta o Áudio Final", description: "Grave seu pitch final para concluir o dossiê.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    try {
      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
          pitchAudioUri: audio2Base64,
          timestamp: serverTimestamp(),
          status: 'PENDENTE_AVALIACAO_HUMANA'
        });
      }
      setStep(20); 
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Academia Comercial Sapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Formação <span className="text-primary italic lowercase">estratégica.</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className={cn("h-1 min-w-[20px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {/* 1. IDENTIFICAÇÃO & SEGURANÇA */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação &amp; Segurança</h2>
                    <p className="text-white/40 text-sm">Seus dados e áudios são protegidos por criptografia de nível bancário.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="E-mail" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold md:col-span-2" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo LGPD
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed uppercase font-bold">
                    Registramos suas respostas e respostas vocais apenas para avaliação interna. O armazenamento é feito via Google Cloud (Firebase), garantindo que nada saia do nosso ambiente controlado.
                  </p>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">Aceito os termos de segurança e proteção de dados.</label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Treinamento <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {/* 2. MENTALIDADE DE VALOR */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> Módulo 01: Mentalidade Comercial</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Como Vendemos: VALOR &gt; PREÇO</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Aqui não somos "tiradores de pedido". Somos <strong>estrategistas</strong>. O cliente não quer um site, ele quer que o telefone toque.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-indigo-300 uppercase">DICA DE AUTORIDADE:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">"Sempre que o cliente foca no preço, é porque você ainda não mostrou o tamanho do prejuízo que o gargalo dele está causando."</p>
                      </div>
                      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">O QUE EVITAR:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Enviar orçamentos por PDF sem uma conversa prévia. O PDF aceita qualquer preço, mas não transmite sua expertise.</p>
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

            {/* 3. DIAGNÓSTICO DE GARGALOS */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Search size={16} /> Módulo 02: O Caçador de Gargalos</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Onde o Dinheiro Está Vazando?</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Um <strong>gargalo</strong> é qualquer ponto no processo do cliente que impede a venda. Você precisa ensinar o cliente a ver esse vazamento de forma simples.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Site Lento</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed"><strong>Termo Técnico:</strong> LCP alto (mais de 3s).<br/><br/><strong>Explicação Leiga:</strong> É como ter uma loja linda com a porta emperrada. O cliente tenta entrar, não consegue e vai no vizinho.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Ads Genérico</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed"><strong>Termo Técnico:</strong> Falta de palavras negativas.<br/><br/><strong>Explicação Leiga:</strong> Você está pagando para distribuir panfletos na cidade inteira, quando só quem mora no seu bairro pode comprar de você.</p>
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

            {/* 4. PERFORMANCE ADS & GMN (CURSO) */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> Módulo 03: Performance Ads &amp; GMN</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A Busca de Urgência.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      O Google é onde as pessoas buscam quando o problema já existe. O Instagram é onde criamos o desejo.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[8px]"><MapPin size={12}/> Glossário: Google Meu Negócio (GMN)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">É o mapa do Google. Um GMN sem fotos e sem avaliações passa a impressão de empresa fechada ou abandonada.</p>
                      </div>
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-red-400 font-black uppercase text-[8px]"><Search size={12}/> Glossário: Filtro de Intenção</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">É usar palavras negativas para impedir que curiosos (ex: "quanto custa", "grátis") cliquem no anúncio, salvando a verba para quem quer fechar.</p>
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

            {/* 5. DESAFIO ADS (TEXTO) */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> DESAFIO 01: ADS</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-primary mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Dr. Ricardo gastou R$ 5.000 no Google e diz que "só vem curioso querendo saber o preço do implante". Ele quer parar os anúncios.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-primary" />
                    Como você explica para ele o conceito de "Filtro de Intenção" sem usar palavras técnicas?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansAds} 
                  onChange={(e) => setFormData({...formData, ansAds: e.target.value})}
                  placeholder="Sua explicação leiga e estratégica..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Áudio <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 6. DESAFIO ADS (ÁUDIO) */}
            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Mic size={16} /> DESAFIO DE VOZ</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Reversão de Objeção</h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Mande um áudio de 45 segundos para o Dr. Ricardo explicando que o problema não é o Google, mas a falta de estratégia na filtragem dos leads.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button 
                    onClick={() => isRecording ? stopAllRecording('audio1') : startRecording('audio1')}
                    disabled={isLoading}
                    className={cn(
                      "h-24 w-24 rounded-full flex items-center justify-center transition-all shadow-2xl border-4",
                      isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105"
                    )}
                  >
                    {isRecording ? <MicOff size={30} /> : <Mic size={30} />}
                  </button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
                    {isRecording ? "GRAVANDO..." : audioBase64 ? "ÁUDIO GRAVADO" : "Clique para Gravar"}
                  </p>
                  {audioPreviewUrl && !isRecording && (
                    <audio controls src={audioPreviewUrl} className="h-10 opacity-50" />
                  )}
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} disabled={!audioBase64 || isRecording} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Dominado. Próximo Curso <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 7. SITES PREMIUM (CURSO) */}
            {step === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> Módulo 04: Vitrine Digital</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A Primeira Impressão.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      No digital, seu site é seu cartão de visitas 24h. Se ele falha, a venda morre antes de começar.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">GARGALO: LCP (VELOCIDADE)</p>
                        <p className="text-[11px] text-white/50"><strong>Explicação:</strong> Tempo que o site leva para abrir no celular. Se passa de 3 segundos, o cliente desiste. Cada segundo de atraso reduz 20% da conversão.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">GARGALO: MOBILE FIRST</p>
                        <p className="text-[11px] text-white/50">90% das vendas começam pelo celular. Sites que não são perfeitos no smartphone são invisíveis para o mercado.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Design &amp; Semiótica <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 8. DESIGN & SEMIÓTICA (CURSO) */}
            {step === 8 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-pink-500/10 border border-pink-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-pink-400 font-black uppercase text-[10px]"><Palette size={16} /> Módulo 05: Psicologia de Valor</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O que o Olhar Compra.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Para cobrar o valor que você merece, você precisa parecer que vale isso.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-pink-400 uppercase">GLOSSÁRIO: SEMIÓTICA</p>
                        <p className="text-[11px] text-white/50">É o estudo dos símbolos. No design, usamos cores, fontes e formas para comunicar autoridade ou confiança sem precisar dizer nada.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-pink-400 uppercase">GARGALO: IMAGEM AMADORA</p>
                        <p className="text-[11px] text-white/50">Logos feitos no Canva ou cores infantis para serviços sérios comunicam "baixo custo" e atraem clientes que brigam por preço.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-pink-500 text-white rounded-full font-black uppercase text-[10px]">Testar Visão de Design <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 9. DESAFIO SITES/DESIGN (TEXTO) */}
            {step === 9 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> DESAFIO 02: SITES &amp; DESIGN</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Dra. Helena é advogada criminalista. O site dela é rosa claro, com fotos genéricas e leva 15 segundos para abrir. Ela quer cobrar R$ 30k de honorários.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-cyan-400" />
                    Quais são os 2 principais erros de "Semiótica de Valor" no caso da Dra. Helena?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansSites} 
                  onChange={(e) => setFormData({...formData, ansSites: e.target.value})}
                  placeholder="Analise as falhas visuais e técnicas..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: IA &amp; Automação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 10. AUTOMAÇÃO & CHAT IA (CURSO) */}
            {step === 10 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> Módulo 06: Chat IA &amp; Automação</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O Atendente Incansável.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Não é apenas um robô. É um <strong>qualificador de leads</strong> que nunca dorme e nunca esquece de responder.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-violet-400 uppercase">GARGALO: ATENDIMENTO LENTO</p>
                        <p className="text-[11px] text-white/50">Se um lead quente espera 30 minutos, ele já fechou com o concorrente. A IA reduz esse tempo para ZERO.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-violet-400 uppercase">CUSTO DE OPORTUNIDADE</p>
                        <p className="text-[11px] text-white/50">O lucro que a empresa perde por não estar disponível aos fins de semana ou horários de pico.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Gestão Social <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 11. GESTÃO SOCIAL (CURSO) */}
            {step === 11 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-blue-400 font-black uppercase text-[10px]"><Users size={16} /> Módulo 07: Redes Sociais de Autoridade</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Prova de Competência.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Seguidor não paga conta. <strong>Decisores</strong> sim. Focamos em atrair quem tem poder de compra.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-blue-400 uppercase">CURADORIA DE VALOR</p>
                        <p className="text-[11px] text-white/50">Postagens que ensinam o cliente a desejar seu serviço. Não fazemos posts genéricos de "bom dia".</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-blue-400 uppercase">GARGALO: MÉTRICAS DE VAIDADE</p>
                        <p className="text-[11px] text-white/50">Muitas curtidas de pessoas que nunca vão comprar. É melhor ter 100 seguidores decisores do que 100 mil curiosos.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-blue-500 text-white rounded-full font-black uppercase text-[10px]">Testar Visão de Social <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 12. DESAFIO CHAT/SOCIAL (TEXTO) */}
            {step === 12 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> DESAFIO 03: ESCALA &amp; ATENDIMENTO</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-violet-400 mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Imobiliária 'Viver Bem' recebe 300 leads por dia no WhatsApp. A secretária só responde 50. O dono diz que "Ads não funciona".</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-violet-400" />
                    Como você venderia a implantação de uma IA focando no <strong>Custo de Oportunidade Perdida</strong>?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansChat} 
                  onChange={(e) => setFormData({...formData, ansChat: e.target.value})}
                  placeholder="Seu argumento de venda..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Estratégias por Nicho <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 13. ESTRATÉGIAS POR NICHO (CURSO NOVO) */}
            {step === 13 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px]"><Briefcase size={16} /> Módulo 08: Especialização por Nicho</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Diferentes Nichos, Diferentes Dores.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Um médico tem problemas diferentes de um advogado. Aprenda a falar a língua deles.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[9px]"><Stethoscope size={14}/> NICHO SAÚDE</div>
                        <p className="text-[11px] text-white/50"><strong>Gargalo:</strong> Agenda vazia ou desmarques constantes. <strong>Argumento:</strong> Use a IA para confirmação de consultas e Ads para atrair pacientes de alta fidelidade.</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-amber-400 font-black uppercase text-[9px]"><Scale size={14}/> NICHO DIREITO</div>
                        <p className="text-[11px] text-white/50"><strong>Gargalo:</strong> Proibição de propaganda direta. <strong>Argumento:</strong> Foco em Autoridade Técnica e Conteúdo que educa o cliente, criando confiança inquestionável.</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[9px]"><Home size={14}/> IMOBILIÁRIO</div>
                        <p className="text-[11px] text-white/50"><strong>Gargalo:</strong> Ciclo de venda longo e site lento. <strong>Argumento:</strong> Sites de altíssima velocidade para carregar plantas e fotos sem travar, garantindo a permanência do lead.</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-pink-400 font-black uppercase text-[9px]"><ShoppingBag size={14}/> VAREJO / LOJAS</div>
                        <p className="text-[11px] text-white/50"><strong>Gargalo:</strong> Google Meu Negócio fantasma. <strong>Argumento:</strong> Domínio das buscas locais para atrair quem já está perto e quer comprar agora.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-emerald-500 text-white rounded-full font-black uppercase text-[10px]">Engenharia de Preços <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 14. ENGENHARIA DE PREÇOS & PACOTES (CURSO) */}
            {step === 14 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-green-400 font-black uppercase text-[10px]"><CircleDollarSign size={16} /> Módulo 09: Planos Personalizados</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Venda a Solução, não a Tabela.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Não temos preços fixos. Temos planos baseados no <strong>tamanho do gargalo</strong> do cliente.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-6 rounded-3xl bg-black/40 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="text-[10px] font-black text-green-400 uppercase mb-1">SOLUÇÃO PONTUAL</p>
                          <p className="text-[11px] text-white/50">Ex: Só Ads ou Só Site. Para clientes com orçamento apertado.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black">R$ 2.5k - 5k/mês</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-primary/20 border border-primary/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
                        <div className="absolute top-0 right-0 p-2"><Badge className="bg-primary text-white text-[7px] uppercase">MAIS INDICADO</Badge></div>
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase mb-1">ECOSSISTEMA BASE (SINERGIA)</p>
                          <p className="text-[11px] text-white/50">Ads + Landing Page + GMN Profissional. O mínimo para o ROI acontecer.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black">R$ 6k - 10k/mês</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="text-[10px] font-black text-white/60 uppercase mb-1">AUTORIDADE TOTAL (ECOSSISTEMA COMPLETO)</p>
                          <p className="text-[11px] text-white/50">Tudo acima + IA + Social Media + Dossiês Visuais.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black">R$ 15k+ /mês</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-green-500 text-white rounded-full font-black uppercase text-[10px]">Etiqueta Comercial <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 15. ETIQUETA COMERCIAL (CURSO) */}
            {step === 15 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Video size={16} /> Módulo 10: Postura &amp; Autoridade</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">O Cliente Compra Você.</h3>
                    <p className="text-lg text-black/60 leading-relaxed">
                      Sua postura define se o cliente vai pedir desconto ou vai assinar na hora.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">VÍDEO CHAMADA</p>
                        <p className="text-[10px] text-slate-500">Luz frontal, contato visual e fundo organizado. Você é o espelho da qualidade da agência.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">ÁUDIOS WHATSAPP</p>
                        <p className="text-[10px] text-slate-500">Nunca exceda 1 minuto. Seja cirúrgico, fale da dor e termine com uma pergunta de ação.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">NEGATIVAS REAIS</p>
                        <p className="text-[10px] text-slate-500">Se o cliente diz "tá caro", diga: "Caro comparado a qual resultado que você espera?"</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Pitch Final <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* 16. PITCH FINAL (ÁUDIO) */}
            {step === 16 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Trophy size={16} /> O DESAFIO SUPREMO</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Simulação de Fechamento</h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Grave um pitch de 2 minutos para um empresário de um nicho à sua escolha (Saúde, Direito ou Imóveis). Venda a ideia do <strong>Ecossistema Base</strong> focando na eliminação do gargalo dele.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button 
                    onClick={() => isRecording ? stopAllRecording('audio2') : startRecording('audio2')}
                    disabled={isLoading}
                    className={cn(
                      "h-32 w-32 rounded-full flex items-center justify-center transition-all shadow-2xl border-4",
                      isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105"
                    )}
                  >
                    {isRecording ? <MicOff size={40} /> : <Mic size={40} />}
                  </button>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-white">
                      {isRecording ? "GRAVANDO PITCH..." : audio2Base64 ? "PITCH PRONTO" : "Pressione para Gravar"}
                    </p>
                  </div>
                  {audio2PreviewUrl && !isRecording && (
                    <audio controls src={audio2PreviewUrl} className="w-full max-w-md h-12 rounded-full bg-white/5" />
                  )}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading || !audio2Base64 || isRecording} 
                    className="h-24 flex-1 bg-primary rounded-full font-black uppercase text-[12px] shadow-2xl"
                  >
                    {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Enviar Dossiê para Avaliação"} <Zap size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* 17. SUCESSO */}
            {step === 20 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse">
                  <Trophy size={40} className="text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Formação Concluída.</h2>
                  <p className="text-xl text-white/50 font-medium">Seu dossiê estratégico foi protocolado com sucesso.</p>
                </div>
                <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 max-w-2xl mx-auto">
                  <p className="text-white/40 leading-relaxed italic">
                    "Analisaremos sua capacidade de tradução técnica, oratória e visão de negócio. Fique atento ao seu WhatsApp, entraremos em contato para os próximos passos."
                  </p>
                </div>
                <div className="pt-8">
                  <Button onClick={() => window.location.href = '/'} className="h-16 px-12 border border-white/10 bg-transparent rounded-full font-black uppercase text-[10px]">Voltar para o Início</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
