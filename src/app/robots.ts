
import { MetadataRoute } from 'next'

/**
 * @fileOverview Configuração de permissões para robôs de busca.
 * Removido desallow de /admin pois a rota não existe mais.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api'],
    },
    sitemap: 'https://studiosapient.com.br/sitemap.xml',
  }
}
