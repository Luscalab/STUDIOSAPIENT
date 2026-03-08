
import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Análise",
    description: "Auditamos sua marca, Google Meu Negócio e presença social para mapear gargalos."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Estratégia",
    description: "Desenhamos um conceito visual e narrativo focado em escala e autoridade luxuosa."
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Execução",
    description: "Intervenção profissional em design, ads e conteúdo de alto impacto."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Domínio",
    description: "Lançamos seu novo posicionamento e acompanhamos a escalada de autoridade."
  }
];

export function Process() {
  return (
    <section className="section-spacing bg-[#f4f2ff]/50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-32 gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Metodologia</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none text-foreground">Como fazemos acontecer</h2>
          </div>
          <p className="text-muted-foreground/70 text-xl md:text-2xl font-medium max-w-sm leading-relaxed text-center lg:text-left tracking-tight">
            Um processo direto e transparente focado em resultados que elevam sua marca.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group p-12 rounded-[3.5rem] card-premium-bg border border-primary/5 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
              {/* Connector (Desktop Only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-20 translate-y-[-50%] text-primary/10">
                  <ChevronRight size={32} />
                </div>
              )}
              
              <div className="absolute top-10 right-10 text-6xl font-black text-primary/5 group-hover:text-primary/15 transition-colors select-none">
                0{idx + 1}
              </div>

              <div className="relative">
                <div className="h-20 w-20 rounded-3xl bg-primary/5 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 mb-10 border border-primary/10">
                  {step.icon}
                </div>
                <h3 className="font-headline text-3xl font-black mb-6 tracking-tighter">{step.title}</h3>
                <p className="text-muted-foreground/70 leading-relaxed font-medium text-lg md:text-xl tracking-tight">
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
