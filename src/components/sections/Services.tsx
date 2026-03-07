import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Publicidade & Ads",
    description: "Estratégias de alta performance para escala massiva e retorno sobre investimento.",
    icon: <Megaphone className="h-12 w-12 text-primary" />,
    features: ["Meta & Google Ads Elite", "Marketing de Influência", "E-mail de Performance", "Growth Strategy"]
  },
  {
    title: "Design Estratégico",
    description: "Criação de ecossistemas visuais que comunicam valor inquestionável e luxo.",
    icon: <Palette className="h-12 w-12 text-primary" />,
    features: ["Branding Premium", "UI/UX de Conversão", "Posicionamento Visual", "Visual Assets"]
  },
  {
    title: "Gestão de Autoridade",
    description: "Construção de comunidades através de narrativa premium e estética impecável.",
    icon: <Share2 className="h-12 w-12 text-primary" />,
    features: ["Curadoria de Conteúdo", "Copywriting de Elite", "Social Management", "Gestão de Crise"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="section-spacing bg-secondary/40 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-40 text-center">
          <Badge className="mb-10 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Metodologia Sapient</Badge>
          <h2 className="font-headline text-6xl md:text-9xl font-bold mb-12 text-foreground tracking-tighter leading-none">Nosso Expertise</h2>
          <p className="text-muted-foreground/70 max-w-3xl mx-auto text-2xl md:text-3xl font-medium leading-relaxed tracking-tight">
            Unimos a precisão dos dados à sensibilidade do design para criar resultados que dominam mercados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {services.map((service, idx) => (
            <Card key={idx} className="bg-white border-transparent hover:border-primary/20 transition-all duration-1000 group overflow-hidden premium-shadow rounded-[4rem] hover-lift">
              <CardHeader className="p-16 pb-10">
                <div className="mb-12 p-8 rounded-[2rem] bg-secondary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-12">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-4xl mb-8 group-hover:text-primary transition-colors tracking-tighter font-extrabold leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground/80 text-xl leading-relaxed font-medium tracking-tight">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-16 pb-20">
                <ul className="space-y-6 mb-16">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-xl flex items-center font-bold text-muted-foreground/60 group-hover:text-foreground transition-all duration-500">
                      <div className="mr-6 h-3 w-3 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-125 transition-all duration-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-4 text-primary font-black text-sm uppercase tracking-[0.3em] group/btn">
                  Descobrir Mais <ArrowUpRight className="h-6 w-6 group-hover/btn:translate-x-3 group-hover/btn:-translate-y-3 transition-transform duration-700" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}