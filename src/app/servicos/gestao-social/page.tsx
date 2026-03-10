
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Eye, TrendingUp, Users, Sparkles, Target, BarChart3, Palette, Share2 } from "lucide-react";

export default function GestaoSocialPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Intervalo Ajustado */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Gestão de Autoridade</Badge>
          <h1 className="font-headline text-5xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Redes como <span className="text-primary italic">Prova de Valor</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance">
            Construímos autoridade inquestionável através de curadoria estratégica e conteúdo desenhado para atrair e educar o cliente ideal.
          </p>
        </div>
      </section>

      {/* Strategy Content */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10 text-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-12">
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">Curadoria de <br/>Alto Impacto.</h2>
              <p className="text-xl text-foreground/80 font-medium leading-relaxed tracking-tight">
                Esqueça postagens genéricas. Cada publicação em nossa gestão tem uma função clara: educar o cliente, eliminar objeções de preço e posicionar sua marca como a escolha óbvia do mercado.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <Palette className="h-6 w-6" />, title: "Estética Premium", desc: "Um feed que comunica profissionalismo absoluto no primeiro segundo." },
                  { icon: <Target className="h-6 w-6" />, title: "Copywriting de Elite", desc: "Textos desenhados para conectar com as dores reais do seu público de luxo." },
                  { icon: <BarChart3 className="h-6 w-6" />, title: "Growth Qualificado", desc: "Foco em atrair audiência com real potencial de fechamento." },
                  { icon: <Share2 className="h-6 w-6" />, title: "Viralidade Técnica", desc: "Conteúdo compartilhável que reforça sua liderança e autoridade." }
                ].map((item, i) => (
                  <div key={i} className="p-10 rounded-[3rem] bg-secondary/30 border border-muted hover:border-primary/20 transition-all group">
                    <div className="mb-6 p-4 rounded-xl bg-white w-fit text-primary border border-muted/10 group-hover:bg-primary group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-xl mb-3 tracking-tight text-foreground">{item.title}</h3>
                    <p className="text-base text-foreground/60 font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleOpenChat} className="h-20 px-12 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all group">
                Auditoria de Perfil IA <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-12 md:p-20 text-white space-y-12 shadow-2xl relative overflow-hidden border border-white/5 text-center">
               <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
               <Sparkles className="h-16 w-16 text-primary mx-auto animate-pulse" />
               <h3 className="font-headline text-5xl font-black tracking-tighter">Narrativas que Vendem</h3>
               <p className="text-white/40 text-xl font-medium leading-relaxed">
                 Sua marca não precisa de mais seguidores, ela precisa de autoridade reconhecida pelos decisores certos.
               </p>
               
               <div className="space-y-8 pt-10 border-t border-white/5 text-left">
                  {[
                    { label: "Engajamento Qualificado", value: "82%" },
                    { label: "Percepção de Autoridade", value: "95%" },
                    { label: "Retenção de Audiência", value: "74%" }
                  ].map((bar, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                         <span>{bar.label}</span>
                         <span>{bar.value}</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: bar.value }} />
                       </div>
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
