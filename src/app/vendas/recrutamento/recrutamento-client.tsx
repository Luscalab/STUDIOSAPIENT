
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
  Star,
  BrainCircuit,
  Database
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
      toast({ title: "Dados Incompletos", description: "Preencha sua identificação e aceite os termos.", variant: "destructive" });
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
      setStep(9);
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

          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <div key={s} className={cn("h-1 flex-1 rounded-full", step >= s ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {/* ETAPA 1: IDENTIFICAÇÃO */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação de Elite</h2>
                    <p className="text-white/40 text-sm">Na Sapient, não vendemos serviços, vendemos clareza e autoridade. Identifique-se.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome Completo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Seu E-mail Corporativo" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                  <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp (com DDD)" className="bg-white/5 border-white/10 h-16 rounded-2xl font-bold" />
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={18} /> Protocolo de Privacidade LGPD
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">
                      Autorizo a studiosapient a coletar meus dados e áudio para fins de recrutamento comercial.
                    </label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Jornada Educativa <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {/* ETAPA 2: PERFORMANCE ADS */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> PILAR 01: PERFORMANCE ADS</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">O Domínio da Demanda Ativa</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Diferente de agências que focam em "branding" ou "likes", a Sapient foca em <strong>Intenção</strong>. O Google Ads é nossa ferramenta para capturar quem precisa do serviço <strong>agora</strong>. Eliminamos a dependência de indicações através de um funil previsível.
                  </p>
                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase">DESAFIO: Um empresário diz que "já tentou Google Ads e não deu certo". Como você explicaria que o erro não é da ferramenta, mas da falta de uma estratégia de urgência e negativação cirúrgica?</p>
                </div>

                <div className="space-y-4">
                  <Textarea 
                    value={formData.ansAds} 
                    onChange={(e) => setFormData({...formData, ansAds: e.target.value})}
                    placeholder="Sua abordagem estratégica aqui..." 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 3: SITES PREMIUM */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> PILAR 02: SITES PREMIUM</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Engenharia que Converte</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Um site Sapient não é um "template". É um software de conversão. Focamos em <strong>Velocidade Extrema (Core Web Vitals)</strong> e Mobile-First. Se o site demora mais de 3 segundos para carregar, o dinheiro investido no Ads está sendo jogado no lixo.
                  </p>
                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase">DESAFIO: Como você convenceria um cliente a investir R$ 10k em um site novo, provando que o site atual dele (lento e amador) está expulsando leads qualificados?</p>
                </div>

                <div className="space-y-4">
                  <Textarea 
                    value={formData.ansSites} 
                    onChange={(e) => setFormData({...formData, ansSites: e.target.value})}
                    placeholder="Sua argumentação técnica..." 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 4: DESIGN ESTRATÉGICO */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-orange-400 font-black uppercase text-[10px]"><Palette size={16} /> PILAR 03: DESIGN ESTRATÉGICO</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Semiótica do Valor</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Design na Sapient é sobre <strong>Percepção de Prestígio</strong>. Usamos a psicologia cromática e a hierarquia visual para remover barreiras de preço. Se a marca parece barata, o cliente pede desconto. Se a marca comunica autoridade, o preço é aceito sem questionamentos.
                  </p>
                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase">DESAFIO: Um profissional de alto padrão (médico ou advogado) usa um logo genérico. Como você explica que a imagem atual dele está "nivelando por baixo" seus honorários?</p>
                </div>

                <div className="space-y-4">
                  <Textarea 
                    value={formData.ansDesign} 
                    onChange={(e) => setFormData({...formData, ansDesign: e.target.value})}
                    placeholder="Sua análise de semiótica..." 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-orange-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 5: CHAT IA & AUTOMAÇÃO */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> PILAR 04: CHAT IA & AUTOMAÇÃO</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Atendimento 24/7 sem Fadiga</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Implementamos agentes inteligentes que não apenas respondem, mas <strong>qualificam e vendem</strong>. O Chat IA da Sapient filtra curiosos e entrega leads prontos para o consultor humano fechar, eliminando o gargalo de atendimento lento no WhatsApp.
                  </p>
                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase">DESAFIO: O cliente diz que "prefere o toque humano e tem medo da IA". Como você prova que a demora humana é pior que uma IA imediata, inteligente e resolutiva?</p>
                </div>

                <div className="space-y-4">
                  <Textarea 
                    value={formData.ansChat} 
                    onChange={(e) => setFormData({...formData, ansChat: e.target.value})}
                    placeholder="Sua defesa da automação..." 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 6: GESTÃO DE REDES SOCIAIS */}
            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-pink-500/10 border border-pink-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-pink-400 font-black uppercase text-[10px]"><Users size={16} /> PILAR 05: GESTÃO SOCIAL</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Prova de Valor Constante</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Não fazemos "posts". Fazemos <strong>Curadoria de Autoridade</strong>. O Instagram do cliente deve ser um portfólio que educa o mercado e o posiciona como a escolha óbvia. É onde a marca ganha vida e mantém o desejo de compra ativo após o primeiro clique.
                  </p>
                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase">DESAFIO: Como você diferencia uma "gestão de postagens comum" de uma "curadoria estratégica de autoridade Sapient" para um cliente cético?</p>
                </div>

                <div className="space-y-4">
                  <Textarea 
                    value={formData.ansSocial} 
                    onChange={(e) => setFormData({...formData, ansSocial: e.target.value})}
                    placeholder="Seu diferencial comercial..." 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-pink-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Pilar <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 7: NARRATIVA VISUAL E DOSSIÊS */}
            {step === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-purple-500/10 border border-purple-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-purple-400 font-black uppercase text-[10px]"><FileText size={16} /> PILAR 06: NARRATIVA VISUAL</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">O Impacto do Dossiê</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Propostas comerciais na Sapient são <strong>Dossiês de Venda</strong>. Transformamos processos complexos em narrativas visuais simples e impactantes que encurtam o ciclo de decisão e justificam o alto ticket. É a "pá de cal" no fechamento.
                  </p>
                  <div className="h-px bg-white/5 w-full" />
                  <p className="text-xs font-bold text-white/40 uppercase">DESAFIO: O cliente amou a reunião, mas precisa "passar para o sócio financeiro". Por que o nosso Dossiê Visual é a arma perfeita para esse momento?</p>
                </div>

                <div className="space-y-4">
                  <Textarea 
                    value={formData.ansNarrativa} 
                    onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})}
                    placeholder="Sua visão sobre narrativa de venda..." 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-purple-500 text-white rounded-full font-black uppercase text-[10px]">Desafio Final: O Pitch <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 8: PITCH VOCAL FINAL */}
            {step === 8 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Target size={16} /> PITCH DE AUTORIDADE</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Venda o Ecossistema Studiosapient</h3>
                  <p className="text-sm md:text-base text-black/60 leading-relaxed">
                    Grave um áudio de até 2 minutos simulando o fechamento de uma consultoria completa. Use todos os pilares que você acabou de aprender. Queremos ouvir sua voz, sua entonação e sua capacidade de gerar desejo.
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

            {/* ETAPA 9: SUCESSO */}
            {step === 9 && (
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
                    "Obrigado por completar o desafio Sapient. Suas respostas técnicas e seu pitch vocal foram salvos em nosso banco de talentos comercial. Nossa diretoria realizará uma avaliação humana detalhada e entraremos em contato via WhatsApp caso seu perfil seja de elite."
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
