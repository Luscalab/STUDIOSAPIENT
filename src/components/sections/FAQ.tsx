
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
    question: "Como a IA é integrada ao meu negócio?",
    answer: "Utilizamos IA para criar ecossistemas de atendimento automatizado (WhatsApp e Web) que qualificam leads 24/7, além de aplicar inteligência de dados para otimizar a performance de anúncios em tempo real."
  },
  {
    question: "O que é o projeto UrbeLudo?",
    answer: "É a nossa iniciativa de impacto social e tecnológico. Uma plataforma de reabilitação neuro-motora que utiliza jogos imersivos e biofeedback para auxiliar em tratamentos clínicos de fonoaudiologia e fisioterapia."
  },
  {
    question: "Como posso apoiar ou investir no UrbeLudo?",
    answer: "Existem três caminhos: como investidor estratégico para escala global, através de doações diretas via PIX para manter o projeto em ONGs, ou como colaborador especialista nas áreas de saúde e tecnologia."
  },
  {
    question: "A Sapient atende qualquer tipo de empresa?",
    answer: "Focamos em negócios que buscam autoridade e diferenciação. Atendemos desde profissionais liberais de alto padrão (médicos, advogados) até empresas em expansão que valorizam design e estratégia."
  },
  {
    question: "Como funciona a gestão de redes sociais?",
    answer: "Não fazemos apenas 'postagens'. Criamos curadoria de conteúdo estratégica e narrativas visuais que educam seu cliente e posicionam sua marca como a escolha óbvia do mercado."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-32 bg-white text-black relative overflow-hidden rounded-[3rem] md:rounded-[6rem] mx-4 my-6 shadow-xl">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-20">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-black uppercase">
            DÚVIDAS <span className="text-primary italic font-medium">FREQUENTES.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-secondary/30 rounded-[2.5rem] px-8 py-4 shadow-md border border-muted/5 transition-all duration-500 overflow-hidden"
            >
              <AccordionTrigger className="text-lg md:text-2xl font-black tracking-tighter hover:no-underline text-left py-6 group text-black uppercase leading-tight border-none">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary border border-muted shadow-sm group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-700 shrink-0">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-black/50 leading-relaxed pb-8 font-medium tracking-tight px-6 border-l-4 border-primary/10 ml-7 mt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
