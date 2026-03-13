
import type { Metadata } from 'next';
import { RecrutamentoClient } from "./recrutamento-client";

// Configurações de tempo de execução para o Vercel suportar uploads de áudio
export const maxDuration = 60;
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Recrutamento de Elite | Vendas studiosapient',
  description: 'Portal interno para avaliação de talentos comerciais. Testes de produtos e fechamento estratégico.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RecrutamentoPage() {
  return <RecrutamentoClient />;
}
