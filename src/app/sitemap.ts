
import { MetadataRoute } from 'next'

/**
 * @fileOverview Gerador dinâmico de Sitemap para a studiosapient.
 * Inclui todas as rotas estratégicas de serviço e projetos.
 * A rota de recrutamento é omitida para manter a privacidade do processo.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studiosapient.com.br'

  // Rotas estáticas principais
  const routes = [
    '',
    '/urbeludo',
    '/servicos/performance-ads',
    '/servicos/sites-premium',
    '/servicos/design-estrategico',
    '/servicos/chat-ia',
    '/servicos/gestao-social',
    '/servicos/narrativa-visual',
    // /vendas/recrutamento omitido propositalmente
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
