
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
  QrCode,
  Copy,
  MousePointer2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    <main className="min-h-screen bg-[#fbfaff] selection:bg-cyan-500/30">
      <Navbar />
      
      {/* 1. Hero Section (O Impacto Visual) */}
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-56 hero-purple-mesh overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-10 animate-slide-up">
              <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-500/30 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md animate-glow-pulse">
                [ PROJETO EM DESENVOLVIMENTO ]
              </Badge>
            </div>
            
            <h1 className="font-headline text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] mb-10 text-balance animate-slide-up [animation-delay:200ms]">
              UrbeLudo — <span className="text-cyan-400 italic font-medium">A Ciência do Movimento</span> Codificada.
            </h1>
            
            <p className="text-xl md:text-3xl text-white/70 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance mb-16 animate-slide-up [animation-delay:400ms]">
              Uma plataforma de suporte preditivo que une <span className="text-white font-bold">Psicomotricidade</span>, <span className="text-white font-bold">Fonoaudiologia</span> e <span className="text-white font-bold">Edge AI</span> para transformar a reabilitação institucional.
            </p>
            
            {/* Guias de Navegação Rápida - Estilo Premium */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-10 mb-16 animate-slide-up [animation-delay:600ms]">
              {[
                { id: 'manifesto', label: 'Manifesto' },
                { id: 'tecnologia', label: 'Engenharia' },
                { id: 'engajamento', label: 'Impacto' }
              ].map((nav) => (
                <button 
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)} 
                  className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-cyan-400 transition-all duration-500"
                >
                  <span className="h-[1px] w-0 bg-cyan-400 transition-all duration-500 group-hover:w-6" />
                  {nav.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-slide-up [animation-delay:800ms]">
              <Button 
                onClick={() => scrollToSection('engajamento')}
                className="h-24 px-16 bg-white text-primary hover:bg-cyan-50 rounded-full font-black uppercase tracking-[0.3em] text-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-700"
              >
                Como Ajudar <ArrowRight className="ml-4 h-5 w-5" />
              </Button>
              <button 
                onClick={() => scrollToSection('manifesto')}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.4em] group"
              >
                Explorar Visão <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Elementos Decorativos Flutuantes */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float [animation-delay:2s]" />
        
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#fbfaff] to-transparent" />
      </section>

      {/* 2. O Manifesto (O "Porquê") */}
      <section id="manifesto" className="py-32 md:py-56 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center space-y-16">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/5 text-primary mb-4 animate-float">
              <Sparkles className="h-10 w-10" />
            </div>
            <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]">
              A reabilitação não precisa ser <span className="text-primary italic opacity-90">estática.</span>
            </h2>
            <blockquote className="text-2xl md:text-5xl text-muted-foreground/80 font-medium leading-tight tracking-tight italic max-w-4xl mx-auto">
              "Acreditamos que o movimento humano é a interface mais rica que existe. O UrbeLudo nasce para dar voz ao corpo e dados ao terapeuta, criando uma ponte entre o exercício clínico e o engajamento lúdico de alta tecnologia."
            </blockquote>
            <div className="h-2 w-32 bg-primary/20 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* 3. Os Pilares Técnicos (O "Como") */}
      <section id="tecnologia" className="py-32 md:py-56 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary mb-6">Engenharia Cognitiva</p>
            <h3 className="font-headline text-5xl md:text-[7rem] font-black tracking-tighter leading-none">Pilares do Ecossistema</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              { 
                icon: <Cpu className="h-10 w-10" />, 
                title: "Edge AI", 
                method: "Psicomotricidade", 
                desc: "Processamento de dados em tempo real no dispositivo, garantindo privacidade e latência zero em diagnósticos de movimento." 
              },
              { 
                icon: <Boxes className="h-10 w-10" />, 
                title: "Unity Engine", 
                method: "Fonoaudiologia", 
                desc: "Ambientes imersivos e gamificados projetados para maximizar a adesão ao tratamento e o engajamento sensorial." 
              },
              { 
                icon: <Activity className="h-10 w-10" />, 
                title: "Biofeedback", 
                method: "Análise Preditiva", 
                desc: "Relatórios precisos sobre a evolução motora e vocal, facilitando decisões clínicas baseadas em evidências sólidas." 
              }
            ].map((pilar, i) => (
              <div 
                key={i} 
                className="card-premium-bg p-16 rounded-[4.5rem] space-y-10 group hover:-translate-y-6 transition-all duration-1000 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.05)]"
              >
                <div className="h-20 w-20 rounded-[2rem] bg-white flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:scale-110">
                  {pilar.icon}
                </div>
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{pilar.method}</p>
                  <h4 className="font-headline text-3xl md:text-4xl font-black tracking-tighter group-hover:text-primary transition-colors">{pilar.title}</h4>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed tracking-tight">{pilar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mural de Engajamento (Como Ajudar) */}
      <section id="engajamento" className="py-32 md:py-56 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h3 className="font-headline text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-8">Mural de <br /><span className="text-primary italic opacity-90">Impacto.</span></h3>
            <p className="text-2xl text-muted-foreground/70 font-medium tracking-tight">Escolha seu caminho para impulsionar a tecnologia de reabilitação brasileira.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[90rem] mx-auto">
            
            {/* A. Investimento */}
            <div className="p-16 rounded-[5rem] bg-foreground text-white flex flex-col justify-between group hover:scale-[1.03] transition-all duration-1000 border-t-[8px] border-cyan-500 shadow-4xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <TrendingUp className="h-64 w-64" />
              </div>
              <div className="space-y-10 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="h-20 w-20 rounded-3xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-none text-[10px] font-black px-6 py-2 rounded-full tracking-widest uppercase">EQUITY & SCALE</Badge>
                </div>
                <div className="space-y-6">
                  <h4 className="font-headline text-4xl font-black tracking-tighter">Investimento Estratégico</h4>
                  <p className="text-white/50 font-medium text-lg leading-relaxed tracking-tight">
                    Buscamos investidores anjo e fundos de HealthTech para escala de desenvolvimento, hardware proprietário e certificações clínicas globais.
                  </p>
                </div>
              </div>
              <div className="mt-16 space-y-6 relative z-10">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] text-center">Falar com Estrategista</p>
                <Button 
                  onClick={() => window.location.href = "mailto:sapientcontato@gmail.com?subject=Interesse em Investimento - UrbeLudo"}
                  className="w-full h-24 bg-cyan-500 hover:bg-cyan-400 text-foreground font-black uppercase tracking-[0.3em] rounded-full text-[12px] shadow-2xl transition-all"
                >
                  Solicitar Pitch Deck
                </Button>
              </div>
            </div>

            {/* B. Doações */}
            <div className="p-16 rounded-[5rem] bg-white border border-primary/10 flex flex-col justify-between group hover:scale-[1.03] transition-all duration-1000 shadow-4xl border-t-[8px] border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Heart className="h-64 w-64" />
              </div>
              <div className="space-y-10 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary">
                    <Heart className="h-10 w-10" />
                  </div>
                  <Badge className="bg-primary/5 text-primary border-none text-[10px] font-black px-6 py-2 rounded-full tracking-widest uppercase">RESEARCH & SOCIAL</Badge>
                </div>
                <div className="space-y-6">
                  <h4 className="font-headline text-4xl font-black tracking-tighter">Apoie a Pesquisa</h4>
                  <p className="text-muted-foreground/70 font-medium text-lg leading-relaxed tracking-tight">
                    Ajude a manter a plataforma acessível a instituições públicas e ONGs através de fomento à pesquisa contínua e inclusão digital.
                  </p>
                </div>
              </div>
              <div className="mt-16 space-y-6 relative z-10">
                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 text-center space-y-2">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1">Pix Direto (E-mail)</p>
                  <p className="text-lg font-black text-foreground">sapientcontato@gmail.com</p>
                  <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">Favorecido: Lucas Santos de Souza</p>
                </div>
                <Button 
                  onClick={copyPix}
                  className="w-full h-24 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] rounded-full text-[12px] flex items-center justify-center gap-4 shadow-2xl shadow-primary/20 transition-all"
                >
                  <QrCode className="h-6 w-6" /> Copiar Chave PIX
                </Button>
              </div>
            </div>

            {/* C. Colaboração */}
            <div className="p-16 rounded-[5rem] bg-secondary/40 flex flex-col justify-between group hover:scale-[1.03] transition-all duration-1000 border-t-[8px] border-indigo-500 shadow-4xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Code2 className="h-64 w-64" />
              </div>
              <div className="space-y-10 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="h-20 w-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <Code2 className="h-10 w-10" />
                  </div>
                  <Badge className="bg-indigo-500/10 text-indigo-500 border-none text-[10px] font-black px-6 py-2 rounded-full tracking-widest uppercase">TALENT & KNOWLEDGE</Badge>
                </div>
                <div className="space-y-6">
                  <h4 className="font-headline text-4xl font-black tracking-tighter">Colaboração Técnica</h4>
                  <p className="text-muted-foreground/70 font-medium text-lg leading-relaxed tracking-tight">
                    Fonoaudiólogos, psicomotricistas e desenvolvedores (Unity/AI): junte-se ao nosso ecossistema como testador beta ou revisor científico.
                  </p>
                </div>
              </div>
              <div className="mt-16 space-y-6 relative z-10">
                <Button 
                  onClick={() => window.location.href = "mailto:sapientcontato@gmail.com?subject=Colaboração Técnica - UrbeLudo"}
                  variant="outline"
                  className="w-full h-24 border-indigo-500/30 text-indigo-600 hover:bg-indigo-50 font-black uppercase tracking-[0.3em] rounded-full text-[12px] flex items-center justify-center gap-4 transition-all"
                >
                  <Mail className="h-6 w-6" /> Quero Colaborar
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Rodapé Estratégico */}
      <section className="py-24 bg-foreground text-white border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white/30">Créditos de Engenharia</p>
              <p className="text-3xl font-black tracking-tighter">Um projeto original <span className="text-primary italic">Studio Sapient</span> & LuscaLab.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex items-center gap-6 bg-white/5 px-10 py-5 rounded-full border border-white/10 backdrop-blur-3xl">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/70">Status: Prototipagem e validação clínica.</p>
              </div>
              <div className="flex flex-col items-center md:items-end opacity-40 hover:opacity-100 transition-opacity">
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Conexão Estratégica</p>
                 <p className="text-sm font-black text-cyan-400 tracking-wider">sapientcontato@gmail.com</p>
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
