
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Brain, 
  Cpu, 
  Mic, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Database, 
  BarChart3, 
  HeartPulse, 
  Layers,
  ShieldCheck,
  TrendingUp,
  Users2,
  Globe2,
  Target,
  Mail
} from "lucide-react";

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

      {/* Sobre Section */}
      <section id="sobre" className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <Badge className="bg-primary/5 text-primary border-primary/10 px-6 py-2 text-[9px] font-black uppercase tracking-widest rounded-full">
                  Nossa Gênese
                </Badge>
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  A Ciência por Trás da <span className="text-primary italic">Lodicidade.</span>
                </h3>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  O UrbeLudo nasceu nos laboratórios da Sapient Studio como uma resposta ao desafio de tornar terapias clínicas mensuráveis e envolventes.
                </p>
              </div>

              <div className="prose prose-xl max-w-none text-muted-foreground/80 font-medium leading-relaxed space-y-6">
                <p>
                  Acreditamos que o movimento e a fala são os pilares da conexão humana. Ao aplicar algoritmos de Visão Computacional e Processamento de Linguagem Natural, criamos um espelho digital da evolução terapêutica.
                </p>
                <p>
                  Nossa plataforma não substitui o terapeuta; ela o empodera com dados de biofeedback que antes eram invisíveis a olho nu.
                </p>
              </div>

              <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-secondary flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/expert-${i}/100/100`} alt="Expert" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Desenvolvido com <br /> Especialistas Clínicos
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] bg-secondary/30 border border-primary/5 overflow-hidden flex items-center justify-center p-12 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="text-center space-y-8 relative z-10">
                   <div className="h-24 w-24 bg-primary rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl animate-float">
                     <Target className="h-12 w-12" />
                   </div>
                   <h4 className="font-headline text-3xl font-black tracking-tighter text-foreground">Visão 2025</h4>
                   <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                     Democratizar o acesso ao biofeedback de alta precisão em cada clínica do país.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Ajudar / Colaboração Section */}
      <section id="colaborar" className="py-24 md:py-40 bg-foreground text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-24">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">
              Ecossistema Colaborativo
            </Badge>
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-tight">
              Sua Expertise Molda <br />
              <span className="text-cyan-400">nossa Inteligência.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Users2 className="h-8 w-8 text-cyan-400" />,
                title: "Clínicas Parceiras",
                desc: "Seja um centro de validação precoce e tenha acesso exclusivo às ferramentas de biofeedback antes do lançamento global."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
                title: "Conselho Consultivo",
                desc: "Buscamos fonoaudiólogos e psicomotricistas para refinar nossos algoritmos de análise de movimento e voz."
              },
              {
                icon: <Database className="h-8 w-8 text-cyan-400" />,
                title: "Pesquisa Acadêmica",
                desc: "Apoiamos teses e pesquisas que utilizam o UrbeLudo como base de dados para novos protocolos terapêuticos."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group">
                <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-bold text-2xl mb-4 tracking-tight">{item.title}</h4>
                <p className="text-white/50 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-cyan-500/10 rounded-[3rem] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-2">
              <p className="font-black text-xl tracking-tight uppercase">Interesse em colaborar?</p>
              <p className="text-cyan-100/60 font-medium">Junte-se à revolução da reabilitação digital.</p>
            </div>
            <Button onClick={handleOpenChat} className="h-16 px-12 bg-cyan-500 hover:bg-cyan-400 text-foreground font-black uppercase tracking-widest rounded-full transition-all">
              Entrar em Contato
            </Button>
          </div>
        </div>
      </section>

      {/* Investir Section - Private Equity Approach */}
      <section id="investir" className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto rounded-[4rem] border border-primary/10 p-12 md:p-24 shadow-2xl relative overflow-hidden bg-gradient-to-br from-white to-secondary/20">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <TrendingUp className="h-64 w-64 text-primary" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <Badge className="bg-primary/5 text-primary border-primary/10 px-8 py-2 text-[9px] font-black uppercase tracking-widest rounded-full">
                  Investimento Estratégico
                </Badge>
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  Aporte Direto no <br />
                  <span className="text-primary italic">Próximo Unicórnio Health.</span>
                </h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  O UrbeLudo opera em regime de investimento privado (Private Equity / Pre-Seed). Não estamos listados em bolsa; buscamos parceiros estratégicos para expansão de hardware e inteligência de borda.
                </p>
                <ul className="space-y-4">
                  {[
                    "Rodada Pre-Seed exclusiva para anjos e VCs.",
                    "Foco em expansão para o mercado LatAm e EUA.",
                    "Equity direto via contrato de investimento (SAFE).",
                    "Acesso prioritário ao roadmap tecnológico."
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold text-foreground">
                      <Sparkles className="h-5 w-5 text-primary shrink-0" /> {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8 p-12 bg-white rounded-[3rem] shadow-xl border border-primary/5">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Canal do Investidor</p>
                  <p className="text-3xl font-black tracking-tighter uppercase">Contato por E-mail</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-secondary/50 rounded-2xl border border-primary/5">
                    <Mail className="h-6 w-6 text-primary mb-2" />
                    <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Via Dossiê</p>
                    <p className="text-xl font-black">Private</p>
                  </div>
                  <div className="p-6 bg-secondary/50 rounded-2xl border border-primary/5">
                    <BarChart3 className="h-6 w-6 text-primary mb-2" />
                    <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Previsão</p>
                    <p className="text-xl font-black">+24% CAGR</p>
                  </div>
                </div>
                <Button 
                  onClick={() => window.location.href = "mailto:sapientcontato@gmail.com?subject=Interesse em Investimento - UrbeLudo"}
                  className="w-full h-20 bg-foreground text-white hover:bg-primary font-black uppercase tracking-widest rounded-full transition-all"
                >
                  Solicitar Pitch Deck
                </Button>
                <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest">
                  Ou fale com nosso Estrategista no Chat IA
                </p>
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
