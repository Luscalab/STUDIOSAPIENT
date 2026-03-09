
"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, BarChart3, Bot, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Engenharia de Ads",
    slug: "performance-ads",
    description: "Tráfego de alta precisão focado em capturar demanda qualificada no momento exato da necessidade.",
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Otimização GMN", "Ads de Intenção", "ROI Monitorado"],
    badge: "Escala",
    colorClass: "text-primary",
    bgGradient: "from-primary/20 via-primary/5 to-transparent",
    hoverBorder: "hover:border-primary/40",
    iconBg: "bg-primary/10"
  },
  {
    title: "Identidade Técnica",
    slug: "design-estrategico",
    description: "Design System de autoridade que elimina o amadorismo e eleva o valor percebido do seu ativo.",
    icon: <Palette className="h-8 w-8" />,
    features: ["Branding de Prestígio", "Design System", "Ativos Premium"],
    badge: "Autoridade",
    colorClass: "text-accent",
    bgGradient: "from-accent/20 via-accent/5 to-transparent",
    hoverBorder: "hover:border-accent/40",
    iconBg: "bg-accent/10"
  },
  {
    title: "Ecossistemas Chat IA",
    slug: "chat-ia",
    description: "Automação inteligente de atendimento e vendas para WhatsApp, Sites e Redes Sociais 24/7.",
    icon: <Bot className="h-8 w-8" />,
    features: ["WhatsApp Business IA", "Agentes de Venda", "Escalabilidade"],
    badge: "Tecnologia",
    colorClass: "text-cyan-500",
    bgGradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    hoverBorder: "hover:border-cyan-500/40",
    iconBg: "bg-cyan-500/10"
  },
  {
    title: "Curadoria Social",
    slug: "gestao-social",
    description: "Gestão estratégica focada em transformar redes sociais em provas de competência técnica inquestionáveis.",
    icon: <Share2 className="h-8 w-8" />,
    features: ["Copywriting Técnico", "Growth Qualificado", "Prova Social"],
    badge: "Presença",
    colorClass: "text-purple-500",
    bgGradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    hoverBorder: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10"
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Simplificação de processos complexos em materiais de venda de alta cognição e impacto.",
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["Dossiês de Venda", "Infográficos de Valor", "Data Viz"],
    badge: "Clareza",
    colorClass: "text-indigo-500",
    bgGradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    hoverBorder: "hover:border-indigo-500/40",
    iconBg: "bg-indigo-500/10"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-32 md:py-64 relative overflow-hidden bg-background">
      {/* Background Sophistication - More Purple */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[200px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-32 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
               <div className="h-px w-12 bg-primary/30" />
               <Badge className="bg-primary/10 text-primary border-primary/20 px-8 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-none">Dossiê de Intervenção</Badge>
            </div>
            <h2 className="font-display text-5xl md:text-[9.5rem] font-black text-foreground tracking-tighter leading-[0.8] mb-8">
              Protocolos de <br />
              <span className="text-primary italic">Impacto.</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-8 lg:pb-12">
            <p className="text-muted-foreground/80 text-xl md:text-2xl font-medium leading-tight tracking-tight">
              Fundimos design de prestígio e engenharia comercial para criar ecossistemas de alta performance.
            </p>
            <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
              <Shield className="h-4 w-4" /> Soluções Customizadas
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "group relative border-none bg-white/5 backdrop-blur-3xl rounded-[4rem] p-2 transition-all duration-1000 hover:-translate-y-8 shadow-[0_40px_100px_-20px_rgba(139,92,246,0.1)] overflow-hidden border border-white/10",
                service.hoverBorder
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
                service.bgGradient
              )} />
              
              <div className="relative z-10 p-12 md:p-16 flex flex-col h-full">
                <div className="flex justify-between items-start mb-20">
                  <div className={cn(
                    "h-24 w-24 rounded-[2.5rem] flex items-center justify-center transition-all duration-1000 group-hover:scale-110 shadow-2xl border border-white/20",
                    service.iconBg,
                    service.colorClass
                  )}>
                    {service.icon}
                  </div>
                  <Badge variant="outline" className="border-white/10 text-primary/60 font-black text-[8px] uppercase tracking-[0.4em] px-8 py-3 rounded-full bg-white/5 backdrop-blur-md">
                    {service.badge}
                  </Badge>
                </div>

                <div className="flex-1">
                  <CardTitle className="font-display text-4xl mb-8 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors duration-700">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/70 text-xl leading-snug font-medium mb-16 max-w-xs">
                    {service.description}
                  </CardDescription>

                  <ul className="space-y-6 mb-20">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 group-hover:text-foreground transition-all duration-700">
                        <div className={cn("h-1.5 w-1.5 rounded-full", service.iconBg)} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={`/servicos/${service.slug}`} 
                  className="w-full flex items-center justify-between p-10 rounded-[3rem] bg-white text-black group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_25px_50px_rgba(139,92,246,0.4)] transition-all duration-1000 text-[11px] font-black uppercase tracking-[0.5em]"
                >
                  Explorar Dossiê <ArrowUpRight className="h-6 w-6" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
