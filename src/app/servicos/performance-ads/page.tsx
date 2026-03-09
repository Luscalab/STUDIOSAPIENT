
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, MapPin, ArrowRight, BarChart3, MousePointer2, Smartphone, Globe, CheckCircle2 } from "lucide-react";

export default function PerformanceAdsPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#0c0a1a]">
      <Navbar />
      
      <section className="relative pt-64 pb-24 md:pt-80 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Estratégia de Performance</Badge>
          <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
            Domine as <span className="text-primary italic">Buscas Reais</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
            Tráfego digital focado em capturar a demanda no momento exato da necessidade, transformando intenção em faturamento.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-12">
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8 text-foreground">Tráfego Inteligente</h2>
              <p className="text-lg md:text-xl text-muted-foreground/60 font-medium leading-relaxed tracking-tight">
                Quando alguém pesquisa por sua solução, essa pessoa já está pronta para contratar. Nossa intervenção garante que seu negócio seja a escolha prioritária.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <MapPin />, title: "Localização Estratégica", desc: "Otimização de Google Maps para liderar buscas no seu raio de atuação." },
                  { icon: <MousePointer2 />, title: "Anúncios de Precisão", desc: "Campanhas segmentadas focadas em captar contatos qualificados." },
                  { icon: <BarChart3 />, title: "Relatórios Claros", desc: "Transparência total sobre as novas oportunidades comerciais geradas." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all shadow-xl">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 tracking-tight text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground/50 font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={handleOpenChat} className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl group">
                Diagnóstico de Performance <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[4rem] p-12 text-center text-white space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                <TrendingUp className="h-16 w-16 text-primary mx-auto animate-pulse" />
                <h3 className="font-headline text-3xl font-black tracking-tighter text-white">Crescimento sob Controle</h3>
                <p className="text-lg text-white/40 font-medium leading-relaxed">
                  Substitua a dependência de indicações por uma fonte previsível de novos contratos todos os meses.
                </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
