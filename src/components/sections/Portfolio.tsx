import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Vanguard Lux",
    category: "Branding & Web",
    image: PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-p1/800/1000"
  },
  {
    title: "Nexus Tech",
    category: "Marketing Digital",
    image: PlaceHolderImages.find(img => img.id === "portfolio-2")?.imageUrl || "https://picsum.photos/seed/sap-p2/800/1000"
  },
  {
    title: "Sabor & Arte",
    category: "Gestão de Redes",
    image: PlaceHolderImages.find(img => img.id === "portfolio-3")?.imageUrl || "https://picsum.photos/seed/sap-p3/800/1000"
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Case Studies</Badge>
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6">Portfólio de Elite</h2>
            <p className="text-muted-foreground text-lg">
              Resultados tangíveis e estética impecável em cada projeto que assinamos.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-primary font-bold hover:underline">
            Ver Todos os Projetos <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] bg-secondary aspect-[4/5] shadow-2xl border border-white/5">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:blur-[2px]"
                data-ai-hint="portfolio project design"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Badge variant="outline" className="w-fit mb-4 text-primary border-primary/30 backdrop-blur-md">
                  {project.category}
                </Badge>
                <h3 className="font-headline text-3xl font-bold mb-4">{project.title}</h3>
                <div className="h-1 w-0 group-hover:w-full bg-primary transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}