
import { MetadataRoute } from 'next'

/**
 * @fileOverview Configuração de permissões para robôs de busca.
 * Protege áreas sensíveis e aponta para o sitemap oficial.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api',
        '/admin',
        '/vendas/recrutamento', // Protege a área interna de currículos
        '/*?*', // Evita indexação de URLs com parâmetros de busca indesejados
      ],
    },
    sitemap: 'https://studiosapient.com.br/sitemap.xml',
  }
}
