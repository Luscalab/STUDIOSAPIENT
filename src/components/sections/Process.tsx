"use client";

import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-16 w-16" />,
    title: "Diagnóstico",
    desc: "Auditamos sua marca para identificar falhas invisíveis e oportunidades de autoridade real."
  },
  {
    icon: <Target className="h-16 w-16" />,
    title: "Estratégia",
    desc: "Desenhamos um ecossistema visual exclusivo e um plano de performance sob medida."
  },
  {
    icon: <PenTool className="h-16 w-16" />,
    title: "Execução",
    desc: "Implementamos melhorias com absoluto rigor técnico e estética de prestígio internacional."
  },
  {
    icon: <Rocket className="h-16 w-16" />,
    title: "Escala",
    desc: "Otimização constante de tráfego e conteúdo para garantir crescimento previsível."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-32 md:py-64 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-48 max-w-[1200px] mx-auto space-y-16">
          <h2 className="font-headline text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-black uppercase">
            ENGENHARIA DE <span className="text-primary italic">RESULTADOS.</span>
          </h2>
          <p className="text-black/40 text-2xl md:text-5xl font-medium leading-tight tracking-tight max-w-4xl mx-auto italic">
            Um fluxo rigoroso para marcas que não aceitam a média do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1400px] mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-20 rounded-[4rem] bg-secondary/50 border border-muted/10 transition-all duration-1000 hover:-translate-y-10 shadow-2xl overflow-hidden min-h-[550px] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="h-32 w-32 rounded-[2.5rem] bg-white flex items-center justify-center text-primary mb-16 border border-muted shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-6">
                  {step.icon}
                </div>
                <h3 className="font-headline text-4xl md:text-5xl font-black text-black mb-10 tracking-tighter uppercase leading-none">
                  {step.title}
                </h3>
                <p className="text-black/60 text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
                  {step.desc}
                </p>
              </div>
              
              <div className="h-2 w-20 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-1000 rounded-full relative z-10" />
              
              <span className="text-[20rem] font-black text-black/5 absolute -bottom-24 -right-12 select-none group-hover:text-primary/10 transition-all duration-1000 leading-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
