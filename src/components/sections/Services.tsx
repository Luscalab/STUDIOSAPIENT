"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  TrendingUp, 
  Palette, 
  ArrowUpRight, 
  Bot, 
  CheckCircle2, 
  Users, 
  FileText
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Atraia o público certo para o seu negócio com campanhas otimizadas e focadas em conversão imediata.",
    icon: <TrendingUp className="h-10 w-10" />,
    features: ["Visibilidade no Google", "Anúncios Segmentados", "Otimização de GMN"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Crie uma identidade visual de prestígio que transmita confiança e reflita a verdadeira qualidade do seu trabalho.",
    icon: <Palette className="h-10 w-10" />,
    features: ["Identidade de Marca", "Design de Prestígio", "Psicologia Visual"]
  },
  {
    title: "Atendimento com IA",
    slug: "chat-ia",
    description: "Agilize o atendimento aos seus clientes com assistentes inteligentes treinados na sua expertise 24/7.",
    icon: <Bot className="h-10 w-10" />,
    features: ["WhatsApp Business IA", "Qualificação de Leads", "Respostas Imediatas"]
  },
  {
    title: "Gestão Social",
    slug: "gestao-social",
    description: "Construímos autoridade inquestionável através de curadoria estratégica e conteúdo de alto impacto visual.",
    icon: <Users className="h-10 w-10" />,
    features: ["Curadoria de Conteúdo", "Autoridade Digital", "Growth Qualificado"]
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Transformamos processos complexos em dossiês de venda e infográficos de alta compreensão e desejo.",
    icon: <FileText className="h-10 w-10" />,
    features: ["Dossiês de Venda", "Infográficos Técnicos", "Clareza de Valor"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-16 md:py-32 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 md:mb-24 text-center md:text-left max-w-4xl">
          <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter leading-none uppercase">
            COMO PODEMOS <br />
            <span className="text-primary italic font-medium">AJUDAR.</span>
          </h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-[1600px] mx-auto"
        >
          <CarouselContent className="-ml-4">
            {services.map((service, idx) => (
              <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="group relative border-none bg-secondary/30 rounded-[3.5rem] p-10 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between min-h-[580px] h-full overflow-hidden border border-muted/5"
                >
                  <div className="relative z-10">
                    <div className="mb-10">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                        {service.icon}
                      </div>
                    </div>

                    <CardTitle className="font-headline text-3xl mb-6 tracking-tighter font-black text-black uppercase leading-none break-words">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-black/50 text-base leading-relaxed font-medium mb-10 tracking-tight">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-4 mb-12">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-black/70 transition-colors">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/servicos/${service.slug}`} 
                    className="flex items-center justify-between p-7 rounded-2xl bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[9px] font-black uppercase tracking-[0.4em] border border-muted shadow-sm"
                  >
                    Saber Mais <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:flex justify-end gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-lg" />
            <CarouselNext className="static translate-y-0 h-14 w-14 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-lg" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
