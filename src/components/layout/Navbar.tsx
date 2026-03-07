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
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 md:px-6",
      isScrolled ? "pt-2" : "pt-4 md:pt-6"
    )}>
      <div className={cn(
        "container mx-auto h-16 md:h-18 rounded-full flex items-center justify-between px-6 md:px-8 transition-all duration-700 border border-transparent",
        isScrolled ? "glass-morphism border-primary/5 shadow-sm" : "bg-transparent"
      )}>
        <Link href="/" className="font-headline text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-primary group-hover:scale-105 transition-transform italic">S@</span>
          <span className="tracking-widest text-foreground">PIENT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground/80 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 shadow-lg shadow-primary/10 text-[9px] uppercase tracking-wider">
            Falar com Especialista
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-morphism rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xl font-bold border-b border-muted/50 pb-4 hover:text-primary transition-colors tracking-tight"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full bg-primary font-bold py-6 text-lg rounded-full shadow-lg shadow-primary/20">
            Iniciar Projeto
          </Button>
        </div>
      )}
    </nav>
  );
}