import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Performance & Ads",
    description: "Estratégias de escala massiva focadas em ROI e crescimento exponencial via Google Meu Negócio e Tráfego.",
    icon: <Megaphone className="h-10 w-10 md:h-12 md:w-12" />,
    features: ["Google Meu Negócio de Elite", "Meta & Google Ads Premium", "Funis de Alta Conversão", "Growth Estratégico"],
    badge: "Escala Local"
  },
  {
    title: "Design de Luxo",
    description: "Criação de ecossistemas visuais que comunicam valor inquestionável instantaneamente.",
    icon: <Palette className="h-10 w-10 md:h-12 md:w-12" />,
    features: ["Identidade Visual Premium", "Design System Exclusivo", "Direção Criativa de Luxo", "Branding de Autoridade"],
    badge: "Estética"
  },
  {
    title: "Gestão de Elite",
    description: "Transformamos redes sociais em canais de desejo e conversão de alto ticket para marcas premium.",
    icon: <Share2 className="h-10 w-10 md:h-12 md:w-12" />,
    features: ["Curadoria de Conteúdo", "Copywriting Estratégico", "Social Growth & Autoridade", "Gestão de Percepção"],
    badge: "Autoridade"
  }
];

export function Services() {
  return (
    <section id="servicos" className="section-spacing relative overflow-hidden bg-[#fbfaff]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div className="max-w-4xl">
            <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Expertise</Badge>
            <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tighter leading-[0.9] md:leading-[0.85]">Soluções para<br className="hidden md:block" /> Domínio de Mercado</h2>
          </div>
          <p className="text-muted-foreground/70 max-w-sm text-xl md:text-2xl font-medium leading-relaxed tracking-tight lg:pb-6 mx-auto lg:mx-0">
            Unimos a precisão dos dados à sensibilidade do design para criar resultados que se destacam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, idx) => (
            <Card key={idx} className="card-premium-bg border-none group overflow-hidden premium-shadow rounded-[3.5rem] hover-lift transition-all duration-700 relative flex flex-col h-full">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/15 transition-colors" />
              
              <CardHeader className="p-10 md:p-14 pb-8 relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-6 md:p-8 rounded-3xl bg-white text-primary shadow-sm border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110">
                    {service.icon}
                  </div>
                  <Badge variant="outline" className="border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest px-6 py-2 bg-primary/5">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="font-headline text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tighter font-black leading-none">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground/70 text-lg md:text-xl lg:text-2xl leading-tight font-medium tracking-tight">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-10 md:px-14 pb-12 md:pb-16 relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-5 mb-14">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-sm md:text-base font-bold text-muted-foreground/60 group-hover:text-foreground transition-colors duration-500">
                      <CheckCircle2 className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-between p-7 rounded-3xl bg-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-700 text-[11px] font-black uppercase tracking-[0.4em] group/btn">
                  Explorar Projeto 
                  <ArrowUpRight className="h-6 w-6 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}