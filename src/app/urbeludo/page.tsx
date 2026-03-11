
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
  Target,
  Smartphone,
  ChevronDown,
  Globe,
  Activity,
  Box,
  Smile,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function UrbeLudoPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `[ ${label.toUpperCase()} COPIADO ]`,
      description: "Pronto para uso na sua área de transferência.",
      className: "bg-white border-primary text-slate-950 font-black uppercase tracking-widest text-[9px]"
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

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['inicio', 'desafio', 'semiotica', 'marcos', 'faq', 'investidores'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const contactEmail = "sapientcontato@gmail.com";
  const pixKey = "sapientcontato@gmail.com";

  const navItems = [
    { id: 'desafio', label: 'Desafio', icon: <Target className="h-3 w-3" /> },
    { id: 'semiotica', label: 'Marca', icon: <Box className="h-3 w-3" /> },
    { id: 'marcos', label: 'Evolução', icon: <Cpu className="h-3 w-3" /> },
    { id: 'faq', label: 'Dúvidas', icon: <Zap className="h-3 w-3" /> },
    { id: 'investidores', label: 'Apoiar', icon: <Heart className="h-3 w-3" /> },
  ];

  const milestones = [
    { id: "f-01", title: "Fase 01: Arquitetura", status: "Em andamento", desc: "Base lógica SPSP e design focado em acessibilidade clínica.", icon: <Brain />, color: "from-cyan-400 to-cyan-600" },
    { id: "f-02", title: "Fase 02: MVP Tech", status: "Planejado", desc: "Versão multiplataforma integrada iOS, Android e Web.", icon: <Smartphone />, color: "from-blue-500 to-indigo-600" },
    { id: "f-03", title: "Fase 03: Validação", status: "Planejado", desc: "Implementação em clínicas para calibração de dados reais.", icon: <Activity />, color: "from-indigo-600 to-primary" },
    { id: "f-04", title: "Fase 04: Escala", status: "Planejado", desc: "Expansão global e democratização para ONGs.", icon: <Globe />, color: "from-primary to-pink-500" }
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 pb-32 overflow-x-hidden">
      <Navbar />
      
      {/* Mobile Dock - Ultra Compact */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] w-fit">
        <div className="flex items-center gap-1 p-1 bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-3 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                activeSection === item.id ? "bg-primary text-white" : "text-slate-400 hover:text-primary",
                item.id === 'investidores' && "border border-primary/20 bg-primary/5"
              )}
            >
              <div className="scale-90 md:scale-100">{item.icon}</div>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <section id="inicio" className="relative pt-32 pb-16 md:pt-48 md:pb-40 px-6 text-center space-y-4">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.05),transparent_70%)]" />
        </div>
        
        <Badge className="mb-6 bg-cyan-100 text-cyan-600 border-none px-6 py-2 text-[8px] font-black uppercase tracking-[0.4em] rounded-full">HealthTech Vanguarda</Badge>
        <h1 className="font-headline text-3xl md:text-8xl lg:text-[10rem] font-black text-slate-950 tracking-tighter leading-[0.85] mb-6 text-balance uppercase">
          UrbeLudo <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-primary to-cyan-500 italic block lowercase font-medium">movimento & inteligência.</span>
        </h1>
        <p className="text-sm md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-tight mb-10 text-balance px-4 pt-4">
          Escalando a eficácia clínica através de tecnologia preditiva para o desenvolvimento infantil.
        </p>
        <ChevronDown className="h-5 w-5 text-cyan-400 mx-auto animate-bounce opacity-40" />
      </section>

      {/* Seção Desafio - White Contrast */}
      <section id="desafio" className="py-16 md:py-48 bg-white text-slate-950 rounded-[2rem] md:rounded-[6rem] mx-4 mb-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] px-6">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Gap de Saúde</p>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">O Abismo da <br/><span className="text-primary italic font-medium">Reabilitação.</span></h2>
          </div>
          <p className="text-lg md:text-3xl text-slate-400 font-medium leading-tight italic border-l-8 border-primary/10 pl-8 text-balance">
            "Digitalizamos a jornada para devolver o que há de mais precioso: a autonomia humana."
          </p>
        </div>
      </section>

      {/* Seção Semiótica - Light Slate */}
      <section id="semiotica" className="py-16 md:py-48 px-6 bg-slate-50">
        <div className="container mx-auto max-w-5xl text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Arquitetura da Marca</p>
          <h3 className="font-headline text-2xl md:text-7xl font-black text-slate-950 uppercase mb-16 tracking-tighter leading-[0.85]">Urbanismo do <br /><span className="text-primary italic font-medium">Movimento.</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-balance pt-12">
            <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-200 text-left space-y-5 md:space-y-6 shadow-sm group hover:border-cyan-200 transition-all">
              <Box className="h-8 w-8 text-cyan-500" />
              <h4 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-slate-950">URBE</h4>
              <p className="text-slate-500 leading-relaxed text-xs md:text-base">A organização lúdica das funções psicomotoras. O corpo como espaço estruturado.</p>
            </div>
            <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-200 text-left space-y-5 md:space-y-6 shadow-sm group hover:border-primary/20 transition-all">
              <Smile className="h-8 w-8 text-primary" />
              <h4 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-slate-950">LUDO</h4>
              <p className="text-slate-500 leading-relaxed text-xs md:text-base">A fluidez do brincar. O motor que remove a barreira clínica fria e datada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Marcos - White Clean */}
      <section id="marcos" className="py-16 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-6xl space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Pipeline de Inovação</p>
          <h3 className="font-headline text-2xl md:text-7xl font-black text-slate-950 uppercase mb-20 text-center tracking-tighter leading-[0.85]">Marcos de <br /><span className="text-primary italic font-medium">Evolução.</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-12">
            {milestones.map((m, i) => (
              <div key={i} className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-50 border border-slate-200 space-y-4 relative overflow-hidden flex flex-col h-full hover:shadow-lg transition-all">
                <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", m.color)} />
                <div className={cn("h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br", m.color)}>
                  <div className="scale-90 md:scale-100">{m.icon}</div>
                </div>
                <h5 className="text-base md:text-xl font-black uppercase leading-tight tracking-tighter text-slate-950">{m.title}</h5>
                <p className="text-slate-400 text-[10px] md:text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção FAQ - Minimalist Light */}
      <section id="faq" className="py-12 md:py-48 bg-slate-50 text-slate-950 rounded-[2rem] md:rounded-[4rem] mx-4 my-8 px-6">
        <div className="container mx-auto max-w-4xl space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Base de Conhecimento</p>
          <h3 className="font-headline text-xl md:text-6xl font-black text-center uppercase mb-12 tracking-tighter leading-[0.85]">Dúvidas <br /><span className="text-primary italic font-medium">Técnicas.</span></h3>
          <Accordion type="single" collapsible className="space-y-2 md:space-y-3 pt-8">
            <AccordionItem value="q1" className="border-none bg-white rounded-xl md:rounded-2xl px-4 md:px-6 shadow-sm">
              <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-4 md:py-6 text-slate-950">O que é exatamente o Urbeludo?</AccordionTrigger>
              <AccordionContent className="text-slate-500 text-[10px] md:text-base pb-4 md:pb-6 leading-relaxed">Plataforma gamificada de suporte à reabilitação neuropsicomotora que utiliza o SPSP para monitorar a evolução do paciente.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-none bg-white rounded-xl md:rounded-2xl px-4 md:px-6 shadow-sm">
              <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-4 md:py-6 text-slate-950">O que significa SPSP?</AccordionTrigger>
              <AccordionContent className="text-slate-500 text-[10px] md:text-base pb-4 md:pb-6 leading-relaxed">Sistema Preditivo de Suporte Psicomotor. A inteligência que processa dados de interação e gera relatórios clínicos precisos.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Seção Investidores - Light Gradient */}
      <section id="investidores" className="py-16 md:py-48 px-6 bg-white">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Ecossistema Social</p>
            <h3 className="font-headline text-3xl md:text-7xl font-black text-slate-950 leading-[0.85] uppercase tracking-tighter">Mova o <br/><span className="text-primary italic font-medium">Futuro.</span></h3>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed text-balance pt-6">Parcerias estratégicas para democratizar a saúde infantil através de tecnologia e apoio social.</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-slate-50 text-slate-950 space-y-6 border-t-[6px] border-primary shadow-sm hover:shadow-md transition-all">
              <Badge className="bg-primary/10 text-primary px-4 py-1.5 text-[10px] uppercase font-black tracking-widest border-none">Pro Bono</Badge>
              <h4 className="text-xl md:text-2xl font-black uppercase leading-none tracking-tighter">Seja Co-Autor</h4>
              <p className="text-slate-500 text-xs md:text-base leading-relaxed">Buscamos talentos técnicos para acelerar o impacto social do projeto.</p>
              <Button variant="outline" className="w-full h-14 md:h-16 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border-slate-200" onClick={() => copyToClipboard(contactEmail, "Email")}>Copiar Email</Button>
            </div>
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-cyan-50 border border-cyan-100 space-y-6">
              <Badge className="bg-cyan-100 text-cyan-600 px-4 py-1.5 text-[10px] uppercase font-black tracking-widest border-none">Impacto</Badge>
              <h4 className="text-xl md:text-2xl font-black uppercase leading-none tracking-tighter text-cyan-900">Custear Projeto</h4>
              <p className="text-cyan-700/60 text-xs md:text-base leading-relaxed">Ajude a financiar o desenvolvimento para levar o app a ONGs.</p>
              <Button className="w-full h-14 md:h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-lg shadow-cyan-500/20 border-none" onClick={() => copyToClipboard(pixKey, "PIX")}>Doar via PIX</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
