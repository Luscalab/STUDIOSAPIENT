"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Tráfego pago pode gerar leads em dias. Reposicionamento de marca e autoridade visual consolida-se entre 3 a 6 meses de execução consistente."
  },
  {
    question: "A Sapient atende qualquer tipo de empresa?",
    answer: "Atendemos negócios que buscam elevar seu patamar de profissionalismo, desde liberais na saúde e direito até empresas em expansão."
  },
  {
    question: "Como funciona a gestão de redes sociais?",
    answer: "É uma curadoria de autoridade. Criamos narrativas e visuais desenhados para quebrar objeções e posicionar você como a primeira escolha."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-48 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 max-w-4xl relative z-20">
        <div className="text-center mb-20 space-y-6">
          <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-none text-black uppercase">
            DÚVIDAS <span className="text-primary italic">FREQUENTES.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-secondary/30 rounded-[3rem] px-10 py-4 shadow-sm border border-muted hover:border-primary/20 transition-all duration-500 overflow-hidden"
            >
              <AccordionTrigger className="text-xl md:text-2xl font-black tracking-tighter hover:no-underline text-left py-6 group text-black uppercase leading-tight border-none">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-primary border border-muted shadow-sm">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-black/40 leading-relaxed pb-10 font-medium tracking-tight px-6 border-l-2 border-primary/20 ml-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}