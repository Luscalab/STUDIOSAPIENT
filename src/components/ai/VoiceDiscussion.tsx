"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Loader2, Volume2, X, Sparkles, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/**
 * Interface de Discussão por Acessibilidade.
 * Utiliza respostas pré-definidas e síntese de voz nativa para guiar o usuário.
 */
export function VoiceDiscussion() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  // Base de Conhecimento Estratégica (Respostas Pré-definidas)
  const KNOWLEDGE_BASE = {
    GREETING: "Olá! Sou a Voz da Sapient. Posso te explicar sobre nossos serviços, nossa metodologia, o projeto UrbeLudo ou como entrar em contato. Sobre o que você quer saber?",
    SERVICES: "Na Sapient, ajudamos seu negócio com Performance e Ads, Design Estratégico e Atendimento Inteligente com IA. Focamos em clareza e resultados reais.",
    PROCESS: "Nossa metodologia tem quatro etapas: Entendimento, Planejamento, Execução e Acompanhamento. É uma parceria próxima em cada detalhe.",
    URBELUDO: "O UrbeLudo é nosso projeto de inovação social. Usamos tecnologia de jogos para ajudar pessoas em reabilitação motora e cognitiva. É ciência com propósito.",
    CONTACT: "Você pode falar conosco pelo WhatsApp, e-mail ou telefone na seção de contato ao final da página. Estamos prontos para ouvir seu desafio.",
    WHO_WE_ARE: "Somos uma agência que une design e estratégia para transformar negócios em referências. Nossa equipe foca em parcerias verdadeiras.",
    NOT_FOUND: "Não entendi bem. Posso falar sobre nossos serviços, metodologia, contato ou sobre o projeto UrbeLudo. O que prefere?"
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
    }
  }, []);

  const speak = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
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
        title: "[ MODO DISCUSSÃO ATIVO ]",
        description: "Estou te ouvindo. Peça para eu explicar qualquer seção do site.",
        className: "bg-primary border-none text-white font-black uppercase tracking-widest text-[10px]"
      });
    }
  };

  const startListening = () => {
    if (isSpeaking || isListening) return;
    setTranscript("");
    setIsListening(true);
    try {
      recognitionRef.current?.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleProcessVoice = (text: string) => {
    if (text.includes("serviço") || text.includes("ajuda") || text.includes("fazem")) {
      speak(KNOWLEDGE_BASE.SERVICES);
    } else if (text.includes("processo") || text.includes("metodologia") || text.includes("trabalham")) {
      speak(KNOWLEDGE_BASE.PROCESS);
    } else if (text.includes("ludo") || text.includes("social") || text.includes("reabilita")) {
      speak(KNOWLEDGE_BASE.URBELUDO);
    } else if (text.includes("contato") || text.includes("falar") || text.includes("whatsapp")) {
      speak(KNOWLEDGE_BASE.CONTACT);
    } else if (text.includes("quem") || text.includes("equipe") || text.includes("sapient")) {
      speak(KNOWLEDGE_BASE.WHO_WE_ARE);
    } else {
      speak(KNOWLEDGE_BASE.NOT_FOUND);
    }
  };

  if (!mounted || !recognitionRef.current) return null;

  return (
    <>
      <button
        onClick={toggleDiscussion}
        className={cn(
          "fixed bottom-24 left-6 z-[150] h-16 w-16 rounded-full flex items-center justify-center transition-all duration-1000 shadow-2xl border-2 border-white/20 backdrop-blur-3xl group overflow-hidden",
          isActive ? "bg-white text-primary scale-110" : "bg-[#0c0a1a] text-white hover:scale-110 border-white/5"
        )}
        aria-label={isActive ? "Desativar Discussão por Voz" : "Ativar Guia de Áudio Estratégico"}
      >
        {isActive ? <X className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        {!isActive && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
          </span>
        )}
      </button>

      <div
        className={cn(
          "fixed bottom-44 left-6 z-[150] w-[calc(100vw-3rem)] md:w-[320px] glass-morphism rounded-[3rem] border-white/10 p-8 space-y-8 transition-all duration-700 origin-bottom-left shadow-2xl",
          isActive ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm tracking-tighter uppercase text-white">Guia Sapient</h3>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Inclusão Digital Ativa</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <button
            onClick={startListening}
            disabled={isSpeaking || isListening}
            className={cn(
              "h-24 w-24 rounded-full flex items-center justify-center transition-all duration-500 relative shadow-xl",
              isListening ? "bg-primary scale-110" : "bg-white/5 border border-white/10 hover:bg-white/10",
              isSpeaking && "opacity-50 cursor-not-allowed"
            )}
          >
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20" />
            )}
            {isSpeaking ? (
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            ) : isListening ? (
              <Mic className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-white/30" />
            )}
          </button>
          
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/50 animate-pulse">
            {isListening ? "Estou ouvindo..." : isSpeaking ? "IA Falando..." : "Toque no microfone para falar"}
          </p>
        </div>

        {transcript && (
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] italic text-white/40 mb-2 font-black uppercase tracking-widest">Você perguntou sobre:</p>
            <p className="text-sm text-white/80 font-medium leading-relaxed">"{transcript}"</p>
          </div>
        )}

        <div className="flex items-center gap-2 pt-4">
          <MessageSquareText className="h-3 w-3 text-primary" />
          <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Dica: Pergunte sobre "Serviços" ou "UrbeLudo"</p>
        </div>
      </div>
    </>
  );
}
