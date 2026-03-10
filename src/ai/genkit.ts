
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Inicialização do Genkit com o plugin Google AI.
 * Utiliza o modelo Gemini 2.5 Flash para respostas rápidas e inteligentes.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash-exp', // Modelo de última geração para performance superior
});
