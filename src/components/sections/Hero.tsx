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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-32 hero-purple-mesh">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center space-y-12 max-w-6xl mx-auto">
          
          <div className="flex justify-center animate-slide-up">
            <Badge className="bg-white/10 text-white/80 border-white/20 px-8 py-3 text-[9px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">
              Consultoria Estratégica Sapient
            </Badge>
          </div>

          <h1 className="font-display text-5xl md:text-8xl lg:text-[9.5rem] font-black tracking-tighter animate-slide-up [animation-delay:200ms] text-white leading-[0.85] text-balance">
            Clareza Visual e <br />
            <span className="italic font-medium">Eficiência de Marca.</span>
          </h1>
          
          <p className="max-w-4xl mx-auto text-lg md:text-2xl text-white/80 animate-slide-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight text-balance font-body">
            Transformamos a comunicação técnica de empresas em ativos de autoridade visual, unindo design profissional e estratégias de performance para resultados reais.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-20 px-14 text-[12px] font-black bg-white text-primary hover:bg-white/90 transition-all duration-500 rounded-full uppercase tracking-[0.3em] shadow-2xl font-display"
            >
              FAZER DIAGNÓSTICO
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-20 px-14 text-[12px] font-black bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary transition-all duration-500 rounded-full uppercase tracking-[0.3em] group font-display"
              >
                VER PORTFÓLIO <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}