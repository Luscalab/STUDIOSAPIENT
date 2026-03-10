'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { recommendServices, type RecommenderOutput } from "@/ai/flows/ai-service-recommender";

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
    if (scrollRef.current && messages.length > 0) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (userMsg: string) => {
    if (!userMsg.trim() || isLoading) return;

    // Constrói o histórico para a API antes de atualizar o estado local para garantir sincronia
    const currentHistory = messages.map(({ role, content }) => ({ role, content }));
    
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
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Para um diagnóstico preciso sobre como escalar sua marca, recomendo uma conversa com nosso consultor via WhatsApp." 
      }]);
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
        aria-label="Abrir Consultoria IA"
      >
        <Bot className="h-7 w-7" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[420px] md:h-[650px] bg-white rounded-none md:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-muted/20 animate-in slide-in-from-bottom-8 duration-500">
      
      {/* Header Premium */}
      <div className="p-6 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center border border-white/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-headline font-black text-xs tracking-tight uppercase leading-none">Estrategista IA</h3>
            <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em] mt-1 italic">SAPIENT STUDIO</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.length === 0 && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-slate-900 font-medium text-sm leading-relaxed shadow-sm">
            Bem-vindo à Sapient Studio. Sou seu estrategista assistente. Para começarmos o diagnóstico: qual é o seu nicho de atuação ou o principal desafio da sua marca hoje?
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-3", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-5 rounded-[2rem] text-sm font-medium leading-relaxed max-w-[85%] shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-slate-900 border border-slate-200 rounded-tl-none"
            )}>
              {msg.content}
            </div>

            {/* Cards de Ação Rápida - Rendereizados apenas na última mensagem do modelo */}
            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-2 mt-2 max-w-full animate-in fade-in slide-in-from-left-4 duration-500">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:border-primary hover:text-primary rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 transition-all shadow-sm flex items-center gap-2 group"
                  >
                    {action} <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400 p-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest italic">Processando Estratégia...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-6 bg-green-500 hover:bg-green-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] border-b-4 border-green-700"
            >
              <MessageCircle className="h-5 w-5" /> Iniciar Consultoria Humana
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite aqui..."
            className="h-16 pl-6 pr-16 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-primary/20 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-50 transition-all hover:scale-110 shadow-lg"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[8px] text-center text-slate-300 font-black uppercase tracking-[0.3em] mt-3">
          Tecnologia de Prospecção Sapient Studio
        </p>
      </div>
    </div>
  );
}
