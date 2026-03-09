
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Layers, Award, ShieldCheck, ArrowRight, Landmark, Brush, Monitor, CheckCircle2, Sparkles, Target, Zap } from "lucide-react";

export default function DesignEstrategicoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Identidade & Profissionalismo</Badge>
            <h1 className="font-headline text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Sua Marca com <span className="text-white/70 italic">Presença</span> Profissional
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              O design estratégico é sobre posicionamento de mercado. Transformamos sua identidade visual em um ativo que comunica seu real valor e atrai os clientes certos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 md:p-16 flex flex-col justify-end space-y-6">
                <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white mb-4">
                  <Landmark className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-4xl font-black text-foreground tracking-tighter">Comunicação de Valor</h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Quando sua marca transmite confiança e cuidado em cada detalhe, o cliente percebe o profissionalismo do seu serviço. O design é um facilitador no seu processo de venda.
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Por que investir em Design?</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  No ambiente digital, a primeira impressão é decisiva. Uma marca bem estruturada comunica solidez e seriedade, permitindo que você se posicione de forma diferenciada no mercado.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <Award className="h-6 w-6" />, 
                    title: "Percepção de Valor", 
                    desc: "Criação de logotipos e universos visuais que comunicam profissionalismo e seriedade desde o primeiro contato." 
                  },
                  { 
                    icon: <Layers className="h-6 w-6" />, 
                    title: "Coerência Visual", 
                    desc: "Garantimos que sua marca seja consistente em todos os canais: redes sociais, site e apresentações comerciais." 
                  },
                  { 
                    icon: <ShieldCheck className="h-6 w-6" />, 
                    title: "Psicologia da Marca", 
                    desc: "Uso consciente de cores e formas para conectar com o perfil de público que você deseja atender." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-white shadow-sm border border-primary/5 hover:border-primary/20 transition-all duration-500">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h3>
                      <p className="text-muted-foreground font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleOpenChat}
                className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group w-full sm:w-auto"
              >
                Diagnóstico de Design <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-40 bg-foreground rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Sparkles className="h-64 w-64" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-balance">Consistência de Marca</h3>
                <p className="text-xl text-white/70 leading-relaxed font-medium">
                  Entregamos um sistema de identidade que permite que sua marca cresça com uma comunicação clara e eficiente.
                </p>
                <ul className="space-y-4">
                  {[
                    "Diferenciação clara no mercado.",
                    "Clareza na comunicação do seu diferencial.",
                    "Materiais que facilitam o fechamento de vendas.",
                    "Aumento na confiança do seu cliente ideal."
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg font-bold">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-bold text-xl mb-2">Processo</h4>
                  <p className="text-sm text-white/50">Fluxo otimizado para entregas de qualidade no tempo certo.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Monitor className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-bold text-xl mb-2">Versatilidade</h4>
                  <p className="text-sm text-white/50">Sua marca adaptada para qualquer formato digital ou físico.</p>
                </div>
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
