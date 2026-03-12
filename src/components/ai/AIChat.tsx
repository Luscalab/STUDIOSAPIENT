"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle,
  ArrowRight,
  Zap,
  Check,
  Maximize2,
  Minimize2,
  Lock,
  ChevronRight,
  Loader2,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { recommendServices } from "@/ai/flows/ai-service-recommender";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Message {
  role: 'user' | 'model';
  content: string;
  actions?: string[];
  isMultiSelect?: boolean;
}

const INITIAL_MESSAGE: Message = {
  role: 'model',
  content: "Olá! Para a gente começar, qual é a sua área de atuação hoje?",
  actions: [
    "Saúde (Médico/Clínica)", 
    "Direito (Advocacia)", 
    "Estética / Beleza", 
    "Vendas / Loja",
    "Tecnologia / Software", 
    "Imóveis / Arquitetura",
    "Serviços (Geral)",
    "Outros"
  ],
  isMultiSelect: false
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [isTextInputEnabled, setIsTextInputEnabled] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const db = useFirestore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (isTextInputEnabled && !isLoading) {
      inputRef.current?.focus();
    }
  }, [messages, isLoading, isTextInputEnabled]);

  const saveLead = async (history: any[]) => {
    if (!db) return;
    try {
      await addDoc(collection(db, 'leads'), {
        conversation: history.map(h => `${h.role}: ${h.content}`).join('\n'),
        timestamp: serverTimestamp(),
        source: 'Chat Inteligente (Plano de Negócio)'
      });
    } catch (e) {
      console.error("Erro ao salvar contato:", e);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg = text.trim();
    if (!userMsg || isLoading) return;

    const currentHistory = [...messages, { role: 'user', content: userMsg } as Message];
    setMessages(currentHistory);
    setInput("");
    setIsLoading(true);
    setSelectedChips([]);
    setIsTextInputEnabled(false);

    try {
      // Simulação de tempo de resposta instantânea para fluxo determinístico
      const result = await recommendServices({
        history: currentHistory.map(m => ({ role: m.role, content: m.content })),
        currentMessage: userMsg
      });

      if (result) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: result.reply,
          actions: result.suggestedActions,
          isMultiSelect: result.isMultiSelect
        }]);
        
        setIsTextInputEnabled(result.isTextInputEnabled);

        if (result.shouldRedirect) {
          setShowRedirect(true);
          saveLead(currentHistory);
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Opa, tive um probleminha técnico. Vamos continuar pelo WhatsApp?" 
      }]);
      setShowRedirect(true);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChip = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleConfirmSelection = () => {
    if (selectedChips.length === 0) return;
    handleSendMessage(selectedChips.join(", "));
  };

  const handleWhatsAppRedirect = () => {
    const phone = "5511959631870";
    const text = `Olá! Acabei de preencher as informações no chat do site e quero falar sobre meu negócio.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-4 md:bottom-6 md:right-6 z-[200] h-14 w-14 md:h-18 md:w-18 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_20px_50px_rgba(139,92,246,0.3)] hover:scale-110 active:scale-95 transition-all border-2 border-white/20 animate-glow-pulse"
        aria-label="Abrir Consultoria"
      >
        <div className="relative">
          <Zap className="h-7 w-7 md:h-8 md:w-8 relative z-10" />
          <div className="absolute inset-0 bg-white blur-md opacity-20 animate-pulse" />
        </div>
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed z-[300] bg-white flex flex-col overflow-hidden border border-slate-200 transition-all duration-500 shadow-2xl",
      isExpanded 
        ? "inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[800px] md:h-[calc(100vh-120px)] rounded-[2rem]" 
        : "bottom-20 right-4 left-4 h-[500px] md:inset-auto md:bottom-24 md:right-6 md:w-[380px] md:h-[650px] rounded-[2.5rem] origin-bottom-right",
      isOpen ? "animate-in slide-in-from-bottom-8" : "hidden"
    )}>
      
      <div className="px-6 py-5 bg-[#08070b] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline font-black text-[10px] uppercase tracking-widest text-white leading-none">Consultor Sapient</h3>
            <p className="text-[7px] text-white/40 uppercase font-bold mt-1 tracking-[0.2em]">Raio-X de Performance</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hidden md:flex h-10 w-10 items-center justify-center text-white/50 hover:text-white transition-colors">
            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="h-10 w-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-4 rounded-2xl text-sm font-bold leading-relaxed max-w-[85%]",
              msg.role === 'user' ? "bg-primary text-white rounded-tr-none shadow-md" : "bg-white text-slate-900 border border-slate-100 rounded-tl-none shadow-sm"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => msg.isMultiSelect ? toggleChip(action) : handleSendMessage(action)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shadow-sm",
                      msg.isMultiSelect 
                        ? selectedChips.includes(action) 
                          ? "bg-primary text-white border-primary" 
                          : "bg-white text-slate-950 border-slate-200"
                        : "bg-white text-slate-950 border-slate-200 hover:border-primary hover:text-primary active:scale-95"
                    )}
                  >
                    {action} {msg.isMultiSelect && selectedChips.includes(action) && <Check className="h-3 w-3 ml-1 inline-block" />}
                  </button>
                ))}
                
                {msg.isMultiSelect && (
                  <button 
                    onClick={handleConfirmSelection} 
                    disabled={selectedChips.length === 0}
                    className={cn(
                      "w-full mt-2 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all",
                      selectedChips.length > 0 ? "bg-[#08070b] text-white shadow-xl" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    Confirmar Opções <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-[9px] font-black uppercase tracking-widest">Processando Dados...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-4 animate-in zoom-in duration-500">
            <button onClick={handleWhatsAppRedirect} className="w-full py-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)]">
              <MessageCircle className="h-6 w-6" /> FALAR COM ESTRATEGISTA <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative">
          <input 
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isTextInputEnabled || isLoading}
            placeholder={isTextInputEnabled ? "Escreva aqui..." : "Escolha uma opção acima..."}
            className={cn(
              "w-full h-14 pl-6 pr-16 border rounded-2xl text-sm font-bold transition-all",
              isTextInputEnabled 
                ? "bg-white border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10" 
                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            )}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
             <button 
              type="submit"
              disabled={!input.trim() || !isTextInputEnabled || isLoading}
              className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-30 transition-all shadow-lg active:scale-90"
            >
              {isTextInputEnabled ? <Send className="h-5 w-5" /> : <Lock size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
