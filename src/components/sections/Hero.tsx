import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 md:pt-40 pb-20 bg-white soft-gradient-bg">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[80%] h-[80%] bg-primary/5 blur-[150px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full animate-float [animation-delay:3s]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white/60 backdrop-blur-sm px-6 md:px-8 py-2 md:py-3 text-[9px] font-bold uppercase tracking-[0.4em] text-primary mb-8 md:mb-12 animate-fade-in-up shadow-sm">
          <Sparkles className="h-3 w-3" />
          <span>Design & Branding</span>
        </div>
        
        <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 md:mb-12 animate-fade-in-up [animation-delay:200ms] text-foreground leading-[0.9]">
          Sua marca,<br />
          <span className="text-primary italic relative inline-block group">
            estratégica.
            <svg className="absolute -bottom-4 md:-bottom-6 left-0 w-full h-6 text-primary/10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground/70 mb-12 md:mb-16 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4">
          Ajudamos negócios a se tornarem referências através de design estratégico e posicionamento de elite.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 animate-fade-in-up [animation-delay:600ms]">
          <Link href="#contato">
            <Button className="h-16 md:h-20 px-10 md:px-14 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-widest text-white">
              Iniciar Conversa
            </Button>
          </Link>
          <Link href={behanceUrl} target="_blank">
            <Button variant="outline" className="h-16 md:h-20 px-10 md:px-14 text-base md:text-lg font-bold border-primary/10 hover:bg-primary/5 transition-all rounded-full group uppercase tracking-widest">
              Behance <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 hidden md:flex">
        <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-primary">Explore</span>
        <div className="relative w-[1.5px] h-12 bg-muted overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[scroll-indicator_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}