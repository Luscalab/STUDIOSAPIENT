import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Publicidade/marketing",
    description: "Estratégias 360º de alta performance focadas em escala e retorno sobre investimento.",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    features: ["Google & Meta Ads", "Marketing de Influência", "E-mail de Performance", "SEO Editorial"]
  },
  {
    title: "Design Estratégico",
    description: "Criação de ecossistemas visuais que comunicam autoridade e valor inquestionável.",
    icon: <Palette className="h-10 w-10 text-primary" />,
    features: ["Branding de Luxo", "UI/UX de Alta Conversão", "Posicionamento Visual", "Visual Identity"]
  },
  {
    title: "Gestão de Redes",
    description: "Construção de comunidades leais através de narrativa premium e estética impecável.",
    icon: <Share2 className="h-10 w-10 text-primary" />,
    features: ["Curadoria de Conteúdo", "Copywriting Persuasivo", "Social Intelligence", "Gestão de Crise"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-40 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-32 text-center">
          <Badge className="mb-8 bg-primary/10 text-primary px-8 py-2 text-xs font-black uppercase tracking-[0.4em] rounded-full">Manifesto</Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-bold mb-10 text-foreground tracking-tighter">Nosso Expertise</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-2xl font-medium leading-relaxed">
            Unimos a precisão dos dados à sensibilidade do design para criar resultados que não apenas convertem, mas encantam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {services.map((service, idx) => (
            <Card key={idx} className="bg-white border-transparent hover:border-primary/20 transition-all duration-700 group overflow-hidden premium-shadow rounded-[3.5rem] hover-lift">
              <CardHeader className="p-12 pb-8">
                <div className="mb-10 p-6 rounded-3xl bg-secondary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-6">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-4xl mb-6 group-hover:text-primary transition-colors tracking-tight font-extrabold">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-xl leading-relaxed font-medium">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-12 pb-16">
                <ul className="space-y-5 mb-12">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-lg flex items-center font-bold text-muted-foreground/80 group-hover:text-foreground transition-colors duration-500">
                      <div className="mr-4 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] group/btn">
                  Explorar Detalhes <ArrowUpRight className="h-5 w-5 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}