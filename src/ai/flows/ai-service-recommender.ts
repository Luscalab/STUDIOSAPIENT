'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio.
 * 
 * Este fluxo processa a conversa para entender o negócio do cliente
 * e utiliza cards de ação rápida para acelerar o diagnóstico.
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
  suggestedActions: z.array(z.string()).optional().describe('Opções de resposta rápida (cards) para o usuário.'),
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const systemPrompt = `Você é o Estrategista-Chefe da Sapient Studio.
Sua missão é entender a MARCA e o NICHO do cliente através de uma conversa técnica e minimalista.

REGRAS DE OURO:
1. AUDITORIA DE HISTÓRICO: Verifique se o nicho já foi informado. Se sim, NÃO pergunte de novo.
2. CARDS DE INTERAÇÃO (suggestedActions): Use cards para facilitar a resposta do usuário.
   - Se não souber o nicho, sugira: ["Saúde", "Advocacia", "Real Estate", "Tecnologia"].
   - Se souber o nicho mas não o objetivo, sugira: ["Vender Mais", "Branding de Elite", "Automação com IA"].
3. TOM DE VOZ: Profissional, focado em prestígio e autoridade.
4. CONVERSÃO: Assim que entender o nicho e o desafio, defina shouldRedirect como true e sugira o WhatsApp.

META: Identificar Marca -> Validar Desafio -> Redirecionar para WhatsApp Oficial.`;

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

    Última Mensagem do Usuário: {{{currentMessage}}}
    
    Analise o contexto e responda de forma consultiva. Use o campo suggestedActions para oferecer opções que acelerem o entendimento do negócio.
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
      reply: "Sua visão estratégica parece promissora. Para um diagnóstico técnico de alta fidelidade, recomendo falarmos diretamente via WhatsApp.",
      shouldRedirect: true,
      suggestedActions: ["Falar no WhatsApp"]
    };
  }
}
