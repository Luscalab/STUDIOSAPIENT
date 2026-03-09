
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight, Palette } from "lucide-react";
import Link from "next/link";

const featuredProject = {
  id: "portfolio-1",
  title: "Identidade Premium & Ecossistema Visual",
  category: "Branding & Design Estratégico",
  icon: <Palette className="h-5 w-5" />,
  image: PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-port-1/1200/800",
  description: "Transformação completa de presença digital focada em clareza técnica e autoridade de nicho."
};

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section id="portfolio" className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Background Sophistication */}
      <div className="absolute top-0 left-0 w-full h-full soft-gradient-bg opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">Dossiê de Entrega</Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-balance">
            Projeto em<br /><span className="text-primary italic opacity-90">Destaque.</span>
          </h2>
          <p className="text-muted-foreground/70 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
            Uma imersão técnica em clareza visual e resultados previsíveis para marcas de autoridade.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Link 
            href={behanceUrl}
            target="_blank"
            className="group relative block aspect-video md:aspect-[21/9] rounded-[4rem] overflow-hidden bg-secondary shadow-2xl transition-all duration-700 hover:-translate-y-4"
          >
            <Image 
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              data-ai-hint="premium design identity"
              priority
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
            <div className="absolute inset-0 border-[1px] border-white/10 rounded-[4rem] pointer-events-none" />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary backdrop-blur-md flex items-center justify-center text-white shadow-xl">
                    {featuredProject.icon}
                  </div>
                  <div>
                    <Badge className="bg-white/10 text-white backdrop-blur-md border-white/10 px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full mb-1">
                      {featuredProject.category}
                    </Badge>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Estudo de Caso Principal</p>
                  </div>
                </div>
                
                <h3 className="font-headline text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-none">
                  {featuredProject.title}
                </h3>
                
                <p className="text-white/70 text-lg md:text-xl font-medium mb-8 max-w-xl leading-relaxed hidden md:block">
                  {featuredProject.description}
                </p>

                <div className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-primary transition-colors duration-500">
                  Explorar Dossiê Completo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>

            {/* Top Right Floating Icon */}
            <div className="absolute top-10 right-10 h-16 w-16 rounded-full bg-white text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-700 shadow-2xl">
              <ExternalLink className="h-7 w-7" />
            </div>
          </Link>
        </div>

        <div className="mt-20 text-center">
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-4 p-8 rounded-full bg-secondary/50 border border-primary/10 hover:bg-primary hover:text-white transition-all duration-500 group shadow-sm"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em]">Ver Portfólio Estratégico no Behance</span>
            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
