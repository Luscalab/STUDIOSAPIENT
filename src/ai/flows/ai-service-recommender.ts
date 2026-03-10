'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio.
 * 
 * Fluxo estratégico que atua como porta de entrada, entende a marca do cliente
 * e gera cards interativos para uma conversação fluida antes do WhatsApp.
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

SCRIPT DE ATENDIMENTO:
1. BOAS-VINDAS: Seja breve, profissional e focado em prestígio.
2. ENTENDIMENTO: Descubra o NICHO (ex: Saúde, Direito, Tecnologia) e o DESAFIO ATUAL (ex: falta de autoridade, poucos leads).
3. QUALIFICAÇÃO: Use o histórico. Se o cliente já disse o nicho, NÃO pergunte de novo. Avance para o desafio.
4. CARDS (suggestedActions): Sempre sugira cards de nichos ou objetivos para facilitar a resposta do cliente.
5. CONVERSÃO: Assim que entender a marca e o desafio, defina shouldRedirect como true e convide-o para o WhatsApp oficial para um diagnóstico técnico detalhado.

TOM DE VOZ: Minimalista, autoritário, mas acessível. Evite textos longos.`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  system: systemInstructions,
  prompt: `
    Histórico:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    Cliente diz: {{{currentMessage}}}
    
    Analise o contexto. Se você já tem informações suficientes sobre a marca, direcione para o WhatsApp. Caso contrário, use cards para guiar o entendimento.
  `,
});

export async function recommendServices(input: z.infer<typeof RecommenderInputSchema>): Promise<RecommenderOutput> {
  try {
    const { output } = await recommenderPrompt(input);
    if (!output) throw new Error("Falha na geração da resposta.");
    return output;
  } catch (error) {
    console.error("Erro Crítico Sapient IA:", error);
    return {
      reply: "Sua visão estratégica é promissora. Recomendo um diagnóstico técnico direto com nosso estrategista via WhatsApp para avançarmos com precisão.",
      shouldRedirect: true,
      suggestedActions: ["Falar com Estrategista"]
    };
  }
}
