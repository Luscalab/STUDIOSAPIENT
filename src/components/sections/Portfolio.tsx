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
    <section id="portfolio" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-secondary text-primary border-none px-6 py-1.5 text-xs font-bold uppercase tracking-widest">Craftmanship</Badge>
            <h2 className="font-headline text-4xl md:text-7xl font-bold mb-8 text-foreground tracking-tighter">Portfólio de Elite</h2>
            <p className="text-muted-foreground text-xl font-medium">
              Transformando visões em realidades digitais que dominam o mercado.
            </p>
          </div>
          <button className="group flex items-center gap-3 text-primary font-bold text-lg hover:underline transition-all">
            Explorar Projetos <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[4rem] bg-secondary aspect-[4/5] premium-shadow hover-lift">
              {project.image && (
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                  data-ai-hint="luxury brand design"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-12 translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                <Badge variant="outline" className="w-fit mb-6 text-white border-white/40 backdrop-blur-md px-6 py-1.5 font-bold uppercase tracking-widest">
                  {project.category}
                </Badge>
                <h3 className="font-headline text-4xl font-extrabold mb-6 text-white tracking-tight">{project.title}</h3>
                <div className="h-1.5 w-0 group-hover:w-full bg-primary transition-all duration-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}