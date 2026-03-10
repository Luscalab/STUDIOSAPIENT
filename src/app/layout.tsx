import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VLibras } from "@/components/accessibility/VLibras";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";
import { FirebaseClientProvider } from "@/firebase";
import { SecurityHardening } from "@/components/security/SecurityHardening";

export const metadata: Metadata = {
  title: 'studiosapient. | Estratégia e Resultados',
  description: 'studiosapient - Agência de Marketing Digital e Branding. Transformando negócios em marcas de autoridade.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%238b5cf6%22/><text y=%22.9em%22 x=%2215%22 font-size=%2280%22 fill=%22white%22 font-family=%22sans-serif%22 font-weight=%22900%22>S</text></svg>',
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
          <VLibras />
          <AccessibilityMenu />

          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
