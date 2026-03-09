"use client";

import { Mail, MessageCircle, Copy, Check, ArrowRight, Phone, TrendingUp, Heart, Code2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const email = "sapientcontato@gmail.com";

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    toast({
      title: `[ ${label.toUpperCase()} COPIADO ]`,
      description: "Pronto para uso na sua área de transferência.",
      className: "bg-black border-primary text-white font-black uppercase tracking-widest text-[9px]"
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contato" className="py-24 md:py-48 bg-[#0c0a1a] text-white relative rounded-[4rem] md:rounded-[8rem] mx-4 mb-24 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <h3 className="font-headline text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8 text-white">
            VAMOS <br />
            <span className="text-primary italic font-medium">CONVERSAR.</span>
          </h3>
          <p className="text-xl md:text-2xl text-white/40 font-medium tracking-tight">Escolha seu caminho para impulsionar a sua autoridade digital.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card WhatsApp */}
          <div className="p-12 rounded-[4rem] bg-white text-black flex flex-col h-full border-t-[8px] border-primary shadow-xl">
            <div className="space-y-8 flex-1">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h4 className="font-headline text-3xl font-black tracking-tighter">Diagnóstico Direto</h4>
              <p className="text-black/40 font-medium text-base">Fale diretamente com um estrategista para uma análise imediata do seu negócio.</p>
            </div>
            <div className="mt-12 p-6 rounded-[2rem] bg-black text-white space-y-4">
              <p className="text-xs font-black truncate">+55 11 95963-1870</p>
              <a 
                href="https://wa.me/5511959631870" 
                target="_blank"
                className="block w-full py-4 text-center rounded-xl bg-white/10 hover:bg-white/20 text-[8px] font-black uppercase tracking-widest transition-all"
              >
                Iniciar WhatsApp
              </a>
            </div>
          </div>

          {/* Card E-mail */}
          <div className="p-12 rounded-[4rem] bg-[#121216] border border-white/5 text-white flex flex-col h-full border-t-[8px] border-primary shadow-xl">
            <div className="space-y-8 flex-1">
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Mail className="h-8 w-8" />
              </div>
              <h4 className="font-headline text-3xl font-black tracking-tighter">Dossiês de Venda</h4>
              <p className="text-white/40 font-medium text-base">Solicite propostas detalhadas e apresentações para o seu projeto de marca.</p>
            </div>
            <div className="mt-12 p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
              <p className="text-xs font-black truncate">{email}</p>
              <button 
                onClick={() => handleCopy(email, "E-mail")} 
                className="w-full py-4 rounded-xl bg-primary text-white hover:bg-primary/90 text-[8px] font-black uppercase tracking-widest transition-all"
              >
                Copiar E-mail
              </button>
            </div>
          </div>

          {/* Card Colaboração */}
          <div className="p-12 rounded-[4rem] bg-white text-black flex flex-col h-full border-t-[8px] border-black shadow-xl">
            <div className="space-y-8 flex-1">
              <div className="h-16 w-16 rounded-2xl bg-black/5 flex items-center justify-center text-black">
                <Code2 className="h-8 w-8" />
              </div>
              <h4 className="font-headline text-3xl font-black tracking-tighter">Colaboração Tech</h4>
              <p className="text-black/40 font-medium text-base">Buscamos parcerias especializadas em tecnologia e marketing para projetos globais.</p>
            </div>
            <div className="mt-12 p-6 rounded-[2rem] bg-black text-white space-y-4">
              <p className="text-xs font-black truncate">{email}</p>
              <button 
                onClick={() => handleCopy(email, "E-mail")} 
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/15 text-[8px] font-black uppercase tracking-widest transition-all border border-white/10"
              >
                Copiar E-mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
