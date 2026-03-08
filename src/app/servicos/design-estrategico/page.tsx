
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Layers, Award, ShieldCheck, ArrowRight, Diamond, CheckCircle2, Sparkles, Target, Landmark, Brush, Monitor } from "lucide-react";

export default function DesignEstrategicoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Identidade & Valor</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Sua Marca como <span className="text-white/70 italic">Autoridade</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              O design não é sobre "ficar bonito", é sobre quanto você pode cobrar. Transformamos sua imagem em um ativo que justifica seu valor de mercado.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 md:p-16 flex flex-col justify-end space-y-6">
                <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white mb-4">
                  <Landmark className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-4xl font-black text-foreground tracking-tighter">O Fim da Comparação de Preços</h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Quando sua marca parece a líder do mercado, o cliente para de questionar o orçamento e começa a desejar a experiência. O design estratégico elimina a objeção do custo.
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Design é Confiança</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  No mundo digital, você tem menos de 3 segundos para passar credibilidade. Se sua marca parece amadora, seu serviço é visto como amador. Nós garantimos que sua primeira impressão seja de excelência.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <Award className="h-6 w-6" />, 
                    title: "Branding de Prestígio", 
                    desc: "Criamos logotipos e universos visuais que comunicam sucesso e estabilidade instantaneamente." 
                  },
                  { 
                    icon: <Layers className="h-6 w-6" />, 
                    title: "Ecossistema Visual", 
                    desc: "Padronizamos tudo: do site ao cartão, do post ao material impresso. Unidade que gera reconhecimento." 
                  },
                  { 
                    icon: <ShieldCheck className="h-6 w-6" />, 
                    title: "Psicologia do Consumo", 
                    desc: "Usamos cores e formas estrategicamente para atrair o público com maior poder de compra." 
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
                className="h-20 px-12 text-lg font-black bg-primary text-white rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group"
              >
                Redesenhar minha Marca <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-32 space-y-16">
            <div className="text-center">
              <h3 className="font-headline text-4xl font-black tracking-tighter mb-6">Por que investir em Design?</h3>
              <p className="text-lg text-muted-foreground font-medium">Não é apenas estética, é clareza de negócio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Brush className="h-6 w-6" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight">Diferenciação Real</h4>
                <p className="text-muted-foreground leading-relaxed">Em um mercado saturado, ser "igual" é ser invisível. Criamos uma linguagem visual única que separa você da concorrência genérica.</p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Monitor className="h-6 w-6" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight">Presença Digital</h4>
                <p className="text-muted-foreground leading-relaxed">Seu site e redes sociais são seus vendedores 24h. Garantimos que eles apresentem o seu negócio com a seriedade que ele merece.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-12 rounded-[3.5rem] bg-foreground text-white space-y-6">
              <Sparkles className="h-10 w-10 text-primary" />
              <h4 className="text-2xl font-bold tracking-tighter">Estética de Elite</h4>
              <p className="text-white/60 font-medium">Fuja do comum com um design system exclusivo feito sob medida para seu nicho.</p>
            </div>
            <div className="p-12 rounded-[3.5rem] card-premium-bg space-y-6">
              <Target className="h-10 w-10 text-primary" />
              <h4 className="text-2xl font-bold tracking-tighter">Foco em Conversão</h4>
              <p className="text-muted-foreground font-medium">Cada elemento visual é posicionado para guiar o olhar do cliente para a compra.</p>
            </div>
            <div className="p-12 rounded-[3.5rem] bg-primary text-white space-y-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
              <h4 className="text-2xl font-bold tracking-tighter">Pronto para Escala</h4>
              <p className="text-white/80 font-medium">Uma marca bem estruturada permite que você cresça sem perder a essência original.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
