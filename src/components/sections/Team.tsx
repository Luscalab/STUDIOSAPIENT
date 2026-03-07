
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const team = [
  {
    name: "Ricardo Sapient",
    role: "Diretor Criativo",
    image: PlaceHolderImages.find(img => img.id === "team-1")?.imageUrl || ""
  },
  {
    name: "Helena Vaz",
    role: "Head de Design",
    image: PlaceHolderImages.find(img => img.id === "team-2")?.imageUrl || ""
  },
  {
    name: "Lucas Mendes",
    role: "Estrategista de Marketing",
    image: PlaceHolderImages.find(img => img.id === "team-3")?.imageUrl || ""
  }
];

export function Team() {
  return (
    <section id="sobre" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">Nosso Time</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mentes inquietas e apaixonadas por construir marcas que fazem história.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="team member"
                />
              </div>
              <h3 className="font-headline text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
