'use client';

import { useEffect } from 'react';

/**
 * Componente de Acessibilidade VLibras com injeção manual.
 * Garante compatibilidade total com o ambiente Next.js e inicialização segura.
 */
export function VLibras() {
  useEffect(() => {
    // Injeção manual do script para garantir que ele rode no cliente após o DOM estar pronto
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      try {
        // @ts-ignore
        if (window.VLibras) {
          // @ts-ignore
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      } catch (e) {
        console.error('Erro ao inicializar VLibras:', e);
      }
    };
    document.body.appendChild(script);

    return () => {
      // Limpeza ao desmontar
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div {...{ vw: 'true' }} className="enabled">
      <div {...{ 'vw-access-button': 'true' }} className="active" />
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
