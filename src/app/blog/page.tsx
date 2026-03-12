
import { redirect } from 'next/navigation';

/**
 * Redireciona usuários que tentarem acessar a rota legada do blog.
 */
export default function BlogLegacyPage() {
  redirect('/');
}
