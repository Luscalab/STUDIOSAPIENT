"use client";

import { Mail, Phone, MessageCircle, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function Contact() {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const email = "sapientcontato@gmail.com";
  const phone = "+55 11 95963-1870";

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
    <section id="contato" className="py-32 md:py-48 hero-purple-mesh relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
             <div className="space-y-10 text-center lg:text-left">
               <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <Sparkles className="text-primary h-6 w-6" />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Conexão Estratégica</p>
               </div>
               <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-none text-white">
                 Vamos <span className="text-primary italic">Conversar?</span>
               </h2>
               <p className="text-white/40 text-xl md:text-2xl font-medium leading-relaxed tracking-tight max-w-xl mx-auto lg:mx-0">
                 Estamos prontos para ouvir seus desafios e transformar sua visão em <span className="text-white font-bold">autoridade inquestionável.</span>
               </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div 
                 onClick={() => handleCopy(email)}
                 className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer group text-center"
               >
                 <Mail className="h-10 w-10 text-primary mx-auto mb-6" />
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">E-mail Profissional</p>
                 <p className="text-white font-bold text-lg mb-6 break-all">{email}</p>
                 <div className="h-px w-full bg-white/10 mb-6" />
                 <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary">
                   {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                   {copiedEmail ? "Copiado" : "Copiar E-mail"}
                 </div>
               </div>

               <a 
                 href={`https://wa.me/5511959631870`}
                 target="_blank"
                 className="p-10 rounded-[3rem] bg-primary text-white hover:bg-primary/90 transition-all duration-700 text-center shadow-2xl group"
               >
                 <MessageCircle className="h-10 w-10 text-white mx-auto mb-6 animate-bounce" />
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/60 mb-2">WhatsApp Business</p>
                 <p className="font-black text-2xl tracking-tighter mb-6 uppercase">Direct Talk</p>
                 <div className="h-px w-full bg-white/20 mb-6" />
                 <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
                   Iniciar Chat <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                 </div>
               </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}