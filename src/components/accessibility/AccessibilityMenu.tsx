'use client';

import { useState, useEffect, useRef } from "react";
import { 
  Accessibility, 
  X, 
  Contrast, 
  Minus, 
  Plus, 
  RotateCcw,
  Link as LinkIcon,
  SunMoon,
  Volume2,
  VolumeX,
  ZapOff,
  Mic
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function AccessibilityMenu() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isVoiceGuideActive, setIsVoiceGuideActive] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const lastInteractedElementRef = useRef<HTMLElement | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.fontSize = `${(fontSize / 100) * 16}px`;
  }, [fontSize, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (highContrast) document.body.classList.add('accessibility-high-contrast');
    else document.body.classList.remove('accessibility-high-contrast');
  }, [highContrast, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (grayscale) document.documentElement.classList.add('accessibility-grayscale');
    else document.documentElement.classList.remove('accessibility-grayscale');
  }, [grayscale, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (highlightLinks) document.body.classList.add('accessibility-highlight-links');
    else document.body.classList.remove('accessibility-highlight-links');
  }, [highlightLinks, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (stopAnimations) document.body.classList.add('accessibility-stop-animations');
    else document.body.classList.remove('accessibility-stop-animations');
  }, [stopAnimations, mounted]);

  useEffect(() => {
    if (!isReading || !synthRef.current || !mounted) return;

    const selector = 'h1, h2, h3, h4, h5, h6, p, a, button, li, [role="button"], [role="link"], img[alt]';

    const speak = (element: HTMLElement) => {
      if (!synthRef.current) return;
      
      const tagName = element.tagName.toLowerCase();
      const role = element.getAttribute('role');
      const isClickable = ['a', 'button'].includes(tagName) || ['button', 'link'].includes(role || "");
      
      const ariaLabel = element.getAttribute('aria-label');
      const alt = element.getAttribute('alt');
      const title = element.getAttribute('title');
      const innerText = element.innerText;
      
      let text = ariaLabel || alt || title || innerText || "";
      let finalSpeech = text.trim();
      
      if (isClickable) {
        if (!finalSpeech) {
          finalSpeech = tagName === 'a' || role === 'link' ? "Link" : "Botão";
        }
        finalSpeech += ". Item clicável. Clique duas vezes para ativar.";
      }

      if (finalSpeech.length > 0) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(finalSpeech);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.1;
        synthRef.current.speak(utterance);
      }

      const originalOutline = element.style.outline;
      const originalOffset = element.style.outlineOffset;
      element.style.outline = '4px solid hsl(var(--primary))';
      element.style.outlineOffset = '4px';
      
      setTimeout(() => {
        element.style.outline = originalOutline;
        element.style.outlineOffset = originalOffset;
      }, 1500);
    };

    const handleGlobalInteraction = (e: MouseEvent | TouchEvent) => {
      if ((e.target as HTMLElement).closest('.accessibility-menu-container')) return;

      const target = (e.target as HTMLElement).closest(selector) as HTMLElement;
      if (!target) return;

      const now = Date.now();
      const isSameElement = target === lastInteractedElementRef.current;
      const timeDiff = now - lastClickTimeRef.current;

      if (isSameElement && timeDiff < 600) {
        lastInteractedElementRef.current = null;
        lastClickTimeRef.current = 0;
        return; 
      } else {
        e.preventDefault();
        e.stopPropagation();
        lastInteractedElementRef.current = target;
        lastClickTimeRef.current = now;
        speak(target);
      }
    };

    document.addEventListener('click', handleGlobalInteraction as any, true);
    if (isMobile) {
      document.addEventListener('touchstart', handleGlobalInteraction as any, { passive: false, capture: true } as any);
    }

    return () => {
      document.removeEventListener('click', handleGlobalInteraction as any, true);
      if (isMobile) {
        document.removeEventListener('touchstart', handleGlobalInteraction as any, true);
      }
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [isReading, isMobile, mounted]);

  const toggleReadingMode = () => {
    if (isReading) {
      if (synthRef.current) synthRef.current.cancel();
      setIsReading(false);
    } else {
      setIsReading(true);
      if (synthRef.current) {
        const instruction = isMobile 
          ? "Audiodescrição ativada. Toque uma vez para ouvir e duas para ativar." 
          : "Audiodescrição ativada. Clique uma vez para ouvir e duas para selecionar.";
        
        const welcome = new SpeechSynthesisUtterance(instruction);
        welcome.lang = 'pt-BR';
        welcome.rate = 1;
        synthRef.current.cancel();
        synthRef.current.speak(welcome);
      }
    }
  };

  const toggleVoiceGuide = () => {
    setIsVoiceGuideActive(!isVoiceGuideActive);
    window.dispatchEvent(new CustomEvent('toggle-voice-discussion'));
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    setIsReading(false);
    setIsVoiceGuideActive(false);
    setStopAnimations(false);
    if (synthRef.current) synthRef.current.cancel();
  };

  if (!mounted) return null;

  return (
    <div className="accessibility-menu-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu de Acessibilidade"
        className={cn(
          "fixed bottom-24 right-4 md:bottom-24 md:right-6 z-[200] h-10 w-10 md:h-16 md:w-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-3xl shadow-2xl",
          isOpen ? "bg-[#08070b] text-white" : "bg-primary text-white"
        )}
      >
        {isOpen ? <X className="h-4 w-4 md:h-6 md:w-6" /> : <Accessibility className="h-4 w-4 md:h-6 md:w-6" />}
      </button>

      <div
        className={cn(
          "fixed bottom-40 md:bottom-44 right-4 md:right-6 z-[200] w-[240px] md:w-[320px] bg-white rounded-[2rem] md:rounded-[3rem] border border-primary/20 shadow-[0_40px_120px_rgba(0,0,0,0.3)] transition-all duration-700 origin-bottom-right p-5 md:p-7 space-y-4 md:space-y-7",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center gap-3 pb-3 md:pb-4 border-b border-slate-100">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Accessibility className="h-6 w-6 md:h-7 md:w-7" />
          </div>
          <div>
            <h3 className="font-headline font-black text-xs md:text-sm tracking-tight uppercase text-slate-900">Inclusão Digital</h3>
            <p className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-widest">UI SCALE</p>
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          <div className="space-y-2 md:space-y-3">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">Tamanho do Texto <span>{fontSize}%</span></p>
            <div className="flex items-center justify-between bg-slate-50 rounded-xl md:rounded-2xl p-1.5 md:p-2 border border-slate-100">
              <button onClick={() => setFontSize(prev => Math.max(prev - 10, 80))} className="h-8 w-8 md:h-10 md:w-10 rounded-lg hover:bg-white flex items-center justify-center transition-all text-slate-600"><Minus className="h-4 w-4 md:h-5 md:w-5" /></button>
              <div className="h-1 w-16 md:w-24 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${(fontSize - 80) / 70 * 100}%` }} />
              </div>
              <button onClick={() => setFontSize(prev => Math.min(prev + 10, 150))} className="h-8 w-8 md:h-10 md:w-10 rounded-lg hover:bg-white flex items-center justify-center transition-all text-slate-600"><Plus className="h-4 w-4 md:h-5 md:w-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <button onClick={() => setHighContrast(!highContrast)} className={cn("flex flex-col items-center gap-2 p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all text-[8px] md:text-[10px] font-black uppercase text-center shadow-sm", highContrast ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 shadow-inner")}><Contrast className="h-5 w-5 md:h-6 md:w-6" />Contraste</button>
            <button onClick={() => setGrayscale(!grayscale)} className={cn("flex flex-col items-center gap-2 p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all text-[8px] md:text-[10px] font-black uppercase text-center shadow-sm", grayscale ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 shadow-inner")}><SunMoon className="h-5 w-5 md:h-6 md:w-6" />Monocromo</button>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <button onClick={toggleReadingMode} className={cn("flex flex-col items-center gap-2 p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all text-[8px] md:text-[10px] font-black uppercase text-center shadow-sm", isReading ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 shadow-inner")}>{isReading ? <VolumeX className="h-5 w-5 md:h-6 md:w-6" /> : <Volume2 className="h-5 w-5 md:h-6 md:w-6" />}Leitor</button>
            <button onClick={toggleVoiceGuide} className={cn("flex flex-col items-center gap-2 p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all text-[8px] md:text-[10px] font-black uppercase text-center shadow-sm", isVoiceGuideActive ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 shadow-inner")}><Mic className="h-5 w-5 md:h-6 md:w-6" />Guia</button>
          </div>

          <button onClick={resetAll} className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-slate-50 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-colors border border-slate-100"><RotateCcw className="h-3 w-3 md:h-4 md:w-4" />Redefinir</button>
        </div>
      </div>
    </div>
  );
}
