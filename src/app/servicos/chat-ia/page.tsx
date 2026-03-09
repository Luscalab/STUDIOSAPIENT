
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, Cpu, BarChart, Sparkles, Smartphone } from "lucide-react";

export default function ChatIAPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-64 pb-32 md:pt-80 md:pb-64 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="font-headline text-6xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-12 text-balance">
            Inteligência que <span className="text-primary italic">Atende e Vende</span>
          </h1>
          <p className="text-2xl md:text-4xl text-white/50 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance">
            Agentes inteligentes treinados na sua expertise para atender, qualificar e converter leads 24/7.
          </p>
        </div>
      </section>

      <section className="py-32 md:py-64 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-64">
            <div className="space-y-16">
              <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-12 text-foreground leading-[0.85]">Atendimento Sem Espera</h2>
              <p className="text-xl md:text-3xl text-foreground/80 font-medium leading-relaxed tracking-tight">
                Não perca vendas por demora. Nossos ecossistemas de Chat IA garantem resposta imediata e precisão técnica em cada interação.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { icon: <Smartphone className="text-primary h-8 w-8" />, title: "WhatsApp Business", desc: "Automação via API com agentes inteligentes." },
                  { icon: <Cpu className="text-primary h-8 w-8" />, title: "Treinamento Exclusivo", desc: "IA alimentada com seus manuais e processos." },
                  { icon: <BarChart className="text-primary h-8 w-8" />, title: "Filtro de Leads", desc: "Qualificação automática para o time comercial." },
                  { icon: <Sparkles className="text-primary h-8 w-8" />, title: "Performance 24/7", desc: "Atendimento imediato a qualquer hora do dia." }
                ].map((item, i) => (
                  <div key={i} className="p-12 rounded-[3.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all shadow-xl group">
                    <div className="mb-8 p-6 rounded-2xl bg-white w-fit text-primary transition-all border border-muted/10">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-2xl mb-4 tracking-tighter text-foreground leading-none">{item.title}</h3>
                    <p className="text-lg text-foreground/60 font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleOpenChat} className="h-24 px-16 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all w-full sm:w-auto group">
                Simular Agente IA <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-16 md:p-32 text-white space-y-16 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
               <Bot className="h-20 w-20 text-primary mx-auto animate-bounce" />
               <h3 className="font-headline text-5xl font-black text-center tracking-tighter">Presença Digital</h3>
               <p className="text-white/40 text-2xl text-center font-medium">
                 Sua marca presente e inteligente onde o seu cliente estiver.
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
