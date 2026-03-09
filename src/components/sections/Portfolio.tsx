
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight, Monitor, Palette, Megaphone } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "portfolio-1",
    title: "Identidade Premium",
    category: "Branding & Design",
    icon: <Palette className="h-4 w-4" />,
    image: PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-p1/800/1000",
  },
  {
    id: "portfolio-2",
    title: "Escala Local",
    category: "Performance & Ads",
    icon: <Megaphone className="h-4 w-4" />,
    image: PlaceHolderImages.find(img => img.id === "portfolio-2")?.imageUrl || "https://picsum.photos/seed/sap-p2/800/1000",
  },
  {
    id: "portfolio-3",
    title: "Autoridade Social",
    category: "Gestão de Redes",
    icon: <Monitor className="h-4 w-4" />,
    image: PlaceHolderImages.find(img => img.id === "portfolio-3")?.imageUrl || "https://picsum.photos/seed/sap-p3/800/1000",
  },
];

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section id="portfolio" className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Background Sophistication */}
      <div className="absolute top-0 left-0 w-full h-full soft-gradient-bg opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">Projetos de Autoridade</Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-balance">Dossiê de<br /><span className="text-primary italic opacity-90">Entregas.</span></h2>
          <p className="text-muted-foreground/70 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">Transformações reais em diversos nichos, focadas em clareza técnica e resultados previsíveis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <Link 
              key={idx}
              href={behanceUrl}
              target="_blank"
              className="group relative block aspect-[3/4] rounded-[3rem] overflow-hidden bg-secondary shadow-2xl transition-all duration-700 hover:-translate-y-4"
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                data-ai-hint="premium design work"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[3rem] pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end transform transition-transform duration-700 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                    {project.icon}
                  </div>
                  <Badge className="bg-white/10 text-white backdrop-blur-md border-white/10 px-4 py-1 text-[9px] font-black uppercase tracking-widest rounded-full">
                    {project.category}
                  </Badge>
                </div>
                <h3 className="font-headline text-3xl font-black text-white tracking-tighter mb-2">{project.title}</h3>
                <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  Explorar Projeto <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>

              {/* Icon Top Right */}
              <div className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-700 shadow-xl">
                <ExternalLink className="h-5 w-5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-4 p-8 rounded-full bg-secondary/50 border border-primary/10 hover:bg-primary hover:text-white transition-all duration-500 group shadow-sm"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em]">Acessar Galeria Completa no Behance</span>
            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
