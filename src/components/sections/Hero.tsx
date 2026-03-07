import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-32 bg-white">
      {/* Abstract Luxury Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-primary/5 blur-[200px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[200px] rounded-full animate-float [animation-delay:4s]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-4 rounded-full border border-primary/10 bg-primary/5 px-10 py-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-16 animate-fade-in-up shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>Sapient Studio • Creative Excellence</span>
        </div>
        
        <h1 className="font-headline text-7xl md:text-9xl lg:text-[11rem] font-extrabold tracking-tighter mb-16 animate-fade-in-up [animation-delay:200ms] text-foreground leading-[0.8] md:leading-[0.8]">
          Sua marca,<br />
          <span className="text-primary italic relative inline-block group py-4">
            elevada.
            <svg className="absolute -bottom-8 left-0 w-full h-8 text-primary/10 group-hover:text-primary/30 transition-all duration-1000" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        </h1>
        
        <p className="max-w-4xl mx-auto text-xl md:text-4xl text-muted-foreground/80 mb-24 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight">
          Transformamos negócios ambiciosos em símbolos de autoridade através de design estratégico e performance de elite.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 animate-fade-in-up [animation-delay:600ms]">
          <Button className="h-28 px-20 text-2xl font-black bg-primary hover:bg-primary/90 shadow-[0_30px_60px_rgba(139,92,246,0.35)] transition-all hover:scale-105 active:scale-95 rounded-full">
            Criar meu Legado
          </Button>
          <Button variant="outline" className="h-28 px-20 text-2xl font-black border-primary/10 hover:bg-primary/5 transition-all rounded-full group">
            Portfólio <ArrowRight className="ml-4 h-10 w-10 group-hover:translate-x-4 transition-transform duration-700" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-primary">Scroll</span>
        <div className="w-[2px] h-20 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}