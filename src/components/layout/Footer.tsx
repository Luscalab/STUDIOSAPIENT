import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 border-t border-muted bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-headline text-3xl font-bold tracking-tighter flex items-center gap-1 mb-8">
              <span className="text-primary italic">S@</span>
              <span className="tracking-widest text-foreground">PIENT</span>
            </Link>
            <p className="text-muted-foreground text-lg mb-10 font-medium leading-relaxed">
              Transformando marcas comuns em símbolos de desejo através de design impecável e estratégia de elite.
            </p>
            <div className="flex gap-6">
              <Link href="https://instagram.com/studiosapient" target="_blank" className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram className="h-5 w-5" />
              </Link>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer">
                <Linkedin className="h-5 w-5" />
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-xl mb-10">Serviços</h4>
            <ul className="space-y-6 text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Marketing de Performance</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Branding Premium</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Design Estratégico</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Gestão de Autoridade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-xl mb-10">Agência</h4>
            <ul className="space-y-6 text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Sobre a Sapient</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Metodologia</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-xl mb-10">Insights</h4>
            <p className="text-muted-foreground mb-8 text-lg font-medium leading-relaxed">Assine nossa curadoria sobre branding e luxo digital.</p>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="E-mail profissional" 
                className="bg-secondary border-none rounded-2xl px-6 py-5 text-base w-full focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 py-5 font-bold transition-all shadow-lg shadow-primary/20">Inscrever-se</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-muted text-sm font-bold text-muted-foreground/60 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} SAPIENT STUDIO. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-12 mt-6 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">POLÍTICA DE PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}