
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, BarChart3, Palette, Share2 } from "lucide-react";

export default function GestaoSocialPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-20 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Gestão de Autoridade</Badge>
          <h1 className="font-headline text-5xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Redes como <span className="text-primary italic">Prova de Valor</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance">
            Construímos autoridade inquestionável através de curadoria estratégica e conteúdo desenhado para atrair o cliente ideal.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-12">
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-[#08070b] leading-[0.85]">Curadoria de <br/>Alto Impacto.</h2>
              <p className="text-xl text-[#08070b]/70 font-medium leading-relaxed tracking-tight">
                Esqueça postagens genéricas. Cada publicação em nossa gestão tem uma função clara: educar o cliente e posicionar sua marca como a escolha óbvia.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { icon: <Palette className="h-8 w-8" />, title: "Estética Premium", desc: "Um feed que comunica profissionalismo absoluto no primeiro segundo." },
                  { icon: <Target className="h-8 w-8" />, title: "Copywriting de Elite", desc: "Textos desenhados para conectar com as dores reais do seu público." },
                  { icon: <BarChart3 className="h-8 w-8" />, title: "Growth Qualificado", desc: "Foco em atrair audiência com real potencial de fechamento." },
                  { icon: <Share2 className="h-8 w-8" />, title: "Viralidade Técnica", desc: "Conteúdo compartilhável que reforça sua liderança e autoridade." }
                ].map((item, i) => (
                  <div key={i} className="p-12 rounded-[4rem] bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-2xl transition-all group duration-500">
                    <div className="mb-8 p-5 rounded-2xl bg-white w-fit text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-2xl mb-3 tracking-tight text-[#08070b] uppercase leading-none">{item.title}</h3>
                    <p className="text-lg text-[#08070b]/60 font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleOpenChat} className="h-24 px-12 text-[11px] font-black bg-primary text-white rounded-full uppercase tracking-[0.5em] shadow-2xl hover:bg-primary/90 transition-all group">
                Auditoria de Perfil IA <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="bg-[#0c0a1a] rounded-[5rem] p-12 md:p-24 text-white space-y-16 shadow-2xl relative overflow-hidden border border-white/5 text-center">
               <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] rounded-full" />
               <Sparkles className="h-20 w-20 text-primary mx-auto animate-pulse relative z-10" />
               <h3 className="font-headline text-5xl font-black tracking-tighter relative z-10">Narrativas que Vendem</h3>
               <p className="text-white/40 text-xl font-medium leading-relaxed relative z-10">
                 Sua marca não precisa de mais seguidores, ela precisa de autoridade reconhecida pelos decisores.
               </p>
               
               <div className="space-y-12 pt-12 border-t border-white/10 text-left relative z-10">
                  {[
                    { label: "Engajamento Qualificado", value: "82%" },
                    { label: "Percepção de Autoridade", value: "95%" },
                    { label: "Retenção de Audiência", value: "74%" }
                  ].map((bar, i) => (
                    <div key={i} className="space-y-4">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                         <span>{bar.label}</span>
                         <span>{bar.value}</span>
                       </div>
                       <div className="h-2 bg-white/5 rounded-full overflow-hidden">
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
