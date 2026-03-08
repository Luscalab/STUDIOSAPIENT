
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
  ClipboardCheck
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
          "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95",
          isOpen && "rotate-90 bg-foreground"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 md:bottom-28 right-4 md:right-8 z-[100] w-[calc(100vw-2rem)] md:w-[420px] h-[70vh] md:max-h-[80vh] glass-morphism rounded-[2rem] border-primary/10 shadow-2xl transition-all duration-500 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-20 invisible pointer-events-none"
        )}
      >
        <div className="p-6 bg-primary text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-80">Consultoria Digital</p>
              <h3 className="font-headline font-bold text-lg leading-tight">Estrategista Sapient</h3>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/50 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xl font-bold text-foreground tracking-tight">
                  Inicie seu diagnóstico.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Para uma análise profissional, conte sobre seu negócio ou selecione uma categoria:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {QUICK_NICHES.map((niche, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickNiche(niche.prompt)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {niche.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">
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
                <div className={cn(
                  "p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
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
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-4 pt-4 border-t border-primary/10">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Search className="h-3 w-3" /> 01. Análise de Marca
                </p>
                <div className="bg-white p-4 rounded-xl border border-primary/5 shadow-sm text-sm text-muted-foreground leading-relaxed">
                  {result.brandAudit}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Activity className="h-3 w-3" /> 02. Diagnóstico
                </p>
                <div className="bg-secondary/30 p-4 rounded-xl border border-primary/5 text-sm font-bold text-foreground">
                  {result.diagnosis}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Zap className="h-3 w-3" /> 03. Intervenção
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedServices.map((service, idx) => (
                    <Badge key={idx} className="bg-primary text-white border-none px-3 py-1 text-[9px] font-bold rounded-full uppercase">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full font-bold uppercase tracking-widest text-[10px]"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Falar com Especialista <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 text-primary animate-spin" />
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Analisando dados...</p>
            </div>
          )}
        </div>

        {(!result || !result.isDataSufficient) && (
          <form onSubmit={handleSubmit} className="p-4 border-t border-muted bg-white shrink-0">
            <div className="relative">
              <Textarea
                placeholder="Conte sobre seu negócio..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="min-h-[60px] bg-secondary/20 border-transparent rounded-xl p-4 pr-12 text-sm focus:ring-primary/10 resize-none"
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
