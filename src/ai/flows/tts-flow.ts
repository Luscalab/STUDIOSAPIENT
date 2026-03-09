
'use server';
/**
 * @fileOverview Fluxo de Geração de Áudio (TTS) para Audiodescrição.
 * 
 * Converte textos estratégicos em narrações de alta fidelidade para acessibilidade.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const TTSInputSchema = z.object({
  text: z.string().describe('O texto a ser convertido em áudio para audiodescrição.'),
});

const TTSOutputSchema = z.object({
  audioUri: z.string().describe('Data URI do áudio em formato WAV.'),
});

async function toWav(
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

export const generateAudioDescription = ai.defineFlow(
  {
    name: 'generateAudioDescription',
    inputSchema: TTSInputSchema,
    outputSchema: TTSOutputSchema,
  },
  async (input) => {
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
      prompt: input.text,
    });

    if (!media || !media.url) {
      throw new Error('Falha ao gerar áudio da audiodescrição.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audioUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
