
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
  Heart,
  Sparkles
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
    { id: "f-01", title: "Fase 01: Arquitetura", status: "Em andamento", desc: "Base lógica SPSP e design focado em acessibilidade clínica.", icon: <Brain className="h-5 w-5 md:h-6 md:w-6" />, color: "from-cyan-400 to-cyan-600" },
    { id: "f-02", title: "Fase 02: MVP Tech", status: "Planejado", desc: "Versão multiplataforma integrada iOS, Android e Web.", icon: <Smartphone className="h-5 w-5 md:h-6 md:w-6" />, color: "from-blue-500 to-indigo-600" },
    { id: "f-03", title: "Fase 03: Validação", status: "Planejado", desc: "Implementação em clínicas para calibração de dados reais.", icon: <Activity className="h-5 w-5 md:h-6 md:w-6" />, color: "from-indigo-600 to-primary" },
    { id: "f-04", title: "Fase 04: Escala", status: "Planejado", desc: "Expansão global e democratização para ONGs.", icon: <Globe className="h-5 w-5 md:h-6 md:w-6" />, color: "from-primary to-pink-500" }
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 pb-32 overflow-x-hidden">
      <Navbar />
      
      {/* Mobile Dock - Compact Premium */}
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

      {/* Hero Section - Light Mesh Pattern */}
      <section id="inicio" className="relative pt-32 pb-16 md:pt-64 md:pb-48 px-6 text-center space-y-4 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>
        
        <div className="relative z-10 container mx-auto">
          <Badge className="mb-8 bg-cyan-100 text-cyan-600 border-none px-8 py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] rounded-full">HealthTech Vanguarda</Badge>
          <h1 className="font-headline text-3xl md:text-8xl lg:text-[9rem] font-black text-slate-950 tracking-tighter leading-[0.85] mb-8 text-balance uppercase">
            UrbeLudo <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-primary to-cyan-500 italic block lowercase font-medium">movimento & inteligência.</span>
          </h1>
          <p className="text-base md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-tight mb-12 text-balance px-4 pt-4">
            Escalando a eficácia clínica através de tecnologia preditiva para o desenvolvimento neuropsicomotor infantil.
          </p>
          <div className="flex justify-center pt-8">
            <button onClick={() => scrollToSection('desafio')} className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-cyan-400 animate-bounce hover:bg-white transition-colors">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Seção Desafio - White High Fidelity */}
      <section id="desafio" className="py-20 md:py-48 bg-white text-slate-950 rounded-[3rem] md:rounded-[6rem] mx-4 mb-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <Target className="h-64 w-64 text-primary" />
        </div>
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Gap de Saúde Pública</p>
              <h2 className="font-headline text-3xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">O Abismo da <br/><span className="text-primary italic font-medium">Reabilitação.</span></h2>
            </div>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-md">O atraso no diagnóstico e a falta de continuidade no tratamento domiciliar geram perdas irreversíveis na autonomia infantil. O UrbeLudo digitaliza esse processo para democratizar resultados.</p>
          </div>
          <blockquote className="text-xl md:text-4xl text-slate-400 font-medium leading-tight italic border-l-8 border-primary/20 pl-8 text-balance">
            "Digitalizamos a jornada psicomotora para devolver o que há de mais precioso: a autonomia humana."
          </blockquote>
        </div>
      </section>

      {/* Seção Semiótica - URBE / LUDO */}
      <section id="semiotica" className="py-20 md:py-48 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl text-center space-y-4">
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Arquitetura de Marca</p>
          <h3 className="font-headline text-3xl md:text-7xl font-black text-slate-950 uppercase mb-20 tracking-tighter leading-[0.85]">Urbanismo do <br /><span className="text-primary italic font-medium">Movimento.</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-12">
            <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-slate-200 text-left space-y-6 shadow-sm group hover:border-cyan-200 transition-all duration-700">
              <div className="h-16 w-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
                <Box className="h-8 w-8" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-slate-950">URBE (Cidade)</h4>
                <p className="text-slate-500 leading-relaxed text-sm md:text-lg">A organização lúdica das funções psicomotoras. O corpo como espaço estruturado, onde cada movimento tem sua coordenada e função lógica.</p>
              </div>
            </div>
            <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-slate-200 text-left space-y-6 shadow-sm group hover:border-primary/20 transition-all duration-700">
              <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Smile className="h-8 w-8" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-slate-950">LUDO (Brincar)</h4>
                <p className="text-slate-500 leading-relaxed text-sm md:text-lg">A fluidez do brincar. O motor de engajamento que remove a barreira clínica fria e datada, transformando o esforço terapêutico em diversão imersiva.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Marcos - Pipeline Evolution */}
      <section id="marcos" className="py-20 md:py-48 bg-white px-6 rounded-[3rem] md:rounded-[6rem] mx-4 mb-12">
        <div className="container mx-auto max-w-7xl space-y-4">
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Pipeline de Inovação</p>
          <h3 className="font-headline text-3xl md:text-7xl font-black text-slate-950 uppercase mb-24 text-center tracking-tighter leading-[0.85]">Marcos de <br /><span className="text-primary italic font-medium">Evolução.</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {milestones.map((m, i) => (
              <div key={i} className="p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 space-y-6 relative overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <div className={cn("absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r", m.color)} />
                <div className={cn("h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-lg", m.color)}>
                  {m.icon}
                </div>
                <div className="space-y-4">
                  <h5 className="text-lg md:text-xl font-black uppercase leading-tight tracking-tighter text-slate-950">{m.title}</h5>
                  <Badge className="bg-white text-slate-400 border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">{m.status}</Badge>
                  <p className="text-slate-500 text-xs md:text-base leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção FAQ - Dúvidas Técnicas */}
      <section id="faq" className="py-20 md:py-48 bg-slate-50 text-slate-950 rounded-[3rem] md:rounded-[4rem] mx-4 my-12 px-6">
        <div className="container mx-auto max-w-4xl space-y-4">
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Base de Conhecimento</p>
          <h3 className="font-headline text-2xl md:text-6xl font-black text-center uppercase mb-16 tracking-tighter leading-[0.85]">Dúvidas <br /><span className="text-primary italic font-medium">Técnicas.</span></h3>
          <Accordion type="single" collapsible className="space-y-3 pt-8">
            <AccordionItem value="q1" className="border-none bg-white rounded-2xl md:rounded-[2.5rem] px-6 md:px-10 shadow-sm">
              <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-6 md:py-8 text-slate-950 hover:no-underline">O que é exatamente o UrbeLudo?</AccordionTrigger>
              <AccordionContent className="text-slate-500 text-xs md:text-lg pb-8 md:pb-10 leading-relaxed border-l-4 border-cyan-100 pl-6">
                É uma plataforma gamificada de suporte à reabilitação neuropsicomotora. Ela utiliza o protocolo SPSP para monitorar a evolução do paciente através de biofeedback e inteligência de dados, transformando a terapia em uma jornada de exploração urbana lúdica.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-none bg-white rounded-2xl md:rounded-[2.5rem] px-6 md:px-10 shadow-sm">
              <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-6 md:py-8 text-slate-950 hover:no-underline">O que significa SPSP?</AccordionTrigger>
              <AccordionContent className="text-slate-500 text-xs md:text-lg pb-8 md:pb-10 leading-relaxed border-l-4 border-cyan-100 pl-6">
                Sistema Preditivo de Suporte Psicomotor. É o coração de IA do UrbeLudo que processa dados de interação em tempo real para prever lacunas no desenvolvimento e sugerir ajustes imediatos no plano terapêutico.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-none bg-white rounded-2xl md:rounded-[2.5rem] px-6 md:px-10 shadow-sm">
              <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-6 md:py-8 text-slate-950 hover:no-underline">Como o projeto é financiado?</AccordionTrigger>
              <AccordionContent className="text-slate-500 text-xs md:text-lg pb-8 md:pb-10 leading-relaxed border-l-4 border-cyan-100 pl-6">
                Através de um modelo híbrido: investimento de anjos estratégicos para desenvolvimento da tecnologia base e parcerias/doações para custear a implementação pro-bono em ONGs de baixa renda.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Seção Investidores - Impacto Social */}
      <section id="investidores" className="py-20 md:py-48 px-6 bg-white">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Ecossistema Social</p>
              <h3 className="font-headline text-3xl md:text-8xl font-black text-slate-950 leading-[0.85] uppercase tracking-tighter">Mova o <br/><span className="text-primary italic font-medium">Futuro.</span></h3>
            </div>
            <p className="text-base md:text-xl text-slate-500 leading-relaxed text-balance">Buscamos parcerias estratégicas para democratizar a saúde infantil. Cada apoio acelera a chegada do UrbeLudo a quem mais precisa.</p>
            <div className="flex items-center gap-4 p-6 rounded-3xl bg-cyan-50 border border-cyan-100">
               <Sparkles className="h-6 w-6 text-cyan-500" />
               <p className="text-xs md:text-sm font-bold text-cyan-800 uppercase tracking-widest italic">100% dos apoios sociais são revertidos para ONGs.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-10 md:p-14 rounded-[3rem] bg-slate-50 text-slate-950 space-y-8 border-t-[8px] border-primary shadow-sm hover:shadow-xl transition-all duration-700">
              <Badge className="bg-primary/10 text-primary px-5 py-2 text-[10px] uppercase font-black tracking-widest border-none">Pro Bono</Badge>
              <h4 className="text-2xl md:text-4xl font-black uppercase leading-none tracking-tighter">Seja Co-Autor</h4>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed">Buscamos especialistas em saúde e tech para colaborar no refinamento do método SPSP sem custos operacionais.</p>
              <Button variant="outline" className="w-full h-16 md:h-20 rounded-3xl text-[10px] font-black uppercase tracking-widest border-slate-200 hover:bg-white" onClick={() => copyToClipboard(contactEmail, "Email")}>Copiar Email de Contato</Button>
            </div>
            <div className="p-10 md:p-14 rounded-[3rem] bg-cyan-50 border border-cyan-100 space-y-8 shadow-sm hover:shadow-xl transition-all duration-700">
              <Badge className="bg-cyan-100 text-cyan-600 px-5 py-2 text-[10px] uppercase font-black tracking-widest border-none">Impacto Direto</Badge>
              <h4 className="text-2xl md:text-4xl font-black uppercase leading-none tracking-tighter text-cyan-900">Custear Projeto</h4>
              <p className="text-cyan-700/60 text-sm md:text-lg leading-relaxed">Contribua com a manutenção do servidor e expansão de licenças para instituições carentes.</p>
              <Button className="w-full h-16 md:h-20 rounded-3xl bg-cyan-500 hover:bg-cyan-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-cyan-500/20 border-none" onClick={() => copyToClipboard(pixKey, "PIX")}>Apoiar via PIX <ArrowRight className="ml-4 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
