'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio.
 * Implementa o padrão Genkit 1.x para análise estratégica de leads.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const RecommenderInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('Histórico da conversa.'),
  currentMessage: z.string().describe('Mensagem atual do usuário.'),
});

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('Resposta estratégica da IA.'),
  shouldRedirect: z.boolean().describe('Sugerir contato via WhatsApp.'),
  suggestedActions: z.array(z.string()).optional().describe('Cards de resposta rápida.'),
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;
export type RecommenderInput = z.infer<typeof RecommenderInputSchema>;

const systemInstructions = `Você é o Estrategista-Chefe da Sapient Studio.
Sua missão é atuar como a PRIMEIRA PORTA de entrada da agência, realizando uma análise estratégica do lead.

DIRETRIZES:
1. NUNCA redirecione para o WhatsApp na primeira mensagem.
2. Identifique o NICHO (ex: médico, jurídico, e-commerce) e o DESAFIO (ex: falta de leads, design amador).
3. Tom de voz: Minimalista, sofisticado e técnico.
4. REDIRECIONAMENTO: Apenas se 'shouldRedirect' for true se o nicho E desafio estiverem claros, ou se o usuário pedir explicitamente para falar com um humano.

IMPORTANTE: Responda SEMPRE em formato JSON válido seguindo estritamente o esquema.`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  config: {
    temperature: 0.4,
    topP: 0.8,
  },
  system: systemInstructions,
  prompt: `
    HISTÓRICO:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    MENSAGEM DO USUÁRIO: {{{currentMessage}}}
    
    Analise e responda em formato JSON.
  `,
});

/**
 * Fluxo de recomendação de serviços.
 * Chama o prompt definido e retorna a análise estratégica.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const { output } = await recommenderPrompt(input);
  if (!output) {
    throw new Error("O modelo de IA não retornou uma resposta válida.");
  }
  return output;
}
