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
    icon: <TrendingUp className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Visibilidade no Google", "Anúncios Segmentados", "Otimização de GMN"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Crie uma identidade visual de prestígio que transmita confiança e reflita a verdadeira qualidade do seu trabalho.",
    icon: <Palette className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Identidade de Marca", "Design de Prestígio", "Psicologia Visual"]
  },
  {
    title: "Atendimento com IA",
    slug: "chat-ia",
    description: "Agilize o atendimento aos seus clientes com assistentes inteligentes treinados na sua expertise 24/7.",
    icon: <Bot className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["WhatsApp Business IA", "Qualificação de Leads", "Respostas Imediatas"]
  },
  {
    title: "Gestão Social",
    slug: "gestao-social",
    description: "Construímos autoridade inquestionável através de curadoria estratégica e conteúdo de alto impacto visual.",
    icon: <Users className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Curadoria de Conteúdo", "Autoridade Digital", "Growth Qualificado"]
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Transformamos processos complexos em dossiês de venda e infográficos de alta compreensão e desejo.",
    icon: <FileText className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Dossiês de Venda", "Infográficos Técnicos", "Clareza de Valor"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-12 md:py-24 bg-white text-black relative overflow-hidden rounded-[2rem] md:rounded-[4rem] mx-4 my-4 shadow-xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 md:mb-16 text-center md:text-left max-w-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 mb-2">Soluções de Escala</p>
          <h2 className="font-headline text-2xl md:text-6xl font-black text-black tracking-tighter leading-[0.85] uppercase">
            Como podemos <br />
            <span className="text-primary italic font-medium">Ajudar.</span>
          </h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {services.map((service, idx) => (
              <CarouselItem key={idx} className="pl-3 md:pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="group relative border-none bg-secondary/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between h-[340px] md:h-[450px] overflow-hidden border border-muted/5"
                >
                  <div className="relative z-10">
                    <div className="mb-4 md:mb-6">
                      <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white border border-primary/10">
                        {service.icon}
                      </div>
                    </div>

                    <CardTitle className="font-headline text-base md:text-2xl mb-2 tracking-tighter font-black text-black uppercase leading-none">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-black/60 text-[10px] md:text-sm leading-relaxed font-medium mb-4 md:mb-6 tracking-tight">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-1 md:space-y-2 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black/70">
                          <CheckCircle2 className="h-2.5 w-2.5 text-primary shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/servicos/${service.slug}`} 
                    className="flex items-center justify-between p-3.5 md:p-5 rounded-xl bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] border border-muted shadow-sm mt-auto"
                  >
                    Saber Mais <ArrowUpRight className="h-3.5 w-3.5 md:h-4 w-4" />
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}