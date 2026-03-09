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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-80 pb-64 hero-purple-mesh section-flow-bottom">
      {/* Luzes Dinâmicas Atmosféricas */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 blur-[180px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/15 blur-[180px] animate-pulse rounded-full" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center space-y-16">
          <div className="flex items-center justify-center gap-4 animate-slide-up">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40 font-display">Agência Digital de Elite</p>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[9rem] font-black tracking-tighter animate-slide-up [animation-delay:200ms] text-white leading-[0.85] text-balance">
            Clareza Visual e <br />
            <span className="text-primary italic font-medium">Estratégia Digital.</span>
          </h1>
          
          <p className="max-w-4xl mx-auto text-xl md:text-3xl text-white/40 animate-slide-up [animation-delay:400ms] leading-tight font-medium tracking-tight text-balance font-body">
            Ajudamos o seu negócio a comunicar valor real e atrair clientes qualificados através de <span className="text-white font-bold">design profissional e estratégia inteligente.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-16 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-24 px-16 text-[12px] font-black bg-white text-black hover:bg-primary hover:text-white transition-all duration-700 rounded-full uppercase tracking-[0.5em] shadow-2xl font-display"
            >
              Iniciar Diagnóstico
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-24 px-16 text-[12px] font-black bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black transition-all duration-700 rounded-full uppercase tracking-[0.5em] shadow-2xl group font-display backdrop-blur-xl">
                PORTFÓLIO <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-3 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-10">
        <div className="w-px h-32 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}