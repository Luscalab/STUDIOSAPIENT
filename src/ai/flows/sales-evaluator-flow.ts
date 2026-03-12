
'use server';
/**
 * @fileOverview Avaliador de Talentos de Vendas Sapient - Cenário Marmoraria Granito Fino.
 * Analisa a transcrição do pitch e a resposta à objeção com foco em diagnóstico estratégico.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesEvaluationInputSchema = z.object({
  candidateName: z.string(),
  pitchTranscription: z.string().describe("A transcrição do áudio do pitch de abordagem inicial ao Sr. Jorge."),
  objectionHandling: z.string().describe("Como o candidato respondeu à objeção de 'gasto vs investimento' e o agendamento."),
});

const SalesEvaluationOutputSchema = z.object({
  score: z.number().min(0).max(100).describe("Nota de 0 a 100 para a capacidade de diagnóstico estratégico e persuasão."),
  feedback: z.string().describe("Feedback técnico detalhado simulando a visão do Diretor Comercial Lucas."),
  verdict: z.enum(['APROVADO', 'TREINAMENTO', 'REPROVADO']).describe("Veredito final baseado no perfil studiosapient (Autoridade, Dados e Escuta)."),
  strongPoints: z.array(z.string()).describe("Pontos fortes identificados na fala/texto."),
  weakPoints: z.array(z.string()).describe("Pontos que precisam de melhoria imediata."),
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

/**
 * Prompt especializado no cenário "Sr. Jorge" com foco em diagnóstico.
 */
const evaluatePrompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial Sênior da studiosapient. 
Sua missão é avaliar um candidato a vendedor (SDR/Closer) em um cenário de Roleplay Realista e Cruel.

CENÁRIO: Marmoraria Granito Fino (Nicho de Luxo).
LEAD: Sr. Jorge (Prático, conservador, acha que design é frescura).
DADOS DE GARGALO ENTREGUES AO CANDIDATO: 
1. Site não funciona em celulares (85% do tráfego).
2. Invisibilidade no Google Local (perda de market share).
3. Marca de elite com "fachada digital" de armazém barato.

DADOS DO TESTE:
Candidato: {{{candidateName}}}
Fase 1 (Abordagem por Áudio Transcrito): {{{pitchTranscription}}}
Fase 2 (Objeção e Agendamento por Texto): {{{objectionHandling}}}

CRITÉRIOS DE AVALIAÇÃO (O QUE BUSCAMOS):
1. DIAGNÓSTICO VS VENDA: O candidato usou os dados de gargalo (mobile/google)? Ele provou pro Sr. Jorge que ele está perdendo dinheiro? Se ele tentou "vender site bonito", ele falhou. Buscamos "venda de solução de problema".
2. QUEBRA DE GELO: Ele foi direto ao ponto? Ele evitou o clichê "tem um minuto?" que faz o Sr. Jorge desligar?
3. ARGUMENTO DE ROI (Custo de Oportunidade): Ele usou o fator "concorrência nova roubando clientes tradicionais"?
4. ANCORAGEM E AGENDAMENTO: Ele evitou dar preço direto e focou no handover para o "Diretor Lucas"? Ele criou um compromisso firme com horário específico?

Gere um veredito rigoroso. Queremos consultores, não robôs de telemarketing. Seja técnico no seu feedback e use um tom de mentor comercial experiente.`,
});

/**
 * Fluxo de execução da avaliação.
 */
const evaluateSalesFlow = ai.defineFlow(
  {
    name: 'evaluateSalesFlow',
    inputSchema: SalesEvaluationInputSchema,
    outputSchema: SalesEvaluationOutputSchema,
  },
  async (input) => {
    const { output } = await evaluatePrompt(input);
    if (!output) {
      throw new Error("Falha na geração da análise de vendas.");
    }
    return output;
  }
);

/**
 * Wrapper para exportação do serviço de avaliação.
 */
export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  return evaluateSalesFlow(input);
}
