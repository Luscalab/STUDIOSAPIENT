"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Palette, ArrowUpRight, Bot, Share2, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Tráfego de precisão focado em capturar demanda qualificada no momento exato da intenção.",
    icon: <TrendingUp className="h-14 w-14" />,
    features: ["Google Maps Estratégico", "Ads de Alta Conversão", "Engenharia de ROI"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Sistemas de identidade visual que eliminam o amadorismo e elevam o valor real da marca.",
    icon: <Palette className="h-14 w-14" />,
    features: ["Branding de Prestígio", "Design Systems", "Dossiês de Venda"]
  },
  {
    title: "Ecossistemas IA",
    slug: "chat-ia",
    description: "Agentes inteligentes treinados na sua expertise para atender e converter leads 24/7.",
    icon: <Bot className="h-14 w-14" />,
    features: ["WhatsApp Inteligente", "Automação de Vendas", "Atendimento 24/7"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-48 md:py-64 bg-white relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-6 my-12 shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-48 text-center max-w-[1400px] mx-auto">
          <h2 className="font-headline text-6xl md:text-[9.5rem] font-black text-black tracking-tighter leading-[0.8] uppercase mb-12">
            SER<span className="text-primary italic font-medium">VIÇOS.</span>
          </h2>
          <p className="text-black/30 text-2xl md:text-5xl font-medium leading-tight tracking-tight max-w-4xl mx-auto">
            Fundimos design de prestígio e estratégia digital para marcas que buscam clareza e autoridade absoluta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-[1600px] mx-auto">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border-none bg-secondary/40 rounded-[4.5rem] p-16 md:p-24 transition-all duration-1000 hover:-translate-y-12 hover:shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[850px] overflow-hidden"
            >
              <div className="relative z-10">
                <div className="mb-24">
                  <div className="h-32 w-32 rounded-[3rem] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/30 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6">
                    {service.icon}
                  </div>
                </div>

                <CardTitle className="font-headline text-4xl md:text-6xl mb-12 tracking-tighter font-black text-black group-hover:text-primary transition-colors duration-700 uppercase leading-none">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-black/50 text-xl md:text-3xl leading-relaxed font-medium mb-20 tracking-tight">
                  {service.description}
                </CardDescription>

                <div className="space-y-10 mb-24">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.5em] text-black/20 group-hover:text-black/60 transition-colors">
                      <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-14 rounded-[3rem] bg-white text-black hover:bg-black hover:text-white transition-all duration-1000 text-[11px] font-black uppercase tracking-[0.6em] border border-muted shadow-sm"
              >
                Explorar Solução <ArrowUpRight className="h-8 w-8 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}