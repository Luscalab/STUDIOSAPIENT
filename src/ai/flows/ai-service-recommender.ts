'use server';
/**
 * @fileOverview Motor de Consultoria Estratégica Sapient Studio v6.0.
 * 
 * Implementa uma Matriz de Posicionamento com Memória Contextual Determinística.
 * Focado em identificar o "Gargalo de Ouro" e eliminar repetições de perguntas através de auditoria de histórico.
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
 * Matriz de alavancagem técnica por nicho.
 */
const STRATEGIC_MATRIX = `
# MATRIZ SAPIENT DE ALAVANCAGEM:
1. SAÚDE: Gargalo = Confiança Local. Alavanca: Domínio de GMN + Branding de Prestígio.
2. DIREITO: Gargalo = Autoridade Técnica. Alavanca: Design de Identidade Sólida + Narrativa Visual.
3. GASTRONOMIA: Gargalo = Desejo + Frequência. Alavanca: Gestão de Redes + Tráfego de Urgência.
4. ESTÉTICA: Gargalo = Diferenciação. Alavanca: Chat IA + Prova Social.
5. VAREJO/MODA: Gargalo = Conversão Imediata. Alavanca: Performance Ads + IA de Vendas.
6. IMOBILIÁRIA: Gargalo = Qualificação. Alavanca: Dossiês de Venda + IA de Triagem.
7. SERVIÇOS TÉCNICOS: Gargalo = Clareza. Alavanca: Infográficos + Search Ads.

# PROTOCOLO DE INTELIGÊNCIA (SAPIENT VOICE):
- AUDITORIA DE MEMÓRIA: Antes de responder, você DEVE escanear o histórico para encontrar o NICHO (área de atuação) e o DESAFIO (dor principal).
- SE AMBOS CONSTAREM NO HISTÓRICO: Defina isDataSufficient = true e forneça o diagnóstico técnico baseado na matriz.
- NUNCA PERGUNTE NOVAMENTE: Se o cliente já informou o nicho ou desafio, você está proibido de perguntar isso de novo.
- TOM DE VOZ: Analítico, focado em ROI, minimalista e profissional.
`;

const ServiceRecommenderInputSchema = z.object({
  clientNeedsAndGoals: z.string().describe("Histórico completo da conversa para análise de contexto."),
});

const ServiceRecommenderOutputSchema = z.object({
  isDataSufficient: z.boolean().describe('Informa se os dados permitem um diagnóstico estratégico.'),
  missingInfoMessage: z.string().optional().describe('Solicitação profissional dos dados faltantes.'),
  brandAudit: z.string().optional().describe('Análise da percepção de marca no nicho.'),
  diagnosis: z.string().optional().describe('O gargalo específico identificado.'),
  recommendedServices: z.array(z.enum(SapientServices)).optional().describe('Mix de serviços recomendados.'),
  strategicValue: z.string().optional().describe('O impacto financeiro da execução Sapient.'),
});

export type ServiceRecommenderOutput = z.infer<typeof ServiceRecommenderOutputSchema>;

const serviceRecommenderPrompt = ai.definePrompt({
  name: 'serviceRecommenderPrompt',
  input: {schema: ServiceRecommenderInputSchema},
  output: {schema: ServiceRecommenderOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    ],
  },
  prompt: `Você é o Estrategista-Chefe da Sapient Studio. Sua missão é realizar um diagnóstico de posicionamento de alto nível.

HISTÓRICO DA CONVERSA:
"{{{clientNeedsAndGoals}}}"

INSTRUÇÕES RÍGIDAS:
${STRATEGIC_MATRIX}

FASE 1: AUDITORIA DE HISTÓRICO
Verifique se o cliente já informou o Nicho e o Desafio em QUALQUER momento do histórico acima. 
Se sim, defina isDataSufficient as true.
Se não, peça APENAS o que falta de forma profissional. NUNCA peça o que já foi dito.

FASE 2: DIAGNÓSTICO (Se isDataSufficient = true)
Forneça uma análise técnica baseada na Matriz Sapient. Foque em como nossa intervenção resolve o gargalo identificado e gera ROI.`,
});

export async function recommendServices(input: {clientNeedsAndGoals: string}): Promise<ServiceRecommenderOutput> {
  try {
    const {output} = await aiServiceRecommenderFlow(input);
    return output || { 
      isDataSufficient: false, 
      missingInfoMessage: "Para que eu possa aplicar nossa Matriz de Alavancagem, conte-me um pouco sobre seu negócio e qual seu maior desafio hoje." 
    };
  } catch (error) {
    return { 
      isDataSufficient: false, 
      missingInfoMessage: "Entendido. Para um diagnóstico técnico, descreva brevemente seu nicho e qual resultado busca alcançar agora." 
    };
  }
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
