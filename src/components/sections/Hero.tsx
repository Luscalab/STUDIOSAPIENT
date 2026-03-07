import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 bg-white soft-gradient-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[90%] h-[90%] bg-primary/3 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[70%] h-[70%] bg-accent/3 blur-[120px] rounded-full animate-float [animation-delay:4s]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-4 rounded-full border border-primary/10 bg-white/40 backdrop-blur-md px-8 py-3 text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-12 animate-fade-in-up shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>Estratégia & Design de Elite</span>
        </div>
        
        <h1 className="font-headline text-6xl md:text-9xl font-black tracking-tighter mb-10 animate-fade-in-up [animation-delay:200ms] text-foreground leading-[0.85] lg:max-w-7xl mx-auto">
          Sua marca,<br />
          <span className="text-primary italic relative inline-block group">
            extraordinária.
            <div className="absolute -bottom-6 left-0 w-full h-8 bg-primary/5 -skew-x-12 -z-10 transition-all group-hover:scale-110" />
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground/60 mb-16 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4">
          Transformamos negócios comuns em referências absolutas através de design estratégico e posicionamento de luxo.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in-up [animation-delay:600ms]">
          <Link href="#contato">
            <Button className="h-20 px-16 text-lg font-black bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-widest text-white">
              Iniciar Conversa
            </Button>
          </Link>
          <Link href={behanceUrl} target="_blank">
            <Button variant="outline" className="h-20 px-16 text-lg font-black border-primary/10 hover:bg-secondary transition-all rounded-full group uppercase tracking-widest bg-transparent">
              Behance <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-3 transition-transform duration-500" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hidden md:flex">
        <span className="text-[9px] uppercase tracking-[0.6em] font-black text-primary">Scroll</span>
        <div className="relative w-[1.5px] h-16 bg-muted/30 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[scroll-indicator_2.5s_infinite]" />
        </div>
      </div>
    </section>
  );
}