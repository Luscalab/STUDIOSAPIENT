"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Loader2, Volume2, X, Sparkles, MessageSquareText, Phone, MessageCircle, Heart, Zap, ShieldCheck, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/**
 * Constantes de Conhecimento e Contato movidas para fora do componente 
 * para otimização de memória e performance de compilação.
 */
const CONTACT_INFO = {
  whatsapp: "https://wa.me/5511959631870?text=Olá! Gostaria de falar com a Sapient sobre um projeto.",
  phone: "tel:+5511959631870",
  email: "sapientcontato@gmail.com"
};

const KNOWLEDGE_BASE = {
  GREETING: "Olá! Sou o assistente de voz da Sapient Studio. Sou seu guia de acessibilidade. Posso te explicar sobre nossos serviços de Design e Ads, nossa metodologia estratégica, o projeto social UrbeLudo ou como entrar em contato. O que você gostaria de saber primeiro?",
  
  SERVICES: "Trabalhamos com três pilares de elite. Primeiro: Performance e Ads, focado em captar demanda real no Google e Maps. Segundo: Design Estratégico, para criar identidades de alto valor que removem barreiras de confiança. Terceiro: Ecossistemas de IA, com chats inteligentes que atendem e qualificam leads vinte e quatro horas. Qual desses pilares faz mais sentido para o seu momento atual?",
  
  DESIGN: "Nosso Design Estratégico não é apenas estética; é psicologia aplicada ao valor. Criamos sistemas de identidade de prestígio e dossiês de venda que posicionam seu negócio como a escolha óbvia do mercado, encurtando seu ciclo de fechamento. Quer saber como aplicamos isso ao seu nicho?",
  
  ADS: "Em Performance e Ads, dominamos as buscas locais. Otimizamos seu Google Meu Negócio e criamos campanhas de precisão para que, quando alguém buscar pelo seu serviço, sua marca apareça no topo com autoridade inquestionável. Isso gera um fluxo previsível de novos contratos.",
  
  PROCESS: "A Metodologia Sapient é um protocolo de quatro fases. Fase um: Entendimento profundo do seu negócio. Fase dois: Planejamento estratégico de canais. Fase três: Execução visual de alta fidelidade. E fase quatro: Acompanhamento de dados e otimização. Focamos em clareza absoluta para que seu cliente tome a decisão de compra naturalmente.",
  
  URBELUDO: "O UrbeLudo é nossa iniciativa de maior impacto. É uma plataforma de reabilitação neuro-motora que une jogos imersivos em Unity e inteligência artificial. Transformamos o movimento do paciente em dados clínicos, ajudando em tratamentos de fonoaudiologia e fisioterapia de forma lúdica e eficaz. O UrbeLudo é a ciência do movimento a favor da vida.",
  
  URBELUDO_TECH: "Tecnicamente, o UrbeLudo utiliza Edge AI para processar biomecânica em tempo real e Biofeedback Analítico para gerar relatórios de evolução para os médicos. É um ecossistema completo para clínicas e ONGs. Você gostaria de saber como pode apoiar este projeto?",
  
  URBELUDO_HELP: "Você pode impulsionar o UrbeLudo de três formas estratégicas. Um: Como Investidor, ajudando na escala global de hardware. Dois: Através de Doações via PIX, que mantêm a plataforma gratuita em instituições públicas. Três: Como Colaborador Especialista, se você for da área de saúde ou tecnologia. Qual dessas opções você quer que eu detalhe?",
  
  URBELUDO_DONATE: "As doações são fundamentais para mantermos o projeto em hospitais públicos. O PIX é o e-mail da agência: sapientcontato arroba gmail ponto com. Posso copiar essa chave para sua área de transferência ou você prefere que eu abra o nosso contato?",
  
  CONTACT: "Estou aqui para facilitar sua conexão. Você pode dizer 'mandar zap' para abrir o WhatsApp, 'ligar' para falar com um consultor agora, ou anotar nosso e-mail: sapientcontato arroba gmail ponto com. O que prefere fazer?",
  
  WHO_WE_ARE: "A Sapient Studio é uma agência que une design de prestígio e estratégia comercial. Nosso propósito é transformar negócios em referências inquestionáveis através de clareza visual e tecnologia. Somos parceiros do seu crescimento.",
  
  ACTION_WHATSAPP: "Perfeito. Iniciando o redirecionamento para o nosso WhatsApp estratégico agora.",
  ACTION_CALL: "Com certeza. Iniciando a chamada telefônica para nosso consultor comercial agora.",
  NOT_FOUND: "Desculpe, ainda estou aprendendo sobre esse assunto específico. Mas posso falar sobre Design, Ads, o projeto UrbeLudo ou abrir nosso contato via WhatsApp ou Telefone. Sobre o que vamos conversar?"
};

