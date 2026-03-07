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
    answer: "Os resultados variam conforme o serviço. Estratégias de tráfego pago podem gerar leads em poucos dias, enquanto o reposicionamento de marca é um processo gradual que se consolida entre 3 a 6 meses."
  },
  {
    question: "A Sapient atende qualquer tipo de empresa?",
    answer: "Atendemos negócios que buscam profissionalizar sua comunicação e aumentar sua presença digital. Seja você uma empresa estabelecida ou em crescimento, focamos em entregar soluções que façam sentido para o seu tamanho."
  },
  {
    question: "Qual o investimento mínimo necessário?",
    answer: "Trabalhamos com projetos personalizados. Após uma conversa inicial para entender seus objetivos, apresentamos uma proposta que se adeque ao seu orçamento e expectativas de retorno."
  },
  {
    question: "Como funciona a gestão de redes sociais?",
    answer: "Nossa gestão vai além de postar fotos. Envolve curadoria de conteúdo, escrita estratégica (copywriting) e monitoramento de resultados, garantindo que seu perfil seja uma ferramenta de vendas."
  }
];

export function FAQ() {
  return (
    <section className="section-spacing bg-secondary/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <Badge className="mb-8 bg-primary/10 text-primary px-10 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Dúvidas Comuns</Badge>
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-10">Perguntas Frequentes</h2>
          <p className="text-muted-foreground/60 text-xl font-medium">Esclarecemos as principais questões sobre como trabalhamos.</p>
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
