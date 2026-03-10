'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Protocolo de Ecossistema Integrado V7.
 * Implementa uma jornada holística onde o cliente é qualificado para múltiplos serviços simultâneos.
 * Mapeia a sinergia entre: Performance, Design, IA, Autoridade e Narrativa.
 */

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  extractedData?: {
    niche?: string;
    goals?: string[];
    urgency?: 'low' | 'medium' | 'high';
    platforms?: string[];
    details?: string;
  };
};

export type RecommenderInput = {
  history: { role: 'user' | 'model'; content: string }[];
  currentMessage: string;
};

/**
 * Fluxo de recomendação e qualificação estratégica com suporte a ecossistemas multi-serviço.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const historyText = input.history.map(h => h.content.toLowerCase()).join(' ');
  const fullHistoryText = historyText + ' ' + msg;
  const turnCount = input.history.filter(h => h.role === 'user').length + 1;

  // --- 0. INTERCEPTAÇÃO DE DÚVIDAS (FAQ ESTRATÉGICO) ---
  if (msg.includes('como funciona') || msg.includes('preço') || msg.includes('valor') || msg.includes('custo') || msg.includes('tempo')) {
    return {
      reply: "Nossa metodologia é integrada. Não vendemos 'serviços isolados', mas construímos o motor de crescimento do seu negócio. O investimento é definido após mapearmos seu ecossistema (Performance + Marca + IA). Quer continuar o diagnóstico para eu desenhar sua estratégia completa?",
      shouldRedirect: false,
      suggestedActions: ["Sim, desenhar estratégia", "Ver ecossistemas de sucesso", "Falar com estrategista agora"]
    };
  }

  // --- 1. EXTRAÇÃO DE NICHO (V7) ---
  let niche = 'Não identificado';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|dentista|psicólogo|nutri)/)) niche = 'Saúde/Médico';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|lei)/)) niche = 'Jurídico';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|venda de imóvel)/)) niche = 'Imobiliário';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|venda online|produto)/)) niche = 'Varejo/E-commerce';
  else if (fullHistoryText.match(/(educação|curso|escola|mentor|infoproduto|aula)/)) niche = 'Educação/Infoprodutos';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|alimentício|delivery)/)) niche = 'Alimentício/Gastronomia';
  else if (fullHistoryText.match(/(estética|beleza|academia|fitness|wellness|moda)/)) niche = 'Moda/Wellness';
  else if (fullHistoryText.match(/(indústria|fábrica|b2b|produção)/)) niche = 'Indústria/B2B';
  else if (fullHistoryText.match(/(consultoria|tecnologia|ti|software|saas)/)) niche = 'Tecnologia/Serviços';

  // --- 2. MAPEAMENTO MULTI-SERVIÇO (V7) ---
  const goals: string[] = [];
  if (fullHistoryText.match(/(anúncio|tráfego|vendas|google|meta|ads|leads|vender)/)) goals.push('Performance Ads');
  if (fullHistoryText.match(/(marca|design|logo|visual|identidade|bonito|premium)/)) goals.push('Design Estratégico');
  if (fullHistoryText.match(/(ia|bot|automação|atendimento|chat|inteligência)/)) goals.push('Ecossistemas de IA');
  if (fullHistoryText.match(/(social|instagram|autoridade|feed|redes|seguidores)/)) goals.push('Gestão de Autoridade');
  if (fullHistoryText.match(/(apresentação|dossiê|venda|explicar|narrativa|clareza)/)) goals.push('Narrativa Visual');

  // --- 3. MAPEAMENTO DE ECOSSISTEMA (PLATAFORMAS) ---
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google')) platforms.push('Google Ads');
  if (fullHistoryText.includes('facebook') || fullHistoryText.includes('meta')) platforms.push('Meta Ads');
  if (fullHistoryText.includes('linkedin')) platforms.push('LinkedIn');
  if (fullHistoryText.includes('tiktok')) platforms.push('TikTok');
  if (fullHistoryText.includes('whatsapp')) platforms.push('WhatsApp');
  if (fullHistoryText.includes('site') || fullHistoryText.includes('página')) platforms.push('Site Próprio');

  // --- 4. DETECÇÃO DE URGÊNCIA ---
  let urgency: 'low' | 'medium' | 'high' = 'low';
  if (fullHistoryText.match(/(agora|urgente|rápido|imediat|ontem)/)) urgency = 'high';
  else if (fullHistoryText.match(/(preciso|buscando|querendo|planejando)/)) urgency = 'medium';

  const isSpecificNiche = niche !== 'Não identificado';
  const hasGoals = goals.length > 0;
  const hasMultipleGoals = goals.length > 1;

  // --- LÓGICA DE JORNADA HOLÍSTICA ---

  // CAMADA 4: VALIDAÇÃO FINAL E TRANSFERÊNCIA DE ECOSSISTEMA
  if (isSpecificNiche && hasGoals && turnCount >= 4) {
    const goalsSummary = goals.join(' + ');
    return {
      reply: `Dossiê Consolidado: Mapeamos uma necessidade de ecossistema para o setor ${niche} focando em ${goalsSummary}. Sua presença no ${platforms.length > 0 ? platforms.join(', ') : 'canais a definir'} será o pilar da nossa estratégia de escala integrada. Posso transferir seu diagnóstico agora para um estrategista humano finalizar o plano de ROI?`,
      shouldRedirect: true,
      suggestedActions: ["Sim, falar com estrategista", "Ver cases multi-serviço"],
      extractedData: { niche, goals, urgency, platforms }
    };
  }

  // CAMADA 3: DIAGNÓSTICO INTEGRADO (PERGUNTA MATADORA DE SINERGIA)
  if (isSpecificNiche && turnCount >= 3) {
    if (hasMultipleGoals) {
      return {
        reply: `Para o setor de ${niche}, a união de ${goals[0]} com ${goals[1]} é o que separa amadores de líderes. Hoje, você sente que sua maior perda de ROI está na falta de atração de novos clientes ou na baixa percepção de valor quando eles chegam até você?`,
        shouldRedirect: false,
        suggestedActions: ["Falta de Atração (Vendas)", "Baixa Percepção (Marca)", "Ambos os problemas"],
        extractedData: { niche, goals, urgency, platforms }
      };
    }
    
    // Fallback se tiver apenas um interesse claro
    const currentGoal = goals[0] || "Crescimento Geral";
    return {
      reply: `Entendi seu foco em ${currentGoal} para o setor de ${niche}. Além disso, você acredita que um design mais premium ou uma automação de atendimento potencializariam seus resultados atuais?`,
      shouldRedirect: false,
      suggestedActions: ["Sim, Design Premium", "Sim, Automação IA", "Apenas Tráfego por enquanto"],
      extractedData: { niche, goals, urgency, platforms }
    };
  }

  // CAMADA 2: MAPEAMENTO DE ECOSSISTEMA ATUAL
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Excelente cenário para ${niche}. Para desenharmos a estratégia integrada: onde você concentra seus esforços hoje e qual canal você sente que está subutilizado (Instagram, Google, LinkedIn ou Site)?`,
      shouldRedirect: false,
      suggestedActions: ["Instagram / Redes", "Google / Buscas", "LinkedIn / B2B", "Não tenho presença clara"],
      extractedData: { niche, goals, urgency }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO HOLÍSTICA (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e onde você sente que seu negócio mais 'vaza' resultados hoje: em Vendas, na Imagem de Marca ou na Eficiência de Atendimento?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Médicos", "Jurídico / Advogados", "Imobiliário / Imóveis", "Varejo / E-commerce", "Tecnologia / SaaS", "Indústria / B2B"],
    extractedData: { urgency: 'low' }
  };
}
