
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zyhfeonnlhucuhjvekid.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      '9000-firebase-studio-1772921422114.cluster-mdgxqvvkkbfpqrfigfiuugu5pk.cloudworkstations.dev',
      '6000-firebase-studio-1772921422114.cluster-mdgxqvvkkbfpqrfigfiuugu5pk.cloudworkstations.dev',
      '*.cloudworkstations.dev'
    ]
  },
  async headers() {
    // Simplificado para evitar bloqueios no ambiente de desenvolvimento do Firebase Studio
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vlibras.gov.br https://www.gstatic.com https://apis.google.com https://*.cloudworkstations.dev;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://images.unsplash.com https://picsum.photos https://zyhfeonnlhucuhjvekid.supabase.co https://placehold.co;
      font-src 'self' https://fonts.gstatic.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.google-analytics.com https://vlibras.gov.br https://*.cloudworkstations.dev wss://*.cloudworkstations.dev https://*.cloudworkstations.dev:* wss://*.cloudworkstations.dev:*;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          }
        ],
      },
    ];
  },
};

export default nextConfig;
