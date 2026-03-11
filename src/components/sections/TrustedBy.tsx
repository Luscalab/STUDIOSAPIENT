
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Componente de Prova Social de Elite.
 * Exibe os parceiros em um slide quadrado minimalista com bordas ultra-suaves.
 * Posicionado entre o Header e o Hero para máxima autoridade.
 */
export function TrustedBy() {
  const [currentPartner, setCurrentPartner] = React.useState(0);

  const partners = [
    { 
      name: "3DGOPRINT", 
      url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/unnamed%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdW5uYW1lZCAoMSkuanBnIiwiaWF0IjoxNzczMjU5MzAyLCJleHAiOjE4MDQ3OTUzMDJ9.Ey6aHahoSnfrOlVxBsHpOnYXUGfDDEZFj_rLrwbbOro" 
    },
    { 
      name: "Quitute Certa", 
      url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/FINALLOGO.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvRklOQUxMT0dPLnBuZyIsImlhdCI6MTc3MzI1ODk2MSwiZXhwIjoyMDg4NjE4OTYxfQ.YCn2mnUAXxdeCIDDY43MZpB1jEf94V0pcajlqRuXkA8" 
    },
    { 
      name: "ChargerBed", 
      url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/chargerbed.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvY2hhcmdlcmJlZC5wbmciLCJpYXQiOjE3NzMyNTk2OTEsImV4cCI6MTc3NDEyMzY5MX0.Vjw_0CI-92YGGgxQil9racQzBQSMVoinTbZ8P_ZYymQ" 
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [partners.length]);

  return (
    <div className="w-full flex justify-center py-8 md:py-12 relative z-[140]">
      <div className="flex items-center gap-6 md:gap-10 bg-white/5 p-4 md:p-6 rounded-[3.5rem] border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-700 hover:shadow-primary/20 group">
        
        {/* Box da Imagem - Ampliada e Suavizada */}
        <div className="relative h-24 w-24 md:h-36 md:w-36 rounded-[2.8rem] bg-white border border-white/20 flex items-center justify-center p-1 md:p-2 overflow-hidden shadow-2xl transition-all duration-1000 group-hover:scale-[1.05]">
          <div className="relative w-full h-full">
            <Image 
              src={partners[currentPartner].url} 
              alt={partners[currentPartner].name}
              fill
              className="object-contain transition-all duration-1000 transform scale-90 group-hover:scale-100"
              key={partners[currentPartner].url}
              priority
            />
          </div>
        </div>

        {/* Textos de Identidade - Branco e Visível */}
        <div className="min-w-[140px] md:min-w-[220px]">
          <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] text-white mb-2 md:mb-4 drop-shadow-sm">
            CONFIADO POR
          </p>
          <div className="h-[40px] md:h-[50px] flex items-center">
            <p 
              className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-left-4 duration-700" 
              key={`name-${currentPartner}`}
            >
              {partners[currentPartner].name}
            </p>
          </div>
          <div className="h-1 w-12 bg-primary mt-4 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
        </div>
      </div>
    </div>
  );
}
