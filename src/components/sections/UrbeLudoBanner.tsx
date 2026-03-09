
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Banner de anúncio dinâmico Ultra-Chamativo para o projeto UrbeLudo.
 * Tempo de exibição aumentado para 5 segundos + 1s de transição.
 * Estética Deep Tech com Glow Neon.
 */
export function UrbeLudoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Timer para iniciar a animação de saída após 6 segundos (1s entrada + 5s exibição)
    const timer = setTimeout(() => {
      handleClose();
    }, 6000);

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
        "fixed top-6 left-4 right-4 z-[200] md:left-auto md:right-8 md:top-8 md:w-[450px] transition-all duration-1000 ease-in-out",
        isExiting ? "translate-x-full opacity-0 scale-90 blur-lg" : "translate-x-0 opacity-100 scale-100 animate-in slide-in-from-right-24"
      )}
    >
      <div className="relative group">
        {/* Glow de fundo ultra potente e pulsante */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-primary to-purple-600 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
        
        <div className="relative flex items-center gap-5 bg-black/90 backdrop-blur-3xl border border-white/20 p-6 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Barra de Progresso de Auto-Destruição (6s total) */}
          <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-cyan-400 via-primary to-purple-500 animate-[progress_6s_linear_forwards]" />

          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-primary/20 flex items-center justify-center text-cyan-400 shrink-0 border border-white/10 shadow-inner">
            <Zap className="h-8 w-8 animate-bounce" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-cyan-500 text-black text-[7px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">
                Novo Ecossistema
              </span>
              <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">HealthTech 2.0</span>
            </div>
            
            <h4 className="text-white font-black text-lg tracking-tighter leading-tight">
              UrbeLudo — A Ciência do Movimento.
            </h4>
            
            <Link 
              href="/urbeludo" 
              className="group/link inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 hover:text-white transition-all mt-3"
            >
              Explorar Tecnologia <ArrowRight className="h-3 w-3 group-hover/link:translate-x-2 transition-transform" />
            </Link>
          </div>

          <button 
            onClick={handleClose}
            className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/10"
            aria-label="Fechar anúncio"
          >
            <X className="h-5 w-5" />
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
