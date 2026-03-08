
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Layers, Award, ShieldCheck, ArrowRight } from "lucide-react";

export default function DesignEstrategicoPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Autoridade Visual</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Design que <span className="text-white/70 italic">Posiciona</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Sua marca não deve ser apenas bonita. Ela deve ser a líder indiscutível do seu mercado através de uma identidade visual poderosa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-16 flex flex-col justify-end space-y-6">
                <Badge className="w-fit bg-primary text-white">Case de Sucesso</Badge>
                <h3 className="font-headline text-4xl font-black text-foreground tracking-tighter">Identidade de Alto Padrão</h3>
                <p className="text-lg text-muted-foreground font-medium">
                  Transformamos empresas comuns em marcas desejadas através de um design system sofisticado e único.
                </p>
                <div className="h-1 w-20 bg-primary rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">O Poder da Primeira Impressão</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Estudos mostram que sua marca tem menos de 3 segundos para transmitir confiança. Nós garantimos que esses segundos sejam decisivos.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: <Award className="h-6 w-6" />, title: "Branding de Autoridade", desc: "Criação de marcas que respiram profissionalismo e exclusividade." },
                  { icon: <Layers className="h-6 w-6" />, title: "Design System Completo", desc: "Padronização visual para todos os pontos de contato do seu negócio." },
                  { icon: <ShieldCheck className="h-6 w-6" />, title: "Direção Criativa", desc: "Curadoria estética que alinha seu visual aos seus objetivos comerciais." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-white shadow-sm border border-primary/5">
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
              
              <Button className="h-20 px-12 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20 group">
                Quero me destacar <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
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
