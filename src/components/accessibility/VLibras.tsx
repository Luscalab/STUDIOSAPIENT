'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * Componente de Acessibilidade VLibras de Elite.
 * 
 * Utiliza injeção estrutural via dangerouslySetInnerHTML para garantir que os
 * atributos customizados exigidos pelo script oficial não sejam filtrados pelo React.
 */
export function VLibras() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
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
      <Script
        id="vlibras-script"
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            // @ts-ignore
            if (window.VLibras) {
              // @ts-ignore
              new window.VLibras.Widget('https://vlibras.gov.br/app');
            }
          } catch (e) {
            console.error('Falha na inicialização do widget VLibras:', e);
          }
        }}
      />
    </>
  );
}
