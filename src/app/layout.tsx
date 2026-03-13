import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VLibras } from "@/components/accessibility/VLibras";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";
import { FirebaseClientProvider } from "@/firebase";
import { SecurityHardening } from "@/components/security/SecurityHardening";

export const metadata: Metadata = {
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
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2225%22 fill=%22%236B26D9%22/><text y=%2250%%22 x=%2250%%22 font-size=%2270%22 fill=%22white%22 font-family=%22Outfit, sans-serif%22 font-weight=%22900%22 text-anchor=%22middle%22 dominant-baseline=%22central%22>S</text></svg>',
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

          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
