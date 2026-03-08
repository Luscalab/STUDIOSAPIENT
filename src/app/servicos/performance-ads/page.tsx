
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, TrendingUp, Target, MapPin, ArrowRight, BarChart3, Search } from "lucide-react";

export default function PerformanceAdsPage() {
  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Resultados & Escala</Badge>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              Atraia os <span className="text-white/70 italic">Clientes Certos</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
              Não basta apenas estar na internet, você precisa ser encontrado por quem quer comprar. Criamos estratégias de anúncios que colocam seu negócio na frente do público ideal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-8">Crescimento Previsível</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  Nosso foco é o Retorno sobre o Investimento (ROI). Utilizamos as melhores ferramentas do mercado para garantir que cada centavo investido ajude sua empresa a crescer.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <MapPin />, 
                    title: "Google Meu Negócio (GMN)", 
                    desc: "Apareça nos mapas do Google. Quando alguém procurar pelo seu serviço na sua região, você será a primeira opção." 
                  },
                  { 
                    icon: <Target />, 
                    title: "Anúncios no Instagram & Google", 
                    desc: "Criamos campanhas segmentadas para que seus anúncios apareçam exatamente para as pessoas que precisam do seu produto." 
                  },
                  { 
                    icon: <BarChart3 />, 
                    title: "Relatórios de Vendas", 
                    desc: "Você acompanha tudo com clareza. Mostramos quantos novos clientes entraram em contato através das nossas campanhas." 
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
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden glass-morphism border border-primary/10 p-12 flex flex-col justify-center items-center text-center space-y-8">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h3 className="font-headline text-3xl font-black tracking-tighter">Domine seu Mercado</h3>
                <p className="text-lg text-muted-foreground font-medium max-w-xs">
                  Sua empresa merece ser vista como a melhor opção. Vamos construir seu funil de vendas hoje.
                </p>
                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
                  className="w-full h-20 text-lg font-black bg-primary rounded-full uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  Iniciar Diagnóstico
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
