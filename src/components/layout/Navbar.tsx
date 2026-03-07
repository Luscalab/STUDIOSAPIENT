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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 pt-6",
      isScrolled ? "pt-2" : "pt-6"
    )}>
      <div className={cn(
        "container mx-auto h-20 rounded-[2rem] flex items-center justify-between px-10 transition-all duration-500",
        isScrolled ? "bg-white/80 backdrop-blur-md border border-primary/10 shadow-lg" : "bg-transparent"
      )}>
        <Link href="/" className="font-headline text-3xl font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-primary group-hover:scale-110 transition-transform duration-300 italic">S@</span>
          <span className="tracking-widest text-foreground">PIENT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button size="lg" className="bg-primary hover:bg-primary/90 font-bold px-8 rounded-full">
            Consultoria Grátis
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
        <div className="md:hidden absolute top-32 left-6 right-6 bg-white rounded-3xl border border-primary/10 p-10 flex flex-col gap-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xl font-bold border-b border-muted pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button size="lg" className="w-full bg-primary font-bold py-8 text-lg rounded-full">
            Consultoria Grátis
          </Button>
        </div>
      )}
    </nav>
  );
}