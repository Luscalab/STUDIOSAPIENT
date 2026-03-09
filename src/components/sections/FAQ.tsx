"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Sparkles } from "lucide-react";

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
    <section id="faq" className="py-32 md:py-64 bg-[#0c0a1a] relative overflow-hidden">
      {/* Background Sophistication */}
      <div className="absolute top-0 left-0 w-full h-full hero-purple-mesh opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-40">
          <Badge className="mb-12 bg-primary/10 text-primary border-primary/20 px-12 py-5 text-[10px] font-black uppercase tracking-[0.6em] rounded-full backdrop-blur-3xl">
            Esclarecimento Estratégico
          </Badge>
          <h2 className="font-headline text-6xl md:text-[8.5rem] font-black tracking-tighter mb-12 leading-[0.85] text-white">
            Dúvidas <br /><span className="text-primary italic opacity-90">Frequentes.</span>
          </h2>
          <p className="text-white/40 text-2xl md:text-3xl font-medium max-w-3xl mx-auto leading-relaxed tracking-tight">
            Transparência absoluta sobre nossa metodologia e processos de engenharia visual.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-8">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-white/5 backdrop-blur-3xl rounded-[3.5rem] px-10 md:px-20 py-6 shadow-2xl border border-white/5 hover:border-primary/20 data-[state=open]:bg-primary/5 data-[state=open]:border-primary/20 transition-all duration-1000 overflow-hidden"
            >
              <AccordionTrigger className="text-2xl md:text-4xl font-black tracking-tighter hover:no-underline text-left py-10 group text-white">
                <div className="flex items-center gap-10">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/20">
                    <HelpCircle className="h-8 w-8" />
                  </div>
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-xl md:text-2xl text-white/40 leading-relaxed pb-16 font-medium tracking-tight">
                <div className="pl-24 relative">
                  <div className="absolute left-10 top-0 bottom-0 w-px bg-primary/30" />
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Floating Decoration */}
        <div className="absolute -bottom-20 -right-20 p-32 opacity-[0.05] text-primary pointer-events-none">
          <Sparkles className="h-[40rem] w-[40rem]" />
        </div>
      </div>
    </section>
  );
}