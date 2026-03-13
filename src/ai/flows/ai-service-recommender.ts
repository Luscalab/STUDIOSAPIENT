'use server';

/**
 * @fileOverview Motor de Diagnóstico Sapient - Fluxo Determinístico.
 * Coleta informações para identificar gargalos sem uso de modelos LLM externos.
 */

import { z } from 'genkit';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A pergunta ou comentário do consultor.'),
  suggestedActions: z.array(z.string()).describe('Opções de botões para o usuário.'),
  isMultiSelect: z.boolean().describe('Permite que o usuário marque várias opções.'),
  isTextInputEnabled: z.boolean().describe('Habilita o campo de digitação.'),
  shouldRedirect: z.boolean().describe('Sinaliza o fim da conversa para redirecionamento.'),
  currentLayer: z.number().describe('O índice do passo atual.')
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
    question: "Para a gente começar, qual é a sua área de atuação hoje?",
    options: ["Saúde (Médico/Clínica)", "Direito (Advocacia)", "Alimentação / Restaurante", "Estética / Beleza", "Vendas / Loja", "Tecnologia / Software", "Imóveis / Arquitetura", "Serviços (Geral)", "Outros"],
    isMulti: false
  },
  {
    id: 2,
    question: "Entendi. E como os novos clientes chegam até você hoje?",
    options: ["Pelo Instagram", "Pelo Google", "Só por Indicação", "Panfleto / Local", "Ainda não tenho clientes"],
    isMulti: true
  },
  {
    id: 3,
    question: "Você já tem um site ou uma página para apresentar seu trabalho?",
    options: ["Sim, já tenho", "Não tenho", "Tenho, mas não gosto dele", "Não preciso de um"],
    isMulti: false
  },
  {
    id: 4,
    question: "Qual é o seu maior 'gargalo' hoje? O que mais te impede de crescer?",
    options: [], 
    isMulti: true
  },
  {
    id: 5,
    question: "Se a gente pudesse resolver um problema nos próximos 90 dias, qual seria?",
    options: ["Vender mais", "Aparecer para mais gente", "Organizar o atendimento", "Ter uma marca mais profissional"],
    isMulti: false
  },
  {
    id: 6,
    question: "Certo. E qual é o nome da sua empresa ou da sua marca?",
    options: [],
    isMulti: false,
    forceText: true
  },
  {
    id: 7,
    question: "Perfeito! Já tenho um rascunho do que podemos fazer. Clique no botão abaixo para falar com nosso estrategista no WhatsApp e receber sua proposta personalizada.",
    options: [],
    isMulti: false,
    isEnd: true
  }
];

export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const userResponses = input.history.filter(m => m.role === 'user');
  const stepIndex = userResponses.length;

  if (stepIndex >= STEPS.length) {
    return {
      reply: STEPS[STEPS.length - 1].question,
      suggestedActions: [],
      isMultiSelect: false,
      isTextInputEnabled: false,
      shouldRedirect: true,
      currentLayer: 7
    };
  }

  const currentStep = STEPS[stepIndex];
  let reply = currentStep.question;
  let options = [...currentStep.options];
  let forceText = currentStep.forceText || false;

  if (stepIndex === 1 && input.history[0]?.content === "Outros") {
    if (input.currentMessage === "Outros") {
       return {
        reply: "Sem problemas! Qual seria a sua área específica?",
        suggestedActions: [],
        isMultiSelect: false,
        isTextInputEnabled: true,
        shouldRedirect: false,
        currentLayer: 1
      };
    }
  }

  if (stepIndex === 3) {
    const niche = userResponses[0]?.content || "";
    if (niche.includes("Saúde") || niche.includes("Direito") || niche.includes("Estética")) {
      options = ["Clientes só perguntam preço", "Minha imagem parece amadora", "Demoro a responder no WhatsApp", "Não apareço quando buscam no Google", "Tenho vergonha de postar"];
    } else if (niche.includes("Alimentação")) {
      options = ["Poucos pedidos no delivery", "Salão vazio no meio da semana", "Minhas fotos não abrem o apetite", "Não apareço quando buscam 'onde comer'", "Demoro a responder no WhatsApp/iFood"];
    } else if (niche.includes("Vendas") || niche.includes("Tecnologia")) {
      options = ["Pouca gente visita meu site", "As pessoas não confiam na marca", "Perco vendas por falta de suporte", "Anúncios estão caros e sem retorno", "Meu site é lento/ruim"];
    } else {
      options = ["Preciso de mais contatos", "Quero ser visto como autoridade", "Falta de tempo para marketing", "Atendimento muito bagunçado", "Minha marca está desatualizada"];
    }
  }

  return {
    reply,
    suggestedActions: options,
    isMultiSelect: currentStep.isMulti || false,
    isTextInputEnabled: forceText,
    shouldRedirect: currentStep.isEnd || false,
    currentLayer: currentStep.id
  };
}
