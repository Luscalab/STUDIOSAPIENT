"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 overflow-hidden mx-4 rounded-[2rem] md:rounded-[4rem] mt-4 mb-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1000px] mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="h-2.5 w-2.5 text-primary" />
            <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.5em] text-white/40">
              {t('hero.badge')}
            </p>
          </div>
          
          <h1 className="font-headline text-3xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] py-2 uppercase">
            {t('hero.title')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block mt-1 lowercase">
              {t('hero.title_italic')}
            </span>
          </h1>
          
          <p className="text-xs md:text-lg lg:text-xl text-white/40 font-medium max-w-2xl mx-auto leading-tight tracking-tight pt-4 pb-10">
            {t('hero.description')} <span className="text-white font-bold">{t('hero.partnership')}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Button 
              onClick={() => scrollToSection('servicos')}
              className="h-12 md:h-14 w-full sm:w-auto px-10 md:px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[8px] md:text-[9px] transition-all duration-500 shadow-2xl border-none"
            >
              {t('hero.cta_primary')}
            </Button>
            <button 
              onClick={() => scrollToSection('metodologia')}
              className="flex items-center gap-3 text-white/30 hover:text-white transition-all text-[7px] md:text-[8px] font-black uppercase tracking-[0.5em] group"
            >
              {t('hero.cta_secondary')} <ChevronDown className="h-3 w-3 animate-bounce group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
