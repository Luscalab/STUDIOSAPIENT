
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <footer className="py-24 border-t border-muted bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 items-start">
          <div className="lg:col-span-6">
            {/* Logo do Rodapé com Fundo Gradiente Roxo Intensificado */}
            <div className="relative mb-12 group w-fit">
              {/* Brilho radial de fundo persistente */}
              <div className="absolute -inset-16 bg-primary/10 rounded-full blur-[80px] opacity-100 group-hover:bg-primary/20 transition-all duration-1000" />
              
              <Link href="/" className="relative block h-16 w-36 md:h-[12.15rem] md:w-[45.9rem]">
                {/* Overlay gradiente roxo e dourado para o logotipo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent rounded-[3rem] blur-3xl -z-10" />
                <Image 
                  src={logoUrl}
                  alt="Sapient Studio Logo"
                  fill
                  className="object-contain object-left drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                />
              </Link>
            </div>
            
            <p className="text-muted-foreground/60 text-xl mb-12 font-medium leading-relaxed max-w-md tracking-tight">
              Transformamos negócios comuns em marcas desejadas através de design estratégico e performance de elite.
            </p>
            
            <div className="flex gap-6">
              {[
                { icon: <Instagram />, href: "https://instagram.com/studiosapient" },
                { icon: <Palette />, href: "https://www.behance.net/sapient" },
                { icon: <Linkedin />, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : "_self"}
                  className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-500 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline font-black text-xs uppercase tracking-[0.5em] text-primary mb-10">Serviços</h4>
            <ul className="space-y-6 text-muted-foreground/70 font-bold text-sm uppercase tracking-widest">
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  Performance & Ads <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  Design Estratégico <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  Gestão Social <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  Narrativa Visual <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline font-black text-xs uppercase tracking-[0.5em] text-primary mb-10">Agência</h4>
            <ul className="space-y-6 text-muted-foreground/70 font-bold text-sm uppercase tracking-widest">
              <li><Link href="https://www.behance.net/sapient" target="_blank" className="hover:text-primary transition-colors">Portfólio Behance</Link></li>
              <li><Link href="#portfolio" className="hover:text-primary transition-colors">Projetos Recentes</Link></li>
              <li><Link href="#contato" className="hover:text-primary transition-colors">Falar com Consultor</Link></li>
              <li><Link href="#sobre" className="hover:text-primary transition-colors">Sobre a Sapient</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-muted text-[10px] font-black text-muted-foreground/40 tracking-[0.5em] uppercase">
          <p>© {new Date().getFullYear()} SAPIENT STUDIO. ESTILO & PERFORMANCE.</p>
          <div className="flex gap-12 mt-8 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
