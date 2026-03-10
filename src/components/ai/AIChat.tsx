
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
  Minus
} from "lucide-react";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { cn } from "@/lib/utils";

const QUICK_NICHES = [
  { label: "Moda / Varejo", icon: <Shirt className="h-4 w-4" />, prompt: "Minha loja de [Tipo] chama [Nome] e precisamos de um branding que atraia clientes qualificados." },
  { label: "Saúde / Clínicas", icon: <Stethoscope className="h-4 w-4" />, prompt: "Minha clínica de [Especialidade] chama [Nome] e nosso desafio é ser referência local no Google." },
  { label: "Imobiliária", icon: <Home className="h-4 w-4" />, prompt: "Sou da imobiliária [Nome] e precisamos de anúncios segmentados para imóveis de médio/alto padrão." },
  { label: "Nails / Estética", icon: <Scissors className="h-4 w-4" />, prompt: "Sou profissional na [Nome] e preciso de uma identidade visual que transmita mais profissionalismo." },
];

export function AIChat() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServiceRecommenderOutput | null>(null);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [textScale, setTextScale] = useState(0.9); 
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [result, loading, chatHistory, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const handleQuickNiche = (nichePrompt: string) => setInput(nichePrompt);
  const handleZoomIn = () => setTextScale(prev => Math.min(prev + 0.1, 1.2));
  const handleZoomOut = () => setTextScale(prev => Math.max(prev - 0.1, 0.7));

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;
    
    const userText = input;
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    setLoading(true);
    
    try {
      const context = chatHistory.map(m => `${m.role === 'user' ? 'Cliente' : 'Sapient'}: ${m.text}`).join('\n') + `\nCliente: ${userText}`;
      const recommendation = await recommendServices({ clientNeedsAndGoals: context });
      setResult(recommendation);
      
      if (!recommendation.isDataSufficient) {
        setChatHistory(prev => [...prev, { role: 'assistant', text: recommendation.missingInfoMessage || "Preciso de mais detalhes sobre sua marca." }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', text: "Análise concluída. O Dossiê Estratégico foi gerado abaixo:" }]);
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
        aria-label="Diagnóstico IA"
        className={cn(
          "fixed bottom-6 right-6 z-[100] h-16 w-16 rounded-full flex items-center justify-center transition-all duration-1000 hover:scale-110 active:scale-95 border-2 border-white/40 backdrop-blur-3xl group overflow-hidden shadow-2xl",
          isOpen ? "bg-[#08070b] rotate-90" : "bg-primary animate-glow-pulse"
        )}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Sparkles className="h-6 w-6 text-white animate-pulse" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-4 z-[100] w-[calc(100vw-2rem)] md:w-[380px] h-[70vh] md:max-h-[650px] glass-morphism rounded-[2.5rem] border-primary/30 shadow-[0_30px_100px_rgba(0,0,0,0.4)] transition-all duration-1000 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 visible" : "scale-0 opacity-0 invisible"
        )}
        role="dialog"
        aria-label="Janela de Consultoria IA"
      >
        {/* Header Profissional */}
        <div className="p-5 bg-gradient-to-r from-primary to-accent text-white shrink-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-headline font-black text-xs tracking-[0.2em] uppercase text-white leading-none">Estrategista IA</h3>
                <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest mt-1">SAPIENT STUDIO</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-black/20 rounded-full p-1 border border-white/10">
              <button 
                onClick={handleZoomOut} 
                className="h-7 w-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Diminuir texto do chat"
              >
                <Minus className="h-3 w-3" />
              </button>
              <button 
                onClick={handleZoomIn} 
                className="h-7 w-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Aumentar texto do chat"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Corpo do Chat */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f9fc]"
          aria-live="polite"
        >
          {chatHistory.length === 0 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-primary/5 p-5 rounded-3xl border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Selecione um Atalho:</p>
                <div className="grid grid-cols-1 gap-2">
                  {QUICK_NICHES.map((niche, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleQuickNiche(niche.prompt)} 
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-primary/10 hover:border-primary hover:shadow-md transition-all text-left group"
                    >
                      <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">{niche.icon}</div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground group-hover:text-primary">{niche.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-center text-muted-foreground/40 font-bold uppercase tracking-widest">Ou descreva seu desafio abaixo</p>
            </div>
          )}

          <div className="space-y-5">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn("flex flex-col gap-2 max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "items-start")}>
                <div 
                  className={cn(
                    "p-5 rounded-3xl font-medium leading-relaxed shadow-sm", 
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border border-primary/5 text-slate-700 rounded-tl-none"
                  )} 
                  style={{ fontSize: `${textScale * 14}px` }}
                >
                  {msg.text}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">{msg.role === 'user' ? 'Você' : 'Sapient IA'}</span>
              </div>
            ))}
          </div>

          {result?.isDataSufficient && (
            <div className="space-y-5 pt-6 border-t border-primary/10 animate-in zoom-in-95 duration-500">
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Search className="h-3 w-3" /> Auditoria de Marca</p>
                <div className="bg-white p-5 rounded-2xl border border-primary/10 text-slate-600 italic leading-relaxed shadow-inner" style={{ fontSize: `${textScale * 13}px` }}>"{result.brandAudit}"</div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Activity className="h-3 w-3" /> Diagnóstico Estratégico</p>
                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 font-black text-slate-900 tracking-tight leading-snug" style={{ fontSize: `${textScale * 16}px` }}>{result.diagnosis}</div>
              </div>
              <Button className="w-full h-14 bg-[#08070b] text-white hover:bg-primary rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all" onClick={() => { setIsOpen(false); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}>Agendar Consultoria <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 bg-white p-4 rounded-full w-fit shadow-sm border border-primary/5">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Processando Inteligência...</p>
            </div>
          )}
        </div>

        {/* Input de Mensagem */}
        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-5 border-t bg-white shadow-2xl">
            <div className="relative group">
              <Textarea
                placeholder="Qual o nome e o nicho do seu negócio?"
                value={input}
                onChange={handleInputChange}
                disabled={loading}
                className="min-h-[80px] bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/5 rounded-2xl p-5 pr-14 text-[13px] resize-none transition-all placeholder:text-slate-300"
                style={{ fontSize: `${textScale * 14}px` }}
              />
              <button 
                type="submit" 
                aria-label="Enviar mensagem" 
                disabled={loading || !input.trim()} 
                className="absolute bottom-4 right-4 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-20 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            </div>
            <p className="text-[8px] text-center text-slate-300 font-bold uppercase tracking-widest mt-3">Protocolo de Diagnóstico Sapient Studio v2.0</p>
          </form>
        )}
      </div>
    </>
  );
}
