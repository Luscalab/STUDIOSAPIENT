
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, Mic2 } from "lucide-react";

const services = [
  {
    title: "Publicidade/marketing",
    description: "Estratégias 360º para elevar sua presença digital e converter leads em clientes leais.",
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    features: ["Google Ads", "Social Ads", "E-mail Marketing", "SEO"]
  },
  {
    title: "Design Estratégico",
    description: "Criação de identidades visuais potentes que comunicam os valores centrais da sua marca.",
    icon: <Palette className="h-8 w-8 text-primary" />,
    features: ["Branding", "UI/UX Design", "Logotipos", "Design Editorial"]
  },
  {
    title: "Gestão de Redes",
    description: "Presença social profissional com conteúdo de alta qualidade e engajamento real.",
    icon: <Share2 className="h-8 w-8 text-primary" />,
    features: ["Cronograma de Postagens", "Copywriting", "Atendimento", "Relatórios"]
  },
  {
    title: "Áudio",
    description: "Produção sonora premium para jingles, podcasts e sound design de impacto.",
    icon: <Mic2 className="h-8 w-8 text-primary" />,
    features: ["Podcasts", "Voice-overs", "Jingles", "Trilhas Exclusivas"]
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">Soluções Completas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Combinamos criatividade e dados para oferecer serviços que realmente movem o ponteiro do seu negócio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <Card key={idx} className="bg-card/50 border-primary/10 hover:border-primary/30 transition-all group overflow-hidden">
              <CardHeader>
                <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-sm flex items-center">
                      <div className="mr-2 h-1 w-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
