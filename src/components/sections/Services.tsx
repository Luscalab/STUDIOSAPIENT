
"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, BarChart3, Zap, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Engenharia de Ads",
    slug: "performance-ads",
    description: "Tráfego de alta precisão focado em capturar demanda qualificada no momento exato.",
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Otimização GMN", "Ads de Intenção", "ROI Monitorado"],
    badge: "Escala",
    colorClass: "text-primary",
    bgGradient: "from-primary/15 via-primary/5 to-transparent",
    hoverBorder: "hover:border-primary/40",
    iconBg: "bg-primary/10"
  },
  {
    title: "Identidade Técnica",
    slug: "design-estrategico",
    description: "Design System de autoridade que elimina o amadorismo e eleva o valor percebido.",
    icon: <Palette className="h-8 w-8" />,
    features: ["Branding de Prestígio", "Design System", "Ativos Premium"],
    badge: "Autoridade",
    colorClass: "text-accent",
    bgGradient: "from-accent/15 via-accent/5 to-transparent",
    hoverBorder: "hover:border-accent/40",
    iconBg: "bg-accent/10"
  },
  {
    title: "Ecossistemas Chat IA",
    slug: "chat-ia",
    description: "Automação inteligente de atendimento e vendas para WhatsApp, Sites e Redes Sociais.",
    icon: <Bot className="h-8 w-8" />,
    features: ["WhatsApp Business IA", "Agentes de Venda", "Escalabilidade"],
    badge: "Tecnologia",
    colorClass: "text-cyan-500",
    bgGradient: "from-cyan-500/15 via-cyan-500/5 to-transparent",
    hoverBorder: "hover:border-cyan-500/40",
    iconBg: "bg-cyan-500/10"
  },
  {
    title: "Curadoria Social",
    slug: "gestao-social",
    description: "Gestão estratégica focada em transformar redes sociais em provas de competência técnica.",
    icon: <Share2 className="h-8 w-8" />,
    features: ["Copywriting Técnico", "Growth Qualificado", "Prova Social"],
    badge: "Presença",
    colorClass: "text-purple-500",
    bgGradient: "from-purple-500/15 via-purple-500/5 to-transparent",
    hoverBorder: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10"
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Simplificação de processos complexos em materiais de venda de alta cognição.",
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["Dossiês de Venda", "Infográficos de Valor", "Data Viz"],
    badge: "Clareza",
    colorClass: "text-indigo-500",
    bgGradient: "from-indigo-500/15 via-indigo-500/5 to-transparent",
    hoverBorder: "hover:border-indigo-500/40",
    iconBg: "bg-indigo-500/10"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-24 md:py-48 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[140px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div className="max-w-4xl">
            <Badge className="mb-8 bg-foreground/5 text-foreground/50 border-foreground/10 px-8 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Dossiê de Intervenção</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-4">
              Arquitetura de<br />
              <span className="text-primary italic opacity-90">Soluções.</span>
            </h2>
          </div>
          <p className="text-muted-foreground/60 max-w-sm text-xl md:text-2xl font-medium leading-relaxed tracking-tight lg:pb-8">
            Fundimos design profissional e engenharia comercial para criar ecossistemas de alta performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "group relative border-none bg-white/40 backdrop-blur-2xl rounded-[4rem] p-2 transition-all duration-700 hover:-translate-y-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]",
                service.hoverBorder
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
                service.bgGradient
              )} />
              
              <div className="relative z-10 p-10 md:p-12 flex flex-col h-full">
                <div className="flex justify-between items-start mb-14">
                  <div className={cn(
                    "h-20 w-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-inner border border-white/20",
                    service.iconBg,
                    service.colorClass
                  )}>
                    {service.icon}
                  </div>
                  <Badge variant="outline" className="border-foreground/10 text-foreground/40 font-black text-[9px] uppercase tracking-[0.3em] px-6 py-2.5 rounded-full backdrop-blur-md">
                    {service.badge}
                  </Badge>
                </div>

                <div className="flex-1">
                  <CardTitle className="font-headline text-3xl mb-6 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/70 text-lg leading-relaxed font-medium mb-12">
                    {service.description}
                  </CardDescription>

                  <ul className="space-y-5 mb-14">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-4 text-sm font-bold text-muted-foreground/50 group-hover:text-foreground transition-colors">
                        <Zap className={cn("h-4 w-4", service.colorClass)} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={`/servicos/${service.slug}`} 
                  className="w-full flex items-center justify-between p-8 rounded-[2.5rem] bg-secondary/50 group-hover:bg-primary group-hover:text-white group-hover:shadow-2xl transition-all duration-700 text-[10px] font-black uppercase tracking-[0.4em] border border-foreground/5"
                >
                  Explorar Dossiê <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
