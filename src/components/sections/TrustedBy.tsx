
'use client';

import * as React from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

/**
 * Componente de Prova Social de Elite - Versão Ultra-Compacta Lateral.
 * Exibe os logotipos e nomes dos parceiros estratégicos com rotação automática.
 */
export function TrustedBy() {
  const [currentPartner, setCurrentPartner] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  // Filtra e ordena os parceiros específicos
  const partnersData = React.useMemo(() => [
    PlaceHolderImages.find(img => img.id === "partner-logo-2"), // 3DGOPRINT
    PlaceHolderImages.find(img => img.id === "partner-logo-1"), // Quitute Certa
    PlaceHolderImages.find(img => img.id === "partner-logo-3"), // ChargerBed
  ].filter((p): p is NonNullable<typeof p> => !!p), []);

  // Mapeamento explícito de nomes para garantir exibição correta
  const partnerNames: Record<string, string> = {
    'partner-logo-1': 'Quitute Certa',
    'partner-logo-2': '3DGOPRINT',
    'partner-logo-3': 'ChargerBed'
  };

  React.useEffect(() => {
    if (partnersData.length === 0) return;
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentPartner((prev) => (prev + 1) % partnersData.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [partnersData.length]);

  if (partnersData.length === 0) return null;

  const currentPartnerData = partnersData[currentPartner];
  const displayName = partnerNames[currentPartnerData.id] || "Parceiro Sapient";

  return (
    <div className="flex items-center gap-3 bg-white/5 p-2 rounded-[1.2rem] border border-white/10 backdrop-blur-3xl transition-all duration-700 hover:border-primary/40 group w-fit shadow-2xl">
      
      {/* Box do Logotipo */}
      <div className="relative h-10 w-10 rounded-[0.8rem] bg-white flex items-center justify-center overflow-hidden shadow-lg transition-all duration-1000 group-hover:scale-105">
        <div className={cn(
          "relative w-full h-full p-1.5 transition-all duration-500",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}>
          <Image 
            src={currentPartnerData.imageUrl} 
            alt={currentPartnerData.description}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Identidade do Cliente */}
      <div className="min-w-[90px] md:min-w-[120px] pr-2">
        <p className="text-[6px] font-black uppercase tracking-[0.4em] text-white/30 mb-0.5">
          CONFIADO POR
        </p>
        <div className="h-[16px] flex items-center">
          <p 
            className={cn(
              "text-[10px] md:text-[11px] font-black text-white uppercase tracking-tight leading-none transition-all duration-500",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            )}
          >
            {displayName}
          </p>
        </div>
      </div>
    </div>
  );
}
