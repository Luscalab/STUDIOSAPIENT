
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
  Users2,
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
  
  const handleOpenChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'));

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `[ ${label.toUpperCase()} COPIADO ]`,
      description: "Pronto para uso na sua área de transferência.",
      className: "bg-[#08070b] border-cyan-500/50 text-white font-black uppercase tracking-widest text-[10px]"
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
    const sections = ['desafio', 'semiotica', 'marcos', 'expertise', 'faq', 'investidores'];
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
    { id: 'semiotica', label: 'Semiótica', icon: <Box className="h-3 w-3" /> },
    { id: 'marcos', label: 'Marcos', icon: <Cpu className="h-3 w-3" /> },
    { id: 'faq', label: 'Dúvidas', icon: <Zap className="h-3 w-3" /> },
    { id: 'investidores', label: 'Apoiar', icon: <Heart className="h-3 w-3" /> },
  ];

  const milestones = [
    { id: "f-01", title: "Fase 01: Arquitetura", status: "Em andamento", desc: "Base lógica SPSP e design focado em acessibilidade clínica.", icon: <Brain />, color: "from-cyan-400 to-cyan-600" },
    { id: "f-02", title: "Fase 02: MVP Tech", status: "Planejado", desc: "Versão multiplataforma integrada iOS, Android e Web.", icon: <Smartphone />, color: "from-blue-500 to-indigo-600" },
    { id: "f-03", title: "Fase 03: Validação", status: "Planejado", desc: "Implementação em clínicas para calibração de dados reais.", icon: <Activity />, color: "from-indigo-600 to-primary" },
    { id: "f-04", title: "Fase 04: Escala", status: "Planejado", desc: "Expansão global e democratização para ONGs.", icon: <Globe />, color: "from-primary to-pink-500" }
  ];

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-cyan-500/30 selection:text-white pb-32 overflow-x-hidden">
      <Navbar />
      
      {/* Mobile Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] w-fit">
        <div className="flex items-center gap-1 p-1 bg-[#08070b]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-1 px-3 py-2 md:px-5 md:py-3 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                activeSection === item.id ? "bg-primary text-white" : "text-white/30 hover:text-white",
                item.id === 'investidores' && "animate-glow-pulse border border-primary/30"
              )}
            >
              <div className="scale-90 md:scale-100">{item.icon}</div>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <section className="relative pt-32 pb-16 md:pt-48 md:pb-40 px-6 text-center space-y-4">
        <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 px-6 py-2 text-[8px] font-black uppercase tracking-[0.4em] rounded-full">HealthTech Vanguarda</Badge>
        <h1 className="font-headline text-3xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] mb-6 text-balance uppercase">
          UrbeLudo <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-primary italic block lowercase font-medium">movimento & inteligência.</span>
        </h1>
        <p className="text-base md:text-2xl text-white/40 font-medium max-w-2xl mx-auto leading-tight mb-10 text-balance px-4 pt-4">
          Escalando a eficácia clínica através de tecnologia preditiva para o desenvolvimento infantil.
        </p>
        <ChevronDown className="h-5 w-5 text-cyan-400 mx-auto animate-bounce opacity-20" />
      </section>

      <section id="desafio" className="py-16 md:py-48 bg-white text-slate-950 rounded-[2rem] md:rounded-[6rem] mx-4 mb-8 shadow-2xl px-6">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Gap de Saúde</p>
            <h2 className="font-headline text-3xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">O Abismo da <br/><span className="text-primary italic font-medium">Reabilitação.</span></h2>
          </div>
          <p className="text-lg md:text-3xl text-slate-500 font-medium leading-tight italic border-l-8 border-primary/10 pl-8 text-balance">
            "Digitalizamos a jornada para devolver o que há de mais precioso: a autonomia humana."
          </p>
        </div>
      </section>

      <section id="semiotica" className="py-16 md:py-48 px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Arquitetura da Marca</p>
          <h3 className="font-headline text-3xl md:text-7xl font-black text-white uppercase mb-16 tracking-tighter leading-[0.85]">Urbanismo do <br /><span className="text-primary italic font-medium">Movimento.</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-balance pt-12">
            <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 text-left space-y-5 md:space-y-6">
              <Box className="h-8 w-8 text-cyan-400" />
              <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">URBE</h4>
              <p className="text-white/40 leading-relaxed text-sm md:text-base">A organização lúdica das funções psicomotoras. O corpo como espaço estruturado.</p>
            </div>
            <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-primary/10 border border-primary/20 text-left space-y-5 md:space-y-6">
              <Smile className="h-8 w-8 text-primary" />
              <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">LUDO</h4>
              <p className="text-white/40 leading-relaxed text-sm md:text-base">A fluidez do brincar. O motor que remove a barreira clínica fria e datada.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="marcos" className="py-16 md:py-48 bg-[#0a0a0c] px-6">
        <div className="container mx-auto max-w-6xl space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Pipeline de Inovação</p>
          <h3 className="font-headline text-3xl md:text-7xl font-black text-white uppercase mb-20 text-center tracking-tighter leading-[0.85]">Marcos de <br /><span className="text-primary italic font-medium">Evolução.</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-12">
            {milestones.map((m, i) => (
              <div key={i} className="p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4 relative overflow-hidden flex flex-col h-full">
                <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", m.color)} />
                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br", m.color)}>
                  <div className="scale-100">{m.icon}</div>
                </div>
                <h5 className="text-lg md:text-xl font-black uppercase leading-tight tracking-tighter">{m.title}</h5>
                <p className="text-white/30 text-xs md:text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-12 md:py-48 bg-white text-slate-950 rounded-[2rem] md:rounded-[4rem] mx-4 my-8 px-6">
        <div className="container mx-auto max-w-4xl space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Base de Conhecimento</p>
          <h3 className="font-headline text-xl md:text-6xl font-black text-center uppercase mb-12 tracking-tighter leading-[0.85]">Dúvidas <br /><span className="text-primary italic font-medium">Técnicas.</span></h3>
          <Accordion type="single" collapsible className="space-y-2 md:space-y-3 pt-8">
            <AccordionItem value="q1" className="border-none bg-slate-50 rounded-xl md:rounded-2xl px-4 md:px-6">
              <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-4 md:py-6">O que é exatamente o Urbeludo?</AccordionTrigger>
              <AccordionContent className="text-slate-500 text-[10px] md:text-base pb-4 md:pb-6 leading-relaxed">Plataforma gamificada de suporte à reabilitação neuropsicomotora que utiliza o SPSP para monitorar a evolução do paciente.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-none bg-slate-50 rounded-xl md:rounded-2xl px-4 md:px-6">
              <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-4 md:py-6">O que significa SPSP?</AccordionTrigger>
              <AccordionContent className="text-slate-500 text-[10px] md:text-base pb-4 md:pb-6 leading-relaxed">Sistema Preditivo de Suporte Psicomotor. A inteligência que processa dados de interação e gera relatórios clínicos precisos.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="investidores" className="py-16 md:py-48 px-6">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Ecossistema Social</p>
            <h3 className="font-headline text-4xl md:text-7xl font-black text-white leading-[0.85] uppercase tracking-tighter">Mova o <br/><span className="text-primary italic font-medium">Futuro.</span></h3>
            <p className="text-lg text-white/40 leading-relaxed text-balance pt-6">Parcerias estratégicas para democratizar a saúde infantil através de tecnologia e apoio social.</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white text-slate-950 space-y-6 border-t-[6px] border-primary shadow-xl">
              <Badge className="bg-primary/10 text-primary px-4 py-1.5 text-[10px] uppercase font-black tracking-widest">Pro Bono</Badge>
              <h4 className="text-2xl font-black uppercase leading-none tracking-tighter">Seja Co-Autor</h4>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">Buscamos talentos técnicos para acelerar o impacto social do projeto.</p>
              <Button variant="outline" className="w-full h-16 rounded-2xl text-[10px] font-black uppercase tracking-widest" onClick={() => copyToClipboard(contactEmail, "Email")}>Copiar Email</Button>
            </div>
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
              <Badge className="bg-cyan-500/10 text-cyan-400 px-4 py-1.5 text-[10px] uppercase font-black tracking-widest">Impacto</Badge>
              <h4 className="text-2xl font-black uppercase leading-none tracking-tighter">Custear Projeto</h4>
              <p className="text-white/40 text-sm md:text-base leading-relaxed">Ajude a financiar o desenvolvimento para levar o app a ONGs.</p>
              <Button className="w-full h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-black font-black text-[10px] uppercase tracking-widest shadow-xl shadow-cyan-500/20" onClick={() => copyToClipboard(pixKey, "PIX")}>Doar via PIX</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
