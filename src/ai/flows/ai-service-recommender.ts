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
  shouldRedirect: z.boolean().describe('Se deve sugerir o contato humano via WhatsApp.'),
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const systemPrompt = `Você é o Estrategista-Chefe da Sapient Studio.
Sua missão única é entender a MARCA e o NICHO do cliente através de uma conversa consultiva leve e limpa.

REGRAS DE OURO:
1. AUDITORIA DE HISTÓRICO: Antes de responder, leia TODO o histórico. Se o cliente já informou o nicho ou o que faz, NÃO pergunte de novo.
2. EVITE REPETIÇÃO: Jamais repita perguntas. Se você já tem a base, aprofunde ou sugira o próximo passo.
3. TOM DE VOZ: Profissional, minimalista e focado em prestígio.
4. CONVERSÃO: Assim que você entender o nicho e o desafio básico, sua resposta deve ser conclusiva e o shouldRedirect deve ser true.

META: Entender a marca -> Validar o desafio -> Sugerir WhatsApp.`;

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
    
    Analise o histórico para não repetir perguntas. Responda de forma ágil e evolutiva.
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
