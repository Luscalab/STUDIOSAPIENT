
"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function TrustedBy() {
  const partnerLogo = PlaceHolderImages.find(img => img.id === "partner-logo-1")?.imageUrl || "";

  // Simulação de outros parceiros para preencher o slide
  const partners = [
    { id: 1, url: partnerLogo, name: "Parceiro 1" },
    { id: 2, url: "https://picsum.photos/seed/p2/200/100", name: "Parceiro 2" },
    { id: 3, url: "https://picsum.photos/seed/p3/200/100", name: "Parceiro 3" },
    { id: 4, url: "https://picsum.photos/seed/p4/200/100", name: "Parceiro 4" },
    { id: 5, url: "https://picsum.photos/seed/p5/200/100", name: "Parceiro 5" },
    { id: 6, url: partnerLogo, name: "Parceiro 6" },
  ];

  return (
    <section className="py-12 md:py-20 bg-white/5 border-y border-white/5">
      <div className="container mx-auto px-6">
        <p className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12">
          Empresas que confiam na Sapient
        </p>
        
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-12 md:gap-24 items-center">
            {[...partners, ...partners].map((partner, idx) => (
              <div key={idx} className="relative h-10 w-32 md:h-16 md:w-48 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <Image
                  src={partner.url}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
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
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
