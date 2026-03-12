'use server';

/**
 * @fileOverview Motor de Diagnóstico Sapient V7.0 - Fluxo 100% Determinístico.
 * 
 * Este fluxo segue uma sequência lógica de 7 camadas pré-estabelecidas para coleta 
 * de informações estratégicas sem o uso de IA na geração de texto.
 */

import { z } from 'genkit';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A pergunta ou mensagem do consultor.'),
  suggestedActions: z.array(z.string()).describe('Opções de botões para o usuário.'),
  isMultiSelect: z.boolean().describe('Se a camada permite múltiplas escolhas.'),
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

/**
 * Configuração das Camadas de Diagnóstico Determinístico
 */
const DIAGNOSTIC_LAYERS = [
  {
    layer: 1,
    reply: "Para iniciarmos sua auditoria estratégica de autoridade, em qual setor você atua hoje?",
    options: ["Saúde & Clínica", "Jurídico & Direito", "Estética & Beleza", "Varejo & E-commerce", "Tecnologia & SaaS", "Imobiliário & Imóveis", "Arquitetura & Design", "Outros"],
    isMulti: false
  },
  {
    layer: 2,
    reply: "Entendido. Como os novos clientes costumam chegar até você hoje? (Pode selecionar mais de uma opção)",
    options: ["Instagram / Redes Sociais", "Google Ads / Pesquisa", "Indicações de Clientes", "Prospecção Ativa / Offline", "Outros"],
    isMulti: true
  },
  {
    layer: 3,
    reply: "Sobre sua vitrine digital: você já possui um site ou landing page ativa no momento?",
    options: ["Sim, já possuo um site", "Não, preciso criar do zero"],
    isMulti: false
  },
  {
    layer: 4,
    reply: "Qual o maior 'gargalo' ou desafio do seu comercial hoje? (O que impede seu crescimento?)",
    options: ["Baixo Volume de Leads", "Leads sem Qualificação", "Site Lento ou Amador", "Vendas Instáveis"],
    isMulti: true
  },
  {
    layer: 5,
    reply: "Qual o seu principal objetivo estratégico para os próximos 90 dias?",
    options: ["Escalar Faturamento", "Consolidar Posicionamento de Luxo", "Automatizar Atendimento", "Lançar Novo Produto/Serviço"],
    isMulti: false
  },
  {
    layer: 6,
    reply: "Perfeito. Para finalizarmos seu dossiê de autoridade, qual o nome da sua marca ou empresa?",
    options: [],
    isMulti: false,
    forceTextInput: true
  },
  {
    layer: 7,
    reply: "Diagnóstico Concluído com Sucesso. Seu dossiê de autoridade está pronto para ser revisado por nossos estrategistas. Clique abaixo para receber os próximos passos no WhatsApp.",
    options: [],
    isMulti: false,
    isEnd: true
  }
];

/**
 * Função principal que gerencia o fluxo de conversação baseado no histórico.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  // Contamos quantas vezes o usuário respondeu para determinar a camada
  const userResponsesCount = input.history.filter(m => m.role === 'user').length;
  
  // Se já passamos de todas as camadas
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

  // Pegamos a camada correspondente à próxima pergunta
  const nextLayer = DIAGNOSTIC_LAYERS[userResponsesCount];
  
  let currentOptions = nextLayer.options;
  let forceTextInput = nextLayer.forceTextInput || false;
  
  // Lógica especial para a opção "Outros"
  if (input.currentMessage === "Outros") {
    forceTextInput = true;
    currentOptions = [];
  }

  // Se for a camada de site e o usuário disse que TEM, poderíamos pedir o link no futuro.
  // Por enquanto, seguimos o fluxo determinístico linear.

  return {
    reply: nextLayer.reply,
    suggestedActions: currentOptions,
    isMultiSelect: nextLayer.isMulti || false,
    isTextInputEnabled: forceTextInput,
    shouldRedirect: nextLayer.isEnd || false,
    currentLayer: nextLayer.layer
  };
}
