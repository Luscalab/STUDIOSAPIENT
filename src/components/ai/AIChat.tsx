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
  BarChart3,
  CheckCircle2,
  Target,
  Layers,
  Sparkles,
  Zap,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { recommendServices, type RecommenderInput, type RecommenderOutput } from "@/ai/flows/ai-service-recommender";
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
  content: "Protocolo de Estratégia iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e qual seu principal desafio hoje: Vendas, Imagem de Marca ou Eficiência de Processos?",
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
    const summary = extractedData ? `[ Nicho: ${extractedData.niche} | Gargalos: ${extractedData.mainPainPoints?.join(', ')} | Plataformas: ${extractedData.platforms?.join(', ')} ]` : '';
    const text = `Olá! Concluí meu diagnóstico de ecossistema com a IA Sapient. ${summary} Quero discutir meu plano de ROI com um estrategista.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
        aria-label="Diagnóstico Estratégico IA"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[440px] md:h-[780px] bg-white rounded-none md:rounded-[3rem] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-8 duration-500">
      
      {/* Header V12 */}
      <div className="p-8 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-spin duration-[10s] opacity-50" />
            <BrainCircuit className="h-6 w-6 text-white relative z-10" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-[#08070b]" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm tracking-tight uppercase leading-none text-white">Estrategista IA</h3>
            <div className="flex items-center gap-3 mt-2">
               <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] italic">Estratégia V12</span>
               <div className="flex gap-1">
                 {[1,2,3,4,5].map(layer => (
                   <div key={layer} className={cn("h-1 w-2 rounded-full transition-all duration-700", layer <= currentLayer ? "bg-primary w-4" : "bg-white/10")} />
                 ))}
               </div>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-6 rounded-[2.2rem] text-sm md:text-base font-bold leading-relaxed max-w-[90%] shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-slate-950 border border-slate-200 rounded-tl-none shadow-md"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-3 mt-2 max-w-full">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => msg.isMultiSelect ? toggleChip(action) : handleSendMessage(action)}
                    className={cn(
                      "px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2 group active:scale-95 border",
                      msg.isMultiSelect 
                        ? selectedChips.includes(action) 
                          ? "bg-primary text-white border-primary" 
                          : "bg-white text-slate-950 border-slate-200 hover:border-primary/50"
                        : "bg-white text-slate-950 border-slate-200 hover:border-primary hover:text-primary"
                    )}
                  >
                    {action} 
                    {msg.isMultiSelect && selectedChips.includes(action) && <Check className="h-3 w-3" />}
                    {!msg.isMultiSelect && <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />}
                  </button>
                ))}
                
                {msg.isMultiSelect && selectedChips.length > 0 && (
                  <button
                    onClick={handleConfirmSelection}
                    className="w-full mt-4 py-6 bg-primary text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl hover:bg-primary/90 transition-all"
                  >
                    Confirmar Seleção <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-4 text-slate-400 p-4 animate-pulse">
            <Cpu className="h-5 w-5 animate-spin text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Analizando Ecossistema...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="p-8 rounded-[2.5rem] bg-white border-2 border-primary/20 space-y-6 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                 <Target className="h-16 w-16 text-primary" />
               </div>
               
               <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Sumário de Autoridade</p>

               <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                   <Target className="h-4 w-4 text-primary" />
                   <div>
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Setor Mapeado</p>
                     <p className="text-xs font-bold text-slate-950 uppercase">{extractedData?.niche || 'Mapeado'}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                   <Layers className="h-4 w-4 text-primary" />
                   <div>
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Ecossistema Sugerido</p>
                     <p className="text-xs font-bold text-slate-950 uppercase">{extractedData?.servicesNeeded?.join(' + ') || 'Solução Integrada'}</p>
                   </div>
                 </div>

                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                   <Zap className="h-4 w-4 text-primary" />
                   <div>
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Gargalos de ROI</p>
                     <p className="text-xs font-bold text-slate-950 uppercase">{extractedData?.mainPainPoints?.join(', ') || 'Identificados'}</p>
                   </div>
                 </div>
               </div>
            </div>

            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-8 bg-green-500 hover:bg-green-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(34,197,94,0.3)] transition-all group active:scale-95"
            >
              <MessageCircle className="h-6 w-6" /> ATIVAR CONSULTORIA HUMANA <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Responda ao estrategista..."
            className="w-full h-20 pl-8 pr-20 bg-slate-50 border border-slate-200 rounded-[1.8rem] text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-inner transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 shadow-xl active:scale-95"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center gap-6 opacity-30">
          <p className="text-[8px] font-black uppercase tracking-[0.6em] text-slate-500">SAP-IA ENGINE V12</p>
          <div className="h-1 w-1 rounded-full bg-slate-400" />
          <p className="text-[8px] font-black uppercase tracking-[0.6em] text-slate-500">RESPOSTAS MÚLTIPLAS ATIVAS</p>
        </div>
      </div>
    </div>
  );
}
