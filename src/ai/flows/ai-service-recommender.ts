'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio.
 * 
 * Fluxo estratégico que atua como porta de entrada, entende a marca do cliente
 * e gera cards interativos para uma conversação fluida antes do WhatsApp.
 * Implementa um script de "internação" de elite.
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

const systemInstructions = `Você é o Estrategista-Chefe da Sapient Studio.
Sua missão é atuar como a PRIMEIRA PORTA de entrada da agência, realizando uma internação estratégica do lead.

OBJETIVO: Você deve conversar com o lead. NÃO redirecione para o WhatsApp na primeira mensagem.

DIRETRIZES:
1. AUDITORIA: Analise o histórico e o que o cliente disse agora.
2. QUALIFICAÇÃO: Você precisa descobrir o NICHO e o DESAFIO do cliente.
3. INTERAÇÃO: Use o campo 'reply' para ser persuasivo e o campo 'suggestedActions' para dar opções (ex: "Tenho um Consultório", "Sou Advogado", "Quero Vender Mais").
4. REDIRECIONAMENTO: Apenas defina 'shouldRedirect' como true se o cliente explicitamente pedir para falar com alguém ou se você já tiver identificado o nicho e o desafio claramente.

TOM DE VOZ: Minimalista, autoritário, técnico e sofisticado. Use um português impecável de negócios.`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  system: systemInstructions,
  prompt: `
    HISTÓRICO:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    MENSAGEM ATUAL DO CLIENTE: {{{currentMessage}}}
    
    INSTRUÇÃO: Analise se já sabemos o nicho e o desafio. Se não, pergunte. Se sim, valide e ofereça o WhatsApp.
  `,
});

export async function recommendServices(input: z.infer<typeof RecommenderInputSchema>): Promise<RecommenderOutput> {
  // Chamada direta do prompt conforme Genkit 1.x
  const { output } = await recommenderPrompt(input);
  if (!output) {
    throw new Error("O motor de IA não gerou uma saída válida.");
  }
  return output;
}
