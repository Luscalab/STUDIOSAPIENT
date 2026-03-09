'use client';

import { useState, useEffect } from "react";
import { 
  Accessibility, 
  X, 
  Type, 
  Contrast, 
  Minus, 
  Plus, 
  RotateCcw,
  Link as LinkIcon,
  SunMoon,
  Hand
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [isLibrasActive, setIsLibrasActive] = useState(false);

  useEffect(() => {
    // Carregar preferências salvas
    const savedFontSize = localStorage.getItem('access-font-size');
    const savedContrast = localStorage.getItem('access-contrast') === 'true';
    const savedGrayscale = localStorage.getItem('access-grayscale') === 'true';
    const savedLinks = localStorage.getItem('access-links') === 'true';

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedContrast) setHighContrast(savedContrast);
    if (savedGrayscale) setGrayscale(savedGrayscale);
    if (savedLinks) setHighlightLinks(savedLinks);
  }, []);

  useEffect(() => {
    // Aplicar Tamanho de Fonte Global
    document.documentElement.style.fontSize = `${(fontSize / 100) * 16}px`;
    localStorage.setItem('access-font-size', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    // Aplicar Alto Contraste
    if (highContrast) {
      document.body.classList.add('accessibility-high-contrast');
    } else {
      document.body.classList.remove('accessibility-high-contrast');
    }
    localStorage.setItem('access-contrast', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    // Aplicar Escala de Cinza
    if (grayscale) {
      document.documentElement.classList.add('accessibility-grayscale');
    } else {
      document.documentElement.classList.remove('accessibility-grayscale');
    }
    localStorage.setItem('access-grayscale', grayscale.toString());
  }, [grayscale]);

  useEffect(() => {
    // Aplicar Realce de Links
    if (highlightLinks) {
      document.body.classList.add('accessibility-highlight-links');
    } else {
      document.body.classList.remove('accessibility-highlight-links');
    }
    localStorage.setItem('access-links', highlightLinks.toString());
  }, [highlightLinks]);

  const toggleLibras = () => {
    const librasWidget = document.querySelector('[vw-access-button]');
    if (librasWidget) {
      const button = librasWidget.querySelector('img') || librasWidget;
      (button as HTMLElement).click();
      setIsLibrasActive(!isLibrasActive);
    }
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    setIsLibrasActive(false);
    // Tentar fechar libras se estiver aberto (complexo sem API oficial, mas o click toggle ajuda)
  };

  return (
    <>
      {/* Botão Flutuante - Posicionado Acima do Chat IA no lado DIREITO */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu de Acessibilidade"
        className={cn(
          "fixed bottom-24 right-6 z-[100] h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-3xl shadow-xl",
          isOpen 
            ? "bg-foreground text-white" 
            : "bg-primary text-white"
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Accessibility className="h-5 w-5" />}
      </button>

      {/* Painel do Menu de Acessibilidade */}
      <div
        className={cn(
          "fixed bottom-40 right-6 z-[100] w-[280px] glass-morphism rounded-[2.5rem] border-primary/20 shadow-2xl transition-all duration-700 origin-bottom-right p-6 space-y-6",
          isOpen ? "scale-100 opacity-100 translate-y-0 visible" : "scale-0 opacity-0 translate-y-10 invisible pointer-events-none"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Accessibility className="h-4 w-4" />
          </div>
          <h3 className="font-headline font-black text-sm tracking-tighter uppercase">Acessibilidade</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tamanho do Texto Site</p>
            <div className="flex items-center justify-between bg-secondary/50 rounded-2xl p-2">
              <button 
                onClick={() => setFontSize(prev => Math.max(prev - 10, 80))}
                className="h-8 w-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-xs font-bold">{fontSize}%</span>
              <button 
                onClick={() => setFontSize(prev => Math.min(prev + 10, 150))}
                className="h-8 w-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[9px] font-black uppercase tracking-wider",
                highContrast ? "bg-primary text-white border-primary" : "bg-white border-primary/5 text-muted-foreground hover:bg-primary/5"
              )}
            >
              <Contrast className="h-4 w-4" />
              Contraste
            </button>
            <button
              onClick={() => setGrayscale(!grayscale)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[9px] font-black uppercase tracking-wider",
                grayscale ? "bg-primary text-white border-primary" : "bg-white border-primary/5 text-muted-foreground hover:bg-primary/5"
              )}
            >
              <SunMoon className="h-4 w-4" />
              Monocromo
            </button>
            <button
              onClick={toggleLibras}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[9px] font-black uppercase tracking-wider",
                isLibrasActive ? "bg-primary text-white border-primary" : "bg-white border-primary/5 text-muted-foreground hover:bg-primary/5"
              )}
            >
              <Hand className="h-4 w-4" />
              Libras
            </button>
            <button
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-[9px] font-black uppercase tracking-wider",
                highlightLinks ? "bg-primary text-white border-primary" : "bg-white border-primary/5 text-muted-foreground hover:bg-primary/5"
              )}
            >
              <LinkIcon className="h-4 w-4" />
              Links
            </button>
          </div>
          
          <button
            onClick={resetAll}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-secondary/30 border border-transparent hover:bg-secondary/50 transition-all text-[9px] font-black uppercase tracking-wider text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar Tudo
          </button>
        </div>

        <p className="text-[8px] font-black text-center text-muted-foreground/40 uppercase tracking-[0.3em]">
          Sapient Studio • Inclusão Global
        </p>
      </div>
    </>
  );
}