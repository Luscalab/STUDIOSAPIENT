'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Módulo Local Avançado V3.
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

  // 1. Extração de Nicho (Biblioteca Expandida V3)
  let niche = 'Não identificado';
  if (fullHistoryText.includes('médico') || fullHistoryText.includes('saúde') || fullHistoryText.includes('clínica') || fullHistoryText.includes('hospital') || fullHistoryText.includes('dentista')) niche = 'Saúde/Médico';
  else if (fullHistoryText.includes('advogado') || fullHistoryText.includes('jurídico') || fullHistoryText.includes('direito') || fullHistoryText.includes('escritório')) niche = 'Jurídico';
  else if (fullHistoryText.includes('imobiliário') || fullHistoryText.includes('corretor') || fullHistoryText.includes('imóveis') || fullHistoryText.includes('venda de casa')) niche = 'Imobiliário';
  else if (fullHistoryText.includes('loja') || fullHistoryText.includes('varejo') || fullHistoryText.includes('e-commerce') || fullHistoryText.includes('produto') || fullHistoryText.includes('vendas online')) niche = 'Varejo/E-commerce';
  else if (fullHistoryText.includes('educação') || fullHistoryText.includes('curso') || fullHistoryText.includes('escola') || fullHistoryText.includes('mentor') || fullHistoryText.includes('infoproduto')) niche = 'Educação/Infoprodutos';
  else if (fullHistoryText.includes('restaurante') || fullHistoryText.includes('gastronomia') || fullHistoryText.includes('comida') || fullHistoryText.includes('bar') || fullHistoryText.includes('alimentício') || fullHistoryText.includes('delivery')) niche = 'Alimentício/Gastronomia';
  else if (fullHistoryText.includes('estética') || fullHistoryText.includes('beleza') || fullHistoryText.includes('academia') || fullHistoryText.includes('fitness') || fullHistoryText.includes('wellness') || fullHistoryText.includes('moda')) niche = 'Moda/Wellness';
  else if (fullHistoryText.includes('indústria') || fullHistoryText.includes('fábrica') || fullHistoryText.includes('b2b') || fullHistoryText.includes('manufatura')) niche = 'Indústria/B2B';
  else if (fullHistoryText.includes('consultoria') || fullHistoryText.includes('serviços') || fullHistoryText.includes('software') || fullHistoryText.includes('tecnologia') || fullHistoryText.includes('ti')) niche = 'Tecnologia/Serviços';

  // 2. Extração de Objetivo / Dor
  let goal = 'Crescimento Geral';
  if (fullHistoryText.includes('anúncio') || fullHistoryText.includes('tráfego') || fullHistoryText.includes('vendas') || fullHistoryText.includes('google') || fullHistoryText.includes('meta')) goal = 'Performance Ads';
  else if (fullHistoryText.includes('marca') || fullHistoryText.includes('design') || fullHistoryText.includes('logo') || fullHistoryText.includes('visual') || fullHistoryText.includes('identidade')) goal = 'Design Estratégico';
  else if (fullHistoryText.includes('ia') || fullHistoryText.includes('bot') || fullHistoryText.includes('automação') || fullHistoryText.includes('atendimento') || fullHistoryText.includes('chatbot')) goal = 'Ecossistemas de IA';
  else if (fullHistoryText.includes('social') || fullHistoryText.includes('instagram') || fullHistoryText.includes('post') || fullHistoryText.includes('autoridade') || fullHistoryText.includes('feed')) goal = 'Gestão de Autoridade';

  // 3. Detecção de Urgência
  let urgency: 'low' | 'medium' | 'high' = 'low';
  if (fullHistoryText.includes('agora') || fullHistoryText.includes('urgente') || fullHistoryText.includes('rápido') || fullHistoryText.includes('perder') || fullHistoryText.includes('ontem')) urgency = 'high';
  else if (fullHistoryText.includes('preciso') || fullHistoryText.includes('buscando') || fullHistoryText.includes('querendo') || fullHistoryText.includes('meta')) urgency = 'medium';

  const isSpecificNiche = niche !== 'Não identificado';
  const isSpecificGoal = goal !== 'Crescimento Geral';

  // ROTEIRO DE RESPOSTAS ESTRATÉGICAS

  // SE JÁ TEMOS NICHO E OBJETIVO (MOMENTO DE FECHAMENTO)
  if ((isSpecificNiche && isSpecificGoal) || fullHistoryText.includes('contato') || fullHistoryText.includes('falar') || fullHistoryText.includes('whatsapp') || fullHistoryText.includes('preço')) {
    return {
      reply: `Análise técnica concluída para o setor ${niche}. Sua necessidade de ${goal} exige um protocolo de alta fidelidade que já temos estruturado para escalar seus resultados. Posso transferir seu dossiê para um estrategista humano agora para detalharmos o plano de ação?`,
      shouldRedirect: true,
      suggestedActions: ["Sim, falar com estrategista", "Ver casos de sucesso", "Ainda tenho dúvidas"],
      extractedData: { niche, goal, urgency }
    };
  }

  // RESPOSTA PARA ALIMENTÍCIO / GASTRONOMIA
  if (niche === 'Alimentício/Gastronomia') {
    return {
      reply: "No setor alimentício, o visual é o primeiro sabor que o cliente experimenta. Um design que gera desejo e anúncios geolocalizados são a chave para lotar o salão ou o delivery. Você busca aumentar as vendas diretas agora ou quer reposicionar a imagem da sua marca no digital?",
      shouldRedirect: false,
      suggestedActions: ["Aumentar Vendas (Delivery)", "Reposicionamento de Marca", "Anúncios Locais"],
      extractedData: { niche, urgency }
    };
  }

  // RESPOSTA PARA VAREJO / E-COMMERCE
  if (niche === 'Varejo/E-commerce') {
    return {
      reply: "No varejo, cada clique precisa ser otimizado para a conversão. Trabalhamos com tráfego de intenção para capturar quem já quer comprar. Seu foco hoje é escalar o faturamento da loja online ou melhorar a presença digital do seu PDV físico?",
      shouldRedirect: false,
      suggestedActions: ["Escalar E-commerce", "Tráfego para Loja Física", "Automação de Leads"],
      extractedData: { niche, urgency }
    };
  }

  // RESPOSTA PARA INDÚSTRIA / B2B
  if (niche === 'Indústria/B2B') {
    return {
      reply: "Para indústrias, a venda é baseada em confiança técnica e solidez. Criamos dossiês visuais que traduzem sua capacidade produtiva em autoridade comercial. Você busca captar novos distribuidores ou quer melhorar a apresentação técnica dos seus produtos?",
      shouldRedirect: false,
      suggestedActions: ["Captação de Parceiros", "Dossiês Técnicos", "LinkedIn Ads"],
      extractedData: { niche, urgency }
    };
  }

  // RESPOSTA PARA IMOBILIÁRIO
  if (niche === 'Imobiliário') {
    return {
      reply: "No mercado imobiliário, o CPL (Custo por Lead) qualificado é o que define o sucesso. Filtramos curiosos através de anúncios de alta fidelidade. Você foca em lançamentos de alto padrão ou busca revenda e locação recorrente?",
      shouldRedirect: false,
      suggestedActions: ["Lançamentos de Luxo", "Revenda/Locação", "IA de Atendimento"],
      extractedData: { niche, urgency }
    };
  }

  // FALLBACK / INÍCIO (QUALIFICAÇÃO INICIAL)
  return {
    reply: "Protocolo Sapient iniciado. Para eu ser cirúrgico no seu diagnóstico estratégico: qual o seu nicho de atuação e qual o seu maior desafio comercial hoje?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Clínica", "Jurídico", "Alimentício", "Varejo / E-commerce", "Indústria / B2B", "Outro Nicho"],
    extractedData: { urgency: 'low' }
  };
}
