
'use server';

/**
 * @fileOverview Inteligência de Atendimento Sapient Studio.
 * Linguagem ajustada para ser clara, amigável e sem jargões técnicos excessivos.
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

  // --- 0. INTERCEPTAÇÃO DE FAQ ---
  if (msg.includes('como funciona') || msg.includes('preço') || msg.includes('valor') || msg.includes('quanto custa')) {
    return {
      reply: "Entendi sua dúvida! O valor do investimento depende muito do que vamos construir juntos para trazer o melhor retorno para você. Que tal terminarmos de entender o que você precisa primeiro?",
      shouldRedirect: false,
      currentLayer: 0,
      isTextInputEnabled: false,
      suggestedActions: ["Sim, vamos continuar", "Falar com alguém agora"]
    };
  }

  // --- 1. EXTRAÇÃO DINÂMICA DE DADOS ---
  let niche = '';
  if (fullHistoryText.match(/(médico|saúde|clínica|hospital|saude)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|ecommerce)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis)/)) niche = 'Imobiliário & Imóveis';
  else if (fullHistoryText.match(/(estética|estetica|beleza)/)) niche = 'Estética & Beleza';
  else if (fullHistoryText.match(/(arquitetura|design)/)) niche = 'Arquitetura & Design';
  
  const askedForSpecificNiche = historyText.includes('com o que você trabalha exatamente');
  if (askedForSpecificNiche && niche === '' && msg !== 'outros') {
    niche = input.currentMessage;
  }

  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.includes('google ads')) platforms.push('Anúncios no Google');
  if (fullHistoryText.includes('site/lp')) platforms.push('Meu próprio site');
  if (fullHistoryText.includes('indicações')) platforms.push('Indicações de clientes');

  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(leads desqualificados|pessoas curiosas)/)) mainPainPoints.push('Muitos curiosos, poucos clientes');
  if (fullHistoryText.match(/(atendimento lento|demora)/)) mainPainPoints.push('Demora para responder');
  if (fullHistoryText.match(/(design amador|visual ruim)/)) mainPainPoints.push('Visual pouco profissional');
  if (fullHistoryText.match(/(falta de previsibilidade|vendas caíram)/)) mainPainPoints.push('Vendas instáveis');

  const goals: string[] = [];
  if (fullHistoryText.includes('vender mais')) goals.push('Vender mais todo mês');
  if (fullHistoryText.includes('ser referência')) goals.push('Ser reconhecido como referência');
  if (fullHistoryText.includes('automatizar')) goals.push('Atender clientes no automático');
  if (fullHistoryText.includes('anunciar melhor')) goals.push('Melhorar meus anúncios');

  // --- 2. LÓGICA DE PROGRESSÃO ---

  // FINALIZAÇÃO
  const lastBotMsg = input.history.filter(h => h.role === 'model').pop()?.content || '';
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && goals.length > 0) {
    if (lastBotMsg.includes('qual o nome da sua empresa')) {
      return {
        reply: `Pronto! Já entendi bem o cenário da ${input.currentMessage} na área de ${niche}. Agora, quer conversar com um consultor da nossa equipe para vermos os próximos passos e como podemos te ajudar?`,
        shouldRedirect: true,
        currentLayer: 6,
        isTextInputEnabled: false,
        suggestedActions: ["Quero falar com um consultor", "Recomeçar conversa"],
        extractedData: { niche, companyName: input.currentMessage, goals, platforms, mainPainPoints }
      };
    }

    return {
      reply: "Estamos quase terminando! Só para eu registrar aqui: qual o nome da sua empresa ou do seu projeto?",
      shouldRedirect: false,
      currentLayer: 5,
      isTextInputEnabled: true,
      suggestedActions: [],
      extractedData: { niche, goals, platforms, mainPainPoints }
    };
  }

  // OBJETIVOS
  if (niche && platforms.length > 0 && mainPainPoints.length > 0) {
    return {
      reply: `Legal! E pensando nos próximos meses, o que é mais importante para você agora?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 4,
      suggestedActions: ["Vender mais todo mês", "Ser reconhecido como referência", "Atender clientes no automático", "Melhorar meus anúncios"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // DIFICULDADES (PAIN POINTS)
  if (niche && platforms.length > 0) {
    return {
      reply: `Entendi. E onde você sente que está tendo mais dificuldade hoje? Pode marcar mais de uma opção:`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 3,
      suggestedActions: ["Muitos curiosos, poucos clientes", "Demora para responder", "Visual pouco profissional", "Vendas instáveis"],
      extractedData: { niche, platforms }
    };
  }

  // CANAIS (PLATFORMS)
  if (niche) {
    return {
      reply: `Certo, para a área de ${niche}, onde você costuma divulgar seu trabalho atualmente?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 2,
      suggestedActions: ["Instagram", "Anúncios no Google", "Meu próprio site", "Indicações de clientes", "Ainda não divulgo"],
      extractedData: { niche }
    };
  }

  // TRATAMENTO DE "OUTROS"
  if (msg === 'outros') {
    return {
      reply: "Sem problemas! Pode me contar com o que você trabalha exatamente?",
      shouldRedirect: false,
      currentLayer: 1,
      isTextInputEnabled: true,
      suggestedActions: []
    };
  }

  // INÍCIO
  return {
    reply: "Olá! Vamos conversar sobre o seu negócio? Para eu te ajudar melhor, em qual dessas áreas você atua hoje?",
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
