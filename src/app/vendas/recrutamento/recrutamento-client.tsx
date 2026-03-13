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
  CheckCircle2, 
  Zap, 
  Loader2, 
  ChevronRight,
  ChevronLeft,
  Trophy,
  Volume2,
  ShieldCheck,
  Target,
  TrendingUp,
  Layout,
  Palette,
  FileText,
  Bot,
  Users,
  BrainCircuit,
  Info,
  BookOpen,
  ArrowRight,
  Search,
  Activity,
  AlertCircle
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
    ansNarrativa: ""
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

  const stopAllRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecording = async () => {
    setAudioBase64(null);
    setAudioPreviewUrl(null);
    
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
        setAudioPreviewUrl(URL.createObjectURL(audioBlob));

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioBase64(reader.result as string);
          setIsProcessingAudio(false);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({ title: "MICROFONE ATIVO", description: "Gravando pitch comercial.", className: "bg-primary text-white font-black uppercase text-[9px]" });
    } catch (err) {
      toast({ title: "ERRO DE HARDWARE", description: "Microfone não encontrado ou bloqueado.", variant: "destructive" });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.name.trim() || !formData.email.trim() || !consentAccepted)) {
      toast({ title: "Dados Incompletos", description: "Preencha sua identificação e aceite os termos de segurança.", variant: "destructive" });
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
    if (!audioBase64) {
      toast({ title: "Falta o Áudio", description: "Grave seu pitch final para concluir.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    try {
      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
          pitchAudioUri: audioBase64,
          timestamp: serverTimestamp(),
          status: 'PENDENTE_AVALIACAO_HUMANA'
        });
      }
      setStep(10);
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase">Funil de Atração Studiosapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Dossiê <span className="text-primary italic lowercase">candidato.</span></h1>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
              <div key={s} className={cn("h-1 flex-1 rounded-full transition-all duration-500", step >= s ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {/* ETAPA 1: IDENTIFICAÇÃO E SEGURANÇA */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação Profissional</h2>
                    <p className="text-white/40 text-sm">Na Sapient, a segurança dos dados é nossa prioridade técnica.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Seu E-mail Corporativo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp (com DDD)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold md:col-span-2" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Transparência & LGPD
                  </div>
                  <div className="space-y-4">
                    <p className="text-[11px] text-white/50 leading-relaxed uppercase font-bold">
                      Seus dados são criptografados e armazenados em servidores seguros do Google Firebase. A coleta de áudio e texto tem finalidade exclusiva de avaliação comercial interna e não é compartilhada com terceiros.
                    </p>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                      <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                      <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">
                        Autorizo o processamento dos meus dados para este processo seletivo.
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Treinamento <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {/* ETAPA 2: TREINAMENTO E BRIEFING INICIAL */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> COMO VENDEMOS: VALOR &gt; PREÇO</div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black uppercase tracking-tighter">Nossa Mentalidade</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Não somos "vendedores de marketing". Somos <strong>Estrategistas de ROI</strong>. O cliente não quer um site; ele quer a autoridade que o site traz. Ele não quer anúncios; ele quer o lucro que os anúncios geram.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Dica 01: Identifique o Gargalo (O que trava o lucro?)",
                          "Dica 02: Use Linguagem de Negócio (ROI, LTV, CAC)",
                          "Dica 03: Posicione-se como um Consultor Técnico"
                        ].map((tip, i) => (
                          <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-indigo-300 uppercase">
                            <CheckCircle2 size={14} /> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4 bg-black/20 p-6 rounded-3xl border border-white/5">
                      <h4 className="text-xs font-black uppercase text-indigo-400">O que é um 'Gargalo'?</h4>
                      <p className="text-[11px] text-white/40 italic leading-relaxed">
                        É o ponto específico onde o dinheiro do cliente está "vazando". Pode ser um site que demora a carregar, um GMN sem fotos, ou um atendimento que demora 2 horas para responder no WhatsApp. Sua missão é achar o vazamento e oferecer o tampão.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Entendido, Iniciar Testes <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 3: PERFORMANCE ADS (GOOGLE & GMN) */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> PILAR 01: PERFORMANCE ADS</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-white/40">Ecossistema de Busca Local</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        O Google Ads captura a <strong>Intenção de Urgência</strong>. O GMN (Google Meu Negócio) é a porta de entrada. Se o GMN está desatualizado ou os anúncios não têm "negativação estratégica", o cliente joga dinheiro no lixo atraindo curiosos.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black uppercase text-primary">BRIEFING DO CLIENTE:</p>
                      <p className="text-[11px] font-bold text-white/80">Dr. Ricardo, dono de uma clínica odontológica. Ele investe R$ 2.000/mês em Google Ads sozinho, mas diz que "só recebe mensagem de gente perguntando preço ou querendo serviço que ele não faz".</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <AlertCircle size={14} className="text-primary" /> 
                    GARGALO: Desperdício de verba por falta de segmentação e GMN amador. Como você convenceria ele a deixar a Sapient gerenciar essa verba?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansAds} 
                  onChange={(e) => setFormData({...formData, ansAds: e.target.value})}
                  placeholder="Explique o erro técnico dele e sua solução..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 4: SITES PREMIUM (VELOCIDADE & CONVERSÃO) */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> PILAR 02: SITES PROFISSIONAIS</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-white/40">Engenharia Web</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Um site lento é um ralo de dinheiro. Falamos de <strong>Core Web Vitals</strong>. Se o site demora +3 segundos, 50% dos cliques do Ads desistem. Sites Sapient são mobile-first e focados em "Barreiras de Confiança".
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black uppercase text-cyan-400">BRIEFING DO CLIENTE:</p>
                      <p className="text-[11px] font-bold text-white/80">Loja 'Casa & Conforto'. O site é de 2018, feito em template pronto, demora 8 segundos para abrir no 4G e o botão do WhatsApp fica escondido.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <AlertCircle size={14} className="text-cyan-400" /> 
                    GARGALO: Taxa de rejeição altíssima. Como você prova que o site "barato" dele está custando caro no final do mês?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansSites} 
                  onChange={(e) => setFormData({...formData, ansSites: e.target.value})}
                  placeholder="Sua análise sobre performance e lucro..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 5: DESIGN ESTRATÉGICO (PERCEPÇÃO DE VALOR) */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-orange-400 font-black uppercase text-[10px]"><Palette size={16} /> PILAR 03: DESIGN ESTRATÉGICO</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-white/40">Semiótica Comercial</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Design não é "enfeite". É sobre <strong>Posicionamento de Preço</strong>. Se a marca parece amadora, o cliente pede desconto. Se a marca comunica autoridade técnica e prestígio, o cliente aceita o orçamento sem questionar.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black uppercase text-orange-400">BRIEFING DO CLIENTE:</p>
                      <p className="text-[11px] font-bold text-white/80">Dra. Helena, Advogada de Família. Tem um logo que o sobrinho fez no Canva. Ela reclama que os clientes sempre acham seus honorários "puxados".</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <AlertCircle size={14} className="text-orange-400" /> 
                    GARGALO: Incoerência entre expertise e imagem visual. Como você explica que o design Canva dela está "baixando" o ticket dela?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansDesign} 
                  onChange={(e) => setFormData({...formData, ansDesign: e.target.value})}
                  placeholder="Sua defesa sobre autoridade visual..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-orange-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 6: CHAT IA & AUTOMAÇÃO (ESCALA DE ATENDIMENTO) */}
            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> PILAR 04: CHAT IA & AUTOMAÇÃO</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-white/40">Eficiência Operacional</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Agentes inteligentes Sapient não apenas respondem "olá". Eles <strong>Qualificam Leads</strong>. Eles filtram curiosos e entregam para o humano apenas quem tem potencial real de fechamento, eliminando a fadiga da equipe comercial.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black uppercase text-violet-400">BRIEFING DO CLIENTE:</p>
                      <p className="text-[11px] font-bold text-white/80">Imobiliária 'Luz do Sol'. Recebem 100 mensagens/dia no WhatsApp. A secretária demora 2 horas para responder e gasta 80% do tempo respondendo 'onde fica' e 'qual valor'.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <AlertCircle size={14} className="text-violet-400" /> 
                    GARGALO: Demora no atendimento e perda de produtividade. Como você prova que a IA é melhor que a demora humana?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansChat} 
                  onChange={(e) => setFormData({...formData, ansChat: e.target.value})}
                  placeholder="Sua visão sobre automação inteligente..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 7: GESTÃO DE REDES SOCIAIS (CURADORIA DE AUTORIDADE) */}
            {step === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-pink-500/10 border border-pink-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-pink-400 font-black uppercase text-[10px]"><Users size={16} /> PILAR 05: GESTÃO SOCIAL</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-white/40">Portfolio Vivo</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Não fazemos "posts". Fazemos <strong>Curadoria de Conteúdo</strong>. O Instagram deve educar o seguidor e transformá-lo em decisor. É o lugar de provar competência técnica todos os dias através de narrativas de autoridade.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black uppercase text-pink-400">BRIEFING DO CLIENTE:</p>
                      <p className="text-[11px] font-bold text-white/80">Empresa de Consultoria Empresarial. Postam apenas 'frases motivacionais' e fotos de reuniões. Têm 10k seguidores, mas nenhum vem das redes sociais.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <AlertCircle size={14} className="text-pink-400" /> 
                    GARGALO: Audiência irrelevante e falta de prova técnica. Como você diferencia nossa curadoria de uma 'agência de postagem comum'?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansSocial} 
                  onChange={(e) => setFormData({...formData, ansSocial: e.target.value})}
                  placeholder="Sua estratégia de narrativa social..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-pink-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 8: NARRATIVA VISUAL (DOSSIÊS DE VENDA) */}
            {step === 8 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-purple-500/10 border border-purple-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-purple-400 font-black uppercase text-[10px]"><FileText size={16} /> PILAR 06: NARRATIVA VISUAL</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-white/40">Fechamento de Alto Impacto</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Nossas propostas são <strong>Dossiês Técnicos</strong>. Transformamos serviços complexos em infográficos de fácil compreensão. O objetivo é encurtar o ciclo de decisão: o cliente vê o dossiê e entende na hora por que você é a melhor escolha.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                      <p className="text-[9px] font-black uppercase text-purple-400">BRIEFING DO CLIENTE:</p>
                      <p className="text-[11px] font-bold text-white/80">Empresa de Engenharia. Vendem projetos de R$ 50k enviando um PDF de orçamento branco e preto cheio de termos técnicos que o dono do prédio não entende.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <AlertCircle size={14} className="text-purple-400" /> 
                    GARGALO: Dificuldade de percepção de valor na hora de fechar. Como um Dossiê Visual ajudaria esse engenheiro a cobrar mais caro?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansNarrativa} 
                  onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})}
                  placeholder="Sua análise sobre clareza visual e venda..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-purple-500 text-white rounded-full font-black uppercase text-[10px]">Desafio Final: O Pitch <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 9: PITCH VOCAL FINAL */}
            {step === 9 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Target size={16} /> PITCH DE AUTORIDADE</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Venda o Ecossistema Sapient</h3>
                  <p className="text-sm md:text-base text-black/60 leading-relaxed">
                    Agora é com você. Grave um áudio de até 2 minutos simulando o fechamento de uma consultoria completa para um dos clientes dos briefings acima. Mostre sua entonação, sua clareza técnica e sua capacidade de gerar desejo de mudança.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button 
                    onClick={() => isRecording ? stopAllRecording() : startRecording()}
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
                      {isRecording ? "GRAVANDO PITCH COMERCIAL..." : audioBase64 ? "ÁUDIO PRONTO PARA ENVIO" : "Pressione para Gravar seu Pitch"}
                    </p>
                  </div>

                  {audioPreviewUrl && !isRecording && (
                    <div className="w-full max-w-md space-y-4 text-center animate-in zoom-in">
                      <div className="h-px w-full bg-white/10" />
                      <p className="text-[9px] font-black uppercase text-primary flex items-center justify-center gap-2"><Volume2 size={12}/> Ouça antes de confirmar o envio:</p>
                      <audio controls src={audioPreviewUrl} className="w-full h-12 rounded-full bg-white/5" />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading || !audioBase64 || isRecording} 
                    className="h-24 flex-1 bg-primary rounded-full font-black uppercase text-[12px] shadow-2xl"
                  >
                    {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Enviar Dossiê para Avaliação Humana"} <Zap size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* ETAPA 10: SUCESSO */}
            {step === 10 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse">
                  <Trophy size={40} className="text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Dossiê Protocolado.</h2>
                  <p className="text-xl text-white/50 font-medium">Sua jornada comercial foi registrada com sucesso.</p>
                </div>
                <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 max-w-2xl mx-auto">
                  <p className="text-white/40 leading-relaxed italic">
                    "Obrigado por completar o treinamento estratégico Sapient. Seus dados e seu pitch vocal foram salvos em nosso banco de talentos. Realizaremos uma avaliação humana detalhada e entraremos em contato via WhatsApp caso seu perfil seja compatível com nosso ecossistema profissional."
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
