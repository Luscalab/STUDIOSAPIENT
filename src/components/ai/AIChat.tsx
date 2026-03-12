"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle,
  ArrowRight,
  BrainCircuit,
  Cpu,
  Target,
  Layers,
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
  content: "Olá! Sou o consultor virtual da Sapient. Para eu entender como podemos escalar seu negócio, com o que você trabalha hoje?",
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
  const [currentLayer, setCurrentLayer] = useState(1);
  const [isTextInputEnabled, setIsTextInputEnabled] = useState(false);
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
        source: 'Sapient Engine V12.5'
      });
    } catch (e) {}
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
    
    // Simulação de tempo de processamento para parecer mais humano
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
          setIsTextInputEnabled(result.isTextInputEnabled || false);

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
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: "Tive um pequeno contratempo técnico. Que tal continuarmos essa conversa diretamente pelo WhatsApp para eu te dar total atenção?" 
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
    const text = `Olá! Estava conversando com a IA da Sapient e gostaria de agendar uma consultoria estratégica.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-4 md:bottom-6 md:right-6 z-[200] h-10 w-10 md:h-14 md:w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
        aria-label="Consultor Virtual"
      >
        <Bot className="h-4 w-4 md:h-6 md:w-6" />
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed z-[300] bg-white flex flex-col overflow-hidden border border-slate-200 transition-all duration-500 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.4)]",
      isExpanded 
        ? "inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[800px] md:h-[calc(100vh-120px)] rounded-[2rem]" 
        : "bottom-20 right-4 left-4 h-[450px] md:inset-auto md:bottom-24 md:right-6 md:w-[350px] md:h-[600px] rounded-[2rem] origin-bottom-right",
      isOpen ? "animate-in slide-in-from-bottom-8" : "hidden"
    )}>
      
      {/* Header do Chat */}
      <div className="px-5 py-4 bg-[#08070b] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center border border-white/10 relative">
            <Bot className="h-4 w-4 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-green-500 rounded-full border-2 border-[#08070b]" />
          </div>
          <div>
            <h3 className="font-headline font-black text-[8px] md:text-[10px] uppercase tracking-widest text-white leading-none">Consultor Sapient</h3>
            <p className="text-[6px] text-white/40 uppercase font-bold mt-1 tracking-widest">Online e pronto para ajudar</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hidden md:flex h-8 w-8 items-center justify-center text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="h-8 w-8 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 md:p-8 space-y-4 md:space-y-6 bg-slate-50/30">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start animate-in fade-in slide-in-from-left-2")}>
            <div className={cn(
              "p-4 rounded-[1.4rem] text-[10px] md:text-sm font-bold leading-relaxed max-w-[85%] shadow-sm",
              msg.role === 'user' ? "bg-primary text-white rounded-tr-none" : "bg-white text-slate-900 border border-slate-100 rounded-tl-none"
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
                      "px-4 py-2.5 rounded-full text-[8px] md:text-[9.5px] font-black uppercase tracking-widest transition-all border",
                      msg.isMultiSelect 
                        ? selectedChips.includes(action) ? "bg-primary text-white border-primary shadow-lg scale-105" : "bg-white text-slate-950 border-slate-200"
                        : "bg-white text-slate-950 border-slate-200 hover:border-primary hover:text-primary hover:bg-primary/5 shadow-sm"
                    )}
                  >
                    {action} {msg.isMultiSelect && selectedChips.includes(action) && <Check className="h-2 w-2 ml-1" />}
                  </button>
                ))}
                
                {msg.isMultiSelect && (
                  <button 
                    onClick={handleConfirmSelection} 
                    disabled={selectedChips.length === 0}
                    className={cn(
                      "w-full mt-3 py-3 rounded-xl font-black uppercase tracking-widest text-[8px] md:text-[9px] flex items-center justify-center gap-2 transition-all",
                      selectedChips.length > 0 ? "bg-primary text-white shadow-xl hover:bg-primary/90" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    Confirmar Seleção <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 p-2 animate-pulse bg-white/50 w-fit rounded-full px-4 border border-slate-100">
            <Cpu className="h-3 w-3 animate-spin text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest italic">Analisando contexto...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-4 animate-in zoom-in duration-500">
            <button onClick={handleWhatsAppRedirect} className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-[1.02] active:scale-95">
              <MessageCircle className="h-5 w-5" /> FALAR COM ESTRATEGISTA <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Rodapé de Input */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative group">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isTextInputEnabled || isLoading}
            placeholder={isTextInputEnabled ? "Digite aqui..." : "Selecione uma opção acima"}
            className={cn(
              "w-full h-12 pl-6 pr-16 border rounded-2xl text-[10px] md:text-sm font-bold transition-all",
              isTextInputEnabled 
                ? "bg-white border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/5" 
                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            )}
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
             <button 
              type="submit"
              disabled={!input.trim() || !isTextInputEnabled || isLoading}
              className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-30 transition-all shadow-md hover:bg-primary/90 active:scale-90"
            >
              {isTextInputEnabled ? <Send className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
            </button>
          </div>
        </form>
        <div className="mt-3 flex items-center justify-center gap-4">
          <p className="text-[6px] font-black uppercase tracking-[0.4em] text-slate-300">Inteligência Sapient V12.5</p>
          <div className="h-1 w-1 bg-slate-200 rounded-full" />
          <p className="text-[6px] font-black uppercase tracking-[0.4em] text-slate-300">Fim da Transmissão</p>
        </div>
      </div>
    </div>
  );
}
