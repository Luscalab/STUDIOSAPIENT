import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, CheckCircle2, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Engenharia de tráfego focada em ROI exponencial e domínio das buscas locais.",
    icon: <Megaphone className="h-10 w-10" />,
    features: ["Google Maps Strategic", "Ads de Alta Conversão", "Funis de Escala", "Growth Hacking Local"],
    badge: "Escala",
    accentColor: "from-primary/20 via-primary/5 to-transparent"
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Identidade visual de prestígio que justifica seu ticket e elimina a concorrência genérica.",
    icon: <Palette className="h-10 w-10" />,
    features: ["Branding de Autoridade", "Design System Exclusivo", "Direção Criativa", "Interface de Conversão"],
    badge: "Prestígio",
    accentColor: "from-accent/20 via-accent/5 to-transparent"
  },
  {
    title: "Gestão Social",
    slug: "gestao-social",
    description: "Curadoria de conteúdo estratégico para construir uma comunidade de alto valor.",
    icon: <Share2 className="h-10 w-10" />,
    features: ["Escrita Persuasiva", "Content Intelligence", "Gestão de Autoridade", "Growth Social"],
    badge: "Desejo",
    accentColor: "from-purple-500/20 via-purple-500/5 to-transparent"
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Simplificamos o complexo através de inteligência visual cognitiva para acelerar vendas.",
    icon: <BarChart3 className="h-10 w-10" />,
    features: ["Data Visualization", "Infográficos de Valor", "Storytelling Visual", "Assets de Decisão"],
    badge: "Clareza",
    accentColor: "from-indigo-500/20 via-indigo-500/5 to-transparent"
  }
];

export function Services() {
  return (
    <section id="servicos" className="section-spacing relative overflow-hidden bg-[#fbfaff]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-primary/10 text-primary px-8 py-2 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">Soluções Corporativas</Badge>
            <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tighter leading-tight">Ecossistema de<br />Resultados</h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg md:text-xl font-medium leading-relaxed tracking-tight lg:pb-4 mx-auto lg:mx-0">
            Integramos design de elite com inteligência de dados para tracionar o crescimento do seu negócio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6">
          {services.map((service, idx) => (
            <Card key={idx} className="card-premium-bg border-none group overflow-hidden shadow-xl rounded-[3rem] hover:-translate-y-3 transition-all duration-700 relative flex flex-col h-full">
              {/* Decorative dynamic gradient background based on service */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              
              <CardHeader className="p-10 pb-6 relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-6 rounded-2xl bg-white text-primary shadow-sm border border-primary/5 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                    {service.icon}
                  </div>
                  <Badge variant="outline" className="border-primary/10 text-primary font-black text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 bg-primary/5 rounded-full">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="font-headline text-2xl md:text-3xl mb-4 tracking-tighter font-black">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-base leading-snug font-medium">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-10 pb-10 relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-bold text-muted-foreground/80 group-hover:text-foreground transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-primary/30 group-hover:text-primary transition-colors" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Link href={`/servicos/${service.slug}`} className="w-full flex items-center justify-between p-6 rounded-[1.5rem] bg-white border border-primary/5 group-hover:bg-primary group-hover:text-white group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-700 text-[10px] font-black uppercase tracking-[0.2em]">
                  Explorar Estratégia <ArrowUpRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
