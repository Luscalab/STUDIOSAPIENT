'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio.
 * 
 * Fluxo estratégico que entende o nicho do cliente e qualifica o lead
 * através de uma conversa leve e cards interativos.
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
Sua missão é entender a MARCA e o NICHO do cliente para uma consultoria técnica de elite.

REGRAS:
1. AUDITORIA DE MEMÓRIA: Analise o histórico. Se o nicho ou desafio já foram ditos, NÃO pergunte de novo.
2. CARDS INTERATIVOS: Use suggestedActions para sugerir nichos (Saúde, Direito, Real Estate, Tech) ou objetivos.
3. TOM DE VOZ: Profissional, minimalista e focado em prestígio.
4. CONVERSÃO: Assim que entender o nicho e o desafio, defina shouldRedirect como true e direcione para o WhatsApp.`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  system: systemInstructions,
  prompt: `
    Histórico de Diálogo:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    Última Mensagem do Cliente: {{{currentMessage}}}
    
    Analise o contexto e prossiga com o diagnóstico estratégico. Não repita perguntas.
  `,
});

export async function recommendServices(input: z.infer<typeof RecommenderInputSchema>): Promise<RecommenderOutput> {
  try {
    const { output } = await recommenderPrompt(input);
    if (!output) throw new Error("A IA não gerou uma resposta válida.");
    return output;
  } catch (error) {
    console.error("Erro na API Sapient IA:", error);
    return {
      reply: "Sua visão estratégica é promissora. Recomendo um diagnóstico técnico direto com nosso consultor via WhatsApp para avançarmos.",
      shouldRedirect: true,
      suggestedActions: ["Falar com Consultor"]
    };
  }
}
