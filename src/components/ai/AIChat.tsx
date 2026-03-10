
'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2,
  Phone,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [textScale, setTextScale] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Gestão de Acessibilidade: Sincronização de Escala de Fonte
  useEffect(() => {
    const updateScale = () => {
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      setTextScale(rootSize / 16);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Evento Global para abrir o chat de outros componentes
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpen);
    return () => window.removeEventListener('open-ai-chat', handleOpen);
  }, []);

  // Scroll Inteligente: Apenas após novas interações
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
    const updatedHistory: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const result = await recommendServices({
        history: messages,
        currentMessage: userMsg
      });

      if (result) {
        setMessages(prev => [...prev, { role: 'model', content: result.reply }]);
        if (result.shouldRedirect) setShowRedirect(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Houve um lapso na análise técnica. Gostaria de falar diretamente com nosso consultor sênior?" }]);
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
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[450px] md:h-[650px] bg-white rounded-none md:rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-muted/20 animate-in slide-in-from-bottom-12 duration-500">
      
      {/* Header Premium */}
      <div className="p-8 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-xl">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm tracking-tight uppercase leading-none">Estrategista IA</h3>
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">SAPIENT STUDIO</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Área de Diálogo */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50"
        style={{ fontSize: `${textScale}rem` }}
      >
        {messages.length === 0 && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm space-y-4">
              <p className="text-slate-900 font-bold text-lg leading-tight">Seja bem-vindo à Sapient.</p>
              <p className="text-slate-500 font-medium text-sm">Sou o consultor estratégico da casa. Me conte um pouco: o que sua marca faz e qual o seu maior desafio hoje?</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {["Anúncios de Performance", "Branding de Prestígio", "Automação com IA"].map((opt, i) => (
                <button key={i} onClick={() => setInput(opt)} className="p-5 rounded-2xl bg-white border border-slate-200 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-primary/50 hover:text-primary transition-all shadow-sm">
                  {opt}
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
            <span className="text-[10px] font-black uppercase tracking-widest">Processando Inteligência...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-4 animate-in zoom-in duration-500">
            <Button 
              onClick={handleWhatsAppRedirect}
              className="w-full h-16 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3 shadow-xl"
            >
              <MessageCircle className="h-4 w-4" /> Falar com Especialista
            </Button>
          </div>
        )}
      </div>

      {/* Input de Alta Visibilidade */}
      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva seu projeto..."
            className="h-16 pl-6 pr-16 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-primary/20"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[8px] text-center text-slate-300 font-black uppercase tracking-[0.3em] mt-4 italic">Sapient Strategic Engine</p>
      </div>
    </div>
  );
}
