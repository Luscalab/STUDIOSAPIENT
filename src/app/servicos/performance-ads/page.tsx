
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, TrendingUp, Target, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PerformanceAdsPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Escalabilidade & ROI</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Performance & <span className="text-white/70 italic">Ads de Elite</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Dominamos o Google Meu Negócio e o tráfego pago para transformar cada clique em lucro real para seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Nossa Metodologia de Tráfego</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Não apenas apertamos botões. Nós desenhamos funis de vendas inteligentes que entendem o comportamento do seu cliente ideal.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Google Meu Negócio Profissional", desc: "Apareça no topo das buscas locais quando seu cliente mais precisa." },
                  { title: "Gestão de Meta & Google Ads", desc: "Anúncios segmentados com foco absoluto em conversão e baixo custo por lead." },
                  { title: "Funis de Venda Estratégicos", desc: "Criamos a jornada do cliente desde o primeiro contato até o fechamento." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-white shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h3>
                      <p className="text-muted-foreground font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden bg-primary/5 border border-primary/10 p-12 flex flex-col justify-center items-center text-center space-y-8 relative">
                <div className="absolute inset-0 hero-purple-mesh opacity-5 blur-3xl" />
                <TrendingUp className="h-32 w-32 text-primary animate-bounce" />
                <h3 className="font-headline text-3xl font-black tracking-tighter">Pronto para escalar?</h3>
                <p className="text-lg text-muted-foreground font-medium max-w-xs">
                  Agende um diagnóstico gratuito e descubra o potencial oculto da sua presença digital.
                </p>
                <Button className="w-full h-20 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20">
                  Falar com Especialista
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
