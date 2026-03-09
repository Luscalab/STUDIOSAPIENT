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
    answer: "Tráfego pago pode gerar leads em dias. Reposicionamento de marca e autoridade visual consolida-se entre 3 a 6 meses de execução estratégica e consistente."
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
    <section id="faq" className="py-48 md:py-80 bg-white text-black relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-6 my-12 shadow-2xl">
      <div className="container mx-auto px-6 max-w-[1400px] relative z-20">
        <div className="text-center mb-64">
          <h2 className="font-headline text-6xl md:text-[9.5rem] font-black tracking-tighter leading-[0.8] text-black uppercase mb-16">
            DÚVIDAS <span className="text-primary italic font-medium">FREQUENTES.</span>
          </h2>
          <p className="text-black/30 text-2xl md:text-5xl font-medium tracking-tight max-w-5xl mx-auto leading-tight">
            Respostas para quem busca clareza técnica e autoridade absoluta no digital.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-16">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-secondary/50 rounded-[5rem] px-20 py-16 shadow-2xl border border-muted/10 hover:border-primary/20 transition-all duration-1000 overflow-hidden"
            >
              <AccordionTrigger className="text-4xl md:text-6xl font-black tracking-tighter hover:no-underline text-left py-12 group text-black uppercase leading-[0.9] border-none">
                <div className="flex items-center gap-16">
                  <div className="h-32 w-32 rounded-[3rem] bg-white flex items-center justify-center text-primary border border-muted shadow-xl group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-1000">
                    <HelpCircle className="h-16 w-16" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-2xl md:text-4xl text-black/40 leading-relaxed pb-24 font-medium tracking-tight px-24 border-l-[12px] border-primary/10 ml-16 mt-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}