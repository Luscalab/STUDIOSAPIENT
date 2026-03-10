
"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

/**
 * Hero Section - Versão Minimalista e Sofisticada
 * Escala reduzida para maior elegância visual.
 */
export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-40 md:pb-28 overflow-hidden mx-4 rounded-[3rem] md:rounded-[6rem] mt-4 mb-10">
      {/* Background Sapient Elite Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="font-headline text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-10 py-2">
            Design e Estratégia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block mt-3">
              para o seu Negócio.
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-white/50 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance mb-16">
            Apoiamos o crescimento da sua marca através de uma comunicação visual clara e estratégias focadas em resultados. <span className="text-white font-bold">Uma parceria verdadeira para o sucesso do seu projeto.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-16 px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 shadow-xl border-none"
            >
              CONHECER SOLUÇÕES
            </Button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="flex items-center gap-5 text-white/30 hover:text-white transition-all duration-500 text-[9px] font-black uppercase tracking-[0.6em] group"
            >
              Nossa Metodologia <ChevronDown className="h-4 w-4 animate-bounce group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
