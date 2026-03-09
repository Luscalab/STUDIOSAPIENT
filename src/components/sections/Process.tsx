
"use client";

import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10" />,
    title: "Entendimento",
    desc: "Conversamos para entender seus objetivos, desafios e o público que você deseja alcançar."
  },
  {
    icon: <Target className="h-10 w-10" />,
    title: "Planejamento",
    desc: "Criamos um roteiro estratégico focado nas soluções que farão mais sentido para o seu negócio."
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Execução",
    desc: "Desenvolvemos o projeto com atenção aos detalhes, garantindo qualidade técnica e visual."
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Acompanhamento",
    desc: "Analisamos os resultados obtidos e sugerimos melhorias contínuas para o seu crescimento."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-24 md:py-48 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center md:text-left max-w-4xl">
          <h2 className="font-headline text-4xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none uppercase">
            NOSSA <br />
            <span className="text-primary italic font-medium">METODOLOGIA.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-12 rounded-[3.5rem] bg-secondary/30 border border-muted/5 transition-all duration-700 hover:bg-white hover:shadow-2xl min-h-[500px] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="h-20 w-20 rounded-[1.5rem] bg-white flex items-center justify-center text-primary mb-12 border border-muted shadow-lg transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                  {step.icon}
                </div>
                <h3 className="font-headline text-3xl font-black text-black mb-6 tracking-tighter uppercase leading-none">
                  {step.title}
                </h3>
                <p className="text-black/50 text-lg leading-relaxed font-medium tracking-tight">
                  {step.desc}
                </p>
              </div>
              
              <div className="h-1 w-16 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-700 rounded-full relative z-10" />
              
              <span className="text-[12rem] font-black text-black/[0.03] absolute -bottom-12 -right-6 select-none group-hover:text-primary/[0.05] transition-all duration-700 leading-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
