
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Componente de Prova Social de Elite.
 * Exibe os parceiros em um slide quadrado minimalista com bordas ultra-suaves.
 * Otimizado para máxima visibilidade e sem distorção das imagens.
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
    <div className="w-full flex justify-center relative z-40">
      <div className="flex items-center gap-6 md:gap-12 bg-white/5 p-4 md:p-8 rounded-[4rem] border border-white/10 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-primary/30 group">
        
        {/* Box da Imagem - Ampliada e Suavizada (Sem distorção) */}
        <div className="relative h-28 w-28 md:h-48 md:w-48 rounded-[3rem] bg-white border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-1000 group-hover:scale-[1.03]">
          <div className="relative w-full h-full p-2 md:p-4">
            <Image 
              src={partners[currentPartner].url} 
              alt={partners[currentPartner].name}
              fill
              className="object-contain transition-all duration-1000 transform scale-95 group-hover:scale-100"
              key={partners[currentPartner].url}
              priority
            />
          </div>
        </div>

        {/* Textos de Identidade - Branco Puro e Legível */}
        <div className="min-w-[160px] md:min-w-[280px] pr-4 md:pr-8">
          <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-white/50 mb-3 md:mb-5">
            CONFIADO POR
          </p>
          <div className="h-[50px] md:h-[70px] flex items-center">
            <p 
              className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-left-6 duration-700" 
              key={`name-${currentPartner}`}
            >
              {partners[currentPartner].name}
            </p>
          </div>
          <div className="h-1.5 w-16 bg-primary mt-6 rounded-full shadow-[0_0_25px_rgba(139,92,246,0.8)]" />
        </div>
      </div>
    </div>
  );
}
