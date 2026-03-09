
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Sparkles, Plus } from "lucide-react";

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
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Background Sophistication */}
      <div className="absolute top-0 left-0 w-full h-full soft-gradient-bg opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-24">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
            Esclarecimento Estratégico
          </Badge>
          <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            Dúvidas <br /><span className="text-primary italic opacity-90">Frequentes.</span>
          </h2>
          <p className="text-muted-foreground/60 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
            Transparência absoluta sobre nossa metodologia e processos de engenharia visual.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-white/50 backdrop-blur-xl rounded-[2.5rem] px-8 md:px-12 py-2 shadow-sm border border-primary/5 hover:border-primary/20 data-[state=open]:bg-primary/5 data-[state=open]:border-primary/20 transition-all duration-700 overflow-hidden"
            >
              <AccordionTrigger className="text-xl md:text-2xl font-black tracking-tighter hover:no-underline text-left py-8 group">
                <div className="flex items-center gap-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed pb-10 font-medium tracking-tight">
                <div className="pl-16 relative">
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/20" />
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Floating Decoration */}
        <div className="absolute -bottom-20 -right-20 p-24 opacity-[0.03] text-primary pointer-events-none">
          <Sparkles className="h-96 w-96" />
        </div>
      </div>
    </section>
  );
}
