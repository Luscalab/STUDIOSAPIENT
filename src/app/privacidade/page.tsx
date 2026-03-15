'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Eye } from "lucide-react";

export default function PrivacidadePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">
              Segurança da Informação
            </Badge>
            <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
              {t('legal.privacy_title')}
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium leading-relaxed">
              {t('legal.privacy_intro')}
            </p>
          </div>

          <div className="space-y-12 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-primary">
                <Eye size={24} />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('legal.privacy_section1_title')}</h2>
              </div>
              <p className="text-white/60 leading-relaxed font-medium">{t('legal.privacy_section1_content')}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-primary">
                <Lock size={24} />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('legal.privacy_section2_title')}</h2>
              </div>
              <p className="text-white/60 leading-relaxed font-medium">{t('legal.privacy_section2_content')}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-primary">
                <ShieldCheck size={24} />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('legal.privacy_section3_title')}</h2>
              </div>
              <p className="text-white/60 leading-relaxed font-medium">{t('legal.privacy_section3_content')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
