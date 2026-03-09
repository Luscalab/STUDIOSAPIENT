import Link from "next/link";
import { Instagram, Linkedin, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <footer className="py-40 border-t border-muted bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 lg:gap-40 mb-40 items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <p className="text-foreground text-5xl font-black tracking-tighter mb-8 uppercase">
                studiosapient.
              </p>
              <p className="text-foreground/50 text-xl font-medium leading-relaxed max-w-md">
                Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.
              </p>
            </div>
            
            <div className="flex gap-6">
              {[
                { icon: <Instagram size={24} />, href: "https://instagram.com/studiosapient", label: "Instagram" },
                { icon: <Palette size={24} />, href: behanceUrl, label: "Behance" },
                { icon: <Linkedin size={24} />, href: "#", label: "LinkedIn" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : "_self"}
                  aria-label={social.label}
                  className="h-16 w-16 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-500 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-3">
            <h4 className="font-black text-[12px] uppercase tracking-[0.5em] text-primary mb-10">Ecossistema</h4>
            <ul className="space-y-6">
              <li>
                <Link href="/urbeludo" className="group flex items-center gap-3 w-fit text-cyan-600 hover:text-cyan-500 transition-all">
                  <span className="text-base font-black uppercase tracking-wider">Plataforma UrbeLudo</span>
                  <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </li>
              {[
                { name: "Performance & Ads", href: "/servicos/performance-ads" },
                { name: "Design Estratégico", href: "/servicos/design-estrategico" },
                { name: "Ecossistemas IA", href: "/servicos/chat-ia" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-foreground/50 hover:text-primary text-base font-bold uppercase tracking-widest transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-4">
            <h4 className="font-black text-[12px] uppercase tracking-[0.5em] text-primary mb-10">Agência</h4>
            <ul className="space-y-6">
              {[
                { name: "Portfólio Behance", href: behanceUrl, external: true },
                { name: "Falar com Consultor", href: "#contato" },
                { name: "Nossa Metodologia", href: "#metodologia" },
                { name: "Dúvidas Frequentes", href: "#faq" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    target={item.external ? "_blank" : "_self"}
                    className="text-foreground/50 hover:text-primary text-base font-bold uppercase tracking-widest transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-24 border-t border-muted text-[12px] font-black text-foreground/30 tracking-[0.6em] uppercase text-center md:text-left gap-10">
          <div className="space-y-2">
            <p>© {new Date().getFullYear()} STUDIOSAPIENT. DESIGN & ESTRATÉGIA.</p>
            <p className="text-[10px] opacity-60">TODOS OS DIREITOS RESERVADOS.</p>
          </div>
          <div className="flex gap-12">
            <Link href="#" className="hover:text-primary transition-colors">PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}