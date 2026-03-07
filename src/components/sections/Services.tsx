import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Performance & Ads",
    description: "Estratégias de escala massiva focadas em ROI e crescimento exponencial.",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    features: ["Meta & Google Ads de Elite", "Growth Hacking Strategy", "Funis de Alta Conversão", "Análise de Dados Avançada"]
  },
  {
    title: "Design de Luxo",
    description: "Criação de ecossistemas visuais que comunicam valor inquestionável instantaneamente.",
    icon: <Palette className="h-10 w-10 text-primary" />,
    features: ["Branding Premium", "UI/UX Experience", "Direção Criativa", "Design System Exclusivo"]
  },
  {
    title: "Gestão de Autoridade",
    description: "Transformamos redes sociais em canais de desejo e conversão de alto ticket.",
    icon: <Share2 className="h-10 w-10 text-primary" />,
    features: ["Curadoria Estratégica", "Copywriting Hipnótico", "Social Growth", "Gestão de Comunidade"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="section-spacing bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-3xl">
            <Badge className="mb-8 bg-primary/10 text-primary px-8 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Expertise</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9]">Soluções para<br />Domínio de Mercado</h2>
          </div>
          <p className="text-muted-foreground/60 max-w-sm text-xl font-medium leading-relaxed tracking-tight lg:pb-4">
            Unimos a precisão dos dados à sensibilidade do design para criar resultados que se destacam em oceanos vermelhos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
          {services.map((service, idx) => (
            <Card key={idx} className="bg-secondary/40 border-none group overflow-hidden premium-shadow rounded-[3.5rem] hover-lift transition-all duration-700 p-4">
              <CardHeader className="p-10 md:p-12 pb-6">
                <div className="mb-10 p-8 rounded-[2rem] bg-white w-fit group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-3xl md:text-4xl mb-6 group-hover:text-primary transition-colors tracking-tighter font-black leading-none">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground/70 text-lg md:text-xl leading-relaxed font-medium tracking-tight mb-8">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-10 md:px-12 pb-12">
                <ul className="space-y-6 mb-12">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-base md:text-lg flex items-center font-bold text-muted-foreground/50 group-hover:text-foreground transition-all duration-500">
                      <div className="mr-6 h-1.5 w-1.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-3 text-primary font-black text-[11px] uppercase tracking-[0.4em] group/btn hover:tracking-[0.6em] transition-all duration-700">
                  Saber Mais <ArrowUpRight className="h-5 w-5 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}