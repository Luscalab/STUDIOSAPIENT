
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
    <header className="absolute top-4 md:top-8 left-0 right-0 z-[150]" role="banner">
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        
        <Link 
          href="/" 
          className="relative block w-[160px] h-[48px] md:w-[240px] md:h-[64px] lg:w-[320px] lg:h-[96px] transition-all duration-700 hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <Image 
            src={logoUrl} 
            alt="studiosapient Logo" 
            fill 
            className="object-contain object-left drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
            priority 
          />
        </Link>

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
          className="lg:hidden p-4 rounded-2xl bg-white/5 text-white border border-white/10 active:scale-90 transition-all backdrop-blur-md shadow-xl" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[160] bg-[#09080f]/98 backdrop-blur-[40px] p-8 pt-32 flex flex-col gap-10 animate-in fade-in slide-in-from-right-full duration-700 ease-out">
          <div className="space-y-8">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "block text-3xl font-black text-white tracking-tighter uppercase border-b border-white/5 pb-6 active:text-primary transition-colors animate-in slide-in-from-right-8 duration-500",
                  `delay-[${idx * 100}ms]`
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={handleOpenChat}
              className="block text-3xl font-black text-primary tracking-tighter uppercase text-left w-full active:scale-95 transition-transform animate-in slide-in-from-right-8 duration-500 delay-500"
            >
              Consultoria
            </button>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="mt-auto h-16 w-full rounded-[2rem] bg-white/5 flex items-center justify-center text-white/30 font-black uppercase tracking-[0.5em] text-[9px] border border-white/10 active:bg-primary active:text-white transition-all"
          >
            Fechar Menu
          </button>
        </div>
      )}
    </header>
  );
}
