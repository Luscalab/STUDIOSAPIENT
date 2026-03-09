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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-64 pb-48 hero-purple-mesh section-flow-bottom">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center space-y-16 max-w-7xl mx-auto">
          
          <div className="flex justify-center animate-slide-up">
            <Badge className="bg-white/10 text-white border-white/15 px-12 py-5 text-[12px] font-black uppercase tracking-[0.8em] rounded-full backdrop-blur-xl">
              <Sparkles className="mr-4 h-4 w-4 text-primary animate-pulse" /> Consultoria Estratégica Sapient
            </Badge>
          </div>

          <h1 className="text-6xl md:text-9xl lg:text-[11.5rem] font-black tracking-tighter animate-slide-up [animation-delay:200ms] text-white leading-[0.85] text-balance drop-shadow-2xl">
            Clareza Visual e <br />
            <span className="italic font-medium text-primary drop-shadow-[0_10px_30px_rgba(139,92,246,0.3)]">Eficiência de Marca.</span>
          </h1>
          
          <p className="max-w-5xl mx-auto text-2xl md:text-4xl text-white/70 animate-slide-up [animation-delay:400ms] leading-snug font-medium tracking-tight text-balance">
            Transformamos a comunicação técnica de empresas em ativos de autoridade visual, unindo design profissional e estratégias de performance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-16 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-24 px-20 text-[13px] font-black bg-white text-primary hover:bg-primary hover:text-white transition-all duration-1000 rounded-full uppercase tracking-[0.5em] shadow-2xl active:scale-95"
            >
              INICIAR DIAGNÓSTICO
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-24 px-20 text-[13px] font-black bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white hover:text-primary transition-all duration-1000 rounded-full uppercase tracking-[0.5em] group active:scale-95 shadow-xl"
              >
                PORTFÓLIO <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-4 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}