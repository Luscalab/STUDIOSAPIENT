import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram } from "lucide-react";

const team = [
  {
    name: "Lucas Souza",
    role: "Marketing & Designer",
    image: PlaceHolderImages.find(img => img.id === "team-lucas")?.imageUrl || "https://picsum.photos/seed/lucas-marketing/800/1000"
  },
  {
    name: "Luan Guimarães",
    role: "Consultor de Vendas",
    image: PlaceHolderImages.find(img => img.id === "team-luan")?.imageUrl || "https://picsum.photos/seed/luan-sales/800/1000"
  }
];

export function Team() {
  return (
    <section id="sobre" className="section-spacing relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-40 gap-16">
          <div className="max-w-4xl">
            <Badge className="mb-10 bg-secondary text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full shadow-sm">Fundadores</Badge>
            <h2 className="font-headline text-6xl md:text-[10rem] font-bold text-foreground tracking-tighter leading-[0.85]">Mentes<br />Sapientes</h2>
          </div>
          <p className="text-muted-foreground/70 text-2xl md:text-3xl font-medium max-w-lg lg:text-right leading-relaxed tracking-tight">
            A combinação exata entre inteligência comercial e maestria criativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 max-w-7xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] mb-16 rounded-[5rem] overflow-hidden premium-shadow border-[12px] border-white group-hover:border-primary/5 transition-all duration-1000 group-hover:-rotate-3 group-hover:scale-105">
                {member.image && (
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                    data-ai-hint="luxury professional"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="absolute bottom-16 left-0 w-full flex justify-center gap-10 translate-y-24 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
                  <a href="#" className="h-20 w-20 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl">
                    <Linkedin size={32} />
                  </a>
                  <a href="https://instagram.com/studiosapient" target="_blank" className="h-20 w-20 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl">
                    <Instagram size={32} />
                  </a>
                </div>
              </div>
              <h3 className="font-headline text-6xl font-extrabold mb-4 group-hover:text-primary transition-all duration-700 tracking-tighter">{member.name}</h3>
              <p className="text-primary font-black tracking-[0.5em] uppercase text-xs mb-6">{member.role}</p>
              <div className="h-[3px] w-16 bg-muted group-hover:w-48 group-hover:bg-primary transition-all duration-1000 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}