
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Lightbulb, CheckCircle2, ArrowRight, FileText, BrainCircuit, Info, MessageSquareText, Search, Sparkles } from "lucide-react";

export default function NarrativaVisualPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Engenharia de Clareza</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Onde a Complexidade <span className="text-white/70 italic">se torna Valor</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              Transformamos dados técnicos e processos complexos em narrativas visuais de alta cognição. Quem explica melhor, domina o mercado.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Clareza gera Confiança</h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
              Muitos negócios perdem vendas porque o cliente não entende o real valor do que está comprando. Nossa engenharia visual traduz sua expertise em desejo de compra imediato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {[
              { 
                icon: <BrainCircuit className="h-10 w-10" />, 
                title: "Infográficos de Valor", 
                desc: "Desenhamos o passo a passo do seu método para que o benefício final seja indiscutível." 
              },
              { 
                icon: <FileText className="h-10 w-10" />, 
                title: "Propostas de Autoridade", 
                desc: "Apresentações comerciais desenhadas para prender a atenção de tomadores de decisão qualificados." 
              },
              { 
                icon: <Lightbulb className="h-10 w-10" />, 
                title: "Data Visualization", 
                desc: "Transformamos resultados abstratos em provas visuais de competência e solidez técnica." 
              }
            ].map((card, i) => (
              <div key={i} className="card-premium-bg p-12 rounded-[3.5rem] text-center space-y-6 flex flex-col items-center hover:scale-105 transition-all">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                  {card.icon}
                </div>
                <h3 className="font-bold text-2xl tracking-tighter">{card.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-40">
             <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-8 hover:border-primary/20 transition-all shadow-sm">
               <div className="flex items-center gap-4">
                 <Info className="h-10 w-10 text-primary" />
                 <h3 className="text-3xl font-black tracking-tighter">Elimine o "Ruído Técnico"</h3>
               </div>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 O cliente médio ignora o que ele não entende. Atuamos como o filtro de clareza do seu negócio, garantindo que seu diferencial seja absorvido instantaneamente.
               </p>
               <ul className="space-y-3 text-sm font-bold text-muted-foreground/60">
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Redução de barreiras cognitivas</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Foco no "Porquê" em vez do "Como"</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Organização lógica da autoridade</li>
               </ul>
             </div>
             <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-8 hover:border-primary/20 transition-all shadow-sm">
               <div className="flex items-center gap-4">
                 <MessageSquareText className="h-10 w-10 text-primary" />
                 <h3 className="text-3xl font-black tracking-tighter">Venda Sem Falar</h3>
               </div>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Um material de narrativa visual bem estruturado educa o cliente antes mesmo da primeira reunião. Isso encurta o caminho até o contrato assinado.
               </p>
               <ul className="space-y-3 text-sm font-bold text-muted-foreground/60">
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Dossiês de impacto comercial</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Landing Pages de alta compreensão</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Materiais de apoio para vendas</li>
               </ul>
             </div>
          </div>

          <div className="p-12 md:p-24 bg-white rounded-[4rem] border border-primary/10 shadow-sm relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-primary">
              <BarChart3 className="h-64 w-64" />
            </div>
            <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
              <div className="flex-1 space-y-8">
                <h3 className="font-headline text-3xl md:text-5xl font-black tracking-tighter">Clareza é a Nova Autoridade</h3>
                <div className="space-y-6">
                  {[
                    "Transforme seu método técnico em ativos de venda.",
                    "Diferencie-se pela capacidade de simplificar o valor.",
                    "Design focado em prender a atenção de decisores.",
                    "Aumento imediato na percepção de valor e preço."
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-lg font-bold text-muted-foreground/80">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> {benefit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center md:items-end">
                <p className="text-2xl font-medium text-muted-foreground mb-10 leading-relaxed italic text-balance">
                  "Onde existe clareza, a decisão de compra é natural."
                </p>
                <Button 
                  onClick={handleOpenChat}
                  className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 w-full sm:w-auto"
                >
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
