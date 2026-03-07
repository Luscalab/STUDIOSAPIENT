'use server';
/**
 * @fileOverview Um motor de diagnóstico estratégico especializado em Google Meu Negócio, Identidade Visual e Social Media.
 * Agora com protocolo de coleta de dados obrigatório para evitar diagnósticos superficiais.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SapientServices = [
  'Performance & Ads (incl. Google Meu Negócio)',
  'Design Estratégico & Identidade Visual',
  'Gestão de Redes & Autoridade Social',
] as const;

const ServiceRecommenderInputSchema = z.object({
  clientNeedsAndGoals: z
    .string()
    .describe("Descrição da marca, nicho, público-alvo e os desafios/objetivos atuais."),
});
export type ServiceRecommenderInput = z.infer<typeof ServiceRecommenderInputSchema>;

const ServiceRecommenderOutputSchema = z.object({
  isDataSufficient: z
    .boolean()
    .describe('Indica se o usuário forneceu informações suficientes (Nome, Nicho, Objetivo) para um audit.'),
  missingInfoMessage: z
    .string()
    .optional()
    .describe('Mensagem solicitando os dados que faltam, caso isDataSufficient seja false.'),
  brandAudit: z
    .string()
    .describe('Análise profunda sobre a percepção atual, presença no Google, força da Identidade Visual e maturidade nas redes sociais.'),
  diagnosis: z
    .string()
    .describe('Identificação cirúrgica do gargalo: Onde a marca está perdendo dinheiro.'),
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('Serviços específicos da Sapient para a intervenção necessária.'),
  strategicValue: z
    .string()
    .describe('Como a intervenção da Sapient em design, performance local ou social vai transformar o faturamento.'),
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
  prompt: `Você é o Arquiteto-Chefe de Estratégia da Sapient Studio. 

PROTOCOLO DE AUDIT ESTRATÉGICO:
Antes de realizar qualquer diagnóstico, você deve verificar se a mensagem do usuário: "{{{clientNeedsAndGoals}}}" contém pelo menos:
1. O Nome da Marca ou Negócio.
2. O Nicho de Atuação (Ex: Clínica de Estética, Loja de Roupas, Escritório de Advocacia).
3. O Problema ou Objetivo principal.

SE FALTAR ESSAS INFORMAÇÕES:
- Defina 'isDataSufficient' como false.
- No campo 'missingInfoMessage', responda como um consultor premium: "Para que eu possa realizar um audit honesto e cirúrgico da sua marca, preciso saber primeiro: Qual o nome do seu negócio? Em qual nicho você atua e qual seu principal desafio hoje?"
- Deixe os outros campos com mensagens genéricas de "Aguardando dados".

SE AS INFORMAÇÕES ESTIVEREM PRESENTES:
- Defina 'isDataSufficient' como true.
- Realize um AUDIT DE MARCA focado em:
  1. PRESENÇA LOCAL (Google Meu Negócio).
  2. IDENTIDADE VISUAL (Estética e Valor).
  3. AUTORIDADE SOCIAL (Engajamento e Desejo).

- DIAGNÓSTICO: Aponte o erro fatal. Seja direto.
- SELEÇÃO: Escolha entre nossos pilares: Performance & Ads, Design Estratégico ou Gestão de Redes.
- VALOR ESTRATÉGICO: Diga o que NÓS faremos profissionalmente. Não dê dicas para ele fazer sozinho.

O tom é de um consultor de elite: caro, inteligente, honesto e focado em fechar a parceria.`,
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
