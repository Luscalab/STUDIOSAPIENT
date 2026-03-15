
import { ImageResponse } from 'next/og';

/**
 * @fileOverview Gerador dinâmico de Favicon (48x48) para a studiosapient.
 * Google recomenda múltiplos de 48px para exibição nos resultados de busca.
 */

export const size = {
  width: 48,
  height: 48,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          background: '#6B26D9',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '12px',
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
