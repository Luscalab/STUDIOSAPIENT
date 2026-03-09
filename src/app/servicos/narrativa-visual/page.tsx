
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Lightbulb, CheckCircle2, FileText, BrainCircuit, Info, MessageSquareText, Sparkles } from "lucide-react";

export default function NarrativaVisualPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#0c0a1a]">
      <Navbar />
      
      <section className="relative pt-64 pb-24 md:pt-80 md:pb-48 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Clareza Cognitiva</Badge>
          <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
            Dados que <span className="text-primary italic">Geram Desejo</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
            Transformamos processos complexos em narrativas visuais de alta compreensão e impacto.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white relative">
        <div className="container mx-auto px-6 relative z-10 text-foreground">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Clareza gera Confiança</h2>
            <p className="text-lg md:text-xl text-muted-foreground/60 font-medium leading-relaxed tracking-tight">
              Muitos negócios perdem vendas porque o cliente não entende o real valor da solução. Nossa narrativa visual traduz sua expertise em desejo imediato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {[
              { icon: <BrainCircuit className="h-10 w-10" />, title: "Infográficos", desc: "Desenhamos seu método para que o benefício seja indiscutível." },
              { icon: <FileText className="h-10 w-10" />, title: "Dossiês de Venda", desc: "Apresentações comerciais para decisores qualificados." },
              { icon: <Lightbulb className="h-10 w-10" />, title: "Visualização de Dados", desc: "Resultados técnicos transformados em provas visuais de competência." }
            ].map((card, i) => (
              <div key={i} className="bg-secondary p-12 rounded-[3.5rem] text-center space-y-6 flex flex-col items-center hover:scale-105 transition-all shadow-xl border border-muted">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                  {card.icon}
                </div>
                <h3 className="font-bold text-2xl tracking-tighter">{card.title}</h3>
                <p className="text-muted-foreground/50 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-12 md:p-24 bg-[#0c0a1a] rounded-[4rem] text-white border border-white/10 shadow-2xl relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-primary">
              <Sparkles className="h-64 w-64" />
            </div>
            <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
              <div className="flex-1 space-y-8">
                <h3 className="font-headline text-3xl md:text-5xl font-black tracking-tighter">Clareza é Autoridade</h3>
                <p className="text-xl text-white/40 leading-relaxed font-medium">
                  "Onde existe clareza, a decisão de compra é natural." Atuamos como o filtro de valor do seu negócio.
                </p>
                <Button onClick={handleOpenChat} className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl">
                  Simplificar Minha Autoridade
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
