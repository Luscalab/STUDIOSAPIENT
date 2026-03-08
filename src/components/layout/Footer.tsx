
import Link from "next/link";
import { Instagram, Linkedin, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 border-t border-muted bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20 mb-20 items-start">
          <div className="lg:col-span-6">
            <p className="text-foreground text-2xl md:text-3xl mb-8 font-extrabold leading-tight tracking-tighter max-w-md">
              SAPIENT STUDIO
            </p>
            
            <p className="text-muted-foreground/60 text-lg md:text-xl mb-12 font-medium leading-relaxed max-w-md tracking-tight">
              Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/studiosapient" },
                { icon: <Palette className="h-5 w-5" />, href: "https://www.behance.net/sapient" },
                { icon: <Linkedin className="h-5 w-5" />, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : "_self"}
                  className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-500 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline font-black text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-8">Serviços</h4>
            <ul className="space-y-5 text-muted-foreground/70 font-bold text-[10px] md:text-xs uppercase tracking-widest">
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group w-fit">
                  Performance & Ads <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group w-fit">
                  Design Estratégico <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group w-fit">
                  Gestão Social <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group w-fit">
                  Narrativa Visual <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline font-black text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-8">Agência</h4>
            <ul className="space-y-5 text-muted-foreground/70 font-bold text-[10px] md:text-xs uppercase tracking-widest">
              <li><Link href="https://www.behance.net/sapient" target="_blank" className="hover:text-primary transition-colors">Portfólio Behance</Link></li>
              <li><Link href="#portfolio" className="hover:text-primary transition-colors">Projetos Recentes</Link></li>
              <li><Link href="#contato" className="hover:text-primary transition-colors">Falar com Consultor</Link></li>
              <li><Link href="#sobre" className="hover:text-primary transition-colors">Sobre a Sapient</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-muted text-[9px] font-black text-muted-foreground/40 tracking-[0.4em] uppercase text-center md:text-left gap-8">
          <p>© {new Date().getFullYear()} SAPIENT STUDIO. DESIGN & ESTRATÉGIA.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
