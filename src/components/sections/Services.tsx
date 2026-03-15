"use client";

import * as React from "react";
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
import { useLanguage } from "@/context/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function Services() {
  const { t } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const services = [
    {
      title: t('services.items.ads.title'),
      slug: "performance-ads",
      description: t('services.items.ads.desc'),
      icon: <TrendingUp className="h-4 w-4 md:h-6 md:w-6" />,
      features: [t('services.items.ads.f1'), t('services.items.ads.f2'), t('services.items.ads.f3')]
    },
    {
      title: t('services.items.web.title'),
      slug: "sites-premium",
      description: t('services.items.web.desc'),
      icon: <Layout className="h-4 w-4 md:h-6 md:w-6" />,
      features: [t('services.items.web.f1'), t('services.items.web.f2'), t('services.items.web.f3')]
    },
    {
      title: t('services.items.brand.title'),
      slug: "design-estrategico",
      description: t('services.items.brand.desc'),
      icon: <Palette className="h-4 w-4 md:h-6 md:w-6" />,
      features: [t('services.items.brand.f1'), t('services.items.brand.f2'), t('services.items.brand.f3')]
    }
  ];

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="servicos" className="py-12 md:py-24 bg-white text-black relative overflow-hidden rounded-[2rem] md:rounded-[3rem] mx-4 my-4 shadow-xl">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 mb-12 md:mb-16">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 mb-2">{t('services.badge')}</p>
            <h2 className="font-headline text-3xl md:text-6xl font-black text-black tracking-tighter leading-[0.9] uppercase">
              {t('services.title')} <br />
              <span className="text-primary italic font-medium">{t('services.title_italic')}</span>
            </h2>
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
                  className="group relative border-none bg-secondary/20 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between h-[340px] md:h-[420px] overflow-hidden border border-muted/5"
                >
                  <div className="relative z-10">
                    <div className="mb-6 md:mb-8">
                      <div className="h-10 w-10 md:h-14 md:w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white border border-primary/10">
                        {service.icon}
                      </div>
                    </div>

                    <CardTitle className="font-headline text-lg md:text-2xl mb-3 tracking-tighter font-black text-black uppercase leading-none">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-black/60 text-[9px] md:text-sm leading-relaxed font-medium mb-6 md:mb-8 tracking-tight">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-1.5 md:space-y-2 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 text-[7px] md:text-[9px] font-black uppercase tracking-[0.15em] text-black/30 group-hover:text-black/70">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/servicos/${service.slug}`} 
                    className="flex items-center justify-between p-3.5 md:p-5 rounded-2xl bg-white text-black hover:bg-black hover:text-white transition-all duration-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] border border-muted shadow-sm mt-auto"
                  >
                    {t('services.explore')} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex gap-2 items-center">
            {Array.from({ length: count }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  current === i ? "w-8 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.3)]" : "w-1 bg-slate-200"
                )} 
              />
            ))}
          </div>
          <p className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-300 animate-pulse">{t('services.swipe')}</p>
        </div>
      </div>
    </section>
  );
}
