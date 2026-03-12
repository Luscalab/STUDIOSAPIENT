
'use server';
/**
 * @fileOverview Avaliador de Talentos de Vendas Sapient - Análise Multimodal de Alta Fidelidade.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Configurações de tempo de execução para o Vercel suportar processamento de áudio
export const maxDuration = 60;
export const runtime = 'nodejs';

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
});

export type SalesEvaluationOutput = z.infer<typeof SalesEvaluationOutputSchema>;

/**
 * Prompt Multimodal especializado que "ouve" o candidato.
 * Explicitamente definido para usar o Gemini 1.5 Flash.
 */
const evaluatePrompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial Sênior da studiosapient.
Sua missão é avaliar um candidato a vendedor através de uma simulação de vendas técnica e agressiva.

CENÁRIO: Marmoraria Granito Fino.
CLIENTE: Sr. Jorge (30 anos de mercado, prático, cético com digital).
GARGALOS TÉCNICOS: Site obsoleto (perda de 85% mobile), Invisibilidade no Google Meu Negócio, Branding amador.

DADOS DA AVALIAÇÃO:
Candidato: {{{candidateName}}}
Fase 1 (Análise Vocal do Pitch): {{media url=pitchAudioUri}}
Fase 2 (Contorno de Objeção): {{{objectionHandling}}}

DIRETRIZES DE AVALIAÇÃO:
1. AUTORIDADE: O candidato fala com convicção ou hesitação?
2. DIAGNÓSTICO: Ele provou que o Sr. Jorge está PERDENDO DINHEIRO agora?
3. ROI: Ele focou em lucro e eficiência ou apenas em estética?
4. OBJEÇÃO: Ele soube reverter a frase "o boca a boca é suficiente"?

Gere um dossiê com score, pontos fortes, pontos fracos e o feedback oficial.`,
});

export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  try {
    // Garante que o Base64 seja processado corretamente
    const { output } = await evaluatePrompt(input);
    
    if (!output) {
      throw new Error("A IA processou o áudio mas não conseguiu estruturar a resposta. Tente um áudio mais conciso.");
    }
    
    return output;
  } catch (err: any) {
    console.error("ERRO CRÍTICO IA SAPIENT:", err);
    
    // Tratamento específico para timeouts ou falhas de hardware
    if (err.message?.includes('timeout')) {
      throw new Error("O processamento do áudio excedeu o tempo limite. Tente gravar um pitch de no máximo 20 segundos.");
    }
    
    throw new Error("Falha na comunicação com o motor de IA. Verifique se a chave de API está configurada no Vercel como GOOGLE_GENAI_API_KEY.");
  }
}
