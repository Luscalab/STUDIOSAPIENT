"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { Sparkles, Loader2, CheckCircle2, FileText, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AIInquiry() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServiceRecommenderOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    setLoading(true);
    try {
      const recommendation = await recommendServices({ clientNeedsAndGoals: input });
      setResult(recommendation);
    } catch (error) {
      console.error("Erro ao processar consulta AI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-spacing relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-24">
          <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Tecnologia Própria</Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-bold mb-10 text-foreground tracking-tighter leading-none">Concierge<br />Inteligente</h2>
          <p className="text-muted-foreground/60 text-2xl font-medium max-w-3xl mx-auto tracking-tight">
            Nossa inteligência artificial analisa sua visão e desenha o mapa estratégico ideal para sua dominação de mercado.
          </p>
        </div>

        <Card className="bg-secondary/40 border-none rounded-[4rem] p-8 md:p-24 premium-shadow overflow-hidden relative border border-primary/5">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Sparkles className="h-64 w-64 text-primary" />
          </div>
          
          <CardHeader className="p-0 mb-16">
            <CardTitle className="font-headline text-4xl font-extrabold flex items-center gap-4 mb-6 tracking-tighter">
              <Zap className="h-10 w-10 text-primary animate-pulse" /> Qual é o seu objetivo?
            </CardTitle>
            <CardDescription className="text-xl font-medium text-muted-foreground/60 tracking-tight">
              Descreva os desafios da sua marca e onde deseja chegar.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-12">
              <Textarea 
                placeholder="Ex: Quero reposicionar minha joalheria para o público ultra-high-net-worth e triplicar o ticket médio..."
                className="min-h-[250px] bg-white border-transparent focus:ring-primary/10 text-xl p-10 rounded-[3rem] premium-shadow border-none placeholder:text-muted-foreground/30 leading-relaxed shadow-inner"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button 
                type="submit" 
                disabled={loading || !input.trim()} 
                className="w-full h-24 text-2xl font-black bg-primary hover:bg-primary/90 rounded-full shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] uppercase tracking-widest"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-4 h-8 w-8 animate-spin" /> Mapeando Mercado...
                  </>
                ) : (
                  "Solicitar Consultoria AI"
                )}
              </Button>
            </form>

            {result && (
              <div className="mt-24 space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="p-12 md:p-24 rounded-[4.5rem] bg-white border border-primary/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-primary to-accent" />
                  
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <Badge className="mb-6 bg-primary/5 text-primary px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">Diagnóstico Estratégico</Badge>
                      <h3 className="font-headline text-4xl font-extrabold flex items-center gap-4 tracking-tighter">
                        <FileText className="h-10 w-10 text-primary" /> Relatório Sapient
                      </h3>
                    </div>
                    <Sparkles className="h-12 w-12 text-primary/20" />
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-16">
                    {result.recommendedServices.map((service, idx) => (
                      <Badge key={idx} className="bg-primary/5 text-primary border border-primary/10 px-8 py-3 text-xs font-black rounded-full uppercase tracking-widest">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="prose prose-2xl max-w-none text-muted-foreground/80 font-medium leading-relaxed tracking-tight bg-secondary/20 p-10 rounded-[2.5rem] border border-primary/5">
                    <p className="whitespace-pre-line text-lg md:text-xl">
                      {result.reasoning}
                    </p>
                  </div>
                  
                  <div className="mt-16 pt-16 border-t border-muted text-center">
                    <p className="text-sm font-black text-primary uppercase tracking-[0.5em] mb-8">Próximo Passo:</p>
                    <Button className="h-20 px-16 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                      Validar com Especialista
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="link" className="text-muted-foreground/40 font-black text-sm hover:text-primary transition-colors uppercase tracking-widest" onClick={() => {setResult(null); setInput("");}}>
                    Iniciar Nova Análise
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}