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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 pt-8",
      isScrolled ? "pt-4" : "pt-8"
    )}>
      <div className={cn(
        "container mx-auto h-20 rounded-full flex items-center justify-between px-10 transition-all duration-700",
        isScrolled ? "bg-white/90 backdrop-blur-xl border border-primary/10 shadow-2xl scale-[0.98]" : "bg-transparent"
      )}>
        <Link href="/" className="font-headline text-3xl font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-primary group-hover:scale-110 transition-transform duration-500 italic">S@</span>
          <span className="tracking-widest text-foreground group-hover:tracking-[0.2em] transition-all duration-500">PIENT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-10 rounded-full h-12 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            Agendar Reunião
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-32 left-6 right-6 bg-white rounded-[3rem] border border-primary/10 p-12 flex flex-col gap-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-bold border-b border-muted pb-6 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full bg-primary font-bold py-8 text-xl rounded-full shadow-xl shadow-primary/20">
            Consultoria Grátis
          </Button>
        </div>
      )}
    </nav>
  );
}