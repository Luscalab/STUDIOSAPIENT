
'use server';
/**
 * @fileOverview Motor de Consultoria Estratégica Sapient Studio.
 * 
 * Implementa um protocolo de coleta de dados obrigatório e uma Matriz Estratégica de Nichos.
 * Foco em diagnóstico profissional e posicionamento de mercado.
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

const NICHE_STRATEGY_MATRIX = `
MATRIZ ESTRATÉGICA SAPIENT (PROTOCOLOS POR NICHO):

1. SAÚDE (Dentistas, Clínicas, Médicos):
- Gargalo: Falta de presença local e inconsistência visual.
- Estratégia: Otimização de GMN + Identidade Visual Profissional + Chat IA para agendamentos.

2. DIREITO (Advogados, Escritórios):
- Gargalo: Imagem amadora que não transmite confiança técnica.
- Estratégia: Autoridade Social + Branding de Prestígio + Narrativa Visual.

3. GASTRONOMIA (Restaurantes, Cafés, Bares):
- Gargalo: Baixa atratividade visual nas redes e pouca visibilidade em buscas.
- Estratégia: Gestão de Redes + GMN Estratégico + Chat IA para pedidos/reservas.

4. ESTÉTICA & BELEZA:
- Gargalo: Dificuldade de diferenciação em um mercado saturado.
- Estratégia: Design System Exclusivo + Social Growth focado em portfólio.

5. VAREJO DE MODA / LOJAS:
- Gargalo: Baixa conversão em anúncios e imagem de marca genérica.
- Estratégia: Performance & Ads + Chat IA de Vendas + Identidade Visual Estratégica.

6. MERCADOS & FARMÁCIAS:
- Gargalo: Baixa visibilidade em buscas locais de urgência.
- Estratégia: Domínio do GMN + Ads de Raio Local.

7. IMOBILIÁRIA & CORRETAGEM:
- Gargalo: Apresentação visual pobre e falta de anúncios segmentados.
- Estratégia: Design Estratégico + Chat IA de Qualificação + Ads de Alta Conversão.
`;

const ServiceRecommenderInputSchema = z.object({
  clientNeedsAndGoals: z
    .string()
    .describe("Histórico da conversa ou descrição do cliente sobre seu negócio."),
});
export type ServiceRecommenderInput = z.infer<typeof ServiceRecommenderInputSchema>;

const ServiceRecommenderOutputSchema = z.object({
  isDataSufficient: z
    .boolean()
    .describe('Indica se as informações são suficientes para uma análise estratégica.'),
  missingInfoMessage: z
    .string()
    .optional()
    .describe('Mensagem solicitando os dados que faltam.'),
  brandAudit: z
    .string()
    .describe('Análise da percepção de marca baseada no nicho.'),
  diagnosis: z
    .string()
    .describe('Identificação do gargalo específico do negócio.'),
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('Serviços recomendados da Sapient Studio.'),
  strategicValue: z
    .string()
    .describe('Valor da execução profissional para este caso.'),
});
export type ServiceRecommenderOutput = z.infer<typeof ServiceRecommenderOutputSchema>;

export async function recommendServices(
  input: ServiceRecommenderInput
): Promise<ServiceRecommenderOutput> {
  return aiServiceRecommenderFlow(input);
}

const serviceRecommenderPrompt = ai.definePrompt({
  name: 'serviceRecommenderPrompt',
  input: {schema: ServiceRecommenderInputSchema},
  output: {schema: ServiceRecommenderOutputSchema},
  prompt: `Você é o Estrategista-Chefe da Sapient Studio. 

PROTOCOLO DE CONSULTORIA:
Utilize a seguinte base para o diagnóstico:
${NICHE_STRATEGY_MATRIX}

FASE 1: ENTENDIMENTO (isDataSufficient = false)
Se a entrada: "{{{clientNeedsAndGoals}}}" não contiver:
1. Nome do Negócio.
2. Área de Atuação.
3. Principal desafio atual.

Ação: Peça os dados de forma profissional e direta.

FASE 2: ANÁLISE (isDataSufficient = true)
Se os dados estiverem presentes:
- BRAND AUDIT: Analise como a marca é percebida no nicho.
- DIAGNÓSTICO: Aponte a falha exata (GMN, Design, Redes ou falta de Automação de Chat).
- INTERVENÇÃO: Explique como a SAPIENT resolverá isso com execução profissional e tecnologia IA.

TOM DE VOZ:
Profissional, analítico, direto e focado em resultados.`,
});

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
