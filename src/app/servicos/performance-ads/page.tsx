
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, TrendingUp, Target, Search, ArrowRight, BarChart3, MapPin } from "lucide-react";

export default function PerformanceAdsPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Data-Driven Growth</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Performance que <span className="text-white/70 italic">Gera ROI</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Anúncios não são gastos, são investimentos. Focamos em tráfego qualificado para atrair clientes prontos para comprar de você.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Engenharia de Conversão</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Diferente de agências tradicionais, nossa performance é baseada em funis de vendas que entendem a jornada de compra, desde a busca local até o fechamento.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: <MapPin />, title: "Domínio do Google Meu Negócio", desc: "Otimização técnica para garantir que sua empresa seja a primeira opção em buscas locais de urgência e conveniência." },
                  { icon: <Target />, title: "Gestão Estratégica de Ads", desc: "Campanhas em Meta e Google focadas no público de alta intenção, otimizando o Custo por Lead (CPL) continuamente." },
                  { icon: <BarChart3 />, title: "Análise de Métricas Reais", desc: "Focamos em faturamento e ROI, não em 'métricas de vaidade'. Dados claros para decisões inteligentes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-white shadow-sm border border-primary/5 hover:border-primary/20 transition-all duration-500">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h3>
                      <p className="text-muted-foreground font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 flex flex-col justify-center items-center text-center space-y-8">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h3 className="font-headline text-3xl font-black tracking-tighter">Escalabilidade Garantida</h3>
                <p className="text-lg text-muted-foreground font-medium max-w-xs">
                  Criamos máquinas de vendas que permitem que seu negócio cresça de forma previsível e lucrativa.
                </p>
                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
                  className="w-full h-20 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  Agendar Diagnóstico
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
