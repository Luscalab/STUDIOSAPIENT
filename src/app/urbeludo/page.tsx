
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
  TrendingUp,
  Mic2,
  ChevronDown,
  Target,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Mail,
  Heart,
  Copy,
  CheckCircle2,
  ExternalLink,
  Code2,
  Gamepad2,
  Users2,
  Stethoscope
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UrbeLudoPage() {
  const { toast } = useToast();
  
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `[ ${label.toUpperCase()} COPIADO ]`,
      description: "Pronto para uso na sua área de transferência.",
      className: "bg-[#08070b] border-cyan-500/50 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(6,182,212,0.3)]"
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactEmail = "sapientcontato@gmail.com";
  const pixKey = "sapientcontato@gmail.com";

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0c] text-white selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section - HealthTech Prestige */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-md animate-pulse">
                HealthTech Innovation
              </Badge>
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8 py-4">
              UrbeLudo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-primary italic font-medium block">Onde o Movimento Encontra a Inteligência Digital.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed tracking-tight text-balance mb-16">
              Escalando a eficácia clínica através de tecnologia multiplataforma e suporte preditivo em tempo real.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Button 
                onClick={() => scrollToSection('desafio')}
                className="h-20 px-12 bg-white text-black hover:bg-cyan-400 rounded-full font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500 shadow-2xl"
              >
                CONHECER A SOLUÇÃO
              </Button>
              <button 
                onClick={() => scrollToSection('expertise')}
                className="flex items-center gap-4 text-white/30 hover:text-white transition-all duration-500 text-[9px] font-black uppercase tracking-widest group"
              >
                Cérebro do Projeto <ChevronDown className="h-4 w-4 animate-bounce group-hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O Desafio - Narrative Focus */}
      <section id="desafio" className="py-24 md:py-48 bg-white text-slate-950 relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              O Grande Desafio da <br/><span className="text-primary italic">Reabilitação Infantil.</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-tight tracking-tight">
                  A jornada neuropsicomotora enfrenta um obstáculo silencioso: o abismo entre o consultório e a vida real.
                </p>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
              <div className="space-y-8">
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Sem ferramentas que garantam a continuidade lúdica e a coleta de dados precisos em casa, o progresso torna-se lento e desmotivador. O UrbeLudo nasceu para digitalizar essa jornada e devolver o que há de mais precioso: <span className="text-slate-950 font-bold">a autonomia humana.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A Solução & SPSP - Tech Focus */}
      <section id="spsp" className="py-24 md:py-48 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em]">Multiplataforma Full-Stack</Badge>
                <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none text-white">Ecossistema <br/>UrbeLudo</h3>
                <p className="text-xl text-white/50 font-medium max-w-2xl leading-relaxed">
                  Transformamos protocolos de saúde em experiências de engajamento profundo através de uma solução disponível para iOS, Android e Web.
                </p>
              </div>

              <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-700">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Brain className="h-40 w-40 text-cyan-400" />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tighter uppercase text-cyan-400">SPSP Core</h4>
                  </div>
                  <p className="text-lg text-white/80 font-medium leading-relaxed">
                    O <span className="text-white font-bold">Sistema Preditivo de Suporte Psicomotor</span> é a nossa inteligência capaz de monitorar o desempenho e oferecer suporte preditivo para o ajuste de terapias em tempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
               <div className="p-8 rounded-[3rem] bg-[#121216] border border-white/5 flex items-start gap-6 group hover:bg-white/5 transition-all">
                 <Smartphone className="h-10 w-10 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                 <div>
                    <h5 className="font-bold text-lg uppercase tracking-tight mb-2">Acesso Omnicanal</h5>
                    <p className="text-white/40 text-sm">Pronto para rodar em Mobile e Desktop, garantindo adesão onde quer que a família esteja.</p>
                 </div>
               </div>
               <div className="p-8 rounded-[3rem] bg-[#121216] border border-white/5 flex items-start gap-6 group hover:bg-white/5 transition-all">
                 <ShieldCheck className="h-10 w-10 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                 <div>
                    <h5 className="font-bold text-lg uppercase tracking-tight mb-2">Rigor Científico</h5>
                    <p className="text-white/40 text-sm">Protocolos baseados em evidências, unindo a psicomotricidade clássica ao design lúdico.</p>
                 </div>
               </div>
               <div className="p-8 rounded-[3rem] bg-[#121216] border border-white/5 flex items-start gap-6 group hover:bg-white/5 transition-all">
                 <BarChart3 className="h-10 w-10 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                 <div>
                    <h5 className="font-bold text-lg uppercase tracking-tight mb-2">Dados em Tempo Real</h5>
                    <p className="text-white/40 text-sm">Relatórios estruturados que otimizam o tempo do terapeuta e geram evidências para convênios.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pilares de Atuação */}
      <section className="py-24 md:py-48 bg-white text-slate-950 relative rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6">Nossos <br/><span className="text-primary italic">Pilares de Cuidado.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-700">
               <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                 <Mic2 className="h-8 w-8" />
               </div>
               <div className="space-y-4">
                  <h4 className="font-headline text-2xl font-black tracking-tighter uppercase leading-none">Fonoaudiologia Digital</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Estímulos de fala e linguagem integrados a mecânicas interativas que transformam a emissão sonora em progresso visível.</p>
               </div>
            </div>

            <div className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-700">
               <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                 <Target className="h-8 w-8" />
               </div>
               <div className="space-y-4">
                  <h4 className="font-headline text-2xl font-black tracking-tighter uppercase leading-none">Terapia Ocupacional</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Desafios de planejamento motor e organização sensorial desenhados para ampliar a autonomia no dia a dia da criança.</p>
               </div>
            </div>

            <div className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-700">
               <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                 <BarChart3 className="h-8 w-8" />
               </div>
               <div className="space-y-4">
                  <h4 className="font-headline text-2xl font-black tracking-tighter uppercase leading-none">Reabilitação Motora</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Guia de movimentos funcionais com foco na coordenação e no equilíbrio, unindo o rigor científico à leveza do lúdico.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Inteligência Multidisciplinar */}
      <section id="expertise" className="py-24 md:py-48 relative overflow-hidden bg-[#08070b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
            <Badge className="bg-white/5 text-white/40 border-white/10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em]">Expertise Transversal</Badge>
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none text-white uppercase">Inteligência <br/><span className="text-cyan-400 italic">Multidisciplinar.</span></h3>
            <p className="text-xl text-white/50 font-medium leading-relaxed">O UrbeLudo é a fusão entre rigor clínico e engenharia de software de elite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 group hover:bg-white/10 transition-all">
              <div className="h-14 w-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Users2 className="h-7 w-7" />
              </div>
              <h5 className="font-black text-lg uppercase tracking-tight">Design & UX</h5>
              <p className="text-white/40 text-sm leading-relaxed">Estrategistas visuais que removem barreiras de resistência através de interfaces lúdicas e invisíveis.</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 group hover:bg-white/10 transition-all">
              <div className="h-14 w-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Stethoscope className="h-7 w-7" />
              </div>
              <h5 className="font-black text-lg uppercase tracking-tight">Corpo Clínico</h5>
              <p className="text-white/40 text-sm leading-relaxed">Psicólogos e Fonos que validam cada estímulo para garantir eficácia neuropsicomotora absoluta.</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 group hover:bg-white/10 transition-all">
              <div className="h-14 w-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Gamepad2 className="h-7 w-7" />
              </div>
              <h5 className="font-black text-lg uppercase tracking-tight">Game Dev</h5>
              <p className="text-white/40 text-sm leading-relaxed">Programadores de jogos que transformam protocolos áridos em jornadas imersivas de alto engajamento.</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 group hover:bg-white/10 transition-all">
              <div className="h-14 w-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Code2 className="h-7 w-7" />
              </div>
              <h5 className="font-black text-lg uppercase tracking-tight">Full-Stack Dev</h5>
              <p className="text-white/40 text-sm leading-relaxed">Engenheiros de software garantindo que o SPSP rode com performance total em qualquer ecossistema digital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Por que Investir? - Business Focus & Cards */}
      <section id="investidores" className="py-24 md:py-48 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6 space-y-12">
              <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none text-white">Ativo Estratégico para <br/><span className="text-primary italic">Saúde Digital.</span></h3>
              <p className="text-xl text-white/40 font-medium max-w-xl">
                O UrbeLudo está posicionado na fronteira da inovação assistiva, unindo psicomotricidade e desenvolvimento de software de elite.
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-4 text-white/80 font-black text-xs md:text-lg uppercase tracking-widest">
                  <CheckCircle2 className="text-cyan-400 h-6 w-6 shrink-0" /> Escalabilidade Full-Stack (B2B/B2C)
                </div>
                <div className="flex items-center gap-4 text-white/80 font-black text-xs md:text-lg uppercase tracking-widest">
                  <CheckCircle2 className="text-cyan-400 h-6 w-6 shrink-0" /> SPSP – Inteligência de Dados Proprietária
                </div>
                <div className="flex items-center gap-4 text-white/80 font-black text-xs md:text-lg uppercase tracking-widest">
                  <CheckCircle2 className="text-cyan-400 h-6 w-6 shrink-0" /> Engajamento Imbatível via Ludicidade
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-8">
              {/* Card Contato / Parceria */}
              <div className="p-10 rounded-[3.5rem] bg-white text-slate-950 space-y-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group border border-slate-100 hover:scale-[1.02] transition-all duration-500">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                   <TrendingUp className="h-48 w-48 text-primary" />
                 </div>
                 <div className="space-y-6 relative z-10">
                   <Badge className="bg-primary/10 text-primary border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">Parceria Estratégica</Badge>
                   <h4 className="font-headline text-3xl font-black tracking-tighter uppercase leading-none">Vamos mover o <br/>futuro juntos?</h4>
                   <p className="text-slate-500 font-medium text-lg leading-relaxed">
                     Estamos em busca de investidores e parceiros estratégicos que compartilhem da nossa visão de futuro para a saúde digital.
                   </p>
                   <div className="pt-4">
                      <button 
                        onClick={() => copyToClipboard(contactEmail, "E-mail")} 
                        className="flex items-center justify-between w-full p-6 rounded-2xl bg-slate-50 border border-slate-200 group/btn hover:border-primary hover:bg-white transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <Mail className="h-5 w-5 text-primary" />
                          <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">{contactEmail}</span>
                        </div>
                        <Copy className="h-4 w-4 text-slate-300 group-hover/btn:text-primary transition-colors" />
                      </button>
                   </div>
                 </div>
              </div>

              {/* Card PIX / Apoio Social */}
              <div className="p-10 rounded-[3.5rem] bg-[#121216] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Heart className="h-48 w-48 text-primary" />
                 </div>
                 <div className="space-y-6 relative z-10">
                   <Badge className="bg-cyan-500/10 text-cyan-400 border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">Apoio Social</Badge>
                   <h4 className="font-headline text-3xl font-black tracking-tighter uppercase leading-none text-white">Impacto Real <br/>na Vida Real.</h4>
                   <p className="text-white/40 font-medium text-lg leading-relaxed">
                     Sua doação direta via PIX impulsiona o desenvolvimento contínuo e garante a disponibilidade futura do projeto em ONGs e clínicas de baixa renda.
                   </p>
                   <div className="pt-4">
                      <button 
                        onClick={() => copyToClipboard(pixKey, "Chave PIX")} 
                        className="flex items-center justify-between w-full p-6 rounded-2xl bg-white/5 border border-white/10 group/pix hover:border-cyan-400 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <Zap className="h-5 w-5 text-cyan-400" />
                          <span className="font-black text-[10px] md:text-xs uppercase tracking-widest text-white">Copiar Chave PIX</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white/20 group-hover/pix:text-cyan-400 group-hover/pix:translate-x-1 transition-all" />
                      </button>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Final Call */}
      <section className="py-24 bg-white text-slate-950 mx-4 mb-24 rounded-[4rem] md:rounded-[6rem] shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
           <h3 className="font-headline text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-950 uppercase">
             O Futuro é <span className="text-primary italic">Humano.</span>
           </h3>
           <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto tracking-tight">
             O UrbeLudo é a prova de que a tecnologia, quando guiada pelo afeto e pela ciência, é a maior ferramenta de liberdade que existe.
           </p>
           <div className="pt-8">
              <Button onClick={handleOpenChat} className="h-24 px-16 bg-primary text-white hover:bg-primary/90 rounded-full font-black uppercase tracking-[0.4em] text-[12px] transition-all shadow-2xl shadow-primary/30">
                Falar com Estrategista <ExternalLink className="ml-4 h-5 w-5" />
              </Button>
           </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
