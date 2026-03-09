
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight, Palette, Trophy } from "lucide-react";
import Link from "next/link";

const featuredProject = {
  id: "portfolio-1",
  title: "Dossiê Identidade Premium",
  category: "Engenharia de Branding",
  icon: <Palette className="h-8 w-8" />,
  image: PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-port-1/1200/800",
  description: "Repisicionamento completo focado em capturar autoridade de nicho absoluta e acelerar o ciclo comercial estratégico."
};

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section id="portfolio" className="py-32 md:py-64 bg-[#0c0a1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.1),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-primary/10 blur-[200px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-40">
           <div className="flex items-center justify-center gap-4 mb-10">
               <Trophy className="text-primary h-6 w-6" />
               <Badge className="bg-primary/10 text-primary border-primary/20 px-12 py-4 text-[10px] font-black uppercase tracking-[0.6em] rounded-none">Exibição de Impacto</Badge>
            </div>
          <h2 className="font-display text-5xl md:text-[11rem] font-black tracking-tighter leading-[0.8] mb-12 text-white">
            Peça de<br /><span className="text-primary italic">Exposição.</span>
          </h2>
          <p className="text-white/40 text-2xl md:text-4xl font-medium max-w-3xl mx-auto leading-tight tracking-tight">
            Uma imersão técnica em clareza visual e resultados previsíveis de alto padrão.
          </p>
        </div>

        <div className="max-w-[95rem] mx-auto">
          <Link 
            href={behanceUrl}
            target="_blank"
            className="group relative block aspect-video md:aspect-[24/10] rounded-[5rem] overflow-hidden bg-white/5 shadow-4xl transition-all duration-1000 hover:-translate-y-10 border border-white/10"
          >
            <Image 
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover transition-transform duration-[6000ms] group-hover:scale-105"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-0 border-[1px] border-white/10 rounded-[5rem] pointer-events-none" />

            <div className="absolute inset-0 p-16 md:p-32 flex flex-col justify-end">
              <div className="max-w-5xl space-y-12">
                <div className="flex items-center gap-10">
                  <div className="h-28 w-28 rounded-[3rem] bg-primary/90 backdrop-blur-2xl flex items-center justify-center text-white shadow-[0_30px_60px_rgba(139,92,246,0.5)] border border-white/20">
                    {featuredProject.icon}
                  </div>
                  <div className="space-y-3">
                    <Badge className="bg-white/10 text-white backdrop-blur-2xl border-white/20 px-10 py-3 text-[10px] font-black uppercase tracking-[0.4em] rounded-none mb-2">
                      {featuredProject.category}
                    </Badge>
                    <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.6em]">Estudo de Caso Principal 01_2025</p>
                  </div>
                </div>
                
                <h3 className="font-display text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-none py-2">
                  {featuredProject.title}
                </h3>
                
                <p className="text-white/50 text-2xl md:text-4xl font-medium max-w-4xl leading-tight hidden md:block">
                  {featuredProject.description}
                </p>

                <div className="pt-8 flex items-center gap-8 text-white text-[12px] font-black uppercase tracking-[0.6em] group-hover:text-primary transition-all duration-1000">
                  <div className="h-px w-20 bg-white/20 group-hover:bg-primary group-hover:w-32 transition-all duration-1000" />
                  Explorar Dossiê Completo <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-4 group-hover:-translate-y-4" />
                </div>
              </div>
            </div>

            <div className="absolute top-16 right-16 h-24 w-24 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-1000 shadow-3xl">
              <ExternalLink className="h-10 w-10" />
            </div>
          </Link>
        </div>

        <div className="mt-48 text-center">
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-12 p-14 rounded-none bg-white/5 backdrop-blur-xl text-white hover:bg-primary transition-all duration-1000 group shadow-[0_40px_100px_rgba(139,92,246,0.2)] border border-white/10"
          >
            <div className="space-y-2 text-left">
               <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40">Acesse Agora</p>
               <span className="text-xl font-black uppercase tracking-[0.4em]">Portfólio de Autoridade</span>
            </div>
            <div className="h-20 w-20 rounded-none bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
              <ArrowUpRight className="h-10 w-10" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
