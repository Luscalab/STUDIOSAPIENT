'use server';
/**
 * @fileOverview Motor de Consultoria Estratégica Sapient Studio v2.
 * 
 * Implementa uma Matriz de Posicionamento de Mercado e protocolos de prospecção.
 * Focado em identificar o "Gargalo de Ouro" de cada nicho de atuação.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SapientServices = [
  'Performance & Ads (incl. Google Meu Negócio)',
  'Design Estratégico & Identidade Visual',
  'Gestão de Redes & Autoridade Social',
  'Ecossistemas de Chat IA (WhatsApp & Web)',
  'Narrativa Visual & Dossiês de Venda',
] as const;

/**
 * Protocolos específicos por nicho para treinamento da IA.
 * Estruturado para máxima economia de tokens e precisão.
 */
const STRATEGIC_MATRIX = `
# MATRIZ SAPIENT DE POSICIONAMENTO:
1. SAÚDE: Gargalo = Confiança Local. Foco: GMN + Identidade Visual + Chat IA.
2. DIREITO: Gargalo = Autoridade Técnica. Foco: Branding de Prestígio + Narrativa Visual.
3. GASTRONOMIA: Gargalo = Desejo Visual. Foco: Gestão de Redes + Tráfego Local.
4. ESTÉTICA: Gargalo = Diferenciação. Foco: Design System Exclusivo + Social Growth.
5. VAREJO/MODA: Gargalo = Conversão. Foco: Performance Ads + IA de Vendas.
6. IMOBILIÁRIA: Gargalo = Qualificação de Lead. Foco: Design + IA de Triagem + Ads.
7. SERVIÇOS TÉCNICOS: Gargalo = Clareza. Foco: Narrativa Visual + Google Search.
`;

const ServiceRecommenderInputSchema = z.object({
  clientNeedsAndGoals: z.string().describe("Contexto ou descrição do negócio do cliente."),
});

const ServiceRecommenderOutputSchema = z.object({
  isDataSufficient: z.boolean().describe('Informa se os dados permitem um diagnóstico estratégico.'),
  missingInfoMessage: z.string().optional().describe('Solicitação profissional dos dados faltantes.'),
  brandAudit: z.string().describe('Análise da percepção de marca no nicho atual.'),
  diagnosis: z.string().describe('O gargalo específico identificado no negócio.'),
  recommendedServices: z.array(z.enum(SapientServices)).describe('Mix de serviços recomendados.'),
  strategicValue: z.string().describe('O impacto financeiro/de marca da execução profissional.'),
});

export type ServiceRecommenderOutput = z.infer<typeof ServiceRecommenderOutputSchema>;

const serviceRecommenderPrompt = ai.definePrompt({
  name: 'serviceRecommenderPrompt',
  input: {schema: ServiceRecommenderInputSchema},
  output: {schema: ServiceRecommenderOutputSchema},
  prompt: `Você é o Estrategista-Chefe da Sapient Studio. Seu objetivo é realizar uma prospecção de alto nível.

PROTOCOLO DE ANÁLISE:
${STRATEGIC_MATRIX}

FASE 1: QUALIFICAÇÃO (isDataSufficient)
Verifique se a entrada: "{{{clientNeedsAndGoals}}}" contém: Nome, Nicho e Desafio. 
Se faltar algo, explique que para um diagnóstico de elite, esses pilares são fundamentais.

FASE 2: DIAGNÓSTICO (Se isDataSufficient = true)
- BRAND AUDIT: Como o mercado vê o negócio hoje (amadorismo vs autoridade).
- DIAGNÓSTICO: Identifique o gargalo real baseado na Matriz acima.
- INTERVENÇÃO: Como os serviços Sapient resolvem o problema com tecnologia e design.

TOM DE VOZ:
Analítico, direto, focado em ROI e autoridade. Evite "vender", foque em "diagnosticar".`,
});

export async function recommendServices(input: {clientNeedsAndGoals: string}): Promise<ServiceRecommenderOutput> {
  const {output} = await aiServiceRecommenderFlow(input);
  return output!;
}

const aiServiceRecommenderFlow = ai.defineFlow(
  {
    name: 'aiServiceRecommenderFlow',
    inputSchema: ServiceRecommenderInputSchema,
    outputSchema: ServiceRecommenderOutputSchema,
  },
  async input => {
    const {output} = await serviceRecommenderPrompt(input);
    return output!;
  }
);
