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
      <header className="absolute top-8 left-0 right-0 z-[150] transition-all duration-1000" role="banner">
        <div className="container mx-auto px-6 flex items-center justify-between gap-8">
          
          {/* Logo Monumental */}
          <div className="flex items-center shrink-0">
            <Link 
              href="/" 
              aria-label="studiosapient Home"
              className="relative block w-[200px] h-[60px] md:w-[400px] md:h-[100px] transition-all duration-1000 hover:scale-105 active:scale-95"
            >
              <Image 
                src={logoUrl}
                alt="studiosapient Logo"
                fill
                className="object-contain object-left drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                priority
              />
            </Link>
          </div>

          {/* Navigation Dock - Desktop Premium */}
          <nav 
            className="hidden lg:flex items-center gap-8 px-10 py-6 rounded-full border bg-white/5 backdrop-blur-[50px] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all duration-700"
            aria-label="Navegação Principal"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                target={link.external ? "_blank" : "_self"}
                className="text-sm uppercase tracking-widest font-semibold text-white/70 hover:text-white transition-all duration-500 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full group-hover:left-0 rounded-full" />
              </Link>
            ))}
            
            <div className="w-px h-5 bg-white/20 mx-2" />
            
            <button 
              onClick={handleOpenChat}
              aria-label="Iniciar Análise com Inteligência Artificial"
              className="text-sm uppercase tracking-widest font-bold text-white hover:text-primary transition-all duration-500 relative group whitespace-nowrap flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" aria-hidden="true" />
              Análise IA
              <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full group-hover:left-0 rounded-full" />
            </button>
          </nav>

          {/* Mobile Trigger */}
          <button 
            className="lg:hidden p-4 rounded-3xl flex items-center gap-3 bg-white/5 backdrop-blur-3xl text-white border border-white/10 active:scale-90 transition-all shadow-2xl shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Menu</span>
            <div className="relative h-5 w-5">
               <Menu className={cn("absolute inset-0 transition-all duration-500", isMobileMenuOpen ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0")} />
               <X className={cn("absolute inset-0 transition-all duration-500", isMobileMenuOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90")} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "lg:hidden fixed inset-0 z-[160] bg-[#0c0a1a] transition-all duration-1000 ease-in-out transform",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}>
          <div className="h-full flex flex-col p-10 pt-32 hero-purple-mesh overflow-y-auto">
             <div className="mb-20 animate-logo-reveal">
               <Image src={logoUrl} alt="Logo" width={300} height={80} className="object-contain" />
             </div>
            
            <div className="flex flex-col gap-10">
              {navLinks.map((link, i) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  target={link.external ? "_blank" : "_self"}
                  className="text-4xl font-black text-white tracking-tighter hover:text-primary transition-all duration-500 animate-slide-up uppercase"
                  style={{ animationDelay: `${i * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="text-4xl font-black text-primary tracking-tighter text-left hover:text-white transition-all duration-500 animate-slide-up [animation-delay:500ms] uppercase"
                onClick={handleOpenChat}
              >
                Análise IA
              </button>
            </div>

            <div className="mt-auto pt-20 border-t border-white/10 flex flex-col gap-4 opacity-40">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">studiosapient. v2.1</p>
              <p className="text-[8px] font-medium text-white/70 tracking-[0.2em]">Transformando negócios em autoridade.</p>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-10 h-16 w-16 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
