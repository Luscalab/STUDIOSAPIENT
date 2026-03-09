
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
  TrendingUp,
  FlaskConical,
  Heart,
  Code2,
  Boxes,
  Activity,
  Mic2,
  Info,
  ChevronDown,
  Mail,
  QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UrbeLudoPage() {
  const { toast } = useToast();
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  const copyPix = () => {
    navigator.clipboard.writeText("sapientcontato@gmail.com");
    toast({
      title: "Chave PIX Copiada!",
      description: "Chave: sapientcontato@gmail.com (Lucas Santos de Souza)",
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfaff]">
      <Navbar />
      
      {/* 1. Hero Section (O Impacto Visual) */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-48 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-cyan-500/20 text-cyan-200 border-cyan-500/30 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md animate-pulse">
              [ PROJETO EM DESENVOLVIMENTO ]
            </Badge>
            <h1 className="font-headline text-5xl md:text-9xl font-black text-white tracking-tighter leading-tight mb-8 text-balance">
              UrbeLudo — <span className="text-cyan-400 italic">A Ciência do Movimento Codificada.</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/70 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance mb-12">
              Uma plataforma de suporte preditivo que une <span className="text-white font-bold">Psicomotricidade</span>, <span className="text-white font-bold">Fonoaudiologia</span> e <span className="text-white font-bold">Edge AI</span> para transformar a reabilitação institucional.
            </p>
            
            {/* Guias de Navegação Rápida */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <button onClick={() => scrollToSection('manifesto')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-cyan-400 transition-colors">Manifesto</button>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <button onClick={() => scrollToSection('tecnologia')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-cyan-400 transition-colors">Tecnologia</button>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <button onClick={() => scrollToSection('engajamento')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-cyan-400 transition-colors">Engajamento</button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={() => scrollToSection('engajamento')}
                className="h-16 px-10 bg-white text-primary hover:bg-cyan-50 rounded-full font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105"
              >
                Como Ajudar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <button 
                onClick={() => scrollToSection('manifesto')}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
              >
                Conhecer a Visão <ChevronDown className="h-4 w-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fbfaff] to-transparent" />
      </section>

      {/* 2. O Manifesto (O "Porquê") */}
      <section id="manifesto" className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none">
              A reabilitação não precisa ser <span className="text-primary italic">estática.</span>
            </h2>
            <blockquote className="text-2xl md:text-4xl text-muted-foreground font-medium leading-relaxed tracking-tight italic">
              "Acreditamos que o movimento humano é a interface mais rica que existe. O UrbeLudo nasce para dar voz ao corpo e dados ao terapeuta, criando uma ponte entre o exercício clínico e o engajamento lúdico de alta tecnologia."
            </blockquote>
            <div className="h-1 w-24 bg-primary/20 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* 3. Os Pilares Técnicos (O "Como") */}
      <section id="tecnologia" className="py-24 md:py-40 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Engenharia Cognitiva</p>
            <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter">Pilares do Ecossistema</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: <Cpu className="h-8 w-8" />, 
                title: "Edge AI", 
                method: "Psicomotricidade", 
                desc: "Processamento de dados em tempo real no dispositivo, garantindo privacidade e latência zero." 
              },
              { 
                icon: <Boxes className="h-8 w-8" />, 
                title: "Unity Engine", 
                method: "Fonoaudiologia", 
                desc: "Ambientes imersivos e gamificados projetados para maximizar a adesão ao tratamento." 
              },
              { 
                icon: <Activity className="h-8 w-8" />, 
                title: "Biofeedback", 
                method: "Análise Preditiva", 
                desc: "Relatórios precisos sobre a evolução motora e vocal, facilitando decisões clínicas baseadas em dados." 
              }
            ].map((pilar, i) => (
              <div key={i} className="card-premium-bg p-12 rounded-[3.5rem] space-y-8 group hover:-translate-y-4 transition-all duration-700">
                <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  {pilar.icon}
                </div>
                <div className="space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary/60">{pilar.method}</p>
                  <h4 className="font-headline text-2xl font-black tracking-tighter">{pilar.title}</h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">{pilar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mural de Engajamento (Como Ajudar) */}
      <section id="engajamento" className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter mb-6">Mural de <span className="text-primary">Impacto.</span></h3>
            <p className="text-xl text-muted-foreground font-medium">Escolha seu caminho para impulsionar a tecnologia de reabilitação.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* A. Investimento */}
            <div className="p-12 rounded-[4rem] bg-foreground text-white flex flex-col justify-between group hover:scale-[1.02] transition-all duration-700 border-t-4 border-cyan-500 shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-10 w-10 text-cyan-400" />
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-none text-[8px] font-black">EQUITY & SCALE</Badge>
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-2xl font-black tracking-tighter">Investimento Estratégico</h4>
                  <p className="text-white/60 font-medium text-sm leading-relaxed">
                    Buscamos investidores anjo e fundos de HealthTech para escala de desenvolvimento e certificações clínicas.
                  </p>
                </div>
              </div>
              <div className="mt-12 space-y-4">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest text-center">Falar com Estrategista</p>
                <Button 
                  onClick={() => window.location.href = "mailto:sapientcontato@gmail.com?subject=Interesse em Investimento - UrbeLudo"}
                  className="w-full h-16 bg-cyan-500 hover:bg-cyan-400 text-foreground font-black uppercase tracking-widest rounded-full text-[10px]"
                >
                  Solicitar Pitch Deck
                </Button>
              </div>
            </div>

            {/* B. Doações */}
            <div className="p-12 rounded-[4rem] bg-white border border-primary/10 flex flex-col justify-between group hover:scale-[1.02] transition-all duration-700 shadow-xl border-t-4 border-primary">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <Heart className="h-10 w-10 text-primary" />
                  <Badge className="bg-primary/5 text-primary border-none text-[8px] font-black">RESEARCH & SOCIAL</Badge>
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-2xl font-black tracking-tighter">Apoie a Pesquisa</h4>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    Ajude a manter a plataforma acessível a instituições públicas e ONGs através de fomento à pesquisa contínua.
                  </p>
                </div>
              </div>
              <div className="mt-12 space-y-4">
                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 text-center">
                  <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">Pix Direto (CNPJ/E-mail)</p>
                  <p className="text-xs font-bold text-foreground">sapientcontato@gmail.com</p>
                  <p className="text-[7px] font-medium text-muted-foreground mt-1 uppercase">Lucas Santos de Souza</p>
                </div>
                <Button 
                  onClick={copyPix}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-full text-[10px] flex items-center justify-center gap-2"
                >
                  <QrCode className="h-3 w-3" /> Copiar Chave PIX
                </Button>
              </div>
            </div>

            {/* C. Colaboração */}
            <div className="p-12 rounded-[4rem] bg-secondary/40 flex flex-col justify-between group hover:scale-[1.02] transition-all duration-700 border-t-4 border-indigo-500 shadow-xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <Code2 className="h-10 w-10 text-indigo-500" />
                  <Badge className="bg-indigo-500/10 text-indigo-500 border-none text-[8px] font-black">TALENT & KNOWLEDGE</Badge>
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-2xl font-black tracking-tighter">Colaboração Técnica</h4>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    Fonoaudiólogos, psicomotricistas e desenvolvedores: junte-se como testador beta ou revisor científico.
                  </p>
                </div>
              </div>
              <div className="mt-12 space-y-4">
                <Button 
                  onClick={() => window.location.href = "mailto:sapientcontato@gmail.com?subject=Colaboração Técnica - UrbeLudo"}
                  variant="outline"
                  className="w-full h-16 border-indigo-500/30 text-indigo-600 hover:bg-indigo-50 font-black uppercase tracking-widest rounded-full text-[10px] flex items-center justify-center gap-2"
                >
                  <Mail className="h-3 w-3" /> Quero Colaborar
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Rodapé Estratégico */}
      <section className="py-20 bg-foreground text-white border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Créditos de Engenharia</p>
              <p className="text-xl font-bold">Um projeto original <span className="text-primary">Studio Sapient</span> & LuscaLab.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest">Status: Prototipagem e validação clínica.</p>
              </div>
              <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Contato: sapientcontato@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
