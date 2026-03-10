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
 * Fluxo de recomendação e qualificação profunda com extração de ecossistema digital e mapeamento de serviços Sapient.
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

  // 2. Extração de Objetivo (Mapeado aos Serviços Sapient)
  let goal = 'Crescimento Geral';
  if (fullHistoryText.includes('anúncio') || fullHistoryText.includes('tráfego') || fullHistoryText.includes('vendas') || fullHistoryText.includes('google') || fullHistoryText.includes('meta')) goal = 'Performance Ads';
  else if (fullHistoryText.includes('marca') || fullHistoryText.includes('design') || fullHistoryText.includes('logo') || fullHistoryText.includes('visual')) goal = 'Design Estratégico';
  else if (fullHistoryText.includes('ia') || fullHistoryText.includes('bot') || fullHistoryText.includes('automação') || fullHistoryText.includes('atendimento') || fullHistoryText.includes('chat')) goal = 'Ecossistemas de IA';
  else if (fullHistoryText.includes('social') || fullHistoryText.includes('instagram') || fullHistoryText.includes('autoridade') || fullHistoryText.includes('feed')) goal = 'Gestão de Autoridade';
  else if (fullHistoryText.includes('apresentação') || fullHistoryText.includes('dossiê') || fullHistoryText.includes('venda') || fullHistoryText.includes('infográfico') || fullHistoryText.includes('explicar')) goal = 'Narrativa Visual';

  // 3. Extração de Plataformas Atuais
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
  if (fullHistoryText.includes('agora') || fullHistoryText.includes('urgente') || fullHistoryText.includes('rápido') || fullHistoryText.includes('imediat')) urgency = 'high';
  else if (fullHistoryText.includes('preciso') || fullHistoryText.includes('buscando') || fullHistoryText.includes('querendo') || fullHistoryText.includes('planejando')) urgency = 'medium';

  const isSpecificNiche = niche !== 'Não identificado';
  const isSpecificGoal = goal !== 'Crescimento Geral';
  const hasPlatforms = platforms.length > 0;

  // --- LÓGICA DE JORNADA DE 4 CAMADAS ---

  // CAMADA 4: VALIDAÇÃO FINAL (MÍNIMO 4 TURNOS OU DADOS COMPLETOS)
  if (isSpecificNiche && isSpecificGoal && hasPlatforms && turnCount >= 4) {
    return {
      reply: `Dossiê de diagnóstico consolidado. Mapeamos seu ecossistema no setor ${niche} com foco em ${goal}. Sua presença no ${platforms.join(', ')} será o pilar da nossa estratégia. Posso transferir sua análise agora para um estrategista humano detalhar o plano de ROI e cronograma?`,
      shouldRedirect: true,
      suggestedActions: ["Sim, falar com estrategista", "Ver casos de sucesso do setor", "Ainda tenho dúvidas técnicas"],
      extractedData: { niche, goal, urgency, platforms }
    };
  }

  // CAMADA 3: DIAGNÓSTICO TÉCNICO (BASEADO NO SERVIÇO IDENTIFICADO)
  if (isSpecificNiche && turnCount >= 3) {
    if (goal === 'Performance Ads') {
      return {
        reply: `Para ${niche}, tráfego pago é sobre captura de intenção. Você busca dominar as buscas de urgência no Google ou quer gerar desejo via Meta Ads (Instagram/FB) para um público frio?`,
        shouldRedirect: false,
        suggestedActions: ["Domínio Google Search", "Social Ads (Meta)", "Ambos os canais"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    if (goal === 'Design Estratégico') {
      return {
        reply: `No setor de ${niche}, a imagem é sua primeira barreira de confiança. Você sente que sua identidade visual atual está subestimando a qualidade do seu serviço ou falta clareza na sua proposta de valor?`,
        shouldRedirect: false,
        suggestedActions: ["Sinto que perco autoridade", "Falta clareza visual", "Quero um visual de luxo"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    if (goal === 'Ecossistemas de IA') {
      return {
        reply: `Automação inteligente em ${niche} pode reduzir seu CAC drasticamente. Seu foco é no atendimento automático 24/7 via WhatsApp ou na qualificação automática de leads complexos?`,
        shouldRedirect: false,
        suggestedActions: ["WhatsApp API 24/7", "Qualificação de Leads", "Automação de Agendamento"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    if (goal === 'Gestão de Autoridade') {
      return {
        reply: `Gerir redes para ${niche} exige curadoria técnica. Você busca aumentar sua base de seguidores ou quer transformar seu feed atual em uma prova de autoridade inquestionável para quem já te visita?`,
        shouldRedirect: false,
        suggestedActions: ["Transformar Feed", "Aumentar Seguidores", "Conteúdo Técnico"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    
    // Fallback de Diagnóstico
    return {
      reply: `Entendi o contexto de ${niche}. No seu cenário atual, qual o principal 'bloqueador' que impede seu próximo nível: falta de leads qualificados ou uma percepção de marca que não condiz com seu preço?`,
      shouldRedirect: false,
      suggestedActions: ["Falta de Leads", "Percepção de Valor", "Processo de Venda Lento"],
      extractedData: { niche, goal, urgency, platforms }
    };
  }

  // CAMADA 2: MAPEAMENTO DE ECOSSISTEMA
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Certo, para o setor de ${niche}, a escolha das plataformas define o custo por aquisição. Hoje você já possui presença ativa no Instagram ou seu foco é ser encontrado por quem busca ativamente no Google?`,
      shouldRedirect: false,
      suggestedActions: ["Foco em Instagram", "Foco em Google Search", "Ambos os canais", "Não tenho presença ainda"],
      extractedData: { niche, goal, urgency }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para um diagnóstico cirúrgico: qual o seu nicho de atuação e qual o seu maior desafio comercial hoje (Vendas, Marca ou Automação)?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Clínica", "Jurídico", "Alimentício / Gastronomia", "Varejo / E-commerce", "Indústria / B2B", "Tecnologia / TI"],
    extractedData: { urgency: 'low' }
  };
}

