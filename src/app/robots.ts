
import { MetadataRoute } from 'next'

/**
 * @fileOverview Configuração de permissões para robôs de busca.
 * Mantém o site acessível enquanto protege rotas de API.
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
