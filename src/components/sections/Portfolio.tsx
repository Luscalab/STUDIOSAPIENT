import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";
  const featuredImage = PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-p-main/1200/800";

  return (
    <section id="portfolio" className="section-spacing bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-32">
          <Badge className="mb-10 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Galeria</Badge>
          <h2 className="font-headline text-5xl md:text-9xl font-black mb-12 tracking-tighter leading-none">Nosso Universo</h2>
          <p className="text-muted-foreground/60 text-2xl md:text-3xl font-medium leading-relaxed tracking-tight max-w-3xl mx-auto">
            Acreditamos na honestidade visual. O acervo completo das nossas criações está documentado exclusivamente em nossa galeria oficial.
          </p>
        </div>

        <div className="relative group max-w-7xl mx-auto">
          <Link 
            href={behanceUrl} 
            target="_blank"
            className="block relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[4.5rem] overflow-hidden bg-secondary shadow-2xl transition-all duration-1000 group-hover:shadow-primary/10"
          >
            <Image 
              src={featuredImage}
              alt="Sapient Portfolio on Behance"
              fill
              className="object-cover transition-all duration-[3000ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
              data-ai-hint="luxury design"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-24">
              <div className="flex flex-col md:flex-row justify-between items-end gap-16">
                <div className="max-w-2xl text-left">
                  <Badge className="mb-8 bg-white/20 text-white border-white/20 backdrop-blur-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em]">
                    Clique para Explorar
                  </Badge>
                  <h3 className="font-headline text-4xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.85] animate-in slide-in-from-bottom-10 duration-1000">
                    Behance Oficial
                  </h3>
                  <p className="text-white/60 text-xl md:text-2xl font-medium tracking-tight">Estratégia • Identidade • Experiência Digital</p>
                </div>
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-1000 shadow-primary/30 group-hover:rotate-12">
                  <ExternalLink size={48} className="md:h-16 md:w-16" />
                </div>
              </div>
            </div>
          </Link>
          
          {/* Decorative Corner */}
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000" />
        </div>

        <div className="mt-32 text-center">
          <p className="text-muted-foreground/30 font-black mb-10 uppercase tracking-[0.5em] text-xs">Curadoria Permanente @studiosapient</p>
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-4 text-primary font-black text-sm uppercase tracking-[0.6em] hover:tracking-[0.8em] transition-all duration-1000 group"
          >
            Abrir Portfólio <ArrowUpRight className="h-5 w-5 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}