import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

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
    <section id="sobre" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">A Mente por trás da Marca</Badge>
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6">Nossa Equipe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Especialistas dedicados a criar valor real e conexões duradouras para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <div className="relative w-64 h-64 mb-8 rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="professional team member"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-primary font-semibold tracking-wide uppercase text-sm">{member.role}</p>
              
              <div className="mt-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="h-10 w-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <span className="text-xs font-bold">IN</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}