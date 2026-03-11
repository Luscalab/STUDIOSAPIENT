
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
    answer: "Existem três caminhos: como investidor estratégico para escala global, através de doações diretas via PIX para manter o projeto em ONGs, ou como colaborador especialista nas áreas de saúde e tecnologia que deseje atuar pro bono (sem custos)."
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
    <section id="faq" className="py-10 md:py-24 bg-white text-black relative overflow-hidden rounded-[2rem] md:rounded-[5rem] mx-4 my-6 shadow-lg">
      <div className="container mx-auto px-6 max-w-[900px] relative z-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-headline text-lg md:text-5xl font-black tracking-tighter leading-none text-black uppercase">
            DÚVIDAS <span className="text-primary italic font-medium">FREQUENTES.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-1.5 md:space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border-none bg-secondary/10 rounded-[1.2rem] md:rounded-[2rem] px-4 md:px-6 py-0.5 md:py-3 shadow-sm border border-muted/5 transition-all duration-500 overflow-hidden"
            >
              <AccordionTrigger className="text-[10px] md:text-xl font-black tracking-tighter hover:no-underline text-left py-3 md:py-4 group text-black uppercase leading-tight border-none">
                <div className="flex items-center gap-3 md:gap-5">
                  <div className="h-8 w-8 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-white flex items-center justify-center text-primary border border-muted shadow-sm group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-700 shrink-0">
                    <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[9px] md:text-base text-black/50 leading-relaxed pb-4 md:pb-6 font-medium tracking-tight px-4 md:px-6 border-l md:border-l-4 border-primary/10 ml-4 md:ml-6 mt-0.5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
