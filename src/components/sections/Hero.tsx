
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-32 pb-24 max-w-full px-4">
      {/* Dynamic Premium Purple Background */}
      <div className="absolute inset-0 z-0 bg-[#0c0a1a]">
        <div className="absolute inset-0 opacity-[0.4] mix-blend-screen">
           <Image 
            src={heroBg}
            alt="Design Texture"
            fill
            className="object-cover scale-110 animate-[pulse_15s_infinite]"
            priority
          />
        </div>
        
        {/* Deep Purple Mesh Gradients - Enhanced for "Roxo" focus */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[100%] bg-primary/40 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/30 rounded-full blur-[180px] animate-pulse [animation-delay:4s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#0c0a1a_85%)]" />
        
        {/* Noise Texture Overaly */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>
      
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="text-center space-y-12">
          <div className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-3xl px-10 py-4 text-[10px] font-black uppercase tracking-[0.6em] text-white/80 animate-slide-up shadow-2xl">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Engenharia de Autoridade Visual</span>
            <div className="h-1 w-8 bg-primary rounded-full ml-2" />
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[9.5rem] font-black tracking-[-0.06em] animate-slide-up [animation-delay:200ms] text-white leading-[0.8] text-balance drop-shadow-[0_30px_60px_rgba(139,92,246,0.3)] py-4">
            Onde a <span className="text-primary italic font-medium">Clareza</span><br />
            Encontra a <span className="text-white">Escala.</span>
          </h1>
          
          <p className="max-w-xl md:max-w-3xl mx-auto text-xl md:text-3xl text-white/60 animate-slide-up [animation-delay:400ms] leading-tight font-medium tracking-tight text-balance">
            Traduzimos expertises complexas em ativos estratégicos de <span className="text-white font-bold">performance comercial absoluta.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-8 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className={cn(
                "w-full sm:w-auto h-24 px-20 text-[12px] font-black bg-white text-black hover:bg-primary hover:text-white transition-all duration-700 rounded-none uppercase tracking-[0.5em] shadow-[0_20px_50px_rgba(139,92,246,0.2)]",
                isTouchDevice && "active:scale-95"
              )}
            >
              [ Iniciar Diagnóstico ]
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-24 px-20 text-[12px] font-black border-white/20 hover:bg-white/10 transition-all duration-700 rounded-none group uppercase tracking-[0.5em] bg-transparent text-white/60 hover:text-white">
                Ver Dossiês <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-4 transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
