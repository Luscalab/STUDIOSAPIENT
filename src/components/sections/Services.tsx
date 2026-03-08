
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, CheckCircle2, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Performance & Ads",
    description: "Estratégias de escala focadas em retorno sobre investimento via Google Meu Negócio e Tráfego Pago.",
    icon: <Megaphone className="h-10 w-10" />,
    features: ["Google Meu Negócio Profissional", "Meta & Google Ads", "Funis de Vendas", "Growth Estratégico"],
    badge: "Visibilidade"
  },
  {
    title: "Design Estratégico",
    description: "Identidade visual que comunica autoridade e profissionalismo instantaneamente para seu negócio.",
    icon: <Palette className="h-10 w-10" />,
    features: ["Identidade Visual Moderna", "Design System", "Direção Criativa", "Branding de Autoridade"],
    badge: "Posicionamento"
  },
  {
    title: "Gestão Social",
    description: "Transformamos perfis sociais em ferramentas de autoridade e conversão para sua marca.",
    icon: <Share2 className="h-10 w-10" />,
    features: ["Curadoria de Conteúdo", "Copywriting", "Gestão de Autoridade", "Planejamento Digital"],
    badge: "Autoridade"
  },
  {
    title: "Narrativa Visual",
    description: "Transformamos dados complexos em infográficos sofisticados que educam e convertem sua audiência.",
    icon: <BarChart3 className="h-10 w-10" />,
    features: ["Infográficos de Autoridade", "Data Visualization", "Assets Visuais Exclusivos", "Materiais de Alto Impacto"],
    badge: "Clareza"
  }
];

export function Services() {
  return (
    <section id="servicos" className="section-spacing relative overflow-hidden bg-[#fbfaff]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-primary/10 text-primary px-8 py-2 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">Soluções</Badge>
            <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tighter leading-tight">Autoridade para seu negócio</h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg md:text-xl font-medium leading-relaxed tracking-tight lg:pb-4 mx-auto lg:mx-0">
            Unimos dados e design para criar resultados reais que destacam sua marca no mercado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6">
          {services.map((service, idx) => (
            <Card key={idx} className="card-premium-bg border-none group overflow-hidden shadow-xl rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 relative flex flex-col h-full">
              <CardHeader className="p-10 pb-6 relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-6 rounded-2xl bg-white text-primary shadow-sm border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                  <Badge variant="outline" className="border-primary/10 text-primary font-bold text-[9px] uppercase tracking-wider px-4 py-1.5 bg-primary/5">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="font-headline text-2xl md:text-3xl mb-4 tracking-tighter font-bold">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-base leading-snug font-medium">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-10 pb-10 relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-bold text-muted-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-primary/40 group-hover:text-primary transition-colors" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500 text-[10px] font-bold uppercase tracking-widest">
                  Ver Mais <ArrowUpRight className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
