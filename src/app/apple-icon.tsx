
import { ImageResponse } from 'next/og';

/**
 * @fileOverview Gerador dinâmico de ícone para Apple/iOS (180x180).
 */

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: '#6B26D9',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '40px',
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
