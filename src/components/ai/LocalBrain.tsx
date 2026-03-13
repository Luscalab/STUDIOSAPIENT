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
 * @fileOverview LocalBrain - IA que roda 100% no navegador do usuário.
 * Utiliza Transformers.js para análise neural sem API externa.
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
        // Importação dinâmica para garantir execução apenas no cliente (browser)
        const { pipeline, env } = await import('@huggingface/transformers');
        
        // Configuração rigorosa para ambiente de navegador
        env.allowLocalModels = false;
        env.useBrowserCache = true;

        // Modelo de análise de autoridade e impacto neural
        classifierRef.current = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
          progress_callback: (p: any) => {
            if (p.status === 'progress') setProgress(p.progress);
          }
        });
        setStatus('ready');
      } catch (err) {
        console.error("Erro crítico no Cérebro Local:", err);
        setStatus('idle');
      }
    }
    loadModel();
  }, []);

  useEffect(() => {
    async function runInference() {
      if (status !== 'ready' || !text || text.length < 5) return;
      
      setStatus('analyzing');
      try {
        const output = await classifierRef.current(text);
        setResult(output[0]);
        setStatus('ready');
        if (onAnalysisComplete) onAnalysisComplete(output[0]);
      } catch (e) {
        console.error("Falha na inferência local:", e);
        setStatus('ready');
      }
    }
    
    const timeout = setTimeout(runInference, 800);
    return () => clearTimeout(timeout);
  }, [text, status, onAnalysisComplete]);

  // Modo de status para a primeira tela
  if (statusOnly) {
    return (
      <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        {status === 'loading' ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Sincronizando IA Local: {progress.toFixed(0)}%</span>
          </>
        ) : status === 'ready' || status === 'analyzing' ? (
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

  if (status === 'loading') {
    return (
      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
            <Loader2 className="h-4 w-4 animate-spin" /> Carregando Motor Neural
          </div>
          <span className="text-[10px] font-black text-white/20">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-1 bg-white/10" />
      </div>
    );
  }

  if (!text || text.length < 5) return null;

  return (
    <div className="p-6 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4 animate-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
          <Brain className="h-4 w-4" /> Análise de Autoridade Local
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
          <Activity className="h-3 w-3 text-green-500 animate-pulse" />
          <span className="text-[7px] font-black text-green-500 uppercase tracking-widest">Hardware Ativo</span>
        </div>
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className={result.label === 'POSITIVE' ? "text-yellow-400 h-3 w-3" : "text-white/20 h-3 w-3"} />
            <p className="text-[11px] font-black uppercase tracking-tight">
              Impacto de Persuasão: <span className={result.label === 'POSITIVE' ? "text-yellow-400" : "text-white/40"}>
                {result.label === 'POSITIVE' ? "ALTA CONFIANÇA" : "TOM EM ANÁLISE"}
              </span>
            </p>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000" 
              style={{ width: `${result.score * 100}%` }}
            />
          </div>
          <p className="text-[8px] text-white/20 leading-tight uppercase font-black">
            Processado via WebAssembly no dispositivo. Confiança Neural: {(result.score * 100).toFixed(1)}%.
          </p>
        </div>
      ) : status === 'analyzing' ? (
        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-white/40 italic">
          <Loader2 className="h-3 w-3 animate-spin text-primary" /> Decompondo padrões de fala...
        </div>
      ) : null}
    </div>
  );
}
