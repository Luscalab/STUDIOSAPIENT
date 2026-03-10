
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, FileText, Lightbulb, Sparkles, ArrowRight, MousePointer2, Layers, ShieldCheck, Database } from "lucide-react";

export default function NarrativaVisualPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Intervalo Ajustado */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Estratégia Cognitiva</Badge>
          <h1 className="font-headline text-5xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Dados que <span className="text-primary italic">Geram Desejo</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance">
            Transformamos processos complexos e informações técnicas densas em narrativas visuais de alta fidelidade e impacto emocional imediato.
          </p>
        </div>
      </section>

      {/* Content Analysis Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10 text-foreground">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground leading-[0.85]">Clareza é a Nova <br/>Moeda de Troca.</h2>
            <p className="text-xl text-foreground/80 font-medium leading-relaxed tracking-tight text-balance">
              Muitos negócios perdem vendas milionárias porque o decisor não compreende o real valor da solução técnica. Nossa narrativa visual traduz sua expertise em desejo de compra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-32">
            {[
              { icon: <BrainCircuit className="h-10 w-10" />, title: "Infográficos de Valor", desc: "Desenhamos seu método proprietário para que o benefício seja visualmente inquestionável." },
              { icon: <FileText className="h-10 w-10" />, title: "Dossiês de Venda", desc: "Apresentações comerciais de luxo desenhadas para fechamentos com CEOs e decisores." },
              { icon: <Database className="h-10 w-10" />, title: "Visualização Técnica", desc: "Resultados complexos transformados em provas visuais simples de competência absoluta." }
            ].map((card, i) => (
              <div key={i} className="bg-secondary/30 p-12 rounded-[4rem] text-center space-y-8 flex flex-col items-center hover:bg-white hover:shadow-2xl transition-all border border-muted/10 group">
                <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-primary border border-muted/10 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  {card.icon}
                </div>
                <h3 className="font-black text-2xl tracking-tighter text-foreground leading-none">{card.title}</h3>
                <p className="text-foreground/60 text-base font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-12 md:p-24 bg-[#0c0a1a] rounded-[5rem] text-white border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-primary pointer-events-none">
              <Layers className="h-80 w-80" />
            </div>
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center relative z-10">
              <div className="flex-1 space-y-10">
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">Onde existe clareza, a venda é a única saída natural.</h3>
                <p className="text-xl text-white/40 leading-relaxed font-medium">
                  Atuamos como o filtro de valor do seu negócio, removendo a névoa informativa e focando no que realmente importa para o seu cliente final: o resultado.
                </p>
                <div className="flex flex-wrap gap-6">
                  <Button onClick={handleOpenChat} className="h-16 px-10 text-[10px] font-black bg-primary text-white rounded-full uppercase tracking-[0.4em] shadow-2xl hover:bg-primary/90 transition-all">
                    Simplificar Minha Autoridade <ArrowRight className="ml-3" />
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block w-px h-64 bg-white/10" />
              <div className="flex-1 grid grid-cols-2 gap-8">
                 <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                    <p className="text-4xl font-black text-primary tracking-tighter">92%</p>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Aumento na Compreensão</p>
                 </div>
                 <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                    <p className="text-4xl font-black text-primary tracking-tighter">3x</p>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Velocidade de Fechamento</p>
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
