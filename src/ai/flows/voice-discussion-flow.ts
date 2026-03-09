'use server';
/**
 * @fileOverview Fluxo de Discussão por Voz do Sapient Studio.
 * 
 * Este fluxo processa a fala do usuário (via texto), gera uma resposta estratégica
 * e a converte em áudio utilizando o modelo Gemini TTS.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const VoiceDiscussionInputSchema = z.object({
  userMessage: z.string().describe('A transcrição da fala do usuário.'),
});

const VoiceDiscussionOutputSchema = z.object({
  textResponse: z.string().describe('A resposta em texto gerada pela IA.'),
  audioUri: z.string().describe('A resposta convertida em áudio (WAV Data URI).'),
});

async function pcmToWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

export const startVoiceDiscussion = ai.defineFlow(
  {
    name: 'startVoiceDiscussion',
    inputSchema: VoiceDiscussionInputSchema,
    outputSchema: VoiceDiscussionOutputSchema,
  },
  async (input) => {
    // 1. Gerar resposta contextual
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      system: `Você é a "Voz da Sapient Studio", um consultor estratégico amigável e profissional. 
      Sua missão é discutir o conteúdo deste site com o usuário.
      
      CONTEXTO:
      - Sapient Studio: Agência de Design e Performance.
      - Serviços: Ads, Branding, Chat IA, Gestão de Redes, Narrativa Visual.
      - UrbeLudo: Nosso projeto social/tecnológico de reabilitação motora e fonoaudiológica através de jogos.
      
      TOM DE VOZ:
      - Seja breve e direto (máximo 3 frases por resposta).
      - Fale como um parceiro que quer ajudar o negócio do cliente a crescer.
      - Evite termos pretensiosos; foque em clareza e resultados reais.
      
      A resposta será falada, então evite listas longas ou caracteres especiais complexos.`,
      prompt: input.userMessage,
    });

    if (!text) throw new Error('Não foi possível gerar uma resposta.');

    // 2. Converter texto em áudio
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });

    if (!media || !media.url) {
      throw new Error('Falha ao converter resposta em áudio.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await pcmToWav(audioBuffer);

    return {
      textResponse: text,
      audioUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
