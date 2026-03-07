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
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary px-6 py-1.5 text-xs font-bold uppercase tracking-widest">Innovation</Badge>
          <h2 className="font-headline text-4xl md:text-7xl font-bold mb-8 text-foreground tracking-tighter">Consultoria Inteligente</h2>
          <p className="text-muted-foreground text-xl font-medium max-w-3xl mx-auto">
            Nossa IA analisa seus objetivos e sugere o caminho ideal para sua marca alcançar o próximo nível.
          </p>
        </div>

        <Card className="bg-secondary/30 border-none rounded-[3rem] p-6 md:p-12 premium-shadow overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="h-32 w-32 text-primary" />
          </div>
          
          <CardHeader className="p-0 mb-10">
            <CardTitle className="font-headline text-3xl font-extrabold flex items-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-primary" /> Como podemos ajudar?
            </CardTitle>
            <CardDescription className="text-lg font-medium text-muted-foreground">
              Descreva os desafios e metas do seu negócio.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Textarea 
                placeholder="Ex: Quero reposicionar minha clínica estética para o mercado de luxo e aumentar o ticket médio das vendas..."
                className="min-h-[200px] bg-white border-transparent focus:border-primary/20 text-lg p-8 rounded-[2rem] premium-shadow"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button 
                type="submit" 
                disabled={loading || !input.trim()} 
                className="w-full h-20 text-xl font-extrabold bg-primary hover:bg-primary/90 rounded-full shadow-xl shadow-primary/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Analisando Visão...
                  </>
                ) : (
                  "Receber Recomendação AI"
                )}
              </Button>
            </form>

            {result && (
              <div className="mt-16 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-primary/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                  <h3 className="font-headline text-3xl font-extrabold mb-8 flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-primary" /> Diagnóstico Estratégico:
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-10">
                    {result.recommendedServices.map((service, idx) => (
                      <Badge key={idx} className="bg-primary/10 text-primary border-none px-6 py-2 text-sm font-bold rounded-full">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="prose prose-lg max-w-none text-muted-foreground font-medium leading-relaxed">
                    <p className="whitespace-pre-line">
                      {result.reasoning}
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="link" className="text-primary font-bold text-lg hover:underline" onClick={() => {setResult(null); setInput("");}}>
                    Nova Consulta
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