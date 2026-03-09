"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Loader2, Volume2, X, Sparkles } from "lucide-react";
import { startVoiceDiscussion } from "@/ai/flows/voice-discussion-flow";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function VoiceDiscussion() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    
    // Inicializar Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = 'pt-BR';
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          handleProcessVoice(text);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Erro no reconhecimento de voz:", event.error);
          setIsListening(false);
          if (event.error !== 'no-speech') {
             toast({
              title: "Ops!",
              description: "Não consegui te ouvir bem. Tente novamente.",
              variant: "destructive"
            });
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleDiscussion = () => {
    if (isActive) {
      setIsActive(false);
      setIsListening(false);
      if (audioRef.current) audioRef.current.pause();
      if (recognitionRef.current) recognitionRef.current.stop();
    } else {
      setIsActive(true);
      toast({
        title: "Modo Discussão Ativado",
        description: "Estou te ouvindo. Como posso ajudar com sua estratégia?",
        className: "bg-primary border-none text-white font-black uppercase tracking-widest text-[10px]"
      });
    }
  };

  const startListening = () => {
    if (isProcessing || isListening) return;
    
    setTranscript("");
    setIsListening(true);
    try {
      recognitionRef.current?.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleProcessVoice = async (text: string) => {
    setIsProcessing(true);
    try {
      const response = await startVoiceDiscussion({ userMessage: text });
      
      if (response.audioUri) {
        if (audioRef.current) {
          audioRef.current.src = response.audioUri;
          audioRef.current.play();
        }
      }
    } catch (error) {
      console.error("Erro na discussão por voz:", error);
      toast({
        title: "Erro de Conexão",
        description: "Não consegui processar sua voz no momento.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted || !recognitionRef.current) return null;

  return (
    <>
      {/* Botão Flutuante Principal */}
      <button
        onClick={toggleDiscussion}
        className={cn(
          "fixed bottom-24 left-6 z-[150] h-16 w-16 rounded-full flex items-center justify-center transition-all duration-1000 shadow-2xl border-2 border-white/20 backdrop-blur-3xl group overflow-hidden",
          isActive ? "bg-white text-primary scale-110" : "bg-black text-white hover:scale-110"
        )}
        aria-label={isActive ? "Desativar Discussão" : "Ativar Discussão por Voz"}
      >
        {isActive ? <X className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        {!isActive && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
          </span>
        )}
      </button>

      {/* Painel de Interação de Voz */}
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
            <h3 className="font-headline font-black text-sm tracking-tighter uppercase text-white">Modo Discussão</h3>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Powered by Gemini AI</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <button
            onClick={startListening}
            disabled={isProcessing || isListening}
            className={cn(
              "h-24 w-24 rounded-full flex items-center justify-center transition-all duration-500 relative",
              isListening ? "bg-primary scale-110" : "bg-white/5 border border-white/10 hover:bg-white/10",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
          >
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20" />
            )}
            {isProcessing ? (
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            ) : isListening ? (
              <Mic className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-white/30" />
            )}
          </button>
          
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/50 animate-pulse">
            {isListening ? "Estou ouvindo..." : isProcessing ? "Processando..." : "Toque no microfone para falar"}
          </p>
        </div>

        {transcript && (
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] italic text-white/40 mb-2 font-black uppercase tracking-widest">Você disse:</p>
            <p className="text-sm text-white/80 font-medium leading-relaxed">"{transcript}"</p>
          </div>
        )}

        <audio ref={audioRef} className="hidden" onEnded={() => setIsProcessing(false)} />
      </div>
    </>
  );
}
