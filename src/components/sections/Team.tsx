
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Instagram } from "lucide-react";

const lucasData = PlaceHolderImages.find(img => img.id === "team-lucas");
const luanData = PlaceHolderImages.find(img => img.id === "team-luan");

const team = [
  {
    name: "Lucas Souza",
    role: "Diretor Criativo",
    bio: "Especialista em converter visões de negócio em ecossistemas visuais eficientes.",
    image: lucasData?.imageUrl || "",
    alt: lucasData?.description || "Lucas Souza - Diretor Criativo"
  },
  {
    name: "Luan Guimarães",
    role: "Estrategista Comercial",
    bio: "Consultoria focada em escala, otimização de funis e resultados sustentáveis.",
    image: luanData?.imageUrl || "",
    alt: luanData?.description || "Luan Guimarães - Estrategista Comercial"
  }
];

export function Team() {
  return (
    <section id="sobre" className="section-spacing relative overflow-hidden bg-secondary/20 py-32">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-40 gap-20">
          <div className="max-w-4xl">
            <Badge className="mb-10 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Consultores</Badge>
            <h2 className="font-headline text-6xl md:text-[8rem] font-black text-foreground tracking-tighter leading-[0.85]">Quem<br />Somos</h2>
          </div>
          <p className="text-muted-foreground/60 text-2xl md:text-3xl font-medium max-w-xl leading-relaxed tracking-tight lg:pt-24">
            Combinamos estratégia comercial e design profissional para transformar marcas em referências de mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32 max-w-7xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="relative w-full aspect-[4/5] mb-12 rounded-[4rem] overflow-hidden bg-white premium-shadow transition-all duration-1000 group-hover:-translate-y-4">
                <Image 
                  src={member.image}
                  alt={member.alt}
                  fill
                  className="object-cover transition-transform [transition-duration:4000ms] group-hover:scale-105"
                  data-ai-hint="professional portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="absolute bottom-12 left-0 w-full flex justify-center gap-8 translate-y-24 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
                  <a href="https://instagram.com/studiosapient" target="_blank" className="h-16 w-16 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-xl">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <div className="text-left space-y-4">
                <h3 className="font-headline text-4xl md:text-5xl font-black tracking-tighter group-hover:text-primary transition-colors duration-500">{member.name}</h3>
                <p className="text-primary font-black tracking-[0.4em] uppercase text-[11px] mb-6">{member.role}</p>
                <p className="text-muted-foreground/60 text-lg font-medium leading-relaxed max-w-md">{member.bio}</p>
                <div className="h-1 w-12 bg-primary/10 group-hover:w-32 group-hover:bg-primary transition-all duration-1000 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
