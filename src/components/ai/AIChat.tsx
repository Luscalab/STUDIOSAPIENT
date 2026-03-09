"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  X, 
  Zap, 
  SendHorizontal,
  Target,
  ArrowRight,
  Search,
  Activity,
  Stethoscope,
  Shirt,
  Scissors,
  Home,
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
      {/* Botão Flutuante Único: "Orbe de Inteligência" */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] h-16 w-16 md:h-24 md:w-24 rounded-full flex items-center justify-center transition-all duration-700 hover:scale-110 active:scale-95 shadow-[0_20px_80px_rgba(139,92,246,0.6)] border-2 border-white/30 backdrop-blur-xl group overflow-hidden",
          isOpen 
            ? "bg-foreground rotate-90" 
            : "bg-gradient-to-br from-primary via-primary to-accent animate-glow-pulse"
        )}
      >
        {/* Camada de Brilho Interno */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {isOpen ? (
          <X className="h-8 w-8 text-white relative z-10" />
        ) : (
          <div className="relative flex flex-col items-center justify-center gap-1 z-10">
            <div className="relative">
              <Sparkles className="h-8 w-8 md:h-12 md:w-12 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-white rounded-full animate-ping opacity-70" />
            </div>
            <span className="hidden md:block text-[8px] font-black uppercase tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">Analista</span>
          </div>
        )}
        
        {/* Reflexo de Vidro Dinâmico */}
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[100%] transition-all duration-1000" />
      </button>

      <div
        className={cn(
          "fixed bottom-24 md:bottom-36 right-4 md:right-10 z-[100] w-[calc(100vw-2rem)] md:w-[480px] h-[75vh] md:max-h-[85vh] glass-morphism rounded-[3rem] border-primary/20 shadow-[0_40px_120px_rgba(0,0,0,0.4)] transition-all duration-700 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-20 invisible pointer-events-none"
        )}
      >
        <div className="p-10 bg-gradient-to-br from-primary to-accent text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Sparkles className="h-32 w-32" />
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="h-14 w-14 rounded-[1.25rem] bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-lg">
              <ClipboardCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-1">Dossiê Estratégico</p>
              <h3 className="font-headline font-black text-2xl md:text-3xl tracking-tighter leading-tight">Estrategista IA</h3>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 bg-white/60 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-3xl font-black text-foreground tracking-tighter leading-none">
                  Diagnóstico <br />Instantâneo.
                </p>
                <p className="text-muted-foreground font-medium leading-relaxed text-lg">
                  Selecione sua categoria abaixo ou descreva seu principal gargalo comercial para uma análise técnica agora.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {QUICK_NICHES.map((niche, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickNiche(niche.prompt)}
                    className="flex items-center gap-5 p-5 rounded-[2rem] bg-white border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group shadow-sm"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      {niche.icon}
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                      {niche.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col gap-2 max-w-[92%]",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-6 rounded-[2rem] text-sm md:text-base font-medium leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white border border-primary/10 text-muted-foreground rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {result?.isDataSufficient && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-8 pt-8 border-t border-primary/10">
              <div className="space-y-4">
                <p className="text-[12px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-4">
                  <Search className="h-5 w-5" /> Análise de Marca
                </p>
                <div className="bg-white p-8 rounded-[2.5rem] border border-primary/10 shadow-sm text-base text-muted-foreground leading-relaxed font-medium italic">
                  "{result.brandAudit}"
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[12px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-4">
                  <Activity className="h-5 w-5" /> Diagnóstico Crítico
                </p>
                <div className="bg-secondary/40 p-8 rounded-[2.5rem] border border-primary/10 text-lg font-black text-foreground leading-tight tracking-tight">
                  {result.diagnosis}
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-[12px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-4">
                  <Zap className="h-5 w-5" /> Intervenção Sapient
                </p>
                <div className="flex flex-wrap gap-4">
                  {result.recommendedServices.map((service, idx) => (
                    <Badge key={idx} className="bg-primary text-white border-none px-6 py-3 text-[11px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary/10">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-primary/30 group"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Falar com Especialista <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-4 bg-primary/5 p-5 rounded-full w-fit border border-primary/10">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Engenharia IA processando...</p>
            </div>
          )}
        </div>

        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-8 border-t border-muted bg-white shrink-0">
            <div className="relative group">
              <Textarea
                placeholder="Descreva seu negócio ou desafio atual..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="min-h-[90px] bg-secondary/30 border-transparent rounded-[2rem] p-6 pr-16 text-base focus:ring-primary/20 resize-none transition-all duration-500 hover:bg-secondary/50 placeholder:text-muted-foreground/50"
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
                className="absolute bottom-5 right-5 h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center disabled:opacity-20 transition-all hover:scale-110 shadow-xl shadow-primary/30"
              >
                <SendHorizontal className="h-6 w-6" />
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
