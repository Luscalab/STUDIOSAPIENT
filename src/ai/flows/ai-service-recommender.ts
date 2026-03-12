'use server';

/**
 * @fileOverview Inteligência de Diagnóstico Sapient V5.0 - Motor de Raciocínio Cognitivo.
 * 
 * Este fluxo utiliza IA para conduzir um diagnóstico estratégico adaptativo.
 * Corrigido para exportar apenas funções assíncronas conforme regras do Next.js.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A resposta empática e estratégica do consultor.'),
  suggestedActions: z.array(z.string()).describe('Botões de ação rápida para o usuário.'),
  isMultiSelect: z.boolean().describe('Se as ações sugeridas permitem seleção múltipla.'),
  isTextInputEnabled: z.boolean().describe('Se o campo de texto deve estar aberto para o usuário.'),
  shouldRedirect: z.boolean().describe('Se o diagnóstico terminou e deve encaminhar para o WhatsApp.'),
  currentLayer: z.number().describe('O estágio atual do diagnóstico (1-7).'),
  extractedData: z.object({
    niche: z.string().optional(),
    platforms: z.array(z.string()).optional(),
    websiteUrl: z.string().optional(),
    mainPainPoints: z.array(z.string()).optional(),
    goals: z.array(z.string()).optional(),
    companyName: z.string().optional()
  }).optional().describe('Dados estruturados capturados durante a conversa.')
});

// Exportamos apenas o TIPO para o cliente, não o objeto schema.
export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const RecommenderInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })),
  currentMessage: z.string()
});

export type RecommenderInput = z.infer<typeof RecommenderInputSchema>;

/**
 * Função principal de recomendação e diagnóstico.
 * Unica exportação de valor permitida no arquivo 'use server'.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    output: { schema: RecommenderOutputSchema },
    system: `Você é o Consultor Estratégico Sênior da Sapient Studio. Seu tom é impecável, técnico, porém acessível, focado em autoridade e clareza visual.
    
    OBJETIVO: Conduzir um diagnóstico para qualificar um lead de forma fluida.
    
    SEQUÊNCIA DE DIAGNÓSTICO:
    1. Identificar com o que o cliente trabalha (Nicho).
    2. Descobrir por onde chegam os clientes hoje (Instagram, Google Ads, Site, Indicações).
    3. Se o cliente mencionou ter um site, peça o link para "auditoria prévia".
    4. Identificar as dores de negócio (Ex: Muitos curiosos, visual amador).
    5. Definir o objetivo para os próximos 90 dias.
    6. Pedir o nome oficial da empresa.
    7. Concluir e sinalizar shouldRedirect=true.
    
    REGRAS:
    - Seja ADAPTATIVO: se a informação já foi dada, não pergunte novamente.
    - Se o usuário pedir para falar com humano ou demonstrar urgência, defina shouldRedirect=true imediatamente.
    - Respostas curtas e impactantes (máximo 3 frases).`,
    prompt: [
      { text: `Histórico da conversa: ${JSON.stringify(input.history)}` },
      { text: `Última mensagem do usuário: ${input.currentMessage}` }
    ]
  });

  if (!output) {
    throw new Error('Falha no processamento cognitivo do consultor.');
  }

  return output;
}
