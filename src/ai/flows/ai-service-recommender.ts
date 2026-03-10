'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Protocolo de Qualificação Profunda V6.
 * Implementa uma jornada de 4 camadas: Identificação -> Ecossistema -> Diagnóstico -> Validação.
 * Mapeia 5 pilares de serviço: Performance, Design, IA, Autoridade e Narrativa.
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
 * Fluxo de recomendação e qualificação estratégica com suporte a FAQ e extração de ecossistema digital.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const historyText = input.history.map(h => h.content.toLowerCase()).join(' ');
  const fullHistoryText = historyText + ' ' + msg;
  const turnCount = input.history.filter(h => h.role === 'user').length + 1;

  // --- 0. INTERCEPTAÇÃO DE DÚVIDAS (FAQ INTELIGENTE) ---
  if (msg.includes('como funciona') || msg.includes('preço') || msg.includes('valor') || msg.includes('custo') || msg.includes('tempo')) {
    return {
      reply: "Nossa metodologia é consultiva. Não entregamos 'posts' ou 'anúncios' isolados, mas ecossistemas de autoridade. O investimento é calculado após o diagnóstico técnico do seu nicho, focando no ROI. Quer continuar o diagnóstico para eu entender seu potencial de escala?",
      shouldRedirect: false,
      suggestedActions: ["Sim, continuar diagnóstico", "Ver casos de sucesso", "Falar com humano agora"]
    };
  }

  // --- 1. EXTRAÇÃO DE NICHO (EXPANDIDO V6) ---
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

  // --- 2. MAPEAMENTO DE SERVIÇO SAPIENT ---
  let goal = 'Crescimento Geral';
  if (fullHistoryText.match(/(anúncio|tráfego|vendas|google|meta|ads|leads|vender)/)) goal = 'Performance Ads';
  else if (fullHistoryText.match(/(marca|design|logo|visual|identidade|bonito|premium)/)) goal = 'Design Estratégico';
  else if (fullHistoryText.match(/(ia|bot|automação|atendimento|chat|inteligência)/)) goal = 'Ecossistemas de IA';
  else if (fullHistoryText.match(/(social|instagram|autoridade|feed|redes|seguidores)/)) goal = 'Gestão de Autoridade';
  else if (fullHistoryText.match(/(apresentação|dossiê|venda|explicar|narrativa|clareza)/)) goal = 'Narrativa Visual';

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
  const isSpecificGoal = goal !== 'Crescimento Geral';
  const hasPlatforms = platforms.length > 0;

  // --- LÓGICA DE JORNADA EM 4 CAMADAS ---

  // CAMADA 4: VALIDAÇÃO FINAL E TRANSFERÊNCIA
  if (isSpecificNiche && isSpecificGoal && hasPlatforms && turnCount >= 4) {
    return {
      reply: `Dossiê consolidado: Mapeamos seu ecossistema no setor ${niche} com foco em ${goal}. Sua presença no ${platforms.join(', ')} será o pilar da nossa estratégia de escala. Posso transferir seu diagnóstico agora para um estrategista humano finalizar o plano de ROI?`,
      shouldRedirect: true,
      suggestedActions: ["Sim, falar com estrategista", "Ver casos de sucesso do setor"],
      extractedData: { niche, goal, urgency, platforms }
    };
  }

  // CAMADA 3: DIAGNÓSTICO TÉCNICO (PERGUNTA MATADORA POR SERVIÇO)
  if (isSpecificNiche && turnCount >= 3) {
    if (goal === 'Performance Ads') {
      return {
        reply: `Para ${niche}, tráfego pago é sobre captura de intenção. Hoje seu maior desafio é o custo por lead (CPA) ou a qualidade das pessoas que chegam até você?`,
        shouldRedirect: false,
        suggestedActions: ["Custo por Lead Alto", "Leads Desqualificados", "Baixo Volume de Cliques"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    if (goal === 'Design Estratégico') {
      return {
        reply: `No setor de ${niche}, a imagem é o seu primeiro fechamento. Você sente que sua marca atual subestima o valor real do seu serviço ou falta clareza na proposta de luxo?`,
        shouldRedirect: false,
        suggestedActions: ["Marca parece Amadora", "Falta de Clareza Visual", "Quero Visual de Elite"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    if (goal === 'Ecossistemas de IA') {
      return {
        reply: `Automação inteligente em ${niche} pode reduzir seu CAC drasticamente. Você busca um atendimento 24/7 via WhatsApp ou a qualificação automática de leads complexos?`,
        shouldRedirect: false,
        suggestedActions: ["WhatsApp API 24/7", "Qualificação de Leads", "Agendamento Automático"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    if (goal === 'Gestão de Autoridade') {
      return {
        reply: `Gerir redes para ${niche} exige curadoria. Você quer transformar seu feed em uma vitrine de autoridade inquestionável ou seu foco é crescimento de base de seguidores?`,
        shouldRedirect: false,
        suggestedActions: ["Vitrine de Autoridade", "Crescimento de Base", "Conteúdo Técnico"],
        extractedData: { niche, goal, urgency, platforms }
      };
    }
    // Fallback de Diagnóstico
    return {
      reply: `Entendi o cenário de ${niche}. Qual o principal 'bloqueador' hoje: falta de leads qualificados ou uma percepção de marca que não condiz com seu preço premium?`,
      shouldRedirect: false,
      suggestedActions: ["Falta de Leads", "Percepção de Valor", "Processo de Venda Lento"],
      extractedData: { niche, goal, urgency, platforms }
    };
  }

  // CAMADA 2: MAPEAMENTO DE ECOSSISTEMA
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Certo, para o setor de ${niche}, o canal define o ROI. Hoje você já possui presença ativa no Instagram ou seu foco é ser encontrado no Google por quem busca urgência?`,
      shouldRedirect: false,
      suggestedActions: ["Foco em Instagram", "Foco em Google Search", "Ambos os canais", "Não tenho presença"],
      extractedData: { niche, goal, urgency }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para um diagnóstico de autoridade: qual o seu nicho de atuação e qual o seu maior desafio hoje (Vendas, Marca ou Automação)?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Médicos", "Jurídico / Advogados", "Imobiliário / Imóveis", "Alimentício / Gastronomia", "Educação / Cursos", "Indústria / B2B"],
    extractedData: { urgency: 'low' }
  };
}
