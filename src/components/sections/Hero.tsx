"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden hero-purple-mesh">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8 animate-slide-up py-4">
            Sapient Studio <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent italic font-medium block">Clareza e Performance.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance mb-16 animate-slide-up [animation-delay:200ms]">
            Transformamos a complexidade técnica em ativos de <span className="text-white font-bold">autoridade digital.</span> Onde o design encontra a engenharia de resultados.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-slide-up [animation-delay:400ms]">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-20 px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500"
            >
              INICIAR DIAGNÓSTICO
            </Button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="flex items-center gap-4 text-white/30 hover:text-white transition-all duration-500 text-[9px] font-black uppercase tracking-[0.6em] group"
            >
              Nossa Metodologia <ChevronDown className="h-4 w-4 animate-bounce group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}