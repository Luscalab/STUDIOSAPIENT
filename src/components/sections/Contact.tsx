"use client";

import { Mail, MessageCircle, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const email = "sapientcontato@gmail.com";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    toast({
      title: "[ COPIADO ]",
      description: "E-mail salvo na área de transferência.",
      className: "bg-[#0c0a1a] border-primary text-white font-black uppercase tracking-widest text-[10px]"
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contato" className="py-32 md:py-64 hero-purple-mesh relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
             <div className="space-y-12 text-center lg:text-left">
               <div className="flex items-center gap-6 justify-center lg:justify-start">
                  <Sparkles className="text-primary h-8 w-8 animate-pulse" />
                  <p className="text-[12px] font-black uppercase tracking-[0.6em] text-primary">Conexão Estratégica</p>
               </div>
               <h2 className="font-display text-6xl md:text-[9.5rem] font-black tracking-tighter leading-[0.85] text-white">
                 Vamos <br /><span className="text-primary italic">Conversar?</span>
               </h2>
               <p className="text-white/40 text-2xl md:text-4xl font-medium leading-tight tracking-tight max-w-2xl mx-auto lg:mx-0">
                 Estamos prontos para ouvir seus desafios e transformar sua visão em <span className="text-white font-bold">autoridade inquestionável.</span>
               </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div 
                 onClick={() => handleCopy(email)}
                 className="p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer group text-center shadow-2xl"
               >
                 <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-10 group-hover:scale-110 transition-transform">
                   <Mail className="h-10 w-10" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-4">E-mail Profissional</p>
                 <p className="text-white font-black text-2xl mb-10 break-all leading-none">{email}</p>
                 <div className="h-px w-full bg-white/10 mb-10" />
                 <div className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary">
                   {copiedEmail ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                   {copiedEmail ? "Copiado" : "Copiar E-mail"}
                 </div>
               </div>

               <a 
                 href={`https://wa.me/5511959631870`}
                 target="_blank"
                 className="p-16 rounded-[4rem] bg-primary text-white hover:bg-primary/90 transition-all duration-700 text-center shadow-2xl group flex flex-col justify-between"
               >
                 <div className="h-24 w-24 rounded-3xl bg-white/20 flex items-center justify-center text-white mx-auto mb-10 animate-pulse">
                   <MessageCircle className="h-10 w-10" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-4">WhatsApp Business</p>
                 <p className="font-black text-4xl tracking-tighter mb-10 uppercase leading-none">Direct Talk</p>
                 <div className="h-px w-full bg-white/20 mb-10" />
                 <div className="flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest">
                   Iniciar Chat <ArrowRight className="h-5 w-5 group-hover:translate-x-3 transition-transform" />
                 </div>
               </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}