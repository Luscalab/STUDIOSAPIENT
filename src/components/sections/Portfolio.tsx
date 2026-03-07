import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";
  const featuredImage = PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-p-main/1200/800";

  return (
    <section id="portfolio" className="section-spacing bg-white overflow-hidden relative">
      {/* Decorative text bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] lg:text-[25vw] font-black text-primary/[0.01] pointer-events-none select-none uppercase tracking-tighter">
        Galeria
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-20 md:mb-32">
          <Badge className="mb-6 md:mb-10 bg-primary/10 text-primary px-8 md:px-10 py-2 md:py-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] rounded-full">Trabalhos</Badge>
          <h2 className="font-headline text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 md:mb-12 tracking-tighter leading-none">Nosso Universo</h2>
          <p className="text-muted-foreground/60 text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight max-w-3xl mx-auto text-balance">
            Acreditamos na honestidade visual. O acervo completo das nossas criações está documentado exclusivamente em nossa galeria oficial.
          </p>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <Link 
            href={behanceUrl} 
            target="_blank"
            className="block relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden bg-secondary shadow-2xl transition-all duration-1000 group-hover:shadow-primary/15"
          >
            <Image 
              src={featuredImage}
              alt="Sapient Portfolio on Behance"
              fill
              className="object-cover transition-all duration-[3000ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
              data-ai-hint="luxury design"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-1000" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 md:gap-16">
                <div className="max-w-2xl text-left">
                  <Badge className="mb-4 md:mb-8 bg-white/10 text-white border-white/20 backdrop-blur-xl px-6 md:px-8 py-2 md:py-3 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                    Clique para Explorar
                  </Badge>
                  <h3 className="font-headline text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4 md:mb-6 leading-[0.85] animate-in slide-in-from-bottom-6 duration-1000">
                    Behance Oficial
                  </h3>
                  <p className="text-white/60 text-base md:text-xl lg:text-2xl font-medium tracking-tight">Estratégia • Identidade • Experiência Digital</p>
                </div>
                <div className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-1000 shadow-primary/30 group-hover:rotate-12 shrink-0">
                  <ExternalLink className="h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
                </div>
              </div>
            </div>
          </Link>
          
          {/* Decorative Corner */}
          <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 h-32 md:h-48 w-32 md:w-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000" />
        </div>

        <div className="mt-20 md:mt-32 text-center">
          <p className="text-muted-foreground/30 font-black mb-8 md:mb-10 uppercase tracking-[0.4em] text-[9px] md:text-xs">Curadoria Permanente @studiosapient</p>
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-3 md:gap-4 text-primary font-black text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] hover:tracking-[0.8em] transition-all duration-1000 group"
          >
            Abrir Portfólio <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}