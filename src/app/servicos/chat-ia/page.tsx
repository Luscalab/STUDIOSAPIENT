'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Zap, ArrowRight, Cpu, BarChart, Sparkles, Smartphone } from "lucide-react";

export default function ChatIAPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-64 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-12 bg-white/10 text-white border-white/20 px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md">Engenharia Cognitiva</Badge>
            <h1 className="font-headline text-6xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-12 text-balance">
              Inteligência que <span className="text-primary italic">Vende por Você</span>
            </h1>
            <p className="text-2xl md:text-4xl text-white/50 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance">
              Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7 no WhatsApp, Site e Redes Sociais.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-64 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-64">
            <div className="space-y-16">
              <div>
                <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-12 text-foreground leading-[0.85]">Atendimento Sem Gargalos</h2>
                <p className="text-xl md:text-3xl text-muted-foreground/60 font-medium leading-relaxed tracking-tight">
                  Não perca vendas por demora no atendimento. Nossos ecossistemas de Chat IA garantem resposta imediata e precisão técnica em cada interação.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { 
                    icon: <Smartphone className="text-primary h-8 w-8" />, 
                    title: "WhatsApp Inteligente", 
                    desc: "Automação oficial via API com agentes que entendem o contexto." 
                  },
                  { 
                    icon: <Cpu className="text-primary h-8 w-8" />, 
                    title: "Cérebro Próprio", 
                    desc: "IA treinada exclusivamente com seus manuais e diferenciais." 
                  },
                  { 
                    icon: <BarChart className="text-primary h-8 w-8" />, 
                    title: "Qualificação de Leads", 
                    desc: "Filtro automático que entrega apenas contatos prontos para o comercial." 
                  },
                  { 
                    icon: <Sparkles className="text-primary h-8 w-8" />, 
                    title: "Performance IA", 
                    desc: "Sincronização imediata de dados para máxima eficiência." 
                  }
                ].map((item, i) => (
                  <div key={i} className="p-12 rounded-[3.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all duration-700 shadow-xl group">
                    <div className="mb-8 p-6 rounded-2xl bg-white w-fit group-hover:bg-primary group-hover:text-white transition-all">{item.icon}</div>
                    <h3 className="font-black text-2xl mb-4 tracking-tighter text-foreground leading-none">{item.title}</h3>
                    <p className="text-lg text-muted-foreground/50 font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleOpenChat}
                className="h-24 px-16 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-2xl shadow-primary/20 group w-full sm:w-auto"
              >
                Simular Agente IA <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-16 md:p-32 text-white space-y-16 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
               <h3 className="font-headline text-5xl font-black tracking-tighter relative z-10 leading-none">Omnichannel 4.0</h3>
               <p className="text-white/40 text-2xl font-medium relative z-10">
                 Sua marca presente e inteligente onde o seu cliente estiver.
               </p>
               <ul className="space-y-12 relative z-10">
                 {[
                   { t: "WhatsApp Business", d: "Agentes treinados para conversão e agendamento direto." },
                   { t: "Web Chat (Site)", d: "Assistente de navegação focado em tirar dúvidas." },
                   { t: "Instagram DM", d: "Respostas inteligentes que mantêm o engajamento alto." }
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start gap-8">
                     <div className="h-3 w-3 bg-primary rounded-full mt-4 shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.8)]" /> 
                     <div>
                       <p className="font-black text-white text-3xl tracking-tighter leading-none mb-2">{item.t}</p>
                       <p className="text-xl text-white/30 font-medium leading-relaxed">{item.d}</p>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="max-w-6xl mx-auto py-32 bg-secondary rounded-[5rem] p-16 md:p-32 text-center space-y-20 shadow-xl border border-muted">
            <h3 className="font-headline text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-none">Performance Mensurável</h3>
            <p className="text-2xl md:text-3xl text-muted-foreground/60 max-w-4xl mx-auto font-medium leading-relaxed">
              Transformamos o custo de atendimento em receita previsível. Menos tempo de espera, mais contratos assinados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-12">
              <div className="space-y-8">
                <div className="h-24 w-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary border border-primary/20">
                  <Zap className="h-10 w-10" />
                </div>
                <h4 className="font-black text-3xl tracking-tighter leading-none">Rapidez Total</h4>
                <p className="text-lg text-muted-foreground/40 font-medium">Tempo de resposta zero 24/7.</p>
              </div>
              <div className="space-y-8">
                <div className="h-24 w-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary border border-primary/20">
                  <BarChart className="h-10 w-10" />
                </div>
                <h4 className="font-black text-3xl tracking-tighter leading-none">ROI em IA</h4>
                <p className="text-lg text-muted-foreground/40 font-medium">Aumento na taxa de conversão direta.</p>
              </div>
              <div className="space-y-8">
                <div className="h-24 w-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary border border-primary/20">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h4 className="font-black text-3xl tracking-tighter leading-none">Filtro de Elite</h4>
                <p className="text-lg text-muted-foreground/40 font-medium">Foco absoluto em leads qualificados.</p>
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