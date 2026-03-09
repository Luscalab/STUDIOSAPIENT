'use client';

import Script from 'next/script';

/**
 * Componente de Acessibilidade VLibras oficial.
 * Tradução em tempo real para Libras em todo o site.
 */
export function VLibras() {
  return (
    <>
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
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
            console.error('Falha ao inicializar o VLibras:', e);
          }
        }}
      />
    </>
  );
}
