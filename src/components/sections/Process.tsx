"use client";

import { Search, Target, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-20 w-20" />,
    title: "Diagnóstico",
    desc: "Auditamos sua marca para identificar falhas invisíveis e oportunidades de autoridade real."
  },
  {
    icon: <Target className="h-20 w-20" />,
    title: "Estratégia",
    desc: "Desenhamos um ecossistema visual exclusivo e um plano de performance sob medida."
  },
  {
    icon: <PenTool className="h-20 w-20" />,
    title: "Execução",
    desc: "Implementamos melhorias com absoluto rigor técnico e estética de prestígio internacional."
  },
  {
    icon: <Rocket className="h-20 w-20" />,
    title: "Escala",
    desc: "Otimização constante de tráfego e conteúdo para garantir crescimento previsível."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-48 md:py-80 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-6 my-12 shadow-2xl">
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-64 max-w-[1400px] mx-auto">
          <h2 className="font-headline text-6xl md:text-[9.5rem] font-black tracking-tighter leading-[0.8] text-black uppercase mb-16">
            ENGENHARIA DE <span className="text-primary italic font-medium">RESULTADOS.</span>
          </h2>
          <p className="text-black/30 text-2xl md:text-5xl font-medium leading-tight tracking-tight max-w-5xl mx-auto italic">
            Um fluxo rigoroso para marcas que não aceitam a média do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-[1600px] mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-20 rounded-[5rem] bg-secondary/50 border border-muted/5 transition-all duration-1000 hover:-translate-y-12 shadow-2xl overflow-hidden min-h-[650px] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="h-36 w-36 rounded-[3.5rem] bg-white flex items-center justify-center text-primary mb-20 border border-muted shadow-2xl group-hover:bg-primary group-hover:text-white transition-all duration-1000 group-hover:rotate-6">
                  {step.icon}
                </div>
                <h3 className="font-headline text-4xl md:text-6xl font-black text-black mb-12 tracking-tighter uppercase leading-none">
                  {step.title}
                </h3>
                <p className="text-black/50 text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
                  {step.desc}
                </p>
              </div>
              
              <div className="h-2 w-24 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-1000 rounded-full relative z-10" />
              
              <span className="text-[25rem] font-black text-black/[0.03] absolute -bottom-32 -right-16 select-none group-hover:text-primary/[0.08] transition-all duration-1000 leading-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}