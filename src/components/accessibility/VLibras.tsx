'use client';

import { useEffect, useState } from 'react';

/**
 * Componente de Acessibilidade VLibras com injeção manual e montagem segura.
 * Garante que o widget seja inicializado apenas no cliente para evitar erros de hidratação.
 */
export function VLibras() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Evita múltiplas injeções do script
    if (document.getElementById('vlibras-script')) return;

    const script = document.createElement('script');
    script.id = 'vlibras-script';
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
      // O VLibras geralmente não precisa ser removido, mas limpamos o script se necessário
    };
  }, []);

  if (!mounted) return null;

  return (
    <div {...{ vw: 'true' }} className="enabled">
      <div {...{ 'vw-access-button': 'true' }} className="active" />
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
