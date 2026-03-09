"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Palette, ArrowUpRight, Bot, Zap, ShieldCheck, Sparkles, Share2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Engenharia de tráfego de alta precisão focada em capturar demanda qualificada no momento exato da intenção.",
    icon: <TrendingUp className="h-8 w-8" />,
    features: ["Google Maps / GMN", "Ads de Alta Intenção", "ROI Estratégico"],
    badge: "Escala",
    color: "text-white",
    bg: "bg-primary"
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Sistemas de identidade visual de autoridade que eliminam o amadorismo e elevam o valor percebido da marca.",
    icon: <Palette className="h-8 w-8" />,
    features: ["Branding de Prestígio", "Design Systems", "Dossiês Premium"],
    badge: "Autoridade",
    color: "text-white",
    bg: "bg-primary"
  },
  {
    title: "Ecossistemas Chat IA",
    slug: "chat-ia",
    description: "Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7.",
    icon: <Bot className="h-8 w-8" />,
    features: ["WhatsApp Inteligente", "Qualificação de Leads", "Automação 4.0"],
    badge: "Tecnologia",
    color: "text-white",
    bg: "bg-primary"
  },
  {
    title: "Gestão de Redes",
    slug: "gestao-social",
    description: "Curadoria de autoridade social desenhada para construir narrativas que facilitam o fechamento comercial.",
    icon: <Share2 className="h-8 w-8" />,
    features: ["Copywriting Técnico", "Design de Autoridade", "Growth Qualificado"],
    badge: "Presença",
    color: "text-white",
    bg: "bg-primary"
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Tradução de processos complexos em infográficos e dossiês de venda de alta cognição e impacto.",
    icon: <FileText className="h-8 w-8" />,
    features: ["Clareza Cognitiva", "Data Visualization", "Propostas de Valor"],
    badge: "Conversão",
    color: "text-white",
    bg: "bg-primary"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-48 md:py-64 bg-white relative overflow-hidden section-flow-top section-flow-bottom">
      <div className="absolute top-0 right-0 p-32 opacity-[0.02] text-primary pointer-events-none">
        <Sparkles className="h-[40rem] w-[40rem]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-40 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
          <div className="max-w-4xl space-y-12">
            <div className="flex items-center gap-6">
               <Zap className="text-primary h-6 w-6" />
               <Badge className="bg-primary/5 text-primary border-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Serviços</Badge>
            </div>
            <h2 className="font-display text-6xl md:text-[8.5rem] font-black text-foreground tracking-tighter leading-[0.85]">
              Protocolos de <br /><span className="text-primary italic">Impacto.</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-8">
            <p className="text-foreground/40 text-2xl md:text-3xl font-medium leading-tight tracking-tight">
              Fundimos design de prestígio e estratégia digital para marcas de elite.
            </p>
            <div className="h-2 w-24 bg-primary rounded-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border border-muted bg-white rounded-[4rem] p-12 transition-all duration-1000 hover:-translate-y-6 hover:shadow-[0_50px_100px_-20px_rgba(139,92,246,0.1)] overflow-hidden flex flex-col justify-between min-h-[550px]"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <div className={cn("h-20 w-20 rounded-3xl flex items-center justify-center transition-all duration-1000 shadow-xl group-hover:scale-110", service.bg, service.color)}>
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="font-black text-[9px] uppercase tracking-[0.4em] px-6 py-3 rounded-full bg-secondary">
                    {service.badge}
                  </Badge>
                </div>

                <CardTitle className="font-display text-4xl mb-6 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors duration-500 leading-none">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-foreground/60 text-xl leading-relaxed font-medium mb-12">
                  {service.description}
                </CardDescription>

                <div className="space-y-4 mb-16">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="relative z-10 flex items-center justify-between p-10 rounded-3xl bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-700 text-[10px] font-black uppercase tracking-[0.5em] group/btn"
              >
                Explorar Detalhes <ArrowUpRight className="h-6 w-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}