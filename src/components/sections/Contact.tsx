
"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";

export function Contact() {
  const whatsappNumber = "5511959631870";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section id="contato" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-headline text-5xl md:text-8xl font-bold mb-10 tracking-tighter leading-none">
            Vamos conversar?
          </h2>
          <p className="text-muted-foreground/60 text-xl md:text-2xl mb-20 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
            Estamos prontos para ouvir seus desafios e transformar sua visão em realidade através dos nossos canais de atendimento direto.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Card */}
            <a 
              href="mailto:sapientcontato@gmail.com" 
              className="flex flex-col items-center p-12 rounded-[3.5rem] card-premium-bg border border-primary/5 hover:bg-primary hover:text-white transition-all duration-700 group shadow-sm"
            >
              <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500 shadow-inner">
                <Mail className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary group-hover:text-white/80 mb-3">E-mail Profissional</p>
              <p className="font-bold text-lg md:text-xl tracking-tight break-all">sapientcontato@gmail.com</p>
            </a>
            
            {/* Phone Card */}
            <a 
              href={`tel:+5511959631870`} 
              className="flex flex-col items-center p-12 rounded-[3.5rem] card-premium-bg border border-primary/5 hover:bg-primary hover:text-white transition-all duration-700 group shadow-sm"
            >
              <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500 shadow-inner">
                <Phone className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary group-hover:text-white/80 mb-3">Atendimento</p>
              <p className="font-bold text-lg md:text-xl tracking-tight">+55 11 95963-1870</p>
            </a>

            {/* WhatsApp Card */}
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-12 rounded-[3.5rem] bg-[#25D366]/5 border border-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-all duration-700 group shadow-sm"
            >
              <div className="h-20 w-20 rounded-3xl bg-[#25D366]/10 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500 shadow-inner">
                <MessageCircle className="h-8 w-8 text-[#25D366] group-hover:text-white" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#25D366] group-hover:text-white/80 mb-3">WhatsApp Business</p>
              <p className="font-bold text-lg md:text-xl tracking-tight uppercase">Inicie Agora</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
