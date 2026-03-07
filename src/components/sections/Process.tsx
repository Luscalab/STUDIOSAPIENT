import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-7 w-7" />,
    title: "Análise",
    description: "Entendemos seu contexto e objetivos para traçar o melhor caminho."
  },
  {
    icon: <Target className="h-7 w-7" />,
    title: "Estratégia",
    description: "Desenhamos um conceito visual e narrativo de alto impacto."
  },
  {
    icon: <PenTool className="h-7 w-7" />,
    title: "Criação",
    description: "Transformamos conceitos em design e ativos prontos para o mercado."
  },
  {
    icon: <Rocket className="h-7 w-7" />,
    title: "Entrega",
    description: "Lançamos seu projeto e acompanhamos o impacto inicial."
  }
];

export function Process() {
  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-10">
          <div className="max-w-xl text-center lg:text-left">
            <Badge className="mb-6 bg-primary/5 text-primary px-8 py-2 text-[9px] font-bold uppercase tracking-[0.4em] rounded-full">Metodologia</Badge>
            <h2 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter leading-none text-foreground">Como fazemos acontecer</h2>
          </div>
          <p className="text-muted-foreground/60 text-lg md:text-xl font-medium max-w-sm leading-relaxed text-center lg:text-left">
            Um processo direto e transparente focado em resultados que elevam sua marca.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group p-10 rounded-[2.5rem] bg-secondary/30 border border-primary/5 transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-primary/5">
              {/* Connector (Desktop Only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-20 translate-y-[-50%] text-primary/20">
                  <ChevronRight size={24} />
                </div>
              )}
              
              <div className="absolute top-8 right-8 text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                0{idx + 1}
              </div>

              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 border border-primary/5">
                  {step.icon}
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground/70 leading-relaxed font-medium text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}