
"use client";

import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Entendimento",
    desc: "Conversamos para entender seus objetivos, desafios e o público que você deseja alcançar."
  },
  {
    icon: <Target className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Planejamento",
    desc: "Criamos um roteiro estratégico focado nas soluções que farão mais sentido para o seu negócio."
  },
  {
    icon: <PenTool className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Execução",
    desc: "Desenvolvemos o projeto com atenção aos detalhes, garantindo qualidade técnica e visual."
  },
  {
    icon: <Rocket className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Acompanhamento",
    desc: "Analisamos os resultados obtidos e sugerimos melhorias contínuas para o seu crescimento constante."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-16 md:py-24 lg:py-32 bg-white text-black relative overflow-hidden rounded-[3rem] md:rounded-[6rem] mx-4 my-6 shadow-xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 lg:mb-24 text-center md:text-left max-w-3xl">
          <h2 className="font-headline text-2xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-none uppercase">
            NOSSA <br />
            <span className="text-primary italic font-medium">METODOLOGIA.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1440px] mx-auto items-stretch">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-6 md:p-10 rounded-[2.5rem] bg-secondary/30 border border-muted/5 transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col justify-between h-full overflow-hidden">
              <div className="relative z-10">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-white flex items-center justify-center text-primary mb-6 md:mb-8 border border-muted shadow-md transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                  {step.icon}
                </div>
                <h3 className="font-headline text-lg lg:text-2xl font-black text-black mb-3 md:mb-4 tracking-tighter uppercase leading-[0.9] break-words">
                  {step.title}
                </h3>
                <p className="text-black/60 text-xs md:text-base leading-relaxed font-medium tracking-tight mb-6 md:mb-8">
                  {step.desc}
                </p>
              </div>
              
              <div className="relative z-10 mt-auto">
                <div className="h-1 w-12 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-700 rounded-full" />
              </div>
              
              <span className="text-[4rem] md:text-[8rem] font-black text-black/[0.03] absolute -bottom-3 -right-2 md:-bottom-6 md:-right-3 select-none group-hover:text-primary/[0.05] transition-all duration-700 leading-none pointer-events-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
