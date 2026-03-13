
'use server';
/**
 * @fileOverview Avaliador de Talentos de Vendas Sapient Studio.
 * Análise de intenção, tom e autoridade técnica.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesEvaluationInputSchema = z.object({
  candidateName: z.string(),
  pitchAudioUri: z.string().describe("O áudio do pitch gravado pelo candidato como Data URI."),
  pitchTranscription: z.string().optional().describe("Transcrição textual opcional."),
  objectionHandling: z.string().describe("Resposta escrita à objeção do cliente."),
});

const SalesEvaluationOutputSchema = z.object({
  score: z.number().min(0).max(100).describe("Nota de 0 a 100 baseada na autoridade e técnica de fechamento."),
  feedback: z.string().describe("Feedback direto do Diretor Comercial Lucas Souza."),
  verdict: z.enum(['APROVADO', 'TREINAMENTO', 'REPROVADO']).describe("Veredito baseado no perfil studiosapient."),
  strongPoints: z.array(z.string()).describe("Pontos fortes identificados na fala ou escrita."),
  weakPoints: z.array(z.string()).describe("Pontos de melhoria ou erros estratégicos."),
  intentAnalysis: z.string().describe("Dicionário de intenção: análise da agressividade e clareza do fechamento."),
  toneAnalysis: z.string().describe("Dicionário de tom: análise da autoridade vocal e firmeza técnica.")
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

/**
 * Prompt Multimodal que analisa intenção e tom para chegar a uma conclusão de contratação.
 */
const evaluatePrompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial Sênior da studiosapient.
Sua missão é realizar um diagnóstico neural do candidato com base em dois dicionários críticos: INTENÇÃO e TOM DE VOZ.

CENÁRIO: Marmoraria Granito Fino.
CLIENTE: Sr. Jorge (cético, focado em "boca a boca").

DADOS DA AVALIAÇÃO:
Candidato: {{{candidateName}}}
Pitch Vocal (Analise o TOM): {{media url=pitchAudioUri}}
Transcrição: {{{pitchTranscription}}}
Contorno de Objeção (Analise a INTENÇÃO): {{{objectionHandling}}}

DIRETRIZES DE CONCLUSÃO:
1. DICIONÁRIO DE TOM: Avalie se a voz transmite AUTORIDADE (roi, lucro, estratégia) ou HESITAÇÃO (talvez, acho).
2. DICIONÁRIO DE INTENÇÃO: Avalie se o objetivo é FECHAMENTO (contrato, escala) ou apenas INFORMAÇÃO.
3. VERDITO: APROVADO se o tom for de autoridade e a intenção for de fechamento. REPROVADO se houver hesitação ou falta de clareza sobre GMN/ROI.

Gere o dossiê detalhando a análise de intenção e tom.`,
});

export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  try {
    const { output } = await evaluatePrompt(input);
    
    if (!output) {
      throw new Error("A IA não conseguiu processar os dados neurais.");
    }
    
    return output;
  } catch (err: any) {
    console.error("ERRO CRÍTICO IA SAPIENT:", err);
    throw new Error("Falha na comunicação com o motor de IA. Verifique os logs do Vercel.");
  }
}
