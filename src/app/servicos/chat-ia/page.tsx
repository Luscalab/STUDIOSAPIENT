
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, Cpu, BarChart, Sparkles, Smartphone, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ChatIAPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-16 md:pt-64 md:pb-24 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Ecossistemas Autônomos</Badge>
          <h1 className="font-headline text-5xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-12 text-balance">
            Inteligência que <span className="text-primary italic">Atende e Vende</span>
          </h1>
          <p className="text-2xl md:text-4xl text-white/50 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance">
            Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7 sem interrupções.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-32 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center mb-32 md:mb-64">
            <div className="space-y-12 md:space-y-16">
              <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-8 md:mb-12 text-foreground leading-[0.85]">Atendimento Sem Espera</h2>
              <p className="text-xl md:text-3xl text-foreground/80 font-medium leading-relaxed tracking-tight">
                No digital, 5 minutos de demora podem significar a perda de um contrato. Nossos ecossistemas de Chat IA garantem resposta imediata e precisão técnica em cada interação.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                {[
                  { icon: <Smartphone className="h-8 w-8" />, title: "WhatsApp Business API", desc: "Automação via API oficial com agentes que falam a língua do seu cliente." },
                  { icon: <Cpu className="h-8 w-8" />, title: "Treinamento Exclusivo", desc: "Sua IA é alimentada com seus manuais, processos e tom de voz institucional." },
                  { icon: <BarChart className="h-8 w-8" />, title: "Filtro de Qualificação", desc: "Identificação automática de leads prontos para fechar, otimizando seu time comercial." },
                  { icon: <Zap className="h-8 w-8" />, title: "Disponibilidade Total", desc: "Atendimento técnico e comercial ininterrupto, feriados e madrugadas inclusos." }
                ].map((item, i) => (
                  <div key={i} className="p-10 md:p-12 rounded-[3.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all shadow-xl group">
                    <div className="mb-8 p-6 rounded-2xl bg-white w-fit text-primary transition-all border border-muted/10 group-hover:bg-primary group-hover:text-white">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-2xl mb-4 tracking-tighter text-foreground leading-none">{item.title}</h3>
                    <p className="text-lg text-foreground/60 font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleOpenChat} className="h-24 px-16 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all w-full sm:w-auto group">
                Simular Diagnóstico IA <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-12 md:p-32 text-white space-y-12 md:space-y-16 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
               <Bot className="h-20 w-20 text-primary mx-auto animate-bounce" />
               <h3 className="font-headline text-5xl font-black text-center tracking-tighter leading-none">Presença Digital Inteligente</h3>
               <p className="text-white/40 text-2xl text-center font-medium leading-relaxed">
                 Transformamos o suporte passivo em uma máquina ativa de prospecção e vendas.
               </p>
               <div className="grid grid-cols-2 gap-8 text-center pt-8 border-t border-white/5">
                  <div>
                    <p className="text-4xl font-black text-primary">0s</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Tempo de Resposta</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-primary">100%</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Escalabilidade</p>
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
