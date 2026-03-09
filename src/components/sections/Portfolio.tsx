import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight, Palette } from "lucide-react";
import Link from "next/link";

const featuredProject = {
  id: "portfolio-1",
  title: "Dossiê Identidade Premium",
  category: "Engenharia de Branding",
  icon: <Palette className="h-6 w-6" />,
  image: PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-port-1/1200/800",
  description: "Repisicionamento completo focado em capturar autoridade de nicho e acelerar o ciclo comercial."
};

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section id="portfolio" className="py-24 md:py-48 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full soft-gradient-bg opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-32">
          <Badge className="mb-10 bg-primary/10 text-primary border-primary/20 px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Exibição de Impacto</Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10">
            Dossiê em<br /><span className="text-primary italic opacity-90">Destaque.</span>
          </h2>
          <p className="text-muted-foreground/60 text-xl md:text-3xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
            Uma imersão técnica em clareza visual e resultados previsíveis.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Link 
            href={behanceUrl}
            target="_blank"
            className="group relative block aspect-video md:aspect-[21/9] rounded-[5rem] overflow-hidden bg-secondary shadow-4xl transition-all duration-1000 hover:-translate-y-6"
          >
            <Image 
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover transition-transform duration-[5000ms] group-hover:scale-110"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 border-[2px] border-white/5 rounded-[5rem] pointer-events-none" />

            <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end">
              <div className="max-w-4xl">
                <div className="flex items-center gap-6 mb-10">
                  <div className="h-20 w-20 rounded-[2rem] bg-primary/90 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl">
                    {featuredProject.icon}
                  </div>
                  <div>
                    <Badge className="bg-white/10 text-white backdrop-blur-xl border-white/10 px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                      {featuredProject.category}
                    </Badge>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">Estudo de Caso Principal</p>
                  </div>
                </div>
                
                <h3 className="font-headline text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none">
                  {featuredProject.title}
                </h3>
                
                <p className="text-white/60 text-xl md:text-2xl font-medium mb-12 max-w-2xl leading-relaxed hidden md:block">
                  {featuredProject.description}
                </p>

                <div className="flex items-center gap-4 text-white text-[11px] font-black uppercase tracking-[0.4em] group-hover:text-primary transition-colors duration-700">
                  Explorar Dossiê Completo <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                </div>
              </div>
            </div>

            <div className="absolute top-12 right-12 h-20 w-20 rounded-full bg-white text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-700 shadow-3xl">
              <ExternalLink className="h-8 w-8" />
            </div>
          </Link>
        </div>

        <div className="mt-32 text-center">
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-6 p-10 rounded-full bg-secondary/50 border border-primary/10 hover:bg-primary hover:text-white transition-all duration-1000 group shadow-2xl"
          >
            <span className="text-xs font-black uppercase tracking-[0.5em]">Explorar Portfólio de Autoridade</span>
            <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all shadow-lg">
              <ArrowUpRight className="h-7 w-7" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}