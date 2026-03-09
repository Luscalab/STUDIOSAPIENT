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
  Gamepad2,
  Puzzle,
  Waves,
  Target,
  Trophy,
  Phone,
  MessageCircle,
  Dna
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function UrbeLudoPage() {
  const { toast } = useToast();
  
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `[ ${label.toUpperCase()} COPIADO ]`,
      description: "Pronto para uso na sua área de transferência.",
      className: "bg-black border-cyan-500 text-white font-black uppercase tracking-widest text-[10px]"
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactEmail = "sapientcontato@gmail.com";
  const contactPhone = "+55 11 95963-1870";

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0c] text-white selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8 animate-slide-up">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md animate-pulse">
                EM BREVE
              </Badge>
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8 animate-slide-up py-4">
              UrbeLudo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-primary italic font-medium block">A Ciência do Jogo.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance mb-16 animate-slide-up [animation-delay:200ms]">
              Onde o movemento se torna dado e o dado se torna <span className="text-white font-bold">evolução.</span> Uma plataforma de biofeedback de elite para reabilitação cognitiva e motora.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-slide-up [animation-delay:400ms]">
              <Button 
                onClick={() => scrollToSection('impacto')}
                className="h-20 px-12 bg-white text-black hover:bg-cyan-400 rounded-full font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500"
              >
                JUNTE-SE À MISSÃO
              </Button>
              <button 
                onClick={() => scrollToSection('manifesto')}
                className="flex items-center gap-4 text-white/30 hover:text-white transition-all duration-500 text-[9px] font-black uppercase tracking-[0.6em] group"
              >
                Explorar Manifesto <ChevronDown className="h-4 w-4 animate-bounce group-hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O Manifesto */}
      <section id="manifesto" className="py-24 md:py-48 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <h2 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              A reabilitação não precisa ser <span className="text-primary italic">estática.</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <blockquote className="text-xl md:text-3xl text-black/80 font-medium leading-tight tracking-tight italic border-l-[8px] border-primary pl-8">
                "O movimento humano é a interface definitiva. O UrbeLudo nasceu para dar voz ao corpo através do jogo."
              </blockquote>
              <div className="space-y-6">
                <p className="text-lg text-black/50 font-medium leading-relaxed">
                  Transformamos exercícios clínicos em jornadas épicas de engajamento, onde cada progresso é celebrado com precisão de dados.
                </p>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Os Pilares Técnicos */}
      <section id="tecnologia" className="py-24 md:py-48 relative">
        <div className="container mx-auto px-6">
          <div className="mb-24 text-center md:text-left max-w-3xl">
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none text-white">Ecossistema de Precisão.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
            <div className="md:col-span-8 p-12 rounded-[3.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-700 relative overflow-hidden">
               <div className="relative z-10 space-y-8">
                 <div className="h-16 w-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                   <Cpu className="h-8 w-8" />
                 </div>
                 <div className="space-y-4">
                    <h4 className="font-headline text-3xl md:text-5xl font-black tracking-tighter">Edge AI Process</h4>
                    <p className="text-lg text-white/50 font-medium max-w-lg">Inteligência processada na borda para diagnósticos imediatos de biomecânica e fonação.</p>
                 </div>
               </div>
            </div>

            <div className="md:col-span-4 p-10 rounded-[3.5rem] bg-primary text-white space-y-8 transition-all duration-700">
               <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                 <Gamepad2 className="h-8 w-8" />
               </div>
               <div className="space-y-4">
                  <h4 className="font-headline text-2xl md:text-3xl font-black tracking-tighter">Ludicidade Imersiva</h4>
                  <p className="text-base text-white/80">Ambientes Unity projetados para máxima adesão sensorial.</p>
               </div>
            </div>

            <div className="md:col-span-6 p-10 rounded-[3rem] bg-[#121216] border border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <Activity className="h-6 w-6 text-cyan-400" />
                  <h4 className="font-bold text-xl tracking-tighter">Biofeedback Analítico</h4>
                </div>
                <p className="text-white/40 leading-relaxed text-sm">Captura de dados biológicos para relatórios clínicos de alta fidelidade e análise preditiva de evolução.</p>
            </div>

            <div className="md:col-span-6 p-10 rounded-[3rem] bg-[#121216] border border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <Mic2 className="h-6 w-6 text-primary" />
                  <h4 className="font-bold text-xl tracking-tighter">Multidisciplinaridade</h4>
                </div>
                <p className="text-white/40 leading-relaxed text-sm">Protocolos integrados para Fonoaudiologia e Psicomotricidade em um único ambiente digital coeso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mural de Engajamento */}
      <section id="impacto" className="py-24 md:py-48 bg-white text-black relative rounded-[4rem] md:rounded-[8rem] mx-4 mb-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 text-black">Mural de <span className="text-primary italic">Impacto.</span></h3>
            <p className="text-xl text-black/40 font-medium tracking-tight">Escolha seu caminho para impulsionar a tecnologia de reabilitação.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="p-12 rounded-[4rem] bg-black text-white flex flex-col h-full border-t-[8px] border-cyan-400 shadow-xl">
              <div className="space-y-8 flex-1">
                <div className="h-16 w-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h4 className="font-headline text-3xl font-black tracking-tighter">Investimento Estratégico</h4>
                <p className="text-white/40 font-medium text-base">Buscamos investidores anjo e VCs para escala de hardware proprietário e expansão clínica.</p>
              </div>
              <div className="mt-12 p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                <p className="text-sm font-black truncate">{contactEmail}</p>
                <button onClick={() => copyToClipboard(contactEmail, "E-mail")} className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-[8px] font-black uppercase tracking-widest transition-all">Copiar E-mail</button>
              </div>
            </div>

            <div className="p-12 rounded-[4rem] bg-white border-2 border-primary text-black flex flex-col h-full border-t-[8px] shadow-xl">
              <div className="space-y-8 flex-1">
                <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <Heart className="h-8 w-8" />
                </div>
                <h4 className="font-headline text-3xl font-black tracking-tighter">Apoie a Pesquisa Social</h4>
                <p className="text-black/40 font-medium text-base">Ajude a manter a plataforma acessível a ONGs e instituições públicas através de doações diretas.</p>
              </div>
              <div className="mt-12 p-6 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4 text-center">
                <p className="text-sm font-black truncate">{contactEmail}</p>
                <button onClick={() => copyToClipboard(contactEmail, "PIX")} className="w-full py-4 rounded-xl bg-primary text-white hover:bg-primary/90 text-[8px] font-black uppercase tracking-widest transition-all">Copiar Chave PIX</button>
              </div>
            </div>

            <div className="p-12 rounded-[4rem] bg-[#f8f9fa] border border-black/5 text-black flex flex-col h-full border-t-[8px] border-primary shadow-xl">
              <div className="space-y-8 flex-1">
                <div className="h-16 w-16 rounded-2xl bg-black/5 flex items-center justify-center text-black">
                  <Code2 className="h-8 w-8" />
                </div>
                <h4 className="font-headline text-3xl font-black tracking-tighter">Colaboração Especializada</h4>
                <p className="text-black/40 font-medium text-base">Buscamos especialistas em reabilitação clínica e tecnologia para desenvolvimento conjunto.</p>
              </div>
              <div className="mt-12 p-6 rounded-[2rem] bg-black text-white space-y-4">
                <p className="text-xs font-black truncate">{contactEmail}</p>
                <button onClick={() => copyToClipboard(contactEmail, "E-mail")} className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/15 text-[8px] font-black uppercase tracking-widest transition-all border border-white/10">Copiar E-mail</button>
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
