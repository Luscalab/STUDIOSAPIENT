"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 soft-gradient-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[90%] h-[90%] bg-primary/10 blur-[120px] rounded-full animate-float opacity-60" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[70%] h-[70%] bg-accent/10 blur-[120px] rounded-full animate-float [animation-delay:5s] opacity-60" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white/60 backdrop-blur-xl px-8 py-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-12 animate-fade-in-up shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>Estratégia & Design de Elite</span>
        </div>
        
        <h1 className="font-headline text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter mb-10 animate-fade-in-up [animation-delay:200ms] text-foreground leading-[0.8] lg:max-w-[95rem] mx-auto text-balance">
          Sua marca,<br />
          <span className="text-primary italic relative inline-block group">
            extraordinária.
            <div className="absolute -bottom-4 md:-bottom-8 left-0 w-full h-6 md:h-12 bg-primary/10 -skew-x-12 -z-10 transition-all group-hover:scale-110" />
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-xl md:text-3xl text-muted-foreground/80 mb-16 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
          Transformamos negócios comuns em referências absolutas através de design estratégico e posicionamento de luxo.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in-up [animation-delay:600ms]">
          <Button 
            onClick={handleOpenChat}
            className="w-full sm:w-auto h-20 md:h-24 px-16 md:px-20 text-lg md:text-xl font-black bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-widest text-white"
          >
            Iniciar Conversa
          </Button>
          <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-20 md:h-24 px-16 md:px-20 text-lg md:text-xl font-black border-primary/20 hover:bg-primary/5 transition-all rounded-full group uppercase tracking-widest bg-white/20 backdrop-blur-sm">
              Behance <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hidden sm:flex">
        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-primary">Scroll</span>
        <div className="relative w-[1.5px] h-16 bg-primary/20 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[scroll-indicator_3s_infinite]" />
        </div>
      </div>
    </section>
  );
}
