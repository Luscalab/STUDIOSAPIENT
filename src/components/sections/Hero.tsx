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
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 lg:pt-56 lg:pb-40 overflow-hidden mx-4 rounded-[3rem] md:rounded-[5rem] mt-4 mb-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1000px] mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8 py-2">
            Design e Estratégia <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block mt-2">
              para o seu Negócio.
            </span>
          </h1>
          
          <p className="text-sm md:text-xl lg:text-2xl text-white/40 font-medium max-w-2xl mx-auto leading-tight tracking-tight text-balance mb-12">
            Apoiamos o crescimento da sua marca através de uma comunicação visual clara e estratégias focadas em resultados reais. <span className="text-white font-bold">Uma parceria verdadeira.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-16 w-full sm:w-auto px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 shadow-2xl border-none"
            >
              CONHECER SOLUÇÕES
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
