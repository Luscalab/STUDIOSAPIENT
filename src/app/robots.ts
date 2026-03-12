
import { MetadataRoute } from 'next'

/**
 * @fileOverview Configuração de permissões para robôs de busca (Google, Bing, etc).
 * Protege a área administrativa e aponta para o sitemap.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: 'https://studiosapient.com.br/sitemap.xml',
  }
}
