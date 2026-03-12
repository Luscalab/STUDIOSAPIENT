
'use server';
/**
 * @fileOverview Avaliador de Talentos de Vendas Sapient - Análise Multimodal de Alta Fidelidade.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Aumenta o tempo de execução para suportar o processamento de áudio no Vercel
export const maxDuration = 60;

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
 */
const evaluatePrompt = ai.definePrompt({
  name: 'evaluateSalesCandidatePrompt',
  input: { schema: SalesEvaluationInputSchema },
  output: { schema: SalesEvaluationOutputSchema },
  prompt: `Você é o Diretor Comercial Sênior da studiosapient.
Sua missão é avaliar um candidato a vendedor (SDR/Closer) através de uma simulação de vendas.

CENÁRIO: Marmoraria Granito Fino.
CLIENTE: Sr. Jorge (30 anos de mercado, prático, cético com digital).
GARGALOS TÉCNICOS: Site obsoleto (perda de 85% mobile), Invisibilidade no Google Meu Negócio, Branding amador.

DADOS DA AVALIAÇÃO:
Candidato: {{{candidateName}}}
Fase 1 (Áudio da Abordagem): {{media url=pitchAudioUri}}
Fase 2 (Resposta à Objeção): {{{objectionHandling}}}

SUA ANÁLISE DEVE CONSIDERAR:
1. AUTORIDADE VOCAL: O áudio passa segurança ou hesitação? Ele fala com "fome" de venda ou parece um robô?
2. DIAGNÓSTICO: Ele citou que o Sr. Jorge está PERDENDO DINHEIRO (custo de oportunidade) por causa do site mobile e do Google Maps?
3. ARGUMENTAÇÃO: Ele focou em ROI (Retorno sobre Investimento) ou tentou vender "estética"? Na Sapient, vendemos lucro.
4. CONTORNO DE OBJEÇÃO: Como ele reagiu à frase "o boca a boca é suficiente"? Ele provou que o digital potencializa o boca a boca?

Gere um veredito direto e profissional.`,
});

export async function evaluateSalesCandidate(input: z.infer<typeof SalesEvaluationInputSchema>): Promise<SalesEvaluationOutput> {
  try {
    const { output } = await evaluatePrompt(input);
    if (!output) throw new Error("A IA não retornou um resultado válido.");
    return output;
  } catch (err) {
    console.error("Erro no fluxo de avaliação:", err);
    throw new Error("Falha na comunicação com o motor de IA. Verifique sua conexão ou tente um áudio mais curto.");
  }
}
