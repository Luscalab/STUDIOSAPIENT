"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

  const navLinks = [
    { name: "Serviços", href: "#servicos" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-1000 px-4 md:px-8 lg:px-12",
      isScrolled ? "pt-4" : "pt-6 md:pt-10"
    )}>
      <div className={cn(
        "container mx-auto h-14 md:h-18 rounded-full flex items-center justify-between px-6 md:px-12 transition-all duration-1000 border",
        isScrolled 
          ? "glass-morphism border-primary/15 shadow-[0_20px_40px_-15px_rgba(139,92,246,0.1)]" 
          : "bg-white/40 backdrop-blur-md border-white/30"
      )}>
        <Link href="/" className="font-headline text-lg md:text-2xl font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-primary group-hover:scale-110 transition-transform duration-500 italic">S@</span>
          <span className="tracking-widest text-foreground uppercase">PIENT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/70 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <Link href="#contato">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-8 h-10 md:h-11 shadow-lg shadow-primary/20 text-[9px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
              Iniciar Projeto
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-foreground p-2 hover:bg-secondary rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-morphism rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in zoom-in-95 duration-500 border-primary/10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xl font-black border-b border-muted/30 pb-4 hover:text-primary transition-colors tracking-tighter"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="w-full bg-primary font-black py-7 text-sm uppercase tracking-widest rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            onClick={() => {
              setIsMobileMenuOpen(false);
              document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Falar com Especialista
          </Button>
        </div>
      )}
    </nav>
  );
}