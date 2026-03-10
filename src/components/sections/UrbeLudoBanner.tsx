'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Banner de anúncio de alta fidelidade para o projeto UrbeLudo.
 * Design focado em prestígio, inovação e tecnologia de saúde.
 */
export function UrbeLudoBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 12000); // Aumentado para 12s para melhor absorção do conteúdo premium

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
        "fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[380px] z-[250] md:left-auto md:translate-x-0 md:right-8 md:top-10 md:w-[460px] transition-all duration-1000 ease-in-out",
        isExiting ? "translate-x-full opacity-0 scale-90 blur-2xl" : "translate-x-0 opacity-100 scale-100 animate-in slide-in-from-top-12 md:slide-in-from-right-32"
      )}
    >
      <div className="relative group">
        {/* Aura de Iluminação Premium */}
        <div className="absolute -inset-2 bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
        
        {/* Container Principal em Vidro Líquido */}
        <div className="relative flex items-center gap-5 bg-[#08070b]/80 backdrop-blur-[40px] border border-white/10 p-6 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden group-hover:border-primary/30 transition-all duration-500">
          
          {/* Barra de Progresso Minimalista */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-cyan-400 opacity-60 animate-[progress_12s_linear_forwards]" />

          {/* Ícone de Inovação com Efeito Glow */}
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center text-primary shrink-0 border border-white/5 relative overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-inner">
             <div className="absolute inset-0 bg-white/5 animate-pulse" />
             <Zap className="h-6 w-6 relative z-10 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
          </div>

          {/* Conteúdo Estratégico */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
              <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.5em]">
                Bioscience & Tech
              </span>
            </div>
            
            <h4 className="font-headline text-white font-bold text-base md:text-lg tracking-tight leading-tight mb-2">
              UrbeLudo: A Ciência do Jogo na <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Reabilitação Humana.</span>
            </h4>
            
            <Link 
              href="/urbeludo" 
              className="group/link inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all"
            >
              Explorar Ecossistema <ArrowRight className="h-3 w-3 group-hover/link:translate-x-2 transition-transform text-primary" />
            </Link>
          </div>

          {/* Fechar Discreto */}
          <button 
            onClick={handleClose}
            className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/20 hover:text-white transition-all self-start -mt-2 -mr-2"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
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
