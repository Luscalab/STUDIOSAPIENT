
import { MetadataRoute } from 'next'

/**
 * @fileOverview Gerador dinâmico de Sitemap para a studiosapient.
 * Inclui todas as rotas estratégicas de serviço e projetos.
 * O Google utiliza este arquivo para descobrir URLs, enquanto o favicon é detectado via metadados de cabeçalho.
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
    '/vendas/auth',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
