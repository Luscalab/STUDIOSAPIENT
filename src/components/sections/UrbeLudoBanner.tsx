
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Banner de anúncio dinâmico para o projeto UrbeLudo.
 * Possui temporizador de auto-destruição e botão de fechar.
 */
export function UrbeLudoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Timer para iniciar a animação de saída após 3 segundos
    const timer = setTimeout(() => {
      handleClose();
    }, 4000); // 4 segundos totais (1s de entrada + 3s de exibição)

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), 800); // Tempo da animação de saída
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-4 left-4 right-4 z-[150] md:left-auto md:right-6 md:top-6 md:w-[400px] transition-all duration-700 ease-in-out",
        isExiting ? "translate-x-full opacity-0 scale-95" : "translate-x-0 opacity-100 scale-100 animate-in slide-in-from-right-12"
      )}
    >
      <div className="relative group">
        {/* Background com Glassmorphism e Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-primary rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative flex items-center gap-4 bg-foreground/95 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] shadow-2xl overflow-hidden">
          {/* Barra de Progresso de Auto-Destruição */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-primary animate-[progress_4s_linear_forwards]" />

          <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-1">Novo Ecossistema</p>
            <h4 className="text-white font-bold text-sm tracking-tight truncate">UrbeLudo: A Ciência do Movimento</h4>
            <Link 
              href="/urbeludo" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors mt-2"
            >
              Explorar Projeto <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <button 
            onClick={handleClose}
            className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
            aria-label="Fechar anúncio"
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
