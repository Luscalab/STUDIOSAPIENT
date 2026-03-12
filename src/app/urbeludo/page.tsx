
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
  Activity,
  Box,
  Smile,
  Heart,
  Sparkles,
  ShieldCheck,
  Users,
  Mic,
  MousePointer2,
  Stethoscope
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function UrbeLudoPage() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const urbeludoMainImage = PlaceHolderImages.find(img => img.id === "urbeludo-main")?.imageUrl;

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
    }
  };

  const contactEmail = "contato@studiosapient.com.br";
  const pixKey = "contato@studiosapient.com.br";

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
      a: "O jogo utiliza a Ludicidade Progressiva para geragem engajamento. Ao transformar um exercício repetitivo em um desafio gamificado, estimulamos a neuroplasticidade e a liberação de dopamina, o que aumenta a aderência da criança ao tratamento e torna o ganho de consciência corporal e motora muito mais fluido."
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
      
      <Navbar />

      <section id="inicio" className="relative pt-32 pb-20 md:pt-64 md:pb-48 px-6 text-center hero-purple-mesh bg-[#08070b]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-8 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">
              Bioscience & Connection
            </Badge>
            <h1 className="font-headline text-3xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              UrbeLudo: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary italic font-medium lowercase">movimento no bolso.</span>
            </h1>
            <p className="text-sm md:text-xl text-white/40 font-medium leading-relaxed max-w-xl">
              A reabilitação neuropsicomotora não precisa ser um processo rígido. Criamos uma ponte digital para que o desenvolvimento da criança continue em casa, transformando exercícios em momentos de descoberta.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => scrollToSection('coracao')} className="h-14 px-8 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[9px] border-none shadow-2xl shadow-primary/30">
                Conhecer Método
              </Button>
            </div>
          </div>
          
          <div className="relative h-[300px] md:h-[600px] w-full flex items-center justify-center">
            {/* Espirais Decorativos em Roxo e Lilás */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible">
              <svg viewBox="0 0 200 200" className="w-[150%] h-[150%] opacity-40 blur-3xl animate-pulse">
                <defs>
                  <radialGradient id="spiralGrad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="spiralGrad2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="80" fill="url(#spiralGrad1)" className="animate-pulse" />
                <path d="M100 20 A80 80 0 0 1 180 100 A80 80 0 0 1 100 180 A80 80 0 0 1 20 100 A80 80 0 0 1 100 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" className="animate-spin" style={{ animationDuration: '20s' }} />
                <path d="M100 40 A60 60 0 0 1 160 100 A60 60 0 0 1 100 160 A60 60 0 0 1 40 100 A60 60 0 0 1 100 40" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" className="animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              </svg>
            </div>

            {urbeludoMainImage && (
              <Image 
                src={urbeludoMainImage} 
                alt="Interface UrbeLudo Official" 
                fill 
                className="object-contain relative z-10"
                data-ai-hint="app interaction"
                priority
              />
            )}
          </div>
        </div>
      </section>

      <section id="coracao" className="py-20 md:py-48 bg-white text-slate-950 rounded-[2.5rem] md:rounded-[6rem] mx-4 -mt-8 relative z-20 shadow-2xl px-6 border border-slate-100 overflow-hidden">
        <div className="container mx-auto max-w-5xl space-y-20">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">DNA do Projeto</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">O Coração da <br /><span className="text-primary italic font-medium lowercase">experiência.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="p-10 md:p-16 rounded-[3rem] bg-slate-50 border border-slate-100 space-y-6 group hover:border-primary/20 transition-all duration-700">
               <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                 <Box className="h-8 w-8" />
               </div>
               <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">URBE (Espaço)</h3>
               <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">Entendemos o corpo como o primeiro território. Dominá-lo é como navegar em uma cidade; exige mapas (esquema corporal) e vias livres (coordenação).</p>
            </div>
            
            <div className="p-10 md:p-16 rounded-[3rem] bg-slate-50 border border-slate-100 space-y-6 group hover:border-primary/20 transition-all duration-700">
               <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                 <Smile className="h-8 w-8" />
               </div>
               <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">LUDO (Brincar)</h3>
               <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">O jogo é a linguagem natural da infância. Através do lúdico o cérebro cria novas conexões neurais e supera limites sem o peso da obrigação.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ciencia" className="py-20 md:py-48 bg-slate-50 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
             <div className="lg:w-1/2 space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Rigor Científico</span>
                <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">A Ciência do <br /><span className="text-primary italic font-medium lowercase">fluxo.</span></h2>
                <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed">Nossa plataforma não é apenas diversão; ela é fundamentada em pilares sólidos da saúde e educação que garantem resultados clínicos reais.</p>
             </div>
             
             <div className="lg:w-1/2 space-y-6">
                {[
                  { title: "Psicomotricidade", desc: "Trabalhamos a relação entre pensamento, emoção e movimento, focando na estruturação espacial e imagem corporal.", icon: <Users className="h-5 w-5" /> },
                  { title: "Neuroplasticidade", desc: "Desafios desenhados para estimular a reorganização cerebral, criando novas rotas para a fala e o movimento.", icon: <Brain className="h-5 w-5" /> },
                  { title: "Teoria do Fluxo", desc: "Nível de desafio equilibrado para evitar tédio ou fluxos de frustração, garantindo engajamento contínuo.", icon: <Zap className="h-5 w-5" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 p-8 rounded-[2rem] bg-white border border-slate-200 group hover:shadow-lg transition-all">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-lg uppercase tracking-tighter text-slate-950 mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-[11px] md:text-sm font-medium leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section id="spsp" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-2xl" />
             <div className="relative p-10 md:p-16 rounded-[4rem] bg-[#08070b] text-white border border-white/5 space-y-10 shadow-2xl">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <Cpu className="h-8 w-8" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Motor <br />SPSP.</h3>
                  <p className="text-white/40 text-sm md:text-lg font-medium leading-relaxed">Enquanto a criança brinca, o Sistema Preditivo de Suporte Psicomotor analisa discretamente padrões de interação.</p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4">
                   <div className="space-y-2">
                     <p className="text-2xl font-black text-primary">Previsão</p>
                     <p className="text-[9px] text-white/30 uppercase font-black">Tendências de Evolução</p>
                   </div>
                   <div className="space-y-2">
                     <p className="text-2xl font-black text-cyan-400">Dados</p>
                     <p className="text-[9px] text-white/30 uppercase font-black">Precisão Clínica</p>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="space-y-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Backstage Técnico</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">Relatórios <br /><span className="text-primary italic font-medium lowercase">assertivos.</span></h2>
            <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed">
              O sistema identifica dificuldades específicas em fonemas ou coordenação fina. Esses dados são transformados em relatórios simples, permitindo que a próxima sessão presencial foque exatamente onde a criança mais precisa de ajuda.
            </p>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
               <Activity className="h-6 w-6 text-primary" />
               <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest italic">Monitoramento em tempo real via Cloud Sapient.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="frentes" className="py-20 md:py-48 bg-slate-50 px-6 rounded-[3rem] md:rounded-[6rem] mx-4 my-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Verticalização Clínica</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">Frentes de <br /><span className="text-primary italic font-medium lowercase">cuidado.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: "Fonoaudiologia", desc: "Jogos que incentivam a voz e o sopro. O microfone vira ferramenta de poder, onde a fala faz o mundo ganhar vida.", icon: <Mic className="h-10 w-10" /> },
              { title: "Terapia Ocupacional", desc: "Atividades de 'arrastar e encaixar' que treinam a precisão, atenção visual e planejamento motor diário.", icon: <MousePointer2 className="h-10 w-10" /> },
              { title: "Movimento & Reabilitação", desc: "Exercícios guiados de imitação e ritmo, trabalhando o equilíbrio e a coordenação global da criança.", icon: <Stethoscope className="h-10 w-10" /> }
            ].map((frente, idx) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-white border border-slate-100 space-y-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {frente.icon}
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-950">{frente.title}</h3>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">{frente.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="colaboracao" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-12">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Ecossistema Social</span>
          <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">Seja um <br /><span className="text-primary italic font-medium lowercase">co-autor.</span></h2>
          <p className="text-slate-500 text-sm md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
            O UrbeLudo é feito por pessoas para pessoas. Contamos com uma rede de especialistas que doam tempo e talento para que esta ferramenta chegue a quem mais precisa.
          </p>
          <div className="pt-8">
            <Button 
              onClick={() => copyToClipboard(contactEmail, "Email")} 
              className="h-24 px-16 bg-[#08070b] text-white hover:bg-slate-800 rounded-full font-black uppercase tracking-[0.4em] text-[10px] border-none shadow-2xl active:scale-95 transition-all"
            >
              Juntar-se à Rede Voluntária
            </Button>
          </div>
        </div>
      </section>

      <section id="apoio" className="py-20 md:py-48 bg-[#08070b] text-white rounded-[2.5rem] md:rounded-[6rem] mx-4 my-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.4),transparent_70%)]" />
        <div className="container mx-auto max-w-4xl text-center space-y-12 relative z-10 px-6">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-8 animate-pulse">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">Mova o <br /><span className="text-primary italic font-medium lowercase">futuro.</span></h2>
          <p className="text-white/40 text-sm md:text-xl font-medium leading-relaxed">
            Manter um ecossistema digital exige investimento em servidores e segurança. Nossa meta é manter o UrbeLudo acessível para ONGs que atendem crianças carentes.
          </p>
          <div className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Apoio via PIX</p>
             <p className="text-2xl md:text-4xl font-black tracking-tighter text-white">{pixKey}</p>
             <Button 
              onClick={() => copyToClipboard(pixKey, "PIX")} 
              className="h-20 px-12 bg-primary text-white hover:bg-primary/90 rounded-full font-black uppercase tracking-widest text-[9px] border-none shadow-2xl"
            >
              Copiar Chave PIX
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-4xl space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Base de Conhecimento</span>
            <h2 className="font-headline text-xl md:text-6xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">Dúvidas <br /><span className="text-primary italic font-medium lowercase">técnicas.</span></h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-none bg-slate-50 rounded-2xl md:rounded-[2.5rem] px-8 md:px-12 shadow-sm border border-slate-100 overflow-hidden">
                <AccordionTrigger className="text-left font-black uppercase text-[10px] md:text-sm py-6 md:py-10 text-slate-950 hover:no-underline group">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-[11px] md:text-lg pb-8 md:pb-12 leading-relaxed border-l-4 border-primary/10 pl-6 md:pl-10 font-medium">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}
