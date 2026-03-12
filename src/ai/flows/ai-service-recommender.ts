'use server';

/**
 * @fileOverview Motor de Diagnóstico Sapient - Fluxo Determinístico e Prático.
 * 
 * Sequência lógica de 7 camadas para entender o momento do negócio do cliente
 * com linguagem simples e foco em resultados reais.
 */

import { z } from 'genkit';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A pergunta do consultor.'),
  suggestedActions: z.array(z.string()).describe('Opções de botões.'),
  isMultiSelect: z.boolean().describe('Permite múltiplas escolhas.'),
  isTextInputEnabled: z.boolean().describe('Habilita campo de texto.'),
  shouldRedirect: z.boolean().describe('Fim do diagnóstico.'),
  currentLayer: z.number().describe('Índice da camada atual.'),
  extractedData: z.object({
    niche: z.string().optional(),
    traffic: z.array(z.string()).optional(),
    hasSite: z.boolean().optional(),
    painPoints: z.array(z.string()).optional(),
    goals: z.array(z.string()).optional(),
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

const DIAGNOSTIC_LAYERS = [
  {
    layer: 1,
    reply: "Para eu te ajudar a vender mais, em qual área você atua hoje?",
    options: ["Saúde & Clínica", "Advocacia", "Estética", "Loja / Vendas", "Tecnologia", "Imóveis", "Arquitetura", "Outros"],
    isMulti: false
  },
  {
    layer: 2,
    reply: "E como as pessoas chegam até você hoje? (Pode marcar mais de uma)",
    options: ["Instagram / Redes Sociais", "Google / Pesquisa", "Indicação", "Panfletos / Offline", "Ainda não tenho clientes"],
    isMulti: true
  },
  {
    layer: 3,
    reply: "Você já tem um site ou página na internet?",
    options: ["Sim, já tenho", "Não tenho", "Tenho mas não gosto"],
    isMulti: false
  },
  {
    layer: 4,
    reply: "Qual é o seu maior 'gargalo' hoje? O que mais te atrapalha a crescer?",
    options: ["Pouca gente chamando", "Clientes que só perguntam preço", "Não tenho tempo para postar", "Minha marca parece amadora"],
    isMulti: true
  },
  {
    layer: 5,
    reply: "Se pudesse escolher uma meta para os próximos 3 meses, qual seria?",
    options: ["Aumentar as vendas", "Ser mais conhecido na região", "Organizar o atendimento", "Lançar algo novo"],
    isMulti: false
  },
  {
    layer: 6,
    reply: "Quase pronto! Qual é o nome da sua empresa ou marca?",
    options: [],
    isMulti: false,
    forceTextInput: true
  },
  {
    layer: 7,
    reply: "Diagnóstico terminado! Já tenho o que preciso para montar seu plano. Clique abaixo para conversarmos no WhatsApp e eu te mostrar os próximos passos.",
    options: [],
    isMulti: false,
    isEnd: true
  }
];

export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const userResponsesCount = input.history.filter(m => m.role === 'user').length;
  
  if (userResponsesCount >= DIAGNOSTIC_LAYERS.length) {
    const end = DIAGNOSTIC_LAYERS[DIAGNOSTIC_LAYERS.length - 1];
    return {
      reply: end.reply,
      suggestedActions: [],
      isMultiSelect: false,
      isTextInputEnabled: false,
      shouldRedirect: true,
      currentLayer: end.layer
    };
  }

  const nextLayer = DIAGNOSTIC_LAYERS[userResponsesCount];
  let currentOptions = nextLayer.options;
  let forceTextInput = nextLayer.forceTextInput || false;
  
  if (input.currentMessage === "Outros") {
    forceTextInput = true;
    currentOptions = [];
  }

  return {
    reply: nextLayer.reply,
    suggestedActions: currentOptions,
    isMultiSelect: nextLayer.isMulti || false,
    isTextInputEnabled: forceTextInput,
    shouldRedirect: nextLayer.isEnd || false,
    currentLayer: nextLayer.layer
  };
}