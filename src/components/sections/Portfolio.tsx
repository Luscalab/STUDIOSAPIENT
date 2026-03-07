import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">Trabalhos Selecionados</Badge>
            <h2 className="font-headline text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tighter">Nosso Portfólio</h2>
            <p className="text-muted-foreground text-xl font-medium leading-relaxed">
              Confira uma seleção do que entregamos ultimamente. Nosso acervo completo e detalhado está disponível exclusivamente em nosso Behance.
            </p>
          </div>
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="group flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
          >
            Ver no Behance <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, idx) => (
            <Link 
              key={idx} 
              href={behanceUrl} 
              target="_blank"
              className="group relative overflow-hidden rounded-[4rem] bg-secondary aspect-[4/5] premium-shadow hover-lift block"
            >
              {project.image && (
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:blur-[2px] opacity-90 group-hover:opacity-100"
                  data-ai-hint="design project"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <Badge variant="outline" className="w-fit mb-6 text-white border-white/40 backdrop-blur-md px-6 py-1.5 font-bold uppercase tracking-widest text-[10px]">
                  {project.category}
                </Badge>
                <div className="flex justify-between items-end">
                  <h3 className="font-headline text-4xl font-extrabold text-white tracking-tight">{project.title}</h3>
                  <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-all duration-700">
                    <ArrowUpRight className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-muted-foreground/60 font-medium mb-8">Quer ver o processo criativo detalhado de cada projeto?</p>
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-[0.4em] hover:underline"
          >
            Explorar galeria completa <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
