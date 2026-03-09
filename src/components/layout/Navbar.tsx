
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
    { name: "Portfólio", href: "/#portfolio" },
    { name: "Contato", href: "/#contato" },
  ];

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 p-4 md:pt-4 md:pb-12 md:px-10 w-full max-w-full overflow-hidden">
        <div className="container mx-auto flex items-start justify-between relative h-32 md:h-44 max-w-full px-4">
          
          <div className="animate-logo-reveal flex-shrink-0 md:-translate-y-12">
            <Link href="/" className="relative block group transition-all duration-500 w-36 h-14 md:w-[280px] md:h-40 origin-top-left">
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-transform duration-700 group-hover:scale-[1.01]"
                priority
              />
            </Link>
          </div>

          <div className={cn(
            "h-12 md:h-14 px-6 md:px-10 rounded-full flex items-center transition-all duration-700 border mt-2 md:mt-4 md:-translate-x-[30px] flex-shrink-0",
            "bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl"
          )}>
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] uppercase tracking-[0.5em] font-black text-white hover:text-primary transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                </Link>
              ))}
              <Button 
                onClick={handleOpenChat}
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:scale-105 active:scale-95 text-white font-black rounded-full px-8 h-9 shadow-[0_10px_30px_rgba(139,92,246,0.4)] text-[9px] uppercase tracking-[0.2em] transition-all duration-500 border border-white/20"
              >
                Análise Estratégica <span className="ml-2 opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>

            <button 
              className="md:hidden text-white p-2 flex items-center gap-4 active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.4em]">Menu</span>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-24 left-4 right-4 z-[60] glass-morphism rounded-[3rem] p-12 flex flex-col gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in-95 duration-500 border-primary/30">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-3xl font-black border-b border-primary/10 pb-6 hover:text-primary transition-colors tracking-tighter text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="w-full h-20 bg-primary font-black text-sm uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30"
              onClick={handleOpenChat}
            >
              Consultoria Estratégica
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
