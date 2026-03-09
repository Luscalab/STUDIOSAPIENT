"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
      {/* Header Estático Elevado */}
      <header className="absolute top-2 left-0 right-0 z-50">
        <div className="container mx-auto px-6 flex items-center justify-start gap-12 lg:gap-16">
          
          {/* Lado Esquerdo: Logotipo Imponente */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="relative block w-48 h-12 md:w-[420px] md:h-32 group transition-transform hover:scale-[1.01]">
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                priority
              />
            </Link>
          </div>

          {/* Menu Desktop: Posicionado à esquerda próximo ao logo */}
          <nav className="hidden xl:flex items-center gap-10 px-12 py-6 rounded-full border bg-white/5 backdrop-blur-3xl border-white/10 shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            
            <button 
              onClick={handleOpenChat}
              className="text-[10px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all relative group whitespace-nowrap flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Análise IA
              <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
            </button>
          </nav>

          {/* Menu Mobile Button */}
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
          "xl:hidden fixed inset-0 z-[60] bg-white transition-all duration-700 ease-in-out transform",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}>
          <div className="h-full flex flex-col p-12 pt-32 bg-[#fbfaff]">
             <div className="mb-12">
               <Image src={logoUrl} alt="Logo" width={240} height={60} className="object-contain filter invert" />
             </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl font-black text-foreground tracking-tighter hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="text-4xl font-black text-foreground tracking-tighter text-left hover:text-primary transition-colors"
                onClick={handleOpenChat}
              >
                Análise Estratégica
              </button>
            </div>
            
            <div className="mt-auto pt-12 border-t border-muted">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-4">Conexão Direta</p>
              <p className="font-bold text-xl text-foreground">sapientcontato@gmail.com</p>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-10 h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-primary shadow-xl"
            >
              <X size={32} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}