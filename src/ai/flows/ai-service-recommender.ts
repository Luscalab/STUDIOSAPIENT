'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Protocolo de Ecossistema Integrado V8.
 * Implementa uma jornada holística de 4 camadas para qualificação de leads de alto padrão.
 * Mapeia sinergias entre: Performance Ads, Design Estratégico, Ecossistemas de IA, Autoridade Social e Narrativa Visual.
 */

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  currentLayer: number;
  extractedData?: {
    niche?: string;
    goals?: string[];
    urgency?: 'low' | 'medium' | 'high';
    platforms?: string[];
    details?: string;
    servicesNeeded?: string[];
  };
};

export type RecommenderInput = {
  history: { role: 'user' | 'model'; content: string }[];
  currentMessage: string;
};

/**
 * Fluxo de recomendação e qualificação estratégica com suporte a ecossistemas multi-serviço (V8).
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const historyText = input.history.map(h => h.content.toLowerCase()).join(' ');
  const fullHistoryText = historyText + ' ' + msg;
  const turnCount = input.history.filter(h => h.role === 'user').length + 1;

  // --- 0. INTERCEPTAÇÃO DE DÚVIDAS E FAQ ESTRATÉGICO ---
  if (msg.includes('como funciona') || msg.includes('preço') || msg.includes('valor') || msg.includes('custo') || msg.includes('tempo')) {
    return {
      reply: "Nossa metodologia Sapient é baseada em Ecossistemas de Crescimento. Não entregamos apenas 'posts' ou 'anúncios', mas construímos o motor de autoridade do seu negócio. O investimento é personalizado conforme a complexidade do ecossistema necessário (Performance + Marca + IA). Quer terminar de mapear seu cenário para eu desenhar o plano de ROI?",
      shouldRedirect: false,
      currentLayer: 0,
      suggestedActions: ["Sim, terminar mapeamento", "Ver cases de sucesso", "Falar com estrategista"]
    };
  }

  // --- 1. EXTRAÇÃO DE NICHO (V8 - EXPANDIDO) ---
  let niche = 'Não identificado';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|dentista|psicólogo|nutri|fisio)/)) niche = 'Saúde & Wellness';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|lei|causa)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|venda de imóvel|loteadora)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|venda online|produto|comércio)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(educação|curso|escola|mentor|infoproduto|aula|professor|faculdade)/)) niche = 'Educação & Infoprodutos';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|alimentício|delivery|café)/)) niche = 'Alimentício & Gastronomia';
  else if (fullHistoryText.match(/(estética|beleza|academia|fitness|moda|boutique|joalheria)/)) niche = 'Estética, Moda & Luxo';
  else if (fullHistoryText.match(/(indústria|fábrica|b2b|produção|usinagem)/)) niche = 'Indústria & B2B';
  else if (fullHistoryText.match(/(consultoria|tecnologia|ti|software|saas|startup)/)) niche = 'Tecnologia & Serviços';
  else if (fullHistoryText.match(/(arquiteto|arquitetura|interiores|decoração|obra|reforma)/)) niche = 'Arquitetura & Interiores';
  else if (fullHistoryText.match(/(carro|automóvel|veículo|concessionária|oficina|revenda)/)) niche = 'Setor Automotivo';
  else if (fullHistoryText.match(/(pet|veterinário|vet|clínica pet|banho e tosa)/)) niche = 'Setor Pet & Vet';

  // --- 2. MAPEAMENTO MULTI-SERVIÇO ---
  const servicesNeeded: string[] = [];
  if (fullHistoryText.match(/(anúncio|tráfego|vendas|google|meta|ads|leads|vender|clientes)/)) servicesNeeded.push('Performance Ads');
  if (fullHistoryText.match(/(marca|design|logo|visual|identidade|bonito|premium|percepção|luxo)/)) servicesNeeded.push('Design Estratégico');
  if (fullHistoryText.match(/(ia|bot|automação|atendimento|chat|inteligência|agilidade)/)) servicesNeeded.push('Ecossistemas de IA');
  if (fullHistoryText.match(/(social|instagram|autoridade|feed|redes|seguidores|engajamento)/)) servicesNeeded.push('Gestão de Autoridade');
  if (fullHistoryText.match(/(apresentação|dossiê|venda|explicar|narrativa|clareza|processo)/)) servicesNeeded.push('Narrativa Visual');

  // --- 3. MAPEAMENTO DE PLATAFORMAS ---
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google')) platforms.push('Google Ads');
  if (fullHistoryText.includes('facebook') || fullHistoryText.includes('meta')) platforms.push('Meta Ads');
  if (fullHistoryText.includes('linkedin')) platforms.push('LinkedIn');
  if (fullHistoryText.includes('tiktok')) platforms.push('TikTok');
  if (fullHistoryText.includes('whatsapp')) platforms.push('WhatsApp');
  if (fullHistoryText.includes('site') || fullHistoryText.includes('página') || fullHistoryText.includes('landing')) platforms.push('Site Próprio');

  // --- 4. DETECÇÃO DE URGÊNCIA ---
  let urgency: 'low' | 'medium' | 'high' = 'low';
  if (fullHistoryText.match(/(agora|urgente|rápido|imediat|ontem|parado)/)) urgency = 'high';
  else if (fullHistoryText.match(/(preciso|buscando|querendo|planejando|olhando)/)) urgency = 'medium';

  const isSpecificNiche = niche !== 'Não identificado';
  const hasMultipleServices = servicesNeeded.length > 1;

  // --- CAMADAS DE JORNADA V8 ---

  // CAMADA 4: FINALIZAÇÃO E TRANSFERÊNCIA (HANDOFF)
  if (isSpecificNiche && turnCount >= 4) {
    const servicesSummary = servicesNeeded.length > 0 ? servicesNeeded.join(' + ') : 'Ecossistema Completo';
    return {
      reply: `Dossiê Consolidado: Mapeamos uma necessidade de ecossistema para o setor de ${niche} focando em ${servicesSummary}. Sua presença no ${platforms.length > 0 ? platforms.join(', ') : 'canais digitais'} será o pilar da nossa estratégia de escala. Posso transferir seu diagnóstico agora para um estrategista humano finalizar o plano de ROI e viabilidade?`,
      shouldRedirect: true,
      currentLayer: 4,
      suggestedActions: ["Sim, falar com estrategista", "Ver cases multi-serviço"],
      extractedData: { niche, servicesNeeded, urgency, platforms }
    };
  }

  // CAMADA 3: DIAGNÓSTICO DE SINERGIA (PROVOCAÇÃO TÉCNICA)
  if (isSpecificNiche && turnCount >= 3) {
    if (hasMultipleServices) {
      return {
        reply: `Para ${niche}, a união de ${servicesNeeded[0]} com ${servicesNeeded[1]} é fundamental. Hoje, você sente que sua maior perda de faturamento está na falta de novos leads qualificados ou na baixa percepção de valor quando o cliente chega até você e vê uma marca que não condiz com seu preço?`,
        shouldRedirect: false,
        currentLayer: 3,
        suggestedActions: ["Falta de Leads (Volume)", "Baixa Percepção (Valor)", "Ambos os Problemas"],
        extractedData: { niche, servicesNeeded, urgency, platforms }
      };
    }
    
    const currentFocus = servicesNeeded[0] || "Crescimento Geral";
    return {
      reply: `Entendi seu foco em ${currentFocus} para o setor de ${niche}. Além disso, você acredita que um design mais premium ou uma automação de atendimento por IA potencializariam seus resultados atuais retirando carga do seu time comercial?`,
      shouldRedirect: false,
      currentLayer: 3,
      suggestedActions: ["Sim, Design Premium", "Sim, Automação IA", "Apenas Tráfego por enquanto"],
      extractedData: { niche, servicesNeeded, urgency, platforms }
    };
  }

  // CAMADA 2: MAPEAMENTO DE ECOSSISTEMA ATUAL
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Cenário muito claro para ${niche}. Para desenharmos sua estratégia integrada: em quais canais você concentra seus esforços hoje e qual canal você sente que está subutilizado (Instagram, Google, LinkedIn ou seu próprio Site)?`,
      shouldRedirect: false,
      currentLayer: 2,
      suggestedActions: ["Instagram / Social", "Google / Buscas", "LinkedIn / B2B", "Não tenho presença clara"],
      extractedData: { niche, servicesNeeded, urgency }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO HOLÍSTICA (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e onde você sente que seu negócio mais 'vaza' resultados hoje: em Vendas, na Imagem de Marca ou na Eficiência de Atendimento?",
    shouldRedirect: false,
    currentLayer: 1,
    suggestedActions: ["Saúde & Wellness", "Jurídico & Advogados", "Imobiliário & Imóveis", "Varejo & E-commerce", "Tecnologia & SaaS", "Indústria & B2B", "Arquitetura & Interiores", "Infoprodutos & Mentorias"],
    extractedData: { urgency: 'low' }
  };
}
