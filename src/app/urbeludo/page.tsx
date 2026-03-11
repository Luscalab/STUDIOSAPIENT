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
      const offset = 80;
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
      answer: "O Urbeludo é uma plataforma digital de suporte à reabilitação neuropsicomotora. Através de um aplicativo gamificado, ele transforma exercícios terapêuticos em missões lúdicas, utilizando o sistema SPSP para monitorar a evolução do paciente."
    },
    {
      icon: <Users2 className="h-5 w-5" />,
      question: "O Urbeludo substitui o terapeuta?",
      answer: "Não. O Urbeludo é uma ferramenta de auxílio e potencialização. Ele funciona como o braço direito do profissional, garantindo que o paciente continue se exercitando em casa com dados precisos."
    },
    {
      icon: <Brain className="h-5 w-5" />,
      question: "O que significa a sigla SPSP?",
      answer: "SPSP significa Sistema Preditivo de Suporte Psicomotor. É a inteligência analítica que processa os dados de interação da criança e gera relatórios que apontam tendências de melhora ou estagnação."
    }
  ];

  const milestones = [
    {
      id: "fase-01",
      title: "Fase 01: Arquitetura",
      status: "Em andamento",
      desc: "Consolidação da base lógica do SPSP e design de UX focado na acessibilidade clínica.",
      icon: <Brain />,
      color: "from-cyan-400 to-cyan-600"
    },
    {
      id: "fase-02",
      title: "Fase 02: MVP Tech",
      status: "Planejado",
      desc: "Versão multiplataforma integrada iOS, Android e Web para sincronização imediata.",
      icon: <Smartphone />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "fase-03",
      title: "Fase 03: Validação",
      status: "Planejado",
      desc: "Implementação em clínicas parceiras para calibração da inteligência preditiva com dados reais.",
      icon: <Activity />,
      color: "from-indigo-600 to-primary"
    },
    {
      id: "fase-04",
      title: "Fase 04: Escala",
      status: "Planejado",
      desc: "Expansão global do ecossistema e democratização para ONGs e comunidades.",
      icon: <Globe />,
      color: "from-primary to-pink-500"
    }
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[#08070b] text-white selection:bg-cyan-500/30 selection:text-white pb-32 overflow-x-hidden">
      <Navbar />
      
      {/* Premium Dock Navigation - Mobile Optimized */}
      <nav className="fixed bottom-6 md:bottom-10 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-[400]">
        <div className="flex items-center justify-around md:justify-start gap-1 p-1.5 md:p-2 bg-[#08070b]/60 backdrop-blur-[30px] border border-white/10 rounded-full shadow-2xl overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 shrink-0",
                activeSection === item.id 
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]" 
                  : "text-white/30 hover:text-white",
                item.id === 'investidores' && "border border-primary/30"
              )}
            >
              <span className="h-4 w-4">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="container mx-auto relative z-10 text-center">
          <Badge className="mb-10 bg-cyan-500/10 text-cyan-400 px-6 py-2 text-[8px] font-black uppercase tracking-[0.4em] rounded-full">HealthTech Vanguarda</Badge>
          <h1 className="font-headline text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-10">
            UrbeLudo <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-primary italic block">Movimento & Inteligência.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-medium max-w-2xl mx-auto leading-tight mb-12">
            Escalando a eficácia clínica através de tecnologia e suporte preditivo para o desenvolvimento infantil.
          </p>
          <ChevronDown className="h-8 w-8 text-cyan-400 mx-auto animate-bounce opacity-30" />
        </div>
      </section>

      {/* Manifesto */}
      <section id="desafio" className="py-20 md:py-32 bg-white text-slate-950 rounded-[3rem] md:rounded-[8rem] mx-4 mb-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest">O Desafio</Badge>
              <h2 className="font-headline text-3xl md:text-6xl font-black tracking-tighter leading-none">O Abismo da <br/><span className="text-primary italic">Reabilitação.</span></h2>
              <div className="h-1.5 w-20 bg-primary rounded-full" />
            </div>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic border-l-4 border-primary/20 pl-8">
              "Digitalizamos a jornada para devolver o que há de mais precioso: a autonomia humana."
            </p>
          </div>
        </div>
      </section>

      {/* Semiótica */}
      <section id="semiotica" className="py-20 md:py-32 relative px-6">
        <div className="container mx-auto max-w-6xl text-center mb-16">
          <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter text-white uppercase mb-12">Urbanismo do <span className="text-primary italic">Movimento.</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 text-left space-y-6">
              <Box className="h-10 w-10 text-cyan-400" />
              <h4 className="text-3xl font-black uppercase tracking-tighter">URBE</h4>
              <p className="text-white/40 leading-relaxed">A cidade interna do movimento. Estrutura e organização funcional do corpo.</p>
            </div>
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-primary/10 border border-primary/20 text-left space-y-6">
              <Smile className="h-10 w-10 text-primary" />
              <h4 className="text-3xl font-black uppercase tracking-tighter">LUDO</h4>
              <p className="text-white/40 leading-relaxed">O motor da alegria. A ferramenta lúdica que remove a resistência clínica.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marcos */}
      <section id="marcos" className="py-20 md:py-32 bg-[#0a0a0c] px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-headline text-4xl md:text-7xl font-black text-white uppercase">Marcos de <span className="text-primary italic">Evolução.</span></h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6 relative overflow-hidden group hover:bg-white/10 transition-all">
                <div className={cn("absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r", m.color)} />
                <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white", m.color)}>
                  {m.icon}
                </div>
                <h5 className="text-xl font-black uppercase tracking-tight">{m.title}</h5>
                <p className="text-white/30 text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 bg-white text-slate-950 rounded-[3rem] md:rounded-[6rem] mx-4 my-8 shadow-2xl px-6">
        <div className="container mx-auto max-w-4xl">
          <h3 className="font-headline text-3xl md:text-6xl font-black text-center uppercase mb-12">Dúvidas do <span className="text-primary italic">Ecossistema.</span></h3>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-none bg-slate-50 rounded-3xl px-6">
                <AccordionTrigger className="text-left font-black uppercase text-sm md:text-base py-6 hover:no-underline">{f.question}</AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed pb-6">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Investidores */}
      <section id="investidores" className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="font-headline text-4xl md:text-7xl font-black text-white">Pronto para <br/><span className="text-primary italic">Mover o Futuro?</span></h3>
            <p className="text-xl text-white/40 font-medium">Parcerias para democratizar a saúde através de colaboração técnica e apoio social.</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 rounded-[3rem] bg-white text-slate-950 space-y-6 border border-slate-100 shadow-xl">
              <Badge className="bg-primary/10 text-primary border-none">Pro Bono</Badge>
              <h4 className="text-3xl font-black uppercase tracking-tighter">Seja Co-Autor</h4>
              <p className="text-slate-500">Buscamos talentos que queiram atuar sem custos para acelerar este impacto.</p>
              <Button variant="outline" className="w-full h-16 rounded-2xl border-slate-200" onClick={() => copyToClipboard(contactEmail, "Email")}>Copiar Email de Contato</Button>
            </div>
            <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 shadow-2xl">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-none">Social Impact</Badge>
              <h4 className="text-3xl font-black uppercase tracking-tighter">Custear Projeto</h4>
              <p className="text-white/40">Ajude a financiar o desenvolvimento para democratizar o acesso.</p>
              <Button className="w-full h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-black font-black" onClick={() => copyToClipboard(pixKey, "PIX")}>Copiar Chave PIX</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
