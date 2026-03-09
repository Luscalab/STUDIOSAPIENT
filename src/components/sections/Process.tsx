
"use client";

import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10" />,
    title: "Diagnóstico",
    desc: "Auditamos sua marca para identificar falhas invisíveis e oportunidades de autoridade."
  },
  {
    icon: <Target className="h-10 w-10" />,
    title: "Estratégia",
    desc: "Desenhamos um ecossistema visual exclusivo e um plano de performance sob medida."
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Execução",
    desc: "Implementamos melhorias com absoluto rigor técnico e estética de prestígio."
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Escala",
    desc: "Ajuste constante e otimização de tráfego para garantir seu crescimento previsível."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-32 md:py-64 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-32 max-w-4xl mx-auto space-y-10">
          <h2 className="font-display text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-black uppercase">
            ENGENHARIA DE <span className="text-primary italic">RESULTADOS.</span>
          </h2>
          <p className="text-black/40 text-2xl font-medium leading-relaxed tracking-tight max-w-2xl mx-auto italic">
            Um fluxo rigoroso para marcas que não aceitam a média do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-12 rounded-[4rem] bg-secondary/40 border border-muted/10 transition-all duration-700 hover:-translate-y-6 shadow-2xl overflow-hidden">
              <div className="h-24 w-24 rounded-3xl bg-white flex items-center justify-center text-primary mb-12 border border-muted/5 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl group-hover:rotate-3">
                {step.icon}
              </div>
              <h3 className="font-display text-3xl font-black text-black mb-6 tracking-tighter uppercase leading-none">
                {step.title}
              </h3>
              <p className="text-black/60 text-lg leading-relaxed font-medium mb-12 tracking-tight">
                {step.desc}
              </p>
              <div className="h-1 w-12 bg-primary/10 group-hover:w-full group-hover:bg-primary transition-all duration-1000 rounded-full" />
              <span className="text-[12rem] font-black text-black/5 absolute -bottom-10 -right-4 select-none group-hover:text-primary/10 transition-all duration-1000 leading-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
