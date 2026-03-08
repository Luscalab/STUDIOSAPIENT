
import Link from "next/link";
import { Instagram, Linkedin, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-20 border-t border-muted bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 items-start">
          <div className="lg:col-span-4">
            <p className="text-foreground text-xl md:text-2xl mb-6 font-extrabold leading-tight tracking-tighter">
              SAPIENT STUDIO
            </p>
            
            <p className="text-muted-foreground/60 text-base md:text-lg mb-8 font-medium leading-relaxed tracking-tight max-w-sm">
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
                  className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-500 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Serviços Estratégicos</h4>
            <ul className="space-y-4 text-muted-foreground/70 font-bold text-[10px] uppercase tracking-widest">
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

          <div className="lg:col-span-4">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.4em] text-primary mb-6">A Agência</h4>
            <ul className="space-y-4 text-muted-foreground/70 font-bold text-[10px] uppercase tracking-widest">
              <li><Link href="https://www.behance.net/sapient" target="_blank" className="hover:text-primary transition-colors">Portfólio Behance</Link></li>
              <li><Link href="#portfolio" className="hover:text-primary transition-colors">Projetos Recentes</Link></li>
              <li><Link href="#contato" className="hover:text-primary transition-colors">Falar com Consultor</Link></li>
              <li><Link href="#sobre" className="hover:text-primary transition-colors">Nossa Metodologia</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-muted text-[8px] font-black text-muted-foreground/40 tracking-[0.4em] uppercase text-center md:text-left gap-6">
          <p>© {new Date().getFullYear()} SAPIENT STUDIO. DESIGN & ESTRATÉGIA.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
