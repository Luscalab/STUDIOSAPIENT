
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
    { name: "Metodologia", href: "/#metodologia" },
    { name: "Portfólio", href: "/#portfolio" },
    { name: "Dúvidas", href: "/#faq" },
    { name: "Contato", href: "/#contato" },
  ];

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <>
      {/* Header Estático: Elevado em 20% do topo original */}
      <header className="absolute top-2 left-0 right-0 z-50">
        <div className="container mx-auto px-6 flex items-center justify-start gap-12 lg:gap-20">
          
          {/* Lado Esquerdo: Logotipo Imponente mas Equilibrado */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="relative block w-48 h-12 md:w-[380px] md:h-28 group transition-transform hover:scale-[1.02]">
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                priority
              />
            </Link>
          </div>

          {/* Menu Desktop: Ajustado mais para a esquerda, logo após o logo */}
          <nav className="hidden xl:flex items-center gap-10 px-10 py-5 rounded-full border bg-white/5 backdrop-blur-3xl border-white/10 shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            
            <button 
              onClick={handleOpenChat}
              className="text-[10px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all relative group whitespace-nowrap"
            >
              Análise Estratégica
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
            </button>
          </nav>

          {/* Menu Mobile Button - Mantido à direita para contraste funcional */}
          <button 
            className="xl:hidden ml-auto p-4 rounded-2xl flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 active:scale-95 shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Menu</span>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Overlay Menu Mobile */}
        <div className={cn(
          "xl:hidden fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out transform",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}>
          <div className="h-full flex flex-col p-10 pt-32 bg-[#fbfaff]">
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-3xl font-black text-foreground tracking-tighter flex items-center justify-center group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <ArrowRight className="ml-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </Link>
              ))}
              <button 
                className="text-3xl font-black text-foreground tracking-tighter text-center flex items-center justify-center group"
                onClick={handleOpenChat}
              >
                Análise Estratégica
                <ArrowRight className="ml-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </button>
            </div>
            
            <div className="mt-auto pt-10 border-t border-muted text-center space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Contatos</p>
              <div className="space-y-2">
                <p className="font-bold text-lg text-foreground">sapientcontato@gmail.com</p>
                <p className="font-bold text-lg text-foreground">+55 11 95963-1870</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-primary shadow-lg"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
