import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram } from "lucide-react";

const team = [
  {
    name: "Lucas Souza",
    role: "Marketing & Designer",
    image: PlaceHolderImages.find(img => img.id === "team-lucas")?.imageUrl || "https://picsum.photos/seed/lucas/600/800"
  },
  {
    name: "Luan Guimarães",
    role: "Consultor de Vendas",
    image: PlaceHolderImages.find(img => img.id === "team-luan")?.imageUrl || "https://picsum.photos/seed/luan/600/800"
  }
];

export function Team() {
  return (
    <section id="sobre" className="py-40 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12">
          <div className="max-w-3xl">
            <Badge className="mb-8 bg-secondary text-primary px-8 py-2 text-xs font-black uppercase tracking-[0.4em] rounded-full shadow-sm">Os Visionários</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-bold text-foreground tracking-tighter">Mentes por trás do brilho</h2>
          </div>
          <p className="text-muted-foreground text-2xl font-medium max-w-md lg:text-right leading-relaxed">
            Uma combinação única de estratégia comercial e criatividade disruptiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-6xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] mb-12 rounded-[4rem] overflow-hidden premium-shadow border-8 border-white group-hover:border-primary/10 transition-all duration-1000 group-hover:-rotate-2">
                {member.image && (
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    data-ai-hint="professional model"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="absolute bottom-12 left-0 w-full flex justify-center gap-8 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
                  <a href="#" className="h-16 w-16 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl">
                    <Linkedin className="h-7 w-7" />
                  </a>
                  <a href="https://instagram.com/studiosapient" target="_blank" className="h-16 w-16 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl">
                    <Instagram className="h-7 w-7" />
                  </a>
                </div>
              </div>
              <h3 className="font-headline text-5xl font-extrabold mb-4 group-hover:text-primary transition-all duration-700 tracking-tighter">{member.name}</h3>
              <p className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4">{member.role}</p>
              <div className="h-[2px] w-12 bg-muted group-hover:w-32 group-hover:bg-primary transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}