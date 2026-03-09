"use client";

import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, Dna } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-12 w-12" />,
    title: "Diagnóstico",
    desc: "Auditamos sua marca para identificar falhas invisíveis."
  },
  {
    icon: <Target className="h-12 w-12" />,
    title: "Estratégia",
    desc: "Desenhamos um ecossistema visual exclusivo."
  },
  {
    icon: <PenTool className="h-12 w-12" />,
    title: "Execução",
    desc: "Implementamos melhorias com rigor técnico."
  },
  {
    icon: <Rocket className="h-12 w-12" />,
    title: "Escala",
    desc: "Ajuste constante para garantir o crescimento."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-48 md:py-64 hero-purple-mesh relative overflow-hidden section-flow-top section-flow-bottom">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-48 gap-24">
          <div className="max-w-7xl">
            <div className="flex items-center gap-10 mb-20">
               <Dna className="text-primary h-12 w-12 animate-pulse" />
               <Badge className="bg-white/5 text-white/50 border-white/10 px-14 py-5 text-[11px] font-black uppercase tracking-[0.8em] rounded-full backdrop-blur-[40px] font-display">
                 Protocolo V.2.5
               </Badge>
            </div>
            <h2 className="font-display text-6xl md:text-[10.5rem] font-black tracking-tighter leading-[0.85] text-white uppercase">
              Engenharia <br />
              <span className="text-primary italic font-medium">de Resultados.</span>
            </h2>
          </div>
          <div className="lg:pt-48 max-w-lg">
            <p className="text-white/40 text-2xl md:text-5xl font-medium leading-[0.9] tracking-tighter italic border-l-[10px] border-primary pl-16 font-body">
              Um fluxo rigoroso para marcas que não aceitam a média do mercado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-16 rounded-[4.5rem] bg-white/5 border border-white/10 transition-all duration-1000 hover:bg-white/10 hover:-translate-y-10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
              <div className="h-28 w-28 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mb-20 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                {step.icon}
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase">
                {step.title}
              </h3>
              <p className="text-white/50 text-xl md:text-2xl leading-snug font-medium mb-16 font-body tracking-tight">
                {step.desc}
              </p>
              <span className="text-[16rem] font-black text-white/5 absolute -bottom-16 -right-8 select-none group-hover:text-primary/10 transition-colors duration-1000 font-display">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}