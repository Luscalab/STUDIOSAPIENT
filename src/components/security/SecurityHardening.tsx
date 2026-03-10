'use client';

import { useEffect } from 'react';

/**
 * Componente de Proteção de Conteúdo e Segurança de UI.
 * Desabilita atalhos de inspeção, cópia e o menu de contexto.
 */
export function SecurityHardening() {
  useEffect(() => {
    // Bloqueia o menu de contexto (botão direito)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Bloqueia atalhos de teclado comuns de cópia e inspeção
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+U (Source), Ctrl+S (Save), Ctrl+P (Print)
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) ||
        // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        // F12 (DevTools)
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    // Previne o "Print Screen" limpando o clipboard (apenas em alguns browsers/cenários)
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText("");
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return null;
}
