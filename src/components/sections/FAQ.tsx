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
    answer: "Tráfego pago pode gerar leads em dias. Reposicionamento de marca e autoridade visual consolida-se entre 3 a 6 meses de execução consistente e estratégica."
  },
  {
    question: "A Sapient atende qualquer tipo de empresa?",
    answer: "Atendemos negócios que buscam elevar seu patamar de profissionalismo, desde profissionais liberais na saúde e direito até empresas em expansão nacional."
  },
  {
    question: "Como funciona a gestão de redes sociais?",
    answer: "É uma curadoria de autoridade absoluta. Criamos narrativas e visuais desenhados para quebrar objeções e posicionar você como a primeira escolha óbvia."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-32 md:py-64 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <div className="text-center mb-48 space-y-16">
          <h2 className="font-headline text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-black uppercase">
            DÚVIDAS <span className="text-primary italic">FREQUENTES.</span>
          </h2>
          <p className="text-black/40 text-2xl md:text-4xl font-medium tracking-tight max-w-4xl mx-auto">
            Respostas para quem busca clareza técnica e autoridade absoluta.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-12">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-secondary/60 rounded-[4rem] px-16 py-12 shadow-2xl border border-muted/20 hover:border-primary/20 transition-all duration-1000 overflow-hidden"
            >
              <AccordionTrigger className="text-3xl md:text-5xl font-black tracking-tighter hover:no-underline text-left py-12 group text-black uppercase leading-tight border-none">
                <div className="flex items-center gap-12">
                  <div className="h-24 w-24 rounded-[2.5rem] bg-white flex items-center justify-center text-primary border border-muted shadow-sm group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-1000">
                    <HelpCircle className="h-12 w-12" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-2xl md:text-3xl text-black/50 leading-relaxed pb-20 font-medium tracking-tight px-16 border-l-[8px] border-primary/20 ml-12">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
