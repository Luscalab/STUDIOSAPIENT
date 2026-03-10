'use server';

/**
 * @fileOverview Fluxo de Inteligência Estratégica Sapient.
 * 
 * Este fluxo atua como o primeiro contato consultivo, buscando entender
 * o negócio do cliente antes de direcioná-lo para o fechamento humano.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const RecommenderInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('Histórico da conversa atual.'),
  currentMessage: z.string().describe('A última mensagem enviada pelo usuário.'),
});

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A resposta estratégica da IA.'),
  shouldRedirect: z.boolean().describe('Se a IA julga que é o momento de falar no WhatsApp.'),
  suggestedWhatsAppMessage: z.string().optional().describe('Mensagem pré-preenchida para o WhatsApp baseada no contexto.'),
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const systemPrompt = `Você é o Estrategista-Chefe da Sapient Studio.
Sua missão é ser a primeira porta de conversa com potenciais clientes.

OBJETIVO:
1. Ser profissional, técnico e amigável.
2. Entender sobre a marca, nicho e o principal desafio atual do cliente.
3. Mostrar autoridade em design, performance e IA.
4. Quando entender minimamente o que o cliente busca, sugira que a melhor forma de prosseguir é uma conversa direta com um consultor humano via WhatsApp.

DIRETRIZES:
- Analise o HISTÓRICO para não repetir perguntas.
- Se o cliente já disse o nicho, não pergunte novamente.
- Use um tom de voz de prestígio e autoridade.
- Se o cliente perguntar "o que vocês fazem", descreva brevemente: Performance Ads, Design Estratégico, IA e Narrativa Visual.

Mantenha a conversa focada em gerar valor e redirecionar para o WhatsApp oficial.`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  prompt: `
    System Instructions: ${systemPrompt}

    Histórico da Conversa:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    Mensagem Atual: {{{currentMessage}}}
    
    Analise o contexto e responda de forma consultiva.
  `,
});

export async function recommendServices(input: z.infer<typeof RecommenderInputSchema>): Promise<RecommenderOutput> {
  const { output } = await recommenderPrompt(input);
  if (!output) {
    return {
      reply: "Desculpe, tive um breve lapso na minha análise estratégica. Poderia repetir ou gostaria de falar direto com um consultor?",
      shouldRedirect: true
    };
  }
  return output;
}
