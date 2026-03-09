
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, MessageSquare, Zap, ArrowRight, ShieldCheck, Users, Eye, TrendingUp, BarChart, PenTool, CheckCircle2, Sparkles } from "lucide-react";

export default function GestaoSocialPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Curadoria de Autoridade</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Redes Sociais como <span className="text-white/70 italic">Prova de Valor</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              Suas redes são o dossiê público da sua competência. Não postamos por volume; construímos autoridade inquestionável através de curadoria estratégica.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Narrativas de Conversão</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Cada publicação tem uma função de engenharia comercial: educar o cliente, eliminar barreiras de preço e posicionar sua solução como a única viável.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Eye className="text-primary" />, 
                    title: "Estética de Autoridade", 
                    desc: "Um feed que comunica profissionalismo absoluto desde o primeiro milissegundo de contato." 
                  },
                  { 
                    icon: <MessageSquare className="text-primary" />, 
                    title: "Copywriting Estratégico", 
                    desc: "Legendas técnicas desenhadas para conectar com as dores reais do seu nicho de atuação." 
                  },
                  { 
                    icon: <TrendingUp className="text-primary" />, 
                    title: "Growth Qualificado", 
                    desc: "Foco em atrair contatos que possuem real potencial de contratação, não apenas números vazios." 
                  },
                  { 
                    icon: <Users className="text-primary" />, 
                    title: "Referência Local", 
                    desc: "Posicionamento que torna sua marca a primeira lembrança quando o serviço é necessário." 
                  }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white shadow-sm border border-primary/5 hover:bg-primary/5 transition-all duration-500">
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
                Auditoria de Autoridade <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-foreground rounded-[4rem] p-12 md:p-20 text-white space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
               <h3 className="font-headline text-4xl font-black tracking-tighter relative z-10">Metodologia Sapient</h3>
               <p className="text-white/60 font-medium relative z-10">
                 Operamos com um rigor técnico que garante consistência e clareza em todas as frentes.
               </p>
               <ul className="space-y-8 relative z-10">
                 {[
                   { t: "01. Análise de Gargalos", d: "Identificamos por que suas redes atuais não estão convertendo autoridade." },
                   { t: "02. Design de Impacto", d: "Criação de ativos visuais que elevam o padrão estético do seu nicho." },
                   { t: "03. Cronograma Consultivo", d: "Postagens alinhadas ao calendário de vendas e objetivos de negócio." },
                   { t: "04. Métricas de Valor", d: "Acompanhamos volume de leads e engajamento qualificado." }
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start gap-4">
                     <div className="h-2 w-2 bg-primary rounded-full mt-2 shrink-0" /> 
                     <div>
                       <p className="font-bold text-white text-lg">{item.t}</p>
                       <p className="text-sm text-white/50">{item.d}</p>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="max-w-5xl mx-auto py-24 bg-white rounded-[4rem] border border-primary/10 p-12 md:p-24 text-center space-y-12 shadow-sm">
            <h3 className="font-headline text-3xl md:text-5xl font-black tracking-tighter">Resultados Tangíveis</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              O objetivo final é facilitar o fechamento comercial. Transformamos seguidores em clientes prontos para a negociação.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  <PenTool className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Escrita que Vende</h4>
                <p className="text-sm text-muted-foreground">Textos técnicos simplificados para máxima compreensão e desejo.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  <BarChart className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Gestão de Dados</h4>
                <p className="text-sm text-muted-foreground">Otimização baseada em performance e comportamento do público.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Desejo de Marca</h4>
                <p className="text-sm text-muted-foreground">Construção de uma comunidade fiel que valoriza seu conhecimento.</p>
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
