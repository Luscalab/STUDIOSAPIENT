
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
    { name: "Serviços", href: "#servicos" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" },
  ];

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-2 md:p-3">
      <div className="container mx-auto relative flex items-center justify-center min-h-[4rem] md:min-h-[8rem]">
        
        {/* Logo - Canto superior esquerdo */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto -ml-2 md:-ml-8">
          <Link href="/" className="relative h-20 w-44 md:h-50 md:w-[48rem] block group">
            <Image 
              src={logoUrl}
              alt="Sapient Studio Logo"
              fill
              className="object-contain object-left drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              priority
            />
          </Link>
        </div>

        {/* Menu de Navegação - Cápsula flutuante */}
        <div className={cn(
          "pointer-events-auto h-12 md:h-16 px-4 md:px-12 rounded-full flex items-center transition-all duration-700 border ml-auto md:ml-0 md:translate-x-[25%]",
          isScrolled 
            ? "glass-morphism border-primary/20 shadow-lg translate-y-0" 
            : "bg-white/5 backdrop-blur-xl border-white/10 translate-y-1"
        )}>
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.4em] font-black text-white/70 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            <Button 
              onClick={handleOpenChat}
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-10 h-8 shadow-lg shadow-primary/20 text-[9px] uppercase tracking-widest transition-all hover:scale-105"
            >
              Iniciar Projeto
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden text-white p-2 flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Menu</span>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-morphism rounded-[2rem] p-8 flex flex-col gap-5 shadow-2xl animate-in fade-in zoom-in-95 duration-500 border-primary/20 pointer-events-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg font-black border-b border-primary/5 pb-3 hover:text-primary transition-colors tracking-tighter"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="w-full bg-primary font-black py-5 text-xs uppercase tracking-widest rounded-full shadow-xl shadow-primary/20"
            onClick={handleOpenChat}
          >
            Falar com Especialista
          </Button>
        </div>
      )}
    </nav>
  );
}
