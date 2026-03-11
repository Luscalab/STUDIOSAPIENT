
'use client';

import Link from "next/link";
import { Instagram, Palette, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { TrustedBy } from "@/components/sections/TrustedBy";

export function Footer() {
  const behanceUrl = "https://www.behance.net/sapient";
  const email = "contato@studiosapient.com.br";
  const phone = "+55 11 95963-1870";
  const phoneDigits = "5511959631870";

  return (
    <footer className="py-24 border-t border-white/5 bg-[#08070b] overflow-hidden text-white">
      <div className="container mx-auto px-6">
        
        {/* Seção de Parceiros Compacta integrada ao Rodapé */}
        <div className="mb-24 flex justify-center md:justify-start">
          <TrustedBy />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24 items-start">
          
          <div className="lg:col-span-4 space-y-10">
            <div>
              <p className="text-white text-4xl font-black tracking-tighter mb-6 uppercase">
                studiosapient.
              </p>
              <p className="text-white/50 text-lg font-medium leading-relaxed max-w-md">
                Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, href: "https://instagram.com/studiosapient", label: "Instagram" },
                { icon: <Palette size={20} />, href: behanceUrl, label: "Behance" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  aria-label={social.label}
                  className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(139,92,246,0.3)] group"
                >
                  <div className="group-hover:rotate-12 transition-transform duration-500">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary mb-8">Soluções</h4>
            <ul className="space-y-4">
              {[
                { name: "Performance Ads", href: "/servicos/performance-ads" },
                { name: "Sites Premium", href: "/servicos/sites-premium" },
                { name: "Design Estratégico", href: "/servicos/design-estrategico" },
                { name: "Chat Inteligente", href: "/servicos/chat-ia" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/40 hover:text-primary text-sm font-bold uppercase tracking-widest transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary mb-8">Navegação</h4>
            <ul className="space-y-4">
              {[
                { name: "UrbeLudo", href: "/urbeludo" },
                { name: "Dossiês/Blog", href: "/blog" },
                { name: "Metodologia", href: "/#metodologia" },
                { name: "Início", href: "/" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/40 hover:text-primary text-sm font-bold uppercase tracking-widest transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary mb-8">Contatos Oficiais</h4>
            <ul className="space-y-6">
              <li>
                <a href={`mailto:${email}`} className="group flex items-center gap-4 text-white/40 hover:text-primary transition-all">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20">E-mail Corporativo</p>
                    <p className="text-[11px] font-bold uppercase tracking-tight text-white">{email}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${phoneDigits}`} target="_blank" className="group flex items-center gap-4 text-white/40 hover:text-primary transition-all">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <MessageCircle size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20">WhatsApp Business</p>
                    <p className="text-[11px] font-bold uppercase tracking-tight text-white">{phone}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/5 text-[10px] font-black tracking-[0.5em] uppercase text-center md:text-left gap-8">
          <p className="text-primary animate-pulse">© 2026 STUDIOSAPIENT. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex items-center gap-10">
            <Link href="#" className="hover:text-primary transition-colors text-white/20">PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors text-white/20">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
