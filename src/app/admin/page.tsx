
import type { Metadata } from 'next';
import { AdminClient } from "./admin-client";

export const metadata: Metadata = {
  title: 'Painel Admin | studiosapient',
  description: 'Gestão de recrutamento e análise de candidatos comerciais.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
