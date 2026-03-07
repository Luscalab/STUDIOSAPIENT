'use server';
/**
 * @fileOverview Um motor de diagnóstico estratégico especializado em Google Meu Negócio, Identidade Visual e Social Media.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SapientServices = [
  'Performance & Ads (incl. Google Meu Negócio)',
  'Design Estratégico & Identidade Visual',
  'Gestão de Redes & Autoridade Social',
] as const;

const ServiceRecommenderInputSchema = z.object({
  clientNeedsAndGoals: z
    .string()
    .describe("Descrição da marca, nicho, público-alvo e os desafios/objetivos atuais."),
});
export type ServiceRecommenderInput = z.infer<typeof ServiceRecommenderInputSchema>;

const ServiceRecommenderOutputSchema = z.object({
  brandAudit: z
    .string()
    .describe('Análise profunda sobre a percepção atual, presença no Google, força da Identidade Visual e maturidade nas redes sociais.'),
  diagnosis: z
    .string()
    .describe('Identificação cirúrgica do gargalo: Onde a marca está perdendo dinheiro por falta de visual, presença local ou autoridade social.'),
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('Serviços específicos da Sapient para a intervenção necessária.'),
  strategicValue: z
    .string()
    .describe('Como a intervenção da Sapient em design, performance local ou social vai transformar o faturamento.'),
});
export type ServiceRecommenderOutput = z.infer<typeof ServiceRecommenderOutputSchema>;

export async function recommendServices(
  input: ServiceRecommenderInput
): Promise<ServiceRecommenderOutput> {
  return aiServiceRecommenderFlow(input);
}

const serviceRecommenderPrompt = ai.definePrompt({
  name: 'serviceRecommenderPrompt',
  input: {schema: ServiceRecommenderInputSchema},
  output: {schema: ServiceRecommenderOutputSchema},
  prompt: `Você é o Arquiteto-Chefe de Estratégia da Sapient Studio. Sua missão é realizar um AUDIT DE MARCA focado em três pilares fundamentais:

1. PRESENÇA LOCAL (Google Meu Negócio): A marca é encontrável? Ela passa confiança no Google?
2. IDENTIDADE VISUAL: O design comunica valor premium ou parece amador? A marca tem unidade visual?
3. AUTORIDADE SOCIAL (Social Media): O conteúdo gera desejo ou é apenas ruído?

Com base nos dados: "{{{clientNeedsAndGoals}}}", siga este protocolo:

- BRAND AUDIT: Analise como a marca se apresenta hoje. Se o cliente mencionou falta de clientes, verifique se a falha é no Google (presença local) ou no Desejo (Identidade e Social).
- DIAGNÓSTICO: Aponte o erro fatal. Ex: "Sua marca é invisível localmente" ou "Sua Identidade Visual está repelindo clientes de alto ticket". Seja direto.
- SELEÇÃO: Escolha entre nossos pilares:
  - Performance & Ads (incl. Google Meu Negócio): Para busca direta e escala.
  - Design Estratégico & Identidade Visual: Para percepção de valor e autoridade estética.
  - Gestão de Redes & Autoridade Social: Para retenção, desejo e comunidade.

- VALOR ESTRATÉGICO: Diga o que NÓS faremos. Não dê dicas para ele fazer sozinho. Foque em: "Nossa intervenção vai criar um ecossistema onde sua marca deixa de ser uma opção e se torna o padrão de luxo".

O tom é de um consultor de elite: caro, inteligente, honesto e focado em fechar a parceria.`,
});

const aiServiceRecommenderFlow = ai.defineFlow(
  {
    name: 'aiServiceRecommenderFlow',
    inputSchema: ServiceRecommenderInputSchema,
    outputSchema: ServiceRecommenderOutputSchema,
  },
  async input => {
    const {output} = await serviceRecommenderPrompt(input);
    return output!;
  }
);
