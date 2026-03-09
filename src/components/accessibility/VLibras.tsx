'use client';

import { useEffect, useState } from 'react';

/**
 * Componente de Acessibilidade VLibras com injeção estrutural bruta.
 * Utiliza dangerouslySetInnerHTML para garantir que os atributos customizados 
 * exigidos pelo script do governo (vw, vw-access-button) sejam preservados.
 */
export function VLibras() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Evita injeções duplicadas
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
        console.error('Falha na inicialização do widget VLibras:', e);
      }
    };
    
    document.body.appendChild(script);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: `
        <div vw="true" class="enabled">
          <div vw-access-button="true" class="active"></div>
          <div vw-plugin-wrapper="true">
            <div class="vw-plugin-top-wrapper"></div>
          </div>
        </div>
      ` }} 
    />
  );
}
