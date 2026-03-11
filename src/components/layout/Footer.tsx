
'use client';

import Link from "next/link";
import { Instagram, Palette, Mail, MessageCircle } from "lucide-react";
import { TrustedBy } from "@/components/sections/TrustedBy";

export function Footer() {
  const behanceUrl = "https://www.behance.net/sapient";
  const email = "contato@studiosapient.com.br";
  const phone = "+55 11 95963-1870";
  const phoneDigits = "5511959631870";

  return (
    <footer className="pt-16 pb-12 border-t border-white/5 bg-[#08070b] overflow-hidden text-white">
      <div className="container mx-auto px-6">
        
        {/* Prova Social Integrada - Espaçamento Otimizado */}
        <div className="mb-12 pb-12 border-b border-white/5 flex justify-center md:justify-start">
          <TrustedBy />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">
          
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <p className="text-white text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">
                studiosapient.
              </p>
              <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed max-w-sm">
                Transformamos negócios em referências através de ecossistemas digitais de alta clareza e autoridade visual.
              </p>
            </div>
            
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={18} />, href: "https://instagram.com/studiosapient", label: "Instagram" },
                { icon: <Palette size={18} />, href: behanceUrl, label: "Behance" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  aria-label={social.label}
                  className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-500 group"
                >
                  <div className="group-hover:rotate-12 transition-transform duration-500">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-primary mb-6 md:mb-8">Soluções</h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                { name: "Performance Ads", href: "/servicos/performance-ads" },
                { name: "Sites Premium", href: "/servicos/sites-premium" },
                { name: "Design Estratégico", href: "/servicos/design-estrategico" },
                { name: "Chat Inteligente", href: "/servicos/chat-ia" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/30 hover:text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-primary mb-6 md:mb-8">Navegação</h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                { name: "UrbeLudo", href: "/urbeludo" },
                { name: "Dossiês/Blog", href: "/blog" },
                { name: "Metodologia", href: "/#metodologia" },
                { name: "Início", href: "/" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/30 hover:text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-primary mb-6 md:mb-8">Contatos Oficiais</h4>
            <ul className="space-y-4 md:space-y-6">
              <li>
                <a href={`mailto:${email}`} className="group flex items-center gap-3 md:gap-4 text-white/30 hover:text-primary transition-all">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[6px] md:text-[7px] font-black uppercase tracking-widest text-white/20">E-mail Corporativo</p>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-white">{email}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${phoneDigits}`} target="_blank" className="group flex items-center gap-3 md:gap-4 text-white/30 hover:text-primary transition-all">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <MessageCircle size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[6px] md:text-[7px] font-black uppercase tracking-widest text-white/20">WhatsApp Business</p>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-white">{phone}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[7px] md:text-[8px] font-black tracking-[0.5em] uppercase text-center md:text-left gap-6 md:gap-8">
          <p className="text-primary/60">© 2026 STUDIOSAPIENT. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="#" className="hover:text-primary transition-colors text-white/10">PRIVACIDADE</Link>
            <Link href="#" className="hover:text-primary transition-colors text-white/10">TERMOS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
