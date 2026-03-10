'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Módulo Local Avançado.
 * Implementa extração de atributos e roteiro de qualificação estratégica.
 */

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  extractedData?: {
    niche?: string;
    goal?: string;
    urgency?: 'low' | 'medium' | 'high';
  };
};

export type RecommenderInput = {
  history: { role: 'user' | 'model'; content: string }[];
  currentMessage: string;
};

/**
 * Fluxo de recomendação e qualificação (Versão Local com Extração).
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const fullHistoryText = input.history.map(h => h.content.toLowerCase()).join(' ') + ' ' + msg;

  // 1. Extração de Nicho
  let niche = 'Não identificado';
  if (fullHistoryText.includes('médico') || fullHistoryText.includes('saúde') || fullHistoryText.includes('hospital')) niche = 'Saúde/Médico';
  else if (fullHistoryText.includes('advogado') || fullHistoryText.includes('jurídico') || fullHistoryText.includes('direito')) niche = 'Jurídico';
  else if (fullHistoryText.includes('loja') || fullHistoryText.includes('venda') || fullHistoryText.includes('e-commerce')) niche = 'Varejo/E-commerce';
  else if (fullHistoryText.includes('consultoria') || fullHistoryText.includes('serviços')) niche = 'Serviços/Consultoria';

  // 2. Extração de Objetivo
  let goal = 'Crescimento Geral';
  if (fullHistoryText.includes('anúncio') || fullHistoryText.includes('tráfego') || fullHistoryText.includes('vendas')) goal = 'Performance Ads';
  else if (fullHistoryText.includes('marca') || fullHistoryText.includes('design') || fullHistoryText.includes('logo')) goal = 'Design Estratégico';
  else if (fullHistoryText.includes('ia') || fullHistoryText.includes('bot') || fullHistoryText.includes('automação')) goal = 'Ecossistemas de IA';

  const historyCount = input.history.length;
  const isSpecific = niche !== 'Não identificado' || goal !== 'Crescimento Geral';

  // ROTEIRO DE RESPOSTAS
  
  // Se já temos informações suficientes (Nicho e Objetivo) ou a conversa avançou
  if ((isSpecific && historyCount >= 2) || fullHistoryText.includes('contato') || fullHistoryText.includes('falar')) {
    return {
      reply: `Sua visão para o setor de ${niche} está muito clara. O foco em ${goal} é exatamente onde a Sapient Studio entrega o maior ROI. Já estruturei um dossiê preliminar para você. Vamos prosseguir para um Diagnóstico Técnico via WhatsApp?`,
      shouldRedirect: true,
      suggestedActions: ["Sim, falar com consultor", "Ver casos de sucesso", "Ainda tenho dúvidas"],
      extractedData: { niche, goal, urgency: 'high' }
    };
  }

  // Se identificou nicho de saúde
  if (niche === 'Saúde/Médico') {
    return {
      reply: "Entendo a complexidade do setor de saúde. A barreira de confiança é o maior desafio. Na Sapient, focamos em design que comunica autoridade clínica imediata. Qual o seu principal objetivo: captar novos pacientes ou elevar o ticket médio dos atuais?",
      shouldRedirect: false,
      suggestedActions: ["Captar pacientes", "Elevar autoridade visual", "Automação de agenda"],
      extractedData: { niche, urgency: 'medium' }
    };
  }

  // Se identificou nicho jurídico
  if (niche === 'Jurídico') {
    return {
      reply: "O setor jurídico exige o que chamamos de 'Psicologia do Prestígio'. Um design sóbrio e uma narrativa de solidez são cruciais. Você já investe em Google Ads ou está buscando uma nova identidade visual para o escritório?",
      shouldRedirect: false,
      suggestedActions: ["Google Ads Jurídico", "Identidade Premium", "Dossiês de Venda"],
      extractedData: { niche, urgency: 'medium' }
    };
  }

  // Se identificou foco em IA
  if (goal === 'Ecossistemas de IA') {
    return {
      reply: "Inteligência Autônoma é o nosso motor de escala. Implementamos IAs que falam a língua do seu negócio 24/7. Você busca automação para o seu site ou para qualificar leads no WhatsApp?",
      shouldRedirect: false,
      suggestedActions: ["IA para Site", "IA para WhatsApp", "Consultoria Técnica"],
      extractedData: { goal, urgency: 'medium' }
    };
  }

  // Fallback / Início
  return {
    reply: "Protocolo Estratégico Sapient iniciado. Para eu ser preciso no seu diagnóstico: qual o seu nicho de atuação e qual o seu maior desafio comercial hoje?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Clínica", "Escritório de Advocacia", "Consultoria / Serviços", "E-commerce"],
    extractedData: { urgency: 'low' }
  };
}
