import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Imersão & Diagnóstico",
    description: "Analisamos profundamente seu nicho, concorrentes e o DNA da sua marca para identificar oportunidades invisíveis."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Estratégia de Elite",
    description: "Desenhamos um mapa de guerra personalizado, focando em posicionamento de luxo e escala de alta performance."
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Execução Criativa",
    description: "Nossos designers e copywriters transformam a estratégia em ativos visuais e narrativas que dominam a atenção."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Escala & Otimização",
    description: "Lançamos campanhas e acompanhamos dados em tempo real para garantir o máximo ROI e autoridade de marca."
  }
];

export function Process() {
  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-secondary/30 pointer-events-none select-none tracking-tighter uppercase opacity-50">
        Método
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-32 gap-16">
          <div className="max-w-2xl">
            <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">O Segredo do Sucesso</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-none text-foreground">A Ciência por trás<br />do Legado</h2>
          </div>
          <p className="text-muted-foreground/60 text-xl md:text-2xl font-medium max-w-md leading-relaxed">
            Não acreditamos em sorte. Acreditamos em processos rigorosos que transformam marcas em potências de mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -top-6 -left-6 text-9xl font-black text-secondary/50 group-hover:text-primary/10 transition-colors duration-700">
                0{idx + 1}
              </div>
              <div className="relative pt-20">
                <div className="h-20 w-20 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 mb-8 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="font-headline text-2xl font-bold mb-6 tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground/70 leading-relaxed font-medium">
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
