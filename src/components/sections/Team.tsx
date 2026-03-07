import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram } from "lucide-react";

const team = [
  {
    name: "Lucas Souza",
    role: "Marketing & Designer",
    image: PlaceHolderImages.find(img => img.id === "team-lucas")?.imageUrl || "https://picsum.photos/seed/lucas/400/400"
  },
  {
    name: "Luan Guimarães",
    role: "Consultor de Vendas",
    image: PlaceHolderImages.find(img => img.id === "team-luan")?.imageUrl || "https://picsum.photos/seed/luan/400/400"
  }
];

export function Team() {
  return (
    <section id="sobre" className="py-32 relative overflow-hidden bg-secondary/30">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <Badge className="mb-6 bg-white text-primary px-6 py-2 text-xs font-bold uppercase tracking-widest shadow-sm">Visionários</Badge>
          <h2 className="font-headline text-4xl md:text-7xl font-bold mb-8 text-foreground tracking-tighter">Nossa Equipe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-medium">
            Mentes estratégicas focadas em criar valor e conexões reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <div className="relative w-80 h-[28rem] mb-10 rounded-[4rem] overflow-hidden premium-shadow border-4 border-white group-hover:border-primary/20 transition-all duration-700">
                {member.image && (
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    data-ai-hint="professional headshot"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute bottom-10 left-0 w-full flex justify-center gap-6 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  <div className="h-14 w-14 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-xl">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="h-14 w-14 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-xl">
                    <Instagram className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <h3 className="font-headline text-4xl font-extrabold mb-3 group-hover:text-primary transition-colors tracking-tight">{member.name}</h3>
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}