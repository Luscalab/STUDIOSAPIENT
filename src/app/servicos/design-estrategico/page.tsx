
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Layers, Award, ShieldCheck, ArrowRight, Eye, Diamond } from "lucide-react";

export default function DesignEstrategicoPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Brand Equity & Authority</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Design que <span className="text-white/70 italic">Valida</span> seu Valor
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              A estética é o primeiro ponto de contato com seu cliente. Nós garantimos que sua marca transmita autoridade absoluta antes mesmo da primeira palavra ser dita.
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
                <h3 className="font-headline text-4xl font-black text-foreground tracking-tighter">Posicionamento de Prestígio</h3>
                <p className="text-lg text-muted-foreground font-medium">
                  Não criamos apenas logotipos; construímos ecossistemas visuais que elevam o ticket médio percebido do seu negócio através de uma identidade de alto padrão.
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">O Vies de Autoridade</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  No mercado atual, o profissionalismo é medido pela consistência visual. Marcas que investem em design estratégico convertem até 3x mais por transmitirem confiança imediata.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: <Award className="h-6 w-6" />, title: "Branding de Autoridade", desc: "Desenvolvimento de marcas exclusivas com foco em nichos de alto padrão e serviços especializados." },
                  { icon: <Layers className="h-6 w-6" />, title: "Design System Estratégico", desc: "Padronização rigorosa de todos os touchpoints, garantindo uma experiência de marca coesa e profissional." },
                  { icon: <ShieldCheck className="h-6 w-6" />, title: "Direção Estética", desc: "Curadoria visual que alinha a percepção do público aos objetivos comerciais e de crescimento da empresa." }
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
                Elevar minha Marca <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
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
