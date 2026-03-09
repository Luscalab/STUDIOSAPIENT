
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, TrendingUp, Target, MapPin, ArrowRight, BarChart3, Search, Zap, MousePointer2, Smartphone, Globe, CheckCircle2 } from "lucide-react";

export default function PerformanceAdsPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Engenharia de Escala</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Domine as <span className="text-white/70 italic">Buscas Estratégicas</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              Não basta ser o melhor, você precisa ser o primeiro. Engenharia de tráfego focada em capturar a demanda no momento exato da necessidade.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Tráfego com ROI Previsível</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Quando alguém pesquisa por sua solução, essa pessoa já está pronta para contratar. Nossa intervenção garante que seu negócio lidere essa intenção de compra.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <MapPin />, 
                    title: "Geolocalização Estratégica", 
                    desc: "Otimização absoluta de Google Maps e GMN para liderar buscas locais no seu raio de atuação." 
                  },
                  { 
                    icon: <MousePointer2 />, 
                    title: "Ads de Alta Precisão", 
                    desc: "Campanhas segmentadas focadas em captar contatos qualificados, eliminando desperdício de verba." 
                  },
                  { 
                    icon: <BarChart3 />, 
                    title: "Dashboard de Resultados", 
                    desc: "Transparência total sobre o volume de novas oportunidades comerciais geradas para sua empresa." 
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
                className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group w-full sm:w-auto"
              >
                Diagnóstico de Performance <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 flex flex-col justify-center items-center text-center space-y-8">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h3 className="font-headline text-3xl font-black tracking-tighter">Crescimento sobre Controle</h3>
                <p className="text-lg text-muted-foreground font-medium max-w-xs leading-relaxed">
                  Substitua a dependência de indicações por uma fonte previsível de novos contratos todos os meses.
                </p>
                <div className="flex gap-4 w-full">
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-primary/10">
                    <p className="text-[10px] font-black uppercase text-primary mb-1">Visibilidade</p>
                    <p className="text-2xl font-black">+250%</p>
                  </div>
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-primary/10">
                    <p className="text-[10px] font-black uppercase text-primary mb-1">Custo Lead</p>
                    <p className="text-2xl font-black">-35%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
            <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-6 hover:border-primary/20 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <Smartphone className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-black tracking-tighter">Ecossistemas Mobile</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Otimizamos sua presença para o comportamento móvel: velocidade, clareza e botões de ação imediata.
              </p>
              <ul className="space-y-3">
                {["Campanhas Direto ao WhatsApp", "Otimização Google Maps", "Páginas de Alta Velocidade"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-muted-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-6 hover:border-primary/20 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-black tracking-tighter">Domínio de Nicho</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Não competimos com o mercado, dominamos o seu nicho. Atingimos apenas quem possui o perfil ideal de cliente.
              </p>
              <ul className="space-y-3">
                {["Públicos de Alta Intenção", "Segmentação por Poder Aquisitivo", "Raio Geográfico de Precisão"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-muted-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-12 md:p-24 bg-foreground rounded-[4rem] text-white text-center space-y-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <h3 className="font-headline text-4xl md:text-5xl font-black tracking-tighter relative z-10">O Combustível da sua Autoridade</h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium relative z-10">
              O marketing de performance Sapient é o motor que leva sua autoridade visual até as pessoas que precisam contratar agora.
            </p>
            <Button 
              onClick={handleOpenChat}
              className="h-20 px-16 text-xl font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-2xl shadow-primary/30 relative z-10"
            >
              Iniciar Ciclo de Escala
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
