
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Zap, ArrowRight, ShieldCheck, Database, Cpu, MessageCircle, BarChart, CheckCircle2, Sparkles, Smartphone } from "lucide-react";

export default function ChatIAPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Engenharia Cognitiva</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Inteligência que <span className="text-white/70 italic">Vende por Você</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7 no WhatsApp, Site e Redes Sociais.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Atendimento Sem Gargalos</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Não perca vendas por demora no atendimento. Nossos ecossistemas de Chat IA garantem resposta imediata e precisão técnica em cada interação.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Smartphone className="text-cyan-500" />, 
                    title: "WhatsApp Inteligente", 
                    desc: "Automação oficial via API com agentes que entendem o contexto e fecham negócios." 
                  },
                  { 
                    icon: <Cpu className="text-cyan-500" />, 
                    title: "Cérebro Próprio", 
                    desc: "IA treinada exclusivamente com seus manuais, tabelas de preços e diferenciais de marca." 
                  },
                  { 
                    icon: <BarChart className="text-cyan-500" />, 
                    title: "Qualificação de Leads", 
                    desc: "Filtro automático que entrega apenas os contatos prontos para o fechamento comercial." 
                  },
                  { 
                    icon: <Database className="text-cyan-500" />, 
                    title: "Integração CRM", 
                    desc: "Dados sincronizados instantaneamente com suas ferramentas de gestão de vendas." 
                  }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white shadow-sm border border-primary/5 hover:bg-cyan-50 transition-all duration-500">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleOpenChat}
                className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group w-full sm:w-auto"
              >
                Simular Agente IA <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-foreground rounded-[4rem] p-12 md:p-20 text-white space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
               <h3 className="font-headline text-4xl font-black tracking-tighter relative z-10">Omnichannel 4.0</h3>
               <p className="text-white/60 font-medium relative z-10">
                 Sua marca presente e inteligente onde o seu cliente estiver.
               </p>
               <ul className="space-y-8 relative z-10">
                 {[
                   { t: "WhatsApp Business", d: "Agentes treinados para conversão e agendamento direto." },
                   { t: "Web Chat (Site)", d: "Assistente de navegação focado em tirar dúvidas e captar dados." },
                   { t: "Instagram DM", d: "Respostas automáticas inteligentes que mantêm o engajamento alto." },
                   { t: "Escalabilidade Infinita", d: "Atenda 1 ou 1.000 clientes simultaneamente com a mesma precisão." }
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start gap-4">
                     <div className="h-2 w-2 bg-cyan-500 rounded-full mt-2 shrink-0" /> 
                     <div>
                       <p className="font-bold text-white text-lg">{item.t}</p>
                       <p className="text-sm text-white/50">{item.d}</p>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="max-w-5xl mx-auto py-24 bg-white rounded-[4rem] border border-cyan-500/10 p-12 md:p-24 text-center space-y-12 shadow-sm">
            <h3 className="font-headline text-3xl md:text-5xl font-black tracking-tighter">Performance Mensurável</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              Transformamos o custo de atendimento em receita previsível. Menos tempo de espera, mais contratos assinados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto text-cyan-500">
                  <Zap className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Rapidez Total</h4>
                <p className="text-sm text-muted-foreground">Tempo de resposta zero em qualquer hora do dia ou da noite.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto text-cyan-500">
                  <BarChart className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">ROI em IA</h4>
                <p className="text-sm text-muted-foreground">Aumento significativo na taxa de conversão de leads frios.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto text-cyan-500">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Filtro de Elite</h4>
                <p className="text-sm text-muted-foreground">Sua equipe comercial foca apenas nos leads qualificados pela IA.</p>
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
