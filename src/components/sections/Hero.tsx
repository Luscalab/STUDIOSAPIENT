import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20 bg-white">
      {/* Premium Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-2.5 text-sm font-bold text-primary mb-10 animate-fade-in-up shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>Transformação Digital de Elite</span>
        </div>
        
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-10 animate-fade-in-up [animation-delay:200ms] text-foreground">
          Elevamos sua marca ao<br />
          <span className="text-primary italic relative inline-block">
            status de desejo
            <svg className="absolute -bottom-4 left-0 w-full h-4 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground mb-16 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium">
          A Sapient Studio une design estratégico e marketing de alta performance para transformar negócios em líderes de mercado cobiçados.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in-up [animation-delay:600ms]">
          <Button size="lg" className="h-20 px-12 text-xl font-extrabold bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-105 rounded-full">
            Iniciar Consultoria
          </Button>
          <Button size="lg" variant="outline" className="h-20 px-12 text-xl font-extrabold border-primary/20 hover:bg-primary/5 transition-all rounded-full group">
            Nosso Portfólio <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-primary">Explore</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}