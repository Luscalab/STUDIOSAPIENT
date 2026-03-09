
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
      {/* Container Principal do Header - Absoluto para não acompanhar a rolagem */}
      <header className="absolute top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-8">
        <div className="container mx-auto flex items-start justify-between relative h-32 md:h-48">
          
          {/* Logo - Ampliado 40% e elevado para evitar sobreposição */}
          <div className="pointer-events-auto -mt-6 md:-mt-14">
            <Link href="/" className="relative block group transition-all duration-500 w-48 h-20 md:w-[480px] md:h-48">
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-2xl"
                priority
              />
            </Link>
          </div>

          {/* Navegação - Estilo Cápsula Refinado */}
          <div className={cn(
            "pointer-events-auto h-12 md:h-14 px-6 md:px-12 rounded-full flex items-center transition-all duration-700 border mt-2 md:mt-6",
            isScrolled 
              ? "glass-morphism border-primary/30 shadow-[0_12px_40px_rgba(139,92,246,0.25)]" 
              : "bg-white/10 backdrop-blur-3xl border-white/20 shadow-xl"
          )}>
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] uppercase tracking-[0.5em] font-black text-white hover:text-primary transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
              <Button 
                onClick={handleOpenChat}
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-10 h-10 shadow-lg shadow-primary/30 text-[10px] uppercase tracking-widest transition-all hover:scale-110 active:scale-95"
              >
                Consultoria
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <button 
              className="md:hidden text-white p-2 flex items-center gap-4 active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.4em]">Menu</span>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-32 left-4 right-4 glass-morphism rounded-[3rem] p-12 flex flex-col gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in-95 duration-500 border-primary/30 pointer-events-auto">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-3xl font-black border-b border-primary/10 pb-6 hover:text-primary transition-colors tracking-tighter text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="w-full h-20 bg-primary font-black text-sm uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30"
              onClick={handleOpenChat}
            >
              Falar com Especialista
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
