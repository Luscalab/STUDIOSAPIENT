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
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
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
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 mb-10 animate-fade-in-up shadow-2xl">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Consultoria Estratégica & Design de Performance</span>
          </div>
          
          <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] mb-10 animate-fade-in-up [animation-delay:200ms] text-white leading-[0.82] text-balance drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
            Design que posiciona.<br />
            <span className="text-primary tracking-[-0.01em] italic font-semibold">Estratégia que escala.</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 mb-16 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
            Transformamos negócios em referências de mercado através de ecossistemas digitais de alta clareza e autoridade visual inquestionável.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-[11px] font-bold bg-primary hover:bg-primary/90 shadow-[0_20px_50px_rgba(139,92,246,0.4)] transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-[0.2em] text-white border-none"
            >
              Iniciar Diagnóstico Profissional
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-[11px] font-bold border-white/10 hover:bg-white/10 transition-all rounded-full group uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md text-white">
                Ver Portfólio <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fbfaff] to-transparent z-10" />
    </section>
  );
}
