"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  X, 
  SendHorizontal,
  ArrowRight,
  Search,
  Activity,
  Target,
  Zap,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  TrendingUp
} from "lucide-react";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { cn } from "@/lib/utils";

const STRATEGIC_PATHS = [
  { 
    label: "Dominar Buscas Locais (Google Ads)", 
    icon: <Target className="h-4 w-4" />, 
    prompt: "Gostaria de um diagnóstico para dominar as buscas locais no Google e atrair leads de urgência." 
  },
  { 
    label: "Criar Autoridade Visual (Design)", 
    icon: <ShieldCheck className="h-4 w-4" />, 
    prompt: "Minha marca parece amadora perto da minha expertise. Como o design estratégico pode elevar meu preço?" 
  },
  { 
    label: "Escalar Atendimento (IA Chat)", 
    icon: <Zap className="h-4 w-4" />, 
    prompt: "Perco leads por demora no atendimento. Como implementar um ecossistema de IA que qualifica leads 24/7?" 
  },
  { 
    label: "Posicionamento Social (Gestão)", 
    icon: <TrendingUp className="h-4 w-4" />, 
    prompt: "Preciso de uma curadoria de conteúdo que me posicione como líder de nicho, não apenas mais um perfil no Instagram." 
  },
];

export function AIChat() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServiceRecommenderOutput | null>(null);
  
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { 
      role: 'assistant', 
      text: "Bem-vindo à Sapient Studio. Sou seu Estrategista IA. Minha missão é auditar o seu posicionamento e identificar o 'Gargalo de Ouro' que impede sua escala hoje. Como posso iniciar seu diagnóstico estratégico?" 
    }
  ]);
  
  const [textScale, setTextScale] = useState(1); 
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lógica de Scroll: Só atua quando novas mensagens chegam, não na abertura.
  useEffect(() => {
    if (scrollRef.current && isOpen && chatHistory.length > 1) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, loading, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const handleQuickAction = (pathPrompt: string) => {
    handleSubmit(undefined, pathPrompt);
  };

  const handleZoomIn = () => setTextScale(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setTextScale(prev => Math.max(prev - 0.1, 0.9));

  const handleSubmit = async (e?: React.FormEvent, directInput?: string) => {
    e?.preventDefault();
    const messageToSend = directInput || input;
    if (!messageToSend.trim() || loading) return;
    
    const newUserMessage = { role: 'user' as const, text: messageToSend };
    const updatedHistory = [...chatHistory, newUserMessage];
    
    setChatHistory(updatedHistory);
    setInput("");
    setLoading(true);
    setResult(null);
    
    try {
      // Constrói o contexto em string para a API incluindo a mensagem atual
      const contextString = updatedHistory
        .slice(-6)
        .map(m => `${m.role === 'user' ? 'Cliente' : 'Sapient'}: ${m.text}`)
        .join('\n');

      const recommendation = await recommendServices({ clientNeedsAndGoals: contextString });
      
      if (!recommendation) {
        setChatHistory(prev => [...prev, { role: 'assistant', text: "Ocorreu uma falha técnica na análise. Por favor, tente novamente." }]);
        setLoading(false);
        return;
      }

      setResult(recommendation);
      
      if (!recommendation.isDataSufficient) {
        setChatHistory(prev => [...prev, { role: 'assistant', text: recommendation.missingInfoMessage || "Entendido. Para avançarmos, conte-me mais sobre seu nicho ou desafio atual." }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', text: "Diagnóstico estratégico processado com sucesso. Analise seu dossiê de autoridade abaixo:" }]);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'assistant', text: "Entendido. Me conte um pouco mais sobre o seu nicho para que eu possa aplicar nossa Matriz de Alavancagem." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Estrategista IA"
        className={cn(
          "fixed bottom-6 right-6 z-[100] h-16 w-16 rounded-full flex items-center justify-center transition-all duration-1000 hover:scale-110 active:scale-95 border-2 border-white/40 backdrop-blur-3xl group overflow-hidden shadow-2xl",
          isOpen ? "bg-[#08070b] rotate-90" : "bg-primary animate-glow-pulse"
        )}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Sparkles className="h-6 w-6 text-white animate-pulse" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-4 z-[100] w-[calc(100vw-2rem)] md:w-[480px] h-[80vh] md:max-h-[800px] bg-white rounded-[2.5rem] border border-primary/20 shadow-[0_40px_120px_rgba(0,0,0,0.5)] transition-all duration-700 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 visible" : "scale-0 opacity-0 invisible"
        )}
        role="dialog"
      >
        {/* Header */}
        <div className="p-6 bg-[#0c0a1a] text-white shrink-0 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-white/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline font-black text-[10px] tracking-widest uppercase text-white leading-none">Estrategista IA</h3>
                <p className="text-[7px] font-bold text-white/40 uppercase tracking-widest mt-1">SAPIENT ENGINE v6.0</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
              <button onClick={handleZoomOut} className="h-7 w-7 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60"><Minus className="h-3 w-3" /></button>
              <button onClick={handleZoomIn} className="h-7 w-7 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60"><Plus className="h-3 w-3" /></button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fdfdff]"
          style={{ fontSize: `${textScale}rem` }}
        >
          {chatHistory.map((msg, i) => (
            <div key={i} className="space-y-6 animate-in fade-in duration-500">
              <div className={cn("flex flex-col gap-2 max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "items-start")}>
                <div 
                  className={cn(
                    "p-5 rounded-[2rem] font-medium leading-relaxed shadow-sm", 
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border border-slate-100 text-slate-900 rounded-tl-none shadow-md"
                  )} 
                >
                  {msg.text}
                </div>
                <span className="text-[0.6em] font-black uppercase tracking-widest text-slate-400">
                  {msg.role === 'user' ? 'SOLICITANTE' : 'CONSULTOR SAPIENT'}
                </span>
              </div>

              {/* Menu Inicial */}
              {i === 0 && chatHistory.length === 1 && !loading && (
                <div className="bg-primary/[0.03] p-6 rounded-[2.5rem] border border-primary/10 animate-in zoom-in-95 duration-700 delay-300">
                  <p className="text-[0.6em] font-black text-primary uppercase tracking-[0.3em] mb-5 text-center">Inicie seu diagnóstico técnico:</p>
                  <div className="grid grid-cols-1 gap-3">
                    {STRATEGIC_PATHS.map((path, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleQuickAction(path.prompt)} 
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary hover:shadow-md transition-all text-left group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          {path.icon}
                        </div>
                        <span className="text-[0.65em] font-black uppercase tracking-wider text-slate-700 group-hover:text-primary leading-tight flex-1">
                          {path.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Dossiê Final */}
          {result?.isDataSufficient && (
            <div className="space-y-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {result.brandAudit && (
                <div className="space-y-4">
                  <p className="text-[0.65em] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Search className="h-4 w-4" /> Análise de Marca</p>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-slate-700 italic text-[0.85em]">
                    "{result.brandAudit}"
                  </div>
                </div>
              )}
              
              {result.diagnosis && (
                <div className="space-y-4">
                  <p className="text-[0.65em] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Activity className="h-4 w-4" /> Diagnóstico Sapient</p>
                  <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 font-black text-slate-900 leading-snug text-[0.9em]">
                    {result.diagnosis}
                  </div>
                </div>
              )}

              <Button 
                className="w-full h-16 bg-[#0c0a1a] text-white hover:bg-primary rounded-2xl font-black uppercase tracking-widest text-[0.7em] transition-all group" 
                onClick={() => { setIsOpen(false); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Agendar Consultoria <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-4 bg-white p-4 rounded-full w-fit shadow-md border border-slate-100 animate-pulse">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <p className="text-[0.6em] font-black uppercase tracking-widest text-primary">Auditoria Sapient em curso...</p>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-slate-100 bg-white">
          <div className="relative">
            <Textarea
              placeholder="Descreva seu desafio técnico..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="min-h-[100px] bg-slate-50 border-slate-200 focus:border-primary focus:ring-0 rounded-[2rem] p-6 pr-16 text-slate-900 font-medium resize-none transition-all placeholder:text-slate-400 text-base"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()} 
              className="absolute bottom-5 right-5 h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center disabled:opacity-20 shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <SendHorizontal className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
