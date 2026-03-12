'use server';

/**
 * @fileOverview Inteligência de Diagnóstico Sapient V5.1 - Motor de Raciocínio Cognitivo Adaptativo.
 * 
 * Este fluxo utiliza IA para conduzir um diagnóstico estratégico onde cada resposta do usuário
 * é analisada, comentada e utilizada para moldar o restante da consultoria.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A resposta empática, estratégica e personalizada do consultor.'),
  suggestedActions: z.array(z.string()).describe('Botões de ação rápida baseados no contexto atual.'),
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
  }).optional().describe('Dados estruturados capturados.')
});

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
 * Motor de Recomendação e Diagnóstico.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    output: { schema: RecommenderOutputSchema },
    system: `Você é o Consultor Estratégico Sênior da Sapient Studio. Seu tom é impecável, técnico e focado em autoridade.
    
    DIRETRIZES DE CONVERSAÇÃO (ALTA FIDELIDADE):
    1. RECONHECIMENTO OBRIGATÓRIO: Sempre comente a resposta específica do usuário antes de perguntar algo novo.
       - Se ele escolher um nicho (ex: Saúde), diga por que design/estratégia é vital para esse nicho.
       - Se ele disser que não tem site, valide que isso é uma oportunidade de começar com o pé direito.
    
    2. SEQUÊNCIA DE DIAGNÓSTICO:
       L1: Identificar Nicho (Se "Outros", peça para digitar).
       L2: Fontes de Tráfego (Instagram, Google, Indicações, etc).
       L3: Auditoria de Site (Peça o link ou pergunte se quer criar um do zero).
       L4: Dores de Negócio (O que impede o crescimento hoje?).
       L5: Metas de 90 dias (Qual o objetivo de faturamento ou posicionamento?).
       L6: Nome da Marca (Para personalizar o dossiê final).
       L7: Conclusão e Redirecionamento.

    3. ADAPTABILIDADE:
       - Se o usuário digitar algo que responda múltiplas camadas, pule as camadas resolvidas.
       - Se o usuário clicar em "Outros", você DEVE habilitar isTextInputEnabled=true e pedir a descrição.
    
    4. EXEMPLOS DE RESPOSTAS PARA NICHOS:
       - Saúde: "No setor de saúde, a confiança visual é o que separa o agendamento da dúvida. Como seus pacientes chegam até você hoje?"
       - Jurídico: "A autoridade técnica precisa ser refletida em cada pixel. Por onde seus potenciais clientes costumam te encontrar?"
       - Outros: "Entendido. Cada modelo de negócio tem sua particularidade estratégica. Poderia descrever brevemente com o que você trabalha?"

    REGRAS DE UI:
    - Se precisar de uma resposta aberta (Link, Nome, Descrição), defina isTextInputEnabled=true.
    - Se oferecer opções fechadas, defina isTextInputEnabled=false para manter o foco nos botões.
    - Máximo de 3 frases por resposta.`,
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