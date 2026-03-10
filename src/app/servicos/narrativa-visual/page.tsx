
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, FileText, Lightbulb, Sparkles, ArrowRight, MousePointer2 } from "lucide-react";

export default function NarrativaVisualPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-16 md:pt-64 md:pb-24 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Estratégia Cognitiva</Badge>
          <h1 className="font-headline text-5xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Dados que <span className="text-primary italic">Geram Desejo</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance">
            Transformamos processos complexos e informações técnicas em narrativas visuais de alta compreensão e impacto emocional.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-32 bg-white relative">
        <div className="container mx-auto px-6 relative z-10 text-foreground">
          <div className="max-w-5xl mx-auto text-center mb-24 md:mb-40">
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-8 md:mb-12 text-foreground leading-[0.85]">Clareza é Autoridade</h2>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium leading-relaxed tracking-tight text-balance">
              Muitos negócios perdem vendas porque o cliente não compreende o real valor da solução. Nossa narrativa visual traduz sua expertise técnica em desejo de compra imediato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-32 md:mb-48">
            {[
              { icon: <BrainCircuit className="h-12 w-12" />, title: "Infográficos de Valor", desc: "Desenhamos seu método proprietário para que o benefício seja visualmente indiscutível." },
              { icon: <FileText className="h-12 w-12" />, title: "Dossiês de Venda", desc: "Apresentações comerciais de alta fidelidade desenhadas para fechamentos com decisores." },
              { icon: <Lightbulb className="h-12 w-12" />, title: "Visualização Técnica", desc: "Resultados complexos transformados em provas visuais simples de competência absoluta." }
            ].map((card, i) => (
              <div key={i} className="bg-secondary p-12 md:p-16 rounded-[4rem] text-center space-y-8 flex flex-col items-center hover:scale-105 transition-all shadow-2xl border border-muted/10 group">
                <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center text-primary border border-muted/10 group-hover:bg-primary group-hover:text-white transition-all">
                  {card.icon}
                </div>
                <h3 className="font-black text-3xl tracking-tighter text-foreground leading-none">{card.title}</h3>
                <p className="text-foreground/60 text-lg font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-12 md:p-32 bg-[#0c0a1a] rounded-[5rem] text-white border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-primary pointer-events-none">
              <Sparkles className="h-80 w-80" />
            </div>
            <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center relative z-10">
              <div className="flex-1 space-y-10">
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">Onde existe clareza, a venda é natural.</h3>
                <p className="text-2xl text-white/40 leading-relaxed font-medium">
                  Atuamos como o filtro de valor do seu negócio, removendo a névoa informativa e focando no que realmente importa para o seu cliente.
                </p>
                <div className="flex flex-wrap gap-8">
                  <Button onClick={handleOpenChat} className="h-20 px-12 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all">
                    Simplificar Minha Autoridade <ArrowRight className="ml-3" />
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block w-px h-64 bg-white/10" />
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                 <MousePointer2 className="h-12 w-12 text-primary animate-bounce" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Protocolo de Clareza</p>
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
