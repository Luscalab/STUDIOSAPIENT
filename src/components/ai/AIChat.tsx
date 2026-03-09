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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] h-14 w-14 md:h-20 md:w-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_20px_60px_rgba(139,92,246,0.5)] border-2 border-white/20",
          isOpen 
            ? "bg-foreground rotate-90" 
            : "bg-gradient-to-br from-primary via-primary to-accent animate-glow-pulse"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <Sparkles className="h-7 w-7 md:h-9 md:h-9 text-white animate-pulse" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full animate-ping" />
          </div>
        )}
      </button>

      <div
        className={cn(
          "fixed bottom-24 md:bottom-32 right-4 md:right-10 z-[100] w-[calc(100vw-2rem)] md:w-[450px] h-[75vh] md:max-h-[85vh] glass-morphism rounded-[3rem] border-primary/20 shadow-[0_30px_100px_rgba(0,0,0,0.3)] transition-all duration-700 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-20 invisible pointer-events-none"
        )}
      >
        <div className="p-8 bg-gradient-to-br from-primary to-accent text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="h-24 w-24" />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/20">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Consultoria Estratégica</p>
              <h3 className="font-headline font-black text-2xl tracking-tighter leading-tight">Estrategista IA</h3>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-white/60 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-2xl font-black text-foreground tracking-tighter">
                  Diagnóstico Instantâneo.
                </p>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Selecione sua categoria abaixo ou descreva seu principal gargalo comercial agora.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {QUICK_NICHES.map((niche, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickNiche(niche.prompt)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {niche.icon}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                      {niche.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-5">
            {chatHistory.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col gap-2 max-w-[92%]",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-5 rounded-[1.5rem] text-sm md:text-base font-medium leading-relaxed shadow-sm",
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
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-6 pt-6 border-t border-primary/10">
              <div className="space-y-3">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                  <Search className="h-4 w-4" /> Análise de Mercado
                </p>
                <div className="bg-white p-6 rounded-[2rem] border border-primary/10 shadow-sm text-sm text-muted-foreground leading-relaxed font-medium">
                  {result.brandAudit}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                  <Activity className="h-4 w-4" /> Diagnóstico Crítico
                </p>
                <div className="bg-secondary/40 p-6 rounded-[2rem] border border-primary/10 text-sm font-black text-foreground leading-relaxed">
                  {result.diagnosis}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                  <Zap className="h-4 w-4" /> Intervenção Sapient
                </p>
                <div className="flex flex-wrap gap-3">
                  {result.recommendedServices.map((service, idx) => (
                    <Badge key={idx} className="bg-primary text-white border-none px-4 py-2 text-[10px] font-black rounded-full uppercase tracking-widest">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/30 group"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Falar com Especialista <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-full w-fit">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Análise Estratégica em curso...</p>
            </div>
          )}
        </div>

        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-6 border-t border-muted bg-white shrink-0">
            <div className="relative group">
              <Textarea
                placeholder="Conte sobre seu negócio ou desafio atual..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="min-h-[70px] bg-secondary/30 border-transparent rounded-[1.5rem] p-5 pr-14 text-sm focus:ring-primary/20 resize-none transition-all duration-500 hover:bg-secondary/50"
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
                className="absolute bottom-4 right-4 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-20 transition-all hover:scale-110 shadow-lg shadow-primary/20"
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}