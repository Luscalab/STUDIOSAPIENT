'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  Loader2,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { recommendServices } from "@/ai/flows/ai-service-recommender";
import { Badge } from "@/components/ui/badge";

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
  const [textScale, setTextScale] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Monitora o evento global de escala de acessibilidade
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const fontSize = parseFloat(root.style.fontSize) || 16;
      setTextScale(fontSize / 16);
    });
    observer.observe(root, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpen);
    return () => window.removeEventListener('open-ai-chat', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const result = await recommendServices({
        history: messages,
        currentMessage: userMessage
      });

      if (result) {
        setMessages(prev => [...prev, { role: 'model', content: result.reply }]);
        if (result.shouldRedirect) setShowRedirect(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Houve um erro no processamento. Que tal falarmos diretamente pelo WhatsApp?" }]);
      setShowRedirect(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phone = "5511959631870";
    const text = "Olá! Vim do chat da Sapient e gostaria de uma consultoria estratégica.";
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
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[450px] md:h-[700px] bg-white rounded-none md:rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-muted/20 animate-in slide-in-from-bottom-12 duration-500">
      
      {/* Header */}
      <div className="p-8 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-xl">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm tracking-tight uppercase leading-none">Consultoria IA</h3>
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">SAPIENT STUDIO</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50"
        style={{ fontSize: `${textScale}rem` }}
      >
        {messages.length === 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm space-y-4">
              <p className="text-slate-900 font-bold text-lg leading-tight">Olá, sou o consultor estratégico da Sapient.</p>
              <p className="text-slate-500 font-medium text-sm">Me conte um pouco sobre sua marca e qual o seu principal objetivo hoje. Como posso impulsionar seu negócio?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                "Quero escalar minhas vendas com anúncios",
                "Preciso de um design que transmita valor",
                "Quero saber como a IA ajuda meu negócio",
                "Quero falar com um consultor humano"
              ].map((suggestion, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setInput(suggestion); }}
                  className="p-5 rounded-2xl bg-white border border-slate-200 text-left text-xs font-black uppercase tracking-widest text-slate-400 hover:border-primary/50 hover:text-primary transition-all shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
            <div className={cn(
              "p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-slate-900 border border-slate-200 rounded-tl-none"
            )}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400 animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest">Analisando sua marca...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-6 animate-in zoom-in duration-500">
            <Button 
              onClick={handleWhatsAppRedirect}
              className="w-full h-16 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3 shadow-xl shadow-green-500/20"
            >
              <Phone className="h-4 w-4" /> Falar no WhatsApp Oficial
            </Button>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite aqui..."
            className="h-16 pl-6 pr-16 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-300 focus:ring-primary/20"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[8px] text-center text-slate-300 font-bold uppercase tracking-[0.3em] mt-4">Powered by Sapient Intelligence</p>
      </div>
    </div>
  );
}
