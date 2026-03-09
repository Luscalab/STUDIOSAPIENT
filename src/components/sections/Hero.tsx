
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-80 pb-24 hero-purple-mesh">
      {/* Luzes Dinâmicas de Fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/30 blur-[150px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[150px] animate-pulse rounded-full" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center space-y-16">
          <h1 className="font-display text-4xl md:text-6xl lg:text-[7.5rem] font-black tracking-[-0.05em] animate-slide-up [animation-delay:200ms] text-white leading-[0.85] text-balance mt-24">
            Clareza Visual e <br />
            <span className="text-primary italic font-medium">Estratégia Digital.</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/70 animate-slide-up [animation-delay:400ms] leading-tight font-medium tracking-tight text-balance">
            Ajudamos o seu negócio a comunicar valor real e atrair clientes qualificados através de <span className="text-white font-bold">design profissional e estratégia digital inteligente.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-24 px-20 text-[11px] font-black bg-white text-black hover:bg-primary hover:text-white transition-all duration-700 rounded-full uppercase tracking-[0.5em] shadow-2xl shadow-white/5"
            >
              Iniciar Diagnóstico
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-24 px-20 text-[11px] font-black bg-white text-black hover:bg-primary hover:text-white transition-all duration-700 rounded-full uppercase tracking-[0.5em] shadow-2xl shadow-white/5 group">
                PORTFÓLIO <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-30">
        <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
