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
  AlertCircle,
  MessageSquare,
  Ear
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
    audioAdsBase64: "", // Novo campo para áudio intermediário
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
      toast({ title: "Áudio Obrigatório", description: "Grave sua resposta para o Dr. Ricardo antes de prosseguir.", variant: "destructive" });
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
      toast({ title: "Falta o Áudio Final", description: "Grave seu pitch de ecossistema para concluir.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    try {
      if (db) {
        await addDoc(collection(db, 'sales_candidates'), {
          ...formData,
          pitchAudioUri: audio2Base64, // Áudio final
          timestamp: serverTimestamp(),
          status: 'PENDENTE_AVALIACAO_HUMANA'
        });
      }
      setStep(11);
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase">Academia de Vendas Studiosapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Jornada <span className="text-primary italic lowercase">estratégica.</span></h1>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
              <div key={s} className={cn("h-1 flex-1 rounded-full transition-all duration-500", step >= s ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
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
                    <ShieldCheck size={18} /> Segurança de Dados
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed uppercase font-bold">
                    Ao prosseguir, você concorda que gravaremos suas respostas e áudios para fins exclusivos de avaliação comercial. O Firebase garante que ninguém fora da Studiosapient acesse estas informações.
                  </p>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5">
                    <Checkbox id="consent" checked={consentAccepted} onCheckedChange={(c) => setConsentAccepted(c === true)} />
                    <label htmlFor="consent" className="text-[11px] text-white font-bold leading-tight cursor-pointer uppercase">Autorizo o processamento seguro dos meus dados.</label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Treinamento <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {/* ETAPA 2: TREINAMENTO 1 - MENTALIDADE */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px]"><BookOpen size={16} /> Módulo 01: Vender Valor &gt; Preço</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Esqueça o "Marketing Digital"</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Nós não vendemos "posts" ou "sites". Nós vendemos <strong>Escudo de Autoridade</strong> e <strong>Recuperação de Lucro</strong>. 
                    </p>
                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                      <p className="text-sm font-bold text-indigo-300 uppercase">DICA DE OURO:</p>
                      <p className="text-sm text-white/50 italic">"Se o cliente diz que está caro, ele não viu o prejuízo de continuar como ele está. Mostre o buraco no bolso dele, não o preço do seu serviço."</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Entendido, Próxima Aula <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 3: TREINAMENTO 2 - O GARGALO */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase text-[10px]"><Ear size={16} /> Módulo 02: Identificando o Gargalo</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Ouvir é fechar.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Um "Gargalo" é simplesmente onde o dinheiro está fugindo. Mas o cliente não sabe o nome técnico. Ele diz:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[10px] font-black text-amber-400 mb-2 uppercase">Ele diz:</p>
                        <p className="text-xs italic text-white/80">"Tem muita gente me chamando, mas ninguém fecha nada."</p>
                        <p className="text-[10px] font-black text-primary mt-4 uppercase">Gargalo Real:</p>
                        <p className="text-[10px] text-white/40">Falta de filtro no Google Ads ou site confuso que atrai curiosos.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[10px] font-black text-amber-400 mb-2 uppercase">Ele diz:</p>
                        <p className="text-xs italic text-white/80">"Sinto que minha marca parece pequena perto da concorrência."</p>
                        <p className="text-[10px] font-black text-primary mt-4 uppercase">Gargalo Real:</p>
                        <p className="text-[10px] text-white/40">Imagem visual amadora (Canva) que remove a percepção de preço alto.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-amber-500 text-white rounded-full font-black uppercase text-[10px]">Dominado. Próximo <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 4: TREINAMENTO 3 - TRADUÇÃO LEIGA */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-8">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><MessageSquare size={16} /> Módulo 03: Tradução Técnica</div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Fale como o Cliente.</h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      Não tente impressionar com termos difíceis. Explique o benefício prático.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-6 bg-black/20 rounded-2xl border border-white/5">
                        <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-black">1</div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-cyan-400 mb-1">Errado (Técnico):</p>
                          <p className="text-xs text-white/40 mb-3">"Precisamos otimizar seus Core Web Vitals para reduzir o LCP."</p>
                          <p className="text-[10px] font-black uppercase text-primary mb-1">Certo (Estúdio Sapient):</p>
                          <p className="text-sm font-bold text-white">"Seu site é como uma loja que demora 10 segundos para abrir a porta. O cliente desiste e vai para o vizinho."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Iniciar Desafios Reais <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 5: DESAFIO ADS - TEXTO */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> CASO REAL 01: ADS & GOOGLE</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-primary mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Dr. Ricardo, Dentista. Ele gasta R$ 1.500/mês no Google mas só recebe gente querendo "limpeza gratuita" ou convênios que ele não atende.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-primary" />
                    Qual é o "gargalo" técnico dele e como você explicaria de forma simples que o Google dele está atraindo a pessoa errada?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansAds} 
                  onChange={(e) => setFormData({...formData, ansAds: e.target.value})}
                  placeholder="Sua resposta estratégica por escrito..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próxima Fase (Áudio) <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 6: DESAFIO ADS - ÁUDIO */}
            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Mic size={16} /> RESPOSTA VOCAL</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Simulação: Áudio para o Dr. Ricardo</h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Agora, grave um áudio de até 60 segundos como se estivesse enviando para ele no WhatsApp. Use a <strong>Tradução Leiga</strong> que aprendemos. Mostre autoridade mas com simplicidade.
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
                  <Button onClick={handleNextStep} disabled={!audioBase64 || isRecording} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Avançar para Sites <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 7: DESAFIO SITES & DESIGN */}
            {step === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> CASO REAL 02: VITRINE PROFISSIONAL</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Dra. Helena, Advogada. Ela tem um site que o sobrinho fez, demora muito pra abrir e usa um logo feito no Canva. Ela reclama que os clientes "fogem" na hora de ouvir o preço dos honorários.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-cyan-400" />
                    Como o "gargalo" da imagem visual dela está influenciando no fechamento de contratos de alto valor? Explique a relação entre Design e Preço.
                  </p>
                </div>

                <Textarea 
                  value={formData.ansSites} 
                  onChange={(e) => setFormData({...formData, ansSites: e.target.value})}
                  placeholder="Escreva sua análise estratégica..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Desafio <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 8: DESAFIO CHAT IA & SOCIAL */}
            {step === 8 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-violet-500/10 border border-violet-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-violet-400 font-black uppercase text-[10px]"><Bot size={16} /> CASO REAL 03: ESCALA INTELIGENTE</div>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-violet-400 mb-2 uppercase">BRIEFING:</p>
                    <p className="text-sm font-bold">Imobiliária 'Luz do Sol'. Eles recebem 150 mensagens/dia. A secretária demora 2 horas pra responder. 80% das perguntas são repetitivas (preço, localização). Eles perdem leads quentes no meio da bagunça.</p>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase italic">
                    <AlertCircle size={14} className="inline mr-2 text-violet-400" />
                    Como uma IA de atendimento resolve o "vazamento" de dinheiro aqui? Como você venderia isso sem que pareça um "robô chato"?
                  </p>
                </div>

                <Textarea 
                  value={formData.ansChat} 
                  onChange={(e) => setFormData({...formData, ansChat: e.target.value})}
                  placeholder="Escreva sua solução técnica..." 
                  className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-violet-500 text-white rounded-full font-black uppercase text-[10px]">Desafio Final: O Pitch <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 9: PITCH FINAL - ECOSSISTEMA */}
            {step === 9 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Trophy size={16} /> DESAFIO FINAL</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Venda o Ecossistema Completo</h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Grave um pitch final de 2 minutos. Imagine que você está falando com um empresário que fatura bem, mas sente que o digital dele está "bagunçado". Venda a ideia de uma consultoria que resolve <strong>Ads, Site, Design e IA</strong> de uma vez.
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
                    "Obrigado por completar o treinamento estratégico Sapient. Analisaremos sua visão de negócio e sua oratória vocal. Entraremos em contato via WhatsApp caso seu perfil seja compatível com nosso ecossistema profissional."
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
