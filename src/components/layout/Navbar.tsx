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
      <header className="absolute top-6 left-0 right-0 z-[150]" role="banner">
        <div className="container mx-auto px-6 flex items-center justify-between gap-8">
          
          <Link href="/" className="relative block w-[200px] h-[50px] lg:w-[330px] lg:h-[90px] transition-all hover:scale-105 active:scale-95">
            <Image 
              src={logoUrl}
              alt="studiosapient Logo"
              fill
              className="object-contain object-left drop-shadow-lg"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10 px-10 py-5 rounded-full glass-morphism border-white/10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                target={link.external ? "_blank" : "_self"}
                className="text-[11px] uppercase tracking-[0.3em] font-black text-white/70 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
            
            <div className="w-px h-4 bg-white/20 mx-2" />
            
            <button 
              onClick={handleOpenChat}
              className="text-[11px] uppercase tracking-[0.3em] font-black text-white hover:text-primary transition-all flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Análise IA
            </button>
          </nav>

          <button 
            className="lg:hidden p-4 rounded-2xl bg-white/10 backdrop-blur-3xl text-white border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "lg:hidden fixed inset-0 z-[160] bg-[#09080f] transition-all duration-700 ease-in-out transform",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <div className="h-full flex flex-col p-10 pt-32 hero-purple-mesh">
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl font-black text-white tracking-tighter uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="text-4xl font-black text-primary tracking-tighter text-left uppercase"
                onClick={handleOpenChat}
              >
                Análise IA
              </button>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
