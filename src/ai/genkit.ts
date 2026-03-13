
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * @fileOverview Inicialização do motor de IA Sapient Studio.
 * Configurado para o modelo Gemini 1.5 Pro conforme solicitado.
 */
export const ai = genkit({
  plugins: [
    googleAI({ 
      apiKey: "AIzaSyBH5-U59VmTAg6p5QFq7tYtZYcAsr4WAI8"
    })
  ],
  model: 'googleai/gemini-1.5-pro',
});
