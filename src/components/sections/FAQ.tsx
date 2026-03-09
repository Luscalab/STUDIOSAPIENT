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
    <section id="faq" className="py-48 md:py-80 bg-[#09080f] relative overflow-hidden section-flow-top section-flow-bottom">
      <div className="absolute top-0 left-0 w-full h-full hero-purple-mesh opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-[100rem] relative z-10">
        <div className="text-center mb-48 space-y-16">
          <div className="flex items-center justify-center gap-10">
            <Zap className="h-10 w-10 text-primary animate-pulse" />
            <Badge className="bg-primary/10 text-primary border-primary/20 px-20 py-6 text-[12px] font-black uppercase tracking-[1.2em] rounded-full backdrop-blur-3xl font-display">
              Esclarecimento
            </Badge>
          </div>
          <h2 className="font-display text-7xl md:text-[12.5rem] font-black tracking-tighter mb-12 leading-[0.8] text-white uppercase">
            Dúvidas <br /><span className="text-primary italic opacity-90">Frequentes.</span>
          </h2>
          <p className="text-white/20 text-3xl md:text-5xl font-medium max-w-5xl mx-auto leading-tight tracking-tighter font-body">
            Transparência absoluta sobre nossa metodologia e processos de engenharia visual.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-16">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-white/5 backdrop-blur-[80px] rounded-[6rem] px-16 md:px-32 py-20 shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/5 hover:border-primary/40 data-[state=open]:bg-primary/15 data-[state=open]:border-primary/40 transition-all duration-1000 overflow-hidden"
            >
              <AccordionTrigger className="text-4xl md:text-6xl font-black tracking-tighter hover:no-underline text-left py-16 group text-white font-display uppercase leading-none border-none">
                <div className="flex items-center gap-20">
                  <div className="h-32 w-32 rounded-[3rem] bg-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/25">
                    <HelpCircle className="h-16 w-16" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-2xl md:text-5xl text-white/40 leading-relaxed pb-32 font-medium tracking-tight font-body">
                <div className="pl-48 relative">
                  <div className="absolute left-24 top-0 bottom-0 w-[3px] bg-primary/30 rounded-full" />
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="absolute -bottom-64 -right-64 p-64 opacity-[0.02] text-primary pointer-events-none">
          <Sparkles className="h-[80rem] w-[80rem]" />
        </div>
      </div>
    </section>
  );
}