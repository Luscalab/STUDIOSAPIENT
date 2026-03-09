"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 pb-40 hero-purple-mesh section-flow-bottom">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center space-y-12 max-w-7xl mx-auto">
          
          <div className="flex justify-center animate-slide-up">
            <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 text-[11px] font-black uppercase tracking-[0.6em] rounded-full backdrop-blur-md">
              <Sparkles className="mr-3 h-3 w-3 text-primary animate-pulse" /> Consultoria Estratégica Sapient
            </Badge>
          </div>

          <h1 className="text-6xl md:text-9xl lg:text-[10.5rem] font-black tracking-tighter animate-slide-up [animation-delay:200ms] text-white leading-[0.8] text-balance">
            Clareza Visual e <br />
            <span className="italic font-medium text-primary">Eficiência de Marca.</span>
          </h1>
          
          <p className="max-w-5xl mx-auto text-xl md:text-3xl text-white/80 animate-slide-up [animation-delay:400ms] leading-snug font-medium tracking-tight text-balance">
            Transformamos a comunicação técnica de empresas em ativos de autoridade visual, unindo design profissional e estratégias de performance para resultados reais.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-24 px-16 text-xs font-black bg-white text-primary hover:bg-primary hover:text-white transition-all duration-700 rounded-full uppercase tracking-[0.5em] shadow-2xl active:scale-95"
            >
              INICIAR DIAGNÓSTICO
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-24 px-16 text-xs font-black bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary transition-all duration-700 rounded-full uppercase tracking-[0.5em] group active:scale-95"
              >
                PORTFÓLIO <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-3 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}