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
      
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">
            Sistemas de Atendimento
          </Badge>
          <h1 className="font-headline text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 md:mb-12">
            Inteligência que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic font-medium block">Resolve e Vende.</span>
          </h1>
          <p className="text-base md:text-2xl text-white/50 font-medium max-w-4xl mx-auto leading-relaxed tracking-tight text-balance mb-12 md:mb-16">
            Agentes inteligentes focados em atender, qualificar e ajudar seu cliente 24h por dia. <span className="text-white font-bold">Mais eficiência para o seu negócio.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <Button onClick={handleOpenChat} className="h-16 md:h-20 px-10 md:px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] transition-all">
              SIMULAR DIAGNÓSTICO
            </Button>
          </div>
        </div>
      </section>

      <section id="manifesto" className="py-20 md:py-48 bg-white text-slate-950 relative overflow-hidden rounded-[3rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
            <h2 className="font-headline text-3xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              Atendimento Digital <span className="text-primary italic">Eficiente.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <blockquote className="text-lg md:text-3xl text-slate-900 font-medium leading-tight tracking-tight italic border-l-[6px] md:border-l-[8px] border-primary pl-6 md:pl-8">
                "Não perca mais vendas por demora no atendimento. Nossos sistemas garantem que seu cliente seja ouvido na hora que ele precisa."
              </blockquote>
              <div className="space-y-6 md:space-y-8">
                <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                  Trabalhamos para que sua empresa nunca pare. Criamos soluções que atendem, filtram e organizam seus leads automaticamente.
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