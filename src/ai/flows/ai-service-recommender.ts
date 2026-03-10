'use server';

/**
 * @fileOverview Inteligência de Estratégia de Autoridade Sapient Studio - Protocolo V11.
 * Implementa uma jornada de 5 camadas para mapeamento total de ecossistemas digitais.
 * Foca em identificar problemas complexos de ROI, Sinergia e Autoridade.
 * Abrange desde grandes indústrias até nichos especializados de alta escala.
 */

import { z } from 'genkit';

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

  // --- 1. CLASSIFICAÇÃO DE NICHOS DE ALTA PRECISÃO (V11) ---
  let niche = 'Não identificado';
  
  // Grandes Nichos
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|dentista|psicólogo|nutri|fisio|terapeuta|saude)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|lei|legal|processo|oab)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|loteadora|incorporadora)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|venda online|produto|comércio|ecommerce)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(educação|curso|escola|mentor|infoproduto|ead|treinamento|mentoria)/)) niche = 'Educação & Mentorias';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|alimentício|delivery|pizzaria|bar|café)/)) niche = 'Alimentício & Gastronomia';
  else if (fullHistoryText.match(/(indústria|fábrica|produção|logística|transporte|industria|distribuidora)/)) niche = 'Indústria & Logística';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas|startup|programação|app)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(carro|automóvel|veículo|concessionária|oficina|automotivo|blindagem)/)) niche = 'Setor Automotivo';
  else if (fullHistoryText.match(/(contador|contabilidade|financeiro|fiscal|investimento|seguros|banco)/)) niche = 'Finanças & Contabilidade';
  else if (fullHistoryText.match(/(arquiteto|arquitetura|interiores|decoração|obra|reforma)/)) niche = 'Arquitetura & Design';
  
  // Nichos Especializados / Pequenos (V11)
  else if (fullHistoryText.match(/(estética|estetica|harmonização|harmonizacao|beleza|salao|salão|biomedicina|unha|cabelo)/)) niche = 'Estética & Beleza';
  else if (fullHistoryText.match(/(pet|veterinária|veterinaria|banho e tosa|dog|cachorro|gato|petshop)/)) niche = 'Pet Shop & Veterinária';
  else if (fullHistoryText.match(/(fotógrafo|fotografo|fotografia|filme|video|vídeo|eventos|casamento|ensaio)/)) niche = 'Fotografia & Vídeo';
  else if (fullHistoryText.match(/(moda|roupa|acessório|acessorio|calçado|calcado|estilo|grife|loja de roupa)/)) niche = 'Moda & Acessórios';
  else if (fullHistoryText.match(/(manutenção|manutencao|reforma|pintura|eletricista|encanador|marcenaria|serviços)/)) niche = 'Serviços de Manutenção';
  else if (fullHistoryText.match(/(artesanato|feito a mão|presente|manual|decoração manual|handmade)/)) niche = 'Artesanato & Presentes';
  else if (fullHistoryText.match(/(turismo|viagem|agência|pousada|hotel|hospedagem|guia)/)) niche = 'Turismo & Viagens';
  else if (fullHistoryText.match(/(academia|personal|crossfit|yoga|fitness|esporte|suplemento|treino)/)) niche = 'Fitness & Performance';
  else if (fullHistoryText.match(/(luxo|premium|exclusivo|joalheria|relojoaria|mansão|grife)/)) niche = 'Mercado de Luxo';
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

  // --- 4. DETECÇÃO DE GARGALOS (PAIN POINTS V11) ---
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads ruins|curiosos|preço|barato|baixo|qualificar|qualificado|filtro|leads sujos)/)) mainPainPoints.push('Leads Desqualificados');
  if (fullHistoryText.match(/(demora|lento|esquecer|atraso|atender|responder|vácuo|vacuo|perder lead|atendimento)/)) mainPainPoints.push('Atendimento Lento');
  if (fullHistoryText.match(/(antigo|velho|feio|amador|imagem|passado|datado|vergonha|visual)/)) mainPainPoints.push('Imagem Datada');
  if (fullHistoryText.match(/(difícil|complicado|entender|explicar|confuso|clareza|método|comunicar)/)) mainPainPoints.push('Falta de Clareza');
  if (fullHistoryText.match(/(parado|não vende|estagnado|crescer|queda|crise|teto|faturar)/)) mainPainPoints.push('Estagnação de Vendas');
  if (fullHistoryText.match(/(indicação|indicaçao|depender|boca a boca|instável|incerto)/)) mainPainPoints.push('Dependência de Indicação');

  // --- LÓGICA DE JORNADA ESTRATÉGICA V11 ---
  const isSpecificNiche = niche !== 'Não identificado';
  const hasPlatforms = platforms.length > 0;
  const hasPainPoint = mainPainPoints.length > 0;
  const hasServices = servicesNeeded.length > 0;

  // CONDIÇÃO DE FECHAMENTO: Protocolo Completo (Todos os dados críticos mapeados)
  if (isSpecificNiche && hasPlatforms && hasPainPoint && hasServices && turnCount >= 5) {
    return {
      reply: `Diagnóstico de Ecossistema Concluído: Mapeamos uma estratégia para o setor de ${niche} focada em resolver ${mainPainPoints.join(', ')} através de ${servicesNeeded.join(' + ')}. Seu posicionamento no ${platforms.join(', ')} será o pilar da nossa escala de autoridade. Posso transferir este sumário executivo agora para um estrategista humano finalizar seu plano de ROI?`,
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
    
    // Provocações Customizadas por Nicho (V11)
    if (niche === 'Estética & Beleza') provocation = "No setor de Estética, o lead que agenda e não aparece ou a briga por 'preço baixo' costuma ser o ralo de ROI. Como sua marca se posiciona hoje para atrair clientes que valorizam o resultado e não o desconto?";
    if (niche === 'Pet Shop & Veterinária') provocation = "Veterinárias e Pet Shops dependem de confiança extrema. Sua presença digital hoje transmite essa segurança ou você ainda depende apenas de quem passa na frente da loja?";
    if (niche === 'Fotografia & Vídeo') provocation = "Na Fotografia, o design não é decorativo, é o seu portfólio de valor. Sua apresentação comercial hoje justifica seu ticket médio ou você ainda precisa explicar muito seu preço?";
    if (niche === 'Saúde & Bem-estar') provocation = "No setor de Saúde, o lead que agenda e não aparece é o ralo de ROI. Como está sua taxa de conversão de agendamentos hoje?";
    if (niche === 'Moda & Acessórios') provocation = "Na Moda, o desejo é visual. Seu feed e site hoje vendem o estilo de vida da marca ou são apenas uma vitrine de produtos estáticos?";

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
      "Estética & Beleza", 
      "Pet Shop & Veterinária", 
      "Tecnologia & SaaS", 
      "Varejo & E-commerce",
      "Arquitetura & Design",
      "Fotografia & Vídeo",
      "Moda & Acessórios",
      "Agro & Negócios Rurais"
    ],
    extractedData: { urgency: 'medium' }
  };
}
