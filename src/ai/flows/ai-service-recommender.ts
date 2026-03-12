'use server';

/**
 * @fileOverview Inteligência de Atendimento Sapient Studio V2.
 * - Foco em linguagem natural e acessível (não técnica).
 * - Lógica de "Short-circuit" para usuários que já dão informações no início.
 * - Reconhecimento expandido de nichos e dores.
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

  // 1. Detecção de Desejo Imediato de Falar com Humano
  if (msg.match(/(quero falar com alguém|atendente|humano|pessoa|telefone|whatsapp|ligar|urgente|agora)/)) {
    return {
      reply: "Com certeza! Nada substitui o olho no olho. Vou te conectar agora mesmo com um de nossos consultores para agilizarmos seu projeto.",
      shouldRedirect: true,
      currentLayer: 6,
      isTextInputEnabled: false,
      suggestedActions: ["Falar no WhatsApp agora"]
    };
  }

  // 2. FAQ e Preços (Linguagem mais consultiva)
  if (msg.match(/(preço|valor|quanto custa|investimento|orçamento|orcamento|precos)/)) {
    return {
      reply: "Essa é uma ótima pergunta! Como cada projeto é único e focado no seu resultado específico, o investimento varia. Para te dar um valor justo, preciso entender só mais uns detalhes. Podemos continuar?",
      shouldRedirect: false,
      currentLayer: 0,
      isTextInputEnabled: false,
      suggestedActions: ["Sim, vamos lá", "Falar com consultor"]
    };
  }

  // 3. Extração Inteligente de Nicho (Mapeamento Expandido para 'Leigos')
  let niche = '';
  if (fullHistoryText.match(/(médico|dentista|clínica|hospital|saúde|psicólog|nutri|fisioterapeuta|doutor|paciente|consultório)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|legal|processo|justiça|oab)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|ecommerce|vendas online|venda|produto|roupa|sapato|estoque)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas|app|startup|desenvolvimento|computador|sistema)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|venda de imóveis|terreno|aluguel)/)) niche = 'Imobiliário & Imóveis';
  else if (fullHistoryText.match(/(estética|estetica|beleza|salão|manicure|sobrancelha|cabelo|spa|maquiagem)/)) niche = 'Estética & Beleza';
  else if (fullHistoryText.match(/(arquitetura|design|interiores|obra|reforma|decor)/)) niche = 'Arquitetura & Design';
  else if (fullHistoryText.match(/(escola|curso|educação|treinamento|infoproduto|professor|aula|ementa)/)) niche = 'Educação & Cursos';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|delivery|hamburguer|pizza|café|bar)/)) niche = 'Gastronomia & Food';
  else if (fullHistoryText.match(/(oficina|mêcanico|carro|autopeça|veículo)/)) niche = 'Serviços Automotivos';
  else if (fullHistoryText.match(/(contabilidade|contador|fiscal|imposto|contabil)/)) niche = 'Contabilidade & Consultoria';

  // Se o usuário selecionou "Outros" e agora está descrevendo
  const lastBotMsg = input.history.filter(h => h.role === 'model').pop()?.content || '';
  if (lastBotMsg.includes('trabalha exatamente') && !niche) {
    niche = input.currentMessage;
  }

  // 4. Extração de Plataformas
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.match(/(google ads|anúncios no google|anuncio no google|pesquisa do google)/)) platforms.push('Anúncios no Google');
  if (fullHistoryText.match(/(site|lp|landing page|página)/)) platforms.push('Meu próprio site');
  if (fullHistoryText.match(/(indicações|boca a boca|indicação)/)) platforms.push('Indicações de clientes');

  // 5. Extração de Dores (Onde dói no bolso do cliente)
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(curioso|lead ruim|desqualificado|gente chata)/)) mainPainPoints.push('Muitos curiosos, poucos clientes');
  if (fullHistoryText.match(/(demora|atendimento lento|vácuo|atender)/)) mainPainPoints.push('Demora para responder');
  if (fullHistoryText.match(/(amador|feio|ruim|bagunçado|visual)/)) mainPainPoints.push('Visual pouco profissional');
  if (fullHistoryText.match(/(instável|venda caiu|parado|crise)/)) mainPainPoints.push('Vendas instáveis');

  // 6. Extração de Objetivos
  const goals: string[] = [];
  if (fullHistoryText.match(/(vender mais|faturamento|lucro)/)) goals.push('Vender mais todo mês');
  if (fullHistoryText.match(/(referência|autoridade|famoso|reconhecido)/)) goals.push('Ser reconhecido como referência');
  if (fullHistoryText.match(/(automático|ia|robô|chatbot|sozinho)/)) goals.push('Atender clientes no automático');
  if (fullHistoryText.match(/(anunciar|tráfego|campanha)/)) goals.push('Melhorar meus anúncios');

  // LÓGICA DE FLUXO (ESTADOS)

  // ESTADO FINAL: Captura de Nome da Empresa
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && goals.length > 0) {
    if (lastBotMsg.includes('qual o nome da sua empresa') || lastBotMsg.includes('projeto?')) {
      return {
        reply: `Perfeito! Já tenho um diagnóstico preliminar para a ${input.currentMessage}. O cenário de ${niche} pede uma estratégia de autoridade que estamos prontos para desenhar. Quer ver os próximos passos com um de nossos consultores?`,
        shouldRedirect: true,
        currentLayer: 6,
        isTextInputEnabled: false,
        suggestedActions: ["Quero falar com um consultor", "Recomeçar"],
        extractedData: { niche, companyName: input.currentMessage, goals, platforms, mainPainPoints }
      };
    }

    return {
      reply: "Entendido! Estamos chegando na melhor solução. Só para eu formalizar aqui: qual o nome da sua empresa ou do seu projeto?",
      shouldRedirect: false,
      currentLayer: 5,
      isTextInputEnabled: true,
      suggestedActions: [],
      extractedData: { niche, goals, platforms, mainPainPoints }
    };
  }

  // ESTADO 4: Objetivos
  if (niche && platforms.length > 0 && mainPainPoints.length > 0) {
    return {
      reply: `Tudo anotado. E pensando no seu crescimento, o que seria o 'sucesso' para você hoje?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 4,
      suggestedActions: ["Vender mais todo mês", "Ser reconhecido como referência", "Atender clientes no automático", "Melhorar meus anúncios"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // ESTADO 3: Dificuldades (Dores)
  if (niche && platforms.length > 0) {
    return {
      reply: `Certo. E onde você sente que está o maior 'gargalo' ou dificuldade hoje? Pode marcar mais de uma:`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 3,
      suggestedActions: ["Muitos curiosos, poucos clientes", "Demora para responder", "Visual pouco profissional", "Vendas instáveis"],
      extractedData: { niche, platforms }
    };
  }

  // ESTADO 2: Divulgação Atual
  if (niche) {
    return {
      reply: `Legal, na área de ${niche} a concorrência é forte. Hoje, onde as pessoas costumam te encontrar mais?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 2,
      suggestedActions: ["Instagram", "Anúncios no Google", "Meu próprio site", "Indicações de clientes", "Ainda não divulgo"],
      extractedData: { niche }
    };
  }

  // ESTADO ESPECIAL: Outros
  if (msg === 'outros' || msg.includes('trabalha com o que exatamente')) {
    return {
      reply: "Sem problemas! O mundo é vasto. Pode me contar um pouquinho sobre o que você faz exatamente?",
      shouldRedirect: false,
      currentLayer: 1,
      isTextInputEnabled: true,
      suggestedActions: []
    };
  }

  // ESTADO INICIAL: Saudação e Nicho
  return {
    reply: "Olá! Sou o consultor virtual da Sapient. Para eu entender como podemos escalar seu negócio, com o que você trabalha hoje?",
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
