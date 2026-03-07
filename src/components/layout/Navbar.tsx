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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-1000 px-6",
      isScrolled ? "pt-6" : "pt-10"
    )}>
      <div className={cn(
        "container mx-auto h-20 rounded-full flex items-center justify-between px-10 transition-all duration-1000 border border-transparent",
        isScrolled ? "glass-morphism border-primary/10 scale-[0.98]" : "bg-transparent"
      )}>
        <Link href="/" className="font-headline text-3xl font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-primary group-hover:scale-110 transition-transform duration-700 italic">S@</span>
          <span className="tracking-widest text-foreground group-hover:tracking-[0.2em] transition-all duration-700">PIENT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/60 hover:text-primary transition-all duration-500 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <Button className="bg-primary hover:bg-primary/90 text-white font-black px-10 rounded-full h-12 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-[10px] uppercase tracking-widest">
            Falar com Especialista
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-32 left-6 right-6 glass-morphism rounded-[3rem] p-12 flex flex-col gap-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-bold border-b border-muted pb-6 hover:text-primary transition-colors tracking-tighter"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full bg-primary font-black py-8 text-xl rounded-full shadow-2xl shadow-primary/25">
            Iniciar Projeto
          </Button>
        </div>
      )}
    </nav>
  );
}