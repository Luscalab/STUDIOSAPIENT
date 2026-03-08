
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Layers, Award, ShieldCheck, ArrowRight, Landmark, Brush, Monitor, CheckCircle2, Sparkles, Target } from "lucide-react";

export default function DesignEstrategicoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Identidade & Valor Profissional</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Sua Marca como <span className="text-white/70 italic">Autoridade</span> Inquestionável
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
              O design não é apenas estética; é uma ferramenta de negócio para elevar seu preço e atrair clientes que valorizam excelência.
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
                <h3 className="font-headline text-4xl font-black text-foreground tracking-tighter">O Fim da Comparação de Preços</h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Quando sua marca transmite sucesso e estabilidade, o cliente para de questionar o seu valor. Nós garantimos que seu visual seja o seu melhor argumento de venda.
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">O Poder da Primeira Impressão</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  No digital, você é julgado em segundos. Se sua marca parece amadora, seu serviço é percebido como amador. Transformamos essa percepção em admiração e confiança imediata.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <Award className="h-6 w-6" />, 
                    title: "Branding de Alto Padrão", 
                    desc: "Criação de logotipos e universos visuais que comunicam profissionalismo e solidez no mercado." 
                  },
                  { 
                    icon: <Layers className="h-6 w-6" />, 
                    title: "Unidade Visual Total", 
                    desc: "Sua marca coerente em todos os pontos: redes sociais, site, propostas e materiais físicos." 
                  },
                  { 
                    icon: <ShieldCheck className="h-6 w-6" />, 
                    title: "Design Psicológico", 
                    desc: "Uso estratégico de cores e formas para atrair o perfil de público que realmente investe no seu serviço." 
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
                Consultoria de Design <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-40 bg-foreground rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Sparkles className="h-64 w-64" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="font-headline text-4xl md:text-5xl font-black tracking-tighter">Por que investir agora?</h3>
                <p className="text-xl text-white/70 leading-relaxed font-medium">
                  Não é sobre "ficar bonito". É sobre posicionamento de mercado e clareza de negócio.
                </p>
                <ul className="space-y-4">
                  {[
                    "Diferenciação real frente aos concorrentes genéricos.",
                    "Aumento da confiança percebida pelo seu cliente ideal.",
                    "Facilidade na tomada de decisão de compra.",
                    "Materiais que vendem por você 24 horas por dia."
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg font-bold">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Brush className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-bold text-xl mb-2">Exclusividade</h4>
                  <p className="text-sm text-white/50">Fuja dos modelos prontos e tenha uma marca única.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Monitor className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-bold text-xl mb-2">Presença</h4>
                  <p className="text-sm text-white/50">Destaque-se em qualquer tela, do mobile ao outdoor.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-12 rounded-[3.5rem] bg-white border border-primary/10 space-y-6 hover:shadow-2xl transition-all duration-500">
              <Sparkles className="h-10 w-10 text-primary" />
              <h4 className="text-2xl font-bold tracking-tighter">Elegância Visual</h4>
              <p className="text-muted-foreground font-medium">Um sistema de design feito sob medida para transmitir sofisticação sem esforço.</p>
            </div>
            <div className="p-12 rounded-[3.5rem] card-premium-bg space-y-6">
              <Target className="h-10 w-10 text-primary" />
              <h4 className="text-2xl font-bold tracking-tighter">Foco no Cliente</h4>
              <p className="text-muted-foreground font-medium">Cada detalhe visual é pensado para guiar a atenção do seu cliente para o que importa: seu serviço.</p>
            </div>
            <div className="p-12 rounded-[3.5rem] bg-primary text-white space-y-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
              <h4 className="text-2xl font-bold tracking-tighter">Pronto para Crescer</h4>
              <p className="text-white/80 font-medium">Uma marca bem estruturada permite que você escale seu negócio com segurança e autoridade.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
