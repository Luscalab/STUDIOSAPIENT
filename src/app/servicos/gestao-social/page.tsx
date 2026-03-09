
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
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Reputação & Desejo de Marca</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Transforme Seu Perfil em uma <span className="text-white/70 italic">Vitrine de Autoridade</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              Suas redes sociais são a prova social mais poderosa do seu negócio. Transformamos perfis amadores em canais estratégicos que atraem clientes qualificados todos os dias.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Conteúdo com Propósito Real</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Esqueça as postagens por obrigação. Na Sapient, cada postagem tem uma função estratégica: educar o cliente, quebrar objeções de compra ou criar um interesse imediato pelo seu serviço.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Eye className="text-primary" />, 
                    title: "Curadoria Visual Estratégica", 
                    desc: "Um feed organizado e profissional que transmite solidez absoluta logo no primeiro segundo." 
                  },
                  { 
                    icon: <MessageSquare className="text-primary" />, 
                    title: "Escrita de Conversão", 
                    desc: "Legendas pensadas para conectar com as dores reais do seu cliente e oferecer a solução correta." 
                  },
                  { 
                    icon: <TrendingUp className="text-primary" />, 
                    title: "Crescimento Qualificado", 
                    desc: "Uso inteligente de algoritmos para atrair pessoas que realmente têm interesse no seu negócio." 
                  },
                  { 
                    icon: <Users className="text-primary" />, 
                    title: "Autoridade de Mercado", 
                    desc: "Posicionamos sua marca como referência no nicho, gerando confiança e reconhecimento." 
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
                Auditoria de Perfil <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-foreground rounded-[4rem] p-12 md:p-20 text-white space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
               <h3 className="font-headline text-4xl font-black tracking-tighter relative z-10">Método de Gestão</h3>
               <p className="text-white/60 font-medium relative z-10">
                 Trabalhamos com um cronograma rigoroso para que sua marca seja vista de forma consistente.
               </p>
               <ul className="space-y-8 relative z-10">
                 {[
                   { t: "01. Diagnóstico de Público", d: "Entendemos quem é seu cliente ideal e o que ele busca nas redes." },
                   { t: "02. Design de Impacto", d: "Criamos ativos visuais que destacam sua marca em qualquer feed." },
                   { t: "03. Cronograma Inteligente", d: "Agendamentos em horários estratégicos para máxima visibilidade." },
                   { t: "04. Relatórios de Performance", d: "Acompanhamos o crescimento e ajustamos a estratégia semanalmente." }
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
            <h3 className="font-headline text-3xl md:text-5xl font-black tracking-tighter">Muito Além de Métricas Sociais</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              O objetivo final é gerar negócio. Nossa gestão foca em converter seguidores em contatos qualificados prontos para o seu time comercial.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  <PenTool className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Escrita Persuasiva</h4>
                <p className="text-sm text-muted-foreground">Textos que guiam o cliente até o próximo passo da jornada de compra.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  <BarChart className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Gestão Analítica</h4>
                <p className="text-sm text-muted-foreground">Acompanhamento e análise de cada interação para otimizar o retorno.</p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-xl">Reconhecimento</h4>
                <p className="text-sm text-muted-foreground">Construção de uma comunidade que valoriza e recomenda seu serviço.</p>
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
