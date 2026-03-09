"use client";

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
    <section id="metodologia" className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-24 max-w-4xl mx-auto space-y-6">
          <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-none text-foreground uppercase">
            ENGENHARIA DE <span className="text-primary italic">RESULTADOS.</span>
          </h2>
          <p className="text-foreground/40 text-xl font-medium leading-relaxed tracking-tight max-w-2xl mx-auto italic">
            Um fluxo rigoroso para marcas que não aceitam a média do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-12 rounded-[3.5rem] bg-secondary border border-muted transition-all duration-500 hover:-translate-y-4 shadow-xl">
              <div className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center text-primary mb-12 border border-muted/50 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                {step.icon}
              </div>
              <h3 className="font-display text-2xl font-black text-foreground mb-4 tracking-tighter uppercase leading-none">
                {step.title}
              </h3>
              <p className="text-foreground/60 text-base leading-relaxed font-medium mb-12 tracking-tight">
                {step.desc}
              </p>
              <span className="text-8xl font-black text-foreground/5 absolute -bottom-4 -right-2 select-none group-hover:text-primary/5 transition-colors">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}