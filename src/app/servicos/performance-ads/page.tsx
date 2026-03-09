
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
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Vendas & Escala Digital</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Seja a <span className="text-white/70 italic">Primeira Opção</span> do Seu Cliente
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              Não basta existir no digital, você precisa ser encontrado no momento exato da necessidade. Transformamos cliques em oportunidades reais para sua empresa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">O Poder de Dominar as Buscas</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Quando alguém pesquisa por um serviço no Google, essa pessoa já está propensa a contratar. Estar no topo garante que seu negócio seja a escolha imediata de quem busca soluções agora.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <MapPin />, 
                    title: "Presença Local Estratégica", 
                    desc: "Otimizamos seu perfil para que sua empresa lidere as buscas geográficas na sua região de atendimento." 
                  },
                  { 
                    icon: <MousePointer2 />, 
                    title: "Anúncios de Alta Conversão", 
                    desc: "Campanhas segmentadas focadas em atrair contatos que realmente possuem o perfil do seu cliente ideal." 
                  },
                  { 
                    icon: <BarChart3 />, 
                    title: "Foco Total em Resultados", 
                    desc: "Transparência absoluta: acompanhe de perto o volume de novos contatos qualificados que sua empresa recebe." 
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
                Ativar Máquina de Vendas <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 flex flex-col justify-center items-center text-center space-y-8">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h3 className="font-headline text-3xl font-black tracking-tighter">Crescimento sob Demanda</h3>
                <p className="text-lg text-muted-foreground font-medium max-w-xs leading-relaxed">
                  Não dependa apenas de indicações orgânicas. Construa uma fonte previsível de novos clientes todos os meses.
                </p>
                <div className="flex gap-4 w-full">
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-primary/10">
                    <p className="text-[10px] font-black uppercase text-primary mb-1">Visibilidade</p>
                    <p className="text-2xl font-black">+200%</p>
                  </div>
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-primary/10">
                    <p className="text-[10px] font-black uppercase text-primary mb-1">Redução CPL</p>
                    <p className="text-2xl font-black">-40%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
            <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-6 hover:border-primary/20 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <Smartphone className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-black tracking-tighter">Foco Total no Mobile</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Nossas campanhas são otimizadas para dispositivos móveis, garantindo uma experiência de contato rápida e eficiente via canais diretos.
              </p>
              <ul className="space-y-3">
                {["Anúncios Direto ao WhatsApp", "Google Maps Otimizado", "Landing Pages Mobile-First"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-muted-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-6 hover:border-primary/20 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-black tracking-tighter">Segmentação de Precisão</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Encontramos o público exato para o seu serviço. Evitamos desperdício de investimento ao atingir apenas quem possui real potencial de contratação.
              </p>
              <ul className="space-y-3">
                {["Público Qualificado", "Segmentação por Interesses", "Raio de Atendimento Local"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-muted-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-12 md:p-24 bg-foreground rounded-[4rem] text-white text-center space-y-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <h3 className="font-headline text-4xl md:text-5xl font-black tracking-tighter relative z-10">Transforme Investimento em Crescimento</h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium relative z-10">
              O marketing estratégico é o combustível do seu negócio. Na Sapient, cada real investido trabalha para trazer um retorno superior à operação.
            </p>
            <Button 
              onClick={handleOpenChat}
              className="h-20 px-16 text-xl font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-2xl shadow-primary/30 relative z-10"
            >
              Iniciar Escala Agora
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
