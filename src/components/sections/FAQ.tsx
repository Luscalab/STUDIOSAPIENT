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
    <section id="faq" className="py-32 md:py-48 hero-purple-mesh relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-20">
        <div className="text-center mb-20 space-y-6">
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-none text-white uppercase">
            Dúvidas <span className="text-primary italic">Frequentes.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-white/5 backdrop-blur-3xl rounded-[2.5rem] px-8 py-4 shadow-xl border border-white/5 data-[state=open]:bg-primary/10 transition-all duration-500 overflow-hidden"
            >
              <AccordionTrigger className="text-xl md:text-2xl font-black tracking-tighter hover:no-underline text-left py-6 group text-white uppercase leading-none border-none">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/25">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-white/40 leading-relaxed pb-10 font-medium tracking-tight px-6 border-l-2 border-primary/20 ml-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}