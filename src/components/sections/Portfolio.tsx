"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";
  const featuredImage = PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "";

  return (
    <section id="portfolio" className="py-32 md:py-64 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-40">
          <Badge className="mb-10 bg-primary/10 text-primary px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Exibição de Impacto</Badge>
          <h2 className="font-display text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] mb-12 text-foreground">
            Peça de <span className="text-primary italic">Exposição.</span>
          </h2>
          <p className="text-muted-foreground/60 text-2xl md:text-3xl font-medium max-w-3xl mx-auto tracking-tight leading-relaxed">
            Uma imersão técnica em clareza visual e resultados previsíveis de alto padrão.
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto group">
          <Link 
            href={behanceUrl}
            target="_blank"
            className="relative block aspect-video md:aspect-[21/9] rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-1000 group-hover:shadow-primary/20"
          >
            <Image 
              src={featuredImage}
              alt="Portfolio Highlight"
              fill
              className="object-cover transition-transform duration-[4000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
            
            <div className="absolute inset-0 p-16 md:p-32 flex flex-col justify-end">
               <div className="max-w-3xl space-y-10">
                 <Badge className="bg-primary text-white border-none px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">Engenharia de Branding</Badge>
                 <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">Dossiê Identidade Premium</h3>
                 <p className="text-white/50 text-xl md:text-2xl font-medium leading-relaxed hidden md:block">
                   Reposicionamento completo focado em capturar autoridade de nicho absoluta.
                 </p>
                 <div className="flex items-center gap-8 text-white text-[12px] font-black uppercase tracking-[0.5em] group-hover:text-primary transition-colors">
                   Explorar Dossiê <ArrowUpRight className="h-8 w-8" />
                 </div>
               </div>
            </div>
          </Link>
        </div>

        <div className="mt-40 text-center">
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-10 px-20 py-10 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-700 font-black text-[12px] uppercase tracking-[0.6em] shadow-2xl"
          >
            Acessar Portfólio Completo <ArrowUpRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}