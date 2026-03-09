"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Zap } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-48 pb-64 md:pt-64 md:pb-80 overflow-hidden hero-purple-mesh flow-fade-out">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex justify-center mb-16 animate-fade-in-up">
            <div className="h-28 w-28 rounded-[3rem] bg-primary/10 backdrop-blur-3xl border border-primary/20 flex items-center justify-center text-primary shadow-2xl animate-glow-pulse">
              <Zap className="h-14 w-14" />
            </div>
          </div>

          <h1 className="font-headline text-6xl md:text-[9.5rem] font-black text-white tracking-tighter leading-[0.8] mb-16 animate-fade-in-up">
            Sapient Studio. <br />
            <span className="text-primary italic font-medium block mt-4">Clareza é Performance.</span>
          </h1>
          
          <p className="text-xl md:text-4xl text-white/40 font-medium max-w-5xl mx-auto leading-tight tracking-tight text-balance mb-24 animate-fade-in-up [animation-delay:200ms]">
            Transformamos a complexidade técnica em ativos de <span className="text-white font-bold tracking-tight">autoridade digital absoluta.</span> Onde a engenharia de resultados encontra o design de elite.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-16 animate-fade-in-up [animation-delay:400ms]">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-32 px-24 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.5em] text-[11px] transition-all duration-1000 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-none"
            >
              INICIAR DIAGNÓSTICO
            </Button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="flex items-center gap-8 text-white/20 hover:text-white transition-all duration-700 text-[10px] font-black uppercase tracking-[0.6em] group"
            >
              Nossa Metodologia <ChevronDown className="h-6 w-6 animate-bounce group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}