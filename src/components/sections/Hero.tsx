import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-24 bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[180px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[180px] rounded-full animate-float [animation-delay:2s]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-8 py-3 text-xs font-black uppercase tracking-[0.3em] text-primary mb-12 animate-fade-in-up shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>Inteligência Criativa de Elite</span>
        </div>
        
        <h1 className="font-headline text-7xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter mb-12 animate-fade-in-up [animation-delay:200ms] text-foreground leading-[0.85] md:leading-[0.85]">
          A sua marca<br />
          <span className="text-primary italic relative inline-block group">
            reimaginada
            <svg className="absolute -bottom-6 left-0 w-full h-6 text-primary/20 group-hover:text-primary/40 transition-colors" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </h1>
        
        <p className="max-w-4xl mx-auto text-xl md:text-3xl text-muted-foreground mb-20 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium">
          Transformamos empresas ambiciosas em símbolos de desejo através de design estratégico e marketing de alta performance.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-fade-in-up [animation-delay:600ms]">
          <Button className="h-24 px-16 text-2xl font-black bg-primary hover:bg-primary/90 shadow-[0_20px_50px_rgba(139,92,246,0.3)] transition-all hover:scale-105 active:scale-95 rounded-full">
            Iniciar Legado
          </Button>
          <Button variant="outline" className="h-24 px-16 text-2xl font-black border-primary/10 hover:bg-primary/5 transition-all rounded-full group">
            Ver Portfólio <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-3 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-primary">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}