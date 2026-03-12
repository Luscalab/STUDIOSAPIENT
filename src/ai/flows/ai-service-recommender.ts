
'use server';

/**
 * @fileOverview Inteligência de Atendimento Sapient Studio V4 - Diagnóstico Profundo.
 * - Coleta de URL de site e análise de presença digital.
 * - Mapeamento de dores (pain points) e objetivos de ROI.
 * - Lógica de estados resiliente com extração de dados via regex.
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

  // 1. Extração de URL de Site
  let websiteUrl = '';
  const urlMatch = fullHistoryText.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9-]+\.[a-z]{2,})/i);
  if (urlMatch) websiteUrl = urlMatch[0];

  // 2. Detecção de Urgência e Contato Humano
  if (msg.match(/(falar com alguém|atendente|humano|pessoa|telefone|whatsapp|ligar|urgente|agora|contato)/)) {
    return {
      reply: "Com certeza. Conectar você a um especialista é a nossa prioridade para acelerar seu resultado. Vou te encaminhar agora mesmo para o nosso WhatsApp de consultoria sênior.",
      shouldRedirect: true,
      currentLayer: 7,
      isTextInputEnabled: false,
      suggestedActions: ["Falar no WhatsApp agora"]
    };
  }

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

  // --- LÓGICA DE ESTADOS (CAMADAS) ---

  // ESTADO 7: FINAL (Nome da Empresa)
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && goals.length > 0 && (websiteUrl || !platforms.includes('Meu próprio site'))) {
    const nameMatch = msg.match(/(meu negócio é a|minha empresa é a|empresa|chamada|chama-se|nome é) ([\w\s]+)/);
    const companyName = nameMatch ? nameMatch[2].trim() : (input.history.length > 10 ? input.currentMessage : '');

    if (companyName) {
      return {
        reply: `Excelente diagnóstico! O cenário para ${niche} tem um potencial enorme se aplicarmos nossa metodologia de Autoridade Visual. Vou preparar um dossiê para nossa reunião estratégica. Vamos agendar?`,
        shouldRedirect: true,
        currentLayer: 7,
        isTextInputEnabled: false,
        suggestedActions: ["Agendar Consultoria Gratuita", "Falar no WhatsApp"],
        extractedData: { niche, platforms, websiteUrl, mainPainPoints, goals, companyName }
      };
    }

    return {
      reply: "Perfeito, já tenho quase tudo para o nosso plano de ação. Só para eu formalizar seu dossiê: qual o nome da sua empresa ou projeto?",
      shouldRedirect: false,
      currentLayer: 6,
      isTextInputEnabled: true,
      suggestedActions: [],
      extractedData: { niche, platforms, websiteUrl, mainPainPoints, goals }
    };
  }

  // ESTADO 6: OBJETIVOS
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && (websiteUrl || !platforms.includes('Meu próprio site'))) {
    return {
      reply: `Com certeza resolveremos esses gargalos. E qual desses objetivos é sua prioridade número 1 para os próximos 90 dias?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 5,
      suggestedActions: ["Vender mais todo mês", "Ser reconhecido como referência", "Atender clientes no automático", "Melhorar meus anúncios"],
      extractedData: { niche, platforms, websiteUrl, mainPainPoints }
    };
  }

  // ESTADO 5: DORES
  if (niche && platforms.length > 0 && (websiteUrl || !platforms.includes('Meu próprio site'))) {
    return {
      reply: `Entendi o cenário. E hoje, o que mais te 'tira o sono' no digital? Pode marcar as opções que mais te incomodam:`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 4,
      suggestedActions: ["Muitos curiosos, poucos clientes", "Demora para responder", "Visual pouco profissional", "Vendas instáveis"],
      extractedData: { niche, platforms, websiteUrl }
    };
  }

  // ESTADO 4: URL DO SITE (Se ele disse que tem site mas não passou o link)
  if (niche && platforms.includes('Meu próprio site') && !websiteUrl) {
    return {
      reply: "Legal! Ter um site próprio é fundamental. Poderia me enviar o link dele? Assim eu consigo fazer uma análise técnica rápida da sua performance agora mesmo.",
      shouldRedirect: false,
      currentLayer: 3,
      isTextInputEnabled: true,
      suggestedActions: ["Ainda não está pronto", "Vou enviar depois"],
      extractedData: { niche, platforms }
    };
  }

  // ESTADO 3: PLATAFORMAS (Canais de Tráfego)
  if (niche) {
    return {
      reply: `Legal, na área de ${niche} a concorrência é forte. Hoje, por onde os novos clientes costumam chegar até você?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 2,
      suggestedActions: ["Instagram", "Anúncios no Google", "Meu próprio site", "Indicações de clientes", "Ainda não divulgo"],
      extractedData: { niche }
    };
  }

  // ESTADO INICIAL: NICHO
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
