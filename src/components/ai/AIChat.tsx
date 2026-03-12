"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle,
  ArrowRight,
  Sparkles,
  Search,
  Zap,
  Check,
  Maximize2,
  Minimize2,
  Lock,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { recommendServices, type RecommenderOutput } from "@/ai/flows/ai-service-recommender";
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
  content: "Olá! Sou o consultor virtual da Sapient. Para eu entender como podemos escalar seu negócio com design e estratégia, com o que você trabalha hoje?",
  actions: [
    "Saúde & Bem-estar", 
    "Jurídico & Direito", 
    "Estética & Beleza", 
    "Varejo & E-commerce",
    "Tecnologia & SaaS", 
    "Imobiliário & Imóveis",
    "Arquitetura & Design",
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
  const [extractedData, setExtractedData] = useState<RecommenderOutput['extractedData']>(undefined);
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

  const saveLead = async (data: any) => {
    if (!db) return;
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        timestamp: serverTimestamp(),
        source: 'Sapient Cognitive Agent V5.0'
      });
    } catch (e) {
      console.error("Erro ao salvar lead:", e);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg = text.trim();
    if (!userMsg || isLoading) return;

    const currentHistoryWithUser = [...messages, { role: 'user', content: userMsg } as Message];
    setMessages(currentHistoryWithUser);
    setInput("");
    setIsLoading(true);
    setSelectedChips([]);
    setIsTextInputEnabled(false);

    const historyForAi = currentHistoryWithUser.map(m => ({ 
      role: m.role, 
      content: m.content 
    }));
    
    try {
      const result = await recommendServices({
        history: historyForAi,
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

        if (result.extractedData) {
          setExtractedData(prev => ({ ...prev, ...result.extractedData }));
        }

        if (result.shouldRedirect) {
          setShowRedirect(true);
          saveLead({
            ...result.extractedData,
            fullConversation: historyForAi.map(h => `${h.role}: ${h.content}`).join('\n')
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Tive um pequeno contratempo técnico ao processar seu diagnóstico. Vamos continuar pelo WhatsApp para eu te dar um atendimento VIP agora?" 
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
    const text = `Olá! Acabei de concluir o diagnóstico estratégico Sapient para meu negócio de ${extractedData?.niche || 'meu setor'}. Gostaria de agendar minha consultoria gratuita para discutir o dossiê.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-4 md:bottom-6 md:right-6 z-[200] h-10 w-10 md:h-14 md:w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
      >
        <Bot className="h-4 w-4 md:h-6 md:w-6" />
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed z-[300] bg-white flex flex-col overflow-hidden border border-slate-200 transition-all duration-500 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.4)]",
      isExpanded 
        ? "inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[800px] md:h-[calc(100vh-120px)] rounded-[2.5rem]" 
        : "bottom-20 right-4 left-4 h-[450px] md:inset-auto md:bottom-24 md:right-6 md:w-[350px] md:h-[600px] rounded-[2.5rem] origin-bottom-right",
      isOpen ? "animate-in slide-in-from-bottom-8" : "hidden"
    )}>
      
      <div className="px-6 py-5 bg-[#08070b] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center border border-white/10 relative shadow-lg">
            <Zap className="h-5 w-5 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-[#08070b]" />
          </div>
          <div>
            <h3 className="font-headline font-black text-[10px] md:text-xs uppercase tracking-widest text-white leading-none">Agente Estratégico</h3>
            <p className="text-[7px] text-white/40 uppercase font-bold mt-1.5 tracking-widest flex items-center gap-1">
              <Sparkles className="h-2 w-2 text-primary" /> Diagnóstico V5.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hidden md:flex h-10 w-10 items-center justify-center text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="h-10 w-10 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-8 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-3", msg.role === 'user' ? "items-end" : "items-start animate-in fade-in slide-in-from-left-2 duration-500")}>
            <div className={cn(
              "p-5 rounded-[1.8rem] text-[11px] md:text-[14px] font-bold leading-relaxed max-w-[85%] shadow-sm",
              msg.role === 'user' ? "bg-primary text-white rounded-tr-none shadow-primary/20" : "bg-white text-slate-900 border border-slate-100 rounded-tl-none"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-2 mt-3 max-w-full">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => msg.isMultiSelect ? toggleChip(action) : handleSendMessage(action)}
                    className={cn(
                      "px-5 py-3 rounded-2xl text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all border shadow-sm",
                      msg.isMultiSelect 
                        ? selectedChips.includes(action) 
                          ? "bg-primary text-white border-primary shadow-lg scale-105" 
                          : "bg-white text-slate-950 border-slate-200 hover:border-primary/50"
                        : "bg-white text-slate-950 border-slate-200 hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95"
                    )}
                  >
                    {action} {msg.isMultiSelect && selectedChips.includes(action) && <Check className="h-3 w-3 ml-2 inline-block" />}
                  </button>
                ))}
                
                {msg.isMultiSelect && (
                  <button 
                    onClick={handleConfirmSelection} 
                    disabled={selectedChips.length === 0}
                    className={cn(
                      "w-full mt-4 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] flex items-center justify-center gap-3 transition-all shadow-xl",
                      selectedChips.length > 0 ? "bg-[#08070b] text-white hover:bg-primary" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    Confirmar Seleção <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400 p-4 animate-pulse bg-white/80 w-fit rounded-2xl px-8 border border-slate-100 shadow-sm">
            <Search className="h-4 w-4 animate-spin text-primary" />
            <span className="text-[9px] font-black uppercase tracking-widest italic">Análise Cognitiva...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-6 animate-in zoom-in slide-in-from-bottom-4 duration-700">
            <div className="bg-primary/5 border border-primary/20 p-8 rounded-[2rem] mb-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                 <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white"><Check className="h-3 w-3" /></div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-primary">Dossiê de Autoridade Pronto</p>
              </div>
              <p className="text-[11px] font-medium text-slate-600 leading-relaxed">Seu diagnóstico estratégico foi consolidado. Fale com um estrategista agora para receber o plano de ação.</p>
            </div>
            <button onClick={handleWhatsAppRedirect} className="w-full py-6 bg-green-500 hover:bg-green-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] flex items-center justify-center gap-4 transition-all shadow-2xl hover:scale-[1.02] active:scale-95">
              <MessageCircle className="h-6 w-6" /> RECEBER DOSSIÊ NO WHATSAPP <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-5 md:p-8 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative group">
          <input 
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isTextInputEnabled || isLoading}
            placeholder={isTextInputEnabled ? "Digite sua resposta estratégica..." : "Aguardando sua escolha estratégica..."}
            className={cn(
              "w-full h-14 md:h-16 pl-8 pr-20 border rounded-2xl md:rounded-3xl text-[11px] md:text-[14px] font-bold transition-all",
              isTextInputEnabled 
                ? "bg-white border-slate-200 text-slate-900 focus:border-primary focus:ring-8 focus:ring-primary/5 shadow-inner" 
                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            )}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
             <button 
              type="submit"
              disabled={!input.trim() || !isTextInputEnabled || isLoading}
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-primary text-white flex items-center justify-center disabled:opacity-30 transition-all shadow-lg hover:bg-primary/90 active:scale-90"
            >
              {isTextInputEnabled ? <Send className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
            </button>
          </div>
        </form>
        <div className="mt-5 flex items-center justify-center gap-6">
          <p className="text-[7px] font-black uppercase tracking-[0.6em] text-slate-300">SAPIENT STRATEGIC INTELLIGENCE V5.0</p>
        </div>
      </div>
    </div>
  );
}
