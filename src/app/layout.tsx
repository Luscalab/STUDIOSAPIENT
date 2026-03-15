
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VLibras } from "@/components/accessibility/VLibras";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";
import { FirebaseClientProvider } from "@/firebase";
import { SecurityHardening } from "@/components/security/SecurityHardening";
import { LanguageProvider } from "@/context/LanguageContext";
import { CookieConsent } from "@/components/layout/CookieConsent";

// O metadataBase é crucial para que o Vercel resolva caminhos de ícones e open-graph corretamente
export const metadata: Metadata = {
  metadataBase: new URL('https://studiosapient.com.br'),
  title: {
    default: 'studiosapient. | Estratégia, Design e Performance Digital',
    template: '%s | studiosapient.'
  },
  description: 'A studiosapient transforma negócios em marcas de autoridade através de design estratégico, tráfego pago (Ads) e inteligência artificial. Conheça nossas soluções profissionais.',
  keywords: ['agência de marketing digital', 'design estratégico', 'tráfego pago', 'branding de luxo', 'estratégia de negócios', 'inteligência artificial para empresas'],
  authors: [{ name: 'studiosapient' }],
  creator: 'studiosapient',
  publisher: 'studiosapient',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <FirebaseClientProvider>
          <LanguageProvider>
            {/* Blindagem de Segurança */}
            <SecurityHardening />

            {/* Atalho de Acessibilidade - Pular para Conteúdo */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only fixed top-4 left-4 z-[999] bg-primary text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl"
            >
              Pular para o conteúdo
            </a>

            {/* Componentes de Acessibilidade */}
            <div className="relative z-[200]">
              <VLibras />
              <AccessibilityMenu />
            </div>

            {/* Consentimento de Cookies */}
            <CookieConsent />

            {children}
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
