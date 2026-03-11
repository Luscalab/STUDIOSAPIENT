
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  TrendingUp, 
  Palette, 
  ArrowUpRight, 
  Bot, 
  CheckCircle2, 
  Users, 
  FileText,
  Layout
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Vendas & Anúncios",
    slug: "performance-ads",
    description: "Atraia as pessoas certas para o seu negócio com campanhas no Google e redes sociais focadas em trazer clientes reais.",
    icon: <TrendingUp className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Apareça no topo do Google", "Anúncios para seu bairro", "Mais chamadas no WhatsApp"]
  },
  {
    title: "Criação de Sites",
    slug: "sites-premium",
    description: "Desenvolvemos sites modernos e rápidos que funcionam como sua vitrine de luxo na internet, prontos para converter visitantes em clientes.",
    icon: <Layout className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Sites Rápidos e Seguros", "Design que Encanta", "Otimizado para Celular"]
  },
  {
    title: "Design de Marca",
    slug: "design-estrategico",
    description: "Crie um visual profissional que passa confiança e mostra que você é a melhor escolha do seu mercado.",
    icon: <Palette className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Logotipos Profissionais", "Visual que vende mais", "Cores que passam credibilidade"]
  },
  {
    title: "Atendimento Automático",
    slug: "chat-ia",
    description: "Tenha um assistente inteligente no seu site ou WhatsApp que responde dúvidas e atende clientes 24 horas por dia.",
    icon: <Bot className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["WhatsApp que responde só", "Filtro de curiosos", "Atendimento sem demora"]
  },
  {
    title: "Redes Sociais",
    slug: "gestao-social",
    description: "Deixe seu perfil no Instagram e LinkedIn com cara de empresa grande, postando conteúdos que atraem quem realmente compra.",
    icon: <Users className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Postagens que educam", "Visual de dar inveja", "Crescimento de seguidores reais"]
  },
  {
    title: "Apresentações & Dossiês",
    slug: "narrativa-visual",
    description: "Transforme seus serviços ou propostas em apresentações lindas e fáceis de entender, que ajudam a fechar vendas maiores.",
    icon: <FileText className="h-4 w-4 md:h-7 md:w-7" />,
    features: ["Propostas de Luxo", "Explicação visual simples", "Clareza total de valor"]
  }
];

export function Services() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [currentPartner, setCurrentPartner] = React.useState(0);

  const partners = [
    { name: "ChargerBed", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/chargerbed.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvY2hhcmdlcmJlZC5wbmciLCJpYXQiOjE3NzMyNTk2OTEsImV4cCI6MTc3NDEyMzY5MX0.Vjw_0CI-92YGGgxQil9racQzBQSMVoinTbZ8P_ZYymQ" },
    { name: "Finallogo", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/FINALLOGO.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvRklOQUxMT0dPLnBuZyIsImlhdCI6MTc3MzI1ODk2MSwiZXhwIjoyMDg4NjE4OTYxfQ.YCn2mnUAXxdeCIDDY43MZpB1jEf94V0pcajlqRuXkA8" },
    { name: "Unnamed Client", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/unnamed%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdW5uYW1lZCAoMSkuanBnIiwiaWF0IjoxNzczMjU5MzAyLCJleHAiOjE4MDQ3OTUzMDJ9.Ey6aHahoSnfrOlVxBsHpOnYXUGfDDEZFj_rLrwbbOro" }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [partners.length]);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="servicos" className="py-12 md:py-32 bg-white text-black relative overflow-hidden rounded-[2rem] md:rounded-[4rem] mx-4 my-4 shadow-xl">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header da Seção com Parceiros em Marquee Lateral */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 mb-16 md:mb-24">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 mb-2">Soluções para crescer</p>
            <h2 className="font-headline text-3xl md:text-7xl font-black text-black tracking-tighter leading-[0.85] uppercase">
              Como podemos <br />
              <span className="text-primary italic font-medium">Ajudar.</span>
            </h2>
          </div>

          {/* Parceiros de Elite Integrados */}
          <div className="flex items-center gap-6 md:gap-8 bg-slate-50 p-4 md:p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="relative h-20 w-20 md:h-32 md:w-32 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center p-4 md:p-6 overflow-hidden shadow-inner group">
              <div className="relative w-full h-full transition-all duration-1000">
                <Image 
                  src={partners[currentPartner].url} 
                  alt={partners[currentPartner].name}
                  fill
                  className="object-contain grayscale hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100"
                  key={partners[currentPartner].url}
                />
              </div>
            </div>
            <div className="min-w-[120px] md:min-w-[180px]">
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-1">
                Confiado Por
              </p>
              <p className="text-xs md:text-xl font-black text-primary uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-left-4 duration-500" key={`name-${currentPartner}`}>
                {partners[currentPartner].name}
              </p>
              <div className="h-0.5 w-8 bg-primary/20 mt-3 rounded-full" />
            </div>
          </div>
        </div>
        
        <Carousel
          setApi={setApi}
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
                  className="group relative border-none bg-secondary/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between h-[360px] md:h-[480px] overflow-hidden border border-muted/5"
                >
                  <div className="relative z-10">
                    <div className="mb-6 md:mb-10">
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white border border-primary/10">
                        {service.icon}
                      </div>
                    </div>

                    <CardTitle className="font-headline text-lg md:text-3xl mb-3 tracking-tighter font-black text-black uppercase leading-none">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-black/60 text-[10px] md:text-base leading-relaxed font-medium mb-6 md:mb-8 tracking-tight">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-2 md:space-y-3 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-black/30 group-hover:text-black/70">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/servicos/${service.slug}`} 
                    className="flex items-center justify-between p-4 md:p-6 rounded-2xl bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] border border-muted shadow-sm mt-auto"
                  >
                    Explorar Solução <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="flex gap-2 items-center">
            {Array.from({ length: count }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  current === i ? "w-10 bg-primary shadow-[0_0_15px_rgba(139,92,246,0.4)]" : "w-1.5 bg-slate-200"
                )} 
              />
            ))}
          </div>
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-300 animate-pulse">Deslize para navegar pelas soluções</p>
        </div>
      </div>
    </section>
  );
}
