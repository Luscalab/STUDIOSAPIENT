
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(0);

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

  // URLs oficiais do Supabase
  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MzI1ODkzNSwiZXhwIjoyMDg4NjE4OTM1fQ.IzwEMRrb4fKfxxJqcobcRaK14UuTZxUJCtCbG141MJo";
  
  const partners = [
    { name: "Parceiro 1", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/FINALLOGO.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvRklOQUxMT0dPLnBuZyIsImlhdCI6MTc3MzI1ODk2MSwiZXhwIjoyMDg4NjE4OTYxfQ.YCn2mnUAXxdeCIDDY43MZpB1jEf94V0pcajlqRuXkA8" },
    { name: "Parceiro 2", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/unnamed%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdW5uYW1lZCAoMSkuanBnIiwiaWF0IjoxNzczMjU5MzAyLCJleHAiOjE4MDQ3OTUzMDJ9.Ey6aHahoSnfrOlVxBsHpOnYXUGfDDEZFj_rLrwbbOro" }
  ];

  // Efeito de transição suave entre parceiros
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [partners.length]);

  return (
    <header className="absolute top-4 md:top-8 left-0 right-0 z-[150]" role="banner">
      <div className="container mx-auto px-6 flex items-center justify-between gap-4 md:gap-8">
        
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <Link 
            href="/" 
            className="relative block w-[160px] h-[50px] md:w-[450px] md:h-[130px] transition-all duration-700 hover:scale-[1.02] shrink-0"
          >
            <Image 
              src={logoUrl} 
              alt="studiosapient Logo" 
              fill 
              className="object-contain object-left drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
              priority 
            />
          </Link>

          {/* Marquee de Parceiros Quadrado e Minimalista */}
          <div className="hidden sm:flex items-center gap-4 pl-4 md:pl-8 border-l border-white/10">
            <div className="relative h-10 w-10 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 overflow-hidden glass-morphism group">
              <div className="absolute inset-0 flex items-center justify-center p-2 transition-all duration-1000">
                <Image 
                  src={partners[currentPartner].url} 
                  alt={partners[currentPartner].name}
                  fill
                  className="object-contain p-1.5 md:p-2.5 opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  sizes="64px"
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <p className="text-[6px] md:text-[8px] font-black uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">
                Trusted By
              </p>
              <p className="text-[7px] md:text-[9px] font-bold text-primary uppercase tracking-widest animate-pulse">
                Elite Network
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 px-12 py-6 rounded-full glass-morphism border-white/5 shadow-2xl relative z-20">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40 hover:text-white transition-all relative group py-1"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          
          <button 
            onClick={handleOpenChat} 
            className="text-[10px] uppercase tracking-[0.5em] font-black text-primary hover:text-white transition-all relative group py-1"
          >
            Consultoria
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
          </button>
        </nav>

        {/* Mobile Menu Trigger */}
        <button 
          className="lg:hidden h-12 w-12 rounded-xl bg-white/5 text-white border border-white/10 active:scale-90 transition-all backdrop-blur-md flex items-center justify-center" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                className="block text-3xl font-black text-white tracking-tighter uppercase border-b border-white/5 pb-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={handleOpenChat}
              className="block text-3xl font-black text-primary tracking-tighter uppercase text-left w-full"
            >
              Consultoria
            </button>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="mt-auto h-16 w-full rounded-2xl bg-white/5 flex items-center justify-center text-white/30 font-black uppercase tracking-[0.5em] text-[10px] border border-white/10"
          >
            Fechar Menu
          </button>
        </div>
      )}
    </header>
  );
}
