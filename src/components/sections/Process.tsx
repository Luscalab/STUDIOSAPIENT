
"use client";

import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Entendimento",
    desc: "Conversamos para entender seus objetivos, desafios e o público que você deseja alcançar."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Planejamento",
    desc: "Criamos um roteiro estratégico focado nas soluções que farão mais sentido para o seu negócio."
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Execução",
    desc: "Desenvolvemos o projeto com atenção aos detalhes, garantindo qualidade técnica e visual."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Acompanhamento",
    desc: "Analisamos os resultados obtidos e sugerimos melhorias contínuas para o seu crescimento constante."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-16 md:py-32 bg-white text-black relative overflow-hidden rounded-[3rem] md:rounded-[6rem] mx-4 my-6 shadow-xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center md:text-left max-w-3xl">
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-none uppercase">
            NOSSA <br />
            <span className="text-primary italic font-medium">METODOLOGIA.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto items-stretch">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-8 rounded-[2.5rem] bg-secondary/30 border border-muted/5 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between h-full overflow-hidden">
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center text-primary mb-8 border border-muted shadow-md transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                  {step.icon}
                </div>
                <h3 className="font-headline text-xl md:text-2xl font-black text-black mb-4 tracking-tighter uppercase leading-[0.9] break-words">
                  {step.title}
                </h3>
                <p className="text-black/50 text-sm md:text-base leading-relaxed font-medium tracking-tight mb-8">
                  {step.desc}
                </p>
              </div>
              
              <div className="relative z-10">
                <div className="h-1 w-12 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-700 rounded-full" />
              </div>
              
              <span className="text-[6rem] md:text-[8rem] font-black text-black/[0.03] absolute -bottom-6 -right-3 select-none group-hover:text-primary/[0.05] transition-all duration-700 leading-none pointer-events-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
