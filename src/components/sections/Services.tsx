import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Publicidade & Ads",
    description: "Estratégias de performance para escala massiva e retorno sobre investimento.",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    features: ["Meta & Google Ads", "Marketing de Influência", "E-mail Marketing", "Growth Strategy"]
  },
  {
    title: "Design Estratégico",
    description: "Criação de ecossistemas visuais que comunicam valor inquestionável.",
    icon: <Palette className="h-10 w-10 text-primary" />,
    features: ["Branding Premium", "UI/UX de Conversão", "Posicionamento Visual", "Visual Assets"]
  },
  {
    title: "Gestão de Autoridade",
    description: "Construção de comunidades através de narrativa e estética impecável.",
    icon: <Share2 className="h-10 w-10 text-primary" />,
    features: ["Curadoria de Conteúdo", "Copywriting de Elite", "Social Management", "Gestão de Presença"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="section-spacing bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 md:mb-24 text-center">
          <Badge className="mb-6 bg-primary/5 text-primary px-8 py-2 text-[9px] font-bold uppercase tracking-[0.4em] rounded-full">Especialidades</Badge>
          <h2 className="font-headline text-4xl md:text-7xl font-bold mb-6 text-foreground tracking-tighter leading-tight">Nosso Expertise</h2>
          <p className="text-muted-foreground/70 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed tracking-tight">
            Unimos a precisão dos dados à sensibilidade do design para criar resultados que dominam mercados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, idx) => (
            <Card key={idx} className="bg-white border-transparent hover:border-primary/10 transition-all duration-700 group overflow-hidden premium-shadow rounded-[2.5rem] hover-lift">
              <CardHeader className="p-8 md:p-10 pb-6">
                <div className="mb-6 p-6 rounded-[1.5rem] bg-secondary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors tracking-tighter font-bold">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground/80 text-base md:text-lg leading-relaxed font-medium tracking-tight">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-8 md:p-10 pb-10">
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-base flex items-center font-bold text-muted-foreground/60 group-hover:text-foreground transition-all duration-300">
                      <div className="mr-4 h-2 w-2 rounded-full bg-primary/20 group-hover:bg-primary transition-all" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest group/btn">
                  Saber Mais <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}