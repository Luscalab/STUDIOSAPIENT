import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * @fileOverview Inicialização do motor de IA Sapient Studio.
 * Configurado para Gemini 1.5 Flash para respostas instantâneas.
 */
export const ai = genkit({
  plugins: [
    googleAI({ apiKey: 'AIzaSyDI4In-0JQHu9amI1ixTAqTl1RPdzQzp2w' })
  ],
  model: 'googleai/gemini-1.5-flash',
});
