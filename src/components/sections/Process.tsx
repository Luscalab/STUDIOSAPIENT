
"use client";

import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, ArrowRight, Dna } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: <Search className="h-10 w-10" />,
    title: "Diagnóstico Crítico",
    description: "Auditamos sua presença digital para identificar falhas invisíveis na comunicação e gargalos de performance reais.",
    color: "from-primary/30 to-transparent"
  },
  {
    icon: <Target className="h-10 w-10" />,
    title: "Estratégia de Nicho",
    description: "Desenhamos um ecossistema visual exclusivo focado em clareza técnica e conversão de autoridade absoluta.",
    color: "from-accent/30 to-transparent"
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Execução de Precisão",
    description: "Implementamos melhorias em design e engenharia de anúncios com rigor técnico e agilidade estratégica.",
    color: "from-indigo-500/30 to-transparent"
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Escala Sustentável",
    description: "Análise constante de métricas para ajustar a rota e garantir o crescimento previsível e sólido do seu negócio.",
    color: "from-purple-500/30 to-transparent"
  }
];

export function Process() {
  return (
    <section id="metodologia" className="py-32 md:py-64 hero-purple-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-40 gap-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-12">
               <Dna className="text-primary h-6 w-6 animate-pulse" />
               <Badge className="bg-white/5 text-white/50 border-white/10 px-10 py-4 text-[10px] font-black uppercase tracking-[0.6em] rounded-none backdrop-blur-xl">
                 Protocolo Sapient Studio V.2
               </Badge>
            </div>
            <h2 className="font-display text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white">
              Engenharia <br />
              <span className="text-white/20 italic font-medium">de Resultados.</span>
            </h2>
          </div>
          <div className="lg:pt-40 max-w-md">
            <p className="text-white/40 text-2xl md:text-4xl font-medium leading-tight tracking-tight italic border-l-4 border-primary pl-10">
              Um fluxo rigoroso para marcas que não aceitam a média do mercado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative">
              <div className="relative z-10 p-16 rounded-[4.5rem] bg-white/5 backdrop-blur-3xl border border-white/5 transition-all duration-1000 hover:bg-white/10 hover:border-white/20 hover:-translate-y-8 h-full flex flex-col shadow-2xl overflow-hidden">
                
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
                  step.color
                )} />

                <div className="flex items-center justify-between mb-24 relative z-10">
                  <div className="h-24 w-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-1000 border border-white/10 shadow-2xl">
                    {step.icon}
                  </div>
                  <span className="text-8xl font-black text-white/5 select-none tracking-tighter group-hover:text-white/10 transition-all duration-1000">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-10 relative z-10 flex-1">
                  <h3 className="font-display text-4xl font-black tracking-tighter text-white group-hover:text-primary transition-colors duration-700 leading-none">
                    {step.title}
                  </h3>
                  <div className="h-1.5 w-16 bg-white/10 group-hover:w-full group-hover:bg-primary transition-all duration-[1500ms] rounded-full" />
                  <p className="text-white/30 leading-relaxed font-medium text-xl md:text-2xl tracking-tight group-hover:text-white/50 transition-colors duration-700">
                    {step.description}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 translate-y-[-50%] z-20 text-white/10 group-hover:text-primary/30 group-hover:translate-x-8 transition-all duration-1000">
                    <ArrowRight className="h-10 w-10" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-white/10 text-[12px] font-black uppercase tracking-[0.8em]">
            Precisão • Clareza • Resultados
          </p>
          <div className="flex items-center gap-6">
             <div className="h-1.5 w-48 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-primary animate-pulse" />
             </div>
             <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>
    </section>
  );
}
