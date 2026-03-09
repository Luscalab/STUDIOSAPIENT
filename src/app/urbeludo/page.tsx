
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
    <main className="min-h-screen bg-[#0a0a0c] text-white selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section (Ultra Premium / Game HUD Style) */}
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-56 overflow-hidden">
        {/* Background Dinâmico */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full animate-float" />
          {/* Grid de fundo sutil */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-10 animate-slide-up">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <Badge className="bg-white/5 text-cyan-400 border-cyan-400/30 px-6 py-2 text-[9px] font-black uppercase tracking-[0.5em] rounded-sm backdrop-blur-3xl">
                ESTÁGIO: PROTOTIPAGEM ALPHA_01
              </Badge>
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[1.1] mb-12 animate-slide-up [animation-delay:200ms] py-4">
              UrbeLudo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-primary italic font-medium">A Ciência do Jogo.</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-white/60 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance mb-20 animate-slide-up [animation-delay:400ms]">
              Onde o movimento se torna dado e o dado se torna <span className="text-white font-bold">evolução.</span> Uma plataforma de biofeedback de elite para reabilitação cognitiva e motora.
            </p>
            
            {/* Guias de Navegação HUD Style */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-16 mb-20 animate-slide-up [animation-delay:600ms]">
              {[
                { id: 'manifesto', label: 'Manifesto', icon: <Waves className="h-3 w-3" /> },
                { id: 'tecnologia', label: 'Engine IA', icon: <Cpu className="h-3 w-3" /> },
                { id: 'impacto', label: 'Missão', icon: <Target className="h-3 w-3" /> }
              ].map((nav) => (
                <button 
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)} 
                  className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-cyan-400 transition-all duration-700"
                >
                  <span className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all">
                    {nav.icon}
                  </span>
                  {nav.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-slide-up [animation-delay:800ms]">
              <Button 
                onClick={() => scrollToSection('impacto')}
                className="h-24 px-16 bg-white text-black hover:bg-cyan-400 rounded-none font-black uppercase tracking-[0.4em] text-[12px] shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-700"
              >
                [ JUNTE-SE À MISSÃO ]
              </Button>
              <button 
                onClick={() => scrollToSection('manifesto')}
                className="flex items-center gap-4 text-white/40 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.6em] group"
              >
                Explorar Core <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Playful Decorative Element */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-20">
           <Gamepad2 className="h-10 w-10 text-cyan-400 animate-float" />
           <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* 2. O Manifesto (Minimalist & Emotional) */}
      <section id="manifesto" className="py-32 md:py-64 bg-white text-black relative overflow-hidden rounded-[5rem] md:rounded-[10rem] mx-4 my-10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-20">
            <div className="flex items-center gap-6">
              <Badge className="bg-black text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-none">CAPÍTULO_01</Badge>
              <div className="h-px flex-1 bg-black/10" />
            </div>
            
            <h2 className="font-headline text-5xl md:text-9xl font-black tracking-tighter leading-[0.85]">
              A reabilitação não precisa ser <span className="text-primary italic">estática.</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
              <blockquote className="text-2xl md:text-4xl text-black/80 font-medium leading-tight tracking-tight italic border-l-[12px] border-primary pl-10">
                "O movimento humano é a interface definitiva. O UrbeLudo nasceu para dar voz ao corpo através do jogo."
              </blockquote>
              <div className="space-y-8">
                <p className="text-xl text-black/50 font-medium leading-relaxed">
                  Transformamos exercícios clínicos em jornadas épicas de engajamento, onde cada progresso é celebrado com precisão de dados.
                </p>
                <div className="h-2 w-32 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Os Pilares Técnicos (Bento Grid Style) */}
      <section id="tecnologia" className="py-32 md:py-64 relative">
        <div className="container mx-auto px-6">
          <div className="mb-32 text-center md:text-left">
            <p className="text-[11px] font-black uppercase tracking-[0.8em] text-cyan-400 mb-6 flex items-center gap-4 justify-center md:justify-start">
               <Dna className="h-4 w-4" /> CORE_TECH
            </p>
            <h3 className="font-headline text-5xl md:text-[8rem] font-black tracking-tighter leading-none text-white">Ecossistema <br /> de Precisão.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 max-w-7xl mx-auto">
            {/* Edge AI - Big Card */}
            <div className="md:col-span-8 p-16 rounded-[4.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-1000 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10">
                 <Cpu className="h-48 w-48 text-cyan-400" />
               </div>
               <div className="relative z-10 space-y-10">
                 <div className="h-20 w-20 rounded-3xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                   <Cpu className="h-10 w-10" />
                 </div>
                 <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400/60">Latência Zero</p>
                    <h4 className="font-headline text-4xl md:text-6xl font-black tracking-tighter">Edge AI Process</h4>
                    <p className="text-xl text-white/50 font-medium max-w-xl">Inteligência processada na borda para diagnósticos imediatos de biomecânica e fonação.</p>
                 </div>
               </div>
            </div>

            {/* Unity - Small Card */}
            <div className="md:col-span-4 p-12 rounded-[4.5rem] bg-primary text-white space-y-10 group hover:scale-[1.02] transition-all duration-1000">
               <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center text-white">
                 <Gamepad2 className="h-10 w-10" />
               </div>
               <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Engagement</p>
                  <h4 className="font-headline text-3xl font-black tracking-tighter">Ludicidade Imersiva</h4>
                  <p className="text-lg text-white/80">Ambientes Unity projetados para máxima adesão sensorial.</p>
               </div>
            </div>

            {/* Biofeedback - Bento Item */}
            <div className="md:col-span-6 p-12 rounded-[4rem] bg-[#121216] border border-white/5 space-y-10">
                <div className="flex items-center gap-4">
                  <Activity className="h-8 w-8 text-cyan-400" />
                  <h4 className="font-bold text-2xl tracking-tighter">Biofeedback Analítico</h4>
                </div>
                <p className="text-white/40 leading-relaxed">Captura de dados biológicos para relatórios clínicos de alta fidelidade e análise preditiva de evolução.</p>
            </div>

            {/* Fono/Psico - Bento Item */}
            <div className="md:col-span-6 p-12 rounded-[4rem] bg-[#121216] border border-white/5 space-y-10">
                <div className="flex items-center gap-4">
                  <Mic2 className="h-8 w-8 text-primary" />
                  <h4 className="font-bold text-2xl tracking-tighter">Multidisciplinaridade</h4>
                </div>
                <p className="text-white/40 leading-relaxed">Protocolos integrados para Fonoaudiologia e Psicomotricidade em um único ambiente digital coeso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mural de Engajamento (Premium Action Cards) */}
      <section id="impacto" className="py-32 md:py-64 bg-white text-black relative rounded-[5rem] md:rounded-[10rem] mx-4 mb-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h3 className="font-headline text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-8 text-black">Mural de <br /><span className="text-primary italic">Impacto.</span></h3>
            <p className="text-2xl text-black/40 font-medium tracking-tight">Escolha seu caminho para impulsionar a tecnologia de reabilitação.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[95rem] mx-auto">
            
            {/* A. Investimento */}
            <div className="group relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-16 rounded-[5rem] bg-black text-white flex flex-col h-full border-t-[10px] border-cyan-400 shadow-2xl hover:-translate-y-6 transition-all duration-1000">
                <div className="space-y-10 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="h-20 w-20 rounded-3xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                      <TrendingUp className="h-10 w-10" />
                    </div>
                    <Trophy className="h-10 w-10 text-cyan-400/20" />
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-headline text-4xl font-black tracking-tighter">Investimento <br />Estratégico</h4>
                    <p className="text-white/40 font-medium text-lg leading-relaxed">
                      Buscamos investidores anjo e VCs para escala de hardware proprietário e expansão clínica.
                    </p>
                  </div>
                </div>
                
                <div className="mt-16 space-y-6">
                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-cyan-400" />
                      <p className="text-base font-black truncate">{contactEmail}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(contactEmail, "E-mail")}
                      className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                      Copiar E-mail Profissional
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Doações (Playful Touch) */}
            <div className="group relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-16 rounded-[5rem] bg-white border-2 border-primary text-black flex flex-col h-full border-t-[10px] shadow-2xl hover:-translate-y-6 transition-all duration-1000">
                <div className="space-y-10 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary">
                      <Heart className="h-10 w-10" />
                    </div>
                    <Puzzle className="h-10 w-10 text-primary/10" />
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-headline text-4xl font-black tracking-tighter">Apoie a <br />Pesquisa Social</h4>
                    <p className="text-black/40 font-medium text-lg leading-relaxed">
                      Ajude a manter a plataforma acessível a ONGs e instituições públicas através de doações diretas.
                    </p>
                  </div>
                </div>
                
                <div className="mt-16 space-y-6">
                  <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-4 text-center">
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">Favorecido: Lucas Santos de Souza</p>
                    <p className="text-base font-black truncate">{contactEmail}</p>
                    <button 
                      onClick={() => copyToClipboard(contactEmail, "PIX")}
                      className="w-full py-4 rounded-xl bg-primary text-white hover:bg-primary/90 text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                      <QrCode className="h-4 w-4" /> Copiar Chave PIX
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Colaboração */}
            <div className="group relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-16 rounded-[5rem] bg-[#f8f9fa] border border-black/5 text-black flex flex-col h-full border-t-[10px] border-primary shadow-2xl hover:-translate-y-6 transition-all duration-1000">
                <div className="space-y-10 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="h-20 w-20 rounded-3xl bg-black/5 flex items-center justify-center text-black">
                      <Code2 className="h-10 w-10" />
                    </div>
                    <Boxes className="h-10 w-10 text-black/10" />
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-headline text-4xl font-black tracking-tighter">Colaboração <br />Multidisciplinar</h4>
                    <p className="text-black/40 font-medium text-lg leading-relaxed">
                      Buscamos Devs (Unity/AI), Designers, Psicólogos e Fonoaudiólogos para validar nossa ciência.
                    </p>
                  </div>
                </div>
                
                <div className="mt-16 space-y-4">
                  <div className="p-8 rounded-[2.5rem] bg-black text-white space-y-4">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <p className="text-sm font-black">{contactPhone}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(contactPhone, "WhatsApp")}
                      className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                      Copiar WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Rodapé Especial (HUD Style) */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-16 border-t border-white/10 pt-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-1 w-20 bg-cyan-400 rounded-full" />
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">SAPIENT_ENGINE_V2</p>
              </div>
              <p className="text-4xl md:text-6xl font-black tracking-tighter">Um projeto original <br /><span className="text-primary italic">Sapient Studio.</span></p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-10">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl flex items-center gap-8">
                <div className="text-center md:text-right">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Status do Sistema</p>
                  <p className="text-lg font-black text-green-400 tracking-tighter">ALPHA_VALIDATION</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-green-400/30 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-400 animate-ping" />
                </div>
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
