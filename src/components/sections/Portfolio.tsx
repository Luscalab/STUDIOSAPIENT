
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
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary px-8 py-2 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">Portfólio</Badge>
          <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">Projetos Recentes</h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed tracking-tight max-w-2xl mx-auto">
            Acompanhe as transformações que realizamos em diversos nichos do mercado.
          </p>
        </div>

        <div className="relative group max-w-6xl mx-auto">
          <Link 
            href={behanceUrl} 
            target="_blank"
            className="block relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-secondary shadow-2xl transition-all duration-500"
          >
            <Image 
              src={featuredImage}
              alt="Sapient Portfolio"
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              data-ai-hint="professional design"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="flex justify-between items-end gap-6">
                <div className="max-w-xl text-left">
                  <Badge className="mb-4 bg-white/20 text-white backdrop-blur-md px-4 py-1 text-[9px] font-bold uppercase tracking-wider">
                    Galeria Completa
                  </Badge>
                  <h3 className="font-headline text-3xl md:text-5xl font-bold text-white tracking-tighter mb-2">
                    Nossas Entregas
                  </h3>
                  <p className="text-white/70 text-base font-medium tracking-tight">Identidade • Estratégia • Performance</p>
                </div>
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                  <ExternalLink className="h-6 w-6" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all group"
          >
            Abrir Behance <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
