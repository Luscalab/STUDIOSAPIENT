
import { MetadataRoute } from 'next'

/**
 * @fileOverview Gerador dinâmico de Sitemap para a studiosapient.
 * Inclui todas as rotas estratégicas de serviço, projetos e páginas legais.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studiosapient.com.br'

  const staticRoutes = [
    { url: '', priority: 1, changeFrequency: 'weekly' as const },
    { url: '/urbeludo', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/servicos/performance-ads', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/servicos/sites-premium', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/servicos/design-estrategico', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/servicos/chat-ia', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/servicos/gestao-social', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/servicos/narrativa-visual', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/vendas/auth', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/privacidade', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/termos', priority: 0.5, changeFrequency: 'yearly' as const },
  ]

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
