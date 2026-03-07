import { Badge } from "@/components/ui/badge";
import { Target, Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Entendimento",
    description: "Estudamos o seu mercado e os seus desafios atuais para traçar o melhor caminho."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Estratégia",
    description: "Desenhamos um plano de ação focado em alcançar seus objetivos comerciais."
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Desenvolvimento",
    description: "Transformamos a estratégia em ativos visuais e comunicação eficiente."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Execução & Ajuste",
    description: "Colocamos as campanhas no ar e otimizamos constantemente com base em dados."
  }
];

export function Process() {
  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-secondary/30 pointer-events-none select-none tracking-tighter uppercase opacity-30">
        Fluxo
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-32 gap-16">
          <div className="max-w-2xl">
            <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Como Trabalhamos</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-none text-foreground">Nosso processo<br />de entrega</h2>
          </div>
          <p className="text-muted-foreground/60 text-xl md:text-2xl font-medium max-w-md leading-relaxed">
            Um método estruturado para garantir que cada projeto entregue valor real ao seu negócio.
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
