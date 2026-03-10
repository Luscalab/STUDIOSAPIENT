
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
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-40 lg:pb-24 overflow-hidden mx-4 rounded-[3rem] md:rounded-[5rem] mt-4 mb-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6 py-2">
            Design e Estratégia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block mt-1">
              para o seu Negócio.
            </span>
          </h1>
          
          <p className="text-xs md:text-sm lg:text-base text-white/40 font-medium max-w-lg mx-auto leading-relaxed tracking-tight text-balance mb-10">
            Apoiamos o crescimento da sua marca através de uma comunicação visual clara e estratégias focadas em resultados. <span className="text-white font-bold">Uma parceria verdadeira para o sucesso.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-12 px-8 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[8px] transition-all duration-500 shadow-xl border-none"
            >
              CONHECER SOLUÇÕES
            </Button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="flex items-center gap-3 text-white/30 hover:text-white transition-all duration-500 text-[8px] font-black uppercase tracking-[0.6em] group"
            >
              Nossa Metodologia <ChevronDown className="h-3 w-3 animate-bounce group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
