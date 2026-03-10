
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ShieldCheck, ArrowRight, Gem, Sparkles, ChevronDown, Palette, Layers } from "lucide-react";

export default function DesignEstrategicoPage() {
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
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md animate-pulse">
            Psicologia de Valor
          </Badge>
          <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-12 py-4">
            Design que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block">Comunica Prestígio.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance mb-16">
            Projetamos universos visuais que removem barreiras de confiança e posicionam sua marca no topo da pirâmide de valor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button onClick={handleOpenChat} className="h-20 px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500">
              SOLICITAR DOSSIÊ VISUAL
            </Button>
            <button onClick={() => document.getElementById('manifesto')?.scrollIntoView({behavior:'smooth'})} className="text-white/30 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.6em] flex items-center gap-4 group">
              Nossa Semiótica <ChevronDown className="h-4 w-4 animate-bounce group-hover:text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Manifesto Section - High Contrast White */}
      <section id="manifesto" className="py-24 md:py-48 bg-white text-slate-950 relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              O Impacto da <span className="text-primary italic">Percepção de Luxo.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <blockquote className="text-xl md:text-3xl text-slate-900 font-medium leading-tight tracking-tight italic border-l-[8px] border-primary pl-8">
                "Em mercados de alto padrão, sua imagem é sua primeira barreira de venda. Um design estratégico remove atritos de percepção e gera confiança imediata."
              </blockquote>
              <div className="space-y-8">
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Sua marca não é apenas o que você entrega, mas o que o cliente sente ao interagir com ela. Utilizamos a psicologia cromática e a semiótica avançada para encurtar o ciclo de decisão do seu cliente ideal.
                </p>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pilares Técnicos - Dark Grid */}
      <section className="py-24 md:py-48 relative">
        <div className="container mx-auto px-6">
          <div className="mb-24 text-center md:text-left max-w-3xl">
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none text-white uppercase">Sistemas Visuais <br/>de Elite.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
            <div className="md:col-span-8 p-12 rounded-[3.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-700 relative overflow-hidden">
               <div className="relative z-10 space-y-8">
                 <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                   <Palette className="h-8 w-8" />
                 </div>
                 <div className="space-y-4">
                    <h4 className="font-headline text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">Identidade de Prestígio</h4>
                    <p className="text-lg text-white/50 font-medium max-w-lg">Arquitetura visual desenhada para transmitir solidez, expertise e exclusividade absoluta antes mesmo da primeira reunião.</p>
                 </div>
               </div>
            </div>

            <div className="md:col-span-4 p-10 rounded-[3.5rem] bg-primary text-white space-y-8 transition-all duration-700">
               <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                 <Gem className="h-8 w-8" />
               </div>
               <div className="space-y-4">
                  <h4 className="font-headline text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">Branding Cognitivo</h4>
                  <p className="text-base text-white/80">Onde a estética encontra a ciência. Design focado em como o cérebro humano processa valor.</p>
               </div>
            </div>

            <div className="md:col-span-6 p-10 rounded-[3rem] bg-[#121216] border border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h4 className="font-bold text-xl tracking-tighter uppercase">Barreira de Confiança</h4>
                </div>
                <p className="text-white/40 leading-relaxed text-sm">Removemos o atrito informacional através de uma interface limpa e hierarquia visual cirúrgica.</p>
            </div>

            <div className="md:col-span-6 p-10 rounded-[3rem] bg-[#121216] border border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <Layers className="h-6 w-6 text-primary" />
                  <h4 className="font-bold text-xl tracking-tighter uppercase">Omnicanalidade</h4>
                </div>
                <p className="text-white/40 leading-relaxed text-sm">Garantimos que sua marca seja sentida da mesma forma em todas as interfaces, digitais ou físicas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Final */}
      <section className="py-24 md:py-48 bg-white text-slate-950 relative rounded-[4rem] md:rounded-[8rem] mx-4 mb-24 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto space-y-12">
            <h3 className="font-headline text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-950">
              Projete seu <span className="text-primary italic">Próximo Nível.</span>
            </h3>
            <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-tight">
              Pare de lutar por preço. Comece a ser percebido pelo valor que você realmente entrega.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
              <Button onClick={handleOpenChat} className="h-24 px-16 bg-primary text-white hover:bg-primary/90 rounded-full font-black uppercase tracking-[0.4em] text-[12px] transition-all shadow-2xl shadow-primary/30">
                TRANSFORMAR MINHA MARCA <ArrowRight className="ml-4" />
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
