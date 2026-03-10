'use server';

/**
 * @fileOverview Inteligência de Prospecção Sapient Studio - Módulo Local.
 * Implementa um motor de diálogo determinístico baseado em roteiros de alta conversão.
 */

export type RecommenderOutput = {
  reply: string;
  shouldRedirect: boolean;
  suggestedActions?: string[];
};

export type RecommenderInput = {
  history: { role: 'user' | 'model'; content: string }[];
  currentMessage: string;
};

/**
 * Fluxo de recomendação de serviços (Versão Local/Resiliente).
 * Analisa a mensagem do usuário e retorna respostas baseadas em roteiros estratégicos.
 */
export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const msg = input.currentMessage.toLowerCase();
  const historyCount = input.history.length;

  // 1. SETOR DE SAÚDE / MÉDICO
  if (msg.includes('médico') || msg.includes('clínica') || msg.includes('saúde') || msg.includes('hospital') || msg.includes('doctor')) {
    return {
      reply: "Entendo perfeitamente. No setor de SAÚDE, a autoridade visual é o que separa um 'custo' de um 'investimento' na mente do paciente. Na Sapient, focamos em design que comunica confiança absoluta. Como está sua presença digital hoje em termos de captação?",
      shouldRedirect: false,
      suggestedActions: ["Preciso de mais pacientes", "Meu design está datado", "Quero automatizar o WhatsApp"]
    };
  }

  // 2. SETOR JURÍDICO / ADVOCACIA
  if (msg.includes('advogado') || msg.includes('jurídico') || msg.includes('direito') || msg.includes('escritório') || msg.includes('lei')) {
    return {
      reply: "Excelente. Para o setor JURÍDICO, trabalhamos com a 'psicologia do prestígio'. Um design sóbrio e uma narrativa visual clara encurtam o caminho da contratação. Qual é o seu principal desafio comercial hoje?",
      shouldRedirect: false,
      suggestedActions: ["Performance Ads / Google", "Nova Identidade Visual", "Dossiês de Venda"]
    };
  }

  // 3. PERFORMANCE / TRÁFEGO PAGO
  if (msg.includes('vendas') || msg.includes('leads') || msg.includes('performance') || msg.includes('anúncios') || msg.includes('google') || msg.includes('trafego') || msg.includes('tráfego')) {
    return {
      reply: "Performance Ads é o nosso motor principal. Capturamos a 'demanda de urgência' no Google para gerar contratos reais. Você já investe em tráfego pago ou está buscando iniciar uma operação do zero?",
      shouldRedirect: false,
      suggestedActions: ["Já invisto (Sem ROI)", "Quero começar agora", "Escalar faturamento"]
    };
  }

  // 4. DESIGN / BRANDING
  if (msg.includes('design') || msg.includes('marca') || msg.includes('logo') || msg.includes('identidade') || msg.includes('visual')) {
    return {
      reply: "O Design Estratégico na Sapient não é sobre estética, é sobre 'Barreira de Valor'. Criamos identidades que justificam tickets mais altos. Você sente que sua marca atual comunica o seu real valor de mercado?",
      shouldRedirect: false,
      suggestedActions: ["Não, pareço pequeno", "Quero um visual de luxo", "Preciso de um site novo"]
    };
  }

  // 5. INTELIGÊNCIA ARTIFICIAL
  if (msg.includes('ia') || msg.includes('ai') || msg.includes('chat') || msg.includes('atendimento') || msg.includes('bot')) {
    return {
      reply: "Ecossistemas autônomos são o futuro da escala. Implementamos IAs treinadas na sua expertise para qualificar leads 24/7. Você busca automação para WhatsApp ou para o seu site?",
      shouldRedirect: false,
      suggestedActions: ["IA para WhatsApp", "IA para Site", "Agente de Vendas 24h"]
    };
  }

  // FLUXO DE FECHAMENTO (Após interação mínima ou pedido explícito)
  if (historyCount >= 2 || msg.includes('contato') || msg.includes('whatsapp') || msg.includes('falar') || msg.includes('preço') || msg.includes('valor')) {
    return {
      reply: "Sua visão estratégica está alinhada com nossa metodologia. Para estruturarmos um Dossiê de Diagnóstico personalizado, o ideal é seguirmos para uma breve conversa técnica com um de nossos consultores seniores.",
      shouldRedirect: true,
      suggestedActions: ["Falar no WhatsApp agora", "Agendar Reunião", "Ver Casos de Sucesso"]
    };
  }

  // RESPOSTA PADRÃO (FALLBACK / INÍCIO)
  return {
    reply: "Protocolo Estratégico iniciado. Na Sapient Studio, transformamos desafios comerciais em ecossistemas de alta clareza e autoridade. Para eu ser mais preciso: em qual nicho você atua e qual o seu maior objetivo hoje?",
    shouldRedirect: false,
    suggestedActions: ["Saúde / Bem-estar", "Advocacia / Jurídico", "Serviços / Consultoria", "E-commerce / Varejo"]
  };
}
