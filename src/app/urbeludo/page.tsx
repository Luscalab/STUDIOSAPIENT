
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Stethoscope,
  HandHeart,
  Globe,
  Activity,
  Building2,
  LayoutDashboard,
  Box,
  Smile,
  Navigation,
  Layers,
  Info,
  Rocket,
  Search,
  PenTool,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function UrbeLudoPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("");
  
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
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['desafio', 'semiotica', 'spsp', 'marcos', 'expertise', 'faq', 'investidores'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const contactEmail = "sapientcontato@gmail.com";
  const pixKey = "sapientcontato@gmail.com";

  const navItems = [
    { id: 'desafio', label: 'Desafio', icon: <Target className="h-4 w-4" /> },
    { id: 'semiotica', label: 'Semiótica', icon: <Info className="h-4 w-4" /> },
    { id: 'spsp', label: 'SPSP Tech', icon: <Cpu className="h-4 w-4" /> },
    { id: 'marcos', label: 'Marcos', icon: <Rocket className="h-4 w-4" /> },
    { id: 'expertise', label: 'Equipe', icon: <Users2 className="h-4 w-4" /> },
    { id: 'faq', label: 'Dúvidas', icon: <Zap className="h-4 w-4" /> },
    { id: 'investidores', label: 'Apoiar', icon: <Heart className="h-4 w-4" /> },
  ];

  const faqs = [
    {
      icon: <Zap className="h-5 w-5" />,
      question: "O que é exatamente o Urbeludo?",
      answer: "O Urbeludo é uma plataforma digital de suporte à reabilitação neuropsicomotora. Através de um aplicativo gamificado, ele transforma exercícios terapêuticos de Fonoaudiologia, Terapia Ocupacional e Reabilitação Motora em missões lúdicas, utilizando o sistema SPSP para monitorar e prever a evolução do paciente."
    },
    {
      icon: <Users2 className="h-5 w-5" />,
      question: "O Urbeludo substitui o terapeuta?",
      answer: "Não. O Urbeludo é uma ferramenta de auxílio e potencialização. Ele funciona como o braço direito do profissional, garantindo que o paciente continue se exercitando em casa com a mesma diretriz clínica do consultório, além de fornecer dados precisos para que o terapeuta tome decisões melhores e mais rápidas."
    },
    {
      icon: <Brain className="h-5 w-5" />,
      question: "O que significa a sigla SPSP e qual sua função?",
      answer: "SPSP significa Sistema Preditivo de Suporte Psicomotor. É a inteligência analítica do app que processa os dados de interação da criança (tempo de resposta, precisão de movimento, clareza fonológica) e gera relatórios que apontam tendências de melhora ou estagnação, permitindo um ajuste preventivo no plano de tratamento."
    },
    {
      icon: <Activity className="h-5 w-5" />,
      question: "Como um jogo digital pode ajudar na reabilitação física?",
      answer: "O jogo utiliza a Ludicidade Progressiva para gerar engajamento. Ao transformar um exercício repetitivo em um desafio gamificado, estimulamos a neuroplasticidade e a liberação de dopamina, o que aumenta a aderência da criança ao tratamento e torna o ganho de consciência corporal e motora muito mais fluido."
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      question: "Em quais dispositivos o Urbeludo funciona?",
      answer: "Focamos na acessibilidade total. O Urbeludo é uma solução multiplataforma, rodando nativamente em sistemas iOS (iPhones e iPads), Android e também em qualquer navegador via Web. Isso permite que o terapeuta gerencie os dados no computador enquanto a criança joga no tablet ou celular."
    },
    {
      icon: <Mic2 className="h-5 w-5" />,
      question: "Como o aplicativo auxilia especificamente na Fonoaudiologia?",
      answer: "O app utiliza o reconhecimento de voz e captação de áudio para incentivar a emissão sonora. Em missões de fala, a criança precisa atingir determinadas frequências ou clareza fonética para desbloquear recompensas no jogo, tornando o treino orofacial divertido e constante."
    },
    {
      icon: <Stethoscope className="h-5 w-5" />,
      question: "O Urbeludo pode ser usado por crianças com qualquer diagnóstico?",
      answer: "Sim, o foco é o suporte psicomotor amplo. Ele é especialmente eficaz para crianças com atrasos no desenvolvimento, TEA (Transtorno do Espectro Autista), TDAH, Síndrome de Down e paralisia cerebral, pois as atividades são adaptáveis ao nível de desafio que cada paciente suporta."
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      question: "Os dados do meu paciente/filho estão seguros?",
      answer: "Segurança é prioridade. O Urbeludo é desenvolvido seguindo as normas da LGPD (Lei Geral de Proteção de Dados). Todas as informações clínicas e de desempenho são criptografadas e o acesso é restrito ao profissional responsável e aos tutores legais."
    },
    {
      icon: <Target className="h-5 w-5" />,
      question: "Qual o diferencial do Urbeludo para outros apps de jogos infantis?",
      answer: "Diferente de jogos comuns, o Urbeludo é fundamentado em conceitos científicos de Psicomotricidade e Ludicidade. Cada mecânica de jogo tem um propósito terapêutico validado. Enquanto outros apps focam apenas em entretenimento, nós focamos em resultado clínico mensurável."
    },
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      question: "Como as clínicas e terapeutas podem adotar o sistema? ",
      answer: "O Urbeludo opera em um modelo de assinatura (SaaS). As clínicas podem contratar licenças para seus terapeutas, que por sua vez vinculam seus pacientes à plataforma, criando uma rede de monitoramento em tempo real que valoriza o serviço prestado e fideliza as famílias."
    }
  ];

  const milestones = [
    {
      id: "fase-01",
      title: "Fase 01: Arquitetura e Inteligência",
      status: "Em andamento",
      desc: "Nesta etapa, consolidamos a base lógica do SPSP (Sistema Preditivo de Suporte Psicomotor) e o design de experiência (UX) focado na acessibilidade. É aqui que o conhecimento clínico se traduz em algoritmos de monitoramento e engajamento.",
      icon: <Brain />,
      color: "from-cyan-400 to-cyan-600"
    },
    {
      id: "fase-02",
      title: "Fase 02: O Nascimento do MVP",
      status: "Planejado",
      desc: "Desenvolvimento da versão inicial multiplataforma. O foco está na estabilidade da integração entre as interfaces iOS, Android e Web, criando um ambiente fluido onde o terapeuta e a família se conectam em tempo real.",
      icon: <Smartphone />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "fase-03",
      title: "Fase 03: Validação e Refinamento",
      status: "Planejado",
      desc: "O Urbeludo entra em clínicas parceiras para testes controlados. Nesta fase, calibramos nossa inteligência preditiva com dados reais, garantindo que os relatórios gerados sejam ferramentas de transformação na mão dos especialistas.",
      icon: <Activity />,
      color: "from-indigo-600 to-primary"
    },
    {
      id: "fase-04",
      title: "Fase 04: Lançamento e Escala",
      status: "Planejado",
      desc: "A abertura oficial do ecossistema para o mercado global de HealthTech. Implementação de módulos avançados de IA e expansão da biblioteca de atividades lúdicas para todas as áreas da reabilitação.",
      icon: <Globe />,
      color: "from-primary to-pink-500"
    }
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[#08070b] text-white selection:bg-cyan-500/30 selection:text-white pb-32">
      <Navbar />
      
      {/* Premium Dock Navigation */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[400]">
        <div className="flex items-center gap-1.5 p-2.5 bg-[#08070b]/60 backdrop-blur-[40px] border border-white/10 rounded-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-20 duration-1000">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 group relative",
                activeSection === item.id 
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5",
                item.id === 'investidores' && "border border-primary/40 shadow-[0_0_15px_rgba(139,92,246,0.25)] animate-glow-pulse"
              )}
            >
              <span className={cn(
                "transition-transform duration-500",
                activeSection === item.id ? "scale-110" : "group-hover:scale-110"
              )}>
                {item.icon}
              </span>
              <span className="hidden md:inline">{item.label}</span>
              {item.id === 'investidores' && (
                 <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 1. Hero Section - HealthTech Prestige */}
      <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(6,182,212,0.12),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-8 py-2.5 text-[9px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-xl animate-pulse">
                HealthTech Vanguarda
              </Badge>
            </div>
            
            <h1 className="font-headline text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              UrbeLudo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-primary italic font-medium block">Movimento & Inteligência.</span>
            </h1>
            
            <p className="text-base md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-tight tracking-tight text-balance mb-16">
              Escalando a eficácia clínica através de tecnologia multiplataforma e suporte preditivo em tempo real para o desenvolvimento infantil.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 opacity-30 animate-bounce">
              <p className="text-[8px] font-black uppercase tracking-[0.6em]">Explore o Ecossistema</p>
              <ChevronDown className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. O Desafio - Manifesto Narrative */}
      <section id="desafio" className="py-20 md:py-32 bg-white text-slate-950 relative overflow-hidden rounded-[3rem] md:rounded-[6rem] mx-4 my-6 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 space-y-8">
                <Badge className="bg-primary/10 text-primary border-none px-5 py-2 text-[9px] font-black uppercase tracking-widest">O Grande Desafio</Badge>
                <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">
                  O Abismo da <br/><span className="text-primary italic">Reabilitação.</span>
                </h2>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
              
              <div className="lg:col-span-7 space-y-8">
                <p className="text-xl md:text-3xl text-slate-900 font-medium leading-tight tracking-tight italic">
                  "A jornada neuropsicomotora enfrenta um obstáculo silencioso: o abismo entre o consultório e a vida real."
                </p>
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                  Sem ferramentas que garantam a continuidade lúdica e a coleta de dados precisos em casa, o progresso de crianças com atrasos no desenvolvimento torna-se lento, caro e, muitas vezes, desmotivador. O UrbeLudo nasceu para digitalizar essa jornada e devolver o que há de mais precioso: <span className="text-slate-950 font-bold underline decoration-primary decoration-4">a autonomia humana.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A Semiótica: Urbanismo do Movimento */}
      <section id="semiotica" className="py-20 md:py-32 relative overflow-hidden bg-[#0a0a0c]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto space-y-8">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-none px-5 py-2 text-[9px] font-black uppercase tracking-widest">Storytelling & Semiótica</Badge>
            <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none text-white uppercase">A Alma do <br/><span className="text-primary italic">Nome.</span></h3>
            <p className="text-lg text-white/50 font-medium leading-tight tracking-tight">
              A fusão estratégica entre a estrutura da ciência e a fluidez do afeto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000">
                 <Building2 className="h-48 w-48 text-cyan-400" />
               </div>
               <div className="space-y-6 relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-lg">
                      <Box className="h-7 w-7" />
                    </div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase text-white">URBE</h4>
                 </div>
                 <p className="text-lg text-white/40 font-medium leading-relaxed">
                   Do latim <span className="text-cyan-400 font-bold italic">Urbs</span> (Cidade). Representa o ambiente, a estrutura e o corpo humano como um espaço habitado. Reabilitar é dar condições para que a criança navegue com autonomia sua própria "urbe interna".
                 </p>
               </div>
            </div>

            <div className="lg:col-span-6 p-10 rounded-[3rem] bg-primary/10 border border-primary/20 space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.1] transition-all duration-1000">
                 <Gamepad2 className="h-48 w-48 text-primary" />
               </div>
               <div className="space-y-6 relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-lg">
                      <Smile className="h-7 w-7" />
                    </div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase text-white">LUDO</h4>
                 </div>
                 <p className="text-lg text-white/40 font-medium leading-relaxed">
                   Do latim <span className="text-primary font-bold italic">Ludus</span> (Jogo/Brincar). O motor da aprendizagem. É através da ludicidade que removemos a resistência e entregamos o resultado terapêutico com alegria.
                 </p>
               </div>
            </div>

            <div className="lg:col-span-12 p-10 md:p-14 rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex flex-col lg:flex-row gap-12 items-center shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.04),transparent_60%)]" />
               <div className="lg:w-1/3 text-center lg:text-left space-y-5 shrink-0">
                 <div className="h-20 w-20 rounded-[2rem] bg-cyan-400 text-black flex items-center justify-center shadow-2xl mx-auto lg:mx-0">
                   <Zap className="h-10 w-10" />
                 </div>
                 <h5 className="text-2xl font-black tracking-tighter uppercase text-white leading-none">Urbanismo do <br/>Movimento</h5>
               </div>
               <div className="lg:w-2/3 space-y-6 relative z-10">
                  <p className="text-2xl md:text-4xl text-white font-black tracking-tighter leading-tight">
                    A Fusão: Urbeludo (Espaço em Movimento)
                  </p>
                  <p className="text-lg text-white/40 font-medium italic">Fugindo do óbvio clínico e focando na organização lúdica:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="h-1 w-10 bg-cyan-400 rounded-full" />
                      <p className="text-base text-white font-bold uppercase tracking-widest">Organização das Funções</p>
                      <p className="text-sm text-white/50 font-medium leading-relaxed">
                        O nome sugere a organização lúdica das funções psicomotoras. É o planejamento estratégico da evolução física através do jogo.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="h-1 w-10 bg-primary rounded-full" />
                      <p className="text-base text-white font-bold uppercase tracking-widest">Sonoridade Robusta</p>
                      <p className="text-sm text-white/50 font-medium leading-relaxed">
                        A sonoridade termina de forma robusta e marcante, fugindo dos nomes frios terminados em "med" ou "fisio".
                      </p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. A Solução & SPSP */}
      <section id="spsp" className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-6">
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-7 py-2 text-[9px] font-black uppercase tracking-[0.4em]">Multiplataforma Full-Stack</Badge>
                <h3 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white">Ecossistema <br/><span className="text-cyan-400 italic">Integrado.</span></h3>
                <p className="text-lg text-white/50 font-medium max-w-xl leading-relaxed">
                  Transformamos protocolos de saúde em experiências de engajamento profundo através de uma solução disponível para iOS, Android e Web.
                </p>
              </div>

              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-1000 shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Brain className="h-40 w-40 text-cyan-400" />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-lg">
                      <Cpu className="h-7 w-7" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tighter uppercase text-cyan-400">Cérebro SPSP</h4>
                  </div>
                  <p className="text-lg text-white/80 font-medium leading-relaxed">
                    O <span className="text-white font-bold underline decoration-cyan-400">Sistema Preditivo de Suporte Psicomotor</span> monitora o desempenho clínico e oferece suporte preditivo para o ajuste de terapias em tempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { icon: <Smartphone />, title: "iOS & Android", desc: "Adesão total em dispositivos móveis." },
                 { icon: <Globe />, title: "Web Platform", desc: "Gestão completa para o terapeuta." },
                 { icon: <ShieldCheck />, title: "Rigor Científico", desc: "Protocolos validados por especialistas." },
                 { icon: <BarChart3 />, title: "Relatórios de Dados", desc: "Dados estruturados para evolução clínica." }
               ].map((item, idx) => (
                 <div key={idx} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-500 shadow-xl">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h5 className="font-black text-lg uppercase tracking-tight mb-2">{item.title}</h5>
                    <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Marcos de Evolução - Timeline Section */}
      <section id="marcos" className="py-20 md:py-32 relative overflow-hidden bg-[#0a0a0c]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24 space-y-8">
            <Badge className="bg-primary/10 text-primary border-none px-7 py-2 text-[9px] font-black uppercase tracking-[0.4em]">Visão de Longo Prazo</Badge>
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase">Marcos de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-pink-500 italic">Evolução.</span></h3>
            <p className="text-xl text-white/50 font-medium leading-relaxed max-w-2xl mx-auto">
              Nossa jornada é guiada pelo rigor científico e pela agilidade tecnológica. Dividimos o desenvolvimento em fases estratégicas para máxima eficácia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-24">
            {milestones.map((milestone, idx) => (
              <div key={milestone.id} className="relative group">
                <div className={cn(
                  "h-full p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-8 transition-all duration-700 hover:bg-white/10 group-hover:border-white/20 shadow-2xl relative overflow-hidden",
                  idx === 0 && "border-cyan-500/30"
                )}>
                  <div className={cn("absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r", milestone.color)} />
                  
                  <div className="space-y-6 relative z-10">
                    <div className={cn("h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500", milestone.color)}>
                      {milestone.icon}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Módulo 0{idx + 1}</span>
                         <Badge className={cn("border-none text-[7px] font-black uppercase tracking-widest", idx === 0 ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/20")}>{milestone.status}</Badge>
                      </div>
                      <h4 className="text-xl font-black tracking-tighter uppercase leading-tight text-white">{milestone.title}</h4>
                      <p className="text-sm text-white/40 font-medium leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center space-y-10 shadow-2xl">
             <h5 className="text-3xl font-black tracking-tighter uppercase text-white">Por que mostramos nosso caminho?</h5>
             <p className="text-lg text-white/40 font-medium leading-relaxed italic">
               Acreditamos que a transparência é o primeiro passo para uma parceria de sucesso. Um projeto de saúde digital não é apenas um software; é um organismo vivo que exige planejamento, ética e visão de longo prazo.
             </p>
             <div className="pt-4">
                <Button onClick={handleOpenChat} className="h-16 px-12 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl group">
                  QUER SABER ONDE ESTAMOS HOJE? <ArrowRight className="ml-4 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Button>
             </div>
          </div>
        </div>
      </section>

      {/* 6. Inteligência Multidisciplinar */}
      <section id="expertise" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24 space-y-8">
            <Badge className="bg-white/5 text-white/40 border-white/10 px-7 py-2 text-[9px] font-black uppercase tracking-[0.4em]">Expertise Transversal Pro Bono</Badge>
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase">Cérebro <br/><span className="text-cyan-400 italic">Multidisciplinar.</span></h3>
            <p className="text-xl text-white/50 font-medium leading-relaxed max-w-2xl mx-auto">
              O UrbeLudo é a fusão entre rigor clínico e engenharia de software de elite, operado por especialistas que contribuem de forma <span className="text-white font-bold">pro bono</span> pelo impacto social.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users2 />, role: "Designers & UX", desc: "Interfaces que removem a resistência informacional." },
              { icon: <Stethoscope />, role: "Psicólogos & Fonos", desc: "Validação clínica de cada estímulo lúdico." },
              { icon: <Gamepad2 />, role: "Game Designers", desc: "Mecânicas de engajamento profundo e diversão." },
              { icon: <Code2 />, role: "Full-Stack Devs", desc: "Arquitetura robusta para escala global do SPSP." }
            ].map((member, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-700 shadow-2xl">
                <div className="h-14 w-14 rounded-xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {member.icon}
                </div>
                <h5 className="font-black text-xl uppercase tracking-tight mb-3">{member.role}</h5>
                <p className="text-white/40 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Estratégico */}
      <section id="faq" className="py-20 md:py-32 bg-white text-slate-950 relative rounded-[3rem] md:rounded-[6rem] mx-4 my-6 shadow-2xl">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 space-y-5">
            <Badge className="bg-primary/10 text-primary border-none px-5 py-2 text-[9px] font-black uppercase tracking-widest">Base de Conhecimento</Badge>
            <h3 className="font-headline text-3xl md:text-5xl font-black tracking-tighter leading-none text-slate-950 uppercase">Dúvidas do <br/><span className="text-primary italic">Ecossistema.</span></h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-slate-50 rounded-[2rem] px-7 py-1 shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline py-5 group">
                  <div className="flex items-center gap-5 text-left">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all">
                      {faq.icon}
                    </div>
                    <span className="font-black text-sm md:text-base tracking-tight uppercase leading-tight text-slate-900">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 font-medium text-sm md:text-base leading-relaxed pb-6 px-4 md:px-16 border-l-2 border-primary/20 ml-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 8. Investimento & Apoio */}
      <section id="investidores" className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-12">
              <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">Pronto para <br/><span className="text-primary italic">Mover o Futuro?</span></h3>
              <p className="text-xl text-white/40 font-medium max-w-md leading-relaxed">
                Buscamos parceiros estratégicos e especialistas dispostos a colaborar pro bono para democratizar a saúde digital.
              </p>
              <div className="space-y-6">
                {[
                  "Escalabilidade Full-Stack Garantida",
                  "Inteligência de Dados Proprietária SPSP",
                  "Impacto Social Medido em Autonomia"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-5 text-white/80 font-black text-[10px] md:text-lg uppercase tracking-widest">
                    <CheckCircle2 className="text-cyan-400 h-6 w-6 shrink-0" /> {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-8">
              <div className="p-10 rounded-[3.5rem] bg-white text-slate-950 space-y-8 shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-all duration-700 border border-slate-100">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                   <HandHeart className="h-48 w-48 text-primary" />
                 </div>
                 <div className="space-y-6 relative z-10">
                   <div className="flex gap-3">
                     <Badge className="bg-primary/10 text-primary border-none px-5 py-2 text-[8px] font-black uppercase tracking-widest">Colaboração Pro Bono</Badge>
                     <Badge className="bg-cyan-500/10 text-cyan-600 border-none px-5 py-2 text-[8px] font-black uppercase tracking-widest">Sem Custos</Badge>
                   </div>
                   <h4 className="font-headline text-3xl font-black tracking-tighter uppercase leading-none">Seja um <br/>Co-Autor.</h4>
                   <p className="text-slate-500 font-medium text-lg leading-relaxed">
                     Buscamos especialistas que queiram atuar <span className="text-primary font-bold">pro bono</span> para acelerar este impacto social sem cobrança de honorários.
                   </p>
                   <button 
                     onClick={() => copyToClipboard(contactEmail, "E-mail")} 
                     className="flex items-center justify-between w-full p-6 rounded-2xl bg-slate-50 border border-slate-200 group/btn hover:border-primary hover:bg-white transition-all shadow-sm"
                   >
                     <div className="flex items-center gap-5">
                       <Mail className="h-5 w-5 text-primary" />
                       <span className="font-black text-[10px] uppercase tracking-[0.2em]">{contactEmail}</span>
                     </div>
                     <Copy className="h-4 w-4 text-slate-300 group-hover/btn:text-primary transition-colors" />
                   </button>
                 </div>
              </div>

              <div className="p-10 rounded-[3.5rem] bg-[#121216] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-all duration-700">
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Heart className="h-48 w-48 text-primary" />
                 </div>
                 <div className="space-y-6 relative z-10">
                   <Badge className="bg-cyan-500/10 text-cyan-400 border-none px-5 py-2 text-[8px] font-black uppercase tracking-widest">Apoio de Desenvolvimento</Badge>
                   <h4 className="font-headline text-3xl font-black tracking-tighter uppercase leading-none text-white">Custear o <br/>Projeto.</h4>
                   <p className="text-white/40 font-medium text-lg leading-relaxed">
                     Sua doação via PIX ajuda a <span className="text-white font-bold">custear o desenvolvimento</span> e garante que esta tecnologia chegue a ONGs e famílias de baixa renda.
                   </p>
                   <button 
                     onClick={() => copyToClipboard(pixKey, "Chave PIX")} 
                     className="flex items-center justify-between w-full p-6 rounded-2xl bg-white/5 border border-white/10 group/pix hover:border-cyan-400 hover:bg-white/10 transition-all shadow-inner"
                   >
                     <div className="flex items-center gap-5">
                       <Zap className="h-5 w-5 text-cyan-400" />
                       <span className="font-black text-[10px] uppercase tracking-[0.2em] text-white">Copiar Chave PIX</span>
                     </div>
                     <ArrowRight className="h-4 w-4 text-white/20 group-hover/pix:text-cyan-400 group-hover/pix:translate-x-2 transition-all" />
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Final Call */}
      <section className="py-20 md:py-32 bg-white text-slate-950 mx-4 mb-20 rounded-[4rem] md:rounded-[6rem] shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.06),transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
           <h3 className="font-headline text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-950 uppercase">
             O Futuro é <span className="text-primary italic">Humano.</span>
           </h3>
           <p className="text-xl md:text-3xl text-slate-500 font-medium max-w-4xl mx-auto tracking-tight leading-tight">
             O UrbeLudo prova que a tecnologia, guiada pelo afeto e pela ciência, é a maior ferramenta de liberdade que existe.
           </p>
           <div className="pt-6">
              <Button onClick={handleOpenChat} className="h-24 px-16 bg-primary text-white hover:bg-primary/90 rounded-full font-black uppercase tracking-[0.4em] text-[12px] transition-all shadow-xl hover:scale-105 active:scale-95">
                FALAR COM ESTRATEGISTA <ExternalLink className="ml-5 h-5 w-5" />
              </Button>
           </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}

