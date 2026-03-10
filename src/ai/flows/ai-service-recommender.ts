'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Módulo de Qualificação Profunda V5.
 * Implementa uma jornada de 4 camadas: Identificação -> Ecossistema -> Diagnóstico -> Validação.
 */

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  extractedData?: {
    niche?: string;
    goal?: string;
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
 * Fluxo de recomendação e qualificação profunda com extração de ecossistema digital.
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

  // 3. Extração de Plataformas
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram') || fullHistoryText.includes('insta') || fullHistoryText.includes('reels')) platforms.push('Instagram');
  if (fullHistoryText.includes('google') || fullHistoryText.includes('ads') || fullHistoryText.includes('busca')) platforms.push('Google Ads');
  if (fullHistoryText.includes('facebook') || fullHistoryText.includes('meta')) platforms.push('Facebook/Meta');
  if (fullHistoryText.includes('linkedin')) platforms.push('LinkedIn');
  if (fullHistoryText.includes('tiktok')) platforms.push('TikTok');
  if (fullHistoryText.includes('whatsapp') || fullHistoryText.includes('zap')) platforms.push('WhatsApp');
  if (fullHistoryText.includes('site') || fullHistoryText.includes('página') || fullHistoryText.includes('landing')) platforms.push('Site Próprio');

  // 4. Detecção de Urgência
  let urgency: 'low' | 'medium' | 'high' = 'low';
  if (fullHistoryText.includes('agora') || fullHistoryText.includes('urgente') || fullHistoryText.includes('rápido')) urgency = 'high';
  else if (fullHistoryText.includes('preciso') || fullHistoryText.includes('buscando') || fullHistoryText.includes('querendo')) urgency = 'medium';

  const isSpecificNiche = niche !== 'Não identificado';
  const isSpecificGoal = goal !== 'Crescimento Geral';
  const hasPlatforms = platforms.length > 0;

  // --- LÓGICA DE JORNADA DE 4 CAMADAS ---

  // CAMADA 4: VALIDAÇÃO FINAL (MÍNIMO 4 TURNOS OU DADOS COMPLETOS)
  if (isSpecificNiche && isSpecificGoal && hasPlatforms && turnCount >= 4) {
    return {
      reply: `Excelente. Mapeamos seu ecossistema no ${niche} atuando via ${platforms.join(', ')}. Sua necessidade de ${goal} exige um protocolo de alta fidelidade. Posso transferir seu dossiê para um estrategista humano agora para detalharmos o plano de ação e o ROI esperado?`,
      shouldRedirect: true,
      suggestedActions: ["Sim, falar com estrategista", "Ver casos de sucesso", "Ainda tenho dúvidas"],
      extractedData: { niche, goal, urgency, platforms }
    };
  }

  // CAMADA 3: ECOSSISTEMA E REDES (CASO TENHA NICHO MAS NÃO PLATAFORMAS)
  if (isSpecificNiche && !hasPlatforms && turnCount >= 2) {
    return {
      reply: `Para o setor de ${niche}, a escolha dos canais é crítica. Hoje você já possui presença ativa no Instagram ou seu foco é ser encontrado por quem busca ativamente no Google?`,
      shouldRedirect: false,
      suggestedActions: ["Foco em Instagram", "Foco em Google Search", "LinkedIn (B2B)", "Não tenho presença ainda"],
      extractedData: { niche, goal, urgency }
    };
  }

  // CAMADA 2: DIAGNÓSTICO TÉCNICO (APÓS IDENTIFICAR NICHO)
  if (isSpecificNiche && turnCount < 4) {
    if (niche === 'Alimentício/Gastronomia') {
      return {
        reply: "No setor alimentício, o visual é o primeiro sabor. Você já trabalha com tráfego geolocalizado para delivery ou seu foco é atrair clientes para o salão físico?",
        shouldRedirect: false,
        suggestedActions: ["Foco em Delivery", "Atrair para Salão", "Instagram Profissional"],
        extractedData: { niche, urgency, platforms }
      };
    }
    if (niche === 'Saúde/Médico') {
      return {
        reply: "Para clínicas e médicos, a barreira de confiança é o que define a conversão. Você busca um posicionamento de autoridade no Instagram ou quer dominar as buscas de urgência no Google agora?",
        shouldRedirect: false,
        suggestedActions: ["Autoridade Instagram", "Domínio Google Ads", "Ambos"],
        extractedData: { niche, urgency, platforms }
      };
    }
    
    // Fallback de Diagnóstico para outros nichos
    return {
      reply: `Interessante. No setor de ${niche}, o maior erro é a dispersão de verba. Qual seu maior desafio hoje: Gerar leads qualificados ou melhorar a percepção de valor da sua marca?`,
      shouldRedirect: false,
      suggestedActions: ["Gerar Leads", "Percepção de Valor", "Automação de Vendas"],
      extractedData: { niche, urgency, platforms }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para eu ser cirúrgico no seu diagnóstico estratégico: qual o seu nicho de atuação e qual o seu maior desafio comercial hoje?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Clínica", "Jurídico", "Alimentício", "Varejo / E-commerce", "Indústria / B2B", "Consultoria / TI"],
    extractedData: { urgency: 'low' }
  };
}
