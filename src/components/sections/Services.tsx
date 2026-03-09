"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, ArrowUpRight, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Engenharia de Ads",
    slug: "performance-ads",
    description: "Tráfego de alta precisão focado em capturar demanda qualificada no momento exato.",
    icon: <Megaphone className="h-7 w-7" />,
    features: ["Otimização GMN", "Ads de Intenção", "ROI Estratégico"],
    badge: "Escala",
    color: "text-primary",
    glow: "group-hover:shadow-primary/20"
  },
  {
    title: "Identidade Técnica",
    slug: "design-estrategico",
    description: "Design System de autoridade que elimina o amadorismo e eleva o valor percebido.",
    icon: <Palette className="h-7 w-7" />,
    features: ["Branding de Prestígio", "Design System", "Ativos Premium"],
    badge: "Autoridade",
    color: "text-accent",
    glow: "group-hover:shadow-accent/20"
  },
  {
    title: "Ecossistemas Chat IA",
    slug: "chat-ia",
    description: "Automação inteligente de atendimento e vendas para WhatsApp e Redes Sociais.",
    icon: <Bot className="h-7 w-7" />,
    features: ["Agentes de Venda", "Escalabilidade", "WhatsApp IA"],
    badge: "Tecnologia",
    color: "text-cyan-500",
    glow: "group-hover:shadow-cyan-500/20"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-32 md:py-64 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-32 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-16">
          <div className="max-w-4xl">
            <Badge className="mb-10 bg-primary/10 text-primary border-none px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Dossiê de Intervenção</Badge>
            <h2 className="font-display text-6xl md:text-[7.5rem] font-black text-foreground tracking-tighter leading-[0.85]">
              Protocolos de <br /><span className="text-primary italic">Impacto.</span>
            </h2>
          </div>
          <p className="text-muted-foreground/60 text-2xl md:text-3xl font-medium max-w-sm leading-tight tracking-tight">
            Fundimos design de prestígio e engenharia comercial para criar ecossistemas de alta performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "group relative border border-muted bg-white rounded-[3.5rem] p-12 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_100px_-20px_rgba(139,92,246,0.15)] overflow-hidden",
                service.glow
              )}
            >
              <div className="flex justify-between items-start mb-16">
                <div className={cn("h-24 w-24 rounded-[2.5rem] flex items-center justify-center bg-secondary transition-all duration-700 group-hover:bg-primary group-hover:text-white shadow-xl", service.color)}>
                  {service.icon}
                </div>
                <Badge variant="secondary" className="font-black text-[9px] uppercase tracking-[0.4em] px-6 py-3 rounded-full">
                  {service.badge}
                </Badge>
              </div>

              <CardTitle className="font-display text-4xl mb-8 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors duration-500 leading-none">
                {service.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground/60 text-xl leading-relaxed font-medium mb-12">
                {service.description}
              </CardDescription>

              <ul className="space-y-6 mb-16">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 group-hover:text-foreground transition-colors">
                    <div className="h-2 w-2 rounded-full bg-primary/20" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-10 rounded-[2.5rem] bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-700 text-[11px] font-black uppercase tracking-[0.5em]"
              >
                Explorar Dossiê <ArrowUpRight className="h-6 w-6" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}