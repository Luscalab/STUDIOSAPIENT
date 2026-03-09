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
      <header className="absolute top-10 left-0 right-0 z-[150] transition-all duration-1000" role="banner">
        <div className="container mx-auto px-6 flex items-center justify-between gap-12">
          
          {/* Logo Monumental */}
          <div className="flex items-center shrink-0">
            <Link 
              href="/" 
              aria-label="studiosapient Home"
              className="relative block w-[200px] h-[60px] md:w-[420px] md:h-[100px] transition-all duration-1000 hover:scale-105 active:scale-95"
            >
              <Image 
                src={logoUrl}
                alt="studiosapient Logo"
                fill
                className="object-contain object-left drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                priority
              />
            </Link>
          </div>

          {/* Navigation Dock - Desktop Premium */}
          <nav 
            className="hidden lg:flex items-center gap-12 px-14 py-8 rounded-full border bg-white/5 backdrop-blur-[70px] border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.5)] hover:border-white/25 transition-all duration-1000"
            aria-label="Navegação Principal"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                target={link.external ? "_blank" : "_self"}
                className="text-[14px] uppercase tracking-[0.3em] font-black text-white/60 hover:text-white transition-all duration-500 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-3 left-1/2 w-0 h-1 bg-primary transition-all duration-700 group-hover:w-full group-hover:left-0 rounded-full" />
              </Link>
            ))}
            
            <div className="w-px h-8 bg-white/20 mx-2" />
            
            <button 
              onClick={handleOpenChat}
              aria-label="Iniciar Análise com Inteligência Artificial"
              className="text-[14px] uppercase tracking-[0.3em] font-black text-white hover:text-primary transition-all duration-500 relative group whitespace-nowrap flex items-center gap-4"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-glow-pulse" aria-hidden="true" />
              Análise IA
              <span className="absolute -bottom-3 left-1/2 w-0 h-1 bg-primary transition-all duration-700 group-hover:w-full group-hover:left-0 rounded-full" />
            </button>
          </nav>

          {/* Mobile Trigger */}
          <button 
            className="lg:hidden p-5 rounded-[2.5rem] flex items-center gap-5 bg-white/5 backdrop-blur-3xl text-white border border-white/10 active:scale-90 transition-all shadow-2xl shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="text-[12px] font-black uppercase tracking-widest">Menu</span>
            <div className="relative h-7 w-7">
               <Menu className={cn("absolute inset-0 transition-all duration-700", isMobileMenuOpen ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0")} />
               <X className={cn("absolute inset-0 transition-all duration-700", isMobileMenuOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90")} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "lg:hidden fixed inset-0 z-[160] bg-[#09080f] transition-all duration-1000 ease-in-out transform",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}>
          <div className="h-full flex flex-col p-12 pt-40 hero-purple-mesh overflow-y-auto">
             <div className="mb-24 animate-logo-reveal">
               <Image src={logoUrl} alt="Logo" width={380} height={100} className="object-contain" />
             </div>
            
            <div className="flex flex-col gap-14">
              {navLinks.map((link, i) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  target={link.external ? "_blank" : "_self"}
                  className="text-6xl font-black text-white tracking-tighter hover:text-primary transition-all duration-700 animate-slide-up uppercase"
                  style={{ animationDelay: `${i * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="text-6xl font-black text-primary tracking-tighter text-left hover:text-white transition-all duration-700 animate-slide-up [animation-delay:500ms] uppercase"
                onClick={handleOpenChat}
              >
                Análise IA
              </button>
            </div>

            <div className="mt-auto pt-24 border-t border-white/10 flex flex-col gap-6 opacity-40">
              <p className="text-[14px] font-black uppercase tracking-[0.5em] text-white">studiosapient. v2.5</p>
              <p className="text-[12px] font-medium text-white/70 tracking-[0.3em]">Transformando negócios em autoridade.</p>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-12 right-12 h-24 w-24 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all"
            >
              <X size={36} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}