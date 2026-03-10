'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Módulo de Qualificação Profunda V4.
 * Implementa uma jornada de 3 camadas: Identificação -> Diagnóstico Técnico -> Validação de Impacto.
 */

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  extractedData?: {
    niche?: string;
    goal?: string;
    urgency?: 'low' | 'medium' | 'high';
    details?: string;
  };
};

export type RecommenderInput = {
  history: { role: 'user' | 'model'; content: string }[];
  currentMessage: string;
};

/**
 * Fluxo de recomendação e qualificação profunda.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const historyText = input.history.map(h => h.content.toLowerCase()).join(' ');
  const fullHistoryText = historyText + ' ' + msg;
  const turnCount = input.history.filter(h => h.role === 'user').length + 1;

  // 1. Extração de Nicho
  let niche = 'Não identificado';
  if (fullHistoryText.includes('médico') || fullHistoryText.includes('saúde') || fullHistoryText.includes('clínica') || fullHistoryText.includes('hospital') || fullHistoryText.includes('dentista')) niche = 'Saúde/Médico';
  else if (fullHistoryText.includes('advogado') || fullHistoryText.includes('jurídico') || fullHistoryText.includes('direito') || fullHistoryText.includes('escritório')) niche = 'Jurídico';
  else if (fullHistoryText.includes('imobiliário') || fullHistoryText.includes('corretor') || fullHistoryText.includes('imóveis')) niche = 'Imobiliário';
  else if (fullHistoryText.includes('loja') || fullHistoryText.includes('varejo') || fullHistoryText.includes('e-commerce')) niche = 'Varejo/E-commerce';
  else if (fullHistoryText.includes('educação') || fullHistoryText.includes('curso') || fullHistoryText.includes('escola') || fullHistoryText.includes('mentor')) niche = 'Educação/Infoprodutos';
  else if (fullHistoryText.includes('restaurante') || fullHistoryText.includes('gastronomia') || fullHistoryText.includes('comida') || fullHistoryText.includes('alimentício')) niche = 'Alimentício/Gastronomia';
  else if (fullHistoryText.includes('estética') || fullHistoryText.includes('beleza') || fullHistoryText.includes('academia') || fullHistoryText.includes('fitness')) niche = 'Moda/Wellness';
  else if (fullHistoryText.includes('indústria') || fullHistoryText.includes('fábrica') || fullHistoryText.includes('b2b')) niche = 'Indústria/B2B';
  else if (fullHistoryText.includes('consultoria') || fullHistoryText.includes('tecnologia') || fullHistoryText.includes('ti')) niche = 'Tecnologia/Serviços';

  // 2. Extração de Objetivo
  let goal = 'Crescimento Geral';
  if (fullHistoryText.includes('anúncio') || fullHistoryText.includes('tráfego') || fullHistoryText.includes('vendas') || fullHistoryText.includes('google') || fullHistoryText.includes('meta')) goal = 'Performance Ads';
  else if (fullHistoryText.includes('marca') || fullHistoryText.includes('design') || fullHistoryText.includes('logo') || fullHistoryText.includes('visual')) goal = 'Design Estratégico';
  else if (fullHistoryText.includes('ia') || fullHistoryText.includes('bot') || fullHistoryText.includes('automação') || fullHistoryText.includes('atendimento')) goal = 'Ecossistemas de IA';
  else if (fullHistoryText.includes('social') || fullHistoryText.includes('instagram') || fullHistoryText.includes('autoridade')) goal = 'Gestão de Autoridade';

  // 3. Detecção de Urgência
  let urgency: 'low' | 'medium' | 'high' = 'low';
  if (fullHistoryText.includes('agora') || fullHistoryText.includes('urgente') || fullHistoryText.includes('rápido')) urgency = 'high';
  else if (fullHistoryText.includes('preciso') || fullHistoryText.includes('buscando') || fullHistoryText.includes('querendo')) urgency = 'medium';

  const isSpecificNiche = niche !== 'Não identificado';
  const isSpecificGoal = goal !== 'Crescimento Geral';

  // --- LÓGICA DE JORNADA DE 3 CAMADAS ---

  // CAMADA 3: VALIDAÇÃO DE IMPACTO (APÓS TER NICHO E GOAL)
  if (isSpecificNiche && isSpecificGoal && turnCount >= 3) {
    const hasDetails = fullHistoryText.length > 150 || fullHistoryText.includes('meta') || fullHistoryText.includes('hoje');
    
    if (hasDetails || turnCount >= 4) {
      return {
        reply: `Análise técnica concluída para o ecossistema ${niche}. Sua necessidade de ${goal} exige um protocolo de alta fidelidade que já temos estruturado. Posso transferir seu dossiê para um estrategista humano agora para detalharmos o plano de ação e o ROI esperado?`,
        shouldRedirect: true,
        suggestedActions: ["Sim, falar com estrategista", "Ver casos de sucesso", "Ainda tenho dúvidas"],
        extractedData: { niche, goal, urgency }
      };
    } else {
      return {
        reply: `Entendido. Para o setor ${niche}, o foco em ${goal} é vital. Qual o seu principal bloqueador hoje? É a falta de leads qualificados ou a percepção de valor da sua marca perante os concorrentes?`,
        shouldRedirect: false,
        suggestedActions: ["Falta de Leads", "Percepção de Valor", "Preço dos Concorrentes"],
        extractedData: { niche, goal, urgency }
      };
    }
  }

  // CAMADA 2: DIAGNÓSTICO TÉCNICO (APÓS IDENTIFICAR NICHO)
  if (isSpecificNiche) {
    if (niche === 'Alimentício/Gastronomia') {
      return {
        reply: "No setor alimentício, o visual é o primeiro sabor que o cliente experimenta. Você já trabalha com tráfego geolocalizado para delivery ou seu foco é atrair clientes para o salão físico?",
        shouldRedirect: false,
        suggestedActions: ["Foco em Delivery", "Atrair para Salão", "Ambos"],
        extractedData: { niche, urgency }
      };
    }
    if (niche === 'Saúde/Médico') {
      return {
        reply: "Para clínicas e médicos, a barreira de confiança é o que define a conversão. Você busca um posicionamento de autoridade no Instagram ou quer dominar as buscas de urgência no Google agora?",
        shouldRedirect: false,
        suggestedActions: ["Autoridade Instagram", "Domínio Google Ads", "Ambos"],
        extractedData: { niche, urgency }
      };
    }
    if (niche === 'Imobiliário') {
      return {
        reply: "No mercado imobiliário, o custo por lead qualificado é o que separa o lucro do prejuízo. Você está focando em lançamentos de alto padrão ou em revenda e locação recorrente?",
        shouldRedirect: false,
        suggestedActions: ["Lançamentos Luxo", "Revenda/Locação", "Captação de Proprietários"],
        extractedData: { niche, urgency }
      };
    }
    if (niche === 'Varejo/E-commerce') {
      return {
        reply: "No varejo, cada clique precisa ser otimizado. Sua dor hoje é o abandono de carrinho ou a falta de tráfego qualificado chegando no site?",
        shouldRedirect: false,
        suggestedActions: ["Abandono de Carrinho", "Tráfego Qualificado", "Aumentar Ticket Médio"],
        extractedData: { niche, urgency }
      };
    }
    if (niche === 'Indústria/B2B') {
      return {
        reply: "Vendas industriais exigem dossiês técnicos de alta fidelidade. Você busca captar novos distribuidores ou quer melhorar a apresentação técnica para grandes contas?",
        shouldRedirect: false,
        suggestedActions: ["Novos Distribuidores", "Vendas para Grandes Contas", "LinkedIn Ads"],
        extractedData: { niche, urgency }
      };
    }
    if (niche === 'Jurídico') {
      return {
        reply: "No setor jurídico, a autoridade técnica é inegociável. Você foca em advocacia de massa ou em causas estratégicas de alto valor?",
        shouldRedirect: false,
        suggestedActions: ["Causas Estratégicas", "Advocacia de Massa", "Google Ads Jurídico"],
        extractedData: { niche, urgency }
      };
    }

    // Fallback para outros nichos
    return {
      reply: `Excelente escolha. No setor de ${niche}, a estratégia correta pode multiplicar seu faturamento. Qual o seu maior desafio hoje: Atrair novos clientes ou melhorar sua imagem de marca?`,
      shouldRedirect: false,
      suggestedActions: ["Atrair Clientes", "Melhorar Imagem", "Automação de Atendimento"],
      extractedData: { niche, urgency }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para eu ser cirúrgico no seu diagnóstico estratégico: qual o seu nicho de atuação e qual o seu maior desafio comercial hoje?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Clínica", "Jurídico", "Alimentício", "Varejo / E-commerce", "Indústria / B2B", "Outro Nicho"],
    extractedData: { urgency: 'low' }
  };
}
