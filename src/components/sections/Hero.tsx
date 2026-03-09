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
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background de Elite - UrbeLudo Style */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex justify-center mb-12 animate-fade-in-up">
            <div className="h-20 w-20 rounded-3xl bg-primary/20 backdrop-blur-3xl border border-primary/30 flex items-center justify-center text-primary shadow-2xl animate-glow-pulse">
              <Zap className="h-10 w-10" />
            </div>
          </div>

          <h1 className="font-headline text-5xl md:text-8xl lg:text-[9.5rem] font-black text-white tracking-tighter leading-[0.95] mb-12 animate-fade-in-up py-4">
            Sapient Studio. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block mt-4">
              Clareza é Performance.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/50 font-medium max-w-4xl mx-auto leading-relaxed tracking-tight text-balance mb-20 animate-fade-in-up [animation-delay:200ms]">
            Transformamos a complexidade técnica em ativos de <span className="text-white font-bold tracking-tight">autoridade digital absoluta.</span> Onde a engenharia de resultados encontra o design de elite.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 animate-fade-in-up [animation-delay:400ms]">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-20 px-16 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500 shadow-2xl border-none"
            >
              INICIAR DIAGNÓSTICO
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
