"use client";

import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-5 w-5 md:h-8 md:w-8" />,
    title: "Entendimento",
    desc: "Conversamos para entender seus objetivos, desafios e o público que você deseja alcançar."
  },
  {
    icon: <Target className="h-5 w-5 md:h-8 md:w-8" />,
    title: "Planejamento",
    desc: "Criamos um roteiro estratégico focado nas soluções que farão mais sentido para o seu negócio."
  },
  {
    icon: <PenTool className="h-5 w-5 md:h-8 md:w-8" />,
    title: "Execução",
    desc: "Desenvolvemos o projeto com atenção aos detalhes, garantindo qualidade técnica e visual."
  },
  {
    icon: <Rocket className="h-5 w-5 md:h-8 md:w-8" />,
    title: "Acompanhamento",
    desc: "Analisamos os resultados obtidos e sugerimos melhorias contínuas para o seu crescimento constante."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-16 md:py-32 bg-white text-black relative overflow-hidden rounded-[2.5rem] md:rounded-[6rem] mx-4 my-6 shadow-xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 md:mb-20 text-center md:text-left max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 mb-2">Caminho do ROI</p>
          <h2 className="font-headline text-2xl md:text-7xl font-black text-black tracking-tighter leading-[0.85] uppercase">
            Nossa <br />
            <span className="text-primary italic font-medium">Metodologia.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-secondary/30 border border-muted/5 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between h-[280px] md:h-[400px] overflow-hidden">
              <div className="relative z-10">
                <div className="h-10 w-10 md:h-16 md:w-16 rounded-xl bg-white flex items-center justify-center text-primary mb-6 border border-muted shadow-md group-hover:bg-primary group-hover:text-white transition-all">
                  {step.icon}
                </div>
                <h3 className="font-headline text-base md:text-2xl font-black text-black mb-2 tracking-tighter uppercase leading-[0.9]">
                  {step.title}
                </h3>
                <p className="text-black/60 text-[10px] md:text-base leading-relaxed font-medium tracking-tight mb-6">
                  {step.desc}
                </p>
              </div>
              
              <span className="text-[4rem] md:text-[8rem] font-black text-black/[0.03] absolute -bottom-2 -right-1 md:-bottom-6 md:-right-3 select-none pointer-events-none group-hover:text-primary/[0.05] transition-all">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}