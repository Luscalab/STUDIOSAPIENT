"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Palette, ArrowUpRight, Bot, Share2, FileText, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Tráfego de alta precisão focado em capturar demanda qualificada no momento exato da intenção.",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    features: ["Google Maps / GMN", "Ads de Alta Intenção", "ROI Estratégico"],
    badge: "Escala"
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Sistemas de identidade visual que eliminam o amadorismo e elevam o valor percebido da marca.",
    icon: <Palette className="h-8 w-8 text-white" />,
    features: ["Branding de Prestígio", "Design Systems", "Dossiês Premium"],
    badge: "Autoridade"
  },
  {
    title: "Gestão de Redes",
    slug: "gestao-social",
    description: "Curadoria estratégica e conteúdo de alto impacto para construir autoridade inquestionável no digital.",
    icon: <Share2 className="h-8 w-8 text-white" />,
    features: ["Feed de Autoridade", "Copywriting Estratégico", "Growth Qualificado"],
    badge: "Social"
  },
  {
    title: "Ecossistemas IA",
    slug: "chat-ia",
    description: "Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7.",
    icon: <Bot className="h-8 w-8 text-white" />,
    features: ["WhatsApp Inteligente", "Automação via API", "Atendimento 24/7"],
    badge: "Tecnologia"
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Transformamos processos complexos em narrativas visuais de alta compreensão e desejo imediato.",
    icon: <FileText className="h-8 w-8 text-white" />,
    features: ["Infográficos de Valor", "Apresentações de Elite", "Clareza Cognitiva"],
    badge: "Estratégia"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-32 md:py-48 bg-white relative overflow-hidden section-flow-bottom">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center max-w-4xl mx-auto space-y-8">
          <h2 className="font-display text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-none uppercase text-balance">
            SER<span className="text-primary italic">VIÇOS.</span>
          </h2>
          <p className="text-foreground/50 text-xl md:text-2xl font-medium leading-relaxed tracking-tight max-w-2xl mx-auto">
            Fundimos design de prestígio e estratégia digital para marcas que buscam clareza e autoridade absoluta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border border-muted/30 bg-white rounded-[3.5rem] p-10 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl flex flex-col justify-between min-h-[500px] shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="font-black text-[9px] uppercase tracking-[0.3em] px-5 py-2 rounded-full bg-secondary text-muted-foreground">
                    {service.badge}
                  </Badge>
                </div>

                <CardTitle className="font-display text-3xl mb-4 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors uppercase leading-none">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-foreground/60 text-lg leading-relaxed font-medium mb-10 tracking-tight">
                  {service.description}
                </CardDescription>

                <div className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/50">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-8 rounded-2xl bg-secondary text-foreground hover:bg-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.4em] group/btn"
              >
                Explorar Solução <ArrowUpRight className="h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}