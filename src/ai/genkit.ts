import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * @fileOverview Inicialização do motor de IA Sapient Studio.
 * Configurado com a chave de API fornecida e modelo 1.5 Flash para máxima agilidade.
 * Prioriza variáveis de ambiente para segurança e estabilidade.
 */
export const ai = genkit({
  plugins: [
    googleAI({ 
      apiKey: process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyDI4In-0JQHu9amI1ixTAqTl1RPdzQzp2w' 
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
