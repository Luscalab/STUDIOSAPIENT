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
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 md:px-12 pt-0",
      isScrolled ? "translate-y-1" : "translate-y-2"
    )}>
      <div className={cn(
        "container mx-auto h-12 md:h-14 rounded-full flex items-center justify-between px-6 md:px-12 transition-all duration-700 border",
        isScrolled 
          ? "glass-morphism border-primary/20 shadow-[0_20px_40px_-15px_rgba(139,92,246,0.12)]" 
          : "bg-white/10 backdrop-blur-md border-white/10"
      )}>
        <Link href="/" className="relative h-6 w-16 md:h-7 md:w-24 group">
          <Image 
            src={logoUrl}
            alt="Sapient Studio Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[9px] uppercase tracking-[0.4em] font-black text-white/70 hover:text-white transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <Button 
            onClick={handleOpenChat}
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-6 h-8 md:h-9 shadow-lg shadow-primary/20 text-[8px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            Iniciar Projeto
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-4 right-4 glass-morphism rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in zoom-in-95 duration-500 border-primary/20">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg font-black border-b border-primary/10 pb-4 hover:text-primary transition-colors tracking-tighter"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="w-full bg-primary font-black py-5 text-xs uppercase tracking-widest rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            onClick={handleOpenChat}
          >
            Falar com Especialista
          </Button>
        </div>
      )}
    </nav>
  );
}