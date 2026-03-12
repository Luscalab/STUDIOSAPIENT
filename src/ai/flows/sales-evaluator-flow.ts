
'use server';
/**
 * @fileOverview Avaliador de Talentos de Vendas Sapient.
 * Analisa a transcrição do pitch do candidato e fornece um score de fechamento.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesEvaluationInputSchema = z.object({
  candidateName: z.string(),
  pitchTranscription: z.string().describe("A transcrição do áudio do pitch do candidato."),
  objectionHandling: z.string().describe("Como o candidato respondeu a uma objeção de preço."),
});

const SalesEvaluationOutputSchema = z.object({
  score: z.number().min(0).max(100).describe("Nota de 0 a 100 para a capacidade de fechamento."),
  feedback: z.string().describe("Feedback detalhado sobre a performance, tom e clareza."),
  verdict: z.enum(['APROVADO', 'TREINAMENTO', 'REPROVADO']).describe("Veredito final do recrutador virtual."),
  strongPoints: z.array(z.string()).describe("Pontos fortes identificados."),
  weakPoints: z.array(z.string()).describe("Pontos que precisam de melhoria."),
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  const prompt = ai.definePrompt({
    name: 'evaluateSalesCandidatePrompt',
    input: { schema: SalesEvaluationInputSchema },
    output: { schema: SalesEvaluationOutputSchema },
    prompt: `Você é o Diretor Comercial Sênior da studiosapient. 
Sua missão é avaliar um candidato a vendedor (SDR/Closer) com base na transcrição do pitch de vendas dele e na resposta a uma objeção de preço.

Candidato: {{{candidateName}}}
Transcrição do Pitch: {{{pitchTranscription}}}
Resposta à Objeção: {{{objectionHandling}}}

Critérios de Avaliação:
1. Clareza na entrega do valor da studiosapient (design estratégico, ROI, autoridade).
2. Persuasão e confiança na voz (inferida pela transcrição).
3. Capacidade de contornar a objeção "Está muito caro" com autoridade, não baixando o preço, mas reforçando o valor.
4. Uso de gatilhos mentais (exclusividade, autoridade, prova social).

Gere um feedback técnico e direto, avaliando se ele tem o "perfil studiosapient" de elite.`,
  });

  const { output } = await prompt(input);
  return output!;
}
