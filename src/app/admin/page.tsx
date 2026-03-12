
import { redirect } from 'next/navigation';

/**
 * Redireciona usuários que tentarem acessar a rota administrativa removida.
 */
export default function AdminLegacyPage() {
  redirect('/');
}
