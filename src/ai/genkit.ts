import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * @fileOverview Inicialização do motor de IA Sapient Studio.
 * Configurado para máxima estabilidade com o modelo Gemini 1.5 Flash.
 */
export const ai = genkit({
  plugins: [
    googleAI({ 
      apiKey: process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyDI4In-0JQHu9amI1ixTAqTl1RPdzQzp2w' 
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
