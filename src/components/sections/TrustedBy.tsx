
"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function TrustedBy() {
  const partnerLogo = PlaceHolderImages.find(img => img.id === "partner-logo-1")?.imageUrl;

  const partners = [
    { id: 1, url: partnerLogo, name: "Parceiro Oficial" },
    { id: 2, url: "https://picsum.photos/seed/sap-p2/400/200", name: "Parceiro 2" },
    { id: 3, url: "https://picsum.photos/seed/sap-p3/400/200", name: "Parceiro 3" },
    { id: 4, url: "https://picsum.photos/seed/sap-p4/400/200", name: "Parceiro 4" },
    { id: 5, url: "https://picsum.photos/seed/sap-p5/400/200", name: "Parceiro 5" },
    { id: 6, url: partnerLogo, name: "Parceiro Oficial 2" },
  ].filter(p => p.url && p.url.trim() !== "");

  return (
    <section className="py-10 md:py-16 bg-white/5 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-[7px] md:text-[8px] font-black uppercase tracking-[0.6em] text-white/15 mb-10">
          Trusted By
        </p>
        
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-20 md:gap-40 items-center">
            {partners.length > 0 && [...partners, ...partners].map((partner, idx) => (
              <div key={idx} className="relative h-12 w-32 md:h-20 md:w-56 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                <Image
                  src={partner.url!}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 130px, 220px"
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
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  );
}
