'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, Gavel } from "lucide-react";

export default function TermosPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">
              Protocolos de Uso
            </Badge>
            <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
              {t('legal.terms_title')}
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium leading-relaxed">
              {t('legal.terms_intro')}
            </p>
          </div>

          <div className="space-y-12 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-primary">
                <FileText size={24} />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('legal.terms_section1_title')}</h2>
              </div>
              <p className="text-white/60 leading-relaxed font-medium">{t('legal.terms_section1_content')}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-primary">
                <Scale size={24} />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('legal.terms_section2_title')}</h2>
              </div>
              <p className="text-white/60 leading-relaxed font-medium">{t('legal.terms_section2_content')}</p>
            </div>

            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Jurisdição</p>
              <p className="text-xs text-white/60 font-medium">Estes termos são regidos e interpretados de acordo com as leis do Brasil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
