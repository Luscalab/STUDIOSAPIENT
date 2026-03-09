
"use client";

import { Mail, Phone, MessageCircle, Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function Contact() {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "sapientcontato@gmail.com";
  const phone = "+55 11 95963-1870";
  const whatsappNumber = "5511959631870";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleCopy = (e: React.MouseEvent, text: string, type: 'email' | 'phone') => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(text);
    
    toast({
      title: "[ COPIADO ]",
      description: `${type === 'email' ? 'E-mail' : 'Telefone'} salvo na área de transferência.`,
      className: "bg-black border-primary text-white font-black uppercase tracking-widest text-[10px]"
    });

    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contato" className="py-32 md:py-64 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[180px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-32">
             <div className="space-y-12">
               <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-primary" />
                  <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary">Conexão Estratégica</p>
               </div>
               <h2 className="font-display text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.85] text-foreground">
                 Vamos <br /><span className="text-primary italic">Conversar?</span>
               </h2>
             </div>
             <p className="text-muted-foreground/60 text-2xl md:text-4xl font-medium leading-tight tracking-tight text-balance pb-8">
               Estamos prontos para ouvir seus desafios e transformar sua visão em <span className="text-foreground font-bold">autoridade inquestionável.</span>
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Email Card */}
            <a 
              href={`mailto:${email}`} 
              className="flex flex-col items-center p-16 rounded-[4.5rem] bg-[#0a0a0c] text-white border border-white/5 shadow-2xl h-full group relative overflow-hidden transition-all duration-1000 hover:-translate-y-8"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Mail className="h-48 w-48" />
              </div>
              <div className="h-24 w-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center mb-12 border border-white/10 relative z-10 group-hover:bg-primary transition-colors duration-700">
                <Mail className="h-10 w-10 text-white" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-4 relative z-10">E-mail Profissional</p>
              <p className="font-bold text-xl md:text-2xl tracking-tighter mb-12 relative z-10 break-all text-center">{email}</p>
              
              <button 
                onClick={(e) => handleCopy(e, email, 'email')}
                className="mt-auto w-full flex items-center justify-center gap-4 px-8 py-5 rounded-2xl bg-white/5 hover:bg-white text-[10px] font-black uppercase tracking-[0.3em] transition-all text-white hover:text-black border border-white/10 relative z-10"
              >
                {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedEmail ? "Identidade Copiada" : "Copiar E-mail"}
              </button>
            </a>
            
            {/* Phone Card */}
            <a 
              href={`tel:${phone.replace(/\D/g, '')}`} 
              className="flex flex-col items-center p-16 rounded-[4.5rem] bg-[#0a0a0c] text-white border border-white/5 shadow-2xl h-full group relative overflow-hidden transition-all duration-1000 hover:-translate-y-8"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Phone className="h-48 w-48" />
              </div>
              <div className="h-24 w-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center mb-12 border border-white/10 relative z-10 group-hover:bg-primary transition-colors duration-700">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-4 relative z-10">Telefone / Sede</p>
              <p className="font-bold text-2xl md:text-3xl tracking-tighter mb-12 relative z-10">{phone}</p>
              
              <button 
                onClick={(e) => handleCopy(e, phone, 'phone')}
                className="mt-auto w-full flex items-center justify-center gap-4 px-8 py-5 rounded-2xl bg-white/5 hover:bg-white text-[10px] font-black uppercase tracking-[0.3em] transition-all text-white hover:text-black border border-white/10 relative z-10"
              >
                {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedPhone ? "Número Copiado" : "Copiar Telefone"}
              </button>
            </a>

            {/* WhatsApp Card - Direct Impact */}
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-16 rounded-[4.5rem] bg-[#25D366] text-white border border-[#25D366] shadow-[0_40px_100px_rgba(37,211,102,0.3)] h-full group relative overflow-hidden transition-all duration-1000 hover:-translate-y-8"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <MessageCircle className="h-48 w-48" />
              </div>
              <div className="h-24 w-24 rounded-[2.5rem] bg-white/20 flex items-center justify-center mb-12 border border-white/20 relative z-10">
                <MessageCircle className="h-10 w-10 text-white animate-bounce" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80 mb-4 relative z-10">WhatsApp Business</p>
              <p className="font-black text-4xl md:text-5xl tracking-tighter uppercase mb-2 relative z-10">Direct Talk</p>
              <p className="mt-2 text-[12px] font-bold opacity-70 uppercase tracking-[0.3em] relative z-10">Resposta em Tempo Real</p>
              
              <div className="mt-auto w-full flex items-center justify-center gap-4 px-10 py-6 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] transition-all relative z-10 shadow-2xl">
                Iniciar Chat <ArrowRight className="h-5 w-5 group-hover:translate-x-3 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
