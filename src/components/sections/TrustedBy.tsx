
"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Componente de Prova Social de Elite - Versão Compacta para Rodapé.
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
    <div className="flex items-center gap-4 md:gap-8 bg-white/5 p-3 md:p-5 rounded-[2rem] border border-white/10 backdrop-blur-xl transition-all duration-700 hover:border-primary/30 group w-fit">
      
      {/* Box da Imagem - Compacta e Suave */}
      <div className="relative h-14 w-14 md:h-20 md:w-20 rounded-[1.5rem] bg-white border border-white/20 flex items-center justify-center overflow-hidden shadow-xl transition-all duration-1000 group-hover:scale-[1.03]">
        <div className="relative w-full h-full p-1.5 md:p-2.5">
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

      {/* Textos de Identidade - Brancos e Minimalistas */}
      <div className="min-w-[120px] md:min-w-[180px] pr-2">
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-white/40 mb-1.5 md:mb-2">
          CONFIADO POR
        </p>
        <div className="h-[25px] md:h-[35px] flex items-center">
          <p 
            className="text-sm md:text-2xl font-black text-white uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-left-4 duration-700" 
            key={`name-${currentPartner}`}
          >
            {partners[currentPartner].name}
          </p>
        </div>
      </div>
    </div>
  );
}
