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
    icon: <TrendingUp className="h-10 w-10 text-white" />,
    features: ["Google Maps / GMN", "Ads de Alta Intenção", "ROI Estratégico"],
    badge: "Escala",
    bg: "bg-primary"
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Sistemas de identidade visual de autoridade que eliminam o amadorismo e elevam o valor percebido da marca.",
    icon: <Palette className="h-10 w-10 text-white" />,
    features: ["Branding de Prestígio", "Design Systems", "Dossiês Premium"],
    badge: "Autoridade",
    bg: "bg-primary"
  },
  {
    title: "Ecossistemas Chat IA",
    slug: "chat-ia",
    description: "Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7.",
    icon: <Bot className="h-10 w-10 text-white" />,
    features: ["WhatsApp Inteligente", "Qualificação de Leads", "Automação 4.0"],
    badge: "Tecnologia",
    bg: "bg-primary"
  },
  {
    title: "Gestão de Redes",
    slug: "gestao-social",
    description: "Curadoria de autoridade social desenhada para construir narrativas que facilitam o fechamento comercial.",
    icon: <Share2 className="h-10 w-10 text-white" />,
    features: ["Copywriting Técnico", "Design de Autoridade", "Growth Qualificado"],
    badge: "Presença",
    bg: "bg-primary"
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Tradução de processos complexos em infográficos e dossiês de venda de alta cognição e impacto.",
    icon: <FileText className="h-10 w-10 text-white" />,
    features: ["Clareza Cognitiva", "Data Visualization", "Propostas de Valor"],
    badge: "Conversão",
    bg: "bg-primary"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-48 md:py-80 bg-white relative overflow-hidden section-flow-bottom">
      <div className="absolute top-0 right-0 p-32 opacity-[0.02] text-primary pointer-events-none">
        <Sparkles className="h-[60rem] w-[60rem]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-48 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-24">
          <div className="max-w-6xl space-y-12">
            <div className="flex items-center gap-10">
               <Zap className="text-primary h-10 w-10 animate-pulse" />
               <Badge className="bg-primary/10 text-primary border-none px-14 py-6 text-[12px] font-black uppercase tracking-[1em] rounded-full font-display">Especialidades</Badge>
            </div>
            <h2 className="font-display text-6xl md:text-[10.5rem] font-black text-foreground tracking-tighter leading-[0.8] uppercase">
              Protocolos de <br /><span className="text-primary italic">Impacto.</span>
            </h2>
          </div>
          <div className="max-w-lg space-y-12">
            <p className="text-foreground/40 text-3xl md:text-5xl font-medium leading-tight tracking-tighter font-body">
              Fundimos design de prestígio e estratégia digital para marcas de elite.
            </p>
            <div className="h-2.5 w-40 bg-primary rounded-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border border-muted/30 bg-white rounded-[5rem] p-16 transition-all duration-1000 hover:-translate-y-8 hover:shadow-[0_60px_120px_rgba(139,92,246,0.12)] overflow-hidden flex flex-col justify-between min-h-[750px] shadow-sm"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-24">
                  <div className={cn("h-32 w-32 rounded-[3.5rem] flex items-center justify-center transition-all duration-1000 shadow-xl group-hover:scale-110 group-hover:rotate-6", service.bg)}>
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="font-black text-[12px] uppercase tracking-[0.5em] px-10 py-5 rounded-full bg-secondary font-display text-muted-foreground border-none">
                    {service.badge}
                  </Badge>
                </div>

                <CardTitle className="font-display text-5xl md:text-6xl mb-10 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors duration-700 leading-none uppercase">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-foreground/60 text-2xl md:text-3xl leading-snug font-medium mb-20 font-body tracking-tight">
                  {service.description}
                </CardDescription>

                <div className="space-y-8 mb-20">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-6 text-[13px] font-black uppercase tracking-[0.5em] text-foreground/70 font-display">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="relative z-10 flex items-center justify-between p-14 rounded-[2.5rem] bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-1000 text-[12px] font-black uppercase tracking-[0.6em] group/btn font-display shadow-inner"
              >
                Explorar Detalhes <ArrowUpRight className="h-8 w-8 group-hover/btn:translate-x-3 group-hover/btn:-translate-y-3 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}