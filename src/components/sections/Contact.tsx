"use client";

import { Mail, MessageCircle, Copy, Check, ArrowRight, Sparkles, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
      description: `${type === 'email' ? 'E-mail' : 'Telefone'} salvo na área de transferência.`,
      className: "bg-[#0c0a1a] border-primary text-white font-black uppercase tracking-widest text-[10px]"
    });

    setTimeout(() => {
      if (type === 'email') setCopiedEmail(false);
      else setCopiedPhone(false);
    }, 2000);
  };

  return (
    <section id="contato" className="py-48 md:py-64 hero-purple-mesh relative overflow-hidden section-flow-top">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <div className="text-center lg:text-left mb-40 space-y-12">
             <div className="flex items-center gap-8 justify-center lg:justify-start">
                <Sparkles className="text-primary h-8 w-8 animate-pulse" />
                <Badge className="bg-white/5 text-primary border-primary/20 px-14 py-5 text-[10px] font-black uppercase tracking-[0.8em] rounded-full backdrop-blur-[50px] font-display">
                  Conexão
                </Badge>
             </div>
             <h2 className="font-display text-6xl md:text-[9.5rem] font-black tracking-tighter leading-[0.85] text-white">
               Vamos <br /><span className="text-primary italic">Conversar?</span>
             </h2>
             <p className="text-white/40 text-2xl md:text-4xl font-medium max-w-3xl mx-auto lg:mx-0 leading-tight tracking-tighter font-body">
               Estamos prontos para ouvir seus desafios e encontrar a <span className="text-white font-bold">estratégia ideal</span> para o seu negócio.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* WhatsApp Card */}
            <a 
              href={`https://wa.me/5511959631870`}
              target="_blank"
              className="p-16 rounded-[4.5rem] bg-white/5 border border-white/20 backdrop-blur-[50px] hover:bg-white/10 transition-all duration-1000 group text-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div className="space-y-12">
                <div className="h-28 w-28 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform animate-glow-pulse">
                  <MessageCircle className="h-14 w-14" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-6 font-display">Direct Connect</p>
                  <p className="text-white font-black text-4xl tracking-tighter uppercase leading-none font-display">WhatsApp</p>
                </div>
              </div>
              <div className="mt-16 space-y-8">
                <div className="h-px w-full bg-white/10" />
                <div className="flex items-center justify-center gap-5 text-[12px] font-black uppercase tracking-[0.6em] text-primary group-hover:text-white transition-colors font-display">
                  Iniciar Chat <ArrowRight className="h-5 w-5 group-hover:translate-x-4 transition-transform" />
                </div>
              </div>
            </a>

            {/* Email Card */}
            <div 
              onClick={() => handleCopy(email, 'email')}
              className="p-16 rounded-[4.5rem] bg-white/5 border border-white/20 backdrop-blur-[50px] hover:bg-white/10 transition-all duration-1000 cursor-pointer group text-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div className="space-y-12">
                <div className="h-28 w-28 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent mx-auto group-hover:scale-110 transition-transform">
                  <Mail className="h-14 w-14" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-6 font-display">Professional</p>
                  <p className="text-white font-black text-xl break-all leading-tight font-body tracking-tight">{email}</p>
                </div>
              </div>
              <div className="mt-16 space-y-8">
                <div className="h-px w-full bg-white/10" />
                <div className="flex items-center justify-center gap-5 text-[12px] font-black uppercase tracking-[0.6em] text-accent group-hover:text-white transition-colors font-display">
                  {copiedEmail ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copiedEmail ? "Copiado" : "Copiar E-mail"}
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              onClick={() => handleCopy(phone, 'phone')}
              className="p-16 rounded-[4.5rem] bg-white/5 border border-white/20 backdrop-blur-[50px] hover:bg-white/10 transition-all duration-1000 cursor-pointer group text-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div className="space-y-12">
                <div className="h-28 w-28 rounded-[2rem] bg-purple-500/10 flex items-center justify-center text-purple-400 mx-auto group-hover:scale-110 transition-transform">
                  <Phone className="h-14 w-14" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-6 font-display">Voice Call</p>
                  <p className="text-white font-black text-3xl tracking-tighter leading-none font-display">{phone}</p>
                </div>
              </div>
              <div className="mt-16 space-y-8">
                <div className="h-px w-full bg-white/10" />
                <div className="flex items-center justify-center gap-5 text-[12px] font-black uppercase tracking-[0.6em] text-purple-400 group-hover:text-white transition-colors font-display">
                  {copiedPhone ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copiedPhone ? "Copiado" : "Copiar Número"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}