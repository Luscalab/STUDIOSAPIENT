
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  X, 
  Zap, 
  SendHorizontal,
  ArrowRight,
  Search,
  Activity,
  Shirt,
  Stethoscope,
  Home,
  Scissors,
  GraduationCap,
  Hammer,
  ClipboardCheck,
  Sparkles,
  Plus,
  Minus,
  Type
} from "lucide-react";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const QUICK_NICHES = [
  { label: "Moda / Varejo", icon: <Shirt className="h-4 w-4" />, prompt: "Minha loja de [Tipo] chama [Nome] e precisamos de um branding que atraia clientes qualificados." },
  { label: "Saúde / Clínicas", icon: <Stethoscope className="h-4 w-4" />, prompt: "Minha clínica de [Especialidade] chama [Nome] e nosso desafio é ser referência local no Google." },
  { label: "Imobiliária", icon: <Home className="h-4 w-4" />, prompt: "Sou da imobiliária [Nome] e precisamos de anúncios segmentados para imóveis de médio/alto padrão." },
  { label: "Nails / Estética", icon: <Scissors className="h-4 w-4" />, prompt: "Sou profissional na [Nome] e preciso de uma identidade visual que transmita mais profissionalismo." },
  { label: "Educação / Cursos", icon: <GraduationCap className="h-4 w-4" />, prompt: "Tenho um negócio de cursos chamado [Nome] e preciso de autoridade social para vender mentorias." },
  { label: "Serviços", icon: <Hammer className="h-4 w-4" />, prompt: "Trabalho com [Tipo de Serviço] na [Nome] e precisamos dominar as buscas locais no Google." },
];

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServiceRecommenderOutput | null>(null);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [textScale, setTextScale] = useState(0.85); // Escala reduzida inicial
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [result, loading, chatHistory, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const handleQuickNiche = (nichePrompt: string) => {
    setInput(nichePrompt);
  };

  const handleZoomIn = () => setTextScale(prev => Math.min(prev + 0.1, 1.2));
  const handleZoomOut = () => setTextScale(prev => Math.max(prev - 0.1, 0.7));

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
      console.error("Erro ao processar consulta AI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Orbe de Inteligência IA */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar chat IA" : "Abrir diagnóstico de IA"}
        aria-expanded={isOpen}
        className={cn(
          "fixed bottom-6 right-6 z-[100] h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center transition-all duration-1000 hover:scale-110 active:scale-95 border-2 border-white/40 backdrop-blur-3xl group overflow-hidden shadow-2xl shadow-primary/30",
          isOpen 
            ? "bg-foreground rotate-90" 
            : "bg-gradient-to-br from-primary via-primary to-accent animate-glow-pulse"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isOpen ? (
          <X className="h-5 w-5 text-white relative z-10" />
        ) : (
          <div className="relative flex flex-col items-center justify-center z-10">
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-white animate-pulse" />
          </div>
        )}
      </button>

      {/* Janela de Chat */}
      <div
        role="dialog"
        aria-label="Interface de Diagnóstico IA"
        className={cn(
          "fixed bottom-20 md:bottom-24 right-4 md:right-10 z-[100] w-[calc(100vw-2rem)] md:w-[380px] h-[55vh] md:max-h-[65vh] glass-morphism rounded-[2.5rem] border-primary/20 shadow-[0_30px_80px_rgba(0,0,0,0.2)] transition-all duration-1000 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="p-5 bg-gradient-to-br from-primary to-accent text-white shrink-0 relative">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
                <ClipboardCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[6px] font-black uppercase tracking-[0.4em] opacity-80">Dossiê IA</p>
                <h3 className="font-headline font-black text-lg tracking-tighter">Estrategista Sapient</h3>
              </div>
            </div>

            {/* Controles de Escala de Texto */}
            <div className="flex items-center gap-1 bg-black/10 rounded-full p-1 backdrop-blur-sm">
              <button 
                onClick={handleZoomOut}
                className="h-6 w-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                title="Diminuir texto"
              >
                <Minus className="h-3 w-3" />
              </button>
              <div className="h-3 w-px bg-white/20" />
              <button 
                onClick={handleZoomIn}
                className="h-6 w-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                title="Aumentar texto"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/90 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xl font-black text-foreground tracking-tighter leading-none">
                  Diagnóstico <br />Instantâneo.
                </p>
                <p className="text-muted-foreground/70 font-medium text-xs">
                  Descreva seu desafio comercial agora.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {QUICK_NICHES.map((niche, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickNiche(niche.prompt)}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group shadow-sm"
                  >
                    <div className="h-7 w-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {niche.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                      {niche.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col gap-1 max-w-[90%]",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}>
                <div 
                  className={cn(
                    "p-4 rounded-2xl font-medium leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border border-primary/10 text-muted-foreground/80 rounded-tl-none"
                  )}
                  style={{ fontSize: `${textScale * 14}px` }} // Controle dinâmico da escala
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {result?.isDataSufficient && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-4 pt-4 border-t border-primary/10">
              <div className="space-y-2">
                <p className="text-[7px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                  <Search className="h-3 w-3" /> Auditoria
                </p>
                <div 
                  className="bg-white p-4 rounded-xl border border-primary/10 text-muted-foreground/70 italic"
                  style={{ fontSize: `${textScale * 11}px` }}
                >
                  "{result.brandAudit}"
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[7px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                  <Activity className="h-3 w-3" /> Gargalo
                </p>
                <div 
                  className="bg-secondary/50 p-4 rounded-xl border border-primary/10 font-black text-foreground tracking-tighter"
                  style={{ fontSize: `${textScale * 16}px` }}
                >
                  {result.diagnosis}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-widest text-[9px] shadow-lg group"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Dossiê Completo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-full w-fit border border-primary/10">
              <Loader2 className="h-3 w-3 text-primary animate-spin" />
              <p className="text-[7px] font-black uppercase tracking-[0.3em] text-primary">Processando...</p>
            </div>
          )}
        </div>

        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-4 border-t border-muted bg-white shrink-0">
            <div className="relative group">
              <Textarea
                placeholder="Qual seu desafio?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="min-h-[60px] bg-secondary/30 border-transparent rounded-2xl p-4 pr-12 text-xs focus:ring-primary/10 resize-none transition-all placeholder:text-muted-foreground/40"
                style={{ fontSize: `${textScale * 12}px` }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Enviar mensagem"
                className="absolute bottom-3 right-3 h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-20 transition-all hover:scale-105"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
