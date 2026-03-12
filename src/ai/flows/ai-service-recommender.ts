'use server';

/**
 * @fileOverview Inteligência de Atendimento Sapient Studio V3 - Pós-Treinamento.
 * - Foco total em linguagem natural e empatia comercial.
 * - Lógica de "Short-circuit" ultra-sensível para evitar redundância.
 * - Mapeamento de dores reais do empresário brasileiro.
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

  // 1. Detecção de Urgência e Desejo Humano
  if (msg.match(/(falar com alguém|atendente|humano|pessoa|telefone|whatsapp|ligar|urgente|agora|contato)/)) {
    return {
      reply: "Entendido perfeitamente. O seu tempo é valioso. Vou te conectar agora mesmo com um de nossos consultores seniores para agilizarmos seu projeto no WhatsApp.",
      shouldRedirect: true,
      currentLayer: 6,
      isTextInputEnabled: false,
      suggestedActions: ["Falar no WhatsApp agora"]
    };
  }

  // 2. FAQ de Investimento
  if (msg.match(/(preço|valor|quanto custa|investimento|orçamento|orcamento|precos|fatura)/)) {
    return {
      reply: "Essa é a dúvida de ouro! Como nossos projetos são sob medida (alfaiataria digital), o valor depende do tamanho da sua meta. Para eu te dar um número realista, preciso de mais 30 segundos da sua atenção. Podemos seguir?",
      shouldRedirect: false,
      currentLayer: 0,
      isTextInputEnabled: false,
      suggestedActions: ["Sim, vamos lá", "Falar com humano"]
    };
  }

  // 3. Extração Inteligente de Nicho (Gatilhos Expandidos)
  let niche = '';
  if (fullHistoryText.match(/(médico|dentista|clínica|hospital|saúde|psicólog|nutri|fisioterapeuta|doutor|paciente|consultório|dermato|estética)/)) niche = 'Saúde & Bem-estar';
  else if (fullHistoryText.match(/(advogado|jurídico|direito|escritório|legal|processo|justiça|oab|tributário)/)) niche = 'Jurídico & Direito';
  else if (fullHistoryText.match(/(loja|varejo|e-commerce|ecommerce|vendas online|venda|produto|roupa|sapato|estoque|mercado|pet)/)) niche = 'Varejo & E-commerce';
  else if (fullHistoryText.match(/(tecnologia|ti|software|saas|app|startup|desenvolvimento|computador|sistema|plataforma)/)) niche = 'Tecnologia & SaaS';
  else if (fullHistoryText.match(/(imobiliário|corretor|imóveis|casa|apartamento|venda de imóveis|terreno|aluguel|incorporadora)/)) niche = 'Imobiliário & Imóveis';
  else if (fullHistoryText.match(/(estética|estetica|beleza|salão|manicure|sobrancelha|cabelo|spa|maquiagem|unha|barbearia)/)) niche = 'Estética & Beleza';
  else if (fullHistoryText.match(/(arquitetura|design|interiores|obra|reforma|decor|construção|engenharia)/)) niche = 'Arquitetura & Design';
  else if (fullHistoryText.match(/(escola|curso|educação|treinamento|infoproduto|professor|aula|ementa|mentor|palestra)/)) niche = 'Educação & Cursos';
  else if (fullHistoryText.match(/(restaurante|gastronomia|comida|delivery|hamburguer|pizza|café|bar|lanchonete)/)) niche = 'Gastronomia & Food';
  else if (fullHistoryText.match(/(contabilidade|contador|fiscal|imposto|contabil|financeiro|banco|seguros)/)) niche = 'Finanças & Consultoria';

  // 4. Detecção de Nome da Empresa (se mencionada)
  let companyName = '';
  const nameMatch = msg.match(/(meu negócio é a|minha empresa é a|empresa|chamada|chama-se|nome é) ([\w\s]+)/);
  if (nameMatch) companyName = nameMatch[2].trim();

  // 5. Extração de Plataformas
  const platforms: string[] = [];
  if (fullHistoryText.includes('instagram')) platforms.push('Instagram');
  if (fullHistoryText.match(/(google ads|anúncios no google|anuncio no google|pesquisa do google|search)/)) platforms.push('Anúncios no Google');
  if (fullHistoryText.match(/(site|lp|landing page|página|web)/)) platforms.push('Meu próprio site');
  if (fullHistoryText.match(/(indicações|boca a boca|indicação|indica)/)) platforms.push('Indicações de clientes');

  // 6. Extração de Dores (Onde dói no bolso)
  const mainPainPoints: string[] = [];
  if (fullHistoryText.match(/(curioso|lead ruim|desqualificado|gente chata|perda de tempo)/)) mainPainPoints.push('Muitos curiosos, poucos clientes');
  if (fullHistoryText.match(/(demora|atendimento lento|vácuo|atender|responder|demora)/)) mainPainPoints.push('Demora para responder');
  if (fullHistoryText.match(/(amador|feio|ruim|bagunçado|visual|identidade|logo)/)) mainPainPoints.push('Visual pouco profissional');
  if (fullHistoryText.match(/(instável|venda caiu|parado|crise|oscila|vender menos)/)) mainPainPoints.push('Vendas instáveis');

  // 7. Extração de Objetivos
  const goals: string[] = [];
  if (fullHistoryText.match(/(vender mais|faturamento|lucro|escala|crescer)/)) goals.push('Vender mais todo mês');
  if (fullHistoryText.match(/(referência|autoridade|famoso|reconhecido|melhor)/)) goals.push('Ser reconhecido como referência');
  if (fullHistoryText.match(/(automático|ia|robô|chatbot|sozinho|automatizar)/)) goals.push('Atender clientes no automático');
  if (fullHistoryText.match(/(anunciar|tráfego|campanha|trafegho)/)) goals.push('Melhorar meus anúncios');

  // LÓGICA DE FLUXO (INTELIGÊNCIA DE ATALHO)

  // ESTADO FINAL: Captura de Nome da Empresa
  if (niche && platforms.length > 0 && mainPainPoints.length > 0 && goals.length > 0) {
    if (companyName || input.history.filter(h => h.role === 'model').pop()?.content.includes('nome da sua empresa')) {
      const finalName = companyName || input.currentMessage;
      return {
        reply: `Fantástico! O cenário de ${niche} para a "${finalName}" tem um potencial enorme se aplicarmos nossa metodologia de Autoridade Visual. Vou preparar um pré-diagnóstico para nossa reunião. Vamos agendar agora?`,
        shouldRedirect: true,
        currentLayer: 6,
        isTextInputEnabled: false,
        suggestedActions: ["Agendar Consultoria Gratuita", "Recomeçar análise"],
        extractedData: { niche, companyName: finalName, goals, platforms, mainPainPoints }
      };
    }

    return {
      reply: "Entendido perfeitamente! Já visualizo uma estratégia de escala aqui. Só para eu formalizar seu dossiê: qual o nome da sua empresa ou projeto?",
      shouldRedirect: false,
      currentLayer: 5,
      isTextInputEnabled: true,
      suggestedActions: [],
      extractedData: { niche, goals, platforms, mainPainPoints }
    };
  }

  // ESTADO 4: Objetivos (Se já temos as dores)
  if (niche && platforms.length > 0 && mainPainPoints.length > 0) {
    return {
      reply: `Com certeza resolveremos esses gargalos. E qual desses objetivos é sua prioridade número 1 hoje?`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 4,
      suggestedActions: ["Vender mais todo mês", "Ser reconhecido como referência", "Atender clientes no automático", "Melhorar meus anúncios"],
      extractedData: { niche, platforms, mainPainPoints }
    };
  }

  // ESTADO 3: Dificuldades (Se já sabemos onde divulga)
  if (niche && platforms.length > 0) {
    return {
      reply: `Entendi. E hoje, o que mais te 'tira o sono' no digital? Pode marcar as opções que mais te incomodam:`,
      shouldRedirect: false,
      isMultiSelect: true,
      isTextInputEnabled: false,
      currentLayer: 3,
      suggestedActions: ["Muitos curiosos, poucos clientes", "Demora para responder", "Visual pouco profissional", "Vendas instáveis"],
      extractedData: { niche, platforms }
    };
  }

  // ESTADO 2: Divulgação Atual (Se já sabemos o nicho)
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

  // ESTADO ESPECIAL: Outros ou Indefinido
  if (msg === 'outros' || msg.includes('trabalha com o que exatamente') || (input.history.length > 2 && !niche)) {
    return {
      reply: "Sem problemas! Como cada negócio é único, pode me contar com suas palavras: o que você faz exatamente e quem é seu cliente ideal?",
      shouldRedirect: false,
      currentLayer: 1,
      isTextInputEnabled: true,
      suggestedActions: []
    };
  }

  // ESTADO INICIAL
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
