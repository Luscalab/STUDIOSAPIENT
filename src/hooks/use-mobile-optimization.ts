
"use client";

import { useState, useEffect } from "react";

/**
 * Hook para otimização de performance e experiência em dispositivos móveis.
 * Fornece estados para detecção de toque, orientação e tamanho de tela.
 */
export function useMobileOptimization() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };

    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    checkTouch();
    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return {
    isTouchDevice,
    isPortrait,
    viewportHeight,
    // Helper para alturas reais de mobile (evita problemas com a barra do browser)
    realVh: viewportHeight ? `${viewportHeight}px` : '100vh'
  };
}
