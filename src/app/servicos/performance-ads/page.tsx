
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, MapPin, ArrowRight, BarChart3, MousePointer2, Target, Search } from "lucide-react";

export default function PerformanceAdsPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-64 pb-24 md:pt-80 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Domínio de Busca Local</Badge>
          <h1 className="font-headline text-5xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Domine as <span className="text-primary italic">Buscas de Urgência</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance">
            Tráfego digital estratégico focado em capturar a demanda no momento exato da necessidade, transformando intenção em faturamento real.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-64 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-64">
            <div className="space-y-16">
              <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-12 text-foreground leading-[0.85]">Tráfego de Intenção</h2>
              <p className="text-xl md:text-3xl text-foreground/80 font-medium leading-relaxed tracking-tight text-balance">
                Quando alguém pesquisa por sua solução no Google, essa pessoa já está pronta para contratar. Nossa intervenção garante que seu negócio seja a escolha prioritária e inquestionável.
              </p>
              
              <div className="space-y-10">
                {[
                  { icon: <MapPin className="h-8 w-8" />, title: "Domínio de Busca Local", desc: "Otimização agressiva de Google Meu Negócio (GMN) para liderar buscas no seu raio de atuação." },
                  { icon: <Target className="h-8 w-8" />, title: "Anúncios de Precisão", desc: "Campanhas cirúrgicas focadas em captar contatos qualificados, eliminando o desperdício de verba." },
                  { icon: <BarChart3 className="h-8 w-8" />, title: "Inteligência de Dados", desc: "Transparência total e análise técnica sobre as novas oportunidades comerciais geradas mensalmente." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-10 items-start p-12 rounded-[3.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all shadow-xl group">
                    <div className="h-16 w-16 rounded-2xl bg-white border border-muted/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-3xl mb-4 tracking-tighter text-foreground leading-none">{item.title}</h3>
                      <p className="text-xl text-foreground/60 font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={handleOpenChat} className="h-24 px-16 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all group">
                Diagnóstico de Performance <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-16 md:p-32 text-center text-white space-y-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
                <TrendingUp className="h-24 w-24 text-primary mx-auto animate-pulse" />
                <h3 className="font-headline text-5xl font-black tracking-tighter leading-none">Crescimento Previsível</h3>
                <p className="text-2xl text-white/40 font-medium leading-relaxed">
                  Substitua a dependência incerta de indicações por uma fonte constante e previsível de novos contratos de alto valor.
                </p>
                <div className="pt-8 flex justify-center gap-12 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Visibilidade 10x</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MousePointer2 className="h-5 w-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Cliques Reais</p>
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
