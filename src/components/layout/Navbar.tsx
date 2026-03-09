
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
    { name: "UrbeLudo", href: "/urbeludo" },
    { name: "Portfólio", href: "https://www.behance.net/sapient", external: true },
    { name: "Dúvidas", href: "/#faq" },
    { name: "Contato", href: "/#contato" },
  ];

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <>
      <header className="absolute top-12 left-0 right-0 z-[150] transition-all duration-1000" role="banner">
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          <div className="flex items-center shrink-0">
            <Link 
              href="/" 
              aria-label="Sapient Studio Home"
              className="relative block w-[280px] h-[70px] md:w-[480px] md:h-[120px] transition-all duration-1000 hover:scale-105"
            >
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
                priority
              />
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-10 px-12 py-7 rounded-full border bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl" aria-label="Navegação Principal">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                target={link.external ? "_blank" : "_self"}
                className="text-[11px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all duration-500 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-primary transition-all duration-500 group-hover:w-full rounded-full" />
              </Link>
            ))}
            
            <button 
              onClick={handleOpenChat}
              aria-label="Iniciar Análise com Inteligência Artificial"
              className="text-[11px] uppercase tracking-[0.4em] font-black text-white hover:text-primary transition-all duration-500 relative group whitespace-nowrap flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Análise IA
              <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-primary transition-all duration-500 group-hover:w-full rounded-full" />
            </button>
          </nav>

          <button 
            className="xl:hidden p-5 rounded-2xl flex items-center gap-3 bg-white/10 backdrop-blur-3xl text-white border border-white/20 active:scale-95 shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Menu</span>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={cn(
          "xl:hidden fixed inset-0 z-[160] bg-[#0c0a1a] transition-all duration-700 ease-in-out transform",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}>
          <div className="h-full flex flex-col p-12 pt-40 hero-purple-mesh">
             <div className="mb-20">
               <Image src={logoUrl} alt="Logo" width={400} height={120} className="object-contain" />
             </div>
            <div className="flex flex-col gap-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  target={link.external ? "_blank" : "_self"}
                  className="text-5xl font-black text-white tracking-tighter hover:text-primary transition-colors duration-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="text-5xl font-black text-white tracking-tighter text-left hover:text-primary transition-colors duration-500"
                onClick={handleOpenChat}
              >
                Análise IA
              </button>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-10 h-20 w-20 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20"
            >
              <X size={32} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
