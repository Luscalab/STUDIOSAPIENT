'use server';

/**
 * @fileOverview Motor de Diagnóstico Sapient - Fluxo Determinístico Internacionalizado.
 */

import { z } from 'genkit';
import { translations, Language } from '@/lib/i18n/translations';

const RecommenderOutputSchema = z.object({
  reply: z.string().describe('A pergunta ou comentário do consultor.'),
  suggestedActions: z.array(z.string()).describe('Opções de botões para o usuário.'),
  isMultiSelect: z.boolean().describe('Permite que o usuário marque várias opções.'),
  isTextInputEnabled: z.boolean().describe('Habilita o campo de digitação.'),
  shouldRedirect: z.boolean().describe('Sinaliza o fim da conversa para redirecionamento.'),
  currentLayer: z.number().describe('O índice do passo atual.')
});

export type RecommenderOutput = z.infer<typeof RecommenderOutputSchema>;

const RecommenderInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })),
  currentMessage: z.string(),
  language: z.string().optional().default('pt-BR')
});

export type RecommenderInput = z.infer<typeof RecommenderInputSchema>;

export async function recommendServices(input: RecommenderInput): Promise<RecommenderOutput> {
  const langCode = (input.language as Language) || 'pt-BR';
  const t = translations[langCode] || translations['pt-BR'];
  const flow = t.chat_flow;

  const userResponses = input.history.filter(m => m.role === 'user');
  const stepIndex = userResponses.length;

  const STEPS = [
    { id: 1, question: flow.step1.q, options: flow.step1.options, isMulti: false },
    { id: 2, question: flow.step2.q, options: flow.step2.options, isMulti: true },
    { id: 3, question: flow.step3.q, options: flow.step3.options, isMulti: false },
    { id: 4, question: flow.step4.q, options: [], isMulti: true },
    { id: 5, question: flow.step5.q, options: flow.step5.options, isMulti: false },
    { id: 6, question: flow.step6.q, options: [], isMulti: false, forceText: true },
    { id: 7, question: flow.step7.q, options: [], isMulti: false, isEnd: true }
  ];

  if (stepIndex >= STEPS.length) {
    return {
      reply: STEPS[STEPS.length - 1].question,
      suggestedActions: [],
      isMultiSelect: false,
      isTextInputEnabled: false,
      shouldRedirect: true,
      currentLayer: 7
    };
  }

  const currentStep = STEPS[stepIndex];
  let reply = currentStep.question;
  let options = [...currentStep.options];
  let forceText = currentStep.forceText || false;

  // Lógica de "Outros"
  if (stepIndex === 1 && input.history[0]?.content === flow.others_label) {
    if (input.currentMessage === flow.others_label) {
       return {
        reply: flow.others_q,
        suggestedActions: [],
        isMultiSelect: false,
        isTextInputEnabled: true,
        shouldRedirect: false,
        currentLayer: 1
      };
    }
  }

  // Lógica de Gargalos Específicos por Nicho (Passo 4)
  if (stepIndex === 3) {
    const niche = userResponses[0]?.content || "";
    
    // Mapeamento de gargalos por idioma
    const bottlenecks: Record<string, string[]> = {
      'pt-BR': ["Clientes só perguntam preço", "Minha imagem parece amadora", "Demoro a responder no WhatsApp", "Não apareço quando buscam no Google", "Tenho vergonha de postar"],
      'pt-PT': ["Clientes apenas perguntam preço", "A minha imagem parece amadora", "Demoro a responder no WhatsApp", "Não apareço quando pesquisam no Google", "Tenho vergonha de publicar"],
      'en': ["Clients only ask for price", "My image looks amateur", "Slow response on WhatsApp", "I don't show up on Google searches", "I'm afraid to post"],
      'es': ["Clientes solo preguntan precio", "Mi imagen parece amateur", "Tardo en responder por WhatsApp", "No aparezco en las búsquedas de Google", "Tengo vergüenza de publicar"]
    };

    const currentBottlenecks = bottlenecks[langCode] || bottlenecks['pt-BR'];
    options = currentBottlenecks;
  }

  return {
    reply,
    suggestedActions: options,
    isMultiSelect: currentStep.isMulti || false,
    isTextInputEnabled: forceText,
    shouldRedirect: currentStep.isEnd || false,
    currentLayer: currentStep.id
  };
}
