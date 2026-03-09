'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Layers, Award, ShieldCheck, ArrowRight, Monitor, CheckCircle2, Sparkles, Target, Zap } from "lucide-react";

export default function DesignEstrategicoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-64 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-12 bg-white/10 text-white border-white/20 px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md">Engenharia de Identidade</Badge>
            <h1 className="font-headline text-6xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-12 text-balance">
              Design que <span className="text-primary italic">Vende Valor</span> Absoluto
            </h1>
            <p className="text-2xl md:text-4xl text-white/50 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance">
              Transformamos sua comunicação visual em um ativo estratégico de alta autoridade. Onde o amadorismo termina, a engenharia de marca Sapient começa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-64 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-64">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[5rem] overflow-hidden bg-secondary border border-muted p-16 flex flex-col justify-end space-y-10 shadow-2xl group hover:-translate-y-4 transition-all duration-1000">
                <div className="h-24 w-24 rounded-3xl bg-primary flex items-center justify-center text-white mb-6 shadow-xl">
                  <Target className="h-12 w-12" />
                </div>
                <h3 className="font-headline text-5xl font-black text-foreground tracking-tighter leading-none">Ativo Estratégico</h3>
                <p className="text-2xl text-muted-foreground/60 font-medium leading-relaxed">
                  Não criamos apenas "logos". Projetamos sistemas de identidade que comunicam solidez, técnica e diferenciação imediata no mercado.
                </p>
                <div className="h-2 w-32 bg-primary rounded-full group-hover:w-full transition-all duration-1000" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-16">
              <div>
                <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-12 text-foreground leading-[0.85]">Diferenciação por Precisão Visual</h2>
                <p className="text-xl md:text-3xl text-muted-foreground/60 font-medium leading-relaxed tracking-tight">
                  No digital, sua imagem é sua primeira barreira de venda. Um design estratégico remove atritos de confiança e posiciona você como a escolha óbvia.
                </p>
              </div>
              
              <div className="space-y-10">
                {[
                  { 
                    icon: <Award className="h-8 w-8" />, 
                    title: "Branding de Prestígio", 
                    desc: "Criação de universos visuais que transmitem o valor real do seu serviço técnico." 
                  },
                  { 
                    icon: <Layers className="h-8 w-8" />, 
                    title: "Design System Coerente", 
                    desc: "Garantia de que sua marca fala a mesma língua em todos os pontos de contato." 
                  },
                  { 
                    icon: <ShieldCheck className="h-8 w-8" />, 
                    title: "Engenharia de Confiança", 
                    desc: "Psicologia das cores para encurtar o ciclo de fechamento de negócios." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-10 items-start p-12 rounded-[3.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all duration-700 shadow-xl group">
                    <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-3xl mb-4 tracking-tighter text-foreground leading-none">{item.title}</h3>
                      <p className="text-xl text-muted-foreground/40 font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleOpenChat}
                className="h-24 px-16 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-2xl shadow-primary/20 group w-full sm:w-auto"
              >
                Dossiê de Identidade <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-64 bg-[#0c0a1a] rounded-[5rem] p-16 md:p-32 text-white border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-10">
              <Sparkles className="h-[40rem] w-[40rem]" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-12">
                <h3 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-balance leading-none">Metodologia de Entrega</h3>
                <p className="text-2xl text-white/40 leading-relaxed font-medium">
                  Nossa entrega de design é um documento técnico de autoridade, não apenas uma pasta de arquivos.
                </p>
                <ul className="space-y-8">
                  {[
                    "Diagnóstico de Percepção Atual.",
                    "Engenharia de Novo Posicionamento.",
                    "Manual de Ativos de Autoridade.",
                    "Suporte na Implementação Digital."
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-8 text-2xl font-black tracking-tighter">
                      <CheckCircle2 className="h-8 w-8 text-primary shrink-0" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h4 className="font-black text-3xl tracking-tighter leading-none">Agilidade</h4>
                  <p className="text-lg text-white/30 font-medium leading-relaxed">Prazos reais de negócio.</p>
                </div>
                <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
                  <Monitor className="h-12 w-12 text-primary" />
                  <h4 className="font-black text-3xl tracking-tighter leading-none">Escala</h4>
                  <p className="text-lg text-white/30 font-medium leading-relaxed">Suporte ao crescimento.</p>
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