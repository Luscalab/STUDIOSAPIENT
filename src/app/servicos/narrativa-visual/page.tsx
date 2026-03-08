
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";

export default function NarrativaVisualPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Clareza & Educação</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Narrativa <span className="text-white/70 italic">Visual</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Transformamos dados complexos em infográficos sofisticados que educam sua audiência e aceleram o processo de venda.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Simplifique o Complexo</h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
              Muitas vezes, seu cliente não compra porque não entende o valor do que você oferece. A narrativa visual resolve esse gap de comunicação instantaneamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <PieChart className="h-10 w-10" />, title: "Data Visualization", desc: "Apresente números e resultados de forma atraente e fácil de digerir." },
              { icon: <BarChart3 className="h-10 w-10" />, title: "Infográficos Premium", desc: "Design focado em fluxo de informação e retenção de atenção." },
              { icon: <Lightbulb className="h-10 w-10" />, title: "Educação de Mercado", desc: "Posicione-se como autoridade ensinando seu público de forma visual." }
            ].map((card, i) => (
              <div key={i} className="card-premium-bg p-12 rounded-[3.5rem] text-center space-y-6">
                <div className="mx-auto w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                  {card.icon}
                </div>
                <h3 className="font-bold text-2xl tracking-tighter">{card.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 md:p-24 bg-white rounded-[4rem] border border-primary/10 shadow-sm">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <h3 className="font-headline text-3xl md:text-4xl font-black tracking-tighter">Benefícios da Clareza Visual</h3>
                <div className="space-y-4">
                  {["Aumento na Retenção de Conteúdo", "Fortalecimento da Autoridade Técnica", "Redução do Ciclo de Venda", "Diferenciação Visual Absoluta"].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-lg font-bold text-muted-foreground/80">
                      <CheckCircle2 className="h-6 w-6 text-primary" /> {benefit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 text-center md:text-right">
                <p className="text-2xl font-medium text-muted-foreground mb-10 leading-relaxed italic">
                  "Informação sem clareza é apenas ruído. Nós transformamos ruído em estratégia."
                </p>
                <Button className="h-20 px-12 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20">
                  Começar Consultoria
                </Button>
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
