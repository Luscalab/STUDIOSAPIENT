
"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function TrustedBy() {
  const partnerLogo1 = PlaceHolderImages.find(img => img.id === "partner-logo-1")?.imageUrl;
  const partnerLogo2 = PlaceHolderImages.find(img => img.id === "partner-logo-2")?.imageUrl;

  const partners = [
    { id: 1, url: partnerLogo1, name: "Parceiro Estratégico" },
    { id: 2, url: partnerLogo2, name: "Cliente VIP" },
    { id: 3, url: "https://picsum.photos/seed/sap-p3/400/400", name: "Parceiro Adicional" },
    { id: 4, url: partnerLogo1, name: "Parceiro Estratégico 2" },
    { id: 5, url: partnerLogo2, name: "Cliente VIP 2" },
    { id: 6, url: "https://picsum.photos/seed/sap-p4/400/400", name: "Parceiro Adicional 2" },
  ].filter(p => p.url && p.url.trim() !== "");

  return (
    <section className="py-12 md:py-20 bg-white/5 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-12">
          Marcas que Confiam
        </p>
        
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-12 md:gap-24 items-center">
            {partners.length > 0 && [...partners, ...partners].map((partner, idx) => (
              <div 
                key={idx} 
                className="relative aspect-square h-20 w-20 md:h-32 md:w-32 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center p-4 md:p-6 group hover:bg-white/10 hover:border-primary/30 transition-all duration-700"
              >
                <div className="relative w-full h-full grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                  <Image
                    src={partner.url!}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 80px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
