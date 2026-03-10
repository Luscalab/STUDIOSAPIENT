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
  LockKeyhole
} from "lucide-react";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { cn } from "@/lib/utils";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

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
  const [textScale, setTextScale] = useState(0.85); 
  const [showAdminLogin, setShowAdminLogin] = useState(false);
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
    const val = e.target.value;
    setInput(val);
    
    // Gatilho secreto para mostrar login de admin
    if (val.toLowerCase().includes("admadmadm")) {
      setShowAdminLogin(true);
      setInput(val.replace(/admadmadm/gi, ""));
    }
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
          isOpen ? "bg-foreground rotate-90" : "bg-primary animate-glow-pulse"
        )}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Sparkles className="h-6 w-6 text-white animate-pulse" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-4 z-[100] w-[calc(100vw-2rem)] md:w-[350px] h-[60vh] md:max-h-[60vh] glass-morphism rounded-[2.5rem] border-primary/20 shadow-2xl transition-all duration-1000 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 visible" : "scale-0 opacity-0 invisible"
        )}
        role="dialog"
        aria-label="Janela de Consultoria IA"
      >
        <div className="p-4 bg-primary text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              <h3 className="font-headline font-black text-sm tracking-tighter uppercase text-white">Estrategista IA</h3>
            </div>
            
            <div className="flex items-center gap-2">
              {showAdminLogin && (
                <div className="animate-in fade-in zoom-in duration-500 bg-black/20 rounded-full px-2 py-1 flex items-center gap-2 border border-white/10">
                  <LockKeyhole className="h-3 w-3 text-accent" />
                  <GoogleLoginButton />
                </div>
              )}
              <div className="flex items-center gap-1 bg-black/10 rounded-full p-1">
                <button 
                  onClick={handleZoomOut} 
                  className="h-6 w-6 rounded-full hover:bg-white/20 flex items-center justify-center"
                  aria-label="Diminuir texto do chat"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <button 
                  onClick={handleZoomIn} 
                  className="h-6 w-6 rounded-full hover:bg-white/20 flex items-center justify-center"
                  aria-label="Aumentar texto do chat"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-5 space-y-5 bg-white/90"
          aria-live="polite"
        >
          {chatHistory.length === 0 && (
            <div className="space-y-4">
              <p className="text-sm font-black text-foreground uppercase tracking-tight">Atalhos Estratégicos:</p>
              <div className="grid grid-cols-1 gap-2">
                {QUICK_NICHES.map((niche, i) => (
                  <button key={i} onClick={() => handleQuickNiche(niche.prompt)} className="flex items-center gap-4 p-3 rounded-xl bg-white border border-primary/5 hover:bg-primary/5 transition-all text-left group shadow-sm">
                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">{niche.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground group-hover:text-primary">{niche.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn("flex flex-col gap-1 max-w-[90%]", msg.role === 'user' ? "ml-auto items-end" : "items-start")}>
                <div className={cn("p-4 rounded-2xl font-medium leading-snug shadow-sm", msg.role === 'user' ? "bg-primary text-white" : "bg-white border border-primary/10 text-muted-foreground/80")} style={{ fontSize: `${textScale * 14}px` }}>{msg.text}</div>
              </div>
            ))}
          </div>

          {result?.isDataSufficient && (
            <div className="space-y-4 pt-4 border-t border-primary/10">
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Search className="h-3 w-3" /> Auditoria</p>
                <div className="bg-white p-4 rounded-xl border border-primary/10 text-muted-foreground/70 italic" style={{ fontSize: `${textScale * 12}px` }}>"{result.brandAudit}"</div>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Activity className="h-3 w-3" /> Diagnóstico</p>
                <div className="bg-secondary/50 p-4 rounded-xl border border-primary/10 font-black text-foreground tracking-tighter" style={{ fontSize: `${textScale * 15}px` }}>{result.diagnosis}</div>
              </div>
              <Button className="w-full h-12 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px]" onClick={() => { setIsOpen(false); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}>Agendar Consultoria <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          )}

          {loading && <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-full w-fit"><Loader2 className="h-3 w-3 text-primary animate-spin" /><p className="text-[8px] font-black uppercase tracking-widest text-primary">Analisando...</p></div>}
        </div>

        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="relative">
              <Textarea
                placeholder="Qual o seu nicho?"
                value={input}
                onChange={handleInputChange}
                disabled={loading}
                className="min-h-[60px] bg-secondary/30 border-transparent rounded-xl p-4 pr-12 text-[12px] resize-none"
                style={{ fontSize: `${textScale * 13}px` }}
              />
              <button type="submit" aria-label="Enviar mensagem" disabled={loading || !input.trim()} className="absolute bottom-3 right-3 h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-20"><SendHorizontal className="h-4 w-4" /></button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}