"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  X, 
  Zap, 
  SendHorizontal,
  FileText,
  ChevronRight,
  ShieldCheck,
  Target,
  ArrowRight,
  Search,
  Activity,
  MapPin,
  Palette,
  Share2,
  Info
} from "lucide-react";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServiceRecommenderOutput | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [result, loading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;
    
    setLoading(true);
    try {
      const recommendation = await recommendServices({ clientNeedsAndGoals: input });
      setResult(recommendation);
      
      // Se a IA pedir mais info, mantemos o input para o usuário complementar se quiser
      if (!recommendation.isDataSufficient) {
        // Opcional: manter o input ou limpar
      }
    } catch (error) {
      console.error("Erro ao processar consulta AI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
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

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 md:bottom-32 right-4 md:right-8 z-[100] w-[calc(100vw-2rem)] md:w-[480px] h-[75vh] md:max-h-[85vh] glass-morphism rounded-[2.5rem] md:rounded-[3rem] border-primary/10 shadow-[0_40px_100px_-20px_rgba(139,92,246,0.25)] transition-all duration-700 origin-bottom-right flex flex-col overflow-hidden",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-20 invisible pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Target className="h-24 w-24 md:h-32 md:w-32" />
          </div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/20">
              <ShieldCheck className="h-5 w-5 md:h-7 md:w-7 text-white" />
            </div>
            <div>
              <Badge className="bg-white/20 text-white border-none text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] mb-1.5 md:mb-2 px-3">Arquitetura de Dados</Badge>
              <h3 className="font-headline font-black text-xl md:text-2xl tracking-tighter leading-none">Dossiê Estratégico</h3>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:y-8 custom-scrollbar bg-white/30">
          {(!result || !result.isDataSufficient) ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-black text-foreground tracking-tighter leading-tight">
                  {result && !result.isDataSufficient ? "Dados Insuficientes." : "Inicie seu Diagnóstico."}
                </p>
                <p className="text-muted-foreground/60 text-base md:text-lg font-medium leading-relaxed tracking-tight">
                  {result && !result.isDataSufficient 
                    ? result.missingInfoMessage 
                    : "Para um audit profissional, preciso saber o nome da sua marca, seu nicho e seu objetivo atual."}
                </p>
              </div>

              {!result && (
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-3 items-start">
                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest leading-relaxed">
                      Siga o padrão: <br />"Sou [Marca], do nicho [Nicho], e quero [Objetivo]"
                    </p>
                  </div>
                  {[
                    "Minha clínica de estética não aparece no Google",
                    "Minha marca de moda parece amadora no Instagram",
                    "Loja física precisando de escala via Google Ads"
                  ].map((hint, i) => (
                    <button 
                      key={i}
                      onClick={() => { setInput(hint); }}
                      className="text-left px-5 py-4 rounded-xl md:rounded-2xl bg-white border border-primary/5 text-[9px] md:text-xs font-black uppercase tracking-widest text-primary/60 hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group shadow-sm"
                    >
                      {hint}
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-6 md:pb-8">
              <div>
                <Badge className="mb-4 md:mb-6 bg-primary/10 text-primary border-none px-5 md:px-6 py-1.5 md:py-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Audit Concluído</Badge>
                <h4 className="font-headline text-2xl md:text-3xl font-black tracking-tighter mb-4 flex items-center gap-3">
                  <FileText className="h-6 w-6 md:h-7 md:w-7 text-primary" /> Dossiê Sapient
                </h4>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Search className="h-3 w-3" /> 01. Audit de Marca & Presença
                </p>
                <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-primary/5 shadow-sm">
                  <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed tracking-tight">
                    {result.brandAudit}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Activity className="h-3 w-3" /> 02. Gargalos Estratégicos
                </p>
                <div className="bg-secondary/50 p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-primary/5">
                  <p className="text-sm md:text-base text-foreground font-black leading-tight italic tracking-tighter">
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
                    <Badge key={idx} className="bg-primary text-white border-none px-4 md:px-5 py-2 text-[8px] md:text-[9px] font-black rounded-full uppercase tracking-widest">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Target className="h-3 w-3" /> 04. Nossa Execução Profissional
                </p>
                <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-primary/5 shadow-inner">
                  <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed whitespace-pre-line tracking-tight">
                    {result.strategicValue}
                  </p>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <Button 
                  className="w-full h-16 md:h-20 bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 md:gap-4"
                  onClick={() => {
                    setIsOpen(false);
                    const contactSection = document.getElementById('contato');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Agendar Consultoria <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <button 
                  onClick={() => {setResult(null); setInput("");}}
                  className="w-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 hover:text-primary transition-colors py-2"
                >
                  Novo Audit de Marca
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 text-primary animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <Loader2 className="h-14 w-14 md:h-20 md:w-20 animate-spin stroke-[1.5px]" />
                <Search className="h-6 w-6 md:h-8 md:w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-center">Auditando Google, Visual<br />e Redes Sociais</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        {(!result || !result.isDataSufficient) && !loading && (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 border-t border-muted bg-white/50 backdrop-blur-xl shrink-0">
            <div className="relative">
              <Textarea
                placeholder="Ex: Minha marca é [Nome], do nicho [Nicho], e meu desafio é [Desafio]..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[100px] md:min-h-[120px] bg-white border-transparent rounded-2xl md:rounded-[2rem] p-6 md:p-8 pr-16 md:pr-20 text-sm md:text-lg font-medium focus:ring-primary/10 placeholder:text-muted-foreground/20 resize-none shadow-2xl shadow-primary/5 border border-primary/5 leading-tight"
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
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 disabled:opacity-20 transition-all hover:scale-110 active:scale-90"
              >
                <SendHorizontal className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
            <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 opacity-20">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-foreground">Sapient Neural Engine v4.0</p>
              <div className="h-1 w-1 rounded-full bg-primary" />
            </div>
          </form>
        )}
      </div>
    </>
  );
}
