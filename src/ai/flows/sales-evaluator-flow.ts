
'use server';
/**
 * @fileOverview Fluxo de avaliação desativado.
 * O recrutamento agora utiliza um modelo de coleta de dados pura para avaliação humana.
 */

export async function evaluateSalesCandidate(input: any): Promise<any> {
  return {
    score: 0,
    feedback: "Aguardando avaliação humana.",
    verdict: "PENDENTE",
    strongPoints: [],
    weakPoints: [],
    intentAnalysis: "N/A",
    toneAnalysis: "N/A"
  };
}
