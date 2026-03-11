
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

  // URL Oficial do Logotipo Sapient Studio
  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MzI1ODkzNSwiZXhwIjoyMDg4NjE4OTM1fQ.IzwEMRrb4fKfxxJqcobcRaK14UuTZxUJCtCbG141MJo";
  
  // Rede de Clientes de Elite (Parceiros)
  const partners = [
    { name: "ChargerBed", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/chargerbed.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvY2hhcmdlcmJlZC5wbmciLCJpYXQiOjE3NzMyNTk2OTEsImV4cCI6MTc3NDEyMzY5MX0.Vjw_0CI-92YGGgxQil9racQzBQSMVoinTbZ8P_ZYymQ" },
    { name: "Finallogo", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/FINALLOGO.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvRklOQUxMT0dPLnBuZyIsImlhdCI6MTc3MzI1ODk2MSwiZXhwIjoyMDg4NjE4OTYxfQ.YCn2mnUAXxdeCIDDY43MZpB1jEf94V0pcajlqRuXkA8" },
    { name: "Unnamed Client", url: "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/unnamed%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdW5uYW1lZCAoMSkuanBnIiwiaWF0IjoxNzczMjU5MzAyLCJleHAiOjE4MDQ3OTUzMDJ9.Ey6aHahoSnfrOlVxBsHpOnYXUGfDDEZFj_rLrwbbOro" }
  ];

  // Efeito de transição suave entre parceiros (4 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [partners.length]);

  return (
    <header className="absolute top-4 md:top-8 left-0 right-0 z-[150]" role="banner">
      <div className="container mx-auto px-6 flex items-center justify-between gap-4 md:gap-12">
        
        <div className="flex items-center gap-6 md:gap-12 flex-1">
          {/* Logo Principal Sapient - Escala Imponente */}
          <Link 
            href="/" 
            className="relative block w-[180px] h-[60px] md:w-[500px] md:h-[150px] transition-all duration-700 hover:scale-[1.02] shrink-0"
          >
            <Image 
              src={logoUrl} 
              alt="studiosapient Logo" 
              fill 
              className="object-contain object-left drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
              priority 
            />
          </Link>

          {/* Marquee de Parceiros em Formato Quadrado Minimalista */}
          <div className="hidden sm:flex items-center gap-6 pl-6 md:pl-12 border-l border-white/10">
            <div className="relative h-14 w-14 md:h-28 md:w-28 rounded-2xl md:rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden glass-morphism group shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center p-3 md:p-5 transition-all duration-1000">
                <Image 
                  src={partners[currentPartner].url} 
                  alt={partners[currentPartner].name}
                  fill
                  className="object-contain p-2 md:p-4 opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 56px, 112px"
                  key={partners[currentPartner].url}
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/20 whitespace-nowrap mb-1">
                Trusted By
              </p>
              <p className="text-[9px] md:text-[11px] font-bold text-primary uppercase tracking-widest animate-pulse">
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
