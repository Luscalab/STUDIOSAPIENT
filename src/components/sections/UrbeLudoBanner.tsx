'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Banner de anúncio dinâmico para o projeto UrbeLudo.
 * Sincronizado com a paleta de cores Roxo Sapient.
 */
export function UrbeLudoBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

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
        "fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[340px] z-[200] md:left-auto md:translate-x-0 md:right-8 md:top-8 md:w-[420px] transition-all duration-1000 ease-in-out",
        isExiting ? "translate-x-full opacity-0 scale-90 blur-lg" : "translate-x-0 md:translate-x-0 opacity-100 scale-100 animate-in slide-in-from-top-12 md:slide-in-from-right-24"
      )}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-purple-600 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
        
        <div className="relative flex items-center gap-4 bg-[#0c0a1a]/95 backdrop-blur-3xl border border-white/10 p-5 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="absolute bottom-0 left-0 h-1 bg-primary/40 animate-[progress_8s_linear_forwards]" />

          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-white/5">
            <Zap className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[7px] font-black text-primary uppercase tracking-[0.3em]">
                Inovação com propósito
              </span>
            </div>
            
            <h4 className="text-white font-bold text-sm md:text-base tracking-tight leading-tight">
              UrbeLudo: Tecnologia que ajuda pessoas a se movimentarem melhor.
            </h4>
            
            <Link 
              href="/urbeludo" 
              className="group/link inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-accent hover:text-white transition-all mt-2"
            >
              Ver como funciona <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          <button 
            onClick={handleClose}
            className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/30 hover:text-white transition-all"
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