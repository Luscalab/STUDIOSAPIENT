'use server';

/**
 * @fileOverview Inteligência de Consultoria Exaustiva Sapient Studio - Protocolo V9.0.
 * Implementa uma jornada de 5 camadas para mapeamento total de ecossistemas digitais.
 * Foca em identificar problemas complexos de ROI, Sinergia e Autoridade antes do handoff humano.
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
    mainPainPoints?: string[];
  };
};

export type RecommenderInput = {
  history: { role: 'user' | 'model'; content: string }[];
  currentMessage: string;
};

export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const historyText = input.history.map(h => h.content.toLowerCase()).join(' ');
  const fullHistoryText = historyText + ' ' + msg;
  const turnCount = input.history.filter(h => h.role === 'user').length + 1;

  // --- 0. INTERCEPTAÇÃO DE FAQ ESTRATÉGICO ---
  if (msg.includes('como funciona') || msg.includes('preço') || msg.includes('valor') || msg.includes('custo') || msg.includes('tempo')) {
    return {
      reply: "Nossa metodologia Sapient é baseada em Ecossistemas de Crescimento. Não entregamos apenas 'serviços isolados', mas construímos o motor de autoridade do seu negócio. O investimento é proporcional à complexidade do ecossistema necessário para atingir seu ROI. Quer terminar de mapear seu cenário para eu desenhar o plano de viabilidade?",
      shouldRedirect: false,
      currentLayer: 0,
      suggestedActions: ["Sim, terminar mapeamento", "Falar com estrategista"]
    };
  }

  // --- 1. EXTRAÇÃO DE NICHO (V9 - ALTA PRECISÃO) ---
  let niche = 'Não identificado';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|dentista|psicólogo|nutri|fisio|terapeuta|estética|harmonização)/)) niche = 'Saúde & Wellness';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|lei|legal|processo|juridico)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|loteadora|incorporadora|imobiliaria)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|venda online|produto|comércio|ecommerce)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(educação|curso|escola|mentor|infoproduto|ead|treinamento)/)) niche = 'Educação & Infoprodutos';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|alimentício|delivery|pizzaria|alimenticio)/)) niche = 'Alimentício & Gastronomia';
  else if (fullHistoryText.match(/(indústria|fábrica|b2b|produção|logística|transporte|industria)/)) niche = 'Indústria & B2B';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas|startup|engenharia)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(carro|automóvel|veículo|concessionária|oficina|automotivo)/)) niche = 'Setor Automotivo';
  else if (fullHistoryText.match(/(contador|contabilidade|financeiro|fiscal|investimento|contabil)/)) niche = 'Finanças & Contabilidade';

  // --- 2. MAPEAMENTO DE SERVIÇOS ---
  const servicesNeeded: string[] = [];
  if (fullHistoryText.match(/(anúncio|tráfego|google|meta|ads|leads|vender|clientes)/)) servicesNeeded.push('Performance Ads');
  if (fullHistoryText.match(/(marca|design|logo|visual|premium|luxo|branding|rebranding)/)) servicesNeeded.push('Design Estratégico');
  if (fullHistoryText.match(/(ia|bot|automação|atendimento|chat|inteligência|agilidade)/)) servicesNeeded.push('Ecossistemas de IA');
  if (fullHistoryText.match(/(social|instagram|autoridade|feed|seguidores|engajamento)/)) servicesNeeded.push('Gestão de Autoridade');
  if (fullHistoryText.match(/(apresentação|dossiê|venda|narrativa|clareza|proposta)/)) servicesNeeded.push('Narrativa Visual');

  // --- 3. MAPEAMENTO DE PLATAFORMAS ---
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google')) platforms.push('Google Ads');
  if (fullHistoryText.includes('facebook') || fullHistoryText.includes('meta')) platforms.push('Meta Ads');
  if (fullHistoryText.includes('linkedin')) platforms.push('LinkedIn');
  if (fullHistoryText.includes('whatsapp')) platforms.push('WhatsApp');
  if (fullHistoryText.includes('site') || fullHistoryText.includes('página') || fullHistoryText.includes('landing')) platforms.push('Site/LP');

  // --- 4. DETECÇÃO DE GARGALOS (PAIN POINTS V9) ---
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads ruins|curiosos|preço|barato|baixo)/)) mainPainPoints.push('Leads Desqualificados');
  if (fullHistoryText.match(/(demora|lento|esquecer|atraso|atender)/)) mainPainPoints.push('Atendimento Lento');
  if (fullHistoryText.match(/(antigo|velho|feio|amador|imagem)/)) mainPainPoints.push('Imagem Datada');
  if (fullHistoryText.match(/(difícil|complicado|entender|explicar)/)) mainPainPoints.push('Falta de Clareza');
  if (fullHistoryText.match(/(parado|não vende|estagnado|crescer)/)) mainPainPoints.push('Estagnação de Vendas');

  // --- LÓGICA DE JORNADA EXAUSTIVA V9 ---
  const isSpecificNiche = niche !== 'Não identificado';
  const hasPlatforms = platforms.length > 0;
  const hasPainPoint = mainPainPoints.length > 0;
  const hasServices = servicesNeeded.length > 0;

  // CONDIÇÃO DE FECHAMENTO: Só redireciona se tiver um dossiê sólido
  if (isSpecificNiche && hasPlatforms && hasPainPoint && hasServices && turnCount >= 5) {
    return {
      reply: `Dossiê Consolidado: Mapeamos um ecossistema para ${niche} focado em resolver ${mainPainPoints.join(', ')} através de ${servicesNeeded.join(' + ')}. Seu posicionamento no ${platforms.join(', ')} será o pilar da nossa escala. Posso transferir este diagnóstico agora para um estrategista humano finalizar seu plano de ROI?`,
      shouldRedirect: true,
      currentLayer: 5,
      suggestedActions: ["Sim, falar com estrategista", "Ver cases similares"],
      extractedData: { niche, servicesNeeded, platforms, mainPainPoints }
    };
  }

  // CAMADA 4: VALIDAÇÃO DE ROI E METAS
  if (isSpecificNiche && hasPlatforms && hasPainPoint && turnCount >= 4) {
    return {
      reply: `Compreendido. Para o setor de ${niche}, resolver o problema de ${mainPainPoints[0]} é prioridade. Qual o seu objetivo de faturamento ou escala para os próximos 6 meses com esse novo ecossistema?`,
      shouldRedirect: false,
      currentLayer: 4,
      suggestedActions: ["Dobrar Faturamento", "Escalar 20-30%", "Consolidar Autoridade", "Lançar Novo Produto"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // CAMADA 3: DESCOBERTA DE GARGALO (O "TESTE ÁCIDO")
  if (isSpecificNiche && hasPlatforms && turnCount >= 3) {
    let provocation = `Para ${niche} atuando no ${platforms[0]}, onde você sente que o dinheiro mais 'vaza' hoje: leads que só perguntam preço, demora no atendimento ou sua imagem atual não transmite o valor real do seu serviço?`;
    return {
      reply: provocation,
      shouldRedirect: false,
      currentLayer: 3,
      suggestedActions: ["Leads Desqualificados", "Atendimento Lento", "Imagem/Design Amador", "Não sou encontrado no Google"],
      extractedData: { niche, platforms }
    };
  }

  // CAMADA 2: MAPEAMENTO DE ECOSSISTEMA ATUAL
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Cenário claro para ${niche}. Para desenharmos sua estratégia integrada: em quais canais você concentra seus esforços hoje (Instagram, Google, LinkedIn ou Site)?`,
      shouldRedirect: false,
      currentLayer: 2,
      suggestedActions: ["Instagram", "Google Ads", "LinkedIn B2B", "Não tenho presença clara", "Meu Site/Landing Page"],
      extractedData: { niche }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO HOLÍSTICA (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para um diagnóstico exaustivo de autoridade e escala: qual o seu nicho de atuação e qual seu principal desafio hoje: Vendas, Imagem de Marca ou Eficiência de Processos?",
    shouldRedirect: false,
    currentLayer: 1,
    suggestedActions: ["Saúde & Wellness", "Jurídico & Direito", "Imobiliário & Incorporação", "Varejo & E-commerce", "Educação & Infoprodutos", "Tecnologia & SaaS", "Indústria & B2B", "Setor Automotivo", "Finanças & Contabilidade"],
    extractedData: { urgency: 'medium' }
  };
}
