"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Palette, ArrowUpRight, Bot, Share2, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Tráfego de alta precisão focado em capturar demanda qualificada no momento exato da intenção.",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    features: ["Google Maps / GMN", "Ads de Alta Intenção", "ROI Estratégico"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Sistemas de identidade visual que eliminam o amadorismo e elevam o valor percebido da marca.",
    icon: <Palette className="h-8 w-8 text-white" />,
    features: ["Branding de Prestígio", "Design Systems", "Dossiês Premium"]
  },
  {
    title: "Gestão de Redes",
    slug: "gestao-social",
    description: "Curadoria estratégica e conteúdo de alto impacto para construir autoridade inquestionável no digital.",
    icon: <Share2 className="h-8 w-8 text-white" />,
    features: ["Feed de Autoridade", "Copywriting Estratégico", "Growth Qualificado"]
  },
  {
    title: "Ecossistemas IA",
    slug: "chat-ia",
    description: "Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7.",
    icon: <Bot className="h-8 w-8 text-white" />,
    features: ["WhatsApp Inteligente", "Automação via API", "Atendimento 24/7"]
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Transformamos processos complexos em narrativas visuais de alta compreensão e desejo imediato.",
    icon: <FileText className="h-8 w-8 text-white" />,
    features: ["Infográficos de Valor", "Apresentações de Elite", "Clareza Cognitiva"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-32 md:py-64 bg-white relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-32 text-center max-w-4xl mx-auto space-y-10">
          <h2 className="font-display text-6xl md:text-[8.5rem] font-black text-black tracking-tighter leading-[0.85] uppercase text-balance">
            SER<span className="text-primary italic">VIÇOS.</span>
          </h2>
          <p className="text-black/40 text-2xl md:text-3xl font-medium leading-relaxed tracking-tight max-w-2xl mx-auto">
            Fundimos design de prestígio e estratégia digital para marcas que buscam clareza e autoridade absoluta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border border-muted/20 bg-secondary/40 rounded-[3.5rem] p-12 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl flex flex-col justify-between min-h-[550px] shadow-xl border-none"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                    {service.icon}
                  </div>
                  <div className="h-2 w-2 rounded-full bg-primary/20 group-hover:bg-primary transition-all duration-700" />
                </div>

                <CardTitle className="font-display text-4xl mb-6 tracking-tighter font-black text-black group-hover:text-primary transition-colors duration-700 uppercase leading-none">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-black/60 text-xl leading-relaxed font-medium mb-12 tracking-tight">
                  {service.description}
                </CardDescription>

                <div className="space-y-5 mb-12">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-5 text-[12px] font-black uppercase tracking-[0.4em] text-black/30 group-hover:text-black/50 transition-colors">
                      <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-10 rounded-3xl bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 text-[11px] font-black uppercase tracking-[0.5em] group/btn border border-muted/10 shadow-sm"
              >
                Explorar Solução <ArrowUpRight className="h-6 w-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}