
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
      {/* Container Principal do Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-6">
        <div className="container mx-auto flex items-start justify-between relative h-24 md:h-32">
          
          {/* Logo - Ampliado 40% e elevado 10% */}
          <div className="pointer-events-auto -mt-2 md:-mt-6">
            <Link href="/" className="relative block group transition-all duration-500 w-40 h-16 md:w-80 md:h-32">
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
            "pointer-events-auto h-10 md:h-12 px-6 md:px-10 rounded-full flex items-center transition-all duration-700 border mt-2 md:mt-4",
            isScrolled 
              ? "glass-morphism border-primary/30 shadow-[0_8px_32px_rgba(139,92,246,0.2)]" 
              : "bg-white/10 backdrop-blur-2xl border-white/20"
          )}>
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-[10px] uppercase tracking-[0.45em] font-black text-white hover:text-primary transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
              <Button 
                onClick={handleOpenChat}
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-8 h-8 shadow-lg shadow-primary/30 text-[9px] uppercase tracking-widest transition-all hover:scale-110 active:scale-95"
              >
                Consultoria
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <button 
              className="md:hidden text-white p-2 flex items-center gap-3 active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Menu</span>
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-4 right-4 glass-morphism rounded-[2.5rem] p-10 flex flex-col gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-500 border-primary/30 pointer-events-auto">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-2xl font-black border-b border-primary/10 pb-4 hover:text-primary transition-colors tracking-tighter text-foreground"
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
      </header>
    </>
  );
}
