
'use client';

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
  Sparkles,
  ShieldCheck,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UrbeLudoPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `[ ${label.toUpperCase()} COPIADO ]`,
      description: "Pronto para uso na sua área de transferência.",
      className: "bg-black border-primary text-white font-black uppercase tracking-widest text-[9px]"
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

  const faqs = [
    {
      q: "1. O que é exatamente o Urbeludo?",
      a: "O Urbeludo é uma plataforma digital de suporte à reabilitação neuropsicomotora. Através de um aplicativo gamificado, ele transforma exercícios terapêuticos de Fonoaudiologia, Terapia Ocupacional e Reabilitação Motora em missões lúdicas, utilizando o sistema SPSP para monitorar e prever a evolução do paciente."
    },
    {
      q: "2. O Urbeludo substitui o terapeuta?",
      a: "Não. O Urbeludo é uma ferramenta de auxílio e potencialização. Ele funciona como o braço direito do profissional, garantindo que o paciente continue se exercitando em casa com a mesma diretriz clínica do consultório, além de fornecer dados precisos para que o terapeuta tome decisões melhores e mais rápidas."
    },
    {
      q: "3. O que significa a sigla SPSP e qual sua função?",
      a: "SPSP significa Sistema Preditivo de Suporte Psicomotor. É a inteligência analítica do app que processa os dados de interação da criança (tempo de resposta, precisão de movimento, clareza fonológica) e gera relatórios que apontam tendências de melhora ou estagnação, permitindo um ajuste preventivo no plano de tratamento."
    },
    {
      q: "4. Como um jogo digital pode ajudar na reabilitação física?",
      a: "O jogo utiliza a Ludicidade Progressiva para gerar engajamento. Ao transformar um exercício repetitivo em um desafio gamificado, estimulamos a neuroplasticidade e a liberação de dopamina, o que aumenta a aderência da criança ao tratamento e torna o ganho de consciência corporal e motora muito mais fluido."
    },
    {
      q: "5. Em quais dispositivos o Urbeludo funciona?",
      a: "Focamos na acessibilidade total. O Urbeludo é uma solução multiplataforma, rodando nativamente em sistemas iOS (iPhones e iPads), Android e também em qualquer navegador via Web. Isso permite que o terapeuta gerencie os dados no computador enquanto a criança joga no tablet ou celular."
    },
    {
      q: "6. Como o aplicativo auxilia especificamente na Fonoaudiologia?",
      a: "O app utiliza o reconhecimento de voz e captação de áudio para incentivar a emissão sonora. Em missões de fala, a criança precisa atingir determinadas frequências ou clareza fonética para desbloquear recompensas no jogo, tornando o treino orofacial divertido e constante."
    },
    {
      q: "7. O Urbeludo pode ser usado por crianças com qualquer diagnóstico?",
      a: "Sim, o foco é o suporte psicomotor amplo. Ele é especialmente eficaz para crianças com atrasos no desenvolvimento, TEA (Transtorno do Espectro Autista), TDAH, Síndrome de Down e paralisia cerebral, pois as atividades são adaptáveis ao nível de desafio que cada paciente suporta."
    },
    {
      q: "8. Os dados do meu paciente/filho estão seguros?",
      a: "Segurança é prioridade. O Urbeludo é desenvolvido seguindo as normas da LGPD (Lei Geral de Proteção de Dados). Todas as informações clínicas e de desempenho são criptografadas e o acesso é restrito ao profissional responsável e aos tutores legais."
    },
    {
      q: "9. Qual o diferencial do Urbeludo para outros apps de jogos infantis?",
      a: "Diferente de jogos comuns, o Urbeludo é fundamentado em conceitos científicos de Psicomotricidade e Ludicidade. Cada mecânica de jogo tem um propósito terapêutico validado. Enquanto outros apps focam apenas em entretenimento, nós focamos em resultado clínico mensurável."
    },
    {
      q: "10. Como as clínicas e terapeutas podem adotar o sistema?",
      a: "O Urbeludo opera em um modelo de assinatura (SaaS). As clínicas podem contratar licenças para seus terapeutas, que por sua vez vinculam seus pacientes à plataforma, criando uma rede de monitoramento em tempo real que valoriza o serviço prestado e fideliza as famílias."
    }
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary/20 selection:text-primary pb-32 overflow-x-hidden">
      
      {/* Specialized Fixed Header for UrbeLudo */}
      <header className="fixed top-0 left-0 right-0 z-[500] bg-white/80 backdrop-blur-3xl border-b border-slate-100 transition-all duration-500">
        <div className="container mx-auto px-6 h-16 md:h-24 flex items-center justify-between gap-4">
          <Link href="/" className="relative block w-[120px] h-[36px] md:w-[200px] md:h-[50px] transition-all hover:scale-105 shrink-0">
            <Image 
              src={logoUrl} 
              alt="studiosapient Logo" 
              fill 
              className="object-contain object-left" 
              priority 
            />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-[9px] font-black uppercase tracking-[0.4em] transition-all relative group py-2",
                  activeSection === item.id ? "text-primary" : "text-slate-400 hover:text-slate-950"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500",
                  activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </button>
            ))}
          </nav>
          
          <div className="lg:hidden flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[200px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  activeSection === item.id ? "text-primary bg-primary/5" : "text-slate-400"
                )}
                aria-label={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section - Dark & Purple Premium Mesh */}
      <section id="inicio" className="relative pt-32 pb-16 md:pt-64 md:pb-48 px-6 text-center space-y-4 overflow-hidden hero-purple-mesh bg-[#08070b]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="relative z-10 container mx-auto">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-8 py-2.5 text-[9px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">HealthTech Vanguarda</Badge>
          <h1 className="font-headline text-3xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-[0.85] mb-8 text-balance uppercase">
            UrbeLudo <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary italic block lowercase font-medium">movimento & inteligência.</span>
          </h1>
          <p className="text-xs md:text-2xl text-white/40 font-medium max-w-3xl mx-auto leading-tight mb-12 text-balance px-4 pt-4">
            Escalando a eficácia clínica através de tecnologia preditiva para o desenvolvimento neuropsicomotor infantil.
          </p>
          <div className="flex justify-center pt-8">
            <button onClick={() => scrollToSection('desafio')} className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 flex items-center justify-center text-primary animate-bounce hover:bg-white/5 transition-colors">
              <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Seção Desafio - High Contrast White Editorial */}
      <section id="desafio" className="py-20 md:py-48 bg-white text-slate-950 rounded-[2.5rem] md:rounded-[6rem] mx-4 -mt-8 relative z-20 shadow-2xl px-6 overflow-hidden border border-slate-100">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Gap de Saúde Pública</p>
              <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">O Abismo da <br/><span className="text-primary italic font-medium">Reabilitação.</span></h2>
            </div>
            <p className="text-sm md:text-lg text-slate-500 leading-relaxed max-w-md font-medium">O atraso no diagnóstico e a falta de continuidade no tratamento domiciliar geram perdas irreversíveis na autonomia infantil. O UrbeLudo digitaliza esse processo para democratizar resultados.</p>
          </div>
          <blockquote className="text-lg md:text-4xl text-slate-300 font-medium leading-tight italic border-l-4 md:border-l-8 border-primary/10 pl-6 md:pl-8 text-balance">
            "Digitalizamos a jornada psicomotora para devolver o que há de mais precioso: a autonomia humana."
          </blockquote>
        </div>
      </section>

      {/* Seção Semiótica - Light Gray Technical Minimalist */}
      <section id="semiotica" className="py-20 md:py-48 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Arquitetura de Marca</p>
          <h3 className="font-headline text-2xl md:text-7xl font-black text-slate-950 uppercase mb-16 tracking-tighter leading-[0.85]">Urbanismo do <br /><span className="text-primary italic font-medium">Movimento.</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-8">
            <div className="p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-white border border-slate-200 text-left space-y-4 md:space-y-6 shadow-sm group hover:border-primary/20 transition-all duration-700">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Box className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg md:text-3xl font-black uppercase tracking-tighter text-slate-950">URBE (Cidade)</h4>
                <p className="text-slate-500 leading-relaxed text-xs md:text-lg font-medium">A organização lúdica das funções psicomotoras. O corpo como espaço estruturado, onde cada movimento tem sua coordenada e função lógica.</p>
              </div>
            </div>
            <div className="p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-white border border-slate-200 text-left space-y-4 md:space-y-6 shadow-sm group hover:border-primary/20 transition-all duration-700">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Smile className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg md:text-3xl font-black uppercase tracking-tighter text-slate-950">LUDO (Brincar)</h4>
                <p className="text-slate-500 leading-relaxed text-xs md:text-lg font-medium">A fluidez do brincar. O motor de engajamento que remove a barreira clínica fria e datada, transformando o esforço terapêutico em diversão imersiva.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Marcos - White Pipeline Compact */}
      <section id="marcos" className="py-20 md:py-48 bg-white px-6 rounded-[2.5rem] md:rounded-[6rem] mx-4 mb-12 border border-slate-100">
        <div className="container mx-auto max-w-7xl space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Pipeline de Inovação</p>
          <h3 className="font-headline text-2xl md:text-7xl font-black text-slate-950 uppercase mb-16 text-center tracking-tighter leading-[0.85]">Marcos de <br /><span className="text-primary italic font-medium">Evolução.</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-8">
            {milestones.map((m, i) => (
              <div key={i} className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-50 border border-slate-200 space-y-4 relative overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-700">
                <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", m.color)} />
                <div className={cn("h-10 w-10 md:h-14 md:w-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shadow-md", m.color)}>
                  <div className="scale-75 md:scale-100">{m.icon}</div>
                </div>
                <div className="space-y-2 md:space-y-4">
                  <h5 className="text-base md:text-xl font-black uppercase leading-tight tracking-tighter text-slate-950">{m.title}</h5>
                  <Badge className="bg-white text-slate-400 border-none px-3 py-0.5 text-[7px] font-black uppercase tracking-widest">{m.status}</Badge>
                  <p className="text-slate-500 text-[10px] md:text-base leading-relaxed font-medium">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção FAQ - Light Gray Minimalist Restoration */}
      <section id="faq" className="py-20 md:py-48 bg-slate-50 text-slate-950 rounded-[2.5rem] md:rounded-[4rem] mx-4 my-12 px-6">
        <div className="container mx-auto max-w-4xl space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Base de Conhecimento</p>
          <h3 className="font-headline text-xl md:text-6xl font-black text-center uppercase mb-12 tracking-tighter leading-[0.85]">Dúvidas <br /><span className="text-primary italic font-medium">Técnicas.</span></h3>
          <Accordion type="single" collapsible className="space-y-2 pt-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-none bg-white rounded-xl md:rounded-[2rem] px-5 md:px-10 shadow-sm border border-slate-200 overflow-hidden">
                <AccordionTrigger className="text-left font-black uppercase text-[9px] md:text-sm py-5 md:py-8 text-slate-950 hover:no-underline group">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-[10px] md:text-lg pb-6 md:pb-10 leading-relaxed border-l-2 md:border-l-4 border-primary/10 pl-4 md:pl-6 font-medium">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Seção Investidores - Mixed Impact Hybrid Contrast */}
      <section id="investidores" className="py-20 md:py-48 px-6 bg-white">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Ecossistema Social</p>
              <h3 className="font-headline text-2xl md:text-8xl font-black text-slate-950 leading-[0.85] uppercase tracking-tighter">Mova o <br/><span className="text-primary italic font-medium">Futuro.</span></h3>
            </div>
            <p className="text-sm md:text-xl text-slate-500 leading-relaxed text-balance font-medium">Buscamos parcerias estratégicas para democratizar a saúde infantil. Cada apoio acelera a chegada do UrbeLudo a quem mais precisa.</p>
            <div className="flex items-center gap-3 p-4 md:p-6 rounded-2xl bg-primary/5 border border-primary/10">
               <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-primary" />
               <p className="text-[8px] md:text-sm font-bold text-primary/80 uppercase tracking-widest italic">100% dos apoios sociais são revertidos para ONGs.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-slate-50 text-slate-950 space-y-6 md:space-y-8 border-t-4 md:border-t-[8px] border-primary shadow-sm hover:shadow-lg transition-all">
              <Badge className="bg-primary/10 text-primary px-4 py-1.5 text-[8px] uppercase font-black tracking-widest border-none">Pro Bono</Badge>
              <h4 className="text-lg md:text-4xl font-black uppercase leading-none tracking-tighter">Seja Co-Autor</h4>
              <p className="text-slate-500 text-[10px] md:text-lg leading-relaxed font-medium">Buscamos especialistas em saúde e tech para colaborar no refinamento do método SPSP sem custos operacionais.</p>
              <Button 
                className="w-full h-12 md:h-20 rounded-2xl bg-slate-950 text-white hover:bg-slate-800 font-black text-[8px] md:text-[10px] uppercase tracking-widest transition-all active:scale-95 border-none shadow-xl" 
                onClick={() => copyToClipboard(contactEmail, "Email")}
              >
                Copiar Email de Contato
              </Button>
            </div>
            <div className="p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-[#08070b] border border-white/5 text-white space-y-6 md:space-y-8 shadow-2xl hover:shadow-primary/20 transition-all border-t-4 md:border-t-[8px] border-primary">
              <Badge className="bg-primary/20 text-primary px-4 py-1.5 text-[8px] uppercase font-black tracking-widest border-none">Impacto Direto</Badge>
              <h4 className="text-lg md:text-4xl font-black uppercase leading-none tracking-tighter text-white">Custear Projeto</h4>
              <p className="text-white/40 text-[10px] md:text-lg leading-relaxed font-medium">Contribua com a manutenção do servidor e expansão de licenças para instituições carentes.</p>
              <Button 
                className="w-full h-12 md:h-20 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[8px] md:text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 border-none transition-all active:scale-95" 
                onClick={() => copyToClipboard(pixKey, "PIX")}
              >
                Apoiar via PIX <ArrowRight className="ml-3 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
