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
        <div className="max-w-[100rem] mx-auto">
          <div className="text-center lg:text-left mb-48 space-y-16">
             <div className="flex items-center gap-10 justify-center lg:justify-start">
                <Sparkles className="text-primary h-12 w-12 animate-pulse" />
                <Badge className="bg-white/5 text-primary border-primary/20 px-16 py-6 text-[11px] font-black uppercase tracking-[1em] rounded-full backdrop-blur-[60px] font-display">
                  Conexão
                </Badge>
             </div>
             <h2 className="font-display text-7xl md:text-[11.5rem] font-black tracking-tighter leading-[0.8] text-white uppercase">
               Vamos <br /><span className="text-primary italic">Conversar?</span>
             </h2>
             <p className="text-white/40 text-3xl md:text-5xl font-medium max-w-5xl mx-auto lg:mx-0 leading-tight tracking-tighter font-body">
               Estamos prontos para ouvir seus desafios e encontrar a <span className="text-white font-bold">estratégia ideal</span> para o seu negócio.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* WhatsApp Card */}
            <a 
              href={`https://wa.me/5511959631870`}
              target="_blank"
              className="p-16 rounded-[5rem] bg-white/5 border border-white/20 backdrop-blur-[60px] hover:bg-white/10 transition-all duration-1000 group text-center shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div className="space-y-16">
                <div className="h-32 w-32 rounded-[2.5rem] bg-primary/15 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform animate-glow-pulse">
                  <MessageCircle className="h-16 w-16" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white/30 mb-8 font-display">Direct Connect</p>
                  <p className="text-white font-black text-5xl tracking-tighter uppercase leading-none font-display">WhatsApp</p>
                </div>
              </div>
              <div className="mt-20 space-y-10">
                <div className="h-px w-full bg-white/10" />
                <div className="flex items-center justify-center gap-6 text-[14px] font-black uppercase tracking-[0.8em] text-primary group-hover:text-white transition-colors font-display">
                  Iniciar Chat <ArrowRight className="h-6 w-6 group-hover:translate-x-5 transition-transform" />
                </div>
              </div>
            </a>

            {/* Email Card */}
            <div 
              onClick={() => handleCopy(email, 'email')}
              className="p-16 rounded-[5rem] bg-white/5 border border-white/20 backdrop-blur-[60px] hover:bg-white/10 transition-all duration-1000 cursor-pointer group text-center shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div className="space-y-16">
                <div className="h-32 w-32 rounded-[2.5rem] bg-accent/15 flex items-center justify-center text-accent mx-auto group-hover:scale-110 transition-transform">
                  <Mail className="h-16 w-16" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white/30 mb-8 font-display">Professional</p>
                  <p className="text-white font-black text-2xl break-all leading-tight font-body tracking-tight uppercase">{email}</p>
                </div>
              </div>
              <div className="mt-20 space-y-10">
                <div className="h-px w-full bg-white/10" />
                <div className="flex items-center justify-center gap-6 text-[14px] font-black uppercase tracking-[0.8em] text-accent group-hover:text-white transition-colors font-display">
                  {copiedEmail ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                  {copiedEmail ? "Copiado" : "Copiar E-mail"}
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              onClick={() => handleCopy(phone, 'phone')}
              className="p-16 rounded-[5rem] bg-white/5 border border-white/20 backdrop-blur-[60px] hover:bg-white/10 transition-all duration-1000 cursor-pointer group text-center shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div className="space-y-16">
                <div className="h-32 w-32 rounded-[2.5rem] bg-purple-500/15 flex items-center justify-center text-purple-400 mx-auto group-hover:scale-110 transition-transform">
                  <Phone className="h-16 w-16" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white/30 mb-8 font-display">Voice Call</p>
                  <p className="text-white font-black text-4xl tracking-tighter leading-none font-display uppercase">{phone}</p>
                </div>
              </div>
              <div className="mt-20 space-y-10">
                <div className="h-px w-full bg-white/10" />
                <div className="flex items-center justify-center gap-6 text-[14px] font-black uppercase tracking-[0.8em] text-purple-400 group-hover:text-white transition-colors font-display">
                  {copiedPhone ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
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