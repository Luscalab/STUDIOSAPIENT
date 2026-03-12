'use server';

/**
 * @fileOverview Motor de Diagnóstico Sapient V6.0 - Fluxo Determinístico.
 * 
 * Este fluxo segue uma sequência lógica de 7 camadas pré-estabelecidas.
 * A IA é utilizada estritamente para formatar o comentário empático sobre a escolha do usuário.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('O comentário do consultor sobre a escolha do usuário + a próxima pergunta fixa.'),
  suggestedActions: z.array(z.string()).describe('Botões de ação fixa para a camada atual.'),
  isMultiSelect: z.boolean().describe('Se a camada atual permite múltiplas escolhas.'),
  isTextInputEnabled: z.boolean().describe('Se o campo de texto deve ser aberto.'),
  shouldRedirect: z.boolean().describe('Se chegamos ao fim do diagnóstico.'),
  currentLayer: z.number().describe('O índice da camada atual (1-7).'),
  extractedData: z.object({
    niche: z.string().optional(),
    traffic: z.array(z.string()).optional(),
    hasSite: z.boolean().optional(),
    siteUrl: z.string().optional(),
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

// Definição do Fluxo de Perguntas Pré-estabelecidas
const DIAGNOSTIC_LAYERS = [
  {
    layer: 1,
    question: "Para começar nosso diagnóstico estratégico, com o que você trabalha hoje?",
    options: ["Saúde & Bem-estar", "Jurídico & Direito", "Estética & Beleza", "Varejo & E-commerce", "Tecnologia & SaaS", "Imobiliário & Imóveis", "Arquitetura & Design", "Outros"],
    isMulti: false
  },
  {
    layer: 2,
    question: "E como seus potenciais clientes costumam te encontrar hoje?",
    options: ["Instagram / Redes Sociais", "Google Ads / Pesquisa", "Indicações", "Outros"],
    isMulti: true
  },
  {
    layer: 3,
    question: "Sobre sua vitrine digital: você já possui um site ou landing page ativa?",
    options: ["Sim, já tenho um site", "Não, preciso criar do zero"],
    isMulti: false
  },
  {
    layer: 4,
    question: "Qual o principal desafio que trava o seu crescimento hoje?",
    options: ["Poucos Leads", "Leads Desqualificados", "Visual Amador", "Vendas Instáveis"],
    isMulti: true
  },
  {
    layer: 5,
    question: "Qual sua meta principal para os próximos 90 dias?",
    options: ["Aumentar Faturamento", "Posicionamento de Luxo", "Escalar Operação"],
    isMulti: false
  },
  {
    layer: 6,
    question: "Perfeito. Para finalizarmos seu dossiê, qual o nome da sua marca?",
    options: [],
    isMulti: false,
    forceTextInput: true
  },
  {
    layer: 7,
    question: "Diagnóstico Concluído. Seu dossiê de autoridade está pronto para ser discutido com nossos estrategistas.",
    options: [],
    isMulti: false,
    isEnd: true
  }
];

export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  // Determina a camada atual com base no histórico de mensagens do usuário
  const userMessagesCount = input.history.filter(m => m.role === 'user').length;
  const currentLayerIndex = Math.min(userMessagesCount, DIAGNOSTIC_LAYERS.length - 1);
  const nextLayer = DIAGNOSTIC_LAYERS[currentLayerIndex];

  // Caso especial: L3 pedindo link após "Sim, tenho site"
  let promptSuffix = "";
  let forceTextInput = nextLayer.forceTextInput || false;

  if (currentLayerIndex === 3 && input.currentMessage.includes("Sim")) {
    promptSuffix = "Poderia enviar o link do seu site para que eu possa fazer uma pré-auditoria?";
    forceTextInput = true;
  }

  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    output: { schema: RecommenderOutputSchema },
    system: `Você é o Consultor Estratégico da Sapient Studio.
    Sua missão é COMENTAR a resposta do usuário e apresentar a PRÓXIMA PERGUNTA do fluxo.
    
    PERGUNTA ATUAL DO FLUXO: "${nextLayer.question} ${promptSuffix}"
    
    DIRETRIZES:
    1. Valide a escolha do usuário (ex: "No setor de saúde, o visual é tudo...").
    2. Encaixe a próxima pergunta de forma natural.
    3. Mantenha o tom profissional e sênior.
    4. Se for a última camada, parabenize o usuário pelo dossiê.`,
    prompt: `Usuário escolheu: ${input.currentMessage}. Próxima camada do fluxo: ${nextLayer.layer}.`
  });

  if (!output) throw new Error('Falha no processamento.');

  return {
    ...output,
    reply: output.reply, // O texto gerado pela IA (Comentário + Pergunta Fixa)
    suggestedActions: forceTextInput ? [] : nextLayer.options,
    isMultiSelect: nextLayer.isMulti,
    isTextInputEnabled: forceTextInput || input.currentMessage === "Outros",
    shouldRedirect: nextLayer.isEnd || false,
    currentLayer: nextLayer.layer
  };
}