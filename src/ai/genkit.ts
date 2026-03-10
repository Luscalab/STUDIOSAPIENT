import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Inicialização do Genkit com a chave do Gemini fornecida pelo usuário.
 * Configurado para o modelo Gemini 1.5 Flash para máxima agilidade.
 */
export const ai = genkit({
  plugins: [
    googleAI({ apiKey: 'AIzaSyDI4In-0JQHu9amI1ixTAqTl1RPdzQzp2w' })
  ],
  model: 'googleai/gemini-1.5-flash',
});
