'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Users, MessageSquare, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function GestaoSocialPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Social Authority & Trust</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Gestão de <span className="text-white/70 italic">Autoridade</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Sua rede social não é apenas para postar fotos. É o ambiente onde sua autoridade é construída e sua audiência é educada para a compra.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Conteúdo de Alto Impacto</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  No cenário digital, se você não é visto como uma referência, você é comparado pelo preço. Nossa gestão foca em transformar sua presença social em um ativo de venda.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <ShieldCheck className="text-primary" />, title: "Autoridade Social", desc: "Estratégias de posicionamento que garantem que sua marca seja respeitada no mercado." },
                  { icon: <MessageSquare className="text-primary" />, title: "Copywriting Persuasivo", desc: "Textos desenhados para gerar desejo, resolver objeções e acelerar a decisão do cliente." },
                  { icon: <Zap className="text-primary" />, title: "Growth & Engagement", desc: "Foco no crescimento orgânico qualificado e na retenção de uma audiência engajada." },
                  { icon: <Share2 className="text-primary" />, title: "Curadoria Estética", desc: "Design focado em transmitir profissionalismo e sofisticação em cada publicação." }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white shadow-sm border border-primary/5 hover:bg-primary/5 transition-all duration-500">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-foreground rounded-[4rem] p-12 md:p-20 text-white space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
               <h3 className="font-headline text-4xl font-black tracking-tighter relative z-10">Dossiê Estratégico</h3>
               <p className="text-white/60 font-medium relative z-10">
                 Nossa metodologia envolve um acompanhamento rigoroso para garantir que cada postagem tenha um objetivo comercial claro.
               </p>
               <ul className="space-y-6 relative z-10">
                 {["Planejamento Narrativo Mensal", "Direção de Arte Exclusiva", "Monitoramento de Reputação", "Análise de Performance Social"].map((text, idx) => (
                   <li key={idx} className="flex items-center gap-4 text-white/80 font-medium">
                     <div className="h-2 w-2 bg-primary rounded-full" /> {text}
                   </li>
                 ))}
               </ul>
               <Button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
                className="w-full h-20 text-lg font-black bg-white text-primary rounded-full uppercase tracking-widest relative z-10 hover:bg-white/90"
               >
                 Falar com Consultor
               </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
