"use client";

import { Mail, MessageCircle, Copy, Check, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const email = "sapientcontato@gmail.com";
  const phone = "+55 11 95963-1870";

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') setCopiedEmail(true);
    else setCopiedPhone(true);

    toast({
      title: "[ COPIADO ]",
      description: `${type === 'email' ? 'E-mail' : 'Telefone'} copiado para a área de transferência.`,
      className: "bg-[#0c0a1a] border-primary text-white font-black uppercase tracking-widest text-[9px]"
    });

    setTimeout(() => {
      if (type === 'email') setCopiedEmail(false);
      else setCopiedPhone(false);
    }, 2000);
  };

  return (
    <section id="contato" className="py-32 md:py-64 bg-[#0c0a1a] text-white relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-4 my-8 shadow-2xl flow-fade-in">
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.25),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40 space-y-12">
             <h2 className="font-headline text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-white uppercase text-balance">
               VAMOS <span className="text-primary italic">CONVERSAR?</span>
             </h2>
             <p className="text-white/40 text-2xl md:text-4xl font-medium max-w-4xl mx-auto leading-tight tracking-tight text-balance">
               Estamos prontos para ouvir seus desafios e projetar a estratégia ideal para sua autoridade digital absoluta.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <a 
              href={`https://wa.me/5511959631870`}
              target="_blank"
              className="p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 group text-center shadow-2xl flex flex-col justify-between h-[550px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary">
                <MessageCircle className="h-64 w-64" />
              </div>
              <div className="space-y-16 relative z-10">
                <div className="h-28 w-28 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-primary mx-auto animate-glow-pulse border border-primary/20">
                  <MessageCircle className="h-16 w-16" />
                </div>
                <div>
                  <p className="text-white font-black text-5xl tracking-tighter uppercase mb-2">WhatsApp</p>
                  <p className="text-[12px] font-black uppercase tracking-[0.6em] text-white/30">Diagnóstico Imediato</p>
                </div>
              </div>
              <div className="mt-16 flex items-center justify-center gap-8 text-[12px] font-black uppercase tracking-[0.5em] text-primary group-hover:text-white transition-colors relative z-10">
                Iniciar Conversa <ArrowRight className="h-8 w-8 group-hover:translate-x-6 transition-transform" />
              </div>
            </a>

            <div 
              onClick={() => handleCopy(email, 'email')}
              className="p-16 rounded-[4rem] bg-white text-black border-none hover:bg-primary hover:text-white transition-all duration-700 cursor-pointer group text-center shadow-2xl flex flex-col justify-between h-[550px] relative overflow-hidden"
            >
              <div className="space-y-16">
                <div className="h-28 w-28 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/10 group-hover:bg-white group-hover:text-primary transition-all duration-700">
                  <Mail className="h-16 w-16" />
                </div>
                <div>
                  <p className="font-black text-2xl md:text-3xl break-all leading-tight tracking-tight uppercase mb-2">{email}</p>
                  <p className="text-[12px] font-black uppercase tracking-[0.6em] text-black/20 group-hover:text-white/40">Dossiês e Propostas</p>
                </div>
              </div>
              <div className="mt-16 flex items-center justify-center gap-8 text-[12px] font-black uppercase tracking-[0.5em] text-primary group-hover:text-white transition-colors">
                {copiedEmail ? <Check className="h-8 w-8" /> : <Copy className="h-8 w-8" />}
                {copiedEmail ? "E-mail Copiado" : "Copiar E-mail"}
              </div>
            </div>

            <div 
              onClick={() => handleCopy(phone, 'phone')}
              className="p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer group text-center shadow-2xl flex flex-col justify-between h-[550px]"
            >
              <div className="space-y-16">
                <div className="h-28 w-28 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-primary mx-auto border border-primary/20">
                  <Phone className="h-16 w-16" />
                </div>
                <div>
                  <p className="text-white font-black text-4xl md:text-5xl tracking-tighter leading-none uppercase mb-2">{phone}</p>
                  <p className="text-[12px] font-black uppercase tracking-[0.6em] text-white/30">Ligação Direta</p>
                </div>
              </div>
              <div className="mt-16 flex items-center justify-center gap-8 text-[12px] font-black uppercase tracking-[0.5em] text-primary group-hover:text-white transition-colors">
                {copiedPhone ? <Check className="h-8 w-8" /> : <Copy className="h-8 w-8" />}
                {copiedPhone ? "Fone Copiado" : "Copiar Fone"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}