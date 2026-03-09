
"use client";

import { Badge } from "@/components/ui/badge";
import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10" />,
    title: "Diagnóstico",
    desc: "Auditamos sua marca para identificar falhas invisíveis."
  },
  {
    icon: <Target className="h-10 w-10" />,
    title: "Estratégia",
    desc: "Desenhamos um ecossistema visual exclusivo."
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Execução",
    desc: "Implementamos melhorias com absoluto rigor técnico."
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Escala",
    desc: "Ajuste constante para garantir seu crescimento."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-32 md:py-48 hero-purple-mesh relative overflow-hidden section-flow-top section-flow-bottom">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-4xl mx-auto space-y-6">
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-none text-white uppercase">
            Engenharia de <span className="text-primary italic">Resultados.</span>
          </h2>
          <p className="text-white/40 text-xl font-medium leading-relaxed tracking-tight max-w-2xl mx-auto italic">
            Um fluxo rigoroso para marcas que não aceitam a média do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/10 shadow-xl">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-12 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                {step.icon}
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-4 tracking-tighter uppercase">
                {step.title}
              </h3>
              <p className="text-white/40 text-base leading-relaxed font-medium mb-12 tracking-tight">
                {step.desc}
              </p>
              <span className="text-8xl font-black text-white/5 absolute -bottom-4 -right-2 select-none group-hover:text-primary/10 transition-colors">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
