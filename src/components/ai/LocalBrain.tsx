
'use client';

import { useState, useEffect } from 'react';
import { Loader2, Activity, Target, Volume2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LocalBrainProps {
  text?: string;
  onAnalysisComplete?: (result: any) => void;
  statusOnly?: boolean;
}

const TONE_DICTIONARY = {
  AUTHORITY: ["lucro", "resultado", "roi", "investimento", "crescimento", "estratégia", "mercado", "performance", "escala", "autoridade", "dominância", "previsível", "faturamento"],
  HESITATION: ["talvez", "acho", "tentar", "quem sabe", "não sei", "é...", "hum", "desculpa", "provavelmente", "tentarei", "gostaria"],
  AGGRESSIVE: ["agora", "perda", "dinheiro", "urgente", "fechar", "contrato", "imediatamente", "obrigatório", "parar"],
  PROFESSIONAL: ["processo", "metodologia", "diagnóstico", "análise", "digital", "presença", "posicionamento", "branding", "engenharia", "clareza"]
};

const INTENT_DICTIONARY = {
  CLOSING: ["fechar", "proposta", "amanhã", "assinar", "começar", "parceria", "fechamento", "reunião", "agendar", "fechado"],
  OBJECTION_HANDLING: ["entendo", "porém", "veja bem", "na verdade", "comparado", "embora", "justamente", "compreendo", "solução"],
  TECHNICAL: ["mobile", "google", "algoritmo", "ads", "seo", "conversão", "leads", "gmn", "site", "premium", "lcp", "ssr", "rag", "next.js"],
  DISCOVERY: ["como", "quando", "onde", "por que", "qual", "quais", "ajudar", "entender", "gargalo", "problema"]
};

export function LocalBrain({ text, onAnalysisComplete, statusOnly = false }: LocalBrainProps) {
  const [status, setStatus] = useState<'idle' | 'ready' | 'analyzing'>('idle');
  const [analysis, setAnalysis] = useState<{
    score: number;
    tone: string;
    intent: string;
    conclusion: string;
  } | null>(null);

  useEffect(() => {
    // Simula inicialização rápida do motor de análise
    const timer = setTimeout(() => setStatus('ready'), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== 'ready' || !text || text.length < 3) return;
    
    setStatus('analyzing');
    
    const runInference = () => {
      const lowerText = text.toLowerCase();
      let detectedTone = "NEUTRAL";
      let detectedIntent = "GENERAL";
      let score = 0.5; // Base neutral score

      // Análise de Tom
      for (const [tone, keywords] of Object.entries(TONE_DICTIONARY)) {
        if (keywords.some(k => lowerText.includes(k))) {
          detectedTone = tone;
          if (tone === "AUTHORITY" || tone === "PROFESSIONAL") score += 0.2;
          if (tone === "HESITATION") score -= 0.3;
          break;
        }
      }

      // Análise de Intenção
      for (const [intent, keywords] of Object.entries(INTENT_DICTIONARY)) {
        if (keywords.some(k => lowerText.includes(k))) {
          detectedIntent = intent;
          if (intent === "CLOSING" || intent === "TECHNICAL") score += 0.2;
          break;
        }
      }

      // Conclusão Estratégica
      let conclusion = "Processando análise de discurso...";
      if (detectedTone === "AUTHORITY" && detectedIntent === "CLOSING") {
        conclusion = "Excelente! Autoridade comercial e foco em fechamento detectados.";
      } else if (detectedTone === "HESITATION") {
        conclusion = "Atenção: Termos de hesitação reduzem sua autoridade técnica.";
      } else if (detectedIntent === "TECHNICAL") {
        conclusion = "Bom domínio técnico. Continue ancorando na dor do cliente.";
      } else if (text.length > 100) {
        conclusion = "Discurso consistente. Certifique-se de usar mais gatilhos de ROI.";
      } else {
        conclusion = "Discurso em fase de qualificação. Adicione termos de autoridade.";
      }

      const fullAnalysis = {
        score: Math.min(Math.max(score, 0.1), 0.98),
        tone: detectedTone,
        intent: detectedIntent,
        conclusion
      };

      setAnalysis(fullAnalysis);
      setStatus('ready');
      if (onAnalysisComplete) onAnalysisComplete(fullAnalysis);
    };
    
    const timeout = setTimeout(runInference, 300);
    return () => clearTimeout(timeout);
  }, [text, status]);

  if (status === 'idle') return null;
  if (statusOnly) return null;

  if (!text || text.length < 3) return (
    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">Aguardando Resposta para Análise Estratégica</p>
    </div>
  );

  return (
    <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6 animate-in fade-in">
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
        <Activity className="h-4 w-4" /> Inteligência de Discurso
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
                <Target className="h-3 w-3" /> Intenção
              </div>
              <p className="text-xs font-black text-white uppercase">{analysis.intent}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[9px] font-black uppercase">
              <span className="text-white/40">Convicção Técnica:</span>
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
          <Loader2 className="h-3 w-3 animate-spin" /> Mapeando padrões estratégicos...
        </div>
      )}
    </div>
  );
}
