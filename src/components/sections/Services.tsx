"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Palette, ArrowUpRight, Bot, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Atraia o público certo para o seu negócio com campanhas otimizadas e focadas em conversão.",
    icon: <TrendingUp className="h-10 w-10" />,
    features: ["Visibilidade no Google", "Anúncios Segmentados", "Análise de Resultados"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Crie uma identidade visual que transmita confiança e reflita a verdadeira qualidade do seu trabalho.",
    icon: <Palette className="h-10 w-10" />,
    features: ["Identidade de Marca", "Materiais de Venda", "Design para Redes"]
  },
  {
    title: "Atendimento com IA",
    slug: "chat-ia",
    description: "Agilize o atendimento aos seus clientes com assistentes inteligentes que funcionam 24h por dia.",
    icon: <Bot className="h-10 w-10" />,
    features: ["WhatsApp Ágil", "Respostas Imediatas", "Triagem de Contatos"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-24 md:py-48 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center md:text-left max-w-4xl">
          <h2 className="font-headline text-4xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none uppercase">
            COMO PODEMOS <br />
            <span className="text-primary italic font-medium">AJUDAR.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border-none bg-secondary/30 rounded-[3.5rem] p-12 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between min-h-[600px] overflow-hidden border border-muted/5"
            >
              <div className="relative z-10">
                <div className="mb-12">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                    {service.icon}
                  </div>
                </div>

                <CardTitle className="font-headline text-3xl md:text-4xl mb-6 tracking-tighter font-black text-black uppercase leading-none">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-black/50 text-lg leading-relaxed font-medium mb-12 tracking-tight">
                  {service.description}
                </CardDescription>

                <div className="space-y-4 mb-16">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-black/70 transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-8 rounded-2xl bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.4em] border border-muted shadow-sm"
              >
                Saber Mais <ArrowUpRight className="h-5 w-5" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
