import Link from "next/link";
import { Instagram, Linkedin, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <footer className="py-32 border-t border-muted bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-32 mb-32 items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <p className="text-foreground text-4xl font-black tracking-tighter mb-6 uppercase">
                studiosapient.
              </p>
              <p className="text-foreground/50 text-lg font-medium leading-relaxed max-w-sm">
                Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, href: "https://instagram.com/studiosapient", label: "Instagram" },
                { icon: <Palette size={20} />, href: behanceUrl, label: "Behance" },
                { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : "_self"}
                  aria-label={social.label}
                  className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-500"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-8">Ecossistema</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/urbeludo" className="group flex items-center gap-2 w-fit text-cyan-600 hover:text-cyan-500 transition-all">
                  <span className="text-sm font-bold uppercase tracking-wider">Plataforma UrbeLudo</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </li>
              {[
                { name: "Performance & Ads", href: "/servicos/performance-ads" },
                { name: "Design Estratégico", href: "/servicos/design-estrategico" },
                { name: "Ecossistemas IA", href: "/servicos/chat-ia" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-foreground/60 hover:text-primary text-sm font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-8">Agência</h4>
            <ul className="space-y-4">
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
                    className="text-foreground/60 hover:text-primary text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-muted text-[10px] font-bold text-foreground/30 tracking-widest uppercase text-center md:text-left gap-6">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} STUDIOSAPIENT. DESIGN & ESTRATÉGIA.</p>
            <p className="text-[8px] opacity-50">Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-primary transition-colors">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
