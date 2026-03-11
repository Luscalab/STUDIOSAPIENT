
'use client';

import * as React from "react";
import Image from "next/image";

/**
 * Componente de Prova Social de Elite - Versão Ultra-Compacta Lateral.
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
    <div className="flex items-center gap-2 md:gap-3 bg-white/5 p-1.5 md:p-2 rounded-[1rem] md:rounded-[1.2rem] border border-white/5 backdrop-blur-3xl transition-all duration-700 hover:border-primary/20 group w-fit">
      
      {/* Box do Logotipo - Compactado para alinhamento lateral */}
      <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-[0.6rem] md:rounded-[0.8rem] bg-white flex items-center justify-center overflow-hidden shadow-xl transition-all duration-1000 group-hover:scale-[1.02]">
        <div className="relative w-full h-full p-1 md:p-1.5">
          <Image 
            src={partners[currentPartner].url} 
            alt={partners[currentPartner].name}
            fill
            className="object-contain transition-all duration-1000 scale-95 group-hover:scale-100"
            key={partners[currentPartner].url}
            priority
          />
        </div>
      </div>

      {/* Identidade do Cliente - Largura Otimizada */}
      <div className="min-w-[70px] md:min-w-[100px] pr-1 md:pr-2">
        <p className="text-[4px] md:text-[6px] font-black uppercase tracking-[0.3em] text-white/20 mb-0.5">
          CONFIADO POR
        </p>
        <div className="h-[12px] md:h-[16px] flex items-center">
          <p 
            className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-left-2 duration-700" 
            key={`name-${currentPartner}`}
          >
            {partners[currentPartner].name}
          </p>
        </div>
      </div>
    </div>
  );
}

