'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio.
 * 
 * Implementa o padrão Genkit 1.x onde uma Flow encapsula um Prompt Definido.
 * Foca em qualificação estratégica antes da conversão para o WhatsApp.
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
Sua missão é atuar como a PRIMEIRA PORTA de entrada da agência, realizando uma "internação estratégica" do lead.

DIRETRIZES DE COMPORTAMENTO:
1. CONVERSA PRIMEIRO: Nunca redirecione para o WhatsApp na primeira mensagem. Você deve ser curioso e autoritário.
2. DESCOBERTA: Seu objetivo é identificar o NICHO (ex: médico, advogado, e-commerce) e o DESAFIO (ex: falta de leads, design amador).
3. TOM DE VOZ: Minimalista, sofisticado e técnico. Use um português de negócios impecável.
4. REDIRECIONAMENTO: Apenas defina 'shouldRedirect' como true se você já tiver identificado claramente o nicho E o desafio, OU se o usuário pedir explicitamente para falar com um humano.

FORMATO DE RESPOSTA:
- 'reply': Sua resposta em texto.
- 'suggestedActions': Máximo de 3 opções curtas que ajudem o usuário a responder (ex: "Sou Advogado", "Falta de Clientes").`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    ],
    temperature: 0.7,
  },
  system: systemInstructions,
  prompt: `
    HISTÓRICO DA CONVERSA:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    MENSAGEM ATUAL DO USUÁRIO: {{{currentMessage}}}
    
    INSTRUÇÃO: Analise a mensagem. Se for o início, dê boas-vindas e pergunte sobre o negócio. Se for uma resposta, valide e aprofunde. Se o cenário estiver pronto para venda, sugira o WhatsApp.
  `,
});

const serviceFlow = ai.defineFlow(
  {
    name: 'recommendServicesFlow',
    inputSchema: RecommenderInputSchema,
    outputSchema: RecommenderOutputSchema,
  },
  async (input) => {
    const { output } = await recommenderPrompt(input);
    if (!output) {
      throw new Error("Falha na geração de resposta pela IA.");
    }
    return output;
  }
);

/**
 * Função exportada para uso em Client Components.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  return serviceFlow(input);
}
