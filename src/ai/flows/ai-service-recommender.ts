'use server';

/**
 * @fileOverview Inteligência de Consultoria Exaustiva Sapient Studio - Protocolo V9.1.
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

  // --- 1. EXTRAÇÃO DE NICHO (V9.1 - BIBLIOTECA EXPANDIDA) ---
  let niche = 'Não identificado';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|dentista|psicólogo|nutri|fisio|terapeuta|estética|harmonização)/)) niche = 'Saúde & Wellness';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|lei|legal|processo|juridico)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|loteadora|incorporadora|imobiliaria)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|venda online|produto|comércio|ecommerce|moda|roupa)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(educação|curso|escola|mentor|infoproduto|ead|treinamento|mentoria|palestra)/)) niche = 'Educação & Mentorias';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|alimentício|delivery|pizzaria|alimenticio|bar|café)/)) niche = 'Alimentício & Gastronomia';
  else if (fullHistoryText.match(/(indústria|fábrica|b2b|produção|logística|transporte|industria|distribuidora)/)) niche = 'Indústria & Logística';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas|startup|engenharia|ti|programação)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(carro|automóvel|veículo|concessionária|oficina|automotivo|blindagem)/)) niche = 'Setor Automotivo';
  else if (fullHistoryText.match(/(contador|contabilidade|financeiro|fiscal|investimento|contabil|seguros|banco)/)) niche = 'Finanças & Contabilidade';
  else if (fullHistoryText.match(/(arquiteto|arquitetura|interiores|decoração|obra|reforma|paisagismo)/)) niche = 'Arquitetura & Design';
  else if (fullHistoryText.match(/(evento|festa|casamento|turismo|viagem|hotel|pousada|agência de viagem)/)) niche = 'Eventos & Turismo';
  else if (fullHistoryText.match(/(academia|personal|crossfit|yoga|bem estar|fitness|esporte)/)) niche = 'Fitness & Performance';
  else if (fullHistoryText.match(/(consultor|consultoria|freelancer|especialista|coach|treinador)/)) niche = 'Consultoria Especializada';

  // --- 2. MAPEAMENTO DE SERVIÇOS (PILORES SAPIENT) ---
  const servicesNeeded: string[] = [];
  if (fullHistoryText.match(/(anúncio|tráfego|google|meta|ads|leads|vender|clientes|prospecção|prospeccao)/)) servicesNeeded.push('Performance Ads');
  if (fullHistoryText.match(/(marca|design|logo|visual|premium|luxo|branding|rebranding|identidade|bonito|profissional)/)) servicesNeeded.push('Design Estratégico');
  if (fullHistoryText.match(/(ia|bot|automação|atendimento|chat|inteligência|agilidade|chatbot|automacao)/)) servicesNeeded.push('Ecossistemas de IA');
  if (fullHistoryText.match(/(social|instagram|autoridade|feed|seguidores|engajamento|post|rede social|presença)/)) servicesNeeded.push('Gestão de Autoridade');
  if (fullHistoryText.match(/(apresentação|dossiê|venda|narrativa|clareza|proposta|pitch|explicar|convencer)/)) servicesNeeded.push('Narrativa Visual');

  // --- 3. MAPEAMENTO DE PLATAFORMAS ---
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google')) platforms.push('Google Ads');
  if (fullHistoryText.includes('facebook') || fullHistoryText.includes('meta')) platforms.push('Meta Ads');
  if (fullHistoryText.includes('linkedin')) platforms.push('LinkedIn');
  if (fullHistoryText.includes('whatsapp')) platforms.push('WhatsApp');
  if (fullHistoryText.includes('site') || fullHistoryText.includes('página') || fullHistoryText.includes('landing')) platforms.push('Site/LP');

  // --- 4. DETECÇÃO DE GARGALOS (PAIN POINTS V9.1) ---
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads ruins|curiosos|preço|barato|baixo|qualificar|qualificado)/)) mainPainPoints.push('Leads Desqualificados');
  if (fullHistoryText.match(/(demora|lento|esquecer|atraso|atender|responder|vácuo|vacuo)/)) mainPainPoints.push('Atendimento Ineficiente');
  if (fullHistoryText.match(/(antigo|velho|feio|amador|imagem|passado|datado)/)) mainPainPoints.push('Imagem Datada');
  if (fullHistoryText.match(/(difícil|complicado|entender|explicar|confuso|clareza)/)) mainPainPoints.push('Falta de Clareza');
  if (fullHistoryText.match(/(parado|não vende|estagnado|crescer|queda|crise)/)) mainPainPoints.push('Estagnação de Vendas');
  if (fullHistoryText.match(/(indicação|indicaçao|depender|boca a boca|instável|incerto)/)) mainPainPoints.push('Dependência de Indicação');

  // --- LÓGICA DE JORNADA EXAUSTIVA V9.1 ---
  const isSpecificNiche = niche !== 'Não identificado';
  const hasPlatforms = platforms.length > 0;
  const hasPainPoint = mainPainPoints.length > 0;
  const hasServices = servicesNeeded.length > 0;

  // CONDIÇÃO DE FECHAMENTO: Só redireciona se tiver um dossiê sólido e turnCount >= 5
  if (isSpecificNiche && hasPlatforms && hasPainPoint && hasServices && turnCount >= 5) {
    return {
      reply: `Dossiê Consolidado: Mapeamos um ecossistema para ${niche} focado em resolver ${mainPainPoints.join(', ')} através de ${servicesNeeded.join(' + ')}. Seu posicionamento no ${platforms.join(', ')} será o pilar da nossa escala. Posso transferir este diagnóstico agora para um estrategista humano finalizar seu plano de ROI?`,
      shouldRedirect: true,
      currentLayer: 5,
      suggestedActions: ["Sim, falar com estrategista", "Ver cases similares", "Revisar diagnóstico"],
      extractedData: { niche, servicesNeeded, platforms, mainPainPoints }
    };
  }

  // CAMADA 4: VALIDAÇÃO DE ROI E METAS (TURNO 4)
  if (isSpecificNiche && hasPlatforms && hasPainPoint && turnCount >= 4) {
    return {
      reply: `Compreendido. Para o setor de ${niche}, resolver o problema de ${mainPainPoints[0]} é prioridade máxima. Qual o seu objetivo de faturamento ou escala para os próximos 6 meses com esse novo ecossistema integrado?`,
      shouldRedirect: false,
      currentLayer: 4,
      suggestedActions: ["Dobrar Faturamento", "Escalar 30-50%", "Consolidar Autoridade Premium", "Lançar Novo Produto/Serviço"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // CAMADA 3: DESCOBERTA DE GARGALO ("TESTE ÁCIDO" POR NICHO - TURNO 3)
  if (isSpecificNiche && hasPlatforms && turnCount >= 3) {
    let provocation = `Para ${niche} atuando no ${platforms[0]}, onde o ROI mais 'vaza' hoje: leads que só perguntam preço, sua imagem atual que não transmite o valor real do seu serviço ou a demora para dar um retorno qualificado aos interessados?`;
    
    // Provocações Customizadas por Nicho para Alta Autoridade
    if (niche === 'Saúde & Wellness') provocation = "No setor de Saúde, o maior gargalo costuma ser o lead que agenda e não aparece ou o 'curioso de preço'. Como está sua taxa de conversão de agendamentos hoje?";
    if (niche === 'Jurídico & Direito') provocation = "Para escritórios de Direito, autoridade é tudo. Você sente que seu site e redes sociais hoje filtram o cliente ideal ou você acaba perdendo tempo com casos sem fit financeiro?";
    if (niche === 'Arquitetura & Design') provocation = "Projetos de Arquitetura exigem desejo imediato. Seu portfólio digital hoje 'vende' o seu valor de forma autônoma ou você ainda precisa explicar muito o seu preço nas reuniões?";
    if (niche === 'Tecnologia & SaaS') provocation = "Em Tecnologia, clareza é venda. Sua proposta de valor é entendida em menos de 5 segundos no seu site ou o cliente fica confuso com a parte técnica?";
    if (niche === 'Indústria & Logística') provocation = "No B2B Industrial, confiança e histórico são pilares. Sua presença digital hoje transmite a robustez da sua operação para grandes compradores?";

    return {
      reply: provocation,
      shouldRedirect: false,
      currentLayer: 3,
      suggestedActions: ["Leads Desqualificados", "Atendimento Lento", "Imagem/Design Amador", "Falta de Clareza na Oferta", "Baixa Conversão de Vendas"],
      extractedData: { niche, platforms }
    };
  }

  // CAMADA 2: MAPEAMENTO DE ECOSSISTEMA ATUAL (TURNO 2)
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Cenário claro para ${niche}. Para desenharmos sua estratégia integrada: em quais canais você concentra seus esforços hoje (Instagram, Google Ads, LinkedIn, Site Próprio ou indicações)?`,
      shouldRedirect: false,
      currentLayer: 2,
      suggestedActions: ["Instagram Profissional", "Google Ads Ativo", "LinkedIn B2B", "Site/Landing Page", "Apenas Indicações", "Não tenho presença clara"],
      extractedData: { niche }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO HOLÍSTICA (INÍCIO)
  return {
    reply: "Protocolo Sapient iniciado. Para um diagnóstico exaustivo de autoridade e escala: qual o seu nicho de atuação e qual seu principal desafio hoje: Vendas, Imagem de Marca ou Eficiência de Processos?",
    shouldRedirect: false,
    currentLayer: 1,
    suggestedActions: [
      "Saúde & Wellness", 
      "Jurídico & Direito", 
      "Imobiliário & Incorporação", 
      "Arquitetura & Design", 
      "Educação & Mentorias", 
      "Tecnologia & SaaS", 
      "Indústria & Logística", 
      "Varejo & E-commerce", 
      "Setor Automotivo", 
      "Finanças & Contabilidade"
    ],
    extractedData: { urgency: 'medium' }
  };
}
