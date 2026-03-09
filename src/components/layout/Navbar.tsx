
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Container do Logo - Ampliado 40% e elevado 10% */}
      <div className="absolute top-0 md:-top-4 left-0 right-0 z-50 pointer-events-none p-0 h-0 overflow-visible">
        <div className="container mx-auto relative">
          <div className="absolute left-0 top-0 pointer-events-auto -ml-4 md:-ml-20">
            <Link href="/" className="relative h-16 w-52 md:h-64 md:w-[48rem] block group transition-all duration-500">
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-2xl"
                priority
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Menu de Navegação - Posicionamento equilibrado e compacto */}
      <nav className="fixed top-8 md:top-6 left-0 right-0 z-50 pointer-events-none p-2">
        <div className="container mx-auto relative flex items-center justify-center">
          <div className={cn(
            "pointer-events-auto h-10 md:h-11 px-6 md:px-10 rounded-full flex items-center transition-all duration-700 border ml-auto md:ml-0 md:translate-x-[25%]",
            isScrolled 
              ? "glass-morphism border-primary/30 shadow-[0_8px_32px_rgba(139,92,246,0.15)]" 
              : "bg-white/5 backdrop-blur-2xl border-white/20"
          )}>
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-[9px] uppercase tracking-[0.45em] font-extrabold text-white/80 hover:text-white transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
              <Button 
                onClick={handleOpenChat}
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-8 h-7 shadow-lg shadow-primary/30 text-[8px] uppercase tracking-widest transition-all hover:scale-110 active:scale-95"
              >
                Consultoria
              </Button>
            </div>

            <button 
              className="md:hidden text-white p-2 flex items-center gap-3 active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Menu</span>
              {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 glass-morphism rounded-[2.5rem] p-10 flex flex-col gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-500 border-primary/30 pointer-events-auto">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-2xl font-black border-b border-primary/10 pb-4 hover:text-primary transition-colors tracking-tighter"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="w-full h-16 bg-primary font-black text-xs uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30"
              onClick={handleOpenChat}
            >
              Falar com Especialista
            </Button>
          </div>
        )}
      </nav>
    </>
  );
}
