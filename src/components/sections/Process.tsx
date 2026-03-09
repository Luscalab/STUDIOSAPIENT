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
    <section id="metodologia" className="py-32 md:py-64 hero-purple-mesh relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-40 gap-20">
          <div className="max-w-5xl">
            <div className="flex items-center gap-6 mb-12">
               <Dna className="text-primary h-8 w-8 animate-pulse" />
               <Badge className="bg-white/5 text-white/50 border-white/10 px-10 py-4 text-[10px] font-black uppercase tracking-[0.6em] rounded-full backdrop-blur-3xl">
                 Protocolo Sapient Studio V.2
               </Badge>
            </div>
            <h2 className="font-display text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-white">
              Engenharia <br />
              <span className="text-primary italic font-medium">de Resultados.</span>
            </h2>
          </div>
          <div className="lg:pt-32 max-w-sm">
            <p className="text-white/40 text-2xl md:text-3xl font-medium leading-tight tracking-tight italic border-l-4 border-primary pl-12">
              Um fluxo rigoroso para marcas que não aceitam a média do mercado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-16 rounded-[4rem] bg-white/5 border border-white/5 transition-all duration-1000 hover:bg-white/10 hover:-translate-y-6 shadow-2xl">
              <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-16 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                {step.icon}
              </div>
              <h3 className="font-display text-3xl font-black text-white mb-6 tracking-tighter">
                {step.title}
              </h3>
              <p className="text-white/30 text-lg leading-relaxed font-medium mb-10">
                {step.desc}
              </p>
              <span className="text-[12rem] font-black text-white/5 absolute -bottom-10 -right-4 select-none group-hover:text-primary/10 transition-colors duration-1000">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}