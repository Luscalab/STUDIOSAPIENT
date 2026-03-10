'use server';
/**
 * @fileOverview Motor de Consultoria Estratégica Sapient Studio v3.
 * 
 * Implementa uma Matriz de Posicionamento de Mercado e protocolos de prospecção.
 * Focado em identificar o "Gargalo de Ouro" e alavancas de ROI.
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
 * Protocolos específicos por nicho e tratamento de objeções.
 */
const STRATEGIC_MATRIX = `
# MATRIZ SAPIENT DE ALAVANCAGEM TÉCNICA:
1. SAÚDE (Médicos/Clínicas): Gargalo = Confiança Local. Alavanca: Domínio de GMN + Branding de Prestígio. Foco em encurtar a jornada de busca-agendamento.
2. DIREITO (Escritórios de Elite): Gargalo = Autoridade Técnica Percebida. Alavanca: Design de Identidade Sólida + Narrativa Visual de Resultados. Foco em justificar honorários premium.
3. GASTRONOMIA: Gargalo = Desejo Visual + Frequência. Alavanca: Gestão de Redes (Visual Storytelling) + Tráfego Local de Urgência.
4. ESTÉTICA: Gargalo = Diferenciação de Atendimento. Alavanca: Chat IA (Atendimento 24/7) + Social Growth focado em Prova Social.
5. VAREJO/MODA: Gargalo = Conversão Imediata. Alavanca: Performance Ads + IA de Vendas para recuperação de leads.
6. IMOBILIÁRIA: Gargalo = Qualificação de Lead. Alavanca: Dossiês de Venda (Narrativa Visual) + IA de Triagem Cognitiva.
7. SERVIÇOS TÉCNICOS: Gargalo = Clareza da Solução. Alavanca: Infográficos de Valor + Google Search Ads de Intenção.

# PROTOCOLO DE PROSPECÇÃO (SAPIENT VOICE):
- Seja Analítico: Não tente "vender" um serviço; tente "diagnosticar" o problema.
- Foco em ROI: Explique que design e performance são investimentos para aumentar a margem ou o volume de clientes qualificados.
- Tom de Voz: Profissional, direto, minimalista e autoritário.
- Objeções Comuns: 
  * "É caro?": Responda focando na percepção de valor e posicionamento de luxo.
  * "Demora?": Foque em "Early Wins" (vitórias rápidas) com Ads enquanto o Branding matura.
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
  prompt: `Você é o Estrategista-Chefe da Sapient Studio. Sua missão é realizar um diagnóstico de posicionamento de alto nível.

ENTRADA DO CLIENTE:
"{{{clientNeedsAndGoals}}}"

PROTOCOLO DE ANÁLISE:
${STRATEGIC_MATRIX}

FASE 1: QUALIFICAÇÃO (isDataSufficient)
Verifique se a entrada contém informações sobre o Nicho e o Desafio. Se for apenas um "Oi", informe que para um diagnóstico técnico, você precisa de contexto sobre o negócio.

FASE 2: DIAGNÓSTICO E ROI (Se isDataSufficient = true)
- BRAND AUDIT: Analise como a falta de clareza visual ou performance afeta a autoridade do cliente no nicho dele.
- DIAGNÓSTICO: Identifique o gargalo (ex: falta de confiança local, lead desqualificado, demora no atendimento).
- IMPACTO: Explique o valor estratégico da intervenção Sapient (ex: "Sua marca passará a atrair clientes de ticket 3x maior").

MANTENHA O TOM SAPIENT: Analítico, focado em resultados e ROI.`,
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
