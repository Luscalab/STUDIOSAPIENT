
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Search, Activity, PieChart, CheckCircle2 } from "lucide-react";

export default function PerformanceAdsPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-20 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Domínio de Busca Local</Badge>
          <h1 className="font-headline text-5xl md:text-[7.5rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Domine as <span className="text-primary italic">Buscas de Urgência</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance">
            Tráfego digital cirúrgico focado em capturar a demanda no momento exato da necessidade.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-32">
            {[
              { label: "Taxa de Conversão", value: "+42%", desc: "Crescimento médio em leads qualificados nos primeiros 90 dias.", icon: <Activity className="text-primary" /> },
              { label: "Custo por Aquisição", value: "-28%", desc: "Redução de desperdício através de negativação estratégica de termos.", icon: <PieChart className="text-primary" /> },
              { label: "Presença em Busca", value: "TOP 3", desc: "Posicionamento garantido no Google Meu Negócio para buscas locais.", icon: <Search className="text-primary" /> }
            ].map((metric, i) => (
              <div key={i} className="bg-slate-50 p-12 rounded-[4rem] border border-slate-200 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-5 rounded-2xl bg-white border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">{metric.icon}</div>
                  <span className="text-5xl font-black text-[#08070b] tracking-tighter">{metric.value}</span>
                </div>
                <h3 className="font-black text-2xl mb-4 tracking-tight text-[#08070b] uppercase">{metric.label}</h3>
                <p className="text-[#08070b]/60 text-lg font-medium leading-relaxed">{metric.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="space-y-12">
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-[#08070b] leading-[0.85]">Tráfego de Intenção: <br/>Onde o Dinheiro Está.</h2>
              <p className="text-xl text-[#08070b]/70 font-medium leading-relaxed tracking-tight">
                Respondemos a uma dor ativa. Se alguém pesquisa por sua solução, está pronta para contratar. Nossa intervenção garante que você seja a escolha.
              </p>
              
              <div className="space-y-10">
                {[
                  { title: "Arquitetura de Conversão GMN", desc: "Transformamos seu perfil local em uma máquina de chamadas e direções." },
                  { title: "Escala com Dados Reais", desc: "Focamos em ROAS (Retorno sobre Gasto Publicitário). Cada centavo é rastreado." },
                  { title: "Landing Pages de Alta Performance", desc: "Páginas de destino que removem atritos e forçam a decisão de contato." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group cursor-default">
                    <div className="h-10 w-10 mt-1 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl tracking-tighter mb-2 text-[#08070b] uppercase">{item.title}</h4>
                      <p className="text-[#08070b]/60 text-lg leading-snug font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={handleOpenChat} className="h-20 px-12 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all group">
                Diagnóstico de Performance <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-12 md:p-24 text-center text-white space-y-12 shadow-2xl relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
                <TrendingUp className="h-20 w-20 text-primary mx-auto animate-pulse relative z-10" />
                <h3 className="font-headline text-5xl font-black tracking-tighter leading-none relative z-10">Crescimento Previsível</h3>
                <p className="text-xl text-white/40 font-medium leading-relaxed relative z-10">
                  Substitua a dependência incerta de indicações por uma fonte constante e previsível de novos contratos.
                </p>
                <div className="pt-10 flex flex-col gap-8 text-left relative z-10">
                  {[
                    { label: "Inteligência de Lances", percent: 95 },
                    { label: "Segmentação Geográfica", percent: 88 },
                    { label: "Otimização de CPC", percent: 76 }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                        <span>{stat.label}</span>
                        <span>{stat.percent}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${stat.percent}%` }} />
                      </div>
                    </div>
                  ))}
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
