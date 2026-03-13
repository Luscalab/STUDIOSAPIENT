
'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, Activity, Target, Volume2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LocalBrainProps {
  text?: string;
  onAnalysisComplete?: (result: any) => void;
  statusOnly?: boolean;
}

const TONE_DICTIONARY = {
  AUTHORITY: ["lucro", "resultado", "roi", "investimento", "crescimento", "estratégia", "mercado", "performance", "escala", "autoridade"],
  HESITATION: ["talvez", "acho", "tentar", "quem sabe", "não sei", "é...", "hum", "desculpa", "provavelmente"],
  AGGRESSIVE: ["agora", "perda", "dinheiro", "urgente", "fechar", "contrato", "imediatamente", "escala", "obrigatório"],
  PROFESSIONAL: ["processo", "metodologia", "diagnóstico", "análise", "digital", "presença", "posicionamento", "branding"]
};

const INTENT_DICTIONARY = {
  CLOSING: ["fechar", "proposta", "amanhã", "assinar", "começar", "parceria", "fechamento", "fechado"],
  OBJECTION_HANDLING: ["entendo", "porém", "veja bem", "na verdade", "comparado", "embora", "justamente", "compreendo"],
  TECHNICAL: ["mobile", "google", "algoritmo", "ads", "seo", "conversão", "leads", "gmn", "site", "premium"],
  DISCOVERY: ["como", "quando", "onde", "por que", "qual", "quais", "ajudar", "entender"]
};

export function LocalBrain({ text, onAnalysisComplete, statusOnly = false }: LocalBrainProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'analyzing'>('idle');
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<{
    score: number;
    label: string;
    tone: string;
    intent: string;
    conclusion: string;
  } | null>(null);
  const classifierRef = useRef<any>(null);

  useEffect(() => {
    async function loadModel() {
      if (classifierRef.current) return;
      setStatus('loading');
      try {
        const { pipeline, env } = await import('@huggingface/transformers');
        env.allowLocalModels = false;
        env.useBrowserCache = true;
        env.allowRemoteModels = true;

        // Carrega um modelo leve para análise semântica local
        classifierRef.current = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
          progress_callback: (p: any) => {
            if (p.status === 'progress') setProgress(p.progress);
          }
        });
        setStatus('ready');
      } catch (err) {
        console.error("Erro IA Local:", err);
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
        const sentiment = output[0];
        const lowerText = text.toLowerCase();

        let detectedTone = "NEUTRAL";
        let detectedIntent = "GENERAL";

        // Varredura de dicionários semânticos proprietários
        for (const [tone, keywords] of Object.entries(TONE_DICTIONARY)) {
          if (keywords.some(k => lowerText.includes(k))) {
            detectedTone = tone;
            break;
          }
        }

        for (const [intent, keywords] of Object.entries(INTENT_DICTIONARY)) {
          if (keywords.some(k => lowerText.includes(k))) {
            detectedIntent = intent;
            break;
          }
        }

        let conclusion = "Processando semântica local...";
        if (detectedTone === "AUTHORITY" && detectedIntent === "CLOSING") {
          conclusion = "Forte autoridade comercial detectada localmente.";
        } else if (detectedTone === "HESITATION") {
          conclusion = "Hesitação identificada pelo motor local.";
        } else if (detectedIntent === "TECHNICAL") {
          conclusion = "Domínio técnico demonstrado.";
        } else {
          conclusion = "Discurso em fase de qualificação neural.";
        }

        const fullAnalysis = {
          score: sentiment.score,
          label: sentiment.label,
          tone: detectedTone,
          intent: detectedIntent,
          conclusion
        };

        setAnalysis(fullAnalysis);
        setStatus('ready');
        if (onAnalysisComplete) onAnalysisComplete(fullAnalysis);
      } catch (e) {
        console.error("Inference Error:", e);
        setStatus('ready');
      }
    }
    
    const timeout = setTimeout(runInference, 500);
    return () => clearTimeout(timeout);
  }, [text, status]);

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

  if (statusOnly) return null;

  if (!text || text.length < 3) return (
    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">Aguardando Início de Pitch para Análise Local</p>
    </div>
  );

  return (
    <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6 animate-in fade-in">
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
        <Activity className="h-4 w-4" /> Análise Neural 100% Local
      </div>

      {analysis ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[8px] font-black text-white/40 uppercase tracking-widest">
                <Volume2 className="h-3 w-3" /> Tom Detectado
              </div>
              <p className="text-xs font-black text-white uppercase">{analysis.tone}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[8px] font-black text-white/40 uppercase tracking-widest">
                <Target className="h-3 w-3" /> Intenção Detectada
              </div>
              <p className="text-xs font-black text-white uppercase">{analysis.intent}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[9px] font-black uppercase">
              <span className="text-white/40">Convicção Neural:</span>
              <span className="text-primary">{(analysis.score * 100).toFixed(0)}%</span>
            </div>
            <Progress value={analysis.score * 100} className="h-1 bg-white/5" />
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <p className="text-[10px] text-cyan-400 font-bold uppercase italic leading-tight">
              {analysis.conclusion}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[8px] font-black uppercase text-white/20 italic">
          <Loader2 className="h-3 w-3 animate-spin" /> Mapeando padrões localmente...
        </div>
      )}
    </div>
  );
}
