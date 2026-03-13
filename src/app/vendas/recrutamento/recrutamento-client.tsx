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
  Briefcase
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
      setStep(20); // Step de Sucesso
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">Academia de Consultoria Sapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Jornada de <span className="text-primary italic lowercase">conhecimento.</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
            {Array.from({ length: 17 }).map((_, i) => (
              <div key={i} className={cn("h-1 min-w-[20px] flex-1 rounded-full transition-all duration-500", step >= (i + 1) ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {/* ETAPA 1: IDENTIFICAÇÃO */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação Profissional</h2>
                    <p className="text-white/40 text-sm">Seus dados estão protegidos por criptografia de ponta a ponta.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="E-mail" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold md:col-span-2" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Segurança de Dados & LGPD
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed uppercase font-bold">
                    Ao prosseguir, você concorda que registraremos suas respostas e áudios para fins exclusivos de avaliação comercial. Seus dados são armazenados no Firebase (Google Cloud) com proteção de nível bancário.
                  </p>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">Autorizo o processamento seguro e ético dos meus dados.</label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Treinamento <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {/* ETAPA 2: MENTALIDADE DE VALOR */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> Módulo 01: Mentalidade &gt; Técnica</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Venda o Inatingível.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Na studiosapient, não vendemos sites. Vendemos <strong>Segurança</strong>. Não vendemos anúncios. Vendemos <strong>Lucro Previsível</strong>.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-indigo-300 uppercase">DICA DE AUTORIDADE:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">"O cliente só pede desconto quando ele sente que você é um custo. Quando ele sente que você é o antídoto para a dor dele, ele pergunta quando começamos."</p>
                      </div>
                      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 space-y-4">
                        <p className="text-[10px] font-black text-red-400 uppercase">O QUE NÃO FUNCIONA:</p>
                        <p className="text-sm text-white/70 italic leading-relaxed">Mandar orçamento por PDF sem falar. O PDF não tem voz, não tem brilho no olho e não responde dúvidas. O PDF é onde as vendas morrem.</p>
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

            {/* ETAPA 3: DIAGNÓSTICO DE GARGALOS */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Search size={16} /> Módulo 02: O Caçador de Gargalos</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Onde o Dinheiro Está Vazando?</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Um gargalo é um problema técnico que causa um prejuízo financeiro real. Você deve ensinar o cliente a ver esse vazamento.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Site Lento</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed"><strong>Linguagem Técnica:</strong> LCP alto e tempo de carregamento de 8s.<br/><br/><strong>Tradução Leiga:</strong> É como ter uma loja linda, mas a porta de entrada está emperrada. O cliente força, não consegue abrir e vai para o vizinho.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-black text-amber-400 text-xs mb-3 uppercase">Gargalo: Google Ads Genérico</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed"><strong>Linguagem Técnica:</strong> Falta de palavras-chave negativas e segmentação ampla.<br/><br/><strong>Tradução Leiga:</strong> Você está pagando panfleto para ser entregue na cidade inteira, quando só quem mora na sua rua pode comprar de você.</p>
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

            {/* ETAPA 4: PERFORMANCE ADS & GMN (CURSO) */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> Módulo 03: Performance Ads &amp; GMN</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Domínio de Busca.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      O Google é a "Busca de Urgência". O Instagram é a "Busca de Desejo".
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[8px]"><MapPin size={12}/> Google Meu Negócio (GMN)</div>
                        <p className="text-[11px] text-white/50 leading-relaxed">Não é apenas um mapa. É o seu cartão de visitas local. Se não tem fotos profissionais e avaliações semanais, o cliente sente que a empresa está abandonada.</p>
                      </div>
                      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-red-400 font-black uppercase text-[8px]"><Search size={12}/> Filtro de Intenção</div>
                        <p className="text-[11px] text-white/50 leading-relaxed"><strong>Conceito:</strong> Usar palavras negativas e segmentação cirúrgica para barrar quem só quer curiosidade ('quanto custa') e atrair quem quer comprar agora. O segredo é o que você <strong>proíbe</strong>.</p>
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

            {/* ETAPA 5: DESAFIO ADS (TEXTO) */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> DESAFIO 01: ADS</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-primary mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Dr. Ricardo gastou R$ 5.000 em Ads e só recebeu curiosos perguntando 'quanto custa o clareamento'. Ele acha que o Google não funciona.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-primary" />
                    Como você explicaria para ele que o problema não é o Google, mas sim a falta de "Filtro de Intenção"? Use a linguagem leiga.
                  </p>
                </div>

                <Textarea 
                  value={formData.ansAds} 
                  onChange={(e) => setFormData({...formData, ansAds: e.target.value})}
                  placeholder="Sua resposta estratégica..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Áudio <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 6: DESAFIO ADS (ÁUDIO) */}
            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Mic size={16} /> DESAFIO DE ORATÓRIA</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Voz de Autoridade</h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Grave um áudio de 45 segundos para o Dr. Ricardo no WhatsApp. <strong>Dica:</strong> Fale com calma, use pausas e mostre que você entende o vazamento financeiro dele.
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

            {/* ETAPA 7: SITES PREMIUM (CURSO) */}
            {step === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> Módulo 04: Vitrine de Alta Conversão</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A Engenharia da Venda.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Um site não serve para ser "bonito". Serve para ser rápido e guiar o cliente até o clique final.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">GARGALO: VELOCIDADE (LCP)</p>
                        <p className="text-[11px] text-white/50"><strong>Tradução:</strong> LCP é o tempo que o conteúdo principal leva para aparecer. Se o site demora mais que 3 segundos, o cliente desiste. No mobile, cada segundo de atraso é 20% a menos de conversão.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">GARGALO: MOBILE FIRST</p>
                        <p className="text-[11px] text-white/50">90% dos cliques vêm do celular. Sites que não abrem perfeitamente no smartphone são cemitérios de leads.</p>
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

            {/* ETAPA 8: DESIGN & SEMIÓTICA (CURSO) */}
            {step === 8 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-pink-500/10 border border-pink-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-pink-400 font-black uppercase text-[10px]"><Palette size={16} /> Módulo 05: Psicologia de Valor</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Semiótica: O que o Cérebro Lê.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Design estratégico é sobre como o cliente sente sua marca antes de ler uma única palavra.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-pink-400 uppercase">GARGALO: IMAGEM AMADORA</p>
                        <p className="text-[11px] text-white/50">Logos feitos no Canva ou cores sem harmonia comunicam 'baixo custo'. Para cobrar caro, você precisa parecer caro.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-pink-400 uppercase">SEMIÓTICA DE LUXO</p>
                        <p className="text-[11px] text-white/50"><strong>Tradução:</strong> A ciência de como cores, fontes e formas falam com o subconsciente. Usamos isso para remover a barreira de confiança instantaneamente.</p>
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

            {/* ETAPA 9: DESAFIO SITES/DESIGN (TEXTO) */}
            {step === 9 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> DESAFIO 02: SITES &amp; IMAGEM</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Dra. Helena é advogada criminalista. O site dela é rosa, com fotos genéricas e demora 12 segundos para abrir. Ela quer fechar honorários de R$ 30k.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-cyan-400" />
                    Qual é o principal erro na "Semiótica de Valor" da Dra. Helena? Como você explicaria que o site atual está 'expulsando' os clientes de alto ticket?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansSites} 
                  onChange={(e) => setFormData({...formData, ansSites: e.target.value})}
                  placeholder="Explique a falha estratégica..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: IA &amp; Automação <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 10: AUTOMAÇÃO & CHAT IA (CURSO) */}
            {step === 10 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> Módulo 06: O Vendedor que Nunca Dorme</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Inteligência que Qualifica.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      O Chat IA não é para "atender". É para <strong>filtrar curiosos</strong> e preparar o lead para o fechamento.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-violet-400 uppercase">GARGALO: ATENDIMENTO HUMANO LENTO</p>
                        <p className="text-[11px] text-white/50">Se o lead quente espera 30 minutos para ser respondido no WhatsApp, ele já fechou com o concorrente que foi mais rápido.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-violet-400 uppercase">CUSTO DE OPORTUNIDADE</p>
                        <p className="text-[11px] text-white/50"><strong>Conceito:</strong> O dinheiro que você deixa de ganhar por não estar disponível. Uma secretária sobrecarregada perde 60% das oportunidades.</p>
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

            {/* ETAPA 11: GESTÃO SOCIAL (CURSO) */}
            {step === 11 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-blue-400 font-black uppercase text-[10px]"><Users size={16} /> Módulo 07: Autoridade vs Seguidores</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Redes como Prova de Valor.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Seguidor não paga boleto. O que paga é a percepção de que você é a maior autoridade do seu mercado.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-blue-400 uppercase">CONTEÚDO QUE EDUCA</p>
                        <p className="text-[11px] text-white/50">Não fazemos 'post de bom dia'. Criamos dossiês que ensinam o cliente a desejar sua solução e respeitar seu preço.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <p className="text-[10px] font-black text-blue-400 uppercase">CURADORIA DE NICHO</p>
                        <p className="text-[11px] text-white/50"><strong>Tradução:</strong> Focar em atrair o decisor, não a massa. É melhor ter 100 seguidores que podem pagar R$ 50k do que 100 mil que pedem desconto.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-blue-500 text-white rounded-full font-black uppercase text-[10px]">Testar Visão de Escala <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 12: DESAFIO CHAT/SOCIAL (TEXTO) */}
            {step === 12 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> DESAFIO 03: ESCALA INTELIGENTE</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-violet-400 mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Imobiliária 'Viver Bem' recebe 200 leads por dia. A secretária só consegue responder 40. O dono reclama que 'anúncio não dá certo' porque ninguém fecha.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-violet-400" />
                    Como você venderia a implantação de uma IA para esse dono? Foque no <strong>Custo de Oportunidade Perdida</strong> (os 160 leads que ele ignora todo dia).
                  </p>
                </div>

                <Textarea 
                  value={formData.ansChat} 
                  onChange={(e) => setFormData({...formData, ansChat: e.target.value})}
                  placeholder="Escreva seu argumento de venda..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">O Ecossistema Sapient <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 13: O ECOSSISTEMA SAPIENT (CURSO) */}
            {step === 13 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Layers size={16} /> Módulo 08: Por que o Ecossistema?</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">A Sinergia do ROI.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Um serviço isolado resolve uma dor. O ecossistema completo cria uma <strong>Barreira de Mercado</strong>.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">SITES + ADS</p>
                        <p className="text-[10px] text-white/50">Não adianta atrair mil pessoas (Ads) se a porta da loja está trancada (Site Lento).</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">SITE + IA</p>
                        <p className="text-[10px] text-white/50">O site atrai, a IA converte e qualifica o lead enquanto você dorme.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">SOCIAL + TUDO</p>
                        <p className="text-[10px] text-white/50">O Social cria a autoridade necessária para que o cliente não peça desconto no Ads.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary text-white rounded-full font-black uppercase text-[10px]">Curso: Engenharia de Preços <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 14: ENGENHARIA DE PREÇOS & PACOTES (CURSO) */}
            {step === 14 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-green-400 font-black uppercase text-[10px]"><CircleDollarSign size={16} /> Módulo 09: Precificação Estratégica</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Planos Baseados em Gargalos.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Não temos uma tabela de preços fixa. Temos um <strong>Plano de Ajuste de ROI</strong>.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-6 rounded-3xl bg-black/40 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="text-[10px] font-black text-green-400 uppercase mb-1">SERVIÇO ISOLADO (SOLUÇÃO PONTUAL)</p>
                          <p className="text-[11px] text-white/50">Ex: Só Gestão de Ads ou Só Criação de Site.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-white/30 uppercase">ESTIMATIVA</p>
                          <p className="text-xl font-black">R$ 2.5k - 5k/mês</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-primary/20 border border-primary/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2"><Badge className="bg-primary text-white text-[7px] uppercase">MAIS VENDIDO</Badge></div>
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase mb-1">ECOSSISTEMA BASE (SINERGIA DE VENDAS)</p>
                          <p className="text-[11px] text-white/50">Ads + Landing Page de Alta Conversão + GMN Profissional.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-white/30 uppercase">ESTIMATIVA</p>
                          <p className="text-xl font-black">R$ 6k - 10k/mês</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="text-[10px] font-black text-white/60 uppercase mb-1">ECOSSISTEMA COMPLETO (AUTORIDADE TOTAL)</p>
                          <p className="text-[11px] text-white/50">Tudo acima + Gestão Social + IA de Atendimento + Dossiês Visuais.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-white/30 uppercase">ESTIMATIVA</p>
                          <p className="text-xl font-black">R$ 15k+ /mês</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-green-500 text-white rounded-full font-black uppercase text-[10px]">Próximo: Etiqueta Comercial <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 15: ETIQUETA COMERCIAL (CURSO) */}
            {step === 15 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-8">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Video size={16} /> Módulo 10: A Hora do Sim</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Postura de Consultoria Premium.</h3>
                    <p className="text-lg text-black/60 leading-relaxed">
                      O cliente compra você antes de comprar o projeto. Sua postura define o valor do seu tempo.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">VÍDEO CHAMADA</p>
                        <p className="text-[10px] text-slate-500">Fundo neutro, luz frontal e contato visual. Não venda de pijama.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">ÁUDIO WHATSAPP</p>
                        <p className="text-[10px] text-slate-500">Nunca exceda 1:30 min. Seja objetivo, fale da dor e termine com uma pergunta.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-[9px] font-black uppercase text-primary">ACEITE A OBJEÇÃO</p>
                        <p className="text-[10px] text-slate-500">Se o cliente diz 'tá caro', ele não viu valor. Nunca brigue por preço, reforce o ROI.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Iniciar Desafio Final <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 16: PITCH FINAL (ÁUDIO) */}
            {step === 16 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Trophy size={16} /> O DESAFIO SUPREMO</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Apresentação do Ecossistema</h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Grave um pitch de 2 minutos para um empresário que fatura R$ 100k mas o digital dele é inexistente. Venda a ideia do <strong>Ecossistema (Ads + Site + IA)</strong> como o único caminho para a escala real.
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
                      {isRecording ? "GRAVANDO PITCH FINAL..." : audio2Base64 ? "PITCH PRONTO" : "Pressione para Gravar"}
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
                    {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Enviar Dossiê de Recrutamento"} <Zap size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* ETAPA 17: SUCESSO */}
            {step === 20 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse">
                  <Trophy size={40} className="text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Dossiê Protocolado.</h2>
                  <p className="text-xl text-white/50 font-medium">Sua jornada estratégica foi concluída com sucesso.</p>
                </div>
                <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 max-w-2xl mx-auto">
                  <p className="text-white/40 leading-relaxed italic">
                    "Obrigado por completar o treinamento. Seus dados e áudios foram enviados diretamente para nossa diretoria. Analisaremos sua oratória, visão de negócio e capacidade de tradução técnica. Aguarde nosso contato via WhatsApp."
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
