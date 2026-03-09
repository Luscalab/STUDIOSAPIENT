"use client";

import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Diagnóstico Crítico",
    description: "Auditamos sua presença digital para identificar falhas invisíveis na comunicação e gargalos de performance.",
    color: "from-primary/25 to-transparent"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Estratégia de Nicho",
    description: "Desenhamos um ecossistema visual exclusivo focado em clareza técnica e conversão de autoridade.",
    color: "from-accent/25 to-transparent"
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Execução de Precisão",
    description: "Implementamos melhorias em design e engenharia de anúncios com rigor técnico e agilidade.",
    color: "from-indigo-500/25 to-transparent"
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Escala Sustentável",
    description: "Análise constante de métricas para ajustar a rota e garantir o crescimento previsível do seu negócio.",
    color: "from-purple-500/25 to-transparent"
  }
];

export function Process() {
  return (
    <section id="metodologia" className="section-spacing hero-purple-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-black/65 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-28 lg:mb-40 gap-20">
          <div className="max-w-4xl">
            <Badge className="mb-10 bg-white/10 text-white border-white/20 px-10 py-3 text-[10px] font-black uppercase tracking-[0.6em] rounded-full backdrop-blur-xl">
              Protocolo Sapient Studio
            </Badge>
            <h2 className="font-headline text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] text-white">
              Engenharia <br />
              <span className="text-white/30">de Resultados.</span>
            </h2>
          </div>
          <div className="lg:pt-28">
            <p className="text-white/50 text-2xl md:text-3xl font-medium max-w-sm leading-relaxed tracking-tight italic">
              Um fluxo rigoroso para marcas que não aceitam o comum.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative">
              <div className="relative z-10 p-12 rounded-[4rem] bg-white/5 backdrop-blur-3xl border border-white/10 transition-all duration-1000 hover:bg-white/15 hover:border-white/25 h-full flex flex-col shadow-3xl overflow-hidden">
                
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
                  step.color
                )} />

                <div className="flex items-center justify-between mb-16 relative z-10">
                  <div className="h-20 w-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-700 border border-white/10 shadow-lg">
                    {step.icon}
                  </div>
                  <span className="text-6xl font-black text-white/10 select-none tracking-tighter group-hover:text-white/20 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-8 relative z-10 flex-1">
                  <h3 className="font-headline text-3xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <div className="h-1.5 w-16 bg-white/20 group-hover:w-full group-hover:bg-primary/50 transition-all duration-1000 rounded-full" />
                  <p className="text-white/40 leading-relaxed font-medium text-lg md:text-xl tracking-tight group-hover:text-white/60 transition-colors">
                    {step.description}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 translate-y-[-50%] z-20 text-white/20 group-hover:text-primary/40 group-hover:translate-x-3 transition-all">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-white/10 text-[11px] font-black uppercase tracking-[0.6em]">
            Precisão • Clareza • Resultados
          </p>
          <div className="h-2 w-48 bg-gradient-to-r from-primary/60 to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}