
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Eye, TrendingUp, Users, Sparkles, Target, BarChart3 } from "lucide-react";

export default function GestaoSocialPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-16 md:pt-64 md:pb-24 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Gestão de Autoridade</Badge>
          <h1 className="font-headline text-5xl md:text-[8.5rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance">
            Redes como <span className="text-primary italic">Prova de Valor</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance">
            Construímos autoridade inquestionável através de curadoria estratégica e conteúdo desenhado para atrair o cliente ideal.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-32 bg-white relative">
        <div className="container mx-auto px-6 relative z-10 text-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center mb-32 md:mb-48">
            <div className="space-y-12">
              <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-8 text-foreground leading-[0.85]">Curadoria Estratégica</h2>
              <p className="text-xl md:text-2xl text-foreground/80 font-medium leading-relaxed tracking-tight">
                Esqueça postagens genéricas. Cada publicação em nossa gestão tem uma função clara: educar o cliente, eliminar objeções de preço e posicionar você como líder de nicho.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <Eye className="h-6 w-6" />, title: "Estética Premium", desc: "Um feed que comunica profissionalismo absoluto no primeiro olhar." },
                  { icon: <Target className="h-6 w-6" />, title: "Copywriting de Elite", desc: "Textos desenhados para conectar com as dores reais do seu público." },
                  { icon: <BarChart3 className="h-6 w-6" />, title: "Growth Qualificado", desc: "Foco em atrair audiência com real potencial de fechamento." },
                  { icon: <Users className="h-6 w-6" />, title: "Referência Social", desc: "Posicionamento que torna sua marca a primeira lembrança de busca." }
                ].map((item, i) => (
                  <div key={i} className="p-10 rounded-[3rem] bg-secondary border border-muted hover:border-primary/20 transition-all shadow-xl group">
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

            <div className="bg-[#0c0a1a] rounded-[5rem] p-12 md:p-16 text-white space-y-10 shadow-2xl relative overflow-hidden text-center">
               <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full" />
               <Sparkles className="h-20 w-20 text-primary mx-auto animate-pulse" />
               <h3 className="font-headline text-5xl font-black tracking-tighter">Narrativas que Vendem</h3>
               <p className="text-white/40 text-2xl font-medium leading-relaxed">
                 Sua marca não precisa de mais seguidores, ela precisa de autoridade reconhecida.
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
