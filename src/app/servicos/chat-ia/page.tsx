
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, ArrowRight, Smartphone, Zap, BrainCircuit, ChevronDown, Database, ShieldCheck } from "lucide-react";

export default function ChatIAPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white selection:bg-primary/30">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md animate-pulse">
            Ecossistemas Autônomos
          </Badge>
          <h1 className="font-headline text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 md:mb-12 py-2 md:py-4">
            Inteligência que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block">Atende e Vende.</span>
          </h1>
          <p className="text-base md:text-2xl text-white/50 font-medium max-w-4xl mx-auto leading-relaxed tracking-tight text-balance mb-12 md:mb-16">
            Agentes inteligentes treinados na sua expertise exclusiva para atender, qualificar e converter leads 24/7. <span className="text-white font-bold">A escala infinita do seu conhecimento.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <Button onClick={handleOpenChat} className="h-16 md:h-20 px-10 md:px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] transition-all duration-500">
              SIMULAR DIAGNÓSTICO IA
            </Button>
            <button onClick={() => document.getElementById('manifesto')?.scrollIntoView({behavior:'smooth'})} className="text-white/30 hover:text-white transition-all text-[8px] md:text-[9px] font-black uppercase tracking-[0.6em] flex items-center gap-4 group">
              Explorar Cérebro <ChevronDown className="h-4 w-4 animate-bounce group-hover:text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Manifesto Section - High Contrast White */}
      <section id="manifesto" className="py-20 md:py-48 bg-white text-slate-950 relative overflow-hidden rounded-[3rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
            <h2 className="font-headline text-3xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              Atendimento Digital <span className="text-primary italic">de Elite.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <blockquote className="text-lg md:text-3xl text-slate-900 font-medium leading-tight tracking-tight italic border-l-[6px] md:border-l-[8px] border-primary pl-6 md:pl-8">
                "No digital, 5 minutos de demora podem significar a perda de um contrato. Nossos ecossistemas garantem resposta imediata e precisão cirúrgica."
              </blockquote>
              <div className="space-y-6 md:space-y-8">
                <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                  Não é sobre automação básica, é sobre transferir sua visão técnica para um cérebro digital que opera sem interrupções, feriados ou erros humanos.
                </p>
                <div className="grid grid-cols-2 gap-6 md:gap-8">
                   <div className="space-y-2">
                      <p className="text-3xl md:text-4xl font-black text-primary tracking-tighter">0.2s</p>
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Tempo de Resposta</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-3xl md:text-4xl font-black text-primary tracking-tighter">99%</p>
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Precisão Técnica</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pilares Técnicos - Dark Grid */}
      <section className="py-20 md:py-48 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:mb-24 text-center md:text-left max-w-3xl">
            <h3 className="font-headline text-3xl md:text-7xl font-black tracking-tighter leading-none text-white uppercase">Sistemas <br/>Cognitivos.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 max-w-6xl mx-auto">
            <div className="md:col-span-8 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-700 relative overflow-hidden">
               <div className="relative z-10 space-y-6 md:space-y-8">
                 <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                   <BrainCircuit className="h-6 w-6 md:h-8 md:w-8" />
                 </div>
                 <div className="space-y-3 md:space-y-4">
                    <h4 className="font-headline text-2xl md:text-5xl font-black tracking-tighter uppercase leading-none">Cérebro Proprietário</h4>
                    <p className="text-base md:text-lg text-white/50 font-medium max-w-lg">Sua IA é alimentada com seus manuais, processos e know-how exclusivo. Ela fala o que você falaria.</p>
                 </div>
               </div>
            </div>

            <div className="md:col-span-4 p-8 rounded-[2.5rem] md:rounded-[3.5rem] bg-primary text-white space-y-6 md:space-y-8 transition-all duration-700">
               <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                 <Smartphone className="h-6 w-6 md:h-8 md:w-8" />
               </div>
               <div className="space-y-3 md:space-y-4">
                  <h4 className="font-headline text-xl md:text-3xl font-black tracking-tighter uppercase leading-none">WhatsApp API</h4>
                  <p className="text-sm md:text-base text-white/80">Integração oficial via API, permitindo escala massiva sem risco de bloqueios.</p>
               </div>
            </div>

            <div className="md:col-span-6 p-8 rounded-[2rem] md:rounded-[3rem] bg-[#121216] border border-white/5 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <Database className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <h4 className="font-bold text-lg md:text-xl tracking-tighter uppercase">Qualificação Automática</h4>
                </div>
                <p className="text-white/40 leading-relaxed text-xs md:text-sm">A IA identifica leads prontos para o fechamento e filtra curiosos, otimizando o tempo do seu time comercial.</p>
            </div>

            <div className="md:col-span-6 p-8 rounded-[2rem] md:rounded-[3rem] bg-[#121216] border border-white/5 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <h4 className="font-bold text-lg md:text-xl tracking-tighter uppercase">Segurança de Dados</h4>
                </div>
                <p className="text-white/40 leading-relaxed text-xs md:text-sm">Protocolos de criptografia e proteção de informações sensíveis do seu negócio e dos seus clientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Final */}
      <section className="py-20 md:py-48 bg-white text-slate-950 relative rounded-[3rem] md:rounded-[8rem] mx-4 mb-24 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto space-y-10 md:space-y-12">
            <h3 className="font-headline text-3xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-950">
              Escale sua <span className="text-primary italic">Presença Digital.</span>
            </h3>
            <p className="text-lg md:text-2xl text-slate-400 font-medium tracking-tight">
              Pare de perder oportunidades por falta de braço operacional. Deixe a IA trabalhar para você.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 pt-6 md:pt-8">
              <Button onClick={handleOpenChat} className="h-20 md:h-24 px-12 md:px-16 bg-primary text-white hover:bg-primary/90 rounded-full font-black uppercase tracking-[0.4em] text-[10px] md:text-[12px] transition-all shadow-2xl shadow-primary/30">
                ATIVAR MEU ECOSSISTEMA <ArrowRight className="ml-3 md:ml-4 h-4 w-4" />
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
