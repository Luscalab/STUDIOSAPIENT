
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
    <main className="min-h-screen bg-[#0c0a1a]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Engenharia de Identidade</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Design que <span className="text-primary italic">Vende Valor</span> Absoluto
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              Transformamos sua comunicação visual em um ativo estratégico de alta autoridade. Onde o amadorismo termina, a engenharia de marca Sapient começa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 relative">
        <div className="absolute top-0 left-0 w-full h-full hero-purple-mesh opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-16 flex flex-col justify-end space-y-6 shadow-2xl">
                <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white mb-4">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-4xl font-black text-white tracking-tighter">Ativo Estratégico</h3>
                <p className="text-lg text-white/40 font-medium leading-relaxed">
                  Não criamos apenas "logos". Projetamos sistemas de identidade que comunicam solidez, técnica e diferenciação imediata no mercado.
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8 text-white">Diferenciação por Precisão Visual</h2>
                <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed tracking-tight">
                  No digital, sua imagem é sua primeira barreira de venda. Um design estratégico remove atritos de confiança e posiciona você como a escolha óbvia.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <Award className="h-6 w-6" />, 
                    title: "Branding de Prestígio", 
                    desc: "Criação de universos visuais que transmitem o valor real do seu serviço técnico ou intelectual." 
                  },
                  { 
                    icon: <Layers className="h-6 w-6" />, 
                    title: "Design System Coerente", 
                    desc: "Garantia de que sua marca fala a mesma língua em todos os pontos de contato com o cliente." 
                  },
                  { 
                    icon: <ShieldCheck className="h-6 w-6" />, 
                    title: "Engenharia de Confiança", 
                    desc: "Uso de semiótica e psicologia das cores para encurtar o ciclo de fechamento de negócios." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl shadow-2xl border border-white/5 hover:border-primary/20 transition-all duration-500">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 tracking-tight text-white">{item.title}</h3>
                      <p className="text-white/30 font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleOpenChat}
                className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group w-full sm:w-auto"
              >
                Dossiê de Identidade <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-40 bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 text-white border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Sparkles className="h-64 w-64" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-balance">Metodologia de Entrega</h3>
                <p className="text-xl text-white/40 leading-relaxed font-medium">
                  Nossa entrega de design é um documento técnico de autoridade, não apenas uma pasta de arquivos.
                </p>
                <ul className="space-y-4">
                  {[
                    "Diagnóstico de Percepção Atual.",
                    "Engenharia de Novo Posicionamento.",
                    "Manual de Ativos de Autoridade.",
                    "Suporte na Implementação Digital."
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg font-bold">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-bold text-xl mb-2">Agilidade</h4>
                  <p className="text-sm text-white/30">Entrega focada em prazos reais de negócio.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                  <Monitor className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-bold text-xl mb-2">Escalabilidade</h4>
                  <p className="text-sm text-white/30">Ativos prontos para suportar o crescimento da sua marca.</p>
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
