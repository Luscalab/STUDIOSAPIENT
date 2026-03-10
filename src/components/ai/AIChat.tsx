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
  Shirt,
  Stethoscope,
  Home,
  Scissors,
  ClipboardCheck,
  Sparkles,
  Plus,
  Minus,
  TrendingUp
} from "lucide-react";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { cn } from "@/lib/utils";

const QUICK_NICHES = [
  { label: "Moda / Varejo", icon: <Shirt className="h-4 w-4" />, prompt: "Minha loja de calçados premium chama 'Elite Walk' e precisamos vender mais via anúncios." },
  { label: "Saúde / Clínicas", icon: <Stethoscope className="h-4 w-4" />, prompt: "Sou da 'Clínica Sorriso' e queremos ser a primeira opção de implantes no Google Maps." },
  { label: "Imobiliária", icon: <Home className="h-4 w-4" />, prompt: "Sou da 'Terra Viva Imóveis' e nossos leads vêm desqualificados. Como a IA ajuda?" },
  { label: "Nails / Estética", icon: <Scissors className="h-4 w-4" />, prompt: "Sou a 'Dra. Estética' e preciso de um feed que transmita luxo para cobrar o valor justo." },
];

export function AIChat() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServiceRecommenderOutput | null>(null);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [textScale, setTextScale] = useState(1); 
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [result, loading, chatHistory, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const handleQuickNiche = (nichePrompt: string) => {
    setInput(nichePrompt);
    // Submit automático opcional ou deixar o usuário editar
  };

  const handleZoomIn = () => setTextScale(prev => Math.min(prev + 0.1, 1.6));
  const handleZoomOut = () => setTextScale(prev => Math.max(prev - 0.1, 0.8));

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;
    
    const userText = input;
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    setLoading(true);
    
    try {
      // Token saving: enviar apenas histórico relevante
      const context = chatHistory.slice(-4).map(m => `${m.role === 'user' ? 'Cliente' : 'Sapient'}: ${m.text}`).join('\n') + `\nCliente: ${userText}`;
      const recommendation = await recommendServices({ clientNeedsAndGoals: context });
      setResult(recommendation);
      
      if (!recommendation.isDataSufficient) {
        setChatHistory(prev => [...prev, { role: 'assistant', text: recommendation.missingInfoMessage || "Preciso de mais detalhes sobre sua marca para um diagnóstico de elite." }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', text: "Diagnóstico Estratégico concluído. Analise o seu Dossiê abaixo:" }]);
      }
    } catch (error) {
      console.error("Erro AI:", error);
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
          "fixed bottom-24 right-4 z-[100] w-[calc(100vw-2rem)] md:w-[440px] h-[75vh] md:max-h-[750px] bg-white rounded-[2.5rem] border border-primary/20 shadow-[0_40px_120px_rgba(0,0,0,0.4)] transition-all duration-700 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 visible" : "scale-0 opacity-0 invisible"
        )}
        role="dialog"
      >
        {/* Header de Elite */}
        <div className="p-6 bg-gradient-to-r from-primary to-accent text-white shrink-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/10">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-headline font-black text-sm tracking-[0.2em] uppercase text-white leading-none">Estrategista IA</h3>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mt-1">Diagnóstico de Autoridade</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-black/20 rounded-full p-1 border border-white/10">
              <button onClick={handleZoomOut} className="h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white"><Minus className="h-4 w-4" /></button>
              <button onClick={handleZoomIn} className="h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white"><Plus className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        {/* Corpo Dinâmico */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#f8f9fc]"
          style={{ fontSize: `${textScale * 14}px` }}
        >
          {chatHistory.length === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Inicie um Diagnóstico Rápido:</p>
                <div className="grid grid-cols-1 gap-3">
                  {QUICK_NICHES.map((niche, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleQuickNiche(niche.prompt)} 
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-primary/10 hover:border-primary hover:shadow-lg transition-all text-left group"
                    >
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">{niche.icon}</div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                        {niche.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-center text-muted-foreground/40 font-bold uppercase tracking-widest">Ou descreva seu desafio técnico abaixo</p>
            </div>
          )}

          <div className="space-y-6">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn("flex flex-col gap-2 max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "items-start")}>
                <div 
                  className={cn(
                    "p-5 rounded-[2rem] font-medium leading-relaxed shadow-sm transition-all duration-300", 
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                  )} 
                >
                  {msg.text}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                  {msg.role === 'user' ? 'Você' : 'Sapient Consultant'}
                </span>
              </div>
            ))}
          </div>

          {result?.isDataSufficient && (
            <div className="space-y-6 pt-6 border-t border-primary/10 animate-in zoom-in-95 duration-500">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Search className="h-4 w-4" /> Auditoria de Percepção</p>
                <div className="bg-white p-6 rounded-[2rem] border border-primary/10 text-slate-600 italic leading-relaxed shadow-inner">
                  "{result.brandAudit}"
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Activity className="h-4 w-4" /> Gargalo Estratégico</p>
                <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/20 font-black text-slate-900 tracking-tight leading-snug">
                  {result.diagnosis}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><ClipboardCheck className="h-4 w-4" /> Valor da Intervenção</p>
                <p className="text-slate-500 font-medium leading-relaxed px-2">{result.strategicValue}</p>
              </div>

              <Button 
                className="w-full h-16 bg-[#08070b] text-white hover:bg-primary rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all" 
                onClick={() => { setIsOpen(false); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Agendar Consultoria <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-4 bg-white p-5 rounded-full w-fit shadow-md border border-slate-100">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Analisando Mercado...</p>
            </div>
          )}
        </div>

        {/* Input de Mensagem - Texto 100% Visível */}
        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-6 border-t bg-white shadow-2xl">
            <div className="relative group">
              <Textarea
                placeholder="Qual o nome do seu negócio e seu maior desafio?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="min-h-[120px] bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/5 rounded-[2rem] p-6 pr-16 text-slate-900 font-medium resize-none transition-all placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                disabled={loading || !input.trim()} 
                className="absolute bottom-5 right-5 h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center disabled:opacity-20 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <SendHorizontal className="h-6 w-6" />
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">Protocolo de Diagnóstico Estratégico v3.0</p>
          </form>
        )}
      </div>
    </>
  );
}
