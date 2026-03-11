
'use server';

/**
 * @fileOverview Inteligência de Estratégia de Autoridade Sapient Studio - Protocolo V12.2.
 * Implementa uma jornada guiada por cards com input restrito apenas para dados críticos.
 */

import { z } from 'genkit';

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  isMultiSelect?: boolean;
  isTextInputEnabled?: boolean; // Nova flag para controle de UI
  currentLayer: number;
  extractedData?: {
    niche?: string;
    goals?: string[];
    urgency?: 'low' | 'medium' | 'high';
    platforms?: string[];
    companyName?: string;
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
  if (msg.includes('como funciona') || msg.includes('preço') || msg.includes('valor')) {
    return {
      reply: "Nossa metodologia Sapient é baseada em Ecossistemas de Crescimento. O investimento é proporcional à complexidade do ecossistema necessário para atingir seu ROI. Vamos terminar de mapear seu cenário?",
      shouldRedirect: false,
      currentLayer: 0,
      isTextInputEnabled: false,
      suggestedActions: ["Sim, continuar diagnóstico", "Falar com estrategista"]
    };
  }

  // --- 1. CLASSIFICAÇÃO DE NICHOS ---
  let niche = 'Não identificado';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|saude)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|ecommerce)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(estética|estetica|beleza)/)) niche = 'Estética & Beleza';

  // --- 2. MAPEAMENTO DE PLATAFORMAS E GARGALOS ---
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google')) platforms.push('Google Ads');
  if (fullHistoryText.includes('site') || fullHistoryText.includes('landing')) platforms.push('Site/LP');

  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads ruins|curiosos|qualificar)/)) mainPainPoints.push('Leads Desqualificados');
  if (fullHistoryText.match(/(demora|lento|atender)/)) mainPainPoints.push('Atendimento Lento');
  if (fullHistoryText.match(/(antigo|feio|amador)/)) mainPainPoints.push('Imagem Datada');

  const isSpecificNiche = niche !== 'Não identificado';
  const hasPlatforms = platforms.length > 0 || fullHistoryText.match(/(presença|canais|anúncios)/);
  const hasPainPoint = mainPainPoints.length > 0 || fullHistoryText.match(/(desafio|gargalo|problema)/);

  // CAMADA FINAL: IDENTIFICAÇÃO DA EMPRESA (Libera Input)
  if (isSpecificNiche && hasPlatforms && hasPainPoint && turnCount >= 5) {
    // Se o usuário já mandou algo que parece um nome (não é uma das sugestões anteriores)
    if (turnCount >= 6) {
       return {
          reply: `Dossiê concluído para o setor de ${niche}. Mapeamos as soluções ideais para escalar sua autoridade. Posso transferir este sumário executivo agora para um estrategista humano finalizar seu plano de ROI?`,
          shouldRedirect: true,
          currentLayer: 6,
          isTextInputEnabled: false,
          suggestedActions: ["Falar com estrategista", "Reiniciar Diagnóstico"],
          extractedData: { niche, companyName: input.currentMessage }
        };
    }

    return {
      reply: "Diagnóstico quase pronto. Para finalizarmos seu dossiê de autoridade: qual o nome da sua empresa ou projeto?",
      shouldRedirect: false,
      currentLayer: 5,
      isTextInputEnabled: true, // LIBERA O CHAT AQUI
      suggestedActions: []
    };
  }

  // CAMADA 4: OBJETIVOS ROI
  if (isSpecificNiche && hasPlatforms && hasPainPoint && turnCount >= 4) {
    return {
      reply: `Perfeito. Para o cenário de ${niche}, quais desses objetivos são prioritários para os próximos 6 meses?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 4,
      suggestedActions: ["Dobrar Faturamento", "Consolidar Autoridade", "Automatizar Atendimento", "Escalar Tráfego"],
      extractedData: { niche }
    };
  }

  // CAMADA 3: GAP ANALYSIS
  if (isSpecificNiche && hasPlatforms && turnCount >= 3) {
    return {
      reply: `Entendido. Onde o ROI da sua operação mais "vaza" hoje? Selecione as opções:`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 3,
      suggestedActions: ["Leads Desqualificados", "Atendimento Lento", "Design Amador", "Falta de Previsibilidade"],
      extractedData: { niche }
    };
  }

  // CAMADA 2: ECOSSISTEMA ATUAL
  if (isSpecificNiche && turnCount >= 2) {
    return {
      reply: `Cenário mapeado para ${niche}. Quais canais você concentra seus esforços hoje?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 2,
      suggestedActions: ["Instagram", "Google Ads", "Site/LP", "Indicações", "Ainda não iniciei"],
      extractedData: { niche }
    };
  }

  // CAMADA 1: INÍCIO
  return {
    reply: "Protocolo de Estratégia iniciado. Para um diagnóstico de autoridade e escala: qual o seu nicho de atuação hoje?",
    shouldRedirect: false,
    currentLayer: 1,
    isTextInputEnabled: false,
    suggestedActions: [
      "Saúde & Bem-estar", 
      "Jurídico & Direito", 
      "Estética & Beleza", 
      "Tecnologia & SaaS", 
      "Varejo & E-commerce",
      "Arquitetura & Design"
    ]
  };
}
