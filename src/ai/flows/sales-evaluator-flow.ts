
'use server';
/**
 * @fileOverview Avaliador de Talentos de Vendas Sapient - Análise Multimodal.
 * Agora utiliza o áudio direto para avaliar autoridade, tom de voz e clareza.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesEvaluationInputSchema = z.object({
  candidateName: z.string(),
  pitchAudioUri: z.string().describe("O áudio do pitch gravado pelo candidato como Data URI."),
  pitchTranscription: z.string().optional().describe("Transcrição opcional do áudio."),
  objectionHandling: z.string().describe("Como o candidato respondeu à objeção por escrito."),
});

const SalesEvaluationOutputSchema = z.object({
  score: z.number().min(0).max(100).describe("Nota de 0 a 100 para a capacidade de diagnóstico estratégico e persuasão."),
  feedback: z.string().describe("Feedback técnico detalhado simulando a visão do Diretor Comercial Lucas."),
  verdict: z.enum(['APROVADO', 'TREINAMENTO', 'REPROVADO']).describe("Veredito final baseado no perfil studiosapient."),
  strongPoints: z.array(z.string()).describe("Pontos fortes identificados."),
  weakPoints: z.array(z.string()).describe("Pontos que precisam de melhoria."),
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

/**
 * Prompt Multimodal especializado que "ouve" o candidato.
 */
const evaluatePrompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial Sênior da studiosapient. 
Sua missão é avaliar um candidato a vendedor (SDR/Closer) em um cenário de Roleplay Realista.

CENÁRIO: Marmoraria Granito Fino (Nicho de Luxo).
LEAD: Sr. Jorge (Prático, conservador).
DADOS DE GARGALO: Site lento/não-mobile, invisibilidade no Google Local, branding amador.

DADOS DO TESTE:
Candidato: {{{candidateName}}}
Fase 1 (Abordagem por Áudio): {{media url=pitchAudioUri}}
Fase 2 (Objeção e Agendamento por Texto): {{{objectionHandling}}}

CRITÉRIOS DE AVALIAÇÃO:
1. AUTORIDADE VOCAL: Analise o áudio. Ele fala com confiança? A voz passa credibilidade ou insegurança?
2. DIAGNÓSTICO: Ele usou os dados de gargalo (Google Meu Negócio, Mobile)? Ele provou que o Sr. Jorge está perdendo dinheiro?
3. ARGUMENTO DE ROI: Ele focou no lucro ou tentou "vender site bonito"?
4. ANCORAGEM: Como ele saiu da pressão de preço?

Gere um veredito rigoroso. Queremos consultores estratégicos.`,
});

export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  const { output } = await evaluatePrompt(input);
  if (!output) throw new Error("Falha na geração da análise de vendas.");
  return output;
}
