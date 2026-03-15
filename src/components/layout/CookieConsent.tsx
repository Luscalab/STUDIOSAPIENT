'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('sapient-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sapient-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('sapient-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[300] w-[calc(100%-3rem)] max-w-sm animate-in slide-in-from-left-8 duration-700">
      <div className="bg-[#08070b]/90 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-2xl space-y-6 group">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 text-primary">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-headline font-black text-xs uppercase tracking-widest text-white">
              {t('cookie.title')}
            </h3>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white/20 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-[10px] md:text-xs font-medium leading-relaxed text-white/40 tracking-tight">
          {t('cookie.description')}{' '}
          <Link href="/privacidade" className="text-primary hover:underline font-bold">
            {t('cookie.policy')}
          </Link>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 h-12 bg-primary text-white rounded-2xl font-black uppercase text-[9px] tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            {t('cookie.accept')}
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 h-12 bg-white/5 border border-white/10 text-white/40 rounded-2xl font-black uppercase text-[9px] tracking-widest hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  );
}