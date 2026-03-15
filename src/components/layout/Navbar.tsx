"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, Languages, ChevronDown, Check } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languagesList = [
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (PT)', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  const handleOpenChat = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  const navLinks = [
    { name: t('nav.services'), href: "/#servicos" },
    { name: t('nav.urbeludo'), href: "/urbeludo" },
    { name: t('nav.methodology'), href: "/#metodologia" },
    { name: t('nav.contact'), href: "/#contato" },
  ];

  const logoData = PlaceHolderImages.find(img => img.id === "main-logo");
  
  const LanguageSelector = ({ className }: { className?: string }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white outline-none",
        className
      )}>
        <Languages size={14} className="text-primary" />
        <span className="hidden sm:inline">{currentLangObj.code.split('-')[0]}</span>
        <ChevronDown size={10} className="opacity-40" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#08070b] border-white/10 text-white rounded-2xl p-2 min-w-[160px] backdrop-blur-xl">
        {languagesList.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary/20 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{lang.flag}</span>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-tight",
                language === lang.code ? "text-primary" : "text-white/60 group-hover:text-white"
              )}>
                {lang.name}
              </span>
            </div>
            {language === lang.code && <Check size={12} className="text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="absolute top-4 md:top-8 left-0 right-0 z-[150]" role="banner">
      <div className="container mx-auto px-6 flex items-center justify-between gap-4 md:gap-12">
        
        <Link 
          href="/" 
          className="relative block w-[200px] h-[75px] sm:w-[240px] sm:h-[90px] md:w-[450px] md:h-[160px] transition-all duration-1000 hover:scale-[1.01] shrink-0 max-w-[60vw]"
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
        <nav className="hidden lg:flex items-center gap-6 px-8 py-4 rounded-full glass-morphism border-white/5 shadow-2xl relative z-20">
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
            {t('nav.consultancy')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-2" />
          
          <LanguageSelector />
        </nav>

        {/* Mobile Menu Trigger & Language Selector */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSelector className="h-10 w-10 md:h-12 md:w-12 p-0 justify-center" />
          <button 
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white/5 text-white border border-white/10 active:scale-90 transition-all backdrop-blur-md flex items-center justify-center shrink-0" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
              {t('nav.consultancy')}
            </button>
          </div>
          
          <div className="mt-auto space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em] mb-4">Idioma / Language</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentLangObj.flag}</span>
                <span className="text-xl font-black text-white uppercase tracking-tighter">{currentLangObj.name}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="h-14 w-full rounded-2xl bg-white/5 flex items-center justify-center text-white/30 font-black uppercase tracking-[0.5em] text-[10px] border border-white/10"
            >
              Fechar Menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
