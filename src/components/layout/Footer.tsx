
import Link from "next/link";
import { Instagram, Linkedin, Palette, ArrowUpRight } from "lucide-react";

export function Footer() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <footer className="py-24 border-t border-muted bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-32 mb-24 items-start">
          
          <div className="lg:col-span-6 space-y-10">
            <div>
              <p className="text-black text-4xl font-black tracking-tighter mb-6 uppercase">
                studiosapient.
              </p>
              <p className="text-black/50 text-lg font-medium leading-relaxed max-w-md">
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
                  target="_blank"
                  aria-label={social.label}
                  className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary mb-8">Navegação</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/urbeludo" className="group flex items-center gap-2 w-fit text-cyan-600 hover:text-cyan-500 transition-all">
                  <span className="text-sm font-black uppercase tracking-widest">UrbeLudo Tech</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </li>
              {[
                { name: "Performance", href: "/servicos/performance-ads" },
                { name: "Design", href: "/servicos/design-estrategico" },
                { name: "IA Chat", href: "/servicos/chat-ia" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-black/50 hover:text-primary text-sm font-bold uppercase tracking-widest transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary mb-8">Agência</h4>
            <ul className="space-y-4">
              {[
                { name: "Portfólio", href: behanceUrl, external: true },
                { name: "Metodologia", href: "#metodologia" },
                { name: "Falar com Consultor", href: "#contato" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    target={item.external ? "_blank" : "_self"}
                    className="text-black/50 hover:text-primary text-sm font-bold uppercase tracking-widest transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-muted text-[10px] font-black text-black/30 tracking-[0.5em] uppercase text-center md:text-left gap-8">
          <p>© 2026 STUDIOSAPIENT. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-primary transition-colors text-black/30">PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors text-black/30">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
