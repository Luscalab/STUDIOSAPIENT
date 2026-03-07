"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Trabalhamos com estratégias de curto, médio e longo prazo. Campanhas de performance podem gerar leads em dias, enquanto o reposicionamento de branding premium é um processo de construção de autoridade que se consolida ao longo de 3 a 6 meses."
  },
  {
    question: "A Sapient atende qualquer tipo de empresa?",
    answer: "Focamos em negócios ambiciosos que buscam se tornar líderes em seus nichos. Atendemos desde startups de tecnologia até marcas de luxo tradicionais, desde que haja o desejo de elevar o padrão criativo e comercial."
  },
  {
    question: "Qual o investimento mínimo necessário?",
    answer: "Nossos projetos são personalizados. Iniciamos com uma consultoria gratuita para entender sua escala e objetivos, desenhando uma proposta que faça sentido para o seu momento atual de faturamento e ambição."
  },
  {
    question: "Vocês cuidam apenas do design ou também das vendas?",
    answer: "A Sapient Studio une o Design Estratégico (estética) com a Gestão de Performance (vendas). Entendemos que uma marca bonita sem vendas é apenas arte, e vendas sem marca é apenas commodity. Unimos os dois."
  }
];

export function FAQ() {
  return (
    <section className="section-spacing bg-secondary/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Dúvidas Frequentes</Badge>
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-10">Perguntas Sapientes</h2>
          <p className="text-muted-foreground/60 text-xl font-medium">Transparência total sobre como elevamos sua marca ao topo.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-white rounded-[2rem] px-8 md:px-12 py-4 shadow-sm hover:shadow-md transition-all duration-500">
              <AccordionTrigger className="text-xl md:text-2xl font-bold tracking-tight hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed pt-4 pb-8 font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
