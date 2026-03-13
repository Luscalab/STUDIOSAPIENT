
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
  Building2,
  Volume2,
  ShieldCheck,
  Target,
  TrendingUp,
  Layout,
  Palette,
  FileText,
  MousePointer2
} from "lucide-react";
import { useFirebase, useFirestore, initiateAnonymousSignIn } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "sapient_collector_v1";

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
          score: 0,
          verdict: 'PENDENTE',
          aiFeedback: 'Aguardando avaliação humana.',
          timestamp: serverTimestamp()
        });
      }
      setStep(7);
    } catch (error) {
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
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase">Processo de Recrutamento Studiosapient</Badge>
              <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Dossiê <span className="text-primary italic lowercase">candidato.</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className={cn("h-1 flex-1 rounded-full", step >= s ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5")} />
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {/* ETAPA 1: IDENTIFICAÇÃO */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">1. Identificação de Elite</h2>
                    <p className="text-white/40 text-sm">Buscamos pessoas que entendam que marketing é sobre ROI, não sobre posts bonitinhos.</p>
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
                      Autorizo a studiosapient a coletar meus dados e áudio para fins de recrutamento.
                    </label>
                  </div>
                </div>
                
                <Button onClick={handleNextStep} className="h-20 px-12 bg-primary rounded-full font-black uppercase text-[11px] shadow-xl w-full md:w-auto">
                  Iniciar Avaliação <ChevronRight size={18} />
                </Button>
              </div>
            )}

            {/* ETAPA 2: PERFORMANCE ADS */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><TrendingUp size={16} /> PILAR: PERFORMANCE ADS (Google/Meta)</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">O Gargalo da Demanda Ativa</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Na Sapient, Ads não é sobre "likes". É sobre capturar quem está buscando o serviço <strong>agora</strong>. <br/>
                    <strong>Cenário:</strong> Um dono de clínica médica diz que "anúncio é gasto e ele já tem indicação".
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">Sua Abordagem por Escrito:</label>
                  <Textarea 
                    value={formData.ansAds} 
                    onChange={(e) => setFormData({...formData, ansAds: e.target.value})}
                    placeholder="Como você provaria que o Google Ads é uma fonte previsível de novos contratos comparado à incerteza da indicação?" 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-primary rounded-full font-black uppercase text-[10px]">Próximo Desafio <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 3: SITES PREMIUM */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400 font-black uppercase text-[10px]"><Layout size={16} /> PILAR: SITES PREMIUM (Engenharia de Conversão)</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">A Vitrine que Expulsa Clientes</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Um site lento ou amador é um "balde furado" no tráfego pago. <br/>
                    <strong>Cenário:</strong> O cliente investe R$ 5k/mês em anúncios, mas o site dele demora 6 segundos para carregar no celular.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Sua Abordagem por Escrito:</label>
                  <Textarea 
                    value={formData.ansSites} 
                    onChange={(e) => setFormData({...formData, ansSites: e.target.value})}
                    placeholder="Como você explicaria que o site atual dele está 'jogando dinheiro no lixo' e por que a Sapient foca em velocidade extrema?" 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-cyan-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Desafio <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 4: DESIGN ESTRATÉGICO */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-orange-400 font-black uppercase text-[10px]"><Palette size={16} /> PILAR: DESIGN ESTRATÉGICO (Psicologia de Valor)</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">A Barreira da Confiança</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Design não é estética, é semiótica de poder. <br/>
                    <strong>Cenário:</strong> Um advogado quer atrair clientes de alto ticket (empresários), mas o logotipo dele foi feito no Canva e parece amador.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-orange-400">Sua Abordagem por Escrito:</label>
                  <Textarea 
                    value={formData.ansDesign} 
                    onChange={(e) => setFormData({...formData, ansDesign: e.target.value})}
                    placeholder="Qual o argumento para convencer esse advogado de que o design 'amador' está impedindo ele de cobrar o preço justo pelos seus honorários?" 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-orange-500 text-white rounded-full font-black uppercase text-[10px]">Próximo Desafio <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 5: NARRATIVA VISUAL E DOSSIÊS */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-purple-500/10 border border-purple-500/20 space-y-6">
                  <div className="flex items-center gap-3 text-purple-400 font-black uppercase text-[10px]"><FileText size={16} /> PILAR: NARRATIVA VISUAL (Dossiês de Venda)</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Fechamento de Alto Nível</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Na Sapient, propostas são Dossiês de impacto emocional. <br/>
                    <strong>Cenário:</strong> O cliente adorou o serviço, mas precisa de uma apresentação para convencer o sócio dele, que é focado apenas em números.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-purple-400">Sua Abordagem por Escrito:</label>
                  <Textarea 
                    value={formData.ansNarrativa} 
                    onChange={(e) => setFormData({...formData, ansNarrativa: e.target.value})}
                    placeholder="Como você apresentaria o valor de um Dossiê Sapient para um sócio cético que só quer saber de planilhas de custo?" 
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl p-6 font-bold"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePrevStep} className="h-16 px-8 rounded-full border-white/10 font-black uppercase text-[9px]"><ChevronLeft size={16}/></Button>
                  <Button onClick={handleNextStep} className="h-16 flex-1 bg-purple-500 text-white rounded-full font-black uppercase text-[10px]">Última Etapa: O Pitch <ChevronRight size={16}/></Button>
                </div>
              </div>
            )}

            {/* ETAPA 6: PITCH VOCAL FINAL */}
            {step === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[2.5rem] bg-white text-black space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px]"><Target size={16} /> DESAFIO FINAL: PITCH DE AUTORIDADE</div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Venda o Ecossistema Sapient</h3>
                  <p className="text-sm md:text-base text-black/60 leading-relaxed">
                    Grave um áudio de até 2 minutos explicando por que um empresário deve contratar o **Ecossistema studiosapient completo** em vez de contratar agências separadas para cada serviço.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8 py-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                  <button 
                    onClick={() => isRecording ? stopAllRecording() : startRecording()}
                    className={cn(
                      "h-32 w-32 rounded-full flex items-center justify-center transition-all shadow-2xl border-4",
                      isRecording ? "bg-red-500 border-red-400 animate-pulse" : "bg-primary border-primary/20 text-white hover:scale-105"
                    )}
                  >
                    {isRecording ? <MicOff size={40} /> : <Mic size={40} />}
                  </button>

                  <div className="text-center space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-white">
                      {isRecording ? "GRAVANDO PITCH..." : audioBase64 ? "ÁUDIO GRAVADO COM SUCESSO" : "Pressione para Gravar seu Pitch"}
                    </p>
                  </div>

                  {audioPreviewUrl && !isRecording && (
                    <div className="w-full max-w-md space-y-4 text-center animate-in zoom-in">
                      <div className="h-px w-full bg-white/10" />
                      <p className="text-[9px] font-black uppercase text-primary flex items-center justify-center gap-2"><Volume2 size={12}/> Clique abaixo para ouvir antes de enviar:</p>
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
                    {isLoading ? <Loader2 className="animate-spin mr-3 h-6 w-6" /> : "Finalizar e Enviar Dossiê"} <Zap size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* ETAPA 7: SUCESSO */}
            {step === 7 && (
              <div className="space-y-12 animate-in zoom-in duration-700 text-center py-10">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse">
                  <Trophy size={40} className="text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Dossiê Recebido.</h2>
                  <p className="text-xl text-white/50 font-medium">Sua jornada de autoridade começa agora.</p>
                </div>
                <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 max-w-2xl mx-auto">
                  <p className="text-white/40 leading-relaxed italic">
                    "Obrigado por completar o desafio Sapient. Seus dados e seu pitch vocal foram capturados. Nossa equipe de estratégia comercial analisará sua postura, clareza técnica e capacidade de contorno de objeções. Entraremos em contato via WhatsApp caso seu perfil se alinhe aos nossos valores de elite."
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
