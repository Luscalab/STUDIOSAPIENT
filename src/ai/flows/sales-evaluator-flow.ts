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

export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  const prompt = ai.definePrompt({
    name: 'evaluateSalesCandidatePrompt',
    input: { schema: SalesEvaluationInputSchema },
    output: { schema: SalesEvaluationOutputSchema },
    prompt: `Você é o Diretor Comercial Sênior da studiosapient. 
Sua missão é avaliar um candidato a vendedor (SDR/Closer) em um cenário de Roleplay Realista.

Cenário: Marmoraria Granito Fino (Nicho de Luxo).
Lead: Sr. Jorge (Prático, conservador, acha que design é frescura, mas quer vender mais).

DADOS DO TESTE:
Candidato: {{{candidateName}}}
Fase 1 (Abordagem por Áudio): {{{pitchTranscription}}}
Fase 2 (Objeção e Agendamento por Texto): {{{objectionHandling}}}

CRITÉRIOS DE AVALIAÇÃO (O QUE BUSCAMOS):
1. QUEBRA DE GELO: O candidato foi direto ao ponto ou pediu "um minuto"? (Sr. Jorge odeia perder tempo).
2. ARGUMENTO DE VALOR: Ele usou a concorrência e a perda de novos clientes (jovens) para provar que design não é gasto?
3. ANCORAGEM: Ele evitou dar preço direto e focou no diagnóstico e no ROI?
4. AGENDAMENTO: Ele criou compromisso firme para a reunião com o Diretor Lucas ou foi vago?

Gere um veredito rigoroso. Queremos vendedores que saibam transformar um 'gargalo técnico' em um 'desejo de negócio'.`,
  });

  const { output } = await prompt(input);
  return output!;
}
