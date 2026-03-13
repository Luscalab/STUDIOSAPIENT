
import { ImageResponse } from 'next/og';

/**
 * @fileOverview Gerador dinâmico de Favicon (32x32) para a studiosapient.
 * Utiliza o motor de renderização de imagem do Next.js para gerar um ícone PNG real.
 * Isso garante que o Google reconheça o favicon como um arquivo de imagem válido.
 */

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#6B26D9',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
