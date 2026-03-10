
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

SCRIPT DE ATENDIMENTO DE ELITE:
1. BOAS-VINDAS: Seja breve, profissional e focado em prestígio.
2. AUDITORIA DE MEMÓRIA: Antes de perguntar, veja se o cliente já informou o nicho ou desafio no histórico. NÃO repita perguntas.
3. ENTENDIMENTO: Descubra o NICHO (ex: Saúde, Direito, Tecnologia) e o DESAFIO ATUAL (ex: falta de autoridade, poucos leads).
4. QUALIFICAÇÃO: Utilize os cards para guiar a resposta do cliente.
5. CONVERSÃO: Assim que entender a marca e o desafio, defina shouldRedirect como true e convide-o para o WhatsApp para um diagnóstico técnico de alta fidelidade.

TOM DE VOZ: Minimalista, autoritário, técnico e sofisticado. Use um português impecável de negócios.`;

const recommenderPrompt = ai.definePrompt({
  name: 'recommenderPrompt',
  input: { schema: RecommenderInputSchema },
  output: { schema: RecommenderOutputSchema },
  system: systemInstructions,
  prompt: `
    HISTÓRICO DA CONSULTORIA:
    {{#each history}}
    - {{role}}: {{{content}}}
    {{/each}}

    CLIENTE DIZ: {{{currentMessage}}}
    
    ANALISE:
    1. O cliente já definiu seu nicho?
    2. O desafio foi identificado?
    3. Se sim, ofereça o WhatsApp. Caso contrário, use cards para nichos (Saúde, Advocacia, Tech) ou objetivos (Vender Mais, Branding, IA).
  `,
});

export async function recommendServices(input: z.infer<typeof RecommenderInputSchema>): Promise<RecommenderOutput> {
  try {
    const { output } = await recommenderPrompt(input);
    if (!output) throw new Error("Falha na geração da resposta estratégica.");
    return output;
  } catch (error) {
    console.error("Erro Crítico Sapient IA:", error);
    return {
      reply: "Sua visão estratégica é promissora. Recomendo um diagnóstico técnico direto com nosso estrategista sênior via WhatsApp para avançarmos com precisão cirúrgica.",
      shouldRedirect: true,
      suggestedActions: ["Falar com Estrategista"]
    };
  }
}
