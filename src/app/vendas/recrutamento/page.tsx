
import type { Metadata } from 'next';
import { RecrutamentoClient } from "./recrutamento-client";

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
