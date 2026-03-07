
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Vanguard Lux",
    category: "Branding & Web",
    image: PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || ""
  },
  {
    title: "Nexus Tech",
    category: "Marketing Digital",
    image: PlaceHolderImages.find(img => img.id === "portfolio-2")?.imageUrl || ""
  },
  {
    title: "Sabor & Arte",
    category: "Gestão de Redes",
    image: PlaceHolderImages.find(img => img.id === "portfolio-3")?.imageUrl || ""
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">Portfólio Selecionado</h2>
            <p className="text-muted-foreground max-w-xl">
              Uma amostra dos nossos projetos mais recentes onde a estratégia encontra a criatividade.
            </p>
          </div>
          <Badge variant="outline" className="text-primary border-primary/30 h-10 px-6 rounded-full text-base cursor-pointer hover:bg-primary/5">
            Ver tudo
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl bg-secondary aspect-[3/4]">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint="portfolio project"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-primary font-medium mb-2">{project.category}</span>
                <h3 className="font-headline text-2xl font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
