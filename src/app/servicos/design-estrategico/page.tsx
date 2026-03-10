
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ShieldCheck, ArrowRight, Palette, Gem, Sparkles, CheckCircle2 } from "lucide-react";

export default function DesignEstrategicoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Consistência de Intervalo */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md">Psicologia de Valor</Badge>
          <h1 className="font-headline text-5xl md:text-[7.5rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Design que <span className="text-primary italic">Comunica Prestígio</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-tight tracking-tight text-balance">
            Projetamos universos visuais que removem barreiras de confiança e posicionam sua marca no topo da pirâmide de valor do seu mercado.
          </p>
        </div>
      </section>

      {/* The Authority Framework - Fundo Branco com Contraste */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center mb-32">
            <div className="space-y-12">
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">O Impacto da <br/>Percepção de Luxo.</h2>
              <p className="text-xl text-foreground/80 font-medium leading-relaxed tracking-tight">
                Em mercados de alto padrão, sua imagem é sua primeira barreira de venda. Um design estratégico remove atritos de percepção e posiciona você não como um custo, mas como um investimento necessário.
              </p>
              
              <div className="grid grid-cols-1 gap-10">
                {[
                  { icon: <Award className="h-8 w-8" />, title: "Identidade de Prestígio", desc: "Sistemas visuais arquitetados para transmitir solidez e expertise antes da primeira palavra." },
                  { icon: <Gem className="h-8 w-8" />, title: "Branding Cognitivo", desc: "Aplicação de psicologia cromática e semiótica para encurtar o ciclo de confiança do cliente." },
                  { icon: <ShieldCheck className="h-8 w-8" />, title: "Diferenciação Absoluta", desc: "Saia da guerra de preços através de um posicionamento visual inquestionável." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-10 items-start p-12 rounded-[4rem] bg-secondary/20 border border-muted/10 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="h-16 w-16 rounded-[2rem] bg-white flex items-center justify-center text-primary shrink-0 transition-all border border-muted/10 group-hover:bg-primary group-hover:text-white shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-3xl mb-3 tracking-tighter text-foreground leading-none uppercase">{item.title}</h3>
                      <p className="text-lg text-foreground/60 font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={handleOpenChat} className="h-20 px-12 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all group">
                Solicitar Dossiê Visual <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-12 md:p-24 text-white shadow-2xl relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
                <Sparkles className="h-20 w-20 text-primary mb-12 animate-pulse" />
                <h3 className="font-headline text-5xl font-black tracking-tighter leading-[0.9] mb-12">Nossa Matriz de Design System</h3>
                
                <div className="space-y-12 relative z-10">
                   {[
                     { label: "Equilíbrio Estético", value: 98 },
                     { label: "Coerência de Marca", value: 100 },
                     { label: "Impacto Sensorial", value: 92 }
                   ].map((bar, i) => (
                     <div key={i} className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                          <span>{bar.label}</span>
                          <span>{bar.value}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: `${bar.value}%` }} />
                        </div>
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-2 gap-10 mt-24 pt-12 border-t border-white/10">
                   <div className="text-center">
                      <p className="text-5xl font-black text-primary tracking-tighter">1.2s</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2">Tempo p/ Julgamento Visual</p>
                   </div>
                   <div className="text-center">
                      <p className="text-5xl font-black text-primary tracking-tighter">85%</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2">Influência na Decisão</p>
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

