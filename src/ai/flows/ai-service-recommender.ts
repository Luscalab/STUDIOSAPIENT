'use server';
/**
 * @fileOverview Motor de Consultoria Estratégica Sapient Studio.
 * 
 * Implementa um protocolo de coleta de dados obrigatório e uma Matriz Estratégica de Nichos
 * para otimizar a resposta da API e garantir autoridade no diagnóstico.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SapientServices = [
  'Performance & Ads (incl. Google Meu Negócio)',
  'Design Estratégico & Identidade Visual',
  'Gestão de Redes & Autoridade Social',
] as const;

// Base de Conhecimento Pré-Estabelecida para Nichos Comuns
const NICHE_STRATEGY_MATRIX = `
MATRIZ ESTRATÉGICA SAPIENT (USAR COMO BASE DE RESPOSTA):

1. SAÚDE (Dentistas, Clínicas, Médicos):
- Gargalo: Falta de confiança visual e dificuldade de ser achado localmente.
- Estratégia: GMN de Elite (rankeamento local) + Identidade Visual que transmita higiene e luxo.

2. DIREITO (Advogados, Escritórios):
- Gargalo: Aparência amadora ou genérica que não justifica honorários altos.
- Estratégia: Autoridade Social (Conteúdo denso e elegante) + Branding de Prestígio.

3. GASTRONOMIA (Restaurantes, Cafés, Bares):
- Gargalo: Fotos ruins no GMN e redes sociais sem "apetite appeal".
- Estratégia: Gestão de Redes (Curadoria visual extrema) + GMN Otimizado (fotos e reviews).

4. ESTÉTICA & BELEZA (Salões, Clínicas de Estética):
- Gargalo: Feed "bagunçado" e falta de diferenciação visual para serviços premium.
- Estratégia: Design System Exclusivo + Social Growth focado em portfólio de luxo.

5. VAREJO LOCAL / LOJAS DE ROUPAS:
- Gargalo: Dependência de indicação e falta de tráfego qualificado; imagem de marca "comum".
- Estratégia: Performance & Ads (Tráfego direto) + Identidade Visual (Branding de Moda) + Redes (Desejo).

6. MERCADOS & FARMÁCIAS (Essenciais):
- Gargalo: Invisibilidade em buscas de urgência e falta de catálogos digitais claros.
- Estratégia: Domínio Total do GMN (Google Meu Negócio) + Ads Geofencing (raio de 3km).

7. DESIGNER DE UNHA / NAILS:
- Gargalo: Portfólio mal apresentado e falta de percepção de higiene/valor premium.
- Estratégia: Autoridade Social (Curadoria de Portfólio) + Identidade Visual (Luxo/Clean).

8. VAREJO GERAL:
- Gargalo: Falta de escala e domínio da região.
- Estratégia: Performance & Ads + GMN Ativo.
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
1. Nome da Marca.
2. Nicho de Atuação.
3. Desafio Principal.

Ação: Defina 'isDataSufficient' como false. Peça os dados como um consultor que não aceita trabalhar com suposições.

FASE 2: AUDIT ESTRATÉGICO (isDataSufficient = true)
Se os dados estiverem presentes:
- Defina 'isDataSufficient' como true.
- Use a MATRIZ ESTRATÉGICA para enquadrar o cliente no nicho dele.
- BRAND AUDIT: Mostre que você conhece o nicho dele. Fale especificamente sobre os desafios de (Farmácia, Moda, Nail Designer, Mercado, etc) se for o caso.
- DIAGNÓSTICO: Aponte a falha exata baseada no padrão do nicho.
- INTERVENÇÃO: Explique o que a SAPIENT fará. NUNCA dê dicas para ele fazer sozinho. Foque na nossa execução de elite.

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