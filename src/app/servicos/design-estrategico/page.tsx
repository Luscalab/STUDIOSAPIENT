
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Layers, ShieldCheck, ArrowRight, Target } from "lucide-react";

export default function DesignEstrategicoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-64 pb-32 md:pt-80 md:pb-64 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-12 bg-white/10 text-white border-white/20 px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md">Estratégia de Marca</Badge>
          <h1 className="font-headline text-6xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-12 text-balance">
            Design que <span className="text-primary italic">Comunica Valor</span>
          </h1>
          <p className="text-2xl md:text-4xl text-white/50 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance">
            Transformamos sua comunicação visual em um ativo estratégico de alta autoridade.
          </p>
        </div>
      </section>

      <section className="py-32 md:py-64 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-64">
            <div className="space-y-16">
              <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-12 text-foreground leading-[0.85]">Diferenciação Visual</h2>
              <p className="text-xl md:text-3xl text-foreground/80 font-medium leading-relaxed tracking-tight">
                No digital, sua imagem é sua primeira barreira de venda. Um design estratégico remove atritos de confiança e posiciona você como a escolha óbvia.
              </p>
              
              <div className="space-y-10">
                {[
                  { icon: <Award className="h-8 w-8" />, title: "Identidade de Prestígio", desc: "Universos visuais que transmitem o valor real do seu serviço." },
                  { icon: <Layers className="h-8 w-8" />, title: "Design System", desc: "Garantia de que sua marca fala a mesma língua em todos os pontos." },
                  { icon: <ShieldCheck className="h-8 w-8" />, title: "Psicologia de Valor", desc: "Cores e formas desenhadas para encurtar o ciclo de fechamento." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-10 items-start p-12 rounded-[3.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all shadow-xl group">
                    <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-primary shrink-0 transition-all border border-muted/10">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-3xl mb-4 tracking-tighter text-foreground leading-none">{item.title}</h3>
                      <p className="text-xl text-foreground/60 font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={handleOpenChat} className="h-24 px-16 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all">
                Dossiê de Identidade <ArrowRight className="ml-3" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-16 md:p-32 text-white space-y-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
                <Target className="h-16 w-16 text-primary mx-auto" />
                <h3 className="font-headline text-5xl font-black text-center tracking-tighter">Ativo Estratégico</h3>
                <p className="text-2xl text-white/40 text-center font-medium leading-relaxed">
                  Não criamos apenas "logos". Projetamos sistemas de identidade que comunicam solidez e diferenciação imediata.
                </p>
                <div className="h-2 w-32 bg-primary mx-auto rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
