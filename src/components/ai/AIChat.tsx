'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Loader2,
  MessageCircle,
  ChevronRight,
  Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { recommendServices } from "@/ai/flows/ai-service-recommender";

interface Message {
  role: 'user' | 'model';
  content: string;
  actions?: string[];
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpen);
    return () => window.removeEventListener('open-ai-chat', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg = text.trim();
    if (!userMsg || isLoading) return;

    // Captura histórico ANTES de adicionar a nova mensagem
    const currentHistory = messages.map(m => ({ 
      role: m.role, 
      content: m.content 
    }));
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await recommendServices({
        history: currentHistory,
        currentMessage: userMsg
      });

      if (result && result.reply) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: result.reply,
          actions: result.suggestedActions 
        }]);
        
        if (result.shouldRedirect) {
          setShowRedirect(true);
        }
      } else {
        throw new Error("Resposta vazia da IA");
      }
    } catch (error) {
      console.error("Erro no chat IA:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Houve uma pequena oscilação na conexão com nosso estrategista. Poderia repetir ou, se preferir, podemos seguir pelo WhatsApp agora mesmo." 
      }]);
      setShowRedirect(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phone = "5511959631870";
    const text = "Olá! Vim através do diagnóstico da IA no site da Sapient Studio e gostaria de falar com um estrategista.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
        aria-label="Atendimento IA Sapient"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[400px] md:h-[650px] bg-white rounded-none md:rounded-[2.5rem] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-8 duration-500">
      
      {/* Header */}
      <div className="p-6 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline font-black text-xs tracking-tight uppercase leading-none">Estrategista Sapient</h3>
            <p className="text-[7px] font-black text-primary uppercase tracking-[0.4em] mt-1 italic">INTELIGÊNCIA DE MARCA</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="p-6 rounded-[2rem] bg-white border border-slate-200 text-slate-950 font-bold text-sm leading-relaxed shadow-sm animate-in fade-in duration-700">
            Bem-vindo à Sapient Studio. Para iniciarmos sua análise: qual o seu nicho de atuação ou qual desafio você enfrenta hoje?
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-3", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-5 rounded-[2rem] text-sm font-medium leading-relaxed max-w-[85%] shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-slate-950 border border-slate-200 rounded-tl-none"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-2 mt-2 max-w-full animate-in fade-in slide-in-from-left-4 duration-500">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action)}
                    className="px-5 py-3 bg-white border border-slate-300 hover:border-primary hover:text-primary rounded-full text-[9px] font-black uppercase tracking-widest text-slate-950 transition-all shadow-md flex items-center gap-2 group active:scale-95"
                  >
                    {action} <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-500 p-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-[9px] font-black uppercase tracking-widest italic">Analisando Marca...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-6 bg-green-500 hover:bg-green-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] border-b-4 border-green-700 active:translate-y-1 active:border-b-0"
            >
              <MessageCircle className="h-5 w-5" /> Falar com Especialista Humano
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            handleSendMessage(input); 
          }} 
          className="relative"
        >
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Descreva seu desafio aqui..."
            className="h-16 pl-6 pr-16 bg-slate-50 border-slate-200 rounded-2xl text-slate-950 font-bold placeholder:text-slate-300 focus:ring-primary/20 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-50 transition-all hover:scale-110 shadow-lg active:scale-95"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[7px] text-center text-slate-400 font-black uppercase tracking-[0.5em] mt-4">
          SAPIENT STUDIO | INTELIGÊNCIA ESTRATÉGICA
        </p>
      </div>
    </div>
  );
}
