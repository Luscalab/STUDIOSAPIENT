'use server';

/**
 * @fileOverview Motor de Atendimento Sapient - Fluxo Simples e Direto.
 * 
 * Sequência de 7 perguntas para entender o negócio do cliente sem usar termos complicados.
 */

import { z } from 'genkit';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A pergunta do consultor.'),
  suggestedActions: z.array(z.string()).describe('Opções de botões.'),
  isMultiSelect: z.boolean().describe('Permite múltiplas escolhas.'),
  isTextInputEnabled: z.boolean().describe('Habilita campo de texto.'),
  shouldRedirect: z.boolean().describe('Fim da conversa.'),
  currentLayer: z.number().describe('Índice da camada atual.'),
  extractedData: z.object({
    niche: z.string().optional(),
    traffic: z.array(z.string()).optional(),
    hasSite: z.string().optional(),
    painPoints: z.array(z.string()).optional(),
    goals: z.string().optional(),
    companyName: z.string().optional()
  }).optional()
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const RecommenderInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })),
  currentMessage: z.string()
});

export type RecommenderInput = z.infer<typeof RecommenderInputSchema>;

const STEPS = [
  {
    id: 1,
    question: "Para começar, com o que você trabalha hoje?",
    options: ["Saúde (Clínica/Médico)", "Advocacia", "Estética", "Loja / Vendas", "Tecnologia", "Imóveis", "Arquitetura", "Outros"],
    isMulti: false
  },
  {
    id: 2,
    question: "Legal! E como os clientes chegam até você hoje? (Pode marcar mais de um)",
    options: ["Instagram / Facebook", "Google", "Indicação", "Ainda não tenho clientes"],
    isMulti: true
  },
  {
    id: 3,
    question: "Você já tem um site ou alguma página na internet?",
    options: ["Sim, já tenho", "Não tenho", "Tenho, mas não gosto dele", "Não preciso de site"],
    isMulti: false
  },
  {
    id: 4,
    question: "Qual é o seu maior problema hoje? O que mais te atrapalha a vender?",
    options: ["Pouca gente chamando", "Clientes que só perguntam preço", "Não tenho tempo para postar", "Minha marca parece amadora"],
    isMulti: true
  },
  {
    id: 5,
    question: "Se pudesse escolher um objetivo para os próximos meses, qual seria?",
    options: ["Vender mais", "Ser mais conhecido", "Organizar o atendimento", "Lançar um produto novo"],
    isMulti: false
  },
  {
    id: 6,
    question: "Entendi perfeitamente. Qual é o nome da sua empresa ou marca?",
    options: [],
    isMulti: false,
    forceText: true
  },
  {
    id: 7,
    question: "Pronto! Já entendi o seu momento. Clique no botão abaixo para falarmos no WhatsApp e eu te mostrar como podemos resolver esses problemas.",
    options: [],
    isMulti: false,
    isEnd: true
  }
];

export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const userResponses = input.history.filter(m => m.role === 'user');
  const stepIndex = userResponses.length;

  if (stepIndex >= STEPS.length) {
    const lastStep = STEPS[STEPS.length - 1];
    return {
      reply: lastStep.question,
      suggestedActions: [],
      isMultiSelect: false,
      isTextInputEnabled: false,
      shouldRedirect: true,
      currentLayer: lastStep.id
    };
  }

  const currentStep = STEPS[stepIndex];
  let options = currentStep.options;
  let forceText = currentStep.forceText || false;

  // Se clicar em "Outros" no primeiro passo, pede o texto
  if (stepIndex === 0 && input.currentMessage === "Outros") {
    return {
      reply: "Sem problemas! Qual seria a sua área então?",
      suggestedActions: [],
      isMultiSelect: false,
      isTextInputEnabled: true,
      shouldRedirect: false,
      currentLayer: 1
    };
  }

  return {
    reply: currentStep.question,
    suggestedActions: options,
    isMultiSelect: currentStep.isMulti || false,
    isTextInputEnabled: forceText,
    shouldRedirect: currentStep.isEnd || false,
    currentLayer: currentStep.id
  };
}
