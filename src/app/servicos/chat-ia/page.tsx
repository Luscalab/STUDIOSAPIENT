
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Button } from "@/components/ui/button";
import { Cpu, ArrowRight, BarChart, Smartphone, ShieldCheck, Zap, BrainCircuit, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ChatIAPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Consistência de Intervalo */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Ecossistemas Autônomos</Badge>
          <h1 className="font-headline text-5xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Inteligência que <span className="text-primary italic">Atende e Vende</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-medium max-w-4xl mx-auto leading-relaxed tracking-tight text-balance">
            Agentes inteligentes treinados na sua expertise exclusiva para atender, qualificar e converter leads 24/7, sem interrupções ou falhas humanas.
          </p>
        </div>
      </section>

      {/* ROI & Content Section - Fundo Branco com Contraste */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center mb-32">
            <div className="space-y-12">
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">Atendimento Digital <br/>de Elite.</h2>
              <p className="text-xl text-foreground/80 font-medium leading-relaxed tracking-tight">
                No digital, 5 minutos de demora podem significar a perda de um contrato de alto valor. Nossos ecossistemas de Chat IA garantem resposta imediata e precisão técnica cirúrgica em cada interação.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { icon: <Smartphone className="h-8 w-8" />, title: "WhatsApp Oficial", desc: "Integração via API oficial com agentes que mantêm o tom de voz da sua marca." },
                  { icon: <Cpu className="h-8 w-8" />, title: "Cérebro Proprietário", desc: "Sua IA é alimentada com seus manuais, processos e know-how técnico." },
                  { icon: <BarChart className="h-8 w-8" />, title: "Filtro de Qualificação", desc: "Identificação automática de leads prontos, separando curiosos de reais oportunidades." },
                  { icon: <Zap className="h-8 w-8" />, title: "Conversão 24/7", desc: "Sua empresa nunca para. Atendimento técnico ininterrupto, feriados e madrugadas." }
                ].map((item, i) => (
                  <div key={i} className="p-10 rounded-[3.5rem] bg-secondary/20 border border-muted/10 hover:bg-white hover:shadow-2xl transition-all group duration-500">
                    <div className="mb-8 p-5 rounded-2xl bg-white w-fit text-primary border border-muted/10 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-2xl mb-3 tracking-tight text-foreground leading-none uppercase">{item.title}</h3>
                    <p className="text-lg text-foreground/60 font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleOpenChat} className="h-24 px-12 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all w-full sm:w-auto group">
                Simular Diagnóstico IA <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-12 md:p-24 text-white space-y-20 relative overflow-hidden shadow-2xl border border-white/5">
               <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
               <BrainCircuit className="h-20 w-20 text-primary mx-auto animate-bounce" />
               <div className="text-center space-y-6">
                 <h3 className="font-headline text-5xl font-black tracking-tighter leading-none">Métricas de Automação</h3>
                 <p className="text-white/40 text-xl font-medium">Sua marca, operando em escala infinita.</p>
               </div>
               
               <div className="grid grid-cols-1 gap-12">
                  {[
                    { label: "Tempo de Resposta", value: "0.2s", icon: <Zap size={18} /> },
                    { label: "Precisão Técnica", value: "99.8%", icon: <ShieldCheck size={18} /> },
                    { label: "Redução de Custo Operacional", value: "65%", icon: <BarChart size={18} /> }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-10 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:border-primary/50 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="text-primary group-hover:scale-125 transition-transform">{stat.icon}</div>
                        <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/60">{stat.label}</span>
                      </div>
                      <span className="text-4xl font-black text-white tracking-tighter">{stat.value}</span>
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

