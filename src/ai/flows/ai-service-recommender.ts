'use server';

/**
 * @fileOverview Inteligência de Estratégia de Autoridade Sapient Studio - Protocolo V12.1.
 * Implementa uma jornada de 5 camadas para mapeamento total de ecossistemas digitais.
 * Suporta agora multi-seleção de dados e classificação de nichos de micro a macro escala.
 */

import { z } from 'genkit';

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  isMultiSelect?: boolean;
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

  // --- 1. CLASSIFICAÇÃO DE NICHOS (V12) ---
  let niche = 'Não identificado';
  
  // Mapeamento de Nichos (Grandes e Pequenos)
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
  else if (fullHistoryText.match(/(estética|estetica|beleza|salao|salão|biomedicina|unha|cabelo)/)) niche = 'Estética & Beleza';
  else if (fullHistoryText.match(/(pet|veterinária|veterinaria|banho e tosa|dog|cachorro|gato|petshop)/)) niche = 'Pet Shop & Veterinária';
  else if (fullHistoryText.match(/(fotógrafo|fotografo|fotografia|filme|video|vídeo|eventos|casamento|ensaio)/)) niche = 'Fotografia & Vídeo';
  else if (fullHistoryText.match(/(moda|roupa|acessório|acessorio|calçado|calcado|estilo|grife|loja de roupa)/)) niche = 'Moda & Acessórios';
  else if (fullHistoryText.match(/(turismo|viagem|agência|pousada|hotel|hospedagem|guia)/)) niche = 'Turismo & Viagens';
  else if (fullHistoryText.match(/(academia|personal|crossfit|yoga|fitness|esporte|suplemento|treino)/)) niche = 'Fitness & Performance';
  else if (fullHistoryText.match(/(luxo|premium|exclusivo|joalheria|relojoaria|mansão|grife)/)) niche = 'Mercado de Luxo';
  else if (fullHistoryText.match(/(fazenda|agro|rural|pecuária|agronegócio|campo|produtor)/)) niche = 'Agro & Negócios Rurais';

  // --- 2. MAPEAMENTO DE SERVIÇOS (PILARES SAPIENT) ---
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

  // --- 4. DETECÇÃO DE GARGALOS (PAIN POINTS V12) ---
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads ruins|curiosos|preço|barato|baixo|qualificar|qualificado|filtro|leads sujos)/)) mainPainPoints.push('Leads Desqualificados');
  if (fullHistoryText.match(/(demora|lento|esquecer|atraso|atender|responder|vácuo|vacuo|perder lead|atendimento)/)) mainPainPoints.push('Atendimento Lento');
  if (fullHistoryText.match(/(antigo|velho|feio|amador|imagem|passado|datado|vergonha|visual)/)) mainPainPoints.push('Imagem Datada');
  if (fullHistoryText.match(/(difícil|complicado|entender|explicar|confuso|clareza|método|comunicar)/)) mainPainPoints.push('Falta de Clareza');
  if (fullHistoryText.match(/(parado|não vende|estagnado|crescer|queda|crise|teto|faturar)/)) mainPainPoints.push('Estagnação de Vendas');
  if (fullHistoryText.match(/(indicação|indicaçao|depender|boca a boca|instável|incerto)/)) mainPainPoints.push('Dependência de Indicação');

  const isSpecificNiche = niche !== 'Não identificado';
  const hasPlatforms = platforms.length > 0;
  const hasPainPoint = mainPainPoints.length > 0;

  // CONDIÇÃO DE FECHAMENTO: Protocolo Completo
  if (isSpecificNiche && hasPlatforms && hasPainPoint && turnCount >= 5) {
    return {
      reply: `Diagnóstico de Ecossistema Concluído: Mapeamos uma estratégia para o setor de ${niche} focada em resolver ${mainPainPoints.join(', ')} através de ${servicesNeeded.length > 0 ? servicesNeeded.join(' + ') : 'um novo ecossistema digital'}. Seu posicionamento no ${platforms.join(', ')} será o pilar da nossa escala de autoridade. Posso transferir este sumário executivo agora para um estrategista humano finalizar seu plano de ROI?`,
      shouldRedirect: true,
      currentLayer: 5,
      suggestedActions: ["Falar com estrategista", "Ver cases similares", "Revisar diagnóstico"],
      extractedData: { niche, servicesNeeded, platforms, mainPainPoints }
    };
  }

  // CAMADA 4: METAS E ROI (MULTI-SELEÇÃO)
  if (isSpecificNiche && hasPlatforms && hasPainPoint && turnCount >= 4) {
    return {
      reply: `Para o cenário de ${niche}, resolver o problema de ${mainPainPoints[0]} é o primeiro passo para o ROI real. Quais desses objetivos são prioritários para os próximos 6 meses? (Selecione um ou mais)`,
      shouldRedirect: false,
      isMultiSelect: true,
      currentLayer: 4,
      suggestedActions: ["Dobrar Faturamento", "Escalar 50%", "Consolidar Autoridade Premium", "Lançar Novo Produto/Serviço", "Automatizar Atendimento"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // CAMADA 3: PROVOCAÇÃO TÉCNICA / GAP ANALYSIS (MULTI-SELEÇÃO)
  if (isSpecificNiche && hasPlatforms && turnCount >= 3) {
    return {
      reply: `Para ${niche} atuando no ${platforms[0]}, onde o ROI mais "vaza" hoje? Selecione as opções que mais te incomodam:`,
      shouldRedirect: false,
      isMultiSelect: true,
      currentLayer: 3,
      suggestedActions: ["Leads Desqualificados", "Atendimento Lento", "Imagem/Design Amador", "Falta de Clareza na Oferta", "Baixa Conversão de Vendas", "Dependência de Indicação"],
      extractedData: { niche, platforms }
    };
  }

  // CAMADA 2: ECOSSISTEMA ATUAL (MULTI-SELEÇÃO)
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Cenário mapeado para ${niche}. Para desenharmos sua estratégia: em quais canais você concentra seus esforços hoje? (Selecione todos os aplicáveis)`,
      shouldRedirect: false,
      isMultiSelect: true,
      currentLayer: 2,
      suggestedActions: ["Instagram Profissional", "Google Ads Ativo", "LinkedIn B2B", "Site/Landing Page", "Apenas Indicações", "Não tenho presença clara"],
      extractedData: { niche }
    };
  }

  // CAMADA 1: IDENTIFICAÇÃO (INÍCIO)
  return {
    reply: "Protocolo de Estratégia iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação e qual seu principal desafio hoje?",
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
