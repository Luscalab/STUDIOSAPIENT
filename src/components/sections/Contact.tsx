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
    <section id="contato" className="py-64 md:py-80 bg-[#0c0a1a] text-white relative overflow-hidden rounded-[4rem] md:rounded-[8rem] mx-6 my-12 shadow-2xl flow-fade-in">
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-64 space-y-24">
             <h2 className="font-headline text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.8] text-white uppercase text-balance">
               VAMOS <span className="text-primary italic font-medium">CONVERSAR.</span>
             </h2>
             <p className="text-white/20 text-2xl md:text-6xl font-medium max-w-6xl mx-auto leading-tight tracking-tight text-balance">
               Estamos prontos para projetar a estratégia ideal para sua autoridade digital absoluta.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-[1600px] mx-auto">
            <a 
              href={`https://wa.me/5511959631870`}
              target="_blank"
              className="p-24 rounded-[5rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-1000 group text-center shadow-2xl flex flex-col justify-between h-[750px] relative overflow-hidden"
            >
              <div className="space-y-24 relative z-10">
                <div className="h-40 w-40 rounded-[3.5rem] bg-primary/20 flex items-center justify-center text-primary mx-auto animate-glow-pulse border border-primary/20">
                  <MessageCircle className="h-24 w-24" />
                </div>
                <div>
                  <p className="text-white font-black text-5xl md:text-7xl tracking-tighter uppercase mb-6 leading-none">WhatsApp</p>
                  <p className="text-[13px] font-black uppercase tracking-[0.6em] text-white/20">Diagnóstico Imediato</p>
                </div>
              </div>
              <div className="mt-24 flex items-center justify-center gap-12 text-[13px] font-black uppercase tracking-[0.6em] text-primary group-hover:text-white transition-colors relative z-10">
                Iniciar Conversa <ArrowRight className="h-12 w-12 group-hover:translate-x-12 transition-transform" />
              </div>
            </a>

            <div 
              onClick={() => handleCopy(email, 'email')}
              className="p-24 rounded-[5rem] bg-white text-black border-none hover:bg-primary hover:text-white transition-all duration-1000 cursor-pointer group text-center shadow-2xl flex flex-col justify-between h-[750px] relative overflow-hidden"
            >
              <div className="space-y-24">
                <div className="h-40 w-40 rounded-[3.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/10 group-hover:bg-white group-hover:text-primary transition-all duration-1000">
                  <Mail className="h-24 w-24" />
                </div>
                <div>
                  <p className="font-black text-2xl md:text-4xl break-all leading-tight tracking-tight uppercase mb-6">{email}</p>
                  <p className="text-[13px] font-black uppercase tracking-[0.6em] text-black/20 group-hover:text-white/40">Dossiês e Propostas</p>
                </div>
              </div>
              <div className="mt-24 flex items-center justify-center gap-12 text-[13px] font-black uppercase tracking-[0.6em] text-primary group-hover:text-white transition-colors">
                {copiedEmail ? <Check className="h-12 w-12" /> : <Copy className="h-12 w-12" />}
                {copiedEmail ? "E-mail Copiado" : "Copiar E-mail"}
              </div>
            </div>

            <div 
              onClick={() => handleCopy(phone, 'phone')}
              className="p-24 rounded-[5rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-1000 cursor-pointer group text-center shadow-2xl flex flex-col justify-between h-[750px]"
            >
              <div className="space-y-24">
                <div className="h-40 w-40 rounded-[3.5rem] bg-primary/20 flex items-center justify-center text-primary mx-auto border border-primary/20">
                  <Phone className="h-24 w-24" />
                </div>
                <div>
                  <p className="text-white font-black text-4xl md:text-7xl tracking-tighter leading-none uppercase mb-6">{phone}</p>
                  <p className="text-[13px] font-black uppercase tracking-[0.6em] text-white/20">Ligação Direta</p>
                </div>
              </div>
              <div className="mt-24 flex items-center justify-center gap-12 text-[13px] font-black uppercase tracking-[0.6em] text-primary group-hover:text-white transition-colors">
                {copiedPhone ? <Check className="h-12 w-12" /> : <Copy className="h-12 w-12" />}
                {copiedPhone ? "Fone Copiado" : "Copiar Fone"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}