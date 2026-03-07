import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram, ArrowRight } from "lucide-react";

const team = [
  {
    name: "Lucas Souza",
    role: "Diretor Criativo",
    bio: "Especialista em traduzir visões de negócio em ecossistemas visuais de alta performance.",
    image: PlaceHolderImages.find(img => img.id === "team-lucas")?.imageUrl || "https://picsum.photos/seed/lucas-marketing/800/1000"
  },
  {
    name: "Luan Guimarães",
    role: "Estrategista Comercial",
    bio: "Consultoria estratégica focada em escala, funis de venda e ROI sustentável para marcas premium.",
    image: PlaceHolderImages.find(img => img.id === "team-luan")?.imageUrl || "https://picsum.photos/seed/luan-sales/800/1000"
  }
];

export function Team() {
  return (
    <section id="sobre" className="section-spacing relative overflow-hidden bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-40 gap-20">
          <div className="max-w-4xl">
            <Badge className="mb-10 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Duo Criativo</Badge>
            <h2 className="font-headline text-6xl md:text-[10rem] font-black text-foreground tracking-tighter leading-[0.8]">Quem<br />Somos</h2>
          </div>
          <p className="text-muted-foreground/60 text-2xl md:text-3xl font-medium max-w-xl leading-relaxed tracking-tight lg:pt-24">
            Combinamos inteligência comercial com design de elite para transformar marcas em líderes inquestionáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32 max-w-7xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="relative w-full aspect-[4/5] mb-12 rounded-[4rem] overflow-hidden bg-white premium-shadow transition-all duration-1000 group-hover:-translate-y-4">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                  data-ai-hint="professional portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="absolute bottom-12 left-0 w-full flex justify-center gap-8 translate-y-24 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
                  <a href="#" className="h-16 w-16 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-xl">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://instagram.com/studiosapient" target="_blank" className="h-16 w-16 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-xl">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <div className="text-left space-y-4">
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter group-hover:text-primary transition-colors duration-500">{member.name}</h3>
                <p className="text-primary font-black tracking-[0.4em] uppercase text-[11px] mb-6">{member.role}</p>
                <p className="text-muted-foreground/60 text-lg font-medium leading-relaxed max-w-md">{member.bio}</p>
                <div className="h-1 w-12 bg-primary/10 group-hover:w-40 group-hover:bg-primary transition-all duration-1000 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}