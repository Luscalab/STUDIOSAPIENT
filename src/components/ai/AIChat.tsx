'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Loader2,
  MessageCircle,
  ChevronRight,
  Zap,
  CheckCircle2,
  Target,
  ArrowRight,
  Globe,
  BrainCircuit
} from "lucide-react";
import { cn } from "@/lib/utils";
import { recommendServices, type RecommenderInput, type RecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Message {
  role: 'user' | 'model';
  content: string;
  actions?: string[];
}

const INITIAL_MESSAGE: Message = {
  role: 'model',
  content: "Protocolo Sapient iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e onde você sente que seu negócio mais 'vaza' resultados hoje: em Vendas, na Imagem de Marca ou na Eficiência de Atendimento?",
  actions: ["Saúde / Médicos", "Jurídico / Advogados", "Imobiliário / Imóveis", "Varejo / E-commerce", "Tecnologia / SaaS", "Indústria / B2B"]
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [extractedData, setExtractedData] = useState<RecommenderOutput['extractedData']>(undefined);

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
        source: 'Estrategista IA Sapient V7'
      });
    } catch (e) {
      // Falha silenciosa
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg = text.trim();
    if (!userMsg || isLoading) return;

    const currentHistoryWithUser = [...messages, { role: 'user', content: userMsg } as Message];
    setMessages(currentHistoryWithUser);
    setInput("");
    setIsLoading(true);

    const historyForAi = currentHistoryWithUser.map(m => ({ 
      role: m.role, 
      content: m.content 
    }));
    
    // Simulação de delay estratégico para percepção de análise técnica
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
            actions: result.suggestedActions 
          }]);
          
          if (result.extractedData) {
            setExtractedData(prev => ({ 
              ...prev, 
              ...result.extractedData,
              urgency: result.extractedData?.urgency || prev?.urgency,
              platforms: result.extractedData?.platforms || prev?.platforms,
              goals: result.extractedData?.goals || prev?.goals
            }));
          }

          if (result.shouldRedirect) {
            setShowRedirect(true);
            saveLead({
              niche: result.extractedData?.niche,
              goals: result.extractedData?.goals,
              urgency: result.extractedData?.urgency,
              platforms: result.extractedData?.platforms,
              lastMessage: userMsg,
              fullConversation: historyForAi.map(h => `${h.role}: ${h.content}`).join('\n')
            });
          }
        }
      } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: "Identificamos uma oscilação técnica. Vamos prosseguir via WhatsApp para garantir sua análise personalizada?" 
        }]);
        setShowRedirect(true);
      } finally {
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    const phone = "5511959631870";
    const summary = extractedData ? `[ Diagnóstico V7 | Nicho: ${extractedData.niche} | Pilares: ${extractedData.goals?.join(' + ') || 'Múltiplos'} | Canais: ${extractedData.platforms?.join(', ') || 'Ecossistema Digital'} | Urgência: ${extractedData.urgency?.toUpperCase()} ]` : '';
    const text = `Olá! Finalizei o diagnóstico holístico com o Estrategista IA Sapient. ${summary} Quero discutir meu plano de crescimento integrado.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/20 animate-glow-pulse"
        aria-label="Atendimento IA Sapient"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[300] w-full md:w-[420px] md:h-[720px] bg-white rounded-none md:rounded-[3rem] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-8 duration-500">
      
      <div className="p-8 bg-[#08070b] text-white flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-lg relative">
            <BrainCircuit className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-[#08070b]" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm tracking-tight uppercase leading-none">Estrategista Digital</h3>
            <p className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mt-2 italic flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary animate-ping" /> PROTOCOLO INTEGRADO V7
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col gap-4", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "p-6 rounded-[2.2rem] text-sm md:text-base font-bold leading-relaxed max-w-[90%] shadow-sm animate-in fade-in slide-in-from-bottom-2",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-white text-slate-950 border border-slate-200 rounded-tl-none shadow-md"
            )}>
              {msg.content}
            </div>

            {msg.role === 'model' && msg.actions && msg.actions.length > 0 && i === messages.length - 1 && (
              <div className="flex flex-wrap gap-3 mt-2 max-w-full animate-in fade-in slide-in-from-left-4 duration-500">
                {msg.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action)}
                    className="px-6 py-4 bg-white border border-slate-200 hover:border-primary hover:text-primary rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 transition-all shadow-md flex items-center gap-2 group active:scale-95"
                  >
                    {action} <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-4 text-slate-400 p-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Análise Técnica...</span>
          </div>
        )}

        {showRedirect && (
          <div className="pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-4">
               <div className="flex items-center justify-between">
                 <p className="text-[9px] font-black uppercase tracking-widest text-primary">Dossiê de Ecossistema</p>
                 <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-tighter">SINERGIA MAPEADA</span>
               </div>
               <div className="grid grid-cols-1 gap-3">
                 <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                   <CheckCircle2 className="h-4 w-4 text-primary" /> Nicho: <span className="text-slate-900">{extractedData?.niche || 'Mapeado'}</span>
                 </div>
                 <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                   <Target className="h-4 w-4 text-primary" /> Pilares: <span className="text-slate-900">{extractedData?.goals?.join(' + ') || 'Múltiplos'}</span>
                 </div>
                 <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                   <Globe className="h-4 w-4 text-primary" /> Canais: <span className="text-slate-900">{extractedData?.platforms?.join(', ') || 'Analisados'}</span>
                 </div>
               </div>
            </div>
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-8 bg-green-500 hover:bg-green-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 shadow-2xl transition-all group active:scale-95"
            >
              <MessageCircle className="h-6 w-6" /> FALAR COM ESTRATEGISTA AGORA <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <div className="p-8 bg-white border-t border-slate-100 shrink-0">
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            handleSendMessage(input); 
          }} 
          className="relative"
        >
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Responda ao diagnóstico..."
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
          <p className="text-[8px] font-black uppercase tracking-[0.6em] text-slate-500">ECONSISTEMA INTEGRADO</p>
          <div className="h-1 w-1 rounded-full bg-slate-400" />
          <p className="text-[8px] font-black uppercase tracking-[0.6em] text-slate-500">SAP-IA V7</p>
        </div>
      </div>
    </div>
  );
}
