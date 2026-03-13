import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * @fileOverview Inicialização do motor de IA Sapient Studio.
 * Configurado para o modelo Gemini 1.5 Flash utilizando a chave do ambiente GOOGLE_API_KEY.
 */
export const ai = genkit({
  plugins: [
    googleAI({ 
      apiKey: process.env.GOOGLE_API_KEY
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
