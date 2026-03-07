import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Portfolio() {
  const behanceUrl = "https://www.behance.net/sapient";
  const featuredImage = PlaceHolderImages.find(img => img.id === "portfolio-1")?.imageUrl || "https://picsum.photos/seed/sap-p-main/1200/800";

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Trabalhos</Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-bold mb-10 tracking-tighter">Nosso Portfólio</h2>
          <p className="text-muted-foreground/60 text-xl md:text-2xl font-medium leading-relaxed tracking-tight">
            Acreditamos na transparência. Nossos projetos são documentados em detalhes exclusivamente em nossa galeria oficial do Behance.
          </p>
        </div>

        <Link 
          href={behanceUrl} 
          target="_blank"
          className="group relative block w-full aspect-[16/9] md:aspect-[21/9] rounded-[4rem] overflow-hidden bg-secondary premium-shadow hover-lift transition-all duration-1000"
        >
          <Image 
            src={featuredImage}
            alt="Sapient Portfolio on Behance"
            fill
            className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            data-ai-hint="design portfolio"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="max-w-2xl text-left">
                <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-6 py-2 text-[10px] font-black uppercase tracking-widest">
                  Galeria Oficial
                </Badge>
                <h3 className="font-headline text-4xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 leading-[0.9]">
                  Explore nosso universo no Behance
                </h3>
                <p className="text-white/60 text-lg md:text-xl font-medium tracking-tight">Identidade Visual • Branding • Social Media • Web Design</p>
              </div>
              <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-700 shadow-primary/20">
                <ExternalLink size={40} />
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-24 text-center">
          <p className="text-muted-foreground/40 font-bold mb-8 uppercase tracking-[0.3em] text-xs italic">Acesse @studiosapient para curadoria completa</p>
          <Link 
            href={behanceUrl} 
            target="_blank" 
            className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all duration-700"
          >
            Abrir Behance <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
