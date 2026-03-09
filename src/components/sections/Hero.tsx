
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
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-44 pb-24 max-w-full px-4">
      <div className="absolute inset-0 z-0 hero-purple-mesh">
        <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay">
           <Image 
            src={heroBg}
            alt="Design Texture"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute top-[-15%] left-[-10%] w-[80%] h-[70%] bg-primary/40 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/30 rounded-full blur-[120px] animate-pulse [animation-delay:4s]" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-[#fbfaff]" />
      </div>
      
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-3xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.5em] text-white mb-10 animate-slide-up shadow-2xl">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Dossiê de Performance Sapient</span>
          </div>
          
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] mb-12 animate-slide-up [animation-delay:200ms] text-white leading-[0.95] text-balance drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            Engenharia de<br />
            <span className="text-white/80 italic font-medium tracking-tight">Autoridade Visual.</span>
          </h1>
          
          <p className="max-w-xl md:max-w-3xl mx-auto text-lg md:text-2xl text-white/70 mb-16 animate-slide-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight text-balance">
            Traduzimos expertises complexas em ativos de clareza estratégica e performance comercial de alta precisão.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className={cn(
                "w-full sm:w-auto h-20 md:h-24 px-16 md:px-20 text-[12px] font-black bg-white text-primary hover:bg-white/90 hover:scale-105 hover:shadow-[0_25px_60px_rgba(255,255,255,0.2)] transition-all duration-1000 rounded-full uppercase tracking-[0.3em]",
                isTouchDevice && "active:scale-95"
              )}
            >
              Iniciar Diagnóstico
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-20 md:h-24 px-16 md:px-20 text-[12px] font-black border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-1000 rounded-full group uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md text-white">
                Ver Portfólio <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-4 transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fbfaff] to-transparent z-10" />
    </section>
  );
}
