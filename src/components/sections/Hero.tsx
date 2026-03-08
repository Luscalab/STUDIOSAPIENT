
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";
  const heroBg = PlaceHolderImages.find(img => img.id === "hero-bg")?.imageUrl || "";

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background with Professional Base + Intense Purple Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a051a]">
        <Image 
          src={heroBg}
          alt="Sapient Studio Hero Background"
          fill
          className="object-cover transition-transform duration-[10s] hover:scale-110 grayscale brightness-[0.25] contrast-125"
          priority
          data-ai-hint="abstract design workspace"
        />
        
        {/* Layered Purple Mesh Gradients - Dominating the visual */}
        <div className="absolute inset-0 hero-purple-mesh opacity-90 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/5 to-background" />
        
        {/* Deep Purple Accent Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/40 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/30 rounded-full blur-[140px] animate-pulse [animation-delay:2s]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-white/5 backdrop-blur-2xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 mb-10 animate-fade-in-up shadow-2xl">
          <Target className="h-3.5 w-3.5 text-primary" />
          <span>Estratégia & Resultados Profissionais</span>
        </div>
        
        <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms] text-white leading-[0.9] text-balance max-w-6xl mx-auto drop-shadow-[0_10px_40px_rgba(139,92,246,0.4)]">
          Sua marca,<br />
          <span className="text-primary italic">estratégica.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/60 mb-12 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
          Transformamos negócios através de design inteligente e posicionamento de autoridade no mercado digital.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:600ms]">
          <Button 
            onClick={handleOpenChat}
            className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-sm font-bold bg-primary hover:bg-primary/90 shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-widest text-white border-none"
          >
            Iniciar Diagnóstico
          </Button>
          <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-sm font-bold border-white/10 hover:bg-white/5 transition-all rounded-full group uppercase tracking-widest bg-white/5 backdrop-blur-sm text-white shadow-sm">
              Ver Portfólio <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Aesthetic Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
