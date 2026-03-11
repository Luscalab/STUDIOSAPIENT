'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * Componente de Acessibilidade VLibras de Elite.
 * Otimizado com CSS customizado para escala reduzida no mobile.
 */
export function VLibras() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .vw-access-button {
            transform: scale(0.65) !important;
            transform-origin: bottom right !important;
            margin-bottom: 5px !important;
            margin-right: 5px !important;
          }
          [vw-plugin-wrapper] {
            transform: scale(0.8) !important;
            transform-origin: bottom right !important;
          }
        }
      ` }} />
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
