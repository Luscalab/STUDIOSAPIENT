
'use client';

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
  Lock
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
  content: "Protocolo de Estratégia iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação hoje?",
  actions: [
    "Saúde & Bem-estar", 
    "Jurídico & Direito", 
    "Estética & Beleza", 
    "Tecnologia & SaaS", 
    "Varejo & E-commerce",
    "Arquitetura & Design"
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
  const [isTextInputEnabled, setIsTextInputEnabled] = useState(false); // Bloqueado por padrão
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
    setIsTextInputEnabled(false); // Bloqueia durante o processamento

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
          content: "Oscilação detectada. Vamos prosseguir via WhatsApp?" 
        }]);
        setShowRedirect(true);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
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
    const text = `Olá! Concluí meu diagnóstico com a IA Sapient e quero discutir meu plano de ROI.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
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
      
      <div className="px-6 py-5 bg-[#08070b] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center border border-white/10">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline font-black text-[10px] uppercase tracking-widest text-white">Estrategista Sapient</h3>
            <div className="flex gap-1 mt-1">
               {[1,2,3,4,5].map(layer => (
                 <div key={layer} className={cn("h-0.5 w-2 rounded-full", layer <= currentLayer ? "bg-primary" : "bg-white/10")} />
               ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hidden md:flex h-8 w-8 items-center justify-center text-white/50 hover:text-white transition-colors">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="h-8 w-8 flex items-center justify-center text-white/50 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-3", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-4 rounded-[1.5rem] text-[11px] md:text-xs font-bold leading-relaxed max-w-[85%]",
              msg.role === 'user' ? "bg-primary text-white" : "bg-white text-slate-950 border border-slate-200"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => msg.isMultiSelect ? toggleChip(action) : handleSendMessage(action)}
                    className={cn(
                      "px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border",
                      msg.isMultiSelect 
                        ? selectedChips.includes(action) ? "bg-primary text-white border-primary" : "bg-white text-slate-950 border-slate-200"
                        : "bg-white text-slate-950 border-slate-200 hover:border-primary hover:text-primary"
                    )}
                  >
                    {action} {msg.isMultiSelect && selectedChips.includes(action) && <Check className="h-2.5 w-2.5 ml-1" />}
                  </button>
                ))}
                
                {msg.isMultiSelect && selectedChips.length > 0 && (
                  <button onClick={handleConfirmSelection} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg">
                    Confirmar Seleção
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 p-2 animate-pulse">
            <Cpu className="h-3 w-3 animate-spin text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest italic">Analisando Dados...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-4 space-y-4">
            <button onClick={handleWhatsAppRedirect} className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-3 transition-all">
              <MessageCircle className="h-5 w-5" /> CONSULTORIA ESTRATÉGICA <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isTextInputEnabled || isLoading}
            placeholder={isTextInputEnabled ? "Digite o nome da sua empresa..." : "Selecione uma opção acima"}
            className={cn(
              "w-full h-14 pl-6 pr-16 border rounded-2xl text-xs font-bold transition-all",
              isTextInputEnabled ? "bg-white border-slate-200 text-slate-950 focus:ring-4 focus:ring-primary/10" : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            )}
          />
          <button 
            type="submit"
            disabled={!input.trim() || !isTextInputEnabled || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-30 transition-all"
          >
            {isTextInputEnabled ? <Send className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
          </button>
        </form>
        <p className="mt-3 text-[7px] font-black uppercase tracking-[0.5em] text-slate-300 text-center">SAP-IA ENGINE V12.2</p>
      </div>
    </div>
  );
}
