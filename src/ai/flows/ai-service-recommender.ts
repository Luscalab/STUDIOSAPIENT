'use server';
/**
 * @fileOverview Motor de Consultoria Estratégica Sapient Studio.
 * 
 * Implementa um protocolo de coleta de dados obrigatório e conversacional 
 * para garantir que o diagnóstico seja baseado em inteligência real do negócio.
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
    .describe("Histórico da conversa ou descrição atual do cliente sobre sua marca e desafios."),
});
export type ServiceRecommenderInput = z.infer<typeof ServiceRecommenderInputSchema>;

const ServiceRecommenderOutputSchema = z.object({
  isDataSufficient: z
    .boolean()
    .describe('Indica se o usuário forneceu informações suficientes para um audit estratégico profissional.'),
  missingInfoMessage: z
    .string()
    .optional()
    .describe('Mensagem de consultor de elite solicitando os dados que faltam para prosseguir.'),
  brandAudit: z
    .string()
    .describe('Análise da percepção de marca, presença local e autoridade digital baseada nos dados fornecidos.'),
  diagnosis: z
    .string()
    .describe('Identificação do principal gargalo estratégico que está impedindo o crescimento.'),
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('Intervenções específicas da Sapient Studio para o caso.'),
  strategicValue: z
    .string()
    .describe('Como nossa execução profissional vai transformar a realidade financeira e de posicionamento do cliente.'),
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

PROTOCOLO DE CONSULTORIA PRÉVIA:
Seu objetivo é agir como um consultor de elite que valoriza seu tempo e sua inteligência. Você NUNCA dá um diagnóstico baseado em "nada".

FASE 1: COLETA E ENTENDIMENTO (isDataSufficient = false)
Se a entrada do usuário: "{{{clientNeedsAndGoals}}}" for apenas uma saudação, uma frase vaga ou faltar qualquer um destes itens:
1. Nome da Marca/Negócio.
2. Nicho de Atuação específico.
3. Desafio ou Objetivo principal (Ex: "quero vender mais", "pareço amador", "não apareço no mapa").

Ação: Defina 'isDataSufficient' como false. No campo 'missingInfoMessage', responda como um consultor premium que quer entender o negócio antes de opinar. Ex: "Para que eu possa desenhar uma estratégia honesta para você, preciso de contexto. Qual o nome da sua marca e qual o seu principal desafio hoje?"

FASE 2: AUDIT ESTRATÉGICO (isDataSufficient = true)
Se os dados acima estiverem presentes:
- Defina 'isDataSufficient' as true.
- Realize uma análise sobre o Google Meu Negócio (presença local), Identidade Visual (valor percebido) e Redes Sociais (autoridade).
- DIAGNÓSTICO: Aponte onde o cliente está perdendo autoridade ou dinheiro de forma direta.
- INTERVENÇÃO SAPIENT: Explique o que NÓS faremos profissionalmente. Não dê dicas para ele fazer sozinho. Foque em como nossa gestão de elite vai elevar o jogo dele.

TOM DE VOZ:
- Profissional, direto, honesto e de alto valor. 
- Você é o especialista, não um assistente. 
- O foco é converter a curiosidade em uma reunião de consultoria real (redirecionando para o contato).`,
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
