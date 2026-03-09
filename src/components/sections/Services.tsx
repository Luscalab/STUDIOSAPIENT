"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Palette, ArrowUpRight, Bot, Share2, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Tráfego de alta precisão focado em capturar demanda qualificada no momento exato da intenção.",
    icon: <TrendingUp className="h-10 w-10 text-white" />,
    features: ["Google Maps Estratégico", "Ads de Alta Conversão", "Engenharia de ROI"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Sistemas de identidade visual que eliminam o amadorismo e elevam o valor percebido da marca.",
    icon: <Palette className="h-10 w-10 text-white" />,
    features: ["Branding de Prestígio", "Design Systems", "Dossiês de Venda"]
  },
  {
    title: "Gestão de Redes",
    slug: "gestao-social",
    description: "Curadoria estratégica e conteúdo de alto impacto para construir autoridade inquestionável.",
    icon: <Share2 className="h-10 w-10 text-white" />,
    features: ["Feed de Autoridade", "Copywriting de Valor", "Growth Qualificado"]
  },
  {
    title: "Ecossistemas IA",
    slug: "chat-ia",
    description: "Agentes inteligentes treinados na sua expertise para atender e converter leads 24/7.",
    icon: <Bot className="h-10 w-10 text-white" />,
    features: ["WhatsApp Inteligente", "Automação de Vendas", "Atendimento 24/7"]
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Transformamos processos complexos em narrativas visuais de alta compreensão e desejo.",
    icon: <FileText className="h-10 w-10 text-white" />,
    features: ["Infográficos Técnicos", "Clareza Cognitiva", "Apresentações de Elite"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-32 md:py-64 bg-white relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-40 text-center max-w-5xl mx-auto space-y-12">
          <h2 className="font-headline text-6xl md:text-[8.5rem] font-black text-black tracking-tighter leading-[0.85] uppercase text-balance">
            SER<span className="text-primary italic">VIÇOS.</span>
          </h2>
          <p className="text-black/40 text-2xl md:text-4xl font-medium leading-tight tracking-tight max-w-3xl mx-auto">
            Fundimos design de prestígio e estratégia digital para marcas que buscam clareza e autoridade absoluta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative border-none bg-secondary/50 rounded-[3.5rem] p-12 md:p-16 transition-all duration-700 hover:-translate-y-6 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[650px] overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary group-hover:scale-110 transition-transform duration-1000">
                {service.icon}
              </div>
              
              <div className="relative z-10">
                <div className="mb-16">
                  <div className="h-24 w-24 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                    {service.icon}
                  </div>
                </div>

                <CardTitle className="font-headline text-4xl md:text-5xl mb-8 tracking-tighter font-black text-black group-hover:text-primary transition-colors duration-700 uppercase leading-none">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-black/60 text-xl md:text-2xl leading-relaxed font-medium mb-12 tracking-tight">
                  {service.description}
                </CardDescription>

                <div className="space-y-6 mb-16">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-6 text-[12px] font-black uppercase tracking-[0.4em] text-black/30 group-hover:text-black/60 transition-colors">
                      <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/servicos/${service.slug}`} 
                className="flex items-center justify-between p-12 rounded-[2rem] bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[11px] font-black uppercase tracking-[0.5em] group/btn border border-muted shadow-sm relative z-10"
              >
                Explorar Solução <ArrowUpRight className="h-8 w-8 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}