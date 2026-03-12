
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * @fileOverview Inicialização do motor de IA Sapient Studio.
 * Configurado para máxima estabilidade com o modelo Gemini 1.5 Flash.
 * As chaves de API são gerenciadas exclusivamente via variáveis de ambiente para segurança.
 */
export const ai = genkit({
  plugins: [
    googleAI({ 
      apiKey: process.env.GOOGLE_GENAI_API_KEY
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
