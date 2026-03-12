
'use client';

import { useState, useEffect, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Brain, Loader2, Zap, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LocalBrainProps {
  text: string;
  onAnalysisComplete?: (result: any) => void;
}

/**
 * @fileOverview LocalBrain - IA que roda 100% no navegador do usuário.
 * Utiliza Transformers.js e WebAssembly para análise sem API externa.
 */
export function LocalBrain({ text, onAnalysisComplete }: LocalBrainProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'analyzing'>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const classifierRef = useRef<any>(null);

  // Carrega o modelo localmente assim que o componente é montado
  useEffect(() => {
    async function loadModel() {
      if (classifierRef.current) return;
      
      setStatus('loading');
      try {
        // Modelo leve de análise de sentimento que roda em CPU/WebGPU local
        classifierRef.current = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
          progress_callback: (p: any) => {
            if (p.status === 'progress') setProgress(p.progress);
          }
        });
        setStatus('ready');
      } catch (err) {
        console.error("Erro ao carregar IA Local:", err);
        setStatus('idle');
      }
    }
    loadModel();
  }, []);

  // Executa a análise local sempre que o texto mudar e tiver mais de 10 caracteres
  useEffect(() => {
    async function runInference() {
      if (status !== 'ready' || !text || text.length < 10) return;
      
      setStatus('analyzing');
      const output = await classifierRef.current(text);
      setResult(output[0]);
      setStatus('ready');
      if (onAnalysisComplete) onAnalysisComplete(output[0]);
    }
    
    const timeout = setTimeout(runInference, 1000);
    return () => clearTimeout(timeout);
  }, [text, status, onAnalysisComplete]);

  if (status === 'loading') {
    return (
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4 animate-in fade-in">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando Cérebro Local (Sem API)
        </div>
        <Progress value={progress} className="h-1 bg-white/10" />
        <p className="text-[8px] text-white/30 uppercase font-bold">Otimizando modelos neurais no seu dispositivo...</p>
      </div>
    );
  }

  if (!text || text.length < 10) return null;

  return (
    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-4 animate-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
          <Brain className="h-4 w-4" /> Análise de Dispositivo
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
          <ShieldCheck className="h-3 w-3 text-green-500" />
          <span className="text-[7px] font-black text-green-500 uppercase">Processamento Local</span>
        </div>
      </div>

      {status === 'analyzing' ? (
        <div className="flex items-center gap-2 text-[9px] font-bold text-white/40 italic">
          <Loader2 className="h-3 w-3 animate-spin" /> IA local processando sua fala...
        </div>
      ) : result ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className={result.label === 'POSITIVE' ? "text-yellow-400 h-3 w-3" : "text-white/20 h-3 w-3"} />
            <p className="text-[11px] font-bold uppercase tracking-tight">
              Energia da Resposta: <span className={result.label === 'POSITIVE' ? "text-yellow-400" : "text-white/40"}>
                {result.label === 'POSITIVE' ? "ALTA AUTORIDADE" : "TOM NEUTRO/CAUTELOSO"}
              </span>
            </p>
          </div>
          <p className="text-[9px] text-white/30 leading-tight">
            Análise realizada via WebAssembly no seu hardware. Precisão de confiança: {(result.score * 100).toFixed(1)}%.
          </p>
        </div>
      ) : null}
    </div>
  );
}
