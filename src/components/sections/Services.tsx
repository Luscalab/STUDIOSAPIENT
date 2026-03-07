import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Performance & Ads",
    description: "Estratégias de escala massiva focadas em ROI e crescimento exponencial.",
    icon: <Megaphone className="h-10 w-10" />,
    features: ["Meta & Google Ads de Elite", "Growth Hacking Strategy", "Funis de Alta Conversão", "Análise de Dados Avançada"],
    badge: "Escala"
  },
  {
    title: "Design de Luxo",
    description: "Criação de ecossistemas visuais que comunicam valor inquestionável instantaneamente.",
    icon: <Palette className="h-10 w-10" />,
    features: ["Branding Premium", "UI/UX Experience", "Direção Criativa", "Design System Exclusivo"],
    badge: "Identidade"
  },
  {
    title: "Gestão de Autoridade",
    description: "Transformamos redes sociais em canais de desejo e conversão de alto ticket.",
    icon: <Share2 className="h-10 w-10" />,
    features: ["Curadoria Estratégica", "Copywriting Hipnótico", "Social Growth", "Gestão de Comunidade"],
    badge: "Autoridade"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, idx) => (
            <Card key={idx} className="card-premium-bg border-none group overflow-hidden premium-shadow rounded-[3rem] hover-lift transition-all duration-700 relative">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <CardHeader className="p-10 md:p-14 pb-8 relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-6 rounded-2xl bg-white text-primary shadow-sm border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                    {service.icon}
                  </div>
                  <Badge variant="outline" className="border-primary/20 text-primary font-black text-[9px] uppercase tracking-widest px-4 py-1">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="font-headline text-3xl md:text-4xl mb-6 tracking-tighter font-black leading-none">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground/60 text-lg md:text-xl leading-snug font-medium tracking-tight">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-10 md:px-14 pb-14 relative z-10">
                <div className="space-y-5 mb-12">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-sm font-bold text-muted-foreground/40 group-hover:text-foreground/80 transition-colors duration-500">
                      <CheckCircle2 className="h-4 w-4 text-primary/30 group-hover:text-primary transition-colors" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-between p-6 rounded-2xl bg-secondary/50 group-hover:bg-primary group-hover:text-white transition-all duration-700 text-[10px] font-black uppercase tracking-[0.4em] group/btn">
                  Saber Mais 
                  <ArrowUpRight className="h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}