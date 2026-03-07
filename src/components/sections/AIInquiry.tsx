"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { recommendServices, type ServiceRecommenderOutput } from "@/ai/flows/ai-service-recommender";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
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
          <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em]">Tecnologia Própria</Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-bold mb-10 text-foreground tracking-tighter leading-none">Concierge<br />Inteligente</h2>
          <p className="text-muted-foreground/70 text-2xl font-medium max-w-3xl mx-auto tracking-tight">
            Nossa inteligência artificial analisa sua visão e desenha o mapa estratégico ideal para sua dominação de mercado.
          </p>
        </div>

        <Card className="bg-secondary/30 border-none rounded-[4rem] p-10 md:p-20 premium-shadow overflow-hidden relative border border-primary/5">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Sparkles className="h-48 w-48 text-primary" />
          </div>
          
          <CardHeader className="p-0 mb-16">
            <CardTitle className="font-headline text-4xl font-extrabold flex items-center gap-4 mb-6 tracking-tighter">
              <Sparkles className="h-10 w-10 text-primary" /> Qual é o seu objetivo?
            </CardTitle>
            <CardDescription className="text-xl font-medium text-muted-foreground/70 tracking-tight">
              Descreva os desafios da sua marca e onde deseja chegar.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-12">
              <Textarea 
                placeholder="Ex: Quero reposicionar minha joalheria para o público ultra-high-net-worth e triplicar o ticket médio..."
                className="min-h-[250px] bg-white border-transparent focus:ring-primary/10 text-xl p-10 rounded-[3rem] premium-shadow border-none placeholder:text-muted-foreground/30 leading-relaxed"
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
                    <Loader2 className="mr-4 h-8 w-8 animate-spin" /> Processando Visão...
                  </>
                ) : (
                  "Solicitar Consultoria AI"
                )}
              </Button>
            </form>

            {result && (
              <div className="mt-20 space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="p-12 md:p-20 rounded-[4rem] bg-white border border-primary/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-3 h-full bg-primary" />
                  <h3 className="font-headline text-4xl font-extrabold mb-12 flex items-center gap-4 tracking-tighter">
                    <CheckCircle2 className="h-10 w-10 text-primary" /> Diagnóstico da Sapient:
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 mb-12">
                    {result.recommendedServices.map((service, idx) => (
                      <Badge key={idx} className="bg-primary/5 text-primary border border-primary/10 px-10 py-3 text-sm font-black rounded-full uppercase tracking-widest">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="prose prose-2xl max-w-none text-muted-foreground/80 font-medium leading-relaxed tracking-tight">
                    <p className="whitespace-pre-line">
                      {result.reasoning}
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="link" className="text-primary font-black text-xl hover:underline uppercase tracking-widest" onClick={() => {setResult(null); setInput("");}}>
                    Nova Estratégia
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