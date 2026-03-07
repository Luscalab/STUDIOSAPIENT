'use server';
/**
 * @fileOverview Motor de Consultoria Estratégica Sapient Studio.
 * 
 * Implementa um protocolo de coleta de dados obrigatório e uma Matriz Estratégica de Nichos
 * expandida para abranger diversas áreas de negócios e serviços.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SapientServices = [
  'Performance & Ads (incl. Google Meu Negócio)',
  'Design Estratégico & Identidade Visual',
  'Gestão de Redes & Autoridade Social',
] as const;

// Base de Conhecimento Pré-Estabelecida Expandida
const NICHE_STRATEGY_MATRIX = `
MATRIZ ESTRATÉGICA SAPIENT (PROTOCOLOS POR NICHO):

1. SAÚDE (Dentistas, Clínicas, Médicos):
- Gargalo: Falta de confiança visual e dificuldade de ser achado localmente.
- Estratégia: GMN de Elite (rankeamento) + Identidade Visual de Luxo.

2. DIREITO (Advogados, Escritórios):
- Gargalo: Imagem amadora que não justifica honorários altos.
- Estratégia: Autoridade Social (Conteúdo Elegante) + Branding de Prestígio.

3. GASTRONOMIA (Restaurantes, Cafés, Bares):
- Gargalo: Fotos ruins e falta de "apetite appeal" nas redes.
- Estratégia: Gestão de Redes (Curadoria Visual) + GMN Otimizado.

4. ESTÉTICA, BELEZA & NAILS:
- Gargalo: Feed bagunçado e falta de diferenciação para serviços premium.
- Estratégia: Design System Exclusivo + Social Growth focado em portfólio de luxo.

5. VAREJO DE MODA / LOJAS:
- Gargalo: Dependência de indicação e imagem de marca "comum".
- Estratégia: Performance & Ads (Tráfego) + Identidade Visual (Branding de Moda).

6. MERCADOS & FARMÁCIAS:
- Gargalo: Invisibilidade em buscas de urgência e catálogos digitais confusos.
- Estratégia: Domínio Total do GMN + Ads Geofencing (raio local).

7. IMOBILIÁRIA & CORRETAGEM:
- Gargalo: Fotos de baixa qualidade e falta de anúncios segmentados por renda.
- Estratégia: Design Estratégico (Apresentação de Imóveis) + Ads de Alta Conversão.

8. EDUCAÇÃO, CURSOS & MENTORIAS:
- Gargalo: Falta de autoridade do instrutor e design genérico que não gera desejo.
- Estratégia: Autoridade Social + Branding Educacional de Alto Valor.

9. ARQUITETURA & ENGENHARIA:
- Gargalo: Portfólio não transmite o luxo e a precisão do projeto final.
- Estratégia: Identidade Visual Premium + Curadoria de Portfólio Digital.

10. PET SHOPS & VETERINÁRIAS:
- Gargalo: Falta de reviews positivos no GMN e redes sem humanização.
- Estratégia: GMN de Elite + Gestão de Redes (Humanização e Confiança).

11. SERVIÇOS DE URGÊNCIA (Eletricistas, Chaveiros, etc):
- Gargalo: Não ser encontrado instantaneamente no Google no momento da dor.
- Estratégia: Domínio Absoluto do GMN + Ads de Resposta Direta.
`;

const ServiceRecommenderInputSchema = z.object({
  clientNeedsAndGoals: z
    .string()
    .describe("Histórico da conversa ou descrição atual do cliente sobre sua marca e desafios."),
});
export type ServiceRecommenderInput = z.infer<typeof ServiceRecommenderInputSchema>;

const ServiceRecommenderOutputSchema = z.object({
  isDataSufficient: z
    .boolean()
    .describe('Indica se o usuário forneceu informações suficientes para um audit estratégico profissional.'),
  missingInfoMessage: z
    .string()
    .optional()
    .describe('Mensagem de consultor de elite solicitando os dados que faltam para prosseguir.'),
  brandAudit: z
    .string()
    .describe('Análise da percepção de marca baseada na Matriz Estratégica de Nichos.'),
  diagnosis: z
    .string()
    .describe('Identificação do gargalo específico usando os padrões da Matriz.'),
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('Intervenções específicas da Sapient Studio.'),
  strategicValue: z
    .string()
    .describe('Valor da nossa execução profissional para este nicho específico.'),
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
  prompt: `Você é o Arquiteto-Chefe de Estratégia da Sapient Studio. 

PROTOCOLO DE CONSULTORIA PRÉVIA:
Utilize a seguinte base de conhecimento para economizar processamento e ser cirúrgico:
${NICHE_STRATEGY_MATRIX}

FASE 1: COLETA E ENTENDIMENTO (isDataSufficient = false)
Se a entrada do usuário: "{{{clientNeedsAndGoals}}}" for vaga ou faltar:
1. Nome da Marca/Negócio.
2. Nicho de Atuação.
3. O que buscam resolver agora.

Ação: Defina 'isDataSufficient' como false. Peça os dados como um consultor de elite.

FASE 2: AUDIT ESTRATÉGICO (isDataSufficient = true)
Se os dados estiverem presentes:
- Defina 'isDataSufficient' como true.
- Use a MATRIZ ESTRATÉGICA para enquadrar o cliente no nicho dele. Se for um nicho novo, use os princípios de (Visibilidade Local, Autoridade Social ou Identidade Visual).
- BRAND AUDIT: Mostre autoridade sobre o nicho dele.
- DIAGNÓSTICO: Aponte a falha exata (GMN invisível, Design amador, Redes sem estratégia).
- INTERVENÇÃO: Explique o que a SAPIENT fará para consertar isso. Fale de EXECUÇÃO, não de "dicas".

TOM DE VOZ:
Elite, honesto, direto e focado em valor executivo.`,
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