'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle,
  ChevronRight,
  ArrowRight,
  BrainCircuit,
  Cpu,
  Target,
  Layers,
  Zap,
  Check,
  Maximize2,
  Minimize2
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
  content: "Protocolo de Estratégia iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e qual seu principal desafio hoje?",
  actions: [
    "Saúde & Bem-estar", 
    "Jurídico & Direito", 
    "Estética & Beleza", 
    "Pet Shop & Veterinária", 
    "Tecnologia & SaaS", 
    "Varejo & E-commerce",
    "Arquitetura & Design",
    "Fotografia & Vídeo",
    "Moda & Acessórios",
    "Agro & Negócios Rurais"
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
  const [currentLayer, setCurrentLayer] = useState(1);
  const [extractedData, setExtractedData] = useState<RecommenderOutput['extractedData']>(undefined);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const db = useFirestore();
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

  const saveLead = async (data: any) => {
    if (!db) return;
    try {
      addDoc(collection(db, 'leads'), {
        ...data,
        timestamp: serverTimestamp(),
        source: 'Sapient Engine V12'
      });
    } catch (e) {
      // Fail silently
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

    const historyForAi = currentHistoryWithUser.map(m => ({ 
      role: m.role, 
      content: m.content 
    }));
    
    setTimeout(async () => {
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
          
          setCurrentLayer(result.currentLayer || currentLayer);

          if (result.extractedData) {
            setExtractedData(prev => ({ 
              ...prev, 
              ...result.extractedData
            }));
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
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: "Identificamos uma oscilação na sincronização. Vamos prosseguir via WhatsApp para garantir sua análise personalizada?" 
        }]);
        setShowRedirect(true);
      } finally {
        setIsLoading(false);
      }
    }, 1200);
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
    const summary = extractedData ? `[ Nicho: ${extractedData.niche} | Gargalos: ${extractedData.mainPainPoints?.join(', ')} ]` : '';
    const text = `Olá! Concluí meu diagnóstico de ecossistema com a IA Sapient. ${summary} Quero discutir meu plano de ROI com um estrategista.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
        aria-label="Diagnóstico Estratégico IA"
      >
        <Bot className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed z-[300] bg-white flex flex-col overflow-hidden border border-slate-200 transition-all duration-500 ease-in-out shadow-[0_40px_100px_-15px_rgba(0,0,0,0.4)]",
      isExpanded 
        ? "inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[800px] md:h-[calc(100vh-120px)] rounded-[2.5rem]" 
        : "inset-0 md:inset-auto md:bottom-24 md:right-6 w-full md:w-[400px] md:h-[650px] rounded-none md:rounded-[2.5rem]",
      isOpen ? "animate-in slide-in-from-bottom-8" : "hidden"
    )}>
      
      {/* Header Compacto */}
      <div className="px-6 py-5 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center border border-white/10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-spin duration-[15s] opacity-40" />
            <BrainCircuit className="h-5 w-5 text-white relative z-10" />
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-[#08070b]" />
          </div>
          <div>
            <h3 className="font-headline font-black text-xs tracking-tight uppercase leading-none text-white">Estrategista IA</h3>
            <div className="flex items-center gap-2 mt-1.5">
               <span className="text-[7px] font-black text-primary uppercase tracking-[0.4em] italic">V12 Engine</span>
               <div className="flex gap-0.5">
                 {[1,2,3,4,5].map(layer => (
                   <div key={layer} className={cn("h-0.5 w-1.5 rounded-full transition-all duration-700", layer <= currentLayer ? "bg-primary w-3" : "bg-white/10")} />
                 ))}
               </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="hidden md:flex h-10 w-10 rounded-full bg-white/5 items-center justify-center hover:bg-white/10 transition-colors text-white"
            title={isExpanded ? "Minimizar" : "Zoom"}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button 
            onClick={() => { setIsOpen(false); setIsExpanded(false); }} 
            className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mensagens Reduzidas */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-4 rounded-[1.8rem] text-xs md:text-sm font-bold leading-relaxed max-w-[85%] shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-slate-950 border border-slate-200 rounded-tl-none"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-2 mt-1 max-w-full">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => msg.isMultiSelect ? toggleChip(action) : handleSendMessage(action)}
                    className={cn(
                      "px-4 py-3 rounded-full text-[8px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 border",
                      msg.isMultiSelect 
                        ? selectedChips.includes(action) 
                          ? "bg-primary text-white border-primary" 
                          : "bg-white text-slate-950 border-slate-200 hover:border-primary/50"
                        : "bg-white text-slate-950 border-slate-200 hover:border-primary hover:text-primary"
                    )}
                  >
                    {action} 
                    {msg.isMultiSelect && selectedChips.includes(action) && <Check className="h-2.5 w-2.5" />}
                  </button>
                ))}
                
                {msg.isMultiSelect && selectedChips.length > 0 && (
                  <button
                    onClick={handleConfirmSelection}
                    className="w-full mt-2 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[8px] flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-all"
                  >
                    Confirmar Seleção <Send className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400 p-2 animate-pulse">
            <Cpu className="h-4 w-4 animate-spin text-primary" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] italic">Analisando...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="p-6 rounded-[2rem] bg-white border border-primary/20 space-y-4 shadow-xl relative overflow-hidden">
               <p className="text-[8px] font-black uppercase tracking-[0.5em] text-primary">Diagnóstico Concluído</p>
               <div className="space-y-3 relative z-10">
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                   <Target className="h-3.5 w-3.5 text-primary" />
                   <div>
                     <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">Setor</p>
                     <p className="text-[10px] font-bold text-slate-950 uppercase">{extractedData?.niche || 'Mapeado'}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                   <Layers className="h-3.5 w-3.5 text-primary" />
                   <div>
                     <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">Sinergia Sugerida</p>
                     <p className="text-[10px] font-bold text-slate-950 uppercase">{extractedData?.servicesNeeded?.join(' + ') || 'Ecossistema Sapient'}</p>
                   </div>
                 </div>
               </div>
            </div>

            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-6 bg-green-500 hover:bg-green-600 text-white rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-[9px] flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="h-5 w-5" /> CONSULTORIA HUMANA <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Input Compacto */}
      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Sua resposta..."
            className="w-full h-14 pl-6 pr-16 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm font-bold text-slate-950 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-4 text-[7px] font-black uppercase tracking-[0.6em] text-slate-300 text-center">SAP-IA PROTOCOL V12.1</p>
      </div>
    </div>
  );
}