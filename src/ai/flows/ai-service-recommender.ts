'use server';

/**
 * @fileOverview Inteligência de Estratégia de Autoridade Sapient Studio - Protocolo V10.
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
    roiGoal?: string;
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
      reply: "Nossa metodologia Sapient é baseada em Ecossistemas de Crescimento. Não entregamos apenas serviços isolados, mas construímos o motor de autoridade do seu negócio. O investimento é proporcional à complexidade do ecossistema necessário para atingir seu ROI. Quer terminar de mapear seu cenário para eu desenhar o plano de viabilidade?",
      shouldRedirect: false,
      currentLayer: 0,
      suggestedActions: ["Sim, terminar diagnóstico", "Falar com estrategista"]
    };
  }

  // --- 1. CLASSIFICAÇÃO DE NICHOS DE ALTA PRECISÃO (V10) ---
  let niche = 'Não identificado';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|dentista|psicólogo|nutri|fisio|terapeuta|estética|harmonização|biomedicina|saude)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|lei|legal|processo|juridico|oab|tribunal)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|loteadora|incorporadora|imobiliaria|condomínio)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|venda online|produto|comércio|ecommerce|varejista|marketplace)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(educação|curso|escola|mentor|infoproduto|ead|treinamento|mentoria|palestra|coaching|ensino)/)) niche = 'Educação & Mentorias';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|alimentício|delivery|pizzaria|bar|café|confeitaria|alimentação)/)) niche = 'Alimentício & Gastronomia';
  else if (fullHistoryText.match(/(indústria|fábrica|produção|logística|transporte|industria|distribuidora|engenharia|obras|manutenção)/)) niche = 'Indústria & Logística';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas|startup|programação|desenvolvimento|app|sistemas)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(carro|automóvel|veículo|concessionária|oficina|automotivo|blindagem|revenda|mecanica)/)) niche = 'Setor Automotivo';
  else if (fullHistoryText.match(/(contador|contabilidade|financeiro|fiscal|investimento|contabil|seguros|banco|finanças|auditoria)/)) niche = 'Finanças & Contabilidade';
  else if (fullHistoryText.match(/(arquiteto|arquitetura|interiores|decoração|obra|reforma|paisagismo|decor)/)) niche = 'Arquitetura & Design';
  else if (fullHistoryText.match(/(academia|personal|crossfit|yoga|fitness|esporte|suplemento|treino)/)) niche = 'Fitness & Performance';
  else if (fullHistoryText.match(/(luxo|premium|exclusivo|joalheria|relojoaria|mansão|alta costura|grife)/)) niche = 'Mercado de Luxo';
  else if (fullHistoryText.match(/(franquia|rede|unidades|expansão|franchising)/)) niche = 'Franquias & Expansão';
  else if (fullHistoryText.match(/(fazenda|agro|rural|pecuária|agronegócio|campo|produtor)/)) niche = 'Agro & Negócios Rurais';

  // --- 2. MAPEAMENTO DE SERVIÇOS (PILORES SAPIENT) ---
  const servicesNeeded: string[] = [];
  if (fullHistoryText.match(/(anúncio|tráfego|google|meta|ads|leads|vender|clientes|prospecção|prospeccao|clique)/)) servicesNeeded.push('Performance Ads');
  if (fullHistoryText.match(/(marca|design|logo|visual|premium|luxo|branding|rebranding|identidade|bonito|profissional|prestígio|estética)/)) servicesNeeded.push('Design Estratégico');
  if (fullHistoryText.match(/(ia|bot|automação|atendimento|chat|inteligência|agilidade|chatbot|automacao|eficiência|ia)/)) servicesNeeded.push('Ecossistemas de IA');
  if (fullHistoryText.match(/(social|instagram|autoridade|feed|seguidores|engajamento|post|rede social|presença|influência|reels)/)) servicesNeeded.push('Gestão de Autoridade');
  if (fullHistoryText.match(/(apresentação|dossiê|venda|narrativa|clareza|proposta|pitch|explicar|convencer|didática|comercial)/)) servicesNeeded.push('Narrativa Visual');

  // --- 3. MAPEAMENTO DE PLATAFORMAS ---
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google')) platforms.push('Google Ads');
  if (fullHistoryText.includes('facebook') || fullHistoryText.includes('meta')) platforms.push('Meta Ads');
  if (fullHistoryText.includes('linkedin')) platforms.push('LinkedIn');
  if (fullHistoryText.includes('whatsapp')) platforms.push('WhatsApp');
  if (fullHistoryText.includes('site') || fullHistoryText.includes('página') || fullHistoryText.includes('landing')) platforms.push('Site/LP');

  // --- 4. DETECÇÃO DE GARGALOS (PAIN POINTS V10) ---
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads ruins|curiosos|preço|barato|baixo|qualificar|qualificado|filtro|leads sujos)/)) mainPainPoints.push('Leads Desqualificados');
  if (fullHistoryText.match(/(demora|lento|esquecer|atraso|atender|responder|vácuo|vacuo|perder lead|atendimento)/)) mainPainPoints.push('Atendimento Lento');
  if (fullHistoryText.match(/(antigo|velho|feio|amador|imagem|passado|datado|vergonha|visual)/)) mainPainPoints.push('Imagem Datada');
  if (fullHistoryText.match(/(difícil|complicado|entender|explicar|confuso|clareza|método|comunicar)/)) mainPainPoints.push('Falta de Clareza');
  if (fullHistoryText.match(/(parado|não vende|estagnado|crescer|queda|crise|teto|faturar)/)) mainPainPoints.push('Estagnação de Vendas');
  if (fullHistoryText.match(/(indicação|indicaçao|depender|boca a boca|instável|incerto)/)) mainPainPoints.push('Dependência de Indicação');

  // --- LÓGICA DE JORNADA ESTRATÉGICA V10 ---
  const isSpecificNiche = niche !== 'Não identificado';
  const hasPlatforms = platforms.length > 0;
  const hasPainPoint = mainPainPoints.length > 0;
  const hasServices = servicesNeeded.length > 0;

  // CONDIÇÃO DE FECHAMENTO: Protocolo Completo (5 turnos + todos os dados críticos)
  if (isSpecificNiche && hasPlatforms && hasPainPoint && hasServices && turnCount >= 5) {
    return {
      reply: `Diagnóstico de Ecossistema Concluído: Mapeamos uma estratégia para ${niche} focada em resolver ${mainPainPoints.join(', ')} através de ${servicesNeeded.join(' + ')}. Seu posicionamento no ${platforms.join(', ')} será o pilar da nossa escala de autoridade. Posso transferir este sumário executivo agora para um estrategista humano finalizar seu plano de ROI?`,
      shouldRedirect: true,
      currentLayer: 5,
      suggestedActions: ["Falar com estrategista", "Ver cases similares", "Revisar diagnóstico"],
      extractedData: { niche, servicesNeeded, platforms, mainPainPoints }
    };
  }

  // CAMADA 4: METAS E ROI (TURNO 4)
  if (isSpecificNiche && hasPlatforms && hasPainPoint && turnCount >= 4) {
    return {
      reply: `Para o cenário de ${niche}, resolver o problema de ${mainPainPoints[0]} é o primeiro passo para o ROI real. Qual o seu objetivo de faturamento ou escala para os próximos 6 meses com esse novo ecossistema integrado?`,
      shouldRedirect: false,
      currentLayer: 4,
      suggestedActions: ["Dobrar Faturamento", "Escalar 50%", "Consolidar Autoridade Premium", "Lançar Novo Produto/Serviço"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // CAMADA 3: PROVOCAÇÃO TÉCNICA / GAP ANALYSIS (TURNO 3)
  if (isSpecificNiche && hasPlatforms && turnCount >= 3) {
    let provocation = `Para ${niche} atuando no ${platforms[0]}, onde o ROI mais "vaza" hoje: leads que só perguntam preço, sua imagem atual que não transmite o valor real do serviço ou a demora no atendimento qualificado?`;
    
    // Provocações Customizadas por Nicho (V10)
    if (niche === 'Saúde & Bem-estar') provocation = "No setor de Saúde, o lead que agenda e não aparece ou o 'curioso de preço' costuma ser o ralo de ROI. Como está sua taxa de conversão de agendamentos hoje?";
    if (niche === 'Jurídico & Direito') provocation = "Escritórios de Direito dependem de autoridade. Sua presença digital hoje filtra o cliente ideal ou você acaba perdendo tempo com casos sem fit financeiro?";
    if (niche === 'Arquitetura & Design') provocation = "Projetos de Arquitetura exigem desejo imediato. Seu portfólio digital hoje vende o seu valor de forma autônoma ou você ainda precisa explicar muito o seu preço?";
    if (niche === 'Tecnologia & SaaS') provocation = "Em SaaS, clareza é venda. Sua proposta de valor é entendida em menos de 5 segundos no site ou o cliente fica confuso com a parte técnica?";
    if (niche === 'Varejo & E-commerce') provocation = "No e-commerce, a confiança precede o checkout. Sua imagem de marca hoje justifica um ticket médio alto ou você ainda briga por descontos e cupons?";
    if (niche === 'Franquias & Expansão') provocation = "Para redes de franquias, a padronização de autoridade é o maior desafio. Como você garante que todas as unidades mantenham o mesmo nível de performance?";
    if (niche === 'Mercado de Luxo') provocation = "No mercado de Luxo, o design não é decorativo, é barreira de exclusividade. Como sua marca hoje se diferencia dos concorrentes que apenas 'copiam' seu estilo?";

    return {
      reply: provocation,
      shouldRedirect: false,
      currentLayer: 3,
      suggestedActions: ["Leads Desqualificados", "Atendimento Lento", "Imagem/Design Amador", "Falta de Clareza na Oferta", "Baixa Conversão de Vendas"],
      extractedData: { niche, platforms }
    };
  }

  // CAMADA 2: ECOSSISTEMA ATUAL (TURNO 2)
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Cenário mapeado para ${niche}. Para desenharmos sua estratégia de autoridade: em quais canais você concentra seus esforços hoje (Instagram, Google Ads, LinkedIn, Site Próprio ou apenas indicações)?`,
      shouldRedirect: false,
      currentLayer: 2,
      suggestedActions: ["Instagram Profissional", "Google Ads Ativo", "LinkedIn B2B", "Site/Landing Page", "Apenas Indicações", "Não tenho presença clara"],
      extractedData: { niche }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO (INÍCIO)
  return {
    reply: "Protocolo de Estratégia iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e qual seu principal desafio hoje: Vendas, Imagem de Marca ou Eficiência de Processos?",
    shouldRedirect: false,
    currentLayer: 1,
    suggestedActions: [
      "Saúde & Bem-estar", 
      "Jurídico & Direito", 
      "Imobiliário & Incorporação", 
      "Mercado de Luxo", 
      "Tecnologia & SaaS", 
      "Varejo & E-commerce",
      "Indústria & Logística",
      "Educação & Mentorias",
      "Arquitetura & Design",
      "Agro & Negócios Rurais"
    ],
    extractedData: { urgency: 'medium' }
  };
}
