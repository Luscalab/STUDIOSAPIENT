
"use client";

import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Diagnóstico",
    description: "Auditamos sua presença digital e identificamos falhas estruturais na comunicação e performance."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Estratégia",
    description: "Desenhamos um ecossistema visual e narrativo focado em clareza técnica e conversão."
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Execução",
    description: "Implementamos melhorias em design e anúncios com foco em agilidade e precisão."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Evolução",
    description: "Monitoramos métricas reais e ajustamos a rota para garantir o crescimento contínuo do negócio."
  }
];

export function Process() {
  return (
    <section className="section-spacing hero-purple-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-32 gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md">Metodologia Técnica</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-2xl">Estrutura de<br />Crescimento</h2>
          </div>
          <p className="text-white/70 text-xl md:text-2xl font-medium max-w-sm leading-relaxed text-center lg:text-left tracking-tight">
            Um processo direto e transparente focado na profissionalização constante da sua marca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group p-10 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 transition-all duration-700 hover:bg-white/15 hover:-translate-y-2 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-700 border border-white/10">
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-white/5 group-hover:text-white/20 transition-colors select-none">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-black tracking-tighter text-white">{step.title}</h3>
                <p className="text-white/60 leading-relaxed font-medium text-base md:text-lg tracking-tight">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
