
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
  Hand,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [isLibrasActive, setIsLibrasActive] = useState(false);
  const [isReading, setIsReading] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${(fontSize / 100) * 16}px`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) document.body.classList.add('accessibility-high-contrast');
    else document.body.classList.remove('accessibility-high-contrast');
  }, [highContrast]);

  useEffect(() => {
    if (grayscale) document.documentElement.classList.add('accessibility-grayscale');
    else document.documentElement.classList.remove('accessibility-grayscale');
  }, [grayscale]);

  useEffect(() => {
    if (highlightLinks) document.body.classList.add('accessibility-highlight-links');
    else document.body.classList.remove('accessibility-highlight-links');
  }, [highlightLinks]);

  const toggleLibras = () => {
    const librasButton = document.querySelector('[vw-access-button]');
    if (librasButton) {
      // Dispara o clique no elemento real do VLibras
      (librasButton as HTMLElement).click();
      setIsLibrasActive(!isLibrasActive);
    }
  };

  const handleAudioDescription = () => {
    if (!synthRef.current) return;

    if (isReading) {
      synthRef.current.cancel();
      setIsReading(false);
      return;
    }

    const mainText = document.querySelector('h1')?.innerText || "Sapient Studio";
    const subText = document.querySelector('p')?.innerText || "";
    const fullText = `Você está navegando no site da Sapient Studio. Destaque principal: ${mainText}. Descrição estratégica: ${subText}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'pt-BR';
    utterance.onend = () => setIsReading(false);
    
    setIsReading(true);
    synthRef.current.speak(utterance);
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    setIsReading(false);
    if (synthRef.current) synthRef.current.cancel();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu de Acessibilidade Inclusiva"
        className={cn(
          "fixed bottom-24 right-6 z-[100] h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-3xl shadow-xl",
          isOpen ? "bg-foreground text-white" : "bg-primary text-white"
        )}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Accessibility className="h-4 w-4" />}
      </button>

      <div
        className={cn(
          "fixed bottom-40 right-6 z-[100] w-[260px] glass-morphism rounded-[2.5rem] border-primary/20 shadow-2xl transition-all duration-700 origin-bottom-right p-6 space-y-6",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Accessibility className="h-4 w-4" />
          </div>
          <h3 className="font-headline font-black text-xs tracking-tighter uppercase">Inclusão Digital</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Escala Global</p>
            <div className="flex items-center justify-between bg-secondary/50 rounded-2xl p-2">
              <button onClick={() => setFontSize(prev => Math.max(prev - 10, 80))} className="h-7 w-7 rounded-lg hover:bg-white flex items-center justify-center"><Minus className="h-3 w-3" /></button>
              <span className="text-[10px] font-bold">{fontSize}%</span>
              <button onClick={() => setFontSize(prev => Math.min(prev + 10, 150))} className="h-7 w-7 rounded-lg hover:bg-white flex items-center justify-center"><Plus className="h-3 w-3" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setHighContrast(!highContrast)} className={cn("flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[8px] font-black uppercase", highContrast ? "bg-primary text-white" : "bg-white text-muted-foreground")}><Contrast className="h-4 w-4" />Contraste</button>
            <button onClick={() => setGrayscale(!grayscale)} className={cn("flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[8px] font-black uppercase", grayscale ? "bg-primary text-white" : "bg-white text-muted-foreground")}><SunMoon className="h-4 w-4" />Monocromo</button>
            <button onClick={toggleLibras} className={cn("flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[8px] font-black uppercase", isLibrasActive ? "bg-primary text-white" : "bg-white text-muted-foreground")}><Hand className="h-4 w-4" />Libras</button>
            <button onClick={handleAudioDescription} className={cn("flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[8px] font-black uppercase", isReading ? "bg-primary text-white" : "bg-white text-muted-foreground")}>{isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}Voz Nativa</button>
          </div>

          <button onClick={() => setHighlightLinks(!highlightLinks)} className={cn("w-full flex items-center justify-center gap-3 p-3 rounded-2xl border transition-all text-[8px] font-black uppercase", highlightLinks ? "bg-primary text-white" : "bg-white text-muted-foreground")}><LinkIcon className="h-3 w-3" />Realçar Links</button>
          
          <button onClick={resetAll} className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-secondary/30 text-[8px] font-black uppercase text-muted-foreground"><RotateCcw className="h-3 w-3" />Resetar</button>
        </div>
      </div>
    </>
  );
}
