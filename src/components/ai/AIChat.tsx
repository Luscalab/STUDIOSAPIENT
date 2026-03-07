"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  X, 
  Zap, 
  SendHorizontal,
  ShieldCheck,
  Target,
  ArrowRight,
  Search,
  Activity,
  Stethoscope,
  Sparkles,
  ShoppingBag,
  Store,
  Shirt,
  Scissors,
  Home,
  GraduationCap,
  Hammer
} from "lucide-react";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const QUICK_NICHES = [
  { label: "Moda / Varejo", icon: <Shirt className="h-4 w-4" />, prompt: "Minha loja de [Tipo de Roupa] chama [Nome] e precisamos de um branding que transmita valor e atraia clientes qualificados." },
  { label: "Saúde / Clínicas", icon: <Stethoscope className="h-4 w-4" />, prompt: "Minha clínica de [Especialidade] chama [Nome] e nosso desafio é ser referência local no Google e transmitir confiança." },
  { label: "Imobiliária", icon: <Home className="h-4 w-4" />, prompt: "Sou da imobiliária [Nome] e precisamos de anúncios segmentados e uma apresentação visual que venda imóveis de alto padrão." },
  { label: "Nails / Estética", icon: <Scissors className="h-4 w-4" />, prompt: "Sou Designer de Unhas na [Nome] e preciso de uma identidade visual luxuosa e autoridade no Instagram para cobrar mais caro." },
  { label: "Educação / Cursos", icon: <GraduationCap className="h-4 w-4" />, prompt: "Tenho um negócio de cursos chamado [Nome] e preciso de autoridade social e um design que venda minha mentoria." },
  { label: "Urgência / Serviços", icon: <Hammer className="h-4 w-4" />, prompt: "Trabalho com [Tipo de Serviço] na [Nome] e precisamos dominar as buscas locais no Google para sermos achados na hora da urgência." },
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
        setChatHistory(prev => [...prev, { role: 'assistant', text: recommendation.missingInfoMessage || "Preciso de mais contexto sobre sua marca." }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', text: "Audit concluído. O Arquiteto gerou seu Dossiê Estratégico abaixo:" }]);
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
          "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] h-14 w-14 md:h-20 md:w-20 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden",
          isOpen && "rotate-90 bg-foreground"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          {isOpen ? <X className="h-6 w-6 md:h-8 md:w-8" /> : <Zap className="h-6 w-6 md:h-10 md:w-10 group-hover:animate-pulse" />}
        </div>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 md:h-6 md:w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 md:h-6 md:w-6 bg-accent border-2 border-white"></span>
          </span>
        )}
      </button>

      <div
        className={cn(
          "fixed bottom-24 md:bottom-32 right-4 md:right-8 z-[100] w-[calc(100vw-2rem)] md:w-[480px] h-[75vh] md:max-h-[85vh] glass-morphism rounded-[2.5rem] md:rounded-[3rem] border-primary/10 shadow-[0_40px_100px_-20px_rgba(139,92,246,0.25)] transition-all duration-700 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-20 invisible pointer-events-none"
        )}
      >
        <div className="p-8 md:p-10 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden shrink-0">
          <div className="relative z-10 flex items-center gap-4">
            <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/20">
              <ShieldCheck className="h-5 w-5 md:h-7 md:w-7 text-white" />
            </div>
            <div>
              <Badge className="bg-white/20 text-white border-none text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] mb-1.5 md:mb-2 px-3">Consultoria de Elite</Badge>
              <h3 className="font-headline font-black text-xl md:text-2xl tracking-tighter leading-none">Arquiteto Sapient</h3>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-8 bg-white/30 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-black text-foreground tracking-tighter leading-tight">
                  Inicie seu Audit Estratégico.
                </p>
                <p className="text-muted-foreground/60 text-base md:text-lg font-medium leading-relaxed tracking-tight">
                  Selecione sua área ou descreva o cenário do seu negócio:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {QUICK_NICHES.map((niche, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickNiche(niche.prompt)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {niche.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary">
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
                "flex flex-col gap-2 max-w-[85%]",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] text-sm md:text-base font-medium leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white border border-primary/5 text-muted-foreground rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {result?.isDataSufficient && (
            <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-8 pt-8 border-t border-primary/10">
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Search className="h-3 w-3" /> 01. Audit do Ecossistema
                </p>
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-primary/5 shadow-sm">
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {result.brandAudit}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Activity className="h-3 w-3" /> 02. Gargalo Estratégico
                </p>
                <div className="bg-secondary/50 p-5 md:p-6 rounded-2xl border border-primary/5">
                  <p className="text-base text-foreground font-black leading-tight tracking-tighter italic">
                    "{result.diagnosis}"
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Zap className="h-3 w-3" /> 03. Intervenção Sapient
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedServices.map((service, idx) => (
                    <Badge key={idx} className="bg-primary text-white border-none px-4 py-2 text-[8px] font-black rounded-full uppercase tracking-widest">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Target className="h-3 w-3" /> 04. Valor da Execução
                </p>
                <div className="bg-white p-6 rounded-[2rem] border border-primary/5">
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {result.strategicValue}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Falar com Especialista <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <button 
                  onClick={() => {setResult(null); setInput(""); setChatHistory([]);}}
                  className="w-full text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 hover:text-primary transition-colors py-4"
                >
                  Reiniciar Protocolo
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <p className="text-[8px] font-black uppercase tracking-widest text-primary/60">Arquiteto Analisando Ecossistema...</p>
            </div>
          )}
        </div>

        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 border-t border-muted bg-white/50 backdrop-blur-xl shrink-0">
            <div className="relative">
              <Textarea
                placeholder="Ex: Minha empresa é [Nome] do setor [X] e precisamos de..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="min-h-[80px] bg-white border-transparent rounded-2xl p-6 pr-16 text-sm font-medium focus:ring-primary/10 placeholder:text-muted-foreground/20 resize-none shadow-2xl shadow-primary/5 border border-primary/5 leading-tight"
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
                className="absolute bottom-4 right-4 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 disabled:opacity-20 transition-all hover:scale-110 active:scale-90"
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