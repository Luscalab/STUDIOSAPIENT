'use server';
/**
 * @fileOverview Avaliador de Talentos de Vendas Sapient - Cenário Marmoraria Granito Fino.
 * Analisa a transcrição do pitch e a resposta à objeção do Sr. Jorge.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesEvaluationInputSchema = z.object({
  candidateName: z.string(),
  pitchTranscription: z.string().describe("A transcrição do áudio do pitch de abordagem inicial ao Sr. Jorge."),
  objectionHandling: z.string().describe("Como o candidato respondeu à objeção de 'gasto vs investimento' e o agendamento."),
});

const SalesEvaluationOutputSchema = z.object({
  score: z.number().min(0).max(100).describe("Nota de 0 a 100 para a capacidade de fechamento e persuasão."),
  feedback: z.string().describe("Feedback técnico detalhado simulando a visão do Diretor Comercial."),
  verdict: z.enum(['APROVADO', 'TREINAMENTO', 'REPROVADO']).describe("Veredito final baseado no perfil studiosapient."),
  strongPoints: z.array(z.string()).describe("Pontos fortes identificados na fala/texto."),
  weakPoints: z.array(z.string()).describe("Pontos que precisam de melhoria imediata."),
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

/**
 * Prompt especializado no cenário "Sr. Jorge".
 * Define as diretrizes de análise para a IA.
 */
const evaluatePrompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial Sênior da studiosapient. 
Sua missão é avaliar um candidato a vendedor (SDR/Closer) em um cenário de Roleplay Realista e Cruel.

CENÁRIO: Marmoraria Granito Fino (Nicho de Luxo).
LEAD: Sr. Jorge (Prático, conservador, acha que design é frescura, mas quer vender mais). Ele é resistente e odeia perder tempo.

DADOS DO TESTE:
Candidato: {{{candidateName}}}
Fase 1 (Abordagem por Áudio Transcrito): {{{pitchTranscription}}}
Fase 2 (Objeção e Agendamento por Texto): {{{objectionHandling}}}

CRITÉRIOS DE AVALIAÇÃO (O QUE BUSCAMOS):
1. QUEBRA DE GELO: O candidato foi direto ao ponto? Ele usou a abordagem "Sr. Jorge, notei que sua marmoraria é referência, mas seu site está dificultando novos orçamentos pelo celular"? Se ele pediu "um minuto", ele perdeu o Sr. Jorge.
2. ARGUMENTO DE VALOR (ROI): Ele conseguiu provar que design não é gasto? Ele usou o fator "CONCORRÊNCIA" (ex: novos concorrentes no Instagram roubando clientes jovens)?
3. ANCORAGEM: Ele evitou dar preço direto? O foco deve ser no "DIAGNÓSTICO".
4. AGENDAMENTO: Ele criou um compromisso firme? O objetivo é o handover para o "Diretor Lucas". Ele usou um horário específico?

Gere um veredito rigoroso. Queremos vendedores que saibam transformar um 'gargalo técnico' em um 'desejo de negócio'. Seja técnico no seu feedback.`,
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
