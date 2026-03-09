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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-40 pb-32 hero-purple-mesh section-flow-bottom">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center space-y-12 max-w-5xl mx-auto">
          
          <div className="flex justify-center animate-slide-up">
            <Badge className="bg-white/10 text-white border-white/15 px-8 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-xl">
              <Sparkles className="mr-3 h-3.5 w-3.5 text-primary" /> Consultoria Estratégica
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter animate-slide-up [animation-delay:200ms] text-white leading-[0.9] text-balance">
            Clareza Visual e <br />
            <span className="italic font-medium text-primary drop-shadow-[0_10px_30px_rgba(139,92,246,0.3)]">Eficiência de Marca.</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/60 animate-slide-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight text-balance">
            Transformamos a comunicação técnica em ativos de autoridade visual, unindo design profissional e estratégias de performance de elite.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 animate-slide-up [animation-delay:600ms]">
            <Button 
              onClick={handleOpenChat}
              className="w-full sm:w-auto h-16 px-12 text-[11px] font-black bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-full uppercase tracking-[0.3em] shadow-xl active:scale-95"
            >
              INICIAR DIAGNÓSTICO
            </Button>
            <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-16 px-12 text-[11px] font-black bg-transparent text-white border-2 border-white/20 hover:border-white hover:bg-white hover:text-primary transition-all duration-500 rounded-full uppercase tracking-[0.3em] group active:scale-95"
              >
                PORTFÓLIO <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
