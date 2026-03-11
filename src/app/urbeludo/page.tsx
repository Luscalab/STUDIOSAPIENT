
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
  Stethoscope,
  HandHeart,
  Globe
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
    <main id="main-content" className="min-h-screen bg-[#08070b] text-white selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section - HealthTech Prestige */}
      <section className="relative pt-32 pb-24 md:pt-64 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Mesh Gradient Animado */}
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
                onClick={() => scrollToSection('expertise')}
                className="flex items-center gap-6 text-white/30 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.6em] group"
              >
                Cérebro do Projeto <ChevronDown className="h-5 w-5 animate-bounce group-hover:text-cyan-400" />
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
                  Sem ferramentas que garantam a continuidade lúdica e a coleta de dados precisos em casa, o progresso torna-se lento e desmotivador. O UrbeLudo nasceu para digitalizar essa jornada e devolver o que há de mais precioso: <span className="text-slate-950 font-bold underline decoration-primary decoration-4">a autonomia humana.</span>
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

      {/* 3. A Solução & SPSP - Tech Focus */}
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
                    O <span className="text-white font-bold underline decoration-cyan-400">Sistema Preditivo de Suporte Psicomotor</span> monitora o desempenho clínico e oferece ajustes de terapia em tempo real através de inteligência artificial proprietária.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { icon: <Smartphone />, title: "iOS & Android", desc: "Adesão total em dispositivos móveis." },
                 { icon: <Globe />, title: "Web Platform", desc: "Gestão completa para o terapeuta." },
                 { icon: <ShieldCheck />, title: "Rigor Científico", desc: "Protocolos validados por especialistas." },
                 { icon: <BarChart3 />, title: "Relatórios de ROI", desc: "Dados estruturados para convênios." }
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

      {/* 4. Pilares de Atuação */}
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

      {/* 5. Inteligência Multidisciplinar - The Team */}
      <section id="expertise" className="py-24 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-32 space-y-10">
            <Badge className="bg-white/5 text-white/40 border-white/10 px-8 py-2 text-[10px] font-black uppercase tracking-[0.5em]">Expertise Transversal Pro Bono</Badge>
            <h3 className="font-headline text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white uppercase">Cérebro <br/><span className="text-cyan-400 italic">Multidisciplinar.</span></h3>
            <p className="text-2xl text-white/50 font-medium leading-relaxed max-w-3xl mx-auto">
              O UrbeLudo é a fusão entre rigor clínico e engenharia de software de elite, operado por especialistas que contribuem de forma <span className="text-white font-bold">pro bono</span> pelo impacto social.
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

      {/* 6. Investimento & Apoio - Convidativo */}
      <section id="investidores" className="py-24 md:py-64 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-6 space-y-16">
              <h3 className="font-headline text-5xl md:text-[7rem] font-black tracking-tighter leading-[0.85] text-white">Pronto para <br/><span className="text-primary italic">Mover o Futuro?</span></h3>
              <p className="text-2xl text-white/40 font-medium max-w-xl leading-relaxed">
                Buscamos parceiros estratégicos e especialistas dispostos a colaborar para democratizar a saúde digital.
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
                     <Badge className="bg-cyan-500/10 text-cyan-600 border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Apoio Técnico</Badge>
                   </div>
                   <h4 className="font-headline text-4xl font-black tracking-tighter uppercase leading-none">Seja um <br/>Co-Autor.</h4>
                   <p className="text-slate-500 font-medium text-xl leading-relaxed">
                     Buscamos designers, clínicos e desenvolvedores que queiram atuar sem custos para acelerar este impacto social.
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
                   <Badge className="bg-cyan-500/10 text-cyan-400 border-none px-6 py-2 text-[10px] font-black uppercase tracking-widest">Doação Direta</Badge>
                   <h4 className="font-headline text-4xl font-black tracking-tighter uppercase leading-none text-white">Impacto na <br/>Baixa Renda.</h4>
                   <p className="text-white/40 font-medium text-xl leading-relaxed">
                     Sua doação via PIX garante que esta tecnologia chegue a ONGs e famílias que não podem pagar por tratamento privado.
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

      {/* 7. CTA Final Call */}
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
