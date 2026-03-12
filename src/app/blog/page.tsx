
import type { Metadata } from 'next';
import { BlogClient } from "./blog-client";

export const metadata: Metadata = {
  title: 'Dossiês de Conhecimento | Inteligência de Marca',
  description: 'Acesse dossiês técnicos e insights estratégicos sobre performance, design e o futuro da IA nos negócios pela studiosapient.',
};

export default function BlogPage() {
  return <BlogClient />;
}
