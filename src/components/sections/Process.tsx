
"use client";

import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: <Search className="h-7 w-7" />,
    title: "Diagnóstico Crítico",
    description: "Auditamos sua presença digital para identificar falhas invisíveis na comunicação e gargalos de performance técnica.",
    color: "from-primary/20 to-transparent"
  },
  {
    icon: <Target className="h-7 w-7" />,
    title: "Estratégia de Nicho",
    description: "Desenhamos um ecossistema visual e narrativo exclusivo, focado em clareza técnica e conversão de autoridade.",
    color: "from-accent/20 to-transparent"
  },
  {
    icon: <PenTool className="h-7 w-7" />,
    title: "Execução de Precisão",
    description: "Implementamos melhorias em design e engenharia de anúncios com foco em agilidade, estética e rigor técnico.",
    color: "from-indigo-500/20 to-transparent"
  },
  {
    icon: <Rocket className="h-7 w-7" />,
    title: "Monitoramento & Evolução",
    description: "Análise constante de métricas reais para ajustar a rota e garantir o crescimento previsível e sustentável do negócio.",
    color: "from-purple-500/20 to-transparent"
  }
];

export function Process() {
  return (
    <section id="metodologia" className="section-spacing hero-purple-mesh relative overflow-hidden">
      {/* Camada de sofisticação sobre o mesh */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-24 lg:mb-32 gap-16">
          <div className="max-w-3xl">
            <Badge className="mb-8 bg-white/5 text-white/80 border-white/10 px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md">
              Protocolo Sapient Studio
            </Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white text-balance">
              Metodologia <br />
              <span className="text-white/40">de Engenharia.</span>
            </h2>
          </div>
          <div className="lg:pt-20">
            <p className="text-white/60 text-xl md:text-2xl font-medium max-w-sm leading-relaxed tracking-tight text-balance">
              Um fluxo rigoroso, técnico e transparente para elevar o nível da sua marca.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col h-full"
            >
              {/* Card Structure */}
              <div className="relative z-10 p-10 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 transition-all duration-700 hover:bg-white/10 hover:border-white/20 h-full flex flex-col shadow-2xl overflow-hidden">
                
                {/* Background Glow */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                  step.color
                )} />

                {/* Step Number */}
                <div className="flex items-center justify-between mb-12 relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-500 border border-white/10">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-white/10 select-none tracking-tighter group-hover:text-white/20 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-6 relative z-10 flex-1">
                  <h3 className="font-headline text-2xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <div className="h-px w-10 bg-white/20 group-hover:w-full group-hover:bg-primary/40 transition-all duration-700" />
                  <p className="text-white/50 leading-relaxed font-medium text-base md:text-lg tracking-tight">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop Only Connection */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 translate-y-[-50%] z-20 text-white/20 group-hover:text-primary/40 group-hover:translate-x-2 transition-all">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer da Seção */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
            Precisão Técnica • Clareza Visual • Resultados Estratégicos
          </p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}
