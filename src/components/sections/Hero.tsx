
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,38,217,0.15),transparent_70%)]" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in-up">
          <span className="mr-2">✨</span> Sapient Studio
        </div>
        
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up [animation-delay:200ms]">
          Transformamos negócios em <span className="text-primary italic">marcas desejadas</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up [animation-delay:400ms]">
          Uma agência de branding e marketing digital focada em excelência, inovação e resultados premium para quem busca o topo.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
          <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90">
            Começar Projeto
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-primary/20 hover:bg-primary/5">
            Ver Portfólio <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <div className="w-1 h-12 rounded-full bg-foreground" />
      </div>
    </section>
  );
}
