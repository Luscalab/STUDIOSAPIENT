"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Sparkles, Zap } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Os resultados variam conforme o serviço. Estratégias de tráfego pago (Ads) podem gerar leads em poucos dias, enquanto o reposicionamento de marca e autoridade visual é um processo estratégico que se consolida entre 3 a 6 meses de execução consistente."
  },
  {
    question: "A Sapient atende qualquer tipo de empresa?",
    answer: "Focamos em negócios que buscam elevar seu patamar de profissionalismo e autoridade. Atendemos desde profissionais liberais (saúde, direito, estética) até empresas estabelecidas que precisam de clareza visual e eficiência em suas campanhas digitais."
  },
  {
    question: "Qual o investimento mínimo necessário?",
    answer: "Não trabalhamos com pacotes engessados. Cada projeto é um ecossistema único. Após o Diagnóstico Crítico inicial, apresentamos um plano de intervenção personalizado que se adeque aos seus objetivos de escala e orçamento."
  },
  {
    question: "Como funciona a gestão de redes sociais?",
    answer: "Nossa gestão é uma Curadoria de Autoridade. Esqueça postagens por obrigação. Criamos narrativas visuais e textos persuasivos (copywriting) desenhados para quebrar objeções de compra e posicionar você como a primeira escolha do seu cliente."
  },
  {
    question: "O que é o Diagnóstico Crítico?",
    answer: "É nossa fase de engenharia inicial. Auditamos sua marca, seus concorrentes e sua presença digital para identificar gargalos invisíveis que estão impedindo sua conversão e escala no digital."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-48 md:py-64 bg-[#0c0a1a] relative overflow-hidden section-flow-top section-flow-bottom">
      <div className="absolute top-0 left-0 w-full h-full hero-purple-mesh opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-48 space-y-12">
          <div className="flex items-center justify-center gap-6">
            <Zap className="h-6 w-6 text-primary animate-pulse" />
            <Badge className="bg-primary/10 text-primary border-primary/20 px-14 py-5 text-[10px] font-black uppercase tracking-[0.8em] rounded-full backdrop-blur-3xl font-display">
              Esclarecimento
            </Badge>
          </div>
          <h2 className="font-display text-6xl md:text-[9.5rem] font-black tracking-tighter mb-12 leading-[0.85] text-white">
            Dúvidas <br /><span className="text-primary italic opacity-90">Frequentes.</span>
          </h2>
          <p className="text-white/30 text-2xl md:text-4xl font-medium max-w-4xl mx-auto leading-tight tracking-tighter font-body">
            Transparência absoluta sobre nossa metodologia e processos de engenharia visual.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-10">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-white/5 backdrop-blur-[50px] rounded-[4.5rem] px-12 md:px-24 py-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 hover:border-primary/20 data-[state=open]:bg-primary/5 data-[state=open]:border-primary/20 transition-all duration-1000 overflow-hidden"
            >
              <AccordionTrigger className="text-3xl md:text-5xl font-black tracking-tighter hover:no-underline text-left py-12 group text-white font-display uppercase">
                <div className="flex items-center gap-12">
                  <div className="h-20 w-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/20">
                    <HelpCircle className="h-10 w-10" />
                  </div>
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-2xl md:text-3xl text-white/40 leading-relaxed pb-20 font-medium tracking-tight font-body">
                <div className="pl-32 relative">
                  <div className="absolute left-14 top-0 bottom-0 w-px bg-primary/30" />
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="absolute -bottom-40 -right-40 p-48 opacity-[0.05] text-primary pointer-events-none">
          <Sparkles className="h-[50rem] w-[50rem]" />
        </div>
      </div>
    </section>
  );
}