
'use server';
/**
 * @fileOverview Motor de Avaliação Multimodal studio sapient.
 * Analisa voz, transcrição e contorno de objeções com foco em ROI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesEvaluationInputSchema = z.object({
  candidateName: z.string(),
  pitchAudioUri: z.string().describe("Data URI do áudio gravado."),
  pitchTranscription: z.string().optional().describe("Transcrição textual."),
  objectionHandling: z.string().describe("Resposta à objeção do cliente."),
});

const SalesEvaluationOutputSchema = z.object({
  score: z.number().min(0).max(100).describe("Nota baseada na autoridade vocal e técnica."),
  feedback: z.string().describe("Feedback direto do Diretor Lucas Souza."),
  verdict: z.enum(['APROVADO', 'TREINAMENTO', 'REPROVADO']).describe("Veredito studiosapient."),
  strongPoints: z.array(z.string()).describe("Pontos fortes técnicos."),
  weakPoints: z.array(z.string()).describe("Gargalos identificados."),
  intentAnalysis: z.string().describe("Análise semântica da intenção."),
  toneAnalysis: z.string().describe("Análise da autoridade vocal.")
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

const evaluatePrompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial da studiosapient.
Sua missão é avaliar se o candidato tem autoridade para vender serviços de alto valor.

CENÁRIO: Marmoraria Granito Fino (Sr. Jorge).
CLIENTE: Cético, focado em "boca a boca".

DADOS:
Candidato: {{{candidateName}}}
Pitch Vocal (Analise o TOM e AUTORIDADE): {{media url=pitchAudioUri}}
Transcrição: {{{pitchTranscription}}}
Resposta à Objeção (Analise a INTENÇÃO de ROI): {{{objectionHandling}}}

DIRETRIZES:
1. TOM: A voz transmite convicção ou dúvida? Ele fala de "ROI/Lucro" ou apenas "Marketing"?
2. INTENÇÃO: O objetivo é fechar um contrato ou apenas dar informação?
3. VERDITO: Seja criterioso. Buscamos fechadores, não atendentes.`,
});

export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  try {
    const { output } = await evaluatePrompt(input);
    
    if (!output) {
      throw new Error("Falha no diagnóstico neural.");
    }
    
    return output;
  } catch (err: any) {
    console.error("ERRO IA SAPIENT:", err);
    throw new Error("Erro de comunicação com o motor de IA.");
  }
}
