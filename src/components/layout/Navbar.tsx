"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenChat = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  const navLinks = [
    { name: "Serviços", href: "/#servicos" },
    { name: "UrbeLudo", href: "/urbeludo" },
    { name: "Metodologia", href: "/#metodologia" },
    { name: "Contato", href: "/#contato" },
  ];

  const logoData = PlaceHolderImages.find(img => img.id === "main-logo");
  
  return (
    <header className="absolute top-4 md:top-8 left-0 right-0 z-[150]" role="banner">
      <div className="container mx-auto px-6 flex items-center justify-between gap-8 md:gap-12">
        
        <Link 
          href="/" 
          className="relative block w-[240px] h-[90px] md:w-[450px] md:h-[160px] transition-all duration-1000 hover:scale-[1.01] shrink-0"
        >
          <Image 
            src={logoData?.imageUrl || ""} 
            alt={logoData?.description || "studiosapient Logo"} 
            fill 
            className="object-contain object-left drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]" 
            priority 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 px-10 py-5 rounded-full glass-morphism border-white/5 shadow-2xl relative z-20">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-white transition-all relative group py-1"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          
          <button 
            onClick={handleOpenChat} 
            className="text-[9px] uppercase tracking-[0.4em] font-black text-primary hover:text-white transition-all relative group py-1"
          >
            Consultoria
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
          </button>
        </nav>

        {/* Mobile Menu Trigger */}
        <button 
          className="lg:hidden h-10 w-10 rounded-xl bg-white/5 text-white border border-white/10 active:scale-90 transition-all backdrop-blur-md flex items-center justify-center" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[160] bg-[#09080f]/98 backdrop-blur-[40px] p-8 pt-48 flex flex-col gap-10">
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="block text-2xl font-black text-white tracking-tighter uppercase border-b border-white/5 pb-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={handleOpenChat}
              className="block text-2xl font-black text-primary tracking-tighter uppercase text-left w-full"
            >
              Consultoria
            </button>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="mt-auto h-14 w-full rounded-2xl bg-white/5 flex items-center justify-center text-white/30 font-black uppercase tracking-[0.5em] text-[10px] border border-white/10"
          >
            Fechar Menu
          </button>
        </div>
      )}
    </header>
  );
}
