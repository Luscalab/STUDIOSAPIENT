
'use client';

import { useEffect } from 'react';

/**
 * Componente de Blindagem de Interface studiosapient.
 * Protege contra inspeção de código, cópia não autorizada e extração de imagens.
 */
export function SecurityHardening() {
  useEffect(() => {
    // 1. Bloqueia Menu de Contexto (Botão Direito)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Bloqueia Atalhos de Inspeção e Cópia
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (
        // Cópia, Código Fonte, Salvar, Imprimir
        (isCmdOrCtrl && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) ||
        // DevTools (Inspect Element, Console, etc)
        (isCmdOrCtrl && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        // F12 e F11 (para evitar manipulação de tela cheia/dev)
        e.key === 'F12' || (e.key === 'F11' && !isMac)
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Bloqueia Arrastar Imagens (Prevenção de Download via Drag)
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // 4. Limpeza de Clipboard em PrintScreen
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || e.key === 'PrtSc') {
        navigator.clipboard.writeText("Conteúdo Protegido por studiosapient.");
      }
    };

    // Aplicação Global
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return null;
}
