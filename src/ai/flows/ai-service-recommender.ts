'use server';

/**
 * @fileOverview Inteligência de Atendimento Sapient Studio V4.1 - Motor de Diagnóstico Adaptativo.
 * 
 * Este fluxo gerencia o estado da conversa através de camadas (layers) para qualificar o lead.
 * - Layer 1: Nicho de Atuação
 * - Layer 2: Canais Atuais (Plataformas)
 * - Layer 3: Auditoria de Website (URL)
 * - Layer 4: Mapeamento de Dores (Pain Points)
 * - Layer 5: Objetivos de Curto Prazo (ROI)
 * - Layer 6: Formalização (Nome da Empresa)
 * - Layer 7: Fechamento/Redirecionamento
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
    websiteUrl?: string;
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

  // 1. Detecção de Urgência Imediata (Atalho para Humano)
  if (msg.match(/(falar com alguém|atendente|humano|pessoa|telefone|whatsapp|ligar|urgente|agora|contato|ajuda)/)) {
    return {
      reply: "Entendo perfeitamente a sua urgência. O tempo é o recurso mais escasso no digital. Vou te encaminhar agora mesmo para a nossa consultoria sênior via WhatsApp para resolvermos isso imediatamente.",
      shouldRedirect: true,
      currentLayer: 7,
      isTextInputEnabled: false,
      suggestedActions: ["Falar no WhatsApp agora"]
    };
  }

  // 2. Extração de Website URL
  let websiteUrl = '';
  const urlMatch = fullHistoryText.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9-]+\.[a-z]{2,})/i);
  if (urlMatch) websiteUrl = urlMatch[0];

  // 3. Extração Inteligente de Nicho
  let niche = '';
  if (fullHistoryText.match(/(médico|dentista|clínica|hospital|saúde|psicólog|nutri|fisioterapeuta|doutor|paciente|consultório|dermato|estética)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|legal|processo|justiça|oab|tributário)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|ecommerce|vendas online|venda|produto|roupa|sapato|estoque|mercado|pet)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas|app|startup|desenvolvimento|computador|sistema|plataforma)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|venda de imóveis|terreno|aluguel|incorporadora)/)) niche = 'Imobiliário & Imóveis';
  else if (fullHistoryText.match(/(estética|estetica|beleza|salão|manicure|sobrancelha|cabelo|spa|maquiagem|unha|barbearia)/)) niche = 'Estética & Beleza';
  else if (fullHistoryText.match(/(arquitetura|design|interiores|obra|reforma|decor|construção|engenharia)/)) niche = 'Arquitetura & Design';

  // 4. Extração de Plataformas Atuais
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.match(/(google ads|anúncios no google|anuncio no google|pesquisa do google|search)/)) platforms.push('Anúncios no Google');
  if (fullHistoryText.match(/(site|lp|landing page|página|web)/) || websiteUrl) platforms.push('Meu próprio site');
  if (fullHistoryText.match(/(indicações|boca a boca|indicação|indica)/)) platforms.push('Indicações de clientes');

  // 5. Extração de Dores
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(curioso|lead ruim|desqualificado|gente chata|perda de tempo)/)) mainPainPoints.push('Muitos curiosos, poucos clientes');
  if (fullHistoryText.match(/(demora|atendimento lento|vácuo|atender|responder|demora)/)) mainPainPoints.push('Demora para responder');
  if (fullHistoryText.match(/(amador|feio|ruim|bagunçado|visual|identidade|logo)/)) mainPainPoints.push('Visual pouco profissional');
  if (fullHistoryText.match(/(instável|venda caiu|parado|crise|oscila|vender menos)/)) mainPainPoints.push('Vendas instáveis');

  // 6. Extração de Objetivos
  const goals: string[] = [];
  if (fullHistoryText.match(/(vender mais|faturamento|lucro|escala|crescer)/)) goals.push('Vender mais todo mês');
  if (fullHistoryText.match(/(referência|autoridade|famoso|reconhecido|melhor)/)) goals.push('Ser reconhecido como referência');
  if (fullHistoryText.match(/(automático|ia|robô|chatbot|sozinho|automatizar)/)) goals.push('Atender clientes no automático');
  if (fullHistoryText.match(/(anunciar|tráfego|campanha|trafegho)/)) goals.push('Melhorar meus anúncios');

  // --- LÓGICA DE ESTADOS (CAMADAS ADAPTATIVAS) ---

  // ESTADO FINAL: NOME DA EMPRESA
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && goals.length > 0 && (websiteUrl || !platforms.includes('Meu próprio site'))) {
    const nameMatch = msg.match(/(meu negócio é a|minha empresa é a|empresa|chamada|chama-se|nome é) ([\w\s]+)/);
    const companyName = nameMatch ? nameMatch[2].trim() : (input.history.length > 10 && msg.length > 2 ? input.currentMessage : '');

    if (companyName) {
      return {
        reply: `Dossiê concluído para a ${companyName}! O cenário de ${niche} exige clareza e autoridade visual para converter tickets altos. Vou preparar os dados para nossa reunião estratégica agora mesmo.`,
        shouldRedirect: true,
        currentLayer: 7,
        isTextInputEnabled: false,
        suggestedActions: ["Agendar Consultoria Gratuita", "Falar no WhatsApp"],
        extractedData: { niche, platforms, websiteUrl, mainPainPoints, goals, companyName }
      };
    }

    return {
      reply: "Excelente, já mapeamos sua estratégia. Para eu formalizar seu dossiê técnico de autoridade: qual o nome oficial da sua empresa ou projeto?",
      shouldRedirect: false,
      currentLayer: 6,
      isTextInputEnabled: true,
      suggestedActions: [],
      extractedData: { niche, platforms, websiteUrl, mainPainPoints, goals }
    };
  }

  // ESTADO 5: OBJETIVOS
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && (websiteUrl || !platforms.includes('Meu próprio site'))) {
    return {
      reply: `Com certeza resolveremos esses gargalos com design estratégico. E qual destes objetivos é sua prioridade número 1 para os próximos 90 dias?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 5,
      suggestedActions: ["Vender mais todo mês", "Ser reconhecido como referência", "Atender clientes no automático", "Melhorar meus anúncios"],
      extractedData: { niche, platforms, websiteUrl, mainPainPoints }
    };
  }

  // ESTADO 4: DORES
  if (niche && platforms.length > 0 && (websiteUrl || !platforms.includes('Meu próprio site'))) {
    return {
      reply: `Entendi o cenário. Na área de ${niche}, a percepção de valor é tudo. Hoje, o que mais te 'tira o sono' no digital? Pode marcar mais de uma:`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 4,
      suggestedActions: ["Muitos curiosos, poucos clientes", "Demora para responder", "Visual pouco profissional", "Vendas instáveis"],
      extractedData: { niche, platforms, websiteUrl }
    };
  }

  // ESTADO 3: URL DO SITE (Se ele disse que tem site mas não passou o link)
  if (niche && platforms.includes('Meu próprio site') && !websiteUrl) {
    return {
      reply: "Perfeito! Ter um site próprio é o primeiro passo para a autoridade. Poderia me enviar o link dele? Assim eu faço uma auditoria rápida de performance e visual agora mesmo.",
      shouldRedirect: false,
      currentLayer: 3,
      isTextInputEnabled: true,
      suggestedActions: ["Ainda não está pronto", "Vou enviar depois"],
      extractedData: { niche, platforms }
    };
  }

  // ESTADO 2: PLATAFORMAS (Canais de Tráfego)
  if (niche) {
    return {
      reply: `Ótimo nicho! Em ${niche}, a concorrência exige um posicionamento premium. Hoje, por onde os novos clientes costumam chegar até você?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 2,
      suggestedActions: ["Instagram", "Anúncios no Google", "Meu próprio site", "Indicações de clientes", "Ainda não divulgo"],
      extractedData: { niche }
    };
  }

  // ESTADO 1: NICHO (INICIAL)
  return {
    reply: "Olá! Sou o consultor virtual da Sapient. Para eu entender como podemos escalar seu negócio com design e estratégia, com o que você trabalha hoje?",
    shouldRedirect: false,
    currentLayer: 1,
    isTextInputEnabled: false,
    suggestedActions: [
      "Saúde & Bem-estar", 
      "Jurídico & Direito", 
      "Estética & Beleza", 
      "Varejo & E-commerce",
      "Tecnologia & SaaS", 
      "Imobiliário & Imóveis",
      "Arquitetura & Design",
      "Outros"
    ]
  };
}
