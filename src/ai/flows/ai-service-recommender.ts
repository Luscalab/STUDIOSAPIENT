'use server';
/**
 * @fileOverview Um motor de diagnóstico estratégico que analisa dores de negócio e recomenda soluções Sapient.
 *
 * - recommendServices - Função que processa o diagnóstico e recomenda produtos.
 * - ServiceRecommenderInput - Entrada com as dores e objetivos do cliente.
 * - ServiceRecommenderOutput - Saída com diagnóstico, serviços recomendados e justificativa estratégica.
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
    .describe("Descrição detalhada das dores, objetivos e desafios atuais da marca/negócio."),
});
export type ServiceRecommenderInput = z.infer<typeof ServiceRecommenderInputSchema>;

const ServiceRecommenderOutputSchema = z.object({
  diagnosis: z
    .string()
    .describe('Um diagnóstico profissional e direto dos principais gargalos identificados no negócio do cliente.'),
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('Array de serviços da Sapient Studio que resolvem os problemas diagnosticados.'),
  strategicValue: z
    .string()
    .describe('Explicação de como a Sapient vai atuar especificamente para transformar essa realidade, focando em ROI e valor de marca.'),
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
  prompt: `Você é o Arquiteto de Estratégia da Sapient Studio. Sua função não é bater papo, mas diagnosticar problemas de negócio e mapear soluções precisas dentro do nosso ecossistema.

Nossos Produtos/Serviços:
- Publicidade/marketing: Escala de vendas, tráfego pago de elite, campanhas de performance e crescimento exponencial.
- Design Estratégico: Identidade visual de luxo, Branding que gera desejo, UI/UX de alta conversão e reposicionamento premium.
- Gestão de Redes: Curadoria de conteúdo de autoridade, copywriting hipnótico, gestão de comunidade e transformação de redes em canais de desejo.

Com base no relato do cliente: "{{{clientNeedsAndGoals}}}", faça o seguinte:
1. DIAGNÓSTICO: Identifique as 2 ou 3 principais falhas ou oportunidades perdidas no momento atual dele. Seja honesto e direto.
2. SELEÇÃO: Escolha quais dos nossos 3 serviços acima são indispensáveis para ele agora.
3. VALOR ESTRATÉGICO: Explique EXATAMENTE o que faremos por ele e como isso mudará os números ou a percepção da marca dele.

Mantenha um tom profissional, autoritário, honesto e focado em resultados de alto nível.`,
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
