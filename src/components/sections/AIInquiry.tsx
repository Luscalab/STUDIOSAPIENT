
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
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 py-1 px-4">
            AI Assistant
          </Badge>
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">Consultoria Inteligente</h2>
          <p className="text-muted-foreground">
            Conte-nos sobre seus desafios e nossa inteligência artificial recomendará os melhores serviços da Sapient para você.
          </p>
        </div>

        <Card className="bg-card/40 border-primary/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Como podemos ajudar?
            </CardTitle>
            <CardDescription>
              Descreva brevemente seu negócio e seus objetivos atuais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea 
                placeholder="Ex: Sou dono de uma loja de vinhos de luxo e quero aumentar minhas vendas online e melhorar minha presença no Instagram..."
                className="min-h-[150px] bg-background/50 border-primary/20 focus:border-primary"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button 
                type="submit" 
                disabled={loading || !input.trim()} 
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analisando necessidades...
                  </>
                ) : (
                  "Receber Recomendação AI"
                )}
              </Button>
            </form>

            {result && (
              <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                  <h3 className="font-headline text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" /> Nossa Recomendação:
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {result.recommendedServices.map((service, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/20 text-foreground border-primary/30 px-3 py-1">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">
                      {result.reasoning}
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="link" className="text-primary hover:text-primary/80" onClick={() => {setResult(null); setInput("");}}>
                    Fazer outra consulta
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
