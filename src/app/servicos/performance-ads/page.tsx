
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, TrendingUp, Target, MapPin, ArrowRight, BarChart3, Search, Zap, MousePointer2 } from "lucide-react";

export default function PerformanceAdsPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Escala & Resultado</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Encontre o <span className="text-white/70 italic">Cliente Certo</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Anúncios não são gastos, são motores de vendas. Criamos funis que colocam seu serviço na frente de quem está pronto para comprar agora.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">O Poder de Ser Encontrado</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Quando um potencial cliente pesquisa por um serviço no Google, ele já tomou 80% da decisão de compra. Se você não aparecer ali, ele vai comprar do seu concorrente. Nós garantimos que sua marca seja a primeira opção.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <MapPin />, 
                    title: "Google Meu Negócio Estratégico", 
                    desc: "Domine o mapa local. Apareça nas primeiras posições quando alguém buscar por serviços na sua região." 
                  },
                  { 
                    icon: <MousePointer2 />, 
                    title: "Tráfego Pago de Alta Conversão", 
                    desc: "Campanhas no Meta e Google desenhadas para atrair cliques qualificados e leads reais." 
                  },
                  { 
                    icon: <BarChart3 />, 
                    title: "Relatórios de ROI", 
                    desc: "Transparência total. Você saberá exatamente quanto investiu e quanto retornou em novos contatos." 
                  }
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
              
              <Button 
                onClick={handleOpenChat}
                className="h-20 px-12 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group"
              >
                Ativar meu Funil <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 flex flex-col justify-center items-center text-center space-y-8">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h3 className="font-headline text-3xl font-black tracking-tighter">Crescimento sob Demanda</h3>
                <p className="text-lg text-muted-foreground font-medium max-w-xs leading-relaxed">
                  Não espere o cliente chegar por acaso. Construa uma máquina que traz novas oportunidades todos os dias.
                </p>
                <div className="flex gap-4 w-full">
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-primary/10">
                    <p className="text-[10px] font-black uppercase text-primary mb-1">Visibilidade</p>
                    <p className="text-2xl font-black">+150%</p>
                  </div>
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-primary/10">
                    <p className="text-[10px] font-black uppercase text-primary mb-1">Conversão</p>
                    <p className="text-2xl font-black">X3.5</p>
                  </div>
                </div>
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
