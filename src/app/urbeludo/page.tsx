
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Cpu, Mic, Move, Zap, ArrowRight, Sparkles, Database, BarChart3, HeartPulse } from "lucide-react";

export default function UrbeLudoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      {/* Hero Section - UrbeLudo */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-cyan-500/20 text-cyan-200 border-cyan-500/30 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md animate-pulse">
              Biofeedback & Engenharia Cognitiva
            </Badge>
            <h1 className="font-headline text-5xl md:text-9xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Urbe<span className="text-cyan-400 italic">Ludo</span>
            </h1>
            <h2 className="text-2xl md:text-4xl text-white/80 font-medium max-w-3xl mx-auto leading-tight tracking-tight text-balance mb-12">
              A Próxima Fronteira da <span className="text-white font-bold underline decoration-cyan-500/50 underline-offset-8">Reabilitação Clínica</span>.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Badge variant="outline" className="border-white/20 text-white/60 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-full">
                [ EM BREVE ]
              </Badge>
              <Button 
                onClick={handleOpenChat}
                className="h-16 px-10 bg-white text-primary hover:bg-cyan-50 rounded-full font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105"
              >
                Saber Mais <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fbfaff] to-transparent" />
      </section>

      {/* Main Content Section */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="h-1 w-20 bg-cyan-500 rounded-full" />
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  Ecossistema de <br />
                  <span className="text-primary">Biofeedback.</span>
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  O UrbeLudo não é apenas uma plataforma; é um ecossistema projetado para potencializar metodologias institucionais.
                </p>
              </div>

              <div className="prose prose-xl max-w-none text-muted-foreground/80 font-medium leading-relaxed">
                <p>
                  Da psicomotricidade à fonoaudiologia, estamos transformando o movimento do corpo e a emissão vocal em dados interativos e resultados mensuráveis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                {[
                  { 
                    icon: <Activity className="text-cyan-500" />, 
                    title: "Psicomotricidade", 
                    desc: "Análise de padrões de movimento em tempo real para reabilitação motora." 
                  },
                  { 
                    icon: <Mic className="text-cyan-500" />, 
                    title: "Fonoaudiologia", 
                    desc: "Processamento de emissão vocal transformado em feedback visual interativo." 
                  }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[3rem] bg-white border border-primary/5 shadow-sm hover:border-cyan-500/20 transition-all group">
                    <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] bg-foreground p-12 md:p-24 flex flex-col justify-center items-center text-center space-y-12 overflow-hidden shadow-3xl">
                <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/urbeludo-grid/1000/1000')] bg-cover mix-blend-overlay" />
                <div className="h-32 w-32 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 animate-pulse relative z-10">
                  <Cpu className="h-16 w-16" />
                </div>
                <div className="space-y-6 relative z-10">
                  <h4 className="font-headline text-3xl md:text-4xl font-black text-white tracking-tighter">
                    Tecnologia Edge AI
                  </h4>
                  <p className="text-cyan-100/60 text-lg font-medium leading-relaxed italic">
                    "A serviço da evolução humana."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                    <Database className="h-6 w-6 text-cyan-400 mb-2 mx-auto" />
                    <p className="text-[10px] font-black uppercase text-white/40 mb-1">Processamento</p>
                    <p className="text-xl font-black text-white">Local</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                    <BarChart3 className="h-6 w-6 text-cyan-400 mb-2 mx-auto" />
                    <p className="text-[10px] font-black uppercase text-white/40 mb-1">Precisão</p>
                    <p className="text-xl font-black text-white">Milimétrica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Futuristic Features Grid */}
          <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Neuroplasticidade",
                desc: "Estímulos visuais e sonoros sincronizados para acelerar sinapses e aprendizado."
              },
              {
                icon: <Layers className="h-8 w-8" />,
                title: "Bio-Dados",
                desc: "Captura de métricas fisiológicas para ajustes imediatos na terapia."
              },
              {
                icon: <HeartPulse className="h-8 w-8" />,
                title: "Foco no Paciente",
                desc: "Experiência lúdica que aumenta o engajamento e reduz a barreira do esforço clínico."
              }
            ].map((feat, i) => (
              <div key={i} className="text-center space-y-6 p-12 rounded-[4rem] bg-white border border-primary/5 hover:shadow-2xl transition-all">
                <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary mx-auto">
                  {feat.icon}
                </div>
                <h4 className="font-bold text-2xl tracking-tighter">{feat.title}</h4>
                <p className="text-muted-foreground font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
