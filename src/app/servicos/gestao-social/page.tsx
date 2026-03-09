
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Eye, TrendingUp, Users, BarChart, PenTool, Sparkles } from "lucide-react";

export default function GestaoSocialPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#0c0a1a]">
      <Navbar />
      
      <section className="relative pt-64 pb-24 md:pt-80 md:pb-48 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Estratégia de Autoridade</Badge>
          <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
            Redes como <span className="text-primary italic">Prova de Valor</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
            Construímos autoridade inquestionável através de curadoria estratégica e conteúdo de alto impacto.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white relative">
        <div className="container mx-auto px-6 relative z-10 text-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-12">
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Narrativas de Conversão</h2>
              <p className="text-lg md:text-xl text-muted-foreground/60 font-medium leading-relaxed tracking-tight">
                Cada publicação tem uma função estratégica: educar o cliente, eliminar barreiras e posicionar você como autoridade.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Eye className="text-primary" />, title: "Estética de Autoridade", desc: "Um feed que comunica profissionalismo absoluto." },
                  { icon: <MessageSquare className="text-primary" />, title: "Copywriting Estratégico", desc: "Textos desenhados para conectar com as dores do seu nicho." },
                  { icon: <TrendingUp className="text-primary" />, title: "Growth Qualificado", desc: "Foco em atrair contatos com real potencial de compra." },
                  { icon: <Users className="text-primary" />, title: "Referência de Mercado", desc: "Posicionamento que torna sua marca a primeira lembrança." }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-secondary border border-muted hover:border-primary/20 transition-all shadow-xl">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground/50 font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleOpenChat} className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl group">
                Auditoria de Autoridade <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[4rem] p-12 text-white space-y-10 shadow-2xl relative overflow-hidden text-center">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
               <Sparkles className="h-16 w-16 text-primary mx-auto" />
               <h3 className="font-headline text-4xl font-black tracking-tighter">Metodologia Sapient</h3>
               <p className="text-white/40 font-medium">
                 Curadoria rigorosa que garante consistência e clareza em todas as frentes sociais.
               </p>
               <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
