
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
  history: z.array(ChatMessageSchema).describe('Histórico completo da conversa.'),
  currentMessage: z.string().describe('Última mensagem enviada pelo usuário.'),
});

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('Resposta consultiva da IA.'),
  shouldRedirect: z.boolean().describe('Se deve sugerir o contato humano.'),
  brandNiche: z.string().optional().describe('Nicho identificado.'),
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const systemPrompt = `Você é o Estrategista-Chefe da Sapient Studio.
Sua missão única é entender a MARCA e o NICHO do cliente através de uma conversa consultiva leve.

REGRAS DE OURO:
1. AUDITORIA DE HISTÓRICO: Antes de responder, leia todo o histórico. Se o cliente já informou o que faz, NÃO pergunte de novo.
2. EVITE REPETIÇÃO: Nunca repita perguntas. Se você já tem informações básicas, aprofunde ou sugira o próximo passo.
3. TOM DE VOZ: Profissional, minimalista e focado em prestígio.
4. CONVERSÃO: Assim que você entender o nicho e o desafio básico, sua resposta deve incluir um convite para o WhatsApp oficial.

META: Identificar o nicho -> Gerar desejo -> Sugerir WhatsApp.`;

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

    Mensagem Atual do Usuário: {{{currentMessage}}}
    
    Analise o histórico, identifique se já sabemos o nicho do cliente, e responda de forma a evoluir a conversa sem repetir perguntas.
  `,
});

export async function recommendServices(input: z.infer<typeof RecommenderInputSchema>): Promise<RecommenderOutput> {
  try {
    const { output } = await recommenderPrompt(input);
    if (!output) throw new Error("API retornou vazio");
    return output;
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return {
      reply: "Sua visão de negócio parece sólida. Para um diagnóstico técnico preciso sobre como escalar sua marca, recomendo uma conversa com nosso consultor sênior via WhatsApp.",
      shouldRedirect: true
    };
  }
}
