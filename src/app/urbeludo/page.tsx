
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Database, 
  BarChart3, 
  HeartPulse, 
  ShieldCheck,
  TrendingUp,
  Users2,
  Mail,
  FlaskConical,
  Target,
  Heart
} from "lucide-react";

export default function UrbeLudoPage() {
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      {/* Hero Section - UrbeLudo */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-cyan-500/20 text-cyan-200 border-cyan-500/30 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md animate-pulse">
              Biofeedback & Engenharia Cognitiva
            </Badge>
            <h1 className="font-headline text-5xl md:text-9xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              Urbe<span className="text-cyan-400 italic">Ludo</span>
            </h1>
            <h2 className="text-2xl md:text-4xl text-white/80 font-medium max-w-3xl mx-auto leading-tight tracking-tight text-balance mb-12">
              A Próxima Fronteira da <span className="text-white font-bold underline decoration-cyan-500/50 underline-offset-8">Reabilitação Clínica</span>.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Badge variant="outline" className="border-white/20 text-white/60 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-full">
                [ EM BREVE ]
              </Badge>
              <Button 
                onClick={handleOpenChat}
                className="h-16 px-10 bg-white text-primary hover:bg-cyan-50 rounded-full font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105"
              >
                Saber Mais <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fbfaff] to-transparent" />
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <Badge className="bg-primary/5 text-primary border-primary/10 px-6 py-2 text-[9px] font-black uppercase tracking-widest rounded-full">
                  Nossa Gênese
                </Badge>
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  A Ciência por Trás da <span className="text-primary italic">Lodicidade.</span>
                </h3>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed tracking-tight">
                  O UrbeLudo não é apenas uma plataforma; é um ecossistema de biofeedback projetado para potencializar metodologias institucionais.
                </p>
              </div>

              <div className="prose prose-xl max-w-none text-muted-foreground/80 font-medium leading-relaxed space-y-6">
                <p>
                  Acreditamos que o movimento e a fala são os pilares da conexão humana. Ao aplicar algoritmos de Visão Computacional e Processamento de Linguagem Natural, criamos um espelho digital da evolução terapêutica.
                </p>
                <p>
                  Nossa plataforma não substitui o terapeuta; ela o empodera com dados de biofeedback que antes eram invisíveis a olho nu. Da psicomotricidade à fonoaudiologia, transformamos o corpo em dados interativos e resultados mensuráveis.
                </p>
              </div>

              <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-secondary flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/expert-${i}/100/100`} alt="Expert" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Tecnologia Edge AI a serviço <br /> da evolução humana
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] bg-secondary/30 border border-primary/5 overflow-hidden flex items-center justify-center p-12 group shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="text-center space-y-8 relative z-10">
                   <div className="h-24 w-24 bg-primary rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl animate-float">
                     <Cpu className="h-12 w-12" />
                   </div>
                   <h4 className="font-headline text-3xl font-black tracking-tighter text-foreground">Visão 2025</h4>
                   <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                     Democratizar o acesso ao biofeedback de alta precisão em cada clínica e escola.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Path Section: Investimento & Apoio */}
      <section id="oportunidade" className="py-24 md:py-40 bg-foreground text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">
              Engenharia de Impacto
            </Badge>
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
              Sua Parceria Molda <br />
              <span className="text-cyan-400">nosso Futuro.</span>
            </h3>
            <p className="text-xl text-white/50 font-medium">
              Escolha seu caminho para impulsionar a tecnologia de reabilitação.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Investidor (Anjo/VC) Card */}
            <div className="p-12 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group flex flex-col justify-between h-full border-t-cyan-500/40">
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="h-20 w-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[8px] font-black uppercase tracking-widest">Business & Scalability</Badge>
                </div>
                
                <div className="space-y-6">
                  <h4 className="font-headline text-3xl md:text-4xl font-black tracking-tighter">Seja um parceiro na <br />evolução do UrbeLudo</h4>
                  <p className="text-white/60 leading-relaxed font-medium text-lg">
                    Estamos construindo uma solução que une Inteligência Artificial de Borda e Neurociência para preencher uma lacuna crítica na reabilitação clínica e institucional. O UrbeLudo é um ecossistema escalável com potencial de transformar a jornada de terapeutas e pacientes através de dados reais e biofeedback.
                  </p>
                  <p className="text-sm font-bold text-cyan-400/80 uppercase tracking-widest">
                    Buscamos investidores que acreditam no impacto da tecnologia aplicada à saúde e educação.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
                <Button 
                  onClick={() => window.location.href = "mailto:sapientcontato@gmail.com?subject=Interesse em Investimento - UrbeLudo"}
                  className="w-full h-20 bg-cyan-500 hover:bg-cyan-400 text-foreground font-black uppercase tracking-widest rounded-full transition-all group/btn"
                >
                  Solicitar Pitch Deck <Mail className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                <p className="text-[10px] text-center text-white/30 font-bold uppercase tracking-[0.3em]">Foco: Escalabilidade, Inovação e ROI</p>
              </div>
            </div>

            {/* Apoiador (Comunidade/Clínico) Card */}
            <div className="p-12 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group flex flex-col justify-between h-full border-t-primary/40">
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <FlaskConical className="h-10 w-10" />
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase tracking-widest">Social Impact & R&D</Badge>
                </div>

                <div className="space-y-6">
                  <h4 className="font-headline text-3xl md:text-4xl font-black tracking-tighter">Apoie a Ciência <br />do Movimento</h4>
                  <p className="text-white/60 leading-relaxed font-medium text-lg">
                    O desenvolvimento de ferramentas de suporte preditivo e ludicidade exige pesquisa contínua. Sua contribuição ajuda a manter o UrbeLudo acessível, permitindo que continuemos a refinar nossos algoritmos e a expandir o alcance da plataforma para instituições de ensino e saúde.
                  </p>
                  <p className="text-sm font-bold text-primary/80 uppercase tracking-widest">
                    Ajude a transformar o movimento em progresso e democratize a terapia de precisão.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
                <Button 
                  onClick={handleOpenChat}
                  className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-full transition-all group/btn"
                >
                  Contribuir com a Pesquisa <Heart className="ml-2 h-5 w-5 group-hover/btn:scale-125 transition-transform" />
                </Button>
                <p className="text-[10px] text-center text-white/30 font-bold uppercase tracking-[0.3em]">Foco: Impacto Social e Melhoria Terapêutica</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Roadmap / Stats Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { l: "Expertise Técnica", v: "Neurociência", d: "Algoritmos treinados com base em padrões clínicos reais." },
              { l: "Mercado Alvo", v: "Global LatAm", d: "Foco inicial em Brasil com arquitetura pronta para expansão." },
              { l: "Tecnologia", v: "Edge AI", d: "Processamento local de alta velocidade para biofeedback instantâneo." }
            ].map((stat, i) => (
              <div key={i} className="space-y-4 p-8 rounded-[2.5rem] bg-secondary/20 border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{stat.l}</p>
                <p className="text-4xl font-black tracking-tighter">{stat.v}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
