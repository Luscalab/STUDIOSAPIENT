"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, BarChart3, Bot, Shield, Sparkles } from "lucide-react";
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
    <section id="servicos" className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-none px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">Dossiê de Intervenção</Badge>
            <h2 className="font-display text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none">
              Protocolos de <span className="text-primary italic">Impacto.</span>
            </h2>
          </div>
          <p className="text-muted-foreground/60 text-xl md:text-2xl font-medium max-w-sm leading-tight tracking-tight">
            Fundimos design de prestígio e engenharia comercial para criar ecossistemas de alta performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "group relative border border-muted bg-white rounded-[3rem] p-10 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden",
                service.glow
              )}
            >
              <div className="flex justify-between items-start mb-12">
                <div className={cn("h-20 w-20 rounded-[2rem] flex items-center justify-center bg-secondary transition-all duration-700 group-hover:bg-primary group-hover:text-white shadow-xl", service.color)}>
                  {service.icon}
                </div>
                <Badge variant="secondary" className="font-black text-[8px] uppercase tracking-[0.3em] px-5 py-2 rounded-full">
                  {service.badge}
                </Badge>
              </div>

              <CardTitle className="font-display text-3xl mb-6 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors duration-500">
                {service.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground/60 text-lg leading-snug font-medium mb-10">
                {service.description}
              </CardDescription>

              <ul className="space-y-4 mb-12">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 group-hover:text-foreground transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-8 rounded-2xl bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.4em]"
              >
                Explorar Dossiê <ArrowUpRight className="h-5 w-5" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}