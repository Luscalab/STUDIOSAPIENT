'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2,
  MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { recommendServices } from "@/ai/flows/ai-service-recommender";

interface Message {
  role: 'user' | 'model';
  content: string;
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
    if (scrollRef.current && messages.length > 0) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    
    // Captura o histórico atual para enviar à API
    const currentHistory = [...messages];
    
    // Atualiza a UI localmente de forma imediata
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const result = await recommendServices({
        history: currentHistory,
        currentMessage: userMsg
      });

      if (result) {
        setMessages(prev => [...prev, { role: 'model', content: result.reply }]);
        if (result.shouldRedirect) setShowRedirect(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Excelente visão. Vamos aprofundar os detalhes técnicos via WhatsApp?" }]);
      setShowRedirect(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phone = "5511959631870";
    const text = "Olá! Gostaria de um diagnóstico estratégico para minha marca baseado na conversa com a IA da Sapient.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
        aria-label="Consultoria IA"
      >
        <Bot className="h-7 w-7" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[420px] md:h-[600px] bg-white rounded-none md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-muted/20 animate-in slide-in-from-bottom-8 duration-500">
      
      {/* Header Limpo */}
      <div className="p-6 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center border border-white/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-headline font-black text-xs tracking-tight uppercase leading-none">Estrategista IA</h3>
            <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em] mt-1">SAPIENT STUDIO</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Área de Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        {messages.length === 0 && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-slate-900 font-medium text-sm leading-relaxed shadow-sm">
            Bem-vindo à Sapient. Me conte um pouco sobre sua marca ou o desafio que você enfrenta hoje.
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
            <div className={cn(
              "p-4 rounded-2xl text-sm font-medium leading-relaxed",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none shadow-md" 
                : "bg-white text-slate-900 border border-slate-200 rounded-tl-none shadow-sm"
            )}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 p-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span className="text-[9px] font-black uppercase tracking-widest">Sincronizando Inteligência...</span>
          </div>
        )}

        {showRedirect && (
          <button 
            onClick={handleWhatsAppRedirect}
            className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" /> Iniciar Consultoria Humana
          </button>
        )}
      </div>

      {/* Input de Alta Fidelidade */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva seu negócio..."
            className="h-14 pl-5 pr-14 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-primary/20"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
