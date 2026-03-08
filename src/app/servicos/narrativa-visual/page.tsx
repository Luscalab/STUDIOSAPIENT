
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Lightbulb, CheckCircle2, ArrowRight, FileText, LayoutTemplate, BrainCircuit, Search, Info, MessageSquareText } from "lucide-react";

export default function NarrativaVisualPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Clareza & Cognição</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Simplicidade que <span className="text-white/70 italic">Convence</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Se o seu cliente não entende o seu processo, ele não compra. Transformamos informações complexas em imagens que educam e aceleram a decisão de compra.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Educar para Vender</h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
              Muitos negócios perdem vendas por "excesso de informação" ou linguagem difícil. Nosso trabalho é filtrar o que é essencial e apresentar de forma visualmente impecável. O cérebro humano processa imagens 60.000 vezes mais rápido que textos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              { 
                icon: <BrainCircuit className="h-10 w-10" />, 
                title: "Mapa de Valor", 
                desc: "Desenhamos o fluxo do seu serviço para que o cliente veja o benefício final logo no primeiro olhar." 
              },
              { 
                icon: <FileText className="h-10 w-10" />, 
                title: "Apresentações Impecáveis", 
                desc: "Design de slides e propostas que prendem a atenção e transmitem organização extrema." 
              },
              { 
                icon: <Lightbulb className="h-10 w-10" />, 
                title: "Infográficos de Autoridade", 
                desc: "Transformamos números em histórias visuais que provam seus resultados sem cansar o público." 
              }
            ].map((card, i) => (
              <div key={i} className="card-premium-bg p-12 rounded-[3.5rem] text-center space-y-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                  {card.icon}
                </div>
                <h3 className="font-bold text-2xl tracking-tighter">{card.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
             <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-8">
               <Info className="h-10 w-10 text-primary" />
               <h3 className="text-3xl font-black tracking-tighter">O Problema do 'Expert'</h3>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Como você domina o seu assunto, é comum explicar de forma técnica demais. Nós agimos como o olhar do seu cliente: simplificamos a mensagem para que ela seja absorvida instantaneamente.
               </p>
             </div>
             <div className="p-12 bg-white rounded-[3rem] border border-primary/5 space-y-8">
               <MessageSquareText className="h-10 w-10 text-primary" />
               <h3 className="text-3xl font-black tracking-tighter">Venda Silenciosa</h3>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Um bom infográfico ou mapa visual "vende sozinho" em uma proposta enviada por PDF. Ele tira as dúvidas do cliente antes mesmo dele perguntar.
               </p>
             </div>
          </div>

          <div className="p-12 md:p-24 bg-white rounded-[4rem] border border-primary/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-primary">
              <BarChart3 className="h-64 w-64" />
            </div>
            <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
              <div className="flex-1 space-y-8">
                <h3 className="font-headline text-3xl md:text-4xl font-black tracking-tighter">O Poder da Visualização</h3>
                <div className="space-y-6">
                  {[
                    "Transformação de dados brutos em inteligência visual.",
                    "Clareza total sobre o 'Porquê' o cliente deve escolher você.",
                    "Design focado em prender a atenção do tomador de decisão.",
                    "Aumento imediato na confiança percebida da marca."
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-lg font-bold text-muted-foreground/80">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> {benefit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 text-center md:text-right">
                <p className="text-2xl font-medium text-muted-foreground mb-10 leading-relaxed italic">
                  "Quem explica melhor, vende mais."
                </p>
                <Button 
                  onClick={handleOpenChat}
                  className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  Clarificar meu Negócio
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
