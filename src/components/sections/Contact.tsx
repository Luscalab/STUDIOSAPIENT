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
      description: `${type === 'email' ? 'E-mail' : 'Telefone'} copiado com sucesso.`,
      className: "bg-[#0c0a1a] border-primary text-white font-black uppercase tracking-widest text-[9px]"
    });

    setTimeout(() => {
      if (type === 'email') setCopiedEmail(false);
      else setCopiedPhone(false);
    }, 2000);
  };

  return (
    <section id="contato" className="py-32 md:py-48 hero-purple-mesh overflow-hidden flow-fade-out">
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 space-y-10">
             <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter leading-none text-white uppercase text-balance">
               Vamos <span className="text-primary italic">Conversar?</span>
             </h2>
             <p className="text-white/40 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
               Estamos prontos para ouvir seus desafios e encontrar a estratégia ideal para sua autoridade digital.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a 
              href={`https://wa.me/5511959631870`}
              target="_blank"
              className="p-12 rounded-[3rem] bg-white/5 border border-white/20 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 group text-center shadow-2xl flex flex-col justify-between h-[380px]"
            >
              <div className="space-y-10">
                <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mx-auto animate-glow-pulse">
                  <MessageCircle className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Direct</p>
                  <p className="text-white font-black text-3xl tracking-tighter uppercase">WhatsApp</p>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-primary group-hover:text-white transition-colors">
                Iniciar Chat <ArrowRight className="h-5 w-5 group-hover:translate-x-3 transition-transform" />
              </div>
            </a>

            <div 
              onClick={() => handleCopy(email, 'email')}
              className="p-12 rounded-[3rem] bg-white/5 border border-white/20 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer group text-center shadow-2xl flex flex-col justify-between h-[380px]"
            >
              <div className="space-y-10">
                <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mx-auto">
                  <Mail className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">E-mail</p>
                  <p className="text-white font-black text-lg break-all leading-tight font-body tracking-tight uppercase">{email}</p>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-primary group-hover:text-white transition-colors">
                {copiedEmail ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                {copiedEmail ? "Copiado" : "Copiar"}
              </div>
            </div>

            <div 
              onClick={() => handleCopy(phone, 'phone')}
              className="p-12 rounded-[3rem] bg-white/5 border border-white/20 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer group text-center shadow-2xl flex flex-col justify-between h-[380px]"
            >
              <div className="space-y-10">
                <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mx-auto">
                  <Phone className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Call</p>
                  <p className="text-white font-black text-2xl tracking-tighter leading-none uppercase">{phone}</p>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-primary group-hover:text-white transition-colors">
                {copiedPhone ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                {copiedPhone ? "Copiado" : "Copiar"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}