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
  Sparkles
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
        className={cn(
          "fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[100] h-20 w-20 md:h-28 md:w-28 rounded-full flex items-center justify-center transition-all duration-1000 hover:scale-110 active:scale-90 border-4 border-white/40 backdrop-blur-3xl group overflow-hidden shadow-[0_25px_100px_rgba(139,92,246,0.6)]",
          isOpen 
            ? "bg-foreground rotate-90" 
            : "bg-gradient-to-br from-primary via-primary to-accent animate-glow-pulse"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {isOpen ? (
          <X className="h-10 w-10 text-white relative z-10" />
        ) : (
          <div className="relative flex flex-col items-center justify-center gap-1 z-10">
            <Sparkles className="h-10 w-10 md:h-14 md:w-14 text-white animate-pulse" />
            <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.4em] text-white/90">Analista</span>
          </div>
        )}
        
        <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[150%] transition-all duration-1000" />
      </button>

      <div
        className={cn(
          "fixed bottom-32 md:bottom-44 right-4 md:right-12 z-[100] w-[calc(100vw-2rem)] md:w-[520px] h-[75vh] md:max-h-[85vh] glass-morphism rounded-[4rem] border-primary/20 shadow-[0_50px_150px_rgba(0,0,0,0.5)] transition-all duration-1000 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-20 invisible pointer-events-none"
        )}
      >
        <div className="p-12 bg-gradient-to-br from-primary to-accent text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="h-40 w-40" />
          </div>
          <div className="flex items-center gap-8 relative z-10">
            <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-2xl">
              <ClipboardCheck className="h-8 w-8" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80 mb-2">Dossiê de Diagnóstico</p>
              <h3 className="font-headline font-black text-3xl md:text-4xl tracking-tighter leading-tight">Estrategista Sapient</h3>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 bg-white/70 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-[0.9]">
                  Engenharia <br />Instantânea.
                </p>
                <p className="text-muted-foreground/70 font-medium leading-relaxed text-lg md:text-xl">
                  Descreva seu principal gargalo comercial para uma análise técnica agora.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {QUICK_NICHES.map((niche, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickNiche(niche.prompt)}
                    className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group shadow-sm"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                      {niche.icon}
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                      {niche.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col gap-3 max-w-[95%]",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-8 rounded-[2.5rem] text-base md:text-lg font-medium leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white border border-primary/10 text-muted-foreground/80 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {result?.isDataSufficient && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-12 pt-12 border-t border-primary/10">
              <div className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-4">
                  <Search className="h-6 w-6" /> Auditoria de Marca
                </p>
                <div className="bg-white p-10 rounded-[3rem] border border-primary/10 shadow-sm text-lg text-muted-foreground/70 leading-relaxed font-medium italic">
                  "{result.brandAudit}"
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-4">
                  <Activity className="h-6 w-6" /> Gargalo Identificado
                </p>
                <div className="bg-secondary/50 p-10 rounded-[3rem] border border-primary/10 text-xl md:text-2xl font-black text-foreground leading-tight tracking-tighter">
                  {result.diagnosis}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-4">
                  <Zap className="h-6 w-6" /> Intervenção Técnica
                </p>
                <div className="flex flex-wrap gap-4">
                  {result.recommendedServices.map((service, idx) => (
                    <Badge key={idx} className="bg-primary text-white border-none px-8 py-4 text-[11px] font-black rounded-full uppercase tracking-[0.3em] shadow-2xl shadow-primary/20">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-10">
                <Button 
                  className="w-full h-24 bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-[0.3em] text-[13px] shadow-[0_20px_60px_rgba(139,92,246,0.4)] group"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Dossiê Completo <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-6 bg-primary/5 p-6 rounded-full w-fit border border-primary/10">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Engenharia IA processando...</p>
            </div>
          )}
        </div>

        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-10 border-t border-muted bg-white shrink-0">
            <div className="relative group">
              <Textarea
                placeholder="Descreva seu desafio atual..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="min-h-[110px] bg-secondary/30 border-transparent rounded-[2.5rem] p-8 pr-20 text-lg md:text-xl focus:ring-primary/20 resize-none transition-all duration-700 hover:bg-secondary/50 placeholder:text-muted-foreground/40 leading-relaxed"
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
                className="absolute bottom-6 right-6 h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center disabled:opacity-20 transition-all hover:scale-110 shadow-2xl shadow-primary/40"
              >
                <SendHorizontal className="h-7 w-7" />
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}