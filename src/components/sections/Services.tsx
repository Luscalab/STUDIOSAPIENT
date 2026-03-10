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
    icon: <TrendingUp className="h-7 w-7" />,
    features: ["Visibilidade no Google", "Anúncios Segmentados", "Otimização de GMN"]
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Crie uma identidade visual de prestígio que transmita confiança e reflita a verdadeira qualidade do seu trabalho.",
    icon: <Palette className="h-7 w-7" />,
    features: ["Identidade de Marca", "Design de Prestígio", "Psicologia Visual"]
  },
  {
    title: "Atendimento com IA",
    slug: "chat-ia",
    description: "Agilize o atendimento aos seus clientes com assistentes inteligentes treinados na sua expertise 24/7.",
    icon: <Bot className="h-7 w-7" />,
    features: ["WhatsApp Business IA", "Qualificação de Leads", "Respostas Imediatas"]
  },
  {
    title: "Gestão Social",
    slug: "gestao-social",
    description: "Construímos autoridade inquestionável através de curadoria estratégica e conteúdo de alto impacto visual.",
    icon: <Users className="h-7 w-7" />,
    features: ["Curadoria de Conteúdo", "Autoridade Digital", "Growth Qualificado"]
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Transformamos processos complexos em dossiês de venda e infográficos de alta compreensão e desejo.",
    icon: <FileText className="h-7 w-7" />,
    features: ["Dossiês de Venda", "Infográficos Técnicos", "Clareza de Valor"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-12 md:py-20 bg-white text-black relative overflow-hidden rounded-[2.5rem] md:rounded-[5rem] mx-4 my-6 shadow-xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 lg:mb-16 text-center md:text-left max-w-2xl">
          <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-none uppercase">
            COMO PODEMOS <br />
            <span className="text-primary italic font-medium">AJUDAR.</span>
          </h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-[1200px] mx-auto"
        >
          <CarouselContent className="-ml-4">
            {services.map((service, idx) => (
              <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="group relative border-none bg-secondary/20 rounded-[2rem] p-7 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between min-h-[400px] lg:min-h-[460px] h-full overflow-hidden border border-muted/5"
                >
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white border border-primary/10">
                        {service.icon}
                      </div>
                    </div>

                    <CardTitle className="font-headline text-xl mb-3 tracking-tighter font-black text-black uppercase leading-none break-words">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-black/50 text-xs md:text-sm leading-relaxed font-medium mb-6 tracking-tight">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-2 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-black/70 transition-colors">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/servicos/${service.slug}`} 
                    className="flex items-center justify-between p-5 rounded-xl bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[8px] font-black uppercase tracking-[0.4em] border border-muted shadow-sm"
                  >
                    Saber Mais <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:flex justify-end gap-3 mt-10 px-4">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-xl border-2 border-primary/20 text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all shadow-lg" />
            <CarouselNext className="static translate-y-0 h-12 w-12 rounded-xl border-2 border-primary/20 text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all shadow-lg" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
