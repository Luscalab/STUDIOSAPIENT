
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";
import { cn } from "@/lib/utils";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";
  const heroBg = PlaceHolderImages.find(img => img.id === "hero-bg")?.imageUrl || "";
  const { isTouchDevice } = useMobileOptimization();

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section className="relative min-h-[50vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden pt-12 pb-16 md:pt-8 md:pb-10">
      {/* Background Layered System */}
      <div className="absolute inset-0 z-0 hero-purple-mesh">
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay">
           <Image 
            src={heroBg}
            alt="Design Texture"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[60%] md:w-[60%] md:h-[60%] bg-primary/40 rounded-full blur-[100px] md:blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] md:w-[50%] md:h-[50%] bg-accent/30 rounded-full blur-[80px] md:blur-[140px] animate-pulse [animation-delay:4s]" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-[#fbfaff]" />
      </div>
      
      {/* Content elevada conforme solicitado */}
      <div className="container relative z-10 mx-auto px-6 -translate-y-[15%] md:-translate-y-[35%]">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 md:gap-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-3xl px-4 py-1.5 md:px-6 md:py-2 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-white mb-4 md:mb-3 animate-fade-in-up shadow-2xl">
            <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary" />
            <span>Consultoria & Design de Performance</span>
          </div>
          
          <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-[-0.04em] mb-4 animate-fade-in-up [animation-delay:200ms] text-white leading-[0.95] md:leading-[0.85] text-balance drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
            Design que posiciona.<br />
            <span className="text-white tracking-[-0.01em] italic font-semibold opacity-90">Estratégia que escala.</span>
          </h1>
          
          <p className="max-w-xl md:max-w-2xl mx-auto text-xs md:text-lg text-white/80 mb-8 md:mb-6 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
            Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className={cn(
                "w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-[9px] md:text-[10px] font-bold bg-white text-primary hover:bg-white/90 shadow-xl transition-all rounded-full uppercase tracking-[0.2em]",
                isTouchDevice && "active:scale-95"
              )}
            >
              Iniciar Diagnóstico
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-[9px] md:text-[10px] font-bold border-white/30 hover:bg-white/10 transition-all rounded-full group uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md text-white">
                Ver Portfólio <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fbfaff] to-transparent z-10" />
    </section>
  );
}
