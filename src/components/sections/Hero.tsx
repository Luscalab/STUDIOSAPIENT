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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-48 pb-32 hero-purple-mesh section-flow-bottom">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center space-y-10 max-w-4xl mx-auto">
          
          <div className="flex justify-center animate-slide-up">
            <Badge className="bg-white/5 text-white/80 border-white/10 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
              <Sparkles className="mr-2 h-3 w-3 text-primary" /> Consultoria Estratégica
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter animate-slide-up [animation-delay:200ms] text-white leading-[1.1] text-balance">
            Clareza Visual e <br />
            <span className="italic font-medium text-primary">Eficiência de Marca.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/50 animate-slide-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight text-balance">
            Transformamos a comunicação técnica em ativos de autoridade visual, unindo design profissional e estratégias de performance de elite.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-14 px-10 text-[10px] font-black bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-full uppercase tracking-[0.2em] shadow-xl active:scale-95"
            >
              INICIAR DIAGNÓSTICO
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-14 px-10 text-[10px] font-black bg-transparent text-white border-white/20 hover:border-white hover:bg-white hover:text-primary transition-all duration-500 rounded-full uppercase tracking-[0.2em] group active:scale-95"
              >
                PORTFÓLIO <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}