"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Trophy } from "lucide-react";
import Link from "next/link";

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";
  const featuredImage = PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "";

  return (
    <section id="portfolio" className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <Badge className="mb-8 bg-primary/10 text-primary px-8 py-3 text-[9px] font-black uppercase tracking-[0.4em] rounded-full">Exibição de Impacto</Badge>
          <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-foreground">
            Peça de <span className="text-primary italic">Exposição.</span>
          </h2>
          <p className="text-muted-foreground/60 text-xl md:text-2xl font-medium max-w-2xl mx-auto tracking-tight">
            Uma imersão técnica em clareza visual e resultados previsíveis de alto padrão.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto group">
          <Link 
            href={behanceUrl}
            target="_blank"
            className="relative block aspect-video md:aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-1000 group-hover:shadow-primary/10"
          >
            <Image 
              src={featuredImage}
              alt="Portfolio Highlight"
              fill
              className="object-cover transition-transform duration-[4000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
            
            <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-end">
               <div className="max-w-2xl space-y-6">
                 <Badge className="bg-primary text-white border-none px-6 py-2 text-[9px] font-black uppercase tracking-[0.3em] rounded-full">Engenharia de Branding</Badge>
                 <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Dossiê Identidade Premium</h3>
                 <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed hidden md:block">
                   Reposicionamento completo focado em capturar autoridade de nicho absoluta.
                 </p>
                 <div className="flex items-center gap-6 text-white text-[11px] font-black uppercase tracking-[0.4em] group-hover:text-primary transition-colors">
                   Explorar Dossiê <ArrowUpRight className="h-6 w-6" />
                 </div>
               </div>
            </div>
          </Link>
        </div>

        <div className="mt-24 text-center">
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-8 px-12 py-6 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-700 font-black text-[11px] uppercase tracking-[0.4em] shadow-xl"
          >
            Acessar Portfólio Completo <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}