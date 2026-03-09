"use client";

import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, Dna } from "lucide-react";

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
    desc: "Implementamos melhorias com rigor técnico."
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Escala",
    desc: "Ajuste constante para garantir o crescimento."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-48 md:py-64 hero-purple-mesh relative overflow-hidden section-flow-top section-flow-bottom">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-48 gap-24">
          <div className="max-w-6xl">
            <div className="flex items-center gap-8 mb-16">
               <Dna className="text-primary h-10 w-10 animate-pulse" />
               <Badge className="bg-white/5 text-white/40 border-white/10 px-12 py-5 text-[10px] font-black uppercase tracking-[0.8em] rounded-full backdrop-blur-[40px] font-display">
                 Protocolo V.2
               </Badge>
            </div>
            <h2 className="font-display text-6xl md:text-[9.5rem] font-black tracking-tighter leading-[0.85] text-white">
              Engenharia <br />
              <span className="text-primary italic font-medium">de Resultados.</span>
            </h2>
          </div>
          <div className="lg:pt-40 max-w-md">
            <p className="text-white/30 text-2xl md:text-4xl font-medium leading-tight tracking-tighter italic border-l-[6px] border-primary pl-16 font-body">
              Um fluxo rigoroso para marcas que não aceitam a média do mercado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-16 rounded-[4.5rem] bg-white/5 border border-white/10 transition-all duration-1000 hover:bg-white/10 hover:-translate-y-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <div className="h-24 w-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-16 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                {step.icon}
              </div>
              <h3 className="font-display text-4xl font-black text-white mb-8 tracking-tighter">
                {step.title}
              </h3>
              <p className="text-white/50 text-xl leading-relaxed font-medium mb-12 font-body">
                {step.desc}
              </p>
              <span className="text-[14rem] font-black text-white/5 absolute -bottom-12 -right-6 select-none group-hover:text-primary/10 transition-colors duration-1000 font-display">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}