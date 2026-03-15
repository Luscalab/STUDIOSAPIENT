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
  Mail,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";

export function UrbeLudoClient() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const urbeludoMainData = PlaceHolderImages.find(img => img.id === "urbeludo-main");
  const lucasData = PlaceHolderImages.find(img => img.id === "team-lucas");

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
    { q: "01. " + t('urbeludo.hero.cta_faq') + " - Perfis", a: "Acreditamos que cada cérebro processa o mundo de uma forma única. Por isso, o UrbeLudo foi desenhado para abraçar a pluralidade: desde crianças no Espectro Autista (TEA), até perfis com TDAH e neurodiversidade em geral." },
    { q: "02. Estimulação Motora", a: "A tela funciona como um espelho interativo: a criança projeta sua intenção no digital e executa o movimento no mundo real, fortalecendo seu esquema corporal." },
    { q: "03. Sistema SPSP Preditivo", a: "O SPSP analisa latências de resposta, padrões de toque e precisão fonológica ao longo do tempo para gerar insights antecipados ao terapeuta." },
    { q: "04. Tempo de Tela", a: "Diferenciamos o consumo passivo do ativo. No UrbeLudo, o tempo de tela é terapêutico, focado em estímulo cognitivo e motor mediado por profissionais ou família." },
    { q: "05. Apoio ao Terapeuta", a: "O UrbeLudo ilumina o intervalo entre as sessões clínicas, fornecendo dados estruturados sobre o desempenho domiciliar do paciente." },
    { q: "06. Inclusão Escolar", a: "É uma ferramenta poderosa para mediadores escolares, auxiliando no suporte a funções executivas dentro da rotina pedagógica." },
    { q: "07. Resistência Terapêutica", a: "O 'Ludo' baixa as defesas da criança através da diversão, facilitando a neuroplasticidade de forma orgânica e prazerosa." },
    { q: "08. Segurança de Dados", a: "Tratamos dados de saúde com o rigor máximo exigido pela LGPD, com criptografia de ponta a ponta e acesso restrito." },
    { q: "09. Modelo Pro Bono", a: "Nascemos para democratizar a tecnologia assistiva, oferecendo o ecossistema gratuitamente para ONGs e famílias em vulnerabilidade." },
    { q: "10. Adaptação Sensorial", a: "A interface permite ajustar níveis de estímulo visual e auditivo para acolher hipersensibilidades individuais." }
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
                {t('urbeludo.hero.badge')}
              </Badge>
              <Badge variant="outline" className="border-cyan-400 text-cyan-400 px-4 py-2 text-[8px] font-black uppercase tracking-[0.3em] rounded-full animate-pulse">
                {t('urbeludo.hero.soon')}
              </Badge>
            </div>
            <h1 className="font-headline text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              {t('urbeludo.hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary italic font-medium lowercase">{t('urbeludo.hero.title_italic')}</span>
            </h1>
            <p className="text-sm md:text-xl text-white/40 font-medium leading-relaxed max-w-xl">
              {t('urbeludo.hero.desc')}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollToSection('essencia')} className="h-14 px-8 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[9px] border-none shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                {t('urbeludo.hero.cta_project')}
              </Button>
              <Button onClick={() => scrollToSection('ciencia')} variant="outline" className="h-14 px-8 border-white/10 text-white hover:bg-white/5 rounded-full font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all">
                <Brain className="h-4 w-4 mr-2 text-primary" /> {t('urbeludo.hero.cta_science')}
              </Button>
              <Button onClick={() => scrollToSection('colaboradores')} variant="outline" className="h-14 px-8 border-white/10 text-white hover:bg-white/5 rounded-full font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all">
                <Users className="h-4 w-4 mr-2 text-primary" /> {t('urbeludo.hero.cta_colab')}
              </Button>
              <Button onClick={() => scrollToSection('apoio')} variant="outline" className="h-14 px-8 border-white/10 text-white hover:bg-white/5 rounded-full font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all">
                <Heart className="h-4 w-4 mr-2 text-primary" /> {t('urbeludo.hero.cta_support')}
              </Button>
              <Button onClick={() => scrollToSection('faq')} variant="outline" className="h-14 px-8 border-white/10 text-white hover:bg-white/5 rounded-full font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all">
                <HelpCircle className="h-4 w-4 mr-2 text-primary" /> {t('urbeludo.hero.cta_faq')}
              </Button>
            </div>
          </div>
          
          <div className="relative h-[300px] md:h-[600px] w-full flex items-center justify-center">
            {urbeludoMainData && (
              <Image 
                src={urbeludoMainData.imageUrl} 
                alt={urbeludoMainData.description} 
                fill 
                className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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
              src={lucasData?.imageUrl || ""} 
              alt={lucasData?.description || "Founder"} 
              fill 
              className="object-cover rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="lg:w-2/3 space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{t('urbeludo.essence.badge')}</span>
            </div>
            <h2 className="font-headline text-2xl md:text-5xl font-black tracking-tighter leading-none text-slate-950 uppercase">{t('urbeludo.essence.title')} <br/><span className="text-primary italic font-medium lowercase">{t('urbeludo.essence.title_italic')}</span></h2>
            <div className="relative">
              <Quote className="absolute -top-6 -left-8 h-12 w-12 text-slate-100 -z-10" />
              <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed italic">
                "{t('urbeludo.essence.quote')}"
              </p>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t('urbeludo.essence.founder')}</p>
          </div>
        </div>
      </section>

      {/* 03. A Filosofia UrbeLudo */}
      <section id="filosofia" className="py-20 md:py-48 bg-slate-50 text-slate-950 rounded-[2.5rem] md:rounded-[6rem] mx-4 relative z-20 shadow-2xl px-6 border border-slate-100 overflow-hidden">
        <div className="container mx-auto max-w-5xl space-y-20">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{t('urbeludo.philosophy.badge')}</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">{t('urbeludo.philosophy.title')} <br /><span className="text-primary italic font-medium lowercase">{t('urbeludo.philosophy.title_italic')}</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-slate-100 space-y-6 group hover:border-primary/20 transition-all duration-700 shadow-sm">
               <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                 <Box className="h-8 w-8" />
               </div>
               <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{t('urbeludo.philosophy.urbe_title')}</h3>
               <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">{t('urbeludo.philosophy.urbe_desc')}</p>
            </div>
            
            <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-slate-100 space-y-6 group hover:border-primary/20 transition-all duration-700 shadow-sm">
               <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                 <Smile className="h-8 w-8" />
               </div>
               <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{t('urbeludo.philosophy.ludo_title')}</h3>
               <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">{t('urbeludo.philosophy.ludo_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Base Teórica */}
      <section id="ciencia" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
             <div className="lg:w-1/2 space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{t('urbeludo.science.badge')}</span>
                <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">{t('urbeludo.science.title')} <br /><span className="text-primary italic font-medium lowercase">{t('urbeludo.science.title_italic')}</span></h2>
                <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed">{t('urbeludo.science.desc')}</p>
             </div>
             
             <div className="lg:w-1/2 space-y-6">
                {[
                  { title: t('urbeludo.science.item1_title'), desc: t('urbeludo.science.item1_desc'), icon: <Fingerprint className="h-5 w-5" /> },
                  { title: t('urbeludo.science.item2_title'), desc: t('urbeludo.science.item2_desc'), icon: <Brain className="h-5 w-5" /> },
                  { title: t('urbeludo.science.item3_title'), desc: t('urbeludo.science.item3_desc'), icon: <Zap className="h-5 w-5" /> },
                  { title: t('urbeludo.science.item4_title'), desc: t('urbeludo.science.item4_desc'), icon: <Sparkles className="h-5 w-5" /> }
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
               <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{t('urbeludo.spsp.card_title')}</h3>
               <p className="text-white/40 text-sm md:text-lg font-medium leading-relaxed">{t('urbeludo.spsp.card_desc')}</p>
             </div>
             <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <p className="text-2xl font-black text-primary">{t('urbeludo.spsp.card_feat1')}</p>
                  <p className="text-[9px] text-white/30 uppercase font-black">{t('urbeludo.spsp.card_feat1_sub')}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-cyan-400">{t('urbeludo.spsp.card_feat2')}</p>
                  <p className="text-[9px] text-white/30 uppercase font-black">{t('urbeludo.spsp.card_feat2_sub')}</p>
                </div>
             </div>
          </div>
          
          <div className="space-y-10 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{t('urbeludo.spsp.badge')}</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-white">{t('urbeludo.spsp.title')} <br /><span className="text-primary italic font-medium lowercase">{t('urbeludo.spsp.title_italic')}</span></h2>
            <p className="text-white/40 text-sm md:text-lg font-medium leading-relaxed">
              {t('urbeludo.spsp.desc')}
            </p>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
               <Activity className="h-6 w-6 text-primary" />
               <p className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest italic">{t('urbeludo.spsp.motto')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Trilhas de Desenvolvimento */}
      <section id="frentes" className="py-20 md:py-48 bg-white px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{t('urbeludo.frentes.badge')}</span>
            <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">{t('urbeludo.frentes.title')} <br /><span className="text-primary italic font-medium lowercase">{t('urbeludo.frentes.title_italic')}</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: t('urbeludo.frentes.fono_title'), desc: t('urbeludo.frentes.fono_desc'), icon: <Mic className="h-10 w-10" /> },
              { title: t('urbeludo.frentes.to_title'), desc: t('urbeludo.frentes.to_desc'), icon: <MousePointer2 className="h-10 w-10" /> },
              { title: t('urbeludo.frentes.reab_title'), desc: t('urbeludo.frentes.reab_desc'), icon: <Stethoscope className="h-10 w-10" /> }
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
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{t('faq.badge')}</span>
            <h2 className="font-headline text-2xl md:text-6xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">FAQ <br /><span className="text-primary italic font-medium lowercase">{t('urbeludo.hero.cta_faq')}</span></h2>
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
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{t('urbeludo.colab.badge')}</span>
              <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-slate-950">{t('urbeludo.colab.title')} <br /><span className="text-primary italic font-medium lowercase">{t('urbeludo.colab.title_italic')}</span></h2>
            </div>
            <div className="max-w-md space-y-6">
              <p className="text-slate-400 text-lg md:text-2xl font-medium leading-tight tracking-tight">
                {t('urbeludo.colab.desc')}
              </p>
              <a 
                href={`mailto:${contactEmail}?subject=Colaboração UrbeLudo`}
                className="inline-flex items-center gap-4 px-10 py-6 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all"
              >
                <Mail className="h-4 w-4" /> {t('urbeludo.colab.btn')}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('urbeludo.colab.role1'), desc: t('urbeludo.colab.role1_desc'), icon: <Gamepad2 className="h-6 w-6" /> },
              { title: t('urbeludo.colab.role2'), desc: t('urbeludo.colab.role2_desc'), icon: <HeartPulse className="h-6 w-6" /> },
              { title: t('urbeludo.colab.role3'), desc: t('urbeludo.colab.role3_desc'), icon: <MessageSquare className="h-6 w-6" /> },
              { title: t('urbeludo.colab.role4'), desc: t('urbeludo.colab.role4_desc'), icon: <Move className="h-6 w-6" /> }
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
                  <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest">{t('urbeludo.colab.badge_tag')}</Badge>
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
          <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">{t('urbeludo.support.title')} <br /><span className="text-primary italic font-medium lowercase">{t('urbeludo.support.title_italic')}</span></h2>
          <p className="text-white/40 text-sm md:text-xl font-medium leading-relaxed">
            {t('urbeludo.support.desc')}
          </p>
          <div className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{t('urbeludo.support.pix_label')}</p>
             <p className="text-2xl md:text-4xl font-black tracking-tighter text-white">{pixKey}</p>
             <Button 
              onClick={() => copyToClipboard(pixKey, "PIX")} 
              className="h-20 px-12 bg-primary text-white hover:bg-primary/90 rounded-full font-black uppercase tracking-widest text-[9px] border-none shadow-2xl"
            >
              {t('urbeludo.support.pix_btn')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </main>
  );
}