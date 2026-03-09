
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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-40 pb-20 md:pt-48 md:pb-24 max-w-full px-4">
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
      
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 md:gap-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-3xl px-6 py-2 md:px-8 md:py-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-white mb-8 animate-fade-in-up shadow-2xl">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>SAPIENT STRATEGIC STUDIO</span>
          </div>
          
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] mb-10 animate-fade-in-up [animation-delay:200ms] text-white leading-[1.15] text-balance drop-shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            Construímos Presença e<br />
            <span className="text-white tracking-[-0.01em] italic font-semibold opacity-90">Resultados Digitais.</span>
          </h1>
          
          <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-white/80 mb-14 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight text-balance">
            Elevamos sua marca através de ecossistemas visuais eficientes, unindo design estratégico e análise de performance para negócios que buscam crescimento sólido.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className={cn(
                "w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-[11px] md:text-[12px] font-black bg-white text-primary hover:bg-white/90 shadow-2xl transition-all rounded-full uppercase tracking-[0.25em]",
                isTouchDevice && "active:scale-95"
              )}
            >
              Consultoria Estratégica
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-[11px] md:text-[12px] font-black border-white/40 hover:bg-white/20 transition-all rounded-full group uppercase tracking-[0.25em] bg-white/10 backdrop-blur-md text-white shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                Ver Portfólio <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fbfaff] to-transparent z-10" />
    </section>
  );
}
