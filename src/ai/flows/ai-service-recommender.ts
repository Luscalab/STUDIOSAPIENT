
'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio.
 * 
 * Este fluxo processa a conversa para entender o negócio do cliente
 * e decide o momento ideal de redirecionamento para o fechamento humano.
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
  reply: z.string().describe('A resposta consultiva da IA.'),
  shouldRedirect: z.boolean().describe('Se é o momento de sugerir o WhatsApp.'),
  detectedNiche: z.string().optional().describe('Nicho de mercado identificado.'),
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const systemPrompt = `Você é o Estrategista-Chefe da Sapient Studio.
Sua missão é ser o primeiro contato consultivo com potenciais clientes.

OBJETIVO:
1. Entender o NICHO do cliente (O que eles fazem).
2. Identificar o DESAFIO atual (O que os impede de crescer).
3. Manter um tom Profissional, Amigável e de Prestígio.

DIRETRIZES:
- Analise o HISTÓRICO para não repetir perguntas.
- Se o cliente já informou o nicho, não pergunte novamente.
- Assim que entender o cenário básico, sugira que a melhor forma de prosseguir é uma conversa técnica no WhatsApp.
- Se o cliente perguntar o que fazemos: "Somos especialistas em Performance Ads, Design de Prestígio e Ecossistemas de IA".

Sua meta é qualificar o lead e gerar o redirecionamento.`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  prompt: `
    Instruções de Sistema: ${systemPrompt}

    Histórico da Conversa:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    Nova Mensagem do Usuário: {{{currentMessage}}}
    
    Analise e responda de forma estratégica.
  `,
});

export async function recommendServices(input: z.infer<typeof RecommenderInputSchema>): Promise<RecommenderOutput> {
  const { output } = await recommenderPrompt(input);
  if (!output) {
    return {
      reply: "Entendo perfeitamente. Gostaria de aprofundar essa análise estratégica com um de nossos consultores via WhatsApp?",
      shouldRedirect: true
    };
  }
  return output;
}
