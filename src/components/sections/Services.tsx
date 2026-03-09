"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Palette, ArrowUpRight, Bot, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Tráfego de precisão focado em capturar demanda qualificada no momento exato da intenção.",
    icon: <TrendingUp className="h-10 w-10" />,
    features: ["Google Maps Estratégico", "Ads de Alta Conversão", "Engenharia de ROI"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Sistemas de identidade visual que eliminam o amadorismo e elevam o valor real da marca.",
    icon: <Palette className="h-10 w-10" />,
    features: ["Branding de Prestígio", "Design Systems", "Dossiês de Venda"]
  },
  {
    title: "Ecossistemas IA",
    slug: "chat-ia",
    description: "Agentes inteligentes treinados na sua expertise para atender e converter leads 24/7.",
    icon: <Bot className="h-10 w-10" />,
    features: ["WhatsApp Inteligente", "Automação de Vendas", "Atendimento 24/7"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-24 md:py-48 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center md:text-left max-w-4xl">
          <h2 className="font-headline text-4xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none uppercase">
            SOLUÇÕES <br />
            <span className="text-primary italic font-medium">DE ELITE.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border-none bg-secondary/50 rounded-[3.5rem] p-12 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between min-h-[650px] overflow-hidden border border-muted/5"
            >
              <div className="relative z-10">
                <div className="mb-16">
                  <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                    {service.icon}
                  </div>
                </div>

                <CardTitle className="font-headline text-3xl md:text-5xl mb-8 tracking-tighter font-black text-black uppercase leading-none">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-black/50 text-lg md:text-xl leading-relaxed font-medium mb-12 tracking-tight">
                  {service.description}
                </CardDescription>

                <div className="space-y-6 mb-16">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 group-hover:text-black/60 transition-colors">
                      <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-10 rounded-2xl bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.5em] border border-muted shadow-sm"
              >
                Explorar Solução <ArrowUpRight className="h-6 w-6" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
