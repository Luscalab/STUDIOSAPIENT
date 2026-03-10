'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Protocolo de Ecossistema Integrado V8.2.
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
 * Fluxo de recomendação e qualificação estratégica com suporte a ecossistemas multi-serviço (V8.2).
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

  // --- 1. EXTRAÇÃO DE NICHO (V8.2 - EXPANDIDO) ---
  let niche = 'Não identificado';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|dentista|psicólogo|nutri|fisio|terapeuta|fisioterapeuta|odontolog|estética|harmonização)/)) niche = 'Saúde & Wellness';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|lei|causa|legal|processo judicial|juridico)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|venda de imóvel|loteadora|incorporadora|condomínio|imobiliaria)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|venda online|produto|comércio|shop|venda direta|ecommerce)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(educação|curso|escola|mentor|infoproduto|aula|professor|faculdade|ead|treinamento|infoprodutor)/)) niche = 'Educação & Infoprodutos';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|alimentício|delivery|café|hamburgueria|pizzaria|buffet|alimenticio)/)) niche = 'Alimentício & Gastronomia';
  else if (fullHistoryText.match(/(beleza|academia|fitness|moda|boutique|joalheria|luxo|personal trainer|relogios|carros de luxo)/)) niche = 'Estética, Moda & Luxo';
  else if (fullHistoryText.match(/(indústria|fábrica|b2b|produção|usinagem|logística|transporte|distribuidora|industria)/)) niche = 'Indústria & B2B';
  else if (fullHistoryText.match(/(consultoria|tecnologia|ti|software|saas|startup|agência|marketing|engenharia|ti)/)) niche = 'Tecnologia & Serviços';
  else if (fullHistoryText.match(/(arquiteto|arquitetura|interiores|decoração|obra|reforma|paisagismo|arquiteta)/)) niche = 'Arquitetura & Interiores';
  else if (fullHistoryText.match(/(carro|automóvel|veículo|concessionária|oficina|revenda|blindagem|automotivo)/)) niche = 'Setor Automotivo';
  else if (fullHistoryText.match(/(pet|veterinário|vet|clínica pet|banho e tosa|petshop|animal|cachorro|gato)/)) niche = 'Setor Pet & Vet';
  else if (fullHistoryText.match(/(contador|contabilidade|financeiro|fiscal|tributário|investimento|banco|contabil)/)) niche = 'Finanças & Contabilidade';

  // --- 2. MAPEAMENTO MULTI-SERVIÇO ---
  const servicesNeeded: string[] = [];
  if (fullHistoryText.match(/(anúncio|tráfego|vendas|google|meta|ads|leads|vender|clientes|google ads|meta ads|facebook ads)/)) servicesNeeded.push('Performance Ads');
  if (fullHistoryText.match(/(marca|design|logo|visual|identidade|bonito|premium|percepção|luxo|branding|rebranding)/)) servicesNeeded.push('Design Estratégico');
  if (fullHistoryText.match(/(ia|bot|automação|atendimento|chat|inteligência|agilidade|chatbot|ia generativa)/)) servicesNeeded.push('Ecossistemas de IA');
  if (fullHistoryText.match(/(social|instagram|autoridade|feed|redes|seguidores|engajamento|tiktok|linkedin|presença)/)) servicesNeeded.push('Gestão de Autoridade');
  if (fullHistoryText.match(/(apresentação|dossiê|venda|explicar|narrativa|clareza|processo|infográfico|proposta)/)) servicesNeeded.push('Narrativa Visual');

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
  if (fullHistoryText.match(/(agora|urgente|rápido|imediat|ontem|parado|faturar)/)) urgency = 'high';
  else if (fullHistoryText.match(/(preciso|buscando|querendo|planejando|olhando|pensando)/)) urgency = 'medium';

  const isSpecificNiche = niche !== 'Não identificado';

  // --- CAMADAS DE JORNADA V8.2 ---

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
    let provocation = "";
    if (niche === 'Saúde & Wellness') provocation = "No setor de saúde, tráfego sem autoridade visual gera 'leads de preço'. Hoje você sente que as pessoas chegam valorizando seu trabalho ou apenas comparando valores?";
    else if (niche === 'Jurídico & Direito') provocation = "Para advogados, o design de autoridade é o que separa um 'custo' de um 'investimento'. Como está a percepção de prestígio do seu escritório hoje?";
    else if (niche === 'Imobiliário & Incorporação') provocation = "No imobiliário, a demora no atendimento mata a venda. Você já pensou em usar IA para qualificar o lead no exato segundo que ele clica no anúncio?";
    else if (niche === 'Tecnologia & Serviços') provocation = "SaaS e Tecnologia precisam de clareza absoluta. Sua narrativa visual hoje consegue explicar o valor do seu software em menos de 10 segundos?";
    else if (niche === 'Finanças & Contabilidade') provocation = "Contabilidade e Finanças lidam com confiança extrema. Sua imagem digital hoje transmite a segurança de um grande banco ou de um escritório pequeno?";
    else if (niche === 'Setor Pet & Vet') provocation = "Clínicas pet competem por amor e confiança. Como está o 'encantamento' visual do seu perfil para que o tutor escolha você e não o vizinho mais barato?";
    else if (niche === 'Setor Automotivo') provocation = "No setor automotivo premium, a foto é o primeiro test-drive. Seu design visual hoje faz o cliente sentir o 'cheiro de carro novo' ou parece amador?";
    else provocation = `Para o setor de ${niche}, a sinergia entre ${servicesNeeded[0] || 'Branding'} e ${servicesNeeded[1] || 'Performance'} é o que traz o ROI real. Hoje, onde está seu maior 'vazamento' de resultados?`;

    return {
      reply: provocation,
      shouldRedirect: false,
      currentLayer: 3,
      suggestedActions: ["Leads Desqualificados", "Baixa Percepção de Valor", "Atendimento Lento", "Falta de Clareza Técnica"],
      extractedData: { niche, servicesNeeded, urgency, platforms }
    };
  }

  // CAMADA 2: MAPEAMENTO DE ECOSSISTEMA ATUAL
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Cenário claro para ${niche}. Para desenharmos sua estratégia integrada: em quais canais você concentra seus esforços hoje e qual canal você sente que está subutilizado (Instagram, Google, LinkedIn ou seu próprio Site)?`,
      shouldRedirect: false,
      currentLayer: 2,
      suggestedActions: ["Instagram / Social", "Google / Buscas", "LinkedIn / B2B", "Não tenho presença clara", "Meu Site não converte"],
      extractedData: { niche, servicesNeeded, urgency }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO HOLÍSTICA (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e onde você sente que seu negócio mais 'vaza' resultados hoje: em Vendas, na Imagem de Marca ou na Eficiência de Atendimento?",
    shouldRedirect: false,
    currentLayer: 1,
    suggestedActions: ["Saúde & Wellness", "Jurídico & Advogados", "Imobiliário & Imóveis", "Varejo & E-commerce", "Tecnologia & SaaS", "Indústria & B2B", "Arquitetura & Interiores", "Setor Automotivo", "Setor Pet & Vet", "Finanças & Contabilidade"],
    extractedData: { urgency: 'low' }
  };
}
