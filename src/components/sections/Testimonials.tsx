
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "A Sapient transformou completamente nossa percepção no mercado. Hoje somos vistos como líderes do nosso nicho.",
    author: "Marina Lima",
    company: "CEO na Stella Lux"
  },
  {
    quote: "O trabalho de design estratégico foi além das expectativas. O visual da marca agora reflete nossa verdadeira qualidade.",
    author: "André Porto",
    company: "Fundador da Porto Wine"
  },
  {
    quote: "Nossas redes sociais nunca foram tão ativas e lucrativas. A gestão é impecável e o conteúdo é de outro nível.",
    author: "Carla Silveira",
    company: "Diretora de Mkt na BioCore"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-5xl font-bold mb-16 text-center">O que dizem nossos clientes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-card/30 border-primary/10 relative pt-10">
              <div className="absolute top-0 left-8 -translate-y-1/2 bg-primary p-3 rounded-xl">
                <Quote className="h-6 w-6 text-white" />
              </div>
              <CardContent>
                <p className="text-lg italic mb-6 text-muted-foreground">"{t.quote}"</p>
                <div>
                  <p className="font-bold">{t.author}</p>
                  <p className="text-sm text-primary">{t.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
