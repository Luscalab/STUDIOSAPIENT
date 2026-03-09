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
  VolumeX,
  Zap,
  ZapOff
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
  const [stopAnimations, setStopAnimations] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const lastSpokenTextRef = useRef<string>("");
  const readableElementsRef = useRef<HTMLElement[]>([]);
  const currentIndexRef = useRef<number>(-1);

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

  useEffect(() => {
    if (stopAnimations) document.body.classList.add('accessibility-stop-animations');
    else document.body.classList.remove('accessibility-stop-animations');
  }, [stopAnimations]);

  // Efeito para a Audiodescrição Dinâmica (Hover e Teclado)
  useEffect(() => {
    if (!isReading || !synthRef.current) return;

    const selector = 'h1, h2, h3, h4, h5, h6, p, a, button, li, [role="button"], img[alt]';
    readableElementsRef.current = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    currentIndexRef.current = -1;

    const speak = (text: string) => {
      if (!synthRef.current) return;
      const cleanText = text.trim();
      if (cleanText && cleanText.length > 1 && cleanText !== lastSpokenTextRef.current) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.1;
        lastSpokenTextRef.current = cleanText;
        synthRef.current.speak(utterance);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const text = target.getAttribute('aria-label') || target.getAttribute('alt') || target.innerText || target.textContent || "";
      speak(text);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const elements = readableElementsRef.current;
      if (elements.length === 0) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        if (e.key === 'ArrowDown') {
          currentIndexRef.current = (currentIndexRef.current + 1) % elements.length;
        } else {
          currentIndexRef.current = (currentIndexRef.current - 1 + elements.length) % elements.length;
        }

        const currentElement = elements[currentIndexRef.current];
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const originalOutline = currentElement.style.outline;
        currentElement.style.outline = '3px solid hsl(var(--primary))';
        setTimeout(() => {
          currentElement.style.outline = originalOutline;
        }, 1000);

        const text = currentElement.getAttribute('aria-label') || currentElement.getAttribute('alt') || currentElement.innerText || currentElement.textContent || "";
        speak(text);
      }

      if (e.key === 'Enter' && currentIndexRef.current !== -1) {
        const currentElement = elements[currentIndexRef.current];
        const isClickable = ['A', 'BUTTON'].includes(currentElement.tagName) || currentElement.getAttribute('role') === 'button';
        
        if (isClickable) {
          e.preventDefault();
          currentElement.click();
          speak("Item selecionado.");
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('keydown', handleKeyDown);
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [isReading]);

  const toggleLibras = () => {
    const librasButton = document.querySelector('[vw-access-button]');
    if (librasButton) {
      (librasButton as HTMLElement).click();
      setIsLibrasActive(!isLibrasActive);
    }
  };

  const toggleReadingMode = () => {
    if (isReading) {
      if (synthRef.current) synthRef.current.cancel();
      setIsReading(false);
      lastSpokenTextRef.current = "";
    } else {
      setIsReading(true);
      if (synthRef.current) {
        const welcome = new SpeechSynthesisUtterance(
          "Modo de audiodescrição ativado. Explore com o mouse ou utilize as setas para cima e para baixo do seu teclado para navegar. Pressione a tecla Enter para selecionar links ou botões quando eles forem lidos."
        );
        welcome.lang = 'pt-BR';
        welcome.rate = 1;
        synthRef.current.cancel();
        synthRef.current.speak(welcome);
      }
    }
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    setIsReading(false);
    setStopAnimations(false);
    if (synthRef.current) synthRef.current.cancel();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu de Acessibilidade Inclusiva"
        className={cn(
          "fixed bottom-24 right-6 z-[100] h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-3xl shadow-xl",
          isOpen ? "bg-foreground text-white" : "bg-primary text-white"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Accessibility className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          "fixed bottom-44 right-6 z-[100] w-[300px] glass-morphism rounded-[2.5rem] border-primary/20 shadow-2xl transition-all duration-700 origin-bottom-right p-6 space-y-6",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Accessibility className="h-6 w-6" />
          </div>
          <h3 className="font-headline font-black text-sm tracking-tighter uppercase text-foreground">Inclusão Digital</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Escala Global</p>
            <div className="flex items-center justify-between bg-secondary/50 rounded-2xl p-3">
              <button onClick={() => setFontSize(prev => Math.max(prev - 10, 80))} className="h-8 w-8 rounded-lg hover:bg-white flex items-center justify-center" aria-label="Diminuir fonte"><Minus className="h-4 w-4" /></button>
              <span className="text-[12px] font-bold">{fontSize}%</span>
              <button onClick={() => setFontSize(prev => Math.min(prev + 10, 150))} className="h-8 w-8 rounded-lg hover:bg-white flex items-center justify-center" aria-label="Aumentar fonte"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setHighContrast(!highContrast)} className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-[10px] font-black uppercase", highContrast ? "bg-primary text-white" : "bg-white text-muted-foreground")}><Contrast className="h-6 w-6" />Contraste</button>
            <button onClick={() => setGrayscale(!grayscale)} className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-[10px] font-black uppercase", grayscale ? "bg-primary text-white" : "bg-white text-muted-foreground")}><SunMoon className="h-6 w-6" />Monocromo</button>
            <button onClick={toggleLibras} className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-[10px] font-black uppercase", isLibrasActive ? "bg-primary text-white" : "bg-white text-muted-foreground")}><Hand className="h-6 w-6" />Libras</button>
            <button onClick={toggleReadingMode} className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-[10px] font-black uppercase", isReading ? "bg-primary text-white" : "bg-white text-muted-foreground")}>{isReading ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}Voz Nativa</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setHighlightLinks(!highlightLinks)} className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-[10px] font-black uppercase text-center", highlightLinks ? "bg-primary text-white" : "bg-white text-muted-foreground")}><LinkIcon className="h-6 w-6" />Realçar Links</button>
            <button onClick={() => setStopAnimations(!stopAnimations)} className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-[10px] font-black uppercase text-center", stopAnimations ? "bg-primary text-white" : "bg-white text-muted-foreground")}>{stopAnimations ? <ZapOff className="h-6 w-6" /> : <Zap className="h-6 w-6" />}Animações</button>
          </div>
          
          <button onClick={resetAll} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-secondary/30 text-[10px] font-black uppercase text-muted-foreground"><RotateCcw className="h-4 w-4" />Resetar Preferências</button>
        </div>
      </div>
    </>
  );
}
