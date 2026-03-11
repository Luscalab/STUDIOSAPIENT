
"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function TrustedBy() {
  const partnerLogo = PlaceHolderImages.find(img => img.id === "partner-logo-1")?.imageUrl;

  const partners = [
    { id: 1, url: partnerLogo, name: "Parceiro 1" },
    { id: 2, url: "https://picsum.photos/seed/p2/200/100", name: "Parceiro 2" },
    { id: 3, url: "https://picsum.photos/seed/p3/200/100", name: "Parceiro 3" },
    { id: 4, url: "https://picsum.photos/seed/p4/200/100", name: "Parceiro 4" },
    { id: 5, url: "https://picsum.photos/seed/p5/200/100", name: "Parceiro 5" },
    { id: 6, url: partnerLogo, name: "Parceiro 6" },
  ].filter(p => !!p.url); // SEGURANÇA: Remove itens sem URL válida

  return (
    <section className="py-8 md:py-12 bg-white/5 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-[7px] md:text-[8px] font-black uppercase tracking-[0.6em] text-white/15 mb-8">
          Trusted By
        </p>
        
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center">
            {[...partners, ...partners].map((partner, idx) => (
              <div key={idx} className="relative h-6 w-24 md:h-10 md:w-40 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                <Image
                  src={partner.url!}
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
