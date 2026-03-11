'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Banner de anúncio de alta fidelidade para o projeto UrbeLudo.
 * Design focado em prestígio, inovação e tecnologia de saúde.
 * Escala reduzida para maior elegância.
 */
export function UrbeLudoBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 12000); 

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), 800); 
  };

  if (!mounted || !isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-[320px] z-[250] md:left-auto md:translate-x-0 md:right-8 md:top-8 md:w-[380px] transition-all duration-1000 ease-in-out",
        isExiting ? "translate-x-full opacity-0 scale-90 blur-2xl" : "translate-x-0 opacity-100 scale-100 animate-in slide-in-from-top-12 md:slide-in-from-right-32"
      )}
    >
      <div className="relative group">
        {/* Aura de Iluminação Premium */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-[2rem] blur-xl opacity-15 group-hover:opacity-30 transition duration-1000 animate-pulse"></div>
        
        {/* Container Principal em Vidro Líquido */}
        <div className="relative flex items-center gap-4 bg-[#08070b]/80 backdrop-blur-[30px] border border-white/10 p-4 rounded-[2rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden group-hover:border-primary/20 transition-all duration-500">
          
          {/* Barra de Progresso Minimalista */}
          <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-primary to-cyan-400 opacity-50 animate-[progress_12s_linear_forwards]" />

          {/* Ícone de Inovação com Efeito Glow */}
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center text-primary shrink-0 border border-white/5 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
             <div className="absolute inset-0 bg-white/5 animate-pulse" />
             <Zap className="h-4 w-4 relative z-10 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          </div>

          {/* Conteúdo Estratégico */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="h-2 w-2 text-cyan-400" />
              <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.4em]">
                Bioscience & Tech
              </span>
            </div>
            
            <h4 className="font-headline text-white font-bold text-sm tracking-tight leading-tight mb-1.5">
              UrbeLudo: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Ciência & Movimento.</span>
            </h4>
            
            <Link 
              href="/urbeludo" 
              className="group/link inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all"
            >
              Conhecer <ArrowRight className="h-2.5 w-2.5 group-hover/link:translate-x-1 transition-transform text-primary" />
            </Link>
          </div>

          {/* Fechar Discreto */}
          <button 
            onClick={handleClose}
            className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/20 hover:text-white transition-all self-start -mt-1 -mr-1"
            aria-label="Fechar"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
