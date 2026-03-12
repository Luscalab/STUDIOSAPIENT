
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
  Stethoscope,
  Quote,
  Layers,
  Fingerprint,
  Gamepad2,
  HeartPulse,
  MessageSquare,
  Move,
  Mail
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
      q: "01. O UrbeLudo é indicado para quais perfis dentro da neurodiversidade?",
      a: "Acreditamos que cada cérebro processa o mundo de uma forma única. Por isso, o UrbeLudo foi desenhado para abraçar a pluralidade: desde crianças no Espectro Autista (TEA), que buscam previsibilidade e estímulos sensoriais organizados, até perfis com TDAH, que se beneficiam de mecânicas de foco e recompensa. Também atuamos com foco em Dispraxia, Síndrome de Down e atrasos globais do desenvolvimento, onde a organização do movimento e a consciência corporal são as chaves para a autonomia."
    },
    {
      q: "02. Como uma tela digital consegue estimular o movimento físico e corporal?",
      a: "Este é o nosso maior diferencial. Não usamos a tecnologia para o entretenimento passivo, mas como um catalisador da ação. Através de conceitos da Psicomotricidade, as atividades no app exigem planejamento motor (praxia), coordenação visomotora e ritmo. A tela funciona como um espelho interativo: a criança projeta sua intenção no digital e executa o movimento no mundo real, fortalecendo seu esquema corporal e sua imagem de si mesma."
    },
    {
      q: "03. O que torna o sistema SPSP \"Preditivo\" e não apenas um banco de dados?",
      a: "Diferente de apps que apenas registram se a tarefa foi feita, o SPSP (Sistema Preditivo de Suporte Psicomotor) analisa a qualidade da interação. Ele observa latências de resposta, padrões de toque e precisão fonológica ao longo do tempo. Com isso, o sistema consegue identificar uma tendência de estagnação ou um salto de evolução antes mesmo da próxima sessão clínica, enviando um insight ao terapeuta para que ele possa ajustar a conduta de forma antecipada e personalizada."
    },
    {
      q: "04. Existe um risco de aumentar o \"tempo de tela\" prejudicial da criança?",
      a: "Nossa filosofia separa o \"tempo de tela passivo\" (consumo de vídeos) do \"tempo de tela ativo/terapêutico\". No UrbeLudo, a criança é a protagonista da ação. Cada minuto de interação é desenhado para gerar estímulo cognitivo e motor. Além disso, incentivamos que o uso seja um momento de conexão entre pais e filhos ou terapeuta e paciente, transformando o dispositivo em uma ferramenta de mediação social, e não de isolamento."
    },
    {
      q: "05. Como o UrbeLudo auxilia especificamente na jornada do terapeuta?",
      a: "O terapeuta muitas vezes trabalha no escuro sobre o que acontece nos seis dias da semana em que o paciente não está na clínica. O UrbeLudo ilumina esse intervalo. Ao acessar o dashboard, o profissional visualiza dados estruturados que confirmam se as metas de fala, coordenação ou atenção estão sendo atingidas no ambiente domiciliar. Isso reduz o tempo de \"investigação\" no início da sessão e permite focar no que realmente importa: a intervenção direta."
    },
    {
      q: "06. O app pode ser utilizado em contextos de inclusão escolar?",
      a: "Com certeza. O UrbeLudo é uma ferramenta poderosa para o ambiente escolar, auxiliando mediadores e professores no suporte a alunos neurodivergentes. Ele pode ser usado para trabalhar funções executivas e organização espacial dentro da rotina pedagógica, servindo como um elo de comunicação entre a escola, a família e a equipe de saúde que acompanha a criança."
    },
    {
      q: "07. Como o foco na ludicidade ajuda em casos de resistência terapêutica?",
      a: "Muitas crianças chegam à reabilitação exaustas por rotinas rígidas. O \"Ludo\" em nosso nome é o antídoto para isso. Ao entrar em uma narrativa de jogo, a criança baixa suas defesas e se permite errar e tentar de novo sem a pressão do \"ambiente médico\". O prazer do jogo libera neurotransmissores que facilitam a neuroplasticidade, tornando o aprendizado do movimento algo orgânico e desejado pelo paciente."
    },
    {
      q: "08. De que forma o projeto garante a segurança e privacidade de dados sensíveis?",
      a: "Tratamos dados de saúde com o rigor máximo exigido pela LGPD (Lei Geral de Proteção de Dados). Todas as interações são criptografadas e os relatórios de desempenho são de acesso exclusivo dos responsáveis legais e dos profissionais de saúde autorizados. No UrbeLudo, a privacidade é um pilar da ética clínica, e não apenas uma conformidade técnica."
    },
    {
      q: "09. O que significa o modelo de colaboração Pro Bono e impacto social do projeto?",
      a: "O UrbeLudo nasceu da vontade de democratizar a tecnologia assistiva de ponta. Por isso, mantemos uma rede de especialistas que doam sua expertise para que o sistema evolua constantemente. Esse modelo nos permite oferecer o ecossistema gratuitamente para ONGs e famílias em situação de vulnerabilidade, garantindo que o CEP ou a condição financeira não sejam barreiras para o desenvolvimento de uma criança."
    },
    {
      q: "10. Como o UrbeLudo se adapta a diferentes necessidades sensoriais?",
      a: "Sabemos que o que estimula uma criança pode sobrecarregar outra. Por isso, a interface do UrbeLudo é pensada para ser sensorialmente amigável. O terapeuta ou responsável pode ajustar níveis de estímulo visual e auditivo, garantindo que o ambiente digital seja seguro e confortável tanto para crianças com hipersensibilidade quanto para aquelas que buscam maior intensidade de estímulo."
    }
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary/20 selection:text-primary pb-32 overflow-x-hidden">
      
      <Navbar />

      {/* 01. Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-64 md:pb-48 px-6 text-center hero-purple-mesh bg-[#08070b]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-8 py-2 text-[9px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">
                Biociência & Conexão
              </Badge>
              <Badge variant="outline" className="border-cyan-400 text-cyan-400 px-4 py-2 text-[8px] font-black uppercase tracking-[0.3em] rounded-full animate-pulse">
                Em Breve
              </Badge>
            </div>
            <h1 className="font-headline text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              UrbeLudo: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary italic font-medium lowercase">desenvolvimento neuropsicomotor.</span>
            </h1>
            <p className="text-sm md:text-xl text-white/40 font-medium leading-relaxed max-w-xl">
              Um ecossistema digital (iOS, Android e Web) desenhado para apoiar o desenvolvimento de crianças e jovens, respeitando a singularidade de cada cérebro. Unimos o rigor clínico ao engajamento lúdico.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => scrollToSection('essencia')} className="h-14 px-8 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[9px] border-none shadow-2xl shadow-primary/30">
                Conhecer Projeto
              </Button>
            </div>
          </div>
          
          <div className="relative h-[300px] md:h-[600px] w-full flex items-center justify-center">
            {urbeludoMainImage && (
              <Image 
                src={urbeludoMainImage} 
                alt="Interface UrbeLudo Official" 
                fill 
                className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                data-ai-hint="app interface"
                priority
              />
            )}
          </div>
        </div>
      </section>

      {/* 02. Nossa Essência */}
      <section id="essencia" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3 relative aspect-square w-full max-w-[400px]">
            <Image 
              src={PlaceHolderImages.find(img => img.id === "team-lucas")?.imageUrl || "https://picsum.photos/seed/lucas/600/600"} 
              alt="Lucas Souza" 
              fill 
              className="object-cover rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="lg:w-2/3 space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Da Estratégia ao Cuidado</span>
            </div>
            <h2 className="font-headline text-2xl md:text-5xl font-black tracking-tighter leading-none text-slate-950 uppercase">Nossa <br/><span className="text-primary italic font-medium lowercase">essência.</span></h2>
            <div className="relative">
              <Quote className="absolute -top-6 -left-8 h-12 w-12 text-slate-100 -z-10" />
              <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed italic">
                "Eu sou o Lucas Souza. Minha base no design estratégico me ensinou que soluções reais nascem da empatia. Ao entrar na Psicomotricidade, entendi que a reabilitação precisa sair do consultório e ganhar a vida real. O UrbeLudo nasceu dessa fusão: usar a tecnologia para criar uma ponte entre o terapeuta, a família e a criança."
              </p>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Lucas Souza — Fundador & Designer Estratégico</p>
          </div>
        </div>
      </section>

      {/* 03. A Filosofia UrbeLudo */}
      <section id="filosofia" className="py-20 md:py-48 bg-slate-50 text-slate-950 rounded-[2.5rem] md:rounded-[6rem] mx-4 relative z-20 shadow-2xl px-6 border border-slate-100 overflow-hidden">
        <div className="container mx-auto max-w-5xl space-y-20">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Pilar do Projeto</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">Filosofia <br /><span className="text-primary italic font-medium lowercase">urbeludo.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-slate-100 space-y-6 group hover:border-primary/20 transition-all duration-700 shadow-sm">
               <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                 <Box className="h-8 w-8" />
               </div>
               <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">URBE (Estrutura)</h3>
               <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">Entendemos o corpo como o nosso primeiro território, a nossa \"cidade interna\". Organizar a Urbe é ajudar a criança a mapear seu esquema corporal e se sentir segura em seu espaço.</p>
            </div>
            
            <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-slate-100 space-y-6 group hover:border-primary/20 transition-all duration-700 shadow-sm">
               <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                 <Smile className="h-8 w-8" />
               </div>
               <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">LUDO (Fluidez)</h3>
               <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">O jogo é a linguagem universal do aprendizado. Através do lúdico, acessamos motivações profundas, facilitando a superação de barreiras motoras e cognitivas de forma natural.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Base Teórica */}
      <section id="ciencia" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
             <div className="lg:w-1/2 space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Rigor Clínico</span>
                <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">Rigor que nos <br /><span className="text-primary italic font-medium lowercase">sustenta.</span></h2>
                <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed">Nosso desenvolvimento é pautado por conceitos científicos que respeitam a neurodiversidade e garantem ganhos terapêuticos sólidos.</p>
             </div>
             
             <div className="lg:w-1/2 space-y-6">
                {[
                  { title: "Integração Sensorial", desc: "Estímulos desenhados para acolher hipersensibilidades e organizar o processamento sensorial.", icon: <Fingerprint className="h-5 w-5" /> },
                  { title: "Funções Executivas", desc: "Atividades que treinam o foco, a memória de trabalho e o controle inibitório (essencial para TDAH e perfis similares).", icon: <Brain className="h-5 w-5" /> },
                  { title: "Praxia e Coordenação", desc: "Foco na organização do movimento complexo, auxiliando na autonomia de tarefas diárias.", icon: <Zap className="h-5 w-5" /> },
                  { title: "Neuroplasticidade Motivada", desc: "O prazer no jogo libera neurotransmissores que facilitam a criação de novas rotas neurais.", icon: <Sparkles className="h-5 w-5" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 p-8 rounded-[2rem] bg-slate-50 border border-slate-200 group hover:shadow-lg transition-all">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
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

      {/* 05. SPSP */}
      <section id="spsp" className="py-20 md:py-48 bg-slate-950 text-white px-6 rounded-[3rem] md:rounded-[6rem] mx-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:flex-row lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="relative p-10 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 space-y-10 shadow-2xl">
             <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white">
               <Cpu className="h-8 w-8" />
             </div>
             <div className="space-y-4">
               <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Motor <br />SPSP.</h3>
               <p className="text-white/40 text-sm md:text-lg font-medium leading-relaxed">Enquanto a criança interage, o Sistema Preditivo de Suporte Psicomotor observa padrões individuais de evolução.</p>
             </div>
             <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <p className="text-2xl font-black text-primary">Foco Individual</p>
                  <p className="text-[9px] text-white/30 uppercase font-black">Comparação com o próprio histórico</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-cyan-400">Insights Clínicos</p>
                  <p className="text-[9px] text-white/30 uppercase font-black">Ajustes preditivos na conduta</p>
                </div>
             </div>
          </div>
          
          <div className="space-y-10 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Cérebro Analítico</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-white">Inteligência ao <br /><span className="text-primary italic font-medium lowercase">terapeuta.</span></h2>
            <p className="text-white/40 text-sm md:text-lg font-medium leading-relaxed">
              O SPSP gera relatórios detalhados para o profissional de saúde, permitindo ajustes preditivos na conduta terapêutica com base em dados reais coletados diretamente do ambiente domiciliar.
            </p>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
               <Activity className="h-6 w-6 text-primary" />
               <p className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest italic">A serviço da evolução humana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Trilhas de Desenvolvimento */}
      <section id="frentes" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Trilhas Clínicas</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">Frentes de <br /><span className="text-primary italic font-medium lowercase">cuidado.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: "Fonoaudiologia", desc: "Incentivo à intenção comunicativa, articulação sonora e linguagem expressiva através de interações que reagem à voz.", icon: <Mic className="h-10 w-10" /> },
              { title: "Terapia Ocupacional", desc: "Atividades focadas na autonomia funcional, atenção visual e planejamento motor fino.", icon: <MousePointer2 className="h-10 w-10" /> },
              { title: "Reabilitação Motora", desc: "Foco no equilíbrio, consciência corporal global, tônus e ritmo.", icon: <Stethoscope className="h-10 w-10" /> }
            ].map((frente, idx) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 space-y-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full text-left">
                <div className="h-20 w-20 rounded-3xl bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
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

      {/* 07. FAQ */}
      <section id="faq" className="py-20 md:py-48 bg-slate-50 px-6 rounded-[3rem] md:rounded-[6rem] mx-4 border border-slate-100">
        <div className="container mx-auto max-w-4xl space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Conhecimento Compartilhado</span>
            <h2 className="font-headline text-2xl md:text-6xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">FAQ <br /><span className="text-primary italic font-medium lowercase">ecossistema.</span></h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-none bg-white rounded-2xl md:rounded-[2.5rem] px-8 md:px-12 shadow-sm border border-slate-100 overflow-hidden">
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

      {/* 08. Ecossistema de Colaboração (Pro Bono) */}
      <section id="colaboradores" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-24">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Propósito em Rede</span>
              <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">Ecossistema de <br /><span className="text-primary italic font-medium lowercase">colaboração.</span></h2>
            </div>
            <div className="max-w-md space-y-6">
              <p className="text-slate-400 text-lg md:text-2xl font-medium leading-tight tracking-tight">
                O UrbeLudo está em fase final de desenvolvimento. Para que este ecossistema chegue às famílias e clínicas o quanto antes, buscamos profissionais dispostos a contribuir com sua expertise.
              </p>
              <a 
                href={`mailto:${contactEmail}?subject=Colaboração UrbeLudo`}
                className="inline-flex items-center gap-4 px-10 py-6 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all"
              >
                <Mail className="h-4 w-4" /> Seja um Colaborador
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Desenvolvimento de Jogos", 
                desc: "Programadores e designers que transformam mecânicas terapêuticas em experiências imersivas.",
                icon: <Gamepad2 className="h-6 w-6" />
              },
              { 
                title: "Psicologia & Neurociência", 
                desc: "Especialistas que garantem o suporte emocional e a validação dos processos cognitivos.",
                icon: <HeartPulse className="h-6 w-6" />
              },
              { 
                title: "Fonoaudiologia", 
                desc: "Profissionais focados na comunicação, voz e linguagem dentro do ambiente digital.",
                icon: <MessageSquare className="h-6 w-6" />
              },
              { 
                title: "Psicomotricidade", 
                desc: "A base do nosso projeto, orientando cada movimento e interação para o ganho real.",
                icon: <Move className="h-6 w-6" />
              }
            ].map((colab, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6 group hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  {colab.icon}
                </div>
                <div className="space-y-3 flex-1">
                  <h4 className="font-black text-lg uppercase tracking-tighter text-slate-950 leading-none">{colab.title}</h4>
                  <p className="text-slate-500 text-[11px] md:text-sm font-medium leading-relaxed">{colab.desc}</p>
                </div>
                <div className="pt-4">
                  <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest">Colaborador Pro Bono</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09. Apoio Social */}
      <section id="apoio" className="py-20 md:py-48 bg-[#08070b] text-white rounded-[2.5rem] md:rounded-[6rem] mx-4 my-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.4),transparent_70%)]" />
        <div className="container mx-auto max-w-4xl text-center space-y-12 relative z-10 px-6">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-8 animate-pulse">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">Mova o <br /><span className="text-primary italic font-medium lowercase">futuro.</span></h2>
          <p className="text-white/40 text-sm md:text-xl font-medium leading-relaxed">
            Oferecemos versões gratuitas para ONGs e famílias de baixa renda através do nosso fundo de apoio. Sua contribuição mantém o UrbeLudo acessível.
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

      <Footer />
      <AIChat />
    </main>
  );
}