export function VoiceDiscussion() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = 'pt-BR';
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const text = event.results[0][0].transcript.toLowerCase();
          setTranscript(text);
          handleProcessVoice(text);
        };

        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }

      const handleExternalToggle = () => toggleDiscussion();
      window.addEventListener('toggle-voice-discussion', handleExternalToggle);
      return () => window.removeEventListener('toggle-voice-discussion', handleExternalToggle);
    }
  }, []);

  const speak = (text: string, onComplete?: () => void) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onComplete) onComplete();
      if (isActive) {
        setTimeout(startListening, 800);
      }
    };
    synthRef.current.speak(utterance);
  };

  const toggleDiscussion = () => {
    if (isActive) {
      setIsActive(false);
      setIsListening(false);
      synthRef.current?.cancel();
    } else {
      setIsActive(true);
      speak(KNOWLEDGE_BASE.GREETING);
      toast({
        title: "[ GUIA DE VOZ ATIVO ]",
        description: "Estou te ouvindo. Fale naturalmente após eu terminar.",
        className: "bg-primary border-none text-white font-black uppercase tracking-widest text-[10px]"
      });
    }
  };

  const startListening = () => {
    if (isSpeaking || isListening || !isActive) return;
    setTranscript("");
    setIsListening(true);
    try {
      recognitionRef.current?.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleProcessVoice = (text: string) => {
    const intents = [
      { 
        keywords: ["zap", "whatsapp", "mensagem", "mandar zap", "falar com alguém"], 
        action: () => speak(KNOWLEDGE_BASE.ACTION_WHATSAPP, () => window.open(CONTACT_INFO.whatsapp, '_blank')) 
      },
      { 
        keywords: ["ligar", "telefone", "chamada", "telefonar", "contato", "falar"], 
        action: () => speak(KNOWLEDGE_BASE.ACTION_CALL, () => window.location.href = CONTACT_INFO.phone) 
      },
      { 
        keywords: ["urbe", "ludo", "social", "reabilita", "projeto", "saúde", "movimento"], 
        action: () => speak(KNOWLEDGE_BASE.URBELUDO) 
      },
      { 
        keywords: ["tecnologia", "tech", "ia", "unity", "biofeedback", "dados"], 
        action: () => speak(KNOWLEDGE_BASE.URBELUDO_TECH) 
      },
      { 
        keywords: ["ajudar", "doar", "investir", "apoio", "doação", "pix", "contribuir"], 
        action: () => {
          if (text.includes("doar") || text.includes("pix") || text.includes("doação")) {
            speak(KNOWLEDGE_BASE.URBELUDO_DONATE);
          } else {
            speak(KNOWLEDGE_BASE.URBELUDO_HELP);
          }
        }
      },
      { 
        keywords: ["serviço", "fazem", "design", "anúncio", "ads", "ia", "performance", "branding"], 
        action: () => {
          if (text.includes("design") || text.includes("marca") || text.includes("branding")) {
            speak(KNOWLEDGE_BASE.DESIGN);
          } else if (text.includes("anúncio") || text.includes("ads") || text.includes("google") || text.includes("performance")) {
            speak(KNOWLEDGE_BASE.ADS);
          } else {
            speak(KNOWLEDGE_BASE.SERVICES);
          }
        }
      },
      { 
        keywords: ["quem", "agência", "somos", "sapient", "estúdio", "studio"], 
        action: () => speak(KNOWLEDGE_BASE.WHO_WE_ARE) 
      },
      { 
        keywords: ["processo", "metodologia", "como funciona", "etapas", "fases"], 
        action: () => speak(KNOWLEDGE_BASE.PROCESS) 
      }
    ];

    const matchedIntent = intents.find(intent => intent.keywords.some(word => text.includes(word)));

    if (matchedIntent) {
      matchedIntent.action();
    } else {
      speak(KNOWLEDGE_BASE.NOT_FOUND);
    }
  };

  if (!mounted || !recognitionRef.current) return null;

  return (
    <>
      <div
        className={cn(
          "fixed bottom-24 left-6 z-[150] w-[calc(100vw-3rem)] md:w-[360px] glass-morphism rounded-[3.5rem] border-white/10 p-8 space-y-8 transition-all duration-1000 origin-bottom-left shadow-2xl",
          isActive ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Sparkles className="h-7 w-7 animate-pulse" />
            </div>
            <div>
              <h3 className="font-headline font-black text-sm tracking-tighter uppercase text-white">Guia Sapient</h3>
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Consultoria por Voz</p>
            </div>
          </div>
          <button 
            onClick={toggleDiscussion}
            className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all border border-white/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="relative">
            {(isListening || isSpeaking) && (
              <div className={cn(
                "absolute -inset-8 rounded-full border-4 opacity-10 animate-ping",
                isListening ? "border-primary" : "border-white"
              )} />
            )}
            <button
              onClick={startListening}
              disabled={isSpeaking || isListening}
              className={cn(
                "h-28 w-28 rounded-full flex items-center justify-center transition-all duration-700 relative shadow-2xl overflow-hidden",
                isListening ? "bg-primary scale-110" : "bg-white/5 border border-white/10 hover:bg-white/10",
                isSpeaking && "bg-white/10"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {isSpeaking ? (
                <Volume2 className="h-10 w-10 text-white animate-bounce" />
              ) : isListening ? (
                <Mic className="h-10 w-10 text-white animate-pulse" />
              ) : (
                <Mic className="h-10 w-10 text-white/20" />
              )}
            </button>
          </div>
          
          <div className="text-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
              {isListening ? "Estou ouvindo sua intenção..." : isSpeaking ? "IA processando resposta..." : "Toque para falar ou aguarde"}
            </p>
            <div className="flex justify-center gap-3">
              {isListening && (
                <div className="flex items-end gap-1.5 h-6">
                  <div className="w-1.5 bg-primary rounded-full animate-[voice-wave_0.8s_ease-in-out_infinite] [animation-delay:-0.3s]" />
                  <div className="w-1.5 bg-primary rounded-full animate-[voice-wave_0.8s_ease-in-out_infinite] [animation-delay:-0.15s]" />
                  <div className="w-1.5 bg-primary rounded-full animate-[voice-wave_0.8s_ease-in-out_infinite]" />
                </div>
              )}
            </div>
          </div>
        </div>

        {transcript && (
          <div className="bg-white/5 rounded-3xl p-6 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-[9px] italic text-white/40 mb-3 font-black uppercase tracking-widest flex items-center gap-2">
              <MessageSquareText className="h-3 w-3" /> Transcrição:
            </p>
            <p className="text-base text-white/90 font-medium leading-relaxed italic">"{transcript}"</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
          {[
            { icon: <MessageCircle className="h-5 w-5" />, label: "WhatsApp", action: () => handleProcessVoice("whatsapp") },
            { icon: <Phone className="h-5 w-5" />, label: "Ligar", action: () => handleProcessVoice("ligar") },
            { icon: <Heart className="h-5 w-5" />, label: "Apoiar", action: () => handleProcessVoice("doar") }
          ].map((item, i) => (
            <button 
              key={i}
              onClick={item.action}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-primary transition-all group"
            >
              <div className="text-white/40 group-hover:text-white transition-colors">{item.icon}</div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/30 group-hover:text-white">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes voice-wave {
          0%, 100% { height: 10px; }
          50% { height: 24px; }
        }
      `}</style>
    </>
  );
}
