
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
  Smile
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

  return (
    <main id="main-content" className="min-h-screen bg-[#08070b] text-white selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section - HealthTech Prestige */}
      <section className="relative pt-32 pb-24 md:pt-64 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(6,182,212,0.15),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-12">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-10 py-3 text-[10px] font-black uppercase tracking-[0.6em] rounded-full backdrop-blur-xl animate-bounce">
                HealthTech Vanguarda
              </Badge>
            </div>
            
            <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-12">
              UrbeLudo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-primary italic font-medium block">Movimento & Inteligência.</span>
            </h1>
            
            <p className="text-lg md:text-3xl text-white/50 font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance mb-20">
              Escalando a eficácia clínica através de tecnologia multiplataforma e suporte preditivo em tempo real para o desenvolvimento infantil.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Button 
                onClick={() => scrollToSection('desafio')}
                className="h-24 px-16 bg-white text-black hover:bg-cyan-400 hover:text-white rounded-full font-black uppercase tracking-[0.5em] text-[12px] transition-all duration-700 shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:scale-105"
              >
                CONHECER A CAUSA
              </Button>
              <button 
                onClick={() => scrollToSection('semiotica')}
                className="flex items-center gap-6 text-white/30 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.6em] group"
              >
                A Alma do Nome <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O Desafio - Manifesto Narrative */}
      <section id="desafio" className="py-24 md:py-64 bg-white text-slate-950 relative overflow-hidden rounded-[5rem] md:rounded-[10rem] mx-4 my-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-5 space-y-12">
                <Badge className="bg-primary/10 text-primary border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">O Grande Desafio</Badge>
                <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                  O Abismo da <br/><span className="text-primary italic">Reabilitação.</span>
                </h2>
                <div className="h-2 w-32 bg-primary rounded-full" />
              </div>
              
              <div className="lg:col-span-7 space-y-12">
                <p className="text-2xl md:text-4xl text-slate-900 font-medium leading-tight tracking-tight italic">
                  "A jornada neuropsicomotora enfrenta um obstáculo silencioso: o abismo entre o consultório e a vida real."
                </p>
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                  Sem ferramentas que garantam a continuidade lúdica e a coleta de dados precisos em casa, o progresso de crianças com atrasos no desenvolvimento torna-se lento, caro e, muitas vezes, desmotivador. O UrbeLudo nasceu para digitalizar essa jornada e devolver o que há de mais precioso: <span className="text-slate-950 font-bold underline decoration-primary decoration-4">a autonomia humana.</span>
                </p>
                <div className="flex gap-12 pt-8">
                   <div className="space-y-2">
                      <p className="text-5xl font-black text-primary tracking-tighter">0.1s</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Latência de Resposta</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-5xl font-black text-primary tracking-tighter">100%</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Foco em Propósito</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A Semiótica do Nome - Storytelling Section */}
      <section id="semiotica" className="py-24 md:py-64 relative overflow-hidden bg-[#0a0a0c]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-32 max-w-4xl mx-auto space-y-10">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Storytelling & Semiótica</Badge>
            <h3 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none text-white uppercase">A Alma do <br/><span className="text-primary italic">Nome.</span></h3>
            <p className="text-2xl text-white/50 font-medium leading-tight tracking-tight">
              A fusão entre a estrutura da ciência e a fluidez do afeto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* URBE - A Estrutura */}
            <div className="lg:col-span-6 p-12 rounded-[4rem] bg-white/5 border border-white/10 space-y-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-1000">
                 <Building2 className="h-64 w-64 text-cyan-400" />
               </div>
               <div className="space-y-8 relative z-10">
                 <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-lg">
                      <Box className="h-8 w-8" />
                    </div>
                    <h4 className="text-4xl font-black tracking-tighter uppercase text-white">URBE</h4>
                 </div>
                 <p className="text-xl text-white/40 font-medium leading-relaxed">
                   Do latim <span className="text-cyan-400 font-bold italic">Urbs</span> (Cidade). Representa o ambiente, a estrutura e o corpo humano como um espaço habitado. Reabilitar é dar condições para que a criança navegue com autonomia sua própria "urbe interna".
                 </p>
                 <div className="p-6 rounded-3xl bg-cyan-400/5 border border-cyan-400/10 italic text-cyan-400/60 text-sm">
                   "O planejamento urbano do movimento humano."
                 </div>
               </div>
            </div>

            {/* LUDO - O Jogo */}
            <div className="lg:col-span-6 p-12 rounded-[4rem] bg-primary/10 border border-primary/20 space-y-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000">
                 <Gamepad2 className="h-64 w-64 text-primary" />
               </div>
               <div className="space-y-8 relative z-10">
                 <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-lg">
                      <Smile className="h-8 w-8" />
                    </div>
                    <h4 className="text-4xl font-black tracking-tighter uppercase text-white">LUDO</h4>
                 </div>
                 <p className="text-xl text-white/40 font-medium leading-relaxed">
                   Do latim <span className="text-primary font-bold italic">Ludus</span> (Jogo/Brincar). O motor da aprendizagem. É através da ludicidade que removemos a resistência e entregamos o resultado terapêutico com alegria.
                 </p>
                 <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 italic text-primary text-sm">
                   "O braço direito do afeto e da ciência."
                 </div>
               </div>
            </div>

            {/* O Fator Urso Peludo */}
            <div className="lg:col-span-12 p-12 md:p-20 rounded-[5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex flex-col md:flex-row gap-16 items-center shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_70%)]" />
               <div className="md:w-1/3 text-center md:text-left space-y-6">
                 <div className="h-24 w-24 rounded-[2.5rem] bg-white text-black flex items-center justify-center shadow-2xl mx-auto md:mx-0">
                   <Heart className="h-12 w-12 text-primary animate-pulse" />
                 </div>
                 <h5 className="text-3xl font-black tracking-tighter uppercase text-white leading-none">Ponte <br/>Fonética</h5>
               </div>
               <div className="md:w-2/3 space-y-8">
                  <p className="text-2xl md:text-3xl text-white/80 font-medium tracking-tight leading-tight">
                    Foneticamente, o nome remete a <span className="text-primary font-black italic">"Urso Peludo"</span>.
                  </p>
                  <p className="text-lg text-white/40 font-medium leading-relaxed">
                    Essa escolha retira a carga pesada da palavra "reabilitação" e a substitui por algo familiar e acolhedor. O UrbeLudo é seguro, macio e amigável – um ativo de branding desenhado para ser o companheiro fiel da criança.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. A Solução & SPSP - Tech Focus */}
      <section id="spsp" className="py-24 md:py-64 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6 space-y-12">
              <div className="space-y-8">
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.5em]">Multiplataforma Full-Stack</Badge>
                <h3 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">Ecossistema <br/><span className="text-cyan-400 italic">Integrado.</span></h3>
                <p className="text-xl text-white/50 font-medium max-w-2xl leading-relaxed">
                  Transformamos protocolos de saúde em experiências de engajamento profundo através de uma solução disponível para iOS, Android e Web.
                </p>
              </div>

              <div className="p-12 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-1000 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Brain className="h-56 w-56 text-cyan-400" />
                </div>
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-lg">
                      <Cpu className="h-8 w-8" />
                    </div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase text-cyan-400">Cérebro SPSP</h4>
                  </div>
                  <p className="text-xl text-white/80 font-medium leading-relaxed">
                    O <span className="text-white font-bold underline decoration-cyan-400">Sistema Preditivo de Suporte Psicomotor</span> monitora o desempenho clínico e oferece suporte preditivo para o ajuste de terapias em tempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { icon: <Smartphone />, title: "iOS & Android", desc: "Adesão total em dispositivos móveis." },
                 { icon: <Globe />, title: "Web Platform", desc: "Gestão completa para o terapeuta." },
                 { icon: <ShieldCheck />, title: "Rigor Científico", desc: "Protocolos validados por especialistas." },
                 { icon: <BarChart3 />, title: "Relatórios de Dados", desc: "Dados estruturados para evolução clínica." }
               ].map((item, idx) => (
                 <div key={idx} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-500 shadow-xl">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h5 className="font-black text-xl uppercase tracking-tight mb-3">{item.title}</h5>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pilares de Atuação */}
      <section className="py-24 md:py-64 bg-white text-slate-950 relative rounded-[5rem] md:rounded-[10rem] mx-4 my-8 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <Badge className="mb-10 bg-primary/10 text-primary border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Especialidades Clínicas</Badge>
            <h3 className="font-headline text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-8">Pilares do <br/><span className="text-primary italic">Cuidado.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1440px] mx-auto">
            {[
              { 
                icon: <Mic2 />, 
                title: "Fonoaudiologia", 
                desc: "Estímulos de fala e linguagem integrados a mecânicas interativas que transformam som em progresso." 
              },
              { 
                icon: <Target />, 
                title: "Terapia Ocupacional", 
                desc: "Desafios de planejamento motor e organização sensorial desenhados para ampliar a autonomia real." 
              },
              { 
                icon: <BarChart3 />, 
                title: "Fisioterapia Motora", 
                desc: "Guia de movimentos funcionais com foco na coordenação e no equilíbrio sob rigor científico." 
              }
            ].map((pilar, idx) => (
              <div key={idx} className="p-12 rounded-[4rem] bg-slate-50 border border-slate-100 space-y-10 group hover:bg-white hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-1000">
                 <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                   {pilar.icon}
                 </div>
                 <div className="space-y-6">
                    <h4 className="font-headline text-3xl font-black tracking-tighter uppercase leading-none">{pilar.title}</h4>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">{pilar.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Inteligência Multidisciplinar - The Team */}
      <section id="expertise" className="py-24 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-32 space-y-10">
            <Badge className="bg-white/5 text-white/40 border-white/10 px-8 py-2 text-[10px] font-black uppercase tracking-[0.5em]">Expertise Transversal Pro Bono</Badge>
            <h3 className="font-headline text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white uppercase">Cérebro <br/><span className="text-cyan-400 italic">Multidisciplinar.</span></h3>
            <p className="text-2xl text-white/50 font-medium leading-relaxed max-w-3xl mx-auto">
              O UrbeLudo é a fusão entre rigor clínico e engenharia de software de elite, operado por especialistas que contribuem de forma <span className="text-white font-bold">pro bono (sem custos)</span> pelo impacto social.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <Users2 />, role: "Designers & UX", desc: "Interfaces que removem a resistência informacional." },
              { icon: <Stethoscope />, role: "Psicólogos & Fonos", desc: "Validação clínica de cada estímulo lúdico." },
              { icon: <Gamepad2 />, role: "Game Designers", desc: "Mecânicas de engajamento profundo e diversão." },
              { icon: <Code2 />, role: "Full-Stack Devs", desc: "Arquitetura robusta para escala global do SPSP." }
            ].map((member, idx) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-700 shadow-2xl">
                <div className="h-16 w-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 transition-transform">
                  {member.icon}
                </div>
                <h5 className="font-black text-2xl uppercase tracking-tight mb-4">{member.role}</h5>
                <p className="text-white/40 text-base leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Estratégico - Ecossistema UrbeLudo */}
      <section id="faq" className="py-24 md:py-64 bg-white text-slate-950 relative rounded-[5rem] md:rounded-[10rem] mx-4 my-8 shadow-2xl">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-24 space-y-6">
            <Badge className="bg-primary/10 text-primary border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Base de Conhecimento</Badge>
            <h3 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none text-slate-950 uppercase">Dúvidas do <br/><span className="text-primary italic">Ecossistema.</span></h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-slate-50 rounded-[2.5rem] px-8 py-2 shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline py-6 group">
                  <div className="flex items-center gap-6 text-left">
                    <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all">
                      {faq.icon}
                    </div>
                    <span className="font-black text-sm md:text-lg tracking-tight uppercase leading-tight text-slate-900">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 font-medium text-base md:text-lg leading-relaxed pb-8 px-4 md:px-20 border-l-2 border-primary/20 ml-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 8. Investimento & Apoio - Convidativo */}
      <section id="investidores" className="py-24 md:py-64 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-6 space-y-16">
              <h3 className="font-headline text-5xl md:text-[7rem] font-black tracking-tighter leading-[0.85] text-white">Pronto para <br/><span className="text-primary italic">Mover o Futuro?</span></h3>
              <p className="text-2xl text-white/40 font-medium max-w-xl leading-relaxed">
                Buscamos parceiros estratégicos e especialistas dispostos a colaborar pro bono para democratizar a saúde digital.
              </p>
              <div className="space-y-8">
                {[
                  "Escalabilidade Full-Stack Garantida",
                  "Inteligência de Dados Proprietária SPSP",
                  "Impacto Social Medido em Autonomia"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-6 text-white/80 font-black text-xs md:text-xl uppercase tracking-widest">
                    <CheckCircle2 className="text-cyan-400 h-8 w-8 shrink-0" /> {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-12">
              {/* Card Parceria Pro Bono */}
              <div className="p-12 rounded-[4.5rem] bg-white text-slate-950 space-y-10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:scale-[1.02] transition-all duration-700 border border-slate-100">
                 <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                   <HandHeart className="h-64 w-64 text-primary" />
                 </div>
                 <div className="space-y-8 relative z-10">
                   <div className="flex gap-4">
                     <Badge className="bg-primary/10 text-primary border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Colaboração Pro Bono</Badge>
                     <Badge className="bg-cyan-500/10 text-cyan-600 border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Sem Custos</Badge>
                   </div>
                   <h4 className="font-headline text-4xl font-black tracking-tighter uppercase leading-none">Seja um <br/>Co-Autor.</h4>
                   <p className="text-slate-500 font-medium text-xl leading-relaxed">
                     Buscamos designers, clínicos e desenvolvedores que queiram atuar <span className="text-primary font-bold">pro bono</span> para acelerar este impacto social sem cobrança de honorários.
                   </p>
                   <button 
                     onClick={() => copyToClipboard(contactEmail, "E-mail")} 
                     className="flex items-center justify-between w-full p-8 rounded-3xl bg-slate-50 border border-slate-200 group/btn hover:border-primary hover:bg-white transition-all shadow-sm"
                   >
                     <div className="flex items-center gap-6">
                       <Mail className="h-6 w-6 text-primary" />
                       <span className="font-black text-xs md:text-sm uppercase tracking-[0.3em]">{contactEmail}</span>
                     </div>
                     <Copy className="h-5 w-5 text-slate-300 group-hover/btn:text-primary transition-colors" />
                   </button>
                 </div>
              </div>

              {/* Card PIX Social Impact */}
              <div className="p-12 rounded-[4.5rem] bg-[#121216] border border-white/10 space-y-10 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-700">
                 <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Heart className="h-64 w-64 text-primary" />
                 </div>
                 <div className="space-y-8 relative z-10">
                   <Badge className="bg-cyan-500/10 text-cyan-400 border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Apoio de Desenvolvimento</Badge>
                   <h4 className="font-headline text-4xl font-black tracking-tighter uppercase leading-none text-white">Custear o <br/>Projeto.</h4>
                   <p className="text-white/40 font-medium text-xl leading-relaxed">
                     Sua doação via PIX ajuda a <span className="text-white font-bold">custear o desenvolvimento</span> e garante que esta tecnologia chegue a ONGs e famílias de baixa renda.
                   </p>
                   <button 
                     onClick={() => copyToClipboard(pixKey, "Chave PIX")} 
                     className="flex items-center justify-between w-full p-8 rounded-3xl bg-white/5 border border-white/10 group/pix hover:border-cyan-400 hover:bg-white/10 transition-all shadow-inner"
                   >
                     <div className="flex items-center gap-6">
                       <Zap className="h-6 w-6 text-cyan-400" />
                       <span className="font-black text-xs md:text-sm uppercase tracking-[0.3em] text-white">Copiar Chave PIX</span>
                     </div>
                     <ArrowRight className="h-5 w-5 text-white/20 group-hover/pix:text-cyan-400 group-hover/pix:translate-x-2 transition-all" />
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Final Call */}
      <section className="py-24 md:py-64 bg-white text-slate-950 mx-4 mb-24 rounded-[6rem] md:rounded-[10rem] shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center space-y-16">
           <h3 className="font-headline text-5xl md:text-[10rem] font-black tracking-tighter leading-[0.85] text-slate-950 uppercase">
             O Futuro é <span className="text-primary italic">Humano.</span>
           </h3>
           <p className="text-2xl md:text-4xl text-slate-500 font-medium max-w-5xl mx-auto tracking-tight leading-tight">
             O UrbeLudo prova que a tecnologia, guiada pelo afeto e pela ciência, é a maior ferramenta de liberdade que existe.
           </p>
           <div className="pt-10">
              <Button onClick={handleOpenChat} className="h-32 px-24 bg-primary text-white hover:bg-primary/90 rounded-full font-black uppercase tracking-[0.5em] text-[14px] transition-all shadow-[0_30px_70px_rgba(139,92,246,0.4)] hover:scale-110 active:scale-95">
                FALAR COM ESTRATEGISTA <ExternalLink className="ml-6 h-6 w-6" />
              </Button>
           </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
