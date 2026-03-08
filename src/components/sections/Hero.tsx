"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const behanceUrl = "https://www.behance.net/sapient";
  // Usando a imagem oficial de design como uma textura muito sutil
  const heroBg = PlaceHolderImages.find(img => img.id === "hero-bg")?.imageUrl || "";

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Layered System */}
      <div className="absolute inset-0 z-0 hero-purple-mesh">
        {/* Subtle Texture Image */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay grayscale">
           <Image 
            src={heroBg}
            alt="Texture"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Animated Glow Elements for Modern Look */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse [animation-delay:3s]" />
        
        {/* Gradient Fade to Content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a051a]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 mb-10 animate-fade-in-up shadow-2xl">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Estratégia & Design Profissional</span>
        </div>
        
        <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tighter mb-8 animate-fade-in-up [animation-delay:200ms] text-white leading-[0.9] text-balance max-w-6xl mx-auto drop-shadow-[0_20px_50px_rgba(139,92,246,0.3)]">
          Sua marca,<br />
          <span className="text-primary italic">estratégica.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/70 mb-12 animate-fade-in-up [animation-delay:400ms] leading-relaxed font-medium tracking-tight px-4 text-balance">
          Elevamos o posicionamento do seu negócio através de um ecossistema visual moderno e performance estratégica.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:600ms]">
          <Button 
            onClick={handleOpenChat}
            className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-sm font-bold bg-primary hover:bg-primary/90 shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all hover:scale-105 active:scale-95 rounded-full uppercase tracking-widest text-white border-none"
          >
            Iniciar Diagnóstico
          </Button>
          <Link href={behanceUrl} target="_blank" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-sm font-bold border-white/10 hover:bg-white/10 transition-all rounded-full group uppercase tracking-widest bg-white/5 backdrop-blur-md text-white">
              Ver Projetos <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Modern Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fbfaff] to-transparent z-10" />
    </section>
  );
}