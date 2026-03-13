
'use server';
/**
 * @fileOverview Fluxo de avaliação de candidatos a vendas utilizando Gemini 1.5 Pro.
 * Analisa as respostas técnicas e o pitch comercial.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesEvaluationInputSchema = z.object({
  name: z.string(),
  ansAds: z.string(),
  ansSites: z.string(),
  ansDesign: z.string(),
  ansNarrativa: z.string(),
  pitchAudioUri: z.string().describe("Data URI do áudio do pitch em Base64.")
});

export type SalesEvaluationInput = z.infer<typeof SalesEvaluationInputSchema>;

const SalesEvaluationOutputSchema = z.object({
  score: z.number().describe("Pontuação de 0 a 100."),
  feedback: z.string().describe("Feedback detalhado sobre a performance."),
  verdict: z.enum(['APROVADO', 'REPROVADO', 'POTENCIAL']).describe("Veredito da IA."),
  strongPoints: z.array(z.string()),
  weakPoints: z.array(z.string()),
  analysis: z.string().describe("Análise técnica profunda do perfil comercial.")
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

export async function evaluateSalesCandidate(input: SalesEvaluationInput): Promise<SalesEvaluationOutput> {
  return evaluateSalesCandidateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial da studiosapient, uma agência de elite focada em Estratégia, Design e Performance Digital.
Sua missão é avaliar um candidato a vendedor com base em suas respostas técnicas e seu pitch vocal.

Nossos Pilares:
1. Performance Ads: Foco em ROI e busca de urgência (Google Ads).
2. Sites Premium: Engenharia de conversão e velocidade extrema.
3. Design Estratégico: Semiótica de luxo e autoridade visual.
4. Narrativa Visual: Dossiês de venda de alto impacto emocional.

Candidato: {{{name}}}

Respostas do Candidato:
- Performance Ads: {{{ansAds}}}
- Sites Premium: {{{ansSites}}}
- Design Estratégico: {{{ansDesign}}}
- Narrativa Visual: {{{ansNarrativa}}}

Pitch Comercial (Áudio):
{{media url=pitchAudioUri}}

Instruções de Avaliação:
1. Avalie a clareza técnica: O candidato entende que vendemos ROI e Autoridade, não apenas 'serviços'?
2. Avalie o tom de voz no áudio: Ele transmite confiança, energia e autoridade?
3. Gere um Score de 0 a 100.
4. Defina o Veredito: APROVADO (Pronto para fechar), POTENCIAL (Precisa de treino) ou REPROVADO (Não alinhado).

Forneça um feedback construtivo e direto.`,
});

const evaluateSalesCandidateFlow = ai.defineFlow(
  {
    name: 'evaluateSalesCandidateFlow',
    inputSchema: SalesEvaluationInputSchema,
    outputSchema: SalesEvaluationOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
