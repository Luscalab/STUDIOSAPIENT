import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Publicidade/marketing",
    description: "Estratégias 360º de alta performance para converter leads em clientes leais.",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    features: ["Google Ads", "Social Ads", "E-mail Marketing", "SEO Premium"]
  },
  {
    title: "Design Estratégico",
    description: "Criação de identidades visuais potentes que comunicam luxo e valor real.",
    icon: <Palette className="h-10 w-10 text-primary" />,
    features: ["Branding de Luxo", "UI/UX Design", "Identidade Visual", "Naming"]
  },
  {
    title: "Gestão de Redes",
    description: "Presença social impecável com conteúdo premium e engajamento orgânico.",
    icon: <Share2 className="h-10 w-10 text-primary" />,
    features: ["Cronograma Estratégico", "Copywriting", "Audiovisual", "Relatórios de ROI"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-32 bg-secondary/50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 px-6 py-1.5 text-xs font-bold uppercase tracking-widest">Expertise</Badge>
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 text-foreground tracking-tight">Soluções Completas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-medium">
            Unimos estética impecável e dados precisos para gerar resultados extraordinários.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, idx) => (
            <Card key={idx} className="bg-white border-transparent hover:border-primary/20 transition-all duration-500 group overflow-hidden premium-shadow rounded-[3rem] hover-lift">
              <CardHeader className="p-10 pb-6">
                <div className="mb-8 p-5 rounded-[1.5rem] bg-secondary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-3xl mb-4 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-lg leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="px-10 pb-12">
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-base flex items-center font-medium">
                      <div className="mr-3 h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group/btn">
                  Saiba Mais <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}