
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Palette, Share2, ArrowUpRight, CheckCircle2, BarChart3, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Performance & Ads",
    slug: "performance-ads",
    description: "Engenharia de tráfego focada em ROI e domínio das buscas locais.",
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Google Maps Otimizado", "Anúncios Segmentados", "Funis de Alta Conversão"],
    badge: "Escala",
    colorClass: "text-primary",
    bgGradient: "from-primary/10 via-primary/5 to-transparent",
    hoverBorder: "hover:border-primary/30",
    iconBg: "bg-primary/10"
  },
  {
    title: "Design Estratégico",
    slug: "design-estrategico",
    description: "Identidade visual técnica que comunica valor e autoridade absoluta.",
    icon: <Palette className="h-8 w-8" />,
    features: ["Branding de Prestígio", "Design System Coerente", "Ativos Visuais Premium"],
    badge: "Identidade",
    colorClass: "text-accent",
    bgGradient: "from-accent/10 via-accent/5 to-transparent",
    hoverBorder: "hover:border-accent/30",
    iconBg: "bg-accent/10"
  },
  {
    title: "Gestão Social",
    slug: "gestao-social",
    description: "Curadoria de conteúdo focada em prova social e desejo de marca.",
    icon: <Share2 className="h-8 w-8" />,
    features: ["Escrita Estratégica", "Monitoramento Ativo", "Growth Qualificado"],
    badge: "Presença",
    colorClass: "text-purple-500",
    bgGradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    hoverBorder: "hover:border-purple-500/30",
    iconBg: "bg-purple-500/10"
  },
  {
    title: "Narrativa Visual",
    slug: "narrativa-visual",
    description: "Simplificação de dados complexos em ativos de venda instantânea.",
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["Infográficos de Valor", "Apresentações de Impacto", "Clareza Cognitiva"],
    badge: "Clareza",
    colorClass: "text-indigo-500",
    bgGradient: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    hoverBorder: "hover:border-indigo-500/30",
    iconBg: "bg-indigo-500/10"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-24 md:py-40 relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-accent/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div className="max-w-4xl">
            <Badge className="mb-8 bg-foreground/5 text-foreground/60 border-foreground/10 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">Diferenciais Competitivos</Badge>
            <h2 className="font-headline text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-none mb-4">
              Engenharia de<br />
              <span className="text-primary italic opacity-90">Soluções.</span>
            </h2>
          </div>
          <p className="text-muted-foreground/70 max-w-sm text-xl font-medium leading-relaxed tracking-tight lg:pb-6 mx-auto lg:mx-0">
            Integramos design profissional e inteligência comercial para transformar marcas em ativos de alta performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "group relative border-none bg-white/50 backdrop-blur-xl rounded-[3.5rem] p-2 transition-all duration-700 hover:-translate-y-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]",
                service.hoverBorder
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none",
                service.bgGradient
              )} />
              
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className={cn(
                    "h-16 w-16 rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 shadow-sm border border-transparent group-hover:border-white/20",
                    service.iconBg,
                    service.colorClass
                  )}>
                    {service.icon}
                  </div>
                  <Badge variant="outline" className="border-foreground/5 text-foreground/40 font-black text-[9px] uppercase tracking-[0.2em] px-5 py-2 rounded-full">
                    {service.badge}
                  </Badge>
                </div>

                <div className="flex-1">
                  <CardTitle className="font-headline text-2xl md:text-3xl mb-4 tracking-tighter font-black text-foreground group-hover:text-primary transition-colors duration-500">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80 text-base leading-relaxed font-medium mb-10">
                    {service.description}
                  </CardDescription>

                  <ul className="space-y-4 mb-12">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-4 text-[13px] font-bold text-muted-foreground/60 group-hover:text-foreground transition-colors duration-500">
                        <div className={cn("h-1.5 w-1.5 rounded-full", service.iconBg)} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={`/servicos/${service.slug}`} 
                  className="w-full flex items-center justify-between p-7 rounded-[2.5rem] bg-secondary/50 group-hover:bg-primary group-hover:text-white group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-700 text-[10px] font-black uppercase tracking-[0.3em] border border-foreground/5"
                >
                  Dossiê Completo <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
