
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg = text.trim();
    if (!userMsg || isLoading) return;

    const currentHistory = messages.map(m => ({ role: m.role, content: m.content }));
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await recommendServices({
        history: currentHistory,
        currentMessage: userMsg
      });

      if (result) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: result.reply,
          actions: result.suggestedActions 
        }]);
        if (result.shouldRedirect) setShowRedirect(true);
      }
    } catch (error) {
      console.error("Erro no chat IA:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Para um diagnóstico estratégico de alta fidelidade, recomendo iniciarmos sua consultoria via WhatsApp agora." 
      }]);
      setShowRedirect(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phone = "5511959631870";
    const text = "Olá! Gostaria de um diagnóstico estratégico baseado na conversa com a IA da Sapient Studio.";
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
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[380px] md:h-[620px] bg-white rounded-none md:rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-8 duration-500">
      
      <div className="p-5 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center border border-white/10 shadow-lg">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-headline font-black text-[10px] tracking-tight uppercase leading-none">Estrategista Sapient</h3>
            <p className="text-[6px] font-black text-primary uppercase tracking-[0.4em] mt-1 italic">INTELIGÊNCIA DE MARCA</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/30">
        {messages.length === 0 && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold text-xs leading-relaxed shadow-sm animate-in fade-in duration-700">
            Bem-vindo à Sapient Studio. Para iniciarmos seu diagnóstico: qual o nicho do seu negócio ou seu desafio atual?
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-4 rounded-[1.5rem] text-xs font-bold leading-relaxed max-w-[85%] shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-slate-950 border border-slate-200 rounded-tl-none"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-2 mt-1 max-w-full animate-in fade-in slide-in-from-left-4 duration-500">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action)}
                    className="px-4 py-2 bg-white border border-slate-300 hover:border-primary hover:text-primary rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 transition-all shadow-md flex items-center gap-2 group active:scale-95"
                  >
                    {action} <ChevronRight className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 p-2">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest italic">Analisando Marca...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-[1.2rem] font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.02] border-b-4 border-green-700"
            >
              <MessageCircle className="h-4 w-4" /> Falar com Consultor Humano
            </button>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
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
            placeholder="Qual o desafio da sua marca?"
            className="h-14 pl-5 pr-14 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-primary/20 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50 transition-all hover:scale-110 shadow-lg"
          >
            <Send className="h-3 w-3" />
          </button>
        </form>
        <p className="text-[6px] text-center text-slate-400 font-black uppercase tracking-[0.4em] mt-3">
          SAPIENT STUDIO | ESTRATÉGIA COGNITIVA
        </p>
      </div>
    </div>
  );
}
