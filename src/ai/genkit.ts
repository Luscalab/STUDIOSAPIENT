import { genkit } from 'genkit';

/**
 * @fileOverview Inicialização do motor Sapient Studio.
 * Configurado para operação local e fluxos determinísticos, sem dependências de APIs externas pagas.
 */
export const ai = genkit({
  plugins: [], // Removido plugins de IA externa
});
