
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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroBg}
          alt="Sapient Studio Hero Background"
          fill
          className="object-cover"
          priority
          data-ai-hint="abstract background"
        />
        {/* Subtle Overlay to ensure readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-background" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white/60 backdrop-blur-xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-10 animate-fade-in-up">
          <Target className="h-3.5 w-3.5" />
          <span>Estratégia & Resultados Profissionais</span>
        </div>
        
        <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms] text-foreground leading-[0.9] text-balance max-w-6xl mx-auto drop-shadow-sm">
          Sua marca,<br />
          <span className="text-primary italic">estratégica.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground mb-12 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
          Transformamos negócios através de design inteligente e posicionamento de autoridade no mercado digital.
        </p>
        
        <div className="flex flex-col sm:row items-center justify-center gap-6 animate-fade-in-up [animation-delay:600ms]">
          <Button 
            onClick={handleOpenChat}
            className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-sm font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-widest text-white"
          >
            Iniciar Diagnóstico
          </Button>
          <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-sm font-bold border-primary/20 hover:bg-primary/5 transition-all rounded-full group uppercase tracking-widest bg-white/40 backdrop-blur-sm shadow-sm">
              Ver Portfólio <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
