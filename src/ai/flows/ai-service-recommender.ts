
'use server';

/**
 * @fileOverview Inteligência de Estratégia de Autoridade Sapient Studio - Protocolo V12.5.
 * Otimizado para evitar gargalos e tratar nichos personalizados com fluidez.
 */

import { z } from 'genkit';

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
  isMultiSelect?: boolean;
  isTextInputEnabled?: boolean;
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

  // --- 1. EXTRAÇÃO DINÂMICA DE DADOS (STATE-DRIVEN) ---
  let niche = '';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|saude)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|ecommerce)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis)/)) niche = 'Imobiliário & Incorporação';
  else if (fullHistoryText.match(/(estética|estetica|beleza)/)) niche = 'Estética & Beleza';
  else if (fullHistoryText.match(/(arquitetura|design)/)) niche = 'Arquitetura & Design';
  
  // Captura de Nicho Personalizado (Fluxo "Outros")
  const askedForSpecificNiche = historyText.includes('qual é exatamente o seu nicho');
  if (askedForSpecificNiche && niche === '' && msg !== 'outros') {
    niche = input.currentMessage; // O usuário digitou seu nicho
  }

  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google ads')) platforms.push('Google Ads');
  if (fullHistoryText.includes('site/lp')) platforms.push('Site/LP');
  if (fullHistoryText.includes('indicações')) platforms.push('Indicações');

  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads desqualificados)/)) mainPainPoints.push('Leads Desqualificados');
  if (fullHistoryText.match(/(atendimento lento)/)) mainPainPoints.push('Atendimento Lento');
  if (fullHistoryText.match(/(design amador)/)) mainPainPoints.push('Design Amador');
  if (fullHistoryText.match(/(falta de previsibilidade)/)) mainPainPoints.push('Falta de Previsibilidade');

  const goals: string[] = [];
  if (fullHistoryText.includes('dobrar faturamento')) goals.push('Dobrar Faturamento');
  if (fullHistoryText.includes('consolidar autoridade')) goals.push('Consolidar Autoridade');
  if (fullHistoryText.includes('automatizar atendimento')) goals.push('Automatizar Atendimento');
  if (fullHistoryText.includes('escalar tráfego')) goals.push('Escalar Tráfego');

  // --- 2. LÓGICA DE PROGRESSÃO POR DADOS ---

  // CAMADA 6: FINALIZAÇÃO
  const lastBotMsg = input.history.filter(h => h.role === 'model').pop()?.content || '';
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && goals.length > 0) {
    if (lastBotMsg.includes('qual o nome da sua empresa')) {
      return {
        reply: `Dossiê concluído para o projeto ${input.currentMessage} no setor de ${niche}. Mapeamos as soluções ideais para escalar sua autoridade. Posso transferir este sumário executivo agora para um estrategista humano finalizar seu plano de ROI?`,
        shouldRedirect: true,
        currentLayer: 6,
        isTextInputEnabled: false,
        suggestedActions: ["Falar com estrategista", "Reiniciar Diagnóstico"],
        extractedData: { niche, companyName: input.currentMessage, goals, platforms, mainPainPoints }
      };
    }

    return {
      reply: "Diagnóstico quase pronto. Para finalizarmos seu dossiê de autoridade: qual o nome da sua empresa ou projeto?",
      shouldRedirect: false,
      currentLayer: 5,
      isTextInputEnabled: true, // Libera o chat para o nome
      suggestedActions: [],
      extractedData: { niche, goals, platforms, mainPainPoints }
    };
  }

  // CAMADA 4: OBJETIVOS
  if (niche && platforms.length > 0 && mainPainPoints.length > 0) {
    return {
      reply: `Perfeito. Para o cenário de ${niche}, quais desses objetivos são prioritários para os próximos 6 meses?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 4,
      suggestedActions: ["Dobrar Faturamento", "Consolidar Autoridade", "Automatizar Atendimento", "Escalar Tráfego"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // CAMADA 3: PAIN POINTS
  if (niche && platforms.length > 0) {
    return {
      reply: `Entendido. Onde o ROI da sua operação mais "vaza" hoje? Selecione as opções:`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 3,
      suggestedActions: ["Leads Desqualificados", "Atendimento Lento", "Design Amador", "Falta de Previsibilidade"],
      extractedData: { niche, platforms }
    };
  }

  // CAMADA 2: PLATAFORMAS
  if (niche) {
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

  // CAMADA 1.5: TRATAMENTO DE "OUTROS"
  if (msg === 'outros') {
    return {
      reply: "Compreendo. Para um diagnóstico preciso: qual é exatamente o seu nicho de atuação ou o foco do seu negócio?",
      shouldRedirect: false,
      currentLayer: 1,
      isTextInputEnabled: true, // LIBERA O INPUT PARA O USUÁRIO DIGITAR
      suggestedActions: []
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
      "Arquitetura & Design",
      "Outros"
    ]
  };
}
