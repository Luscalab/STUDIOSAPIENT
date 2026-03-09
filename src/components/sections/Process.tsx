"use client";

import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, ArrowRight, Dna } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Diagnóstico",
    desc: "Auditamos sua marca para identificar falhas invisíveis."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Estratégia",
    desc: "Desenhamos um ecossistema visual exclusivo."
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Execução",
    desc: "Implementamos melhorias com rigor técnico."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Escala",
    desc: "Ajuste constante para garantir o crescimento."
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-32 md:py-48 hero-purple-mesh relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-32 gap-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10">
               <Dna className="text-primary h-6 w-6 animate-pulse" />
               <Badge className="bg-white/5 text-white/50 border-white/10 px-8 py-3 text-[9px] font-black uppercase tracking-[0.5em] rounded-full">
                 Protocolo Sapient Studio V.2
               </Badge>
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
              Engenharia <br />
              <span className="text-primary italic font-medium">de Resultados.</span>
            </h2>
          </div>
          <div className="lg:pt-24 max-w-sm">
            <p className="text-white/40 text-xl md:text-2xl font-medium leading-tight tracking-tight italic border-l-2 border-primary pl-10">
              Um fluxo rigoroso para marcas que não aceitam a média do mercado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-12 rounded-[3rem] bg-white/5 border border-white/5 transition-all duration-700 hover:bg-white/10 hover:-translate-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-12 shadow-2xl">
                {step.icon}
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-4 tracking-tighter">
                {step.title}
              </h3>
              <p className="text-white/30 text-base leading-snug font-medium mb-6">
                {step.desc}
              </p>
              <span className="text-5xl font-black text-white/5 absolute bottom-8 right-8">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}