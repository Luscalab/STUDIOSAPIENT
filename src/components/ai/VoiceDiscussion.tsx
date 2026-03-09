"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Loader2, Volume2, X, Sparkles, MessageSquareText, Phone, MessageCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/**
 * Interface de Discussão por Acessibilidade Avançada.
 * Agora com suporte a comandos de ação (WhatsApp/Ligar) e auto-ativação do mic.
 */
export function VoiceDiscussion() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);
  const { toast } = useToast();

  const CONTACT_INFO = {
    whatsapp: "https://wa.me/5511959631870?text=Olá! Gostaria de falar com a Sapient sobre um projeto.",
    phone: "tel:+5511959631870",
    email: "sapientcontato@gmail.com"
  };

  const KNOWLEDGE_BASE = {
    GREETING: "Olá! Sou o assistente de voz da Sapient. Posso te explicar sobre nossos serviços, nossa metodologia, o projeto UrbeLudo ou como entrar em contato. Se quiser, peça para eu ligar para a agência ou mandar um zap. Sobre o que você quer saber?",
    SERVICES: "Na Sapient Studio, trabalhamos com três pilares: Primeiro, Performance e Ads para captar clientes reais no Google. Segundo, Design Estratégico para criar uma identidade de prestígio. E terceiro, Ecossistemas de IA para automatizar seu atendimento vinte e quatro horas. Qual desses te interessa mais?",
    PROCESS: "Nossa metodologia Sapient é um protocolo de quatro fases: Entendimento, Planejamento, Execução de alta fidelidade e Acompanhamento de resultados. Focamos em clareza para que seu cliente tome a decisão de compra naturalmente.",
    URBELUDO: "O UrbeLudo é nossa iniciativa de impacto social. É uma plataforma de reabilitação que usa jogos e inteligência artificial para ajudar em tratamentos de fonoaudiologia e fisioterapia. Transformamos o movimento do paciente em dados de evolução clínica de forma lúdica.",
    URBELUDO_HELP: "Existem três formas de apoiar o UrbeLudo: Você pode ser um Investidor Estratégico para nossa escala global, pode doar diretamente para apoiar pesquisas em ONGs, ou pode colaborar tecnicamente se for um especialista em saúde ou tecnologia. Qual dessas opções você quer detalhar?",
    URBELUDO_DONATE: "Para doações, utilizamos o PIX da agência Sapient. O valor é integralmente revertido para manter a plataforma gratuita em instituições públicas. Posso te passar o e-mail para a chave PIX agora?",
    CONTACT: "Você pode falar conosco agora mesmo. Diga 'mandar zap' para o WhatsApp, 'ligar' para o telefone, ou anote nosso e-mail: sapientcontato arroba gmail ponto com.",
    WHO_WE_ARE: "Somos uma agência que une design de elite e estratégia comercial. Nosso propósito é transformar negócios em referências inquestionáveis de mercado através de clareza visual e dados.",
    ACTION_WHATSAPP: "Perfeito. Estou abrindo seu WhatsApp para iniciarmos a conversa estratégica agora.",
    ACTION_CALL: "Com certeza. Iniciando a chamada para o nosso consultor estratégico agora.",
    NOT_FOUND: "Desculpe, não entendi. Posso falar sobre Design, Ads, o projeto UrbeLudo ou abrir nosso contato via WhatsApp ou Telefone. O que você prefere?"
  };

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
      // Auto-listen após falar, se o modo estiver ativo
      if (isActive) {
        setTimeout(startListening, 500);
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
        description: "Estou te ouvindo. Fale naturalmente.",
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
    // Comandos de Ação
    const zapWords = ["zap", "whatsapp", "mensagem", "mandar zap"];
    const callWords = ["ligar", "telefone", "chamada", "telefonar"];
    const urbeWords = ["ludo", "social", "reabilita", "projeto", "saúde"];
    const helpWords = ["ajudar", "doar", "investir", "apoio", "doação", "pix"];
    const servicesWords = ["serviço", "fazem", "design", "anúncio", "ads", "ia"];
    const aboutWords = ["quem", "agência", "somos", "sapient"];

    if (zapWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.ACTION_WHATSAPP, () => {
        window.open(CONTACT_INFO.whatsapp, '_blank');
      });
    } else if (callWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.ACTION_CALL, () => {
        window.location.href = CONTACT_INFO.phone;
      });
    } else if (helpWords.some(word => text.includes(word))) {
      if (text.includes("doar") || text.includes("pix")) {
        speak(KNOWLEDGE_BASE.URBELUDO_DONATE);
      } else {
        speak(KNOWLEDGE_BASE.URBELUDO_HELP);
      }
    } else if (urbeWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.URBELUDO);
    } else if (servicesWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.SERVICES);
    } else if (aboutWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.WHO_WE_ARE);
    } else if (text.includes("contato") || text.includes("falar")) {
      speak(KNOWLEDGE_BASE.CONTACT);
    } else {
      speak(KNOWLEDGE_BASE.NOT_FOUND);
    }
  };

  if (!mounted || !recognitionRef.current) return null;

  return (
    <>
      <div
        className={cn(
          "fixed bottom-24 left-6 z-[150] w-[calc(100vw-3rem)] md:w-[320px] glass-morphism rounded-[3rem] border-white/10 p-8 space-y-8 transition-all duration-700 origin-bottom-left shadow-2xl",
          isActive ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-headline font-black text-sm tracking-tighter uppercase text-white">Guia Sapient</h3>
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Modo Conversacional</p>
            </div>
          </div>
          <button 
            onClick={toggleDiscussion}
            className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <div className="relative">
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20" />
            )}
            <button
              onClick={startListening}
              disabled={isSpeaking || isListening}
              className={cn(
                "h-24 w-24 rounded-full flex items-center justify-center transition-all duration-500 relative shadow-xl",
                isListening ? "bg-primary scale-110" : "bg-white/5 border border-white/10 hover:bg-white/10",
                isSpeaking && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSpeaking ? (
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              ) : isListening ? (
                <Mic className="h-8 w-8 text-white animate-pulse" />
              ) : (
                <Mic className="h-8 w-8 text-white/30" />
              )}
            </button>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
              {isListening ? "Pode falar, estou ouvindo..." : isSpeaking ? "IA respondendo..." : "Toque ou aguarde para falar"}
            </p>
            <div className="flex justify-center gap-3">
              {isListening && (
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1 h-5 bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-3 bg-primary animate-bounce" />
                </div>
              )}
            </div>
          </div>
        </div>

        {transcript && (
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-[10px] italic text-white/40 mb-2 font-black uppercase tracking-widest">Sua voz:</p>
            <p className="text-sm text-white/80 font-medium leading-relaxed">"{transcript}"</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <MessageCircle className="h-4 w-4" />
            <span className="text-[7px] font-black uppercase tracking-widest">Zap</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Phone className="h-4 w-4" />
            <span className="text-[7px] font-black uppercase tracking-widest">Ligar</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Heart className="h-4 w-4" />
            <span className="text-[7px] font-black uppercase tracking-widest">Apoiar</span>
          </div>
        </div>
      </div>
    </>
  );
}
