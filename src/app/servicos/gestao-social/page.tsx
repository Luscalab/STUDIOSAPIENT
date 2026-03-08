
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, MessageSquare, Zap, ArrowRight, ShieldCheck, Users, Eye, TrendingUp, BarChart, PenTool } from "lucide-react";

export default function GestaoSocialPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Reputação & Presença</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Sua Empresa como <span className="text-white/70 italic">Desejo</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Não gerenciamos redes sociais; gerenciamos percepções. Transformamos seu perfil em uma vitrine que educa seu cliente e antecipa a venda.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">O Fim do Conteúdo Vazio</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Muitas empresas postam "porque precisam". Na Sapient, postamos porque queremos um resultado: autoridade, confiança ou venda. Cada post tem um papel no seu funil de lucro.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Eye className="text-primary" />, 
                    title: "Impacto Imediato", 
                    desc: "Seu feed deixará de ser uma bagunça para se tornar uma vitrine organizada e magnética." 
                  },
                  { 
                    icon: <MessageSquare className="text-primary" />, 
                    title: "Copywriting de Elite", 
                    desc: "Legendas que conectam com as dores do seu cliente e mostram que você é a solução definitiva." 
                  },
                  { 
                    icon: <TrendingUp className="text-primary" />, 
                    title: "Estratégia de Reels", 
                    desc: "Vídeos pensados para viralizar no público certo, aumentando seu alcance de forma orgânica e paga." 
                  },
                  { 
                    icon: <Users className="text-primary" />, 
                    title: "Comunidade Ativa", 
                    desc: "Fomentamos o desejo de marca para que seus seguidores se tornem verdadeiros defensores." 
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
                className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group"
              >
                Elevar meu Perfil <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-foreground rounded-[4rem] p-12 md:p-20 text-white space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
               <h3 className="font-headline text-4xl font-black tracking-tighter relative z-10">Nosso Fluxo de Autoridade</h3>
               <p className="text-white/60 font-medium relative z-10">
                 Trabalhamos com um cronograma rigoroso de 4 fases para garantir que sua marca nunca fique em silêncio e sempre gere valor.
               </p>
               <ul className="space-y-6 relative z-10">
                 {[
                   { t: "Fase 1: Diagnóstico", d: "Entendemos seu público, dores e tom de voz ideal." },
                   { t: "Fase 2: Curadoria", d: "Design de alto impacto e temas que geram autoridade." },
                   { t: "Fase 3: Execução", d: "Agendamento estratégico e monitoramento constante." },
                   { t: "Fase 4: Análise", d: "Relatórios de crescimento e melhoria contínua baseada em dados." }
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start gap-4">
                     <div className="h-2 w-2 bg-primary rounded-full mt-2 shrink-0" /> 
                     <div>
                       <p className="font-bold text-white">{item.t}</p>
                       <p className="text-sm text-white/50">{item.d}</p>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="max-w-5xl mx-auto py-20 bg-white rounded-[3rem] border border-primary/5 p-12 text-center space-y-12">
            <h3 className="font-headline text-3xl md:text-5xl font-black tracking-tighter">Muito Além de Curtidas</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              O objetivo final é a venda. Curtidas são métricas de vaidade se não trouxerem leads qualificados para o seu comercial. Nossa gestão foca em converter seguidores em clientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <PenTool className="h-10 w-10 text-primary mx-auto" />
                <h4 className="font-bold text-xl">Escrita que Vende</h4>
                <p className="text-sm text-muted-foreground">Copywriting focado em persuadir o cliente a tomar uma ação imediata.</p>
              </div>
              <div className="space-y-4">
                <BarChart className="h-10 w-10 text-primary mx-auto" />
                <h4 className="font-bold text-xl">Monitoramento</h4>
                <p className="text-sm text-muted-foreground">Acompanhamos o que funciona e descartamos o que não gera engajamento real.</p>
              </div>
              <div className="space-y-4">
                <Users className="h-10 w-10 text-primary mx-auto" />
                <h4 className="font-bold text-xl">Atração</h4>
                <p className="text-sm text-muted-foreground">Estratégias para atrair exatamente o perfil de público que pode pagar pelo seu serviço.</p>
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
