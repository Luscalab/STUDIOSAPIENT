
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
    answer: "Os resultados variam conforme o serviço. Campanhas de anúncios podem gerar contatos em poucos dias, enquanto projetos de design e posicionamento de marca costumam amadurecer entre 3 a 6 meses de trabalho consistente."
  },
  {
    question: "A Sapient atende qualquer tipo de empresa?",
    answer: "Atendemos negócios de diversos tamanhos que buscam melhorar sua presença digital, desde profissionais liberais até empresas em expansão que valorizam um trabalho estratégico."
  },
  {
    question: "Como funciona a gestão de redes sociais?",
    answer: "Nosso foco é criar conteúdos que realmente conectem com o seu público, ajudando a transmitir credibilidade e a manter uma comunicação clara e constante com seus clientes."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-48 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl">
      <div className="container mx-auto px-6 max-w-[1400px] relative z-20">
        <div className="text-center mb-24">
          <h2 className="font-headline text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-black uppercase">
            DÚVIDAS <span className="text-primary italic font-medium">FREQUENTES.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-8">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-secondary/40 rounded-[3rem] px-12 py-8 shadow-xl border border-muted/5 transition-all duration-500 overflow-hidden"
            >
              <AccordionTrigger className="text-2xl md:text-4xl font-black tracking-tighter hover:no-underline text-left py-8 group text-black uppercase leading-[0.9] border-none">
                <div className="flex items-center gap-12">
                  <div className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center text-primary border border-muted shadow-lg group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-700">
                    <HelpCircle className="h-10 w-10" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg md:text-2xl text-black/40 leading-relaxed pb-12 font-medium tracking-tight px-12 border-l-8 border-primary/10 ml-10 mt-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
