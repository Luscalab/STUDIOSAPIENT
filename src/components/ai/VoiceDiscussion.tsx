"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Loader2, Volume2, X, Sparkles, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/**
 * Interface de Discussão por Acessibilidade.
 * Utiliza respostas treinadas baseadas no conteúdo real da Sapient e UrbeLudo.
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

  // Base de Conhecimento Estratégica Sapient (Treinada com o conteúdo da página)
  const KNOWLEDGE_BASE = {
    GREETING: "Olá! Sou o Guia de Voz da Sapient. Posso te explicar sobre nossos serviços, nossa metodologia, o projeto UrbeLudo ou como entrar em contato. Sobre o que você quer saber?",
    SERVICES: "Na Sapient Studio, oferecemos três pilares: Performance e Ads para captar clientes reais no Google, Design Estratégico para criar uma identidade visual de alto padrão, e Atendimento com IA para automatizar seu WhatsApp e site vinte e quatro horas por dia.",
    PROCESS: "Nossa metodologia é dividida em quatro etapas fundamentais: primeiro o Entendimento dos seus desafios, seguido do Planejamento estratégico, depois a Execução técnica de alta fidelidade e, por fim, o Acompanhamento contínuo dos seus resultados.",
    URBELUDO: "O UrbeLudo é nosso projeto de inovação social e tecnológica. Desenvolvemos uma plataforma de biofeedback que utiliza jogos e inteligência artificial para auxiliar na reabilitação motora e fonoaudiológica de forma lúdica e científica.",
    CONTACT: "Para falar conosco, você pode utilizar o botão de WhatsApp, enviar um e-mail para sapientcontato@gmail.com ou ligar para o número onze, nove, cinco, nove, seis, três, dezoito, setenta. Estamos prontos para ouvir seu desafio.",
    WHO_WE_ARE: "Somos uma agência que une design de elite e estratégia comercial para transformar negócios em referências de mercado. Nosso foco é clareza visual e resultados que realmente impactam seu faturamento.",
    NOT_FOUND: "Desculpe, não identifiquei esse tópico. Posso falar sobre nossos serviços de Design e Ads, nossa metodologia de trabalho, o contato da agência ou sobre o projeto social UrbeLudo. Qual desses você prefere?"
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

      // Escutar evento de ativação do Menu de Acessibilidade
      const handleExternalToggle = () => toggleDiscussion();
      window.addEventListener('toggle-voice-discussion', handleExternalToggle);
      return () => window.removeEventListener('toggle-voice-discussion', handleExternalToggle);
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
        title: "[ GUIA DE VOZ ATIVO ]",
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
    const servicesWords = ["serviço", "ajuda", "fazem", "design", "anúncio", "ads", "ia", "chat"];
    const processWords = ["processo", "metodologia", "trabalham", "etapa", "fase"];
    const urbeWords = ["ludo", "social", "reabilita", "projeto", "saúde", "movimento"];
    const contactWords = ["contato", "falar", "whatsapp", "email", "telefone", "ligar"];
    const aboutWords = ["quem", "equipe", "sapient", "agência", "somos"];

    if (servicesWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.SERVICES);
    } else if (processWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.PROCESS);
    } else if (urbeWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.URBELUDO);
    } else if (contactWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.CONTACT);
    } else if (aboutWords.some(word => text.includes(word))) {
      speak(KNOWLEDGE_BASE.WHO_WE_ARE);
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
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Assistência por Voz</p>
            </div>
          </div>
          <button 
            onClick={toggleDiscussion}
            className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <button
            onClick={startListening}
            disabled={isSpeaking || isListening}
            className={cn(
              "h-24 w-24 rounded-full flex items-center justify-center transition-all duration-500 relative shadow-xl",
              isListening ? "bg-primary scale-110 shadow-primary/20" : "bg-white/5 border border-white/10 hover:bg-white/10",
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
            {isListening ? "Estou ouvindo..." : isSpeaking ? "IA Falando..." : "Toque para falar"}
          </p>
        </div>

        {transcript && (
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] italic text-white/40 mb-2 font-black uppercase tracking-widest">Sua pergunta:</p>
            <p className="text-sm text-white/80 font-medium leading-relaxed">"{transcript}"</p>
          </div>
        )}

        <div className="flex items-center gap-2 pt-4">
          <MessageSquareText className="h-3 w-3 text-primary" />
          <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Tópicos: Serviços, UrbeLudo, Processo ou Contato</p>
        </div>
      </div>
    </>
  );
}
