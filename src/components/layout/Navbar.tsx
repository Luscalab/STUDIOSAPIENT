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
    { name: "Portfólio", href: "https://www.behance.net/sapient", external: true },
    { name: "Contato", href: "/#contato" },
  ];

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <>
      <header className="absolute top-10 left-0 right-0 z-[150]" role="banner">
        <div className="container mx-auto px-6 flex items-center justify-between gap-12">
          
          <Link href="/" className="relative block w-[200px] h-[50px] lg:w-[600px] lg:h-[160px] transition-transform duration-700 hover:scale-105 active:scale-95">
            <Image 
              src={logoUrl}
              alt="studiosapient Logo"
              fill
              className="object-contain object-left drop-shadow-2xl"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-12 px-12 py-6 rounded-full glass-morphism border-white/5">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                target={link.external ? "_blank" : "_self"}
                className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
            
            <div className="w-px h-4 bg-white/10 mx-2" />
            
            <button 
              onClick={handleOpenChat}
              className="text-[10px] uppercase tracking-[0.4em] font-black text-primary hover:text-white transition-all flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Análise IA
            </button>
          </nav>

          <button 
            className="lg:hidden p-5 rounded-2xl bg-white/5 backdrop-blur-3xl text-white border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={cn(
          "lg:hidden fixed inset-0 z-[160] bg-[#09080f] transition-all duration-1000 ease-in-out transform",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}>
          <div className="h-full flex flex-col p-12 pt-48 hero-purple-mesh">
            <div className="flex flex-col gap-10">
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
                className="text-2xl font-black text-primary tracking-tighter text-left uppercase"
                onClick={handleOpenChat}
              >
                Análise IA
              </button>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-10 h-14 w-14 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
