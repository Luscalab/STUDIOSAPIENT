import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 border-t border-muted bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <Link href="/" className="font-headline text-3xl font-bold tracking-tighter flex items-center gap-1 mb-10">
              <span className="text-primary italic">S@</span>
              <span className="tracking-widest text-foreground uppercase">PIENT</span>
            </Link>
            <p className="text-muted-foreground/60 text-xl mb-12 font-medium leading-relaxed max-w-md tracking-tight">
              Transformamos negócios comuns em marcas desejadas através de design estratégico e performance de elite.
            </p>
            <div className="flex gap-6">
              {[
                { icon: <Instagram />, href: "https://instagram.com/studiosapient" },
                { icon: <Palette />, href: "https://www.behance.net/sapient" },
                { icon: <Linkedin />, href: "#" },
                { icon: <Youtube />, href: "#" }
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

          <div className="lg:col-span-2">
            <h4 className="font-headline font-black text-xs uppercase tracking-[0.5em] text-primary mb-10">Serviços</h4>
            <ul className="space-y-6 text-muted-foreground/70 font-bold text-sm uppercase tracking-widest">
              <li><Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">Performance <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">Design Luxo <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">Social Elite <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2 group">Branding <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-headline font-black text-xs uppercase tracking-[0.5em] text-primary mb-10">Agência</h4>
            <ul className="space-y-6 text-muted-foreground/70 font-bold text-sm uppercase tracking-widest">
              <li><Link href="#sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link href="https://www.behance.net/sapient" target="_blank" className="hover:text-primary transition-colors">Behance</Link></li>
              <li><Link href="#contato" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline font-black text-xs uppercase tracking-[0.5em] text-primary mb-10">Newsletter</h4>
            <p className="text-muted-foreground/60 mb-10 text-lg font-medium tracking-tight">Assine nossa curadoria sobre branding e luxo.</p>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="E-mail profissional" 
                className="bg-secondary border-none rounded-2xl px-6 py-5 text-base w-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 py-5 font-black transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs">Inscrever-se</button>
            </div>
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