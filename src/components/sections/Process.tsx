
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
    <section className="section-spacing hero-purple-mesh relative overflow-hidden">
      {/* Overlay para profundidade */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-32 gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md">Metodologia</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-2xl">Como fazemos<br />acontecer</h2>
          </div>
          <p className="text-white/80 text-xl md:text-2xl font-medium max-w-sm leading-relaxed text-center lg:text-left tracking-tight">
            Um processo direto e transparente focado em resultados que elevam sua marca ao topo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group p-10 rounded-[3rem] bg-white/10 backdrop-blur-2xl border border-white/10 transition-all duration-700 hover:bg-white/20 hover:-translate-y-2 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)]">
              {/* Connector (Desktop Only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-20 translate-y-[-50%] text-white/20">
                  <ChevronRight size={24} />
                </div>
              )}
              
              <div className="absolute top-8 right-8 text-5xl font-black text-white/5 group-hover:text-white/15 transition-colors select-none">
                0{idx + 1}
              </div>

              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-white/10 shadow-sm flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-700 mb-8 border border-white/10">
                  {step.icon}
                </div>
                <h3 className="font-headline text-2xl font-black mb-4 tracking-tighter text-white">{step.title}</h3>
                <p className="text-white/70 leading-relaxed font-medium text-base md:text-lg tracking-tight">
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
