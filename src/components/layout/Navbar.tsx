
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
      setIsScrolled(window.scrollY > 20);
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
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-1000 px-4 md:px-12",
      isScrolled ? "pt-4" : "pt-8"
    )}>
      <div className={cn(
        "container mx-auto h-16 md:h-20 rounded-full flex items-center justify-between px-8 md:px-16 transition-all duration-1000 border",
        isScrolled 
          ? "glass-morphism border-primary/20 shadow-[0_25px_50px_-15px_rgba(139,92,246,0.15)]" 
          : "bg-white/40 backdrop-blur-xl border-white/40"
      )}>
        <Link href="/" className="relative h-8 w-24 md:h-12 md:w-32 group">
          <Image 
            src={logoUrl}
            alt="Sapient Studio Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-16">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[11px] uppercase tracking-[0.5em] font-black text-muted-foreground hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <Button 
            onClick={handleOpenChat}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-12 h-12 md:h-14 shadow-xl shadow-primary/30 text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            Iniciar Projeto
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-foreground p-3 hover:bg-primary/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-4 right-4 glass-morphism rounded-[3rem] p-10 flex flex-col gap-8 shadow-2xl animate-in fade-in zoom-in-95 duration-700 border-primary/20">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black border-b border-primary/10 pb-6 hover:text-primary transition-colors tracking-tighter"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="w-full bg-primary font-black py-8 text-base uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
            onClick={handleOpenChat}
          >
            Falar com Especialista
          </Button>
        </div>
      )}
    </nav>
  );
}
