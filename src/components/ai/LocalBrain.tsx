
'use client';

import { useState, useEffect, useRef } from 'react';
import { Brain, Loader2, Zap, ShieldCheck, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LocalBrainProps {
  text?: string;
  onAnalysisComplete?: (result: any) => void;
  statusOnly?: boolean;
}

/**
 * @fileOverview LocalBrain - IA de Alta Velocidade via WebAssembly.
 * Focado exclusivamente em processamento local sem API.
 */
export function LocalBrain({ text, onAnalysisComplete, statusOnly = false }: LocalBrainProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'analyzing'>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const classifierRef = useRef<any>(null);

  useEffect(() => {
    async function loadModel() {
      if (classifierRef.current) return;
      
      setStatus('loading');
      try {
        // Importação dinâmica rigorosa para evitar binários de node no servidor
        const { pipeline, env } = await import('@huggingface/transformers');
        
        env.allowLocalModels = false;
        env.useBrowserCache = true;
        env.allowRemoteModels = true;

        // Modelo ultra-rápido para análise de intenção e autoridade
        classifierRef.current = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
          progress_callback: (p: any) => {
            if (p.status === 'progress') setProgress(p.progress);
          }
        });
        setStatus('ready');
      } catch (err) {
        console.error("Erro no carregamento local:", err);
        setStatus('idle');
      }
    }
    loadModel();
  }, []);

  useEffect(() => {
    async function runInference() {
      if (status !== 'ready' || !classifierRef.current || !text || text.length < 3) return;
      
      setStatus('analyzing');
      try {
        const output = await classifierRef.current(text);
        const res = output[0];
        setResult(res);
        setStatus('ready');
        if (onAnalysisComplete) onAnalysisComplete(res);
      } catch (e) {
        console.error("Falha na análise local:", e);
        setStatus('ready');
      }
    }
    
    const timeout = setTimeout(runInference, 150);
    return () => clearTimeout(timeout);
  }, [text, status, onAnalysisComplete]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/10 animate-pulse">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white text-center">
          Aguarde enquanto carrego o ambiente de recrutamento: {progress.toFixed(0)}%
        </p>
        <Progress value={progress} className="h-1 w-full bg-white/5" />
      </div>
    );
  }

  if (statusOnly) {
    return (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
        {status === 'ready' || status === 'analyzing' ? (
          <>
            <ShieldCheck className="h-3 w-3 text-green-500" />
            <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Motor Neural Ativo</span>
          </>
        ) : (
          <>
            <Brain className="h-3 w-3 text-white/20" />
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">IA Local Offline</span>
          </>
        )}
      </div>
    );
  }

  if (!text || text.length < 3) return null;

  return (
    <div className="p-6 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
          <Activity className="h-4 w-4" /> Análise de Autoridade Local
        </div>
      </div>

      {result ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px] font-black uppercase">
            <span className="text-white/40">Índice de Convencimento:</span>
            <span className={result.label === 'POSITIVE' ? "text-green-400" : "text-yellow-400"}>
              {(result.score * 100).toFixed(0)}%
            </span>
          </div>
          <Progress value={result.score * 100} className="h-1.5 bg-white/5" />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[8px] font-black uppercase text-white/20 italic">
          <Loader2 className="h-3 w-3 animate-spin" /> Processando semântica local...
        </div>
      )}
    </div>
  );
}
