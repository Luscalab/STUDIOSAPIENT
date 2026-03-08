"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden pt-8 pb-10">
      {/* Background Layered System */}
      <div className="absolute inset-0 z-0 hero-purple-mesh">
        {/* Subtle Texture for depth */}
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay grayscale brightness-50">
           <Image 
            src={heroBg}
            alt="Design Texture"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Intense Purple Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/30 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[140px] animate-pulse [animation-delay:4s]" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a051a]/40 to-[#0a051a]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl px-6 py-2 text-[9px] font-bold uppercase tracking-[0.4em] text-white/80 mb-3 animate-fade-in-up shadow-2xl">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Consultoria Estratégica & Design de Performance</span>
          </div>
          
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-[-0.04em] mb-4 animate-fade-in-up [animation-delay:200ms] text-white leading-[0.85] text-balance drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
            Design que posiciona.<br />
            <span className="text-primary tracking-[-0.01em] italic font-semibold">Estratégia que escala.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-white/60 mb-6 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
            Transformamos negócios em referências de mercado através de ecossistemas digitais de alta clareza e autoridade visual inquestionável.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-[10px] font-bold bg-primary hover:bg-primary/90 shadow-[0_20px_50px_rgba(139,92,246,0.4)] transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-[0.2em] text-white border-none"
            >
              Iniciar Diagnóstico
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-[10px] font-bold border-white/10 hover:bg-white/10 transition-all rounded-full group uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md text-white">
                Ver Portfólio <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fbfaff] to-transparent z-10" />
    </section>
  );
}