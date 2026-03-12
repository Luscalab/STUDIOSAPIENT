import type { Metadata } from 'next';
import { RecrutamentoClient } from "./recrutamento-client";

// Configurações de tempo de execução para o Vercel suportar processamento de áudio por IA (Server Actions chamadas nesta rota)
export const maxDuration = 60;
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Recrutamento de Elite | Vendas studiosapient',
  description: 'Portal interno para avaliação de talentos comerciais. Testes de locução e fechamento estratégico.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RecrutamentoPage() {
  return <RecrutamentoClient />;
}
