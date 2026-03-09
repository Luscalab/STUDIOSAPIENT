"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

/**
 * Hero Section - Versão de Parceria Estratégica
 * Arquitetura UrbeLudo aplicada com Roxo Sapient.
 * Tom de voz: Profissional, amigável e focado em resultados reais.
 */
export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden mx-4 rounded-[4rem] md:rounded-[8rem] mt-4 mb-12">
      {/* Background Sapient Elite Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="font-headline text-5xl md:text-8xl lg:text-[9.5rem] font-black text-white tracking-tighter leading-[0.9] mb-12 py-4">
            Design e Estratégia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block mt-4">
              para o seu Negócio.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/50 font-medium max-w-4xl mx-auto leading-relaxed tracking-tight text-balance mb-20">
            Apoiamos o crescimento da sua marca através de uma comunicação visual clara e estratégias focadas em resultados. <span className="text-white font-bold">Uma parceria verdadeira para o sucesso do seu projeto.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-20 px-16 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500 shadow-2xl border-none"
            >
              CONHECER SOLUÇÕES
            </Button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="flex items-center gap-6 text-white/30 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.6em] group"
            >
              Nossa Metodologia <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
