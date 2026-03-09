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
    <section className="relative pt-32 pb-48 md:pt-48 md:pb-64 overflow-hidden hero-purple-mesh flow-fade-out">
      {/* Carbon Texture Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-12 animate-slide-up">
            <div className="h-20 w-20 rounded-[2rem] bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white shadow-2xl">
              <Zap className="h-10 w-10 animate-pulse" />
            </div>
          </div>

          <h1 className="font-headline text-5xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-12 animate-slide-up py-4">
            Sapient Studio. <br />
            <span className="text-white/40 italic font-medium block">Clareza é Performance.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-white/60 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance mb-20 animate-slide-up [animation-delay:200ms]">
            Transformamos a complexidade técnica em ativos de <span className="text-white font-bold">autoridade digital absoluta.</span> Onde o design de elite encontra a engenharia de resultados.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-slide-up [animation-delay:400ms]">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-24 px-16 bg-white text-black hover:bg-black hover:text-white rounded-full font-black uppercase tracking-[0.5em] text-[11px] transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              INICIAR DIAGNÓSTICO
            </Button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="flex items-center gap-6 text-white/40 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.6em] group"
            >
              Explore Nossa Metodologia <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}