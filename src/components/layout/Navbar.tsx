
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
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        
        <Link 
          href="/" 
          className="relative block w-[100px] h-[30px] md:w-[220px] md:h-[60px] lg:w-[320px] lg:h-[96px] transition-transform duration-700 hover:scale-[1.02] shrink-0"
        >
          <Image 
            src={logoUrl} 
            alt="studiosapient Logo" 
            fill 
            className="object-contain object-left drop-shadow-2xl" 
            priority 
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 px-10 py-5 rounded-full glass-morphism border-white/5 shadow-2xl relative z-20">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[9px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-all relative group py-1"
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

        <button 
          className="lg:hidden p-2.5 rounded-xl bg-white/5 text-white border border-white/10 active:scale-95 transition-transform" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[160] bg-[#09080f] p-6 pt-24 hero-purple-mesh flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-500">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="block text-xl font-black text-white tracking-tighter uppercase border-b border-white/5 pb-3" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={handleOpenChat}
              className="block text-xl font-black text-primary tracking-tighter uppercase text-left w-full"
            >
              Consultoria
            </button>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="mt-auto h-14 w-full rounded-2xl bg-white/5 flex items-center justify-center text-white/30 font-black uppercase tracking-widest text-[8px] border border-white/10"
          >
            Fechar Menu
          </button>
        </div>
      )}
    </header>
  );
}
