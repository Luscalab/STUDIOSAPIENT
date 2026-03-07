'use server';
/**
 * @fileOverview An AI-powered conversational tool that assesses client needs and recommends suitable Sapient services.
 *
 * - recommendServices - A function that handles the service recommendation process.
 * - ServiceRecommenderInput - The input type for the recommendServices function.
 * - ServiceRecommenderOutput - The return type for the recommendServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SapientServices = [
  'Publicidade/marketing',
  'Design Estratégico',
  'Gestão de Redes',
  'Áudio',
] as const;

const ServiceRecommenderInputSchema = z.object({
  clientNeedsAndGoals: z
    .string()
    .describe("A detailed description of the potential client's business needs, goals, and current challenges."),
});
export type ServiceRecommenderInput = z.infer<typeof ServiceRecommenderInputSchema>;

const ServiceRecommenderOutputSchema = z.object({
  recommendedServices: z
    .array(z.enum(SapientServices))
    .describe('An array of Sapient Studio services recommended for the client.'),
  reasoning: z
    .string()
    .describe('A detailed explanation of why each service was recommended, tailored to the client\u0027s specific needs.'),
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
  prompt: `You are an AI-powered consultant for Sapient Studio, a digital marketing and branding company. Your goal is to understand a potential client's business needs and goals and recommend the most suitable services from Sapient Studio.

Sapient Studio offers the following services:
- Publicidade/marketing: Comprehensive advertising and marketing strategies, campaign execution, and digital presence enhancement.
- Design Estratégico: Strategic visual identity development, branding, UI/UX design, and creative solutions that reflect a brand's core values.
- Gestão de Redes: Professional management of social media platforms, content creation, community engagement, and audience growth.
- Áudio: Production of audio content, including podcasts, jingles, voice-overs, and sound design for various media.

Based on the client's description below, identify which of Sapient Studio's services would best help them achieve their goals. Explain your reasoning clearly for each recommended service, ensuring it directly addresses the client's specific needs and objectives.

Client's Business Needs and Goals: {{{clientNeedsAndGoals}}}`,
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
