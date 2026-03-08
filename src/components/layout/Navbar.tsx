
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
      <div className="container mx-auto relative flex items-center justify-center min-h-[5rem] md:min-h-[8rem]">
        
        {/* Logo - Independente no canto superior esquerdo (Reduzido em 10% conforme solicitado) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto -ml-4 md:-ml-8">
          <Link href="/" className="relative h-25 w-58 md:h-50 md:w-[48rem] block group">
            <Image 
              src={logoUrl}
              alt="Sapient Studio Logo"
              fill
              className="object-contain object-left drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              priority
            />
          </Link>
        </div>

        {/* Menu de Navegação - Cápsula Deslocada 25% para a Direita */}
        <div className={cn(
          "pointer-events-auto h-14 md:h-16 px-8 md:px-12 rounded-full flex items-center transition-all duration-700 border md:translate-x-[25%]",
          isScrolled 
            ? "glass-morphism border-primary/20 shadow-[0_20px_40px_-15px_rgba(139,92,246,0.12)] translate-y-0" 
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
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-4 right-4 glass-morphism rounded-[2.5rem] p-10 flex flex-col gap-6 shadow-2xl animate-in fade-in zoom-in-95 duration-500 border-primary/20 pointer-events-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xl font-black border-b border-primary/10 pb-4 hover:text-primary transition-colors tracking-tighter"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="w-full bg-primary font-black py-6 text-sm uppercase tracking-widest rounded-full shadow-xl shadow-primary/20"
            onClick={handleOpenChat}
          >
            Falar com Especialista
          </Button>
        </div>
      )}
    </nav>
  );
}
