
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
    <section id="contato" className="py-32 md:py-64 hero-purple-mesh relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center lg:text-left mb-24 space-y-8">
             <div className="flex items-center gap-6 justify-center lg:justify-start">
                <Sparkles className="text-primary h-6 w-6 animate-pulse" />
                <Badge className="bg-white/5 text-primary border-primary/20 px-8 py-3 text-[10px] font-black uppercase tracking-[0.5em] rounded-full backdrop-blur-3xl">
                  Conexão Estratégica
                </Badge>
             </div>
             <h2 className="font-display text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-white">
               Vamos <br /><span className="text-primary italic">Conversar?</span>
             </h2>
             <p className="text-white/70 text-2xl md:text-3xl font-medium max-w-2xl mx-auto lg:mx-0 leading-tight tracking-tight">
               Estamos prontos para ouvir seus desafios e encontrar a <span className="text-white font-bold">estratégia ideal</span> para o seu negócio.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WhatsApp Card */}
            <a 
              href={`https://wa.me/5511959631870`}
              target="_blank"
              className="p-12 rounded-[4rem] bg-white/5 border border-white/20 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 group text-center shadow-2xl flex flex-col justify-between border-t-primary/50"
            >
              <div className="space-y-10">
                <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform animate-glow-pulse">
                  <MessageCircle className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-4">WhatsApp Business</p>
                  <p className="text-white font-black text-3xl tracking-tighter uppercase leading-none">Mensagem</p>
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="h-px w-full bg-white/20" />
                <div className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                  Iniciar Chat <ArrowRight className="h-4 w-4 group-hover:translate-x-3 transition-transform" />
                </div>
              </div>
            </a>

            {/* Email Card */}
            <div 
              onClick={() => handleCopy(email, 'email')}
              className="p-12 rounded-[4rem] bg-white/5 border border-white/20 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer group text-center shadow-2xl flex flex-col justify-between border-t-accent/50"
            >
              <div className="space-y-10">
                <div className="h-20 w-20 rounded-3xl bg-accent/10 flex items-center justify-center text-accent mx-auto group-hover:scale-110 transition-transform">
                  <Mail className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-4">E-mail Profissional</p>
                  <p className="text-white font-black text-lg break-all leading-tight">{email}</p>
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="h-px w-full bg-white/20" />
                <div className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-accent group-hover:text-white transition-colors">
                  {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedEmail ? "Copiado" : "Copiar E-mail"}
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              onClick={() => handleCopy(phone, 'phone')}
              className="p-12 rounded-[4rem] bg-white/5 border border-white/20 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 cursor-pointer group text-center shadow-2xl flex flex-col justify-between border-t-purple-500/50"
            >
              <div className="space-y-10">
                <div className="h-20 w-20 rounded-3xl bg-purple-500/10 flex items-center justify-center text-purple-400 mx-auto group-hover:scale-110 transition-transform">
                  <Phone className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-4">Ligação Direta</p>
                  <p className="text-white font-black text-2xl tracking-tighter leading-none">{phone}</p>
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="h-px w-full bg-white/20" />
                <div className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-purple-400 group-hover:text-white transition-colors">
                  {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
