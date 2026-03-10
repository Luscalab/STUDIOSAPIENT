"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <header className="absolute top-6 left-0 right-0 z-[150]" role="banner">
      <div className="container mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo com deslocamento de 40% à direita no Desktop e escala refinada */}
        <Link 
          href="/" 
          className="relative block w-[160px] h-[48px] md:w-[220px] md:h-[66px] lg:w-[320px] lg:h-[96px] lg:translate-x-[40%] transition-transform duration-700 hover:scale-105 shrink-0"
        >
          <Image 
            src={logoUrl} 
            alt="studiosapient Logo" 
            fill 
            className="object-contain object-left drop-shadow-xl" 
            priority 
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 px-8 py-3 rounded-full glass-morphism border-white/5 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-[9px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-all relative group">
              {link.name}
              <span className="absolute -bottom-1 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          
          <button 
            onClick={handleOpenChat} 
            className="text-[9px] uppercase tracking-[0.4em] font-black text-primary hover:text-white transition-all"
          >
            Análise IA
          </button>
        </nav>

        <button 
          className="lg:hidden p-3 rounded-xl bg-white/5 text-white border border-white/10" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[160] bg-[#09080f] p-12 pt-40 hero-purple-mesh flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black text-white tracking-tighter uppercase" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="absolute top-10 right-10 h-14 w-14 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </header>
  );
}
