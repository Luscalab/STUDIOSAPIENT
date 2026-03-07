'use server';
/**
 * @fileOverview Um motor de diagnóstico estratégico que realiza um audit de marca antes de recomendar intervenções.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SapientServices = [
  'Publicidade/marketing',
  'Design Estratégico',
  'Gestão de Redes',
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
    .describe('Uma análise perspicaz sobre a percepção atual da marca e seu posicionamento no mercado com base no relato.'),
  diagnosis: z
    .string()
    .describe('Identificação cirúrgica do principal gargalo estratégico que está impedindo o crescimento ou a percepção de valor.'),
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('Serviços específicos da Sapient para a intervenção necessária.'),
  strategicValue: z
    .string()
    .describe('Como a execução da Sapient vai transformar a realidade do negócio, focando em autoridade e escala.'),
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
  prompt: `Você é o Arquiteto-Chefe de Estratégia da Sapient Studio. Sua missão é realizar um AUDIT DE MARCA e propor uma INTERVENÇÃO ESTRATÉGICA.

Nossos Pilares de Intervenção:
- Publicidade/marketing: Escala de vendas, tráfego pago de elite e performance.
- Design Estratégico: Branding de luxo, UI/UX de alta conversão e reposicionamento premium.
- Gestão de Redes: Curadoria de autoridade, copywriting hipnótico e desejo de marca.

Com base nos dados fornecidos: "{{{clientNeedsAndGoals}}}", siga rigorosamente este protocolo:

1. BRAND AUDIT: Primeiro, demonstre que você entendeu a marca. Analise o nicho, a provável percepção de público e as falhas na mensagem atual. Seja perspicaz, mostre que você "leu" a alma do negócio.
2. DIAGNÓSTICO: Aponte o erro fatal. Onde a marca está perdendo dinheiro ou autoridade? Seja direto e autoritário.
3. SELEÇÃO: Identifique quais dos nossos 3 serviços são a cura exata.
4. VALOR ESTRATÉGICO: Não dê conselhos. Diga o que NÓS faremos. Use frases como "Nossa intervenção em X vai garantir que sua marca Y alcance Z". Foque na nossa execução retirando o peso das costas do cliente.

O tom deve ser de um consultor de elite: caro, inteligente, honesto e focado em fechar a parceria para resolver o problema. Se o cliente não agir, ele continuará estagnado.`,
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
