import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 border-t border-primary/10 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-headline text-2xl font-bold tracking-tighter flex items-center gap-1 mb-6">
              <span className="text-primary italic">S@</span>
              <span className="tracking-widest">PIENT</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Transformando negócios comuns em marcas desejadas através de estratégia, design e marketing de alta performance.
            </p>
            <div className="flex gap-4">
              <Link href="https://instagram.com/studiosapient" target="_blank">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </Link>
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Serviços</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Marketing Digital</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Branding & Design</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Gestão de Social Media</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Nossos Projetos</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Carreiras</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6">Novidades</h4>
            <p className="text-muted-foreground mb-4 text-sm">Inscreva-se para receber insights exclusivos sobre branding.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-background border border-primary/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 font-bold transition-colors">OK</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-primary/5 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sapient Studio. Todos os direitos reservados.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Termos de Uso</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
