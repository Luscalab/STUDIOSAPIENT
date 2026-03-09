import Link from "next/link";
import { Instagram, Linkedin, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <footer className="py-48 border-t border-muted bg-white overflow-hidden section-flow-top">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 lg:gap-40 mb-40 items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-14">
            <div>
              <p className="text-foreground text-5xl font-black tracking-tighter mb-8 uppercase font-display">
                studiosapient.
              </p>
              <p className="text-foreground/40 text-xl font-medium leading-relaxed tracking-tighter max-w-sm font-body">
                Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.
              </p>
            </div>
            
            <div className="flex gap-6">
              {[
                { icon: <Instagram className="h-6 w-6" />, href: "https://instagram.com/studiosapient", label: "Instagram" },
                { icon: <Palette className="h-6 w-6" />, href: behanceUrl, label: "Behance" },
                { icon: <Linkedin className="h-6 w-6" />, href: "#", label: "LinkedIn" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : "_self"}
                  aria-label={social.label}
                  className="h-16 w-16 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary/40 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-700"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-3">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.8em] text-primary mb-12 font-display">Ecossistema</h4>
            <ul className="space-y-8">
              <li>
                <Link href="/urbeludo" className="group flex items-center gap-3 w-fit text-cyan-600 hover:text-cyan-500 transition-all font-display">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em]">Plataforma UrbeLudo</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </Link>
              </li>
              {[
                { name: "Performance & Ads", href: "/servicos/performance-ads" },
                { name: "Design Estratégico", href: "/servicos/design-estrategico" },
                { name: "Ecossistemas IA", href: "/servicos/chat-ia" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-foreground/30 hover:text-primary text-[11px] font-black uppercase tracking-[0.4em] transition-colors flex items-center gap-3 font-display">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-4">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.8em] text-primary mb-12 font-display">Agência</h4>
            <ul className="space-y-8">
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
                    className="text-foreground/30 hover:text-primary text-[11px] font-black uppercase tracking-[0.4em] transition-colors flex items-center gap-3 font-display"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-24 border-t border-muted text-[10px] font-black text-foreground/20 tracking-[0.8em] uppercase text-center md:text-left gap-10">
          <div className="space-y-2">
            <p className="font-display">© {new Date().getFullYear()} STUDIOSAPIENT. DESIGN & ESTRATÉGIA.</p>
            <p className="text-[8px] opacity-50 tracking-[1em] font-display">Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-12 font-display">
            <Link href="#" className="hover:text-primary transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-primary transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}