import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-white soft-gradient-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[80%] h-[80%] bg-primary/5 blur-[100px] rounded-full animate-float opacity-50" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[100px] rounded-full animate-float [animation-delay:4s] opacity-50" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white/50 backdrop-blur-md px-6 py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 md:mb-12 animate-fade-in-up shadow-sm">
          <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
          <span>Estratégia & Design de Elite</span>
        </div>
        
        <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-8 md:mb-12 animate-fade-in-up [animation-delay:200ms] text-foreground leading-[0.85] lg:max-w-[90rem] mx-auto text-balance">
          Sua marca,<br />
          <span className="text-primary italic relative inline-block group">
            extraordinária.
            <div className="absolute -bottom-2 md:-bottom-6 left-0 w-full h-4 md:h-8 bg-primary/5 -skew-x-12 -z-10 transition-all group-hover:scale-110" />
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-muted-foreground/60 mb-12 md:mb-16 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
          Transformamos negócios comuns em referências absolutas através de design estratégico e posicionamento de luxo.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 animate-fade-in-up [animation-delay:600ms]">
          <Link href="#contato" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-base md:text-lg font-black bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-widest text-white">
              Iniciar Conversa
            </Button>
          </Link>
          <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-base md:text-lg font-black border-primary/10 hover:bg-secondary transition-all rounded-full group uppercase tracking-widest bg-transparent">
              Behance <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Down Indicator - Hidden on very small screens */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 hidden sm:flex">
        <span className="text-[8px] uppercase tracking-[0.5em] font-black text-primary">Scroll</span>
        <div className="relative w-[1px] h-12 bg-muted/40 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[scroll-indicator_2.5s_infinite]" />
        </div>
      </div>
    </section>
  );
}