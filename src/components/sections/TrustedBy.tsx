
'use client';

import * as React from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

/**
 * Componente de Prova Social de Elite - Versão Ultra-Compacta Lateral.
 * Exibe os logotipos e nomes dos parceiros estratégicos.
 */
export function TrustedBy() {
  const [currentPartner, setCurrentPartner] = React.useState(0);

  const partnersData = [
    PlaceHolderImages.find(img => img.id === "partner-logo-2"), // 3DGOPRINT
    PlaceHolderImages.find(img => img.id === "partner-logo-1"), // Quitute Certa
    PlaceHolderImages.find(img => img.id === "partner-logo-3"), // ChargerBed
  ].filter(Boolean);

  // Mapeamento de nomes amigáveis para exibição
  const partnerNames: Record<string, string> = {
    'partner-logo-1': 'Quitute Certa',
    'partner-logo-2': '3DGOPRINT',
    'partner-logo-3': 'ChargerBed'
  };

  React.useEffect(() => {
    if (partnersData.length === 0) return;
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partnersData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [partnersData.length]);

  if (partnersData.length === 0) return null;

  const currentId = partnersData[currentPartner]?.id || "";
  const displayName = partnerNames[currentId] || "Parceiro";

  return (
    <div className="flex items-center gap-2 md:gap-3 bg-white/5 p-1.5 md:p-2 rounded-[1rem] md:rounded-[1.2rem] border border-white/5 backdrop-blur-3xl transition-all duration-700 hover:border-primary/20 group w-fit">
      
      {/* Box do Logotipo */}
      <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-[0.6rem] md:rounded-[0.8rem] bg-white flex items-center justify-center overflow-hidden shadow-xl transition-all duration-1000 group-hover:scale-[1.02]">
        <div className="relative w-full h-full p-1 md:p-1.5">
          <Image 
            src={partnersData[currentPartner]?.imageUrl || ""} 
            alt={partnersData[currentPartner]?.description || "Logotipo do Parceiro"}
            fill
            className="object-contain transition-all duration-1000 scale-95 group-hover:scale-100"
            key={partnersData[currentPartner]?.imageUrl}
            priority
          />
        </div>
      </div>

      {/* Identidade do Cliente */}
      <div className="min-w-[70px] md:min-w-[100px] pr-1 md:pr-2">
        <p className="text-[4px] md:text-[6px] font-black uppercase tracking-[0.3em] text-white/20 mb-0.5">
          CONFIADO POR
        </p>
        <div className="h-[12px] md:h-[16px] flex items-center">
          <p 
            className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-left-2 duration-700" 
            key={`name-${currentPartner}`}
          >
            {displayName}
          </p>
        </div>
      </div>
    </div>
  );
}
