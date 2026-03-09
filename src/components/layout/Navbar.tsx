
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenChat = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  const navLinks = [
    { name: "Serviços", href: "/#servicos" },
    { name: "Portfólio", href: "/#portfolio" },
    { name: "Contato", href: "/#contato" },
  ];

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <>
      {/* 
        Header Estático: Posicionado no topo absoluto da página. 
        Py reduzido para "elevar" o conjunto em relação ao topo.
      */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4 md:py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* 
            Container do Logotipo: 
            Tamanho ampliado significativamente (Desktop: 480px, Mobile: 240px).
            Utiliza object-contain para garantir que a imagem não distorça.
          */}
          <div className="flex-shrink-0 animate-logo-reveal flex items-center">
            <Link href="/" className="relative block w-60 h-16 md:w-[480px] md:h-32 group">
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                priority
              />
            </Link>
          </div>

          {/* 
            Navegação Desktop: 
            Mantém o alinhamento centralizado com o logo.
          */}
          <nav className="hidden md:flex items-center gap-10 px-10 py-4 rounded-full border bg-white/5 backdrop-blur-3xl border-white/10 shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            
            <button 
              onClick={handleOpenChat}
              className="text-[10px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all relative group"
            >
              Análise Estratégica
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
            </button>
          </nav>

          {/* Botão do Menu Mobile */}
          <button 
            className="md:hidden p-3 rounded-2xl flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Menu</span>
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Overlay do Menu Mobile */}
        <div className={cn(
          "md:hidden fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out transform",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}>
          <div className="h-full flex flex-col p-10 pt-32">
            <div className="flex flex-col gap-10 text-center">
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl font-black text-foreground tracking-tighter flex items-center justify-center group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {link.name}
                  <ArrowRight className="ml-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </Link>
              ))}
              <button 
                className="text-4xl font-black text-foreground tracking-tighter text-center flex items-center justify-center group"
                onClick={handleOpenChat}
                style={{ transitionDelay: `${navLinks.length * 100}ms` }}
              >
                Análise Estratégica
                <ArrowRight className="ml-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </button>
            </div>
            
            <div className="mt-auto pt-10 border-t border-muted text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6">Contatos Diretos</p>
              <div className="space-y-4">
                <p className="font-bold text-lg">sapientcontato@gmail.com</p>
                <p className="font-bold text-lg">+55 11 95963-1870</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
