
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

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
      {/* Header estático (não acompanha o scroll) - Elevado em 20% reduzindo o pt */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-2 pb-6 md:pt-4 md:pb-8">
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo - Ampliado e Elevado */}
          <div className="flex-shrink-0 animate-logo-reveal">
            <Link href="/" className="relative block group w-80 h-24 md:w-[1500px] md:h-80">
              <Image 
                src={logoUrl}
                alt="Sapient Studio Logo"
                fill
                className="object-contain object-left drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Alinhado na mesma altura do logo */}
          <nav className="hidden md:flex items-center gap-10 h-14 px-10 rounded-full border bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[11px] uppercase tracking-[0.5em] font-black text-white hover:text-primary transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            
            <button 
              onClick={handleOpenChat}
              className="text-[11px] uppercase tracking-[0.5em] font-black text-white hover:text-primary transition-all relative group"
            >
              Análise Estratégica
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-3 rounded-2xl flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Menu</span>
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "md:hidden fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out transform",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}>
          <div className="h-full flex flex-col p-10 pt-32">
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl font-black text-foreground tracking-tighter flex items-center justify-center group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {link.name}
                  <ArrowRight className="ml-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </Link>
              ))}
              <button 
                className="text-4xl font-black text-foreground tracking-tighter text-center flex items-center justify-center group"
                onClick={handleOpenChat}
                style={{ transitionDelay: `${navLinks.length * 100}ms` }}
              >
                Análise Estratégica
                <ArrowRight className="ml-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </button>
            </div>
            
            <div className="mt-auto pt-10 border-t border-muted text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6">Contatos Diretos</p>
              <div className="space-y-4">
                <p className="font-bold text-lg">sapientcontato@gmail.com</p>
                <p className="font-bold text-lg">+55 11 95963-1870</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
