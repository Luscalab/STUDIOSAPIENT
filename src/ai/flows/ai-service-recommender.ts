'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Módulo Local Avançado V2.
 * Implementa extração de atributos, reconhecimento de nichos expandidos e roteiro de qualificação estratégica.
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
 * Fluxo de recomendação e qualificação (Versão Local com Extração Multicamadas).
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const fullHistoryText = input.history.map(h => h.content.toLowerCase()).join(' ') + ' ' + msg;

  // 1. Extração de Nicho (Biblioteca Expandida)
  let niche = 'Não identificado';
  if (fullHistoryText.includes('médico') || fullHistoryText.includes('saúde') || fullHistoryText.includes('clínica') || fullHistoryText.includes('hospital')) niche = 'Saúde/Médico';
  else if (fullHistoryText.includes('advogado') || fullHistoryText.includes('jurídico') || fullHistoryText.includes('direito') || fullHistoryText.includes('escritório')) niche = 'Jurídico';
  else if (fullHistoryText.includes('imobiliário') || fullHistoryText.includes('corretor') || fullHistoryText.includes('imóveis') || fullHistoryText.includes('venda de casa')) niche = 'Imobiliário';
  else if (fullHistoryText.includes('loja') || fullHistoryText.includes('venda') || fullHistoryText.includes('e-commerce') || fullHistoryText.includes('produto')) niche = 'Varejo/E-commerce';
  else if (fullHistoryText.includes('educação') || fullHistoryText.includes('curso') || fullHistoryText.includes('escola') || fullHistoryText.includes('mentor')) niche = 'Educação/Infoprodutos';
  else if (fullHistoryText.includes('restaurante') || fullHistoryText.includes('gastronomia') || fullHistoryText.includes('comida') || fullHistoryText.includes('bar')) niche = 'Gastronomia';
  else if (fullHistoryText.includes('estética') || fullHistoryText.includes('beleza') || fullHistoryText.includes('academia') || fullHistoryText.includes('fitness')) niche = 'Wellness/Estética';
  else if (fullHistoryText.includes('consultoria') || fullHistoryText.includes('serviços') || fullHistoryText.includes('software') || fullHistoryText.includes('tecnologia')) niche = 'Tecnologia/Serviços';

  // 2. Extração de Objetivo / Dor
  let goal = 'Crescimento Geral';
  if (fullHistoryText.includes('anúncio') || fullHistoryText.includes('tráfego') || fullHistoryText.includes('vendas') || fullHistoryText.includes('google')) goal = 'Performance Ads';
  else if (fullHistoryText.includes('marca') || fullHistoryText.includes('design') || fullHistoryText.includes('logo') || fullHistoryText.includes('visual')) goal = 'Design Estratégico';
  else if (fullHistoryText.includes('ia') || fullHistoryText.includes('bot') || fullHistoryText.includes('automação') || fullHistoryText.includes('atendimento')) goal = 'Ecossistemas de IA';
  else if (fullHistoryText.includes('social') || fullHistoryText.includes('instagram') || fullHistoryText.includes('post') || fullHistoryText.includes('autoridade')) goal = 'Gestão de Autoridade';

  // 3. Detecção de Urgência
  let urgency: 'low' | 'medium' | 'high' = 'low';
  if (fullHistoryText.includes('agora') || fullHistoryText.includes('urgente') || fullHistoryText.includes('rápido') || fullHistoryText.includes('perder')) urgency = 'high';
  else if (fullHistoryText.includes('preciso') || fullHistoryText.includes('buscando') || fullHistoryText.includes('querendo')) urgency = 'medium';

  const historyCount = input.history.length;
  const isSpecificNiche = niche !== 'Não identificado';
  const isSpecificGoal = goal !== 'Crescimento Geral';

  // ROTEIRO DE RESPOSTAS ESTRATÉGICAS

  // SE JÁ TEMOS NICHO E OBJETIVO (MOMENTO DE FECHAMENTO)
  if ((isSpecificNiche && isSpecificGoal) || fullHistoryText.includes('contato') || fullHistoryText.includes('falar') || fullHistoryText.includes('whatsapp')) {
    return {
      reply: `Análise técnica concluída para o setor ${niche}. Sua necessidade de ${goal} exige um protocolo de alta fidelidade que já temos estruturado. Posso transferir seu dossiê para um estrategista humano agora?`,
      shouldRedirect: true,
      suggestedActions: ["Sim, falar com estrategista", "Ver casos de sucesso", "Ainda tenho dúvidas"],
      extractedData: { niche, goal, urgency }
    };
  }

  // RESPOSTA PARA NICHO IMOBILIÁRIO
  if (niche === 'Imobiliário') {
    return {
      reply: "No setor imobiliário, a velocidade de resposta e a qualidade visual do anúncio definem o seu CPL. Na Sapient, focamos em anúncios que filtram curiosos. Você busca escalar a venda de imóveis de alto padrão ou quer melhorar a autoridade da sua imobiliária?",
      shouldRedirect: false,
      suggestedActions: ["Vendas de Alto Padrão", "Autoridade de Marca", "Automação de Leads"],
      extractedData: { niche, urgency }
    };
  }

  // RESPOSTA PARA EDUCAÇÃO/INFOPRODUTOS
  if (niche === 'Educação/Infoprodutos') {
    return {
      reply: "O mercado de educação digital hoje satura quem não tem clareza visual. Transformamos seu conhecimento em um Dossiê de Valor. Você está em fase de lançamento ou busca uma gestão de tráfego perpétuo para seus cursos?",
      shouldRedirect: false,
      suggestedActions: ["Lançamento Estratégico", "Tráfego Perpétuo", "Identidade Visual"],
      extractedData: { niche, urgency }
    };
  }

  // RESPOSTA PARA WELLNESS/ESTÉTICA
  if (niche === 'Wellness/Estética') {
    return {
      reply: "Neste setor, o 'Desejo Visual' é o que converte. Um design que comunica sofisticação permite elevar o ticket médio dos seus procedimentos. Seu foco hoje é lotar a agenda via anúncios ou reconstruir o posicionamento da marca?",
      shouldRedirect: false,
      suggestedActions: ["Lotar Agenda (Ads)", "Posicionamento Premium", "IA para Agendamento"],
      extractedData: { niche, urgency }
    };
  }

  // RESPOSTA PARA SAÚDE/MÉDICO
  if (niche === 'Saúde/Médico') {
    return {
      reply: "Para clínicas e médicos, a barreira ética e de confiança é crucial. Trabalhamos com o que chamamos de 'Psicologia da Autoridade'. Você busca captar novos pacientes para convênios ou focar exclusivamente em procedimentos particulares de alto valor?",
      shouldRedirect: false,
      suggestedActions: ["Pacientes Particulares", "Autoridade Visual", "IA de Atendimento"],
      extractedData: { niche, urgency }
    };
  }

  // RESPOSTA PARA JURÍDICO
  if (niche === 'Jurídico') {
    return {
      reply: "O marketing jurídico exige sobriedade e uma narrativa de solidez inquestionável. Você já investe em Google Ads para termos específicos do seu direito ou está buscando uma nova identidade visual para o escritório?",
      shouldRedirect: false,
      suggestedActions: ["Google Ads Jurídico", "Branding de Prestígio", "Dossiês Técnicos"],
      extractedData: { niche, urgency }
    };
  }

  // FALLBACK / INÍCIO (QUALIFICAÇÃO INICIAL)
  return {
    reply: "Protocolo Sapient iniciado. Para eu ser cirúrgico no seu diagnóstico: qual o seu nicho de atuação e qual o seu maior desafio comercial hoje?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Clínica", "Escritório Jurídico", "Imobiliário", "Educação / Cursos", "Outro Nicho"],
    extractedData: { urgency: 'low' }
  };
}
