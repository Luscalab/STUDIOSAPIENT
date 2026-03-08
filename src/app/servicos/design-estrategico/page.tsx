
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Layers, Award, ShieldCheck, ArrowRight, Diamond, CheckCircle2 } from "lucide-react";

export default function DesignEstrategicoPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Estética & Confiança</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Sua Marca como <span className="text-white/70 italic">Referência</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              O design estratégico não é apenas sobre beleza; é sobre como sua empresa é percebida. Transformamos negócios comuns em marcas que transmitem autoridade e valor imediato.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 md:p-16 flex flex-col justify-end space-y-6">
                <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white mb-4">
                  <Diamond className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-4xl font-black text-foreground tracking-tighter">O Impacto Visual</h3>
                <p className="text-lg text-muted-foreground font-medium">
                  Antes mesmo de você falar sobre seu produto, o cliente já julgou sua empresa pela aparência. Nós garantimos que esse julgamento seja de alto nível.
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Por que Design?</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  No mercado saturado de hoje, a diferenciação é a única forma de não ser comparado pelo preço. Uma identidade visual profissional permite que você cobre o valor real do seu serviço.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <Award className="h-6 w-6" />, 
                    title: "Branding Profissional", 
                    desc: "Criação de logotipos e elementos visuais que contam a história da sua marca de forma clara e sofisticada." 
                  },
                  { 
                    icon: <Layers className="h-6 w-6" />, 
                    title: "Padronização Visual", 
                    desc: "Garantimos que sua marca pareça a mesma em todos os lugares: site, redes sociais e materiais impressos." 
                  },
                  { 
                    icon: <ShieldCheck className="h-6 w-6" />, 
                    title: "Percepção de Valor", 
                    desc: "Ajustamos a estética para atrair o público que valoriza qualidade e está disposto a pagar por ela." 
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
                onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
                className="h-20 px-12 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group"
              >
                Solicitar Consultoria <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
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
