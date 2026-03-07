import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-fade-in-up shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Sparkles className="h-4 w-4" />
          <span>Transformação Digital Premium</span>
        </div>
        
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up [animation-delay:200ms]">
          <span className="text-gradient">Elevamos sua marca ao</span>
          <br />
          <span className="text-primary italic relative">
            status de desejo
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground/80 mb-12 animate-fade-in-up [animation-delay:400ms] leading-relaxed">
          A Sapient Studio combina design estratégico e marketing de alta performance para transformar negócios comuns em líderes de mercado.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:600ms]">
          <Button size="lg" className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all hover:scale-105">
            Iniciar Consultoria
          </Button>
          <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-bold border-primary/30 hover:bg-primary/5 transition-all">
            Nosso Portfólio <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}