
"use client";

import { Mail, Phone, MessageCircle, Copy, Check } from "lucide-react";
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
    // Impede que o clique no botão de cópia dispare o link (discador ou email)
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copiado!",
      description: `${type === 'email' ? 'E-mail' : 'Telefone'} copiado para a área de transferência.`,
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
    <section id="contato" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-headline text-5xl md:text-8xl font-bold mb-10 tracking-tighter leading-none">
            Vamos conversar?
          </h2>
          <p className="text-muted-foreground/60 text-xl md:text-2xl mb-20 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight text-balance">
            Estamos prontos para ouvir seus desafios e transformar sua visão em realidade através dos nossos canais de atendimento direto.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Card */}
            <a 
              href={`mailto:${email}`} 
              className="flex flex-col items-center p-12 rounded-[3.5rem] bg-white border border-primary/10 hover:bg-primary transition-all duration-500 shadow-sm h-full group relative overflow-hidden"
            >
              <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500">
                <Mail className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary group-hover:text-white/80 mb-3 transition-colors">E-mail Profissional</p>
              <p className="font-bold text-lg md:text-xl tracking-tight break-all mb-8 text-foreground group-hover:text-white transition-colors">{email}</p>
              
              <button 
                onClick={(e) => handleCopy(e, email, 'email')}
                className="mt-auto flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 group-hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-all text-primary group-hover:text-white"
              >
                {copiedEmail ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                {copiedEmail ? "Copiado" : "Copiar E-mail"}
              </button>
            </a>
            
            {/* Phone Card */}
            <a 
              href={`tel:${phone.replace(/\D/g, '')}`} 
              className="flex flex-col items-center p-12 rounded-[3.5rem] bg-white border border-primary/10 hover:bg-primary transition-all duration-500 shadow-sm h-full group relative overflow-hidden"
            >
              <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500">
                <Phone className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary group-hover:text-white/80 mb-3 transition-colors">Atendimento</p>
              <p className="font-bold text-lg md:text-xl tracking-tight mb-8 text-foreground group-hover:text-white transition-colors">{phone}</p>
              
              <button 
                onClick={(e) => handleCopy(e, phone, 'phone')}
                className="mt-auto flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 group-hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-all text-primary group-hover:text-white"
              >
                {copiedPhone ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                {copiedPhone ? "Copiado" : "Copiar Número"}
              </button>
            </a>

            {/* WhatsApp Card */}
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-12 rounded-[3.5rem] bg-[#25D366]/5 border border-[#25D366]/20 hover:bg-[#25D366] transition-all duration-500 shadow-sm h-full group relative overflow-hidden"
            >
              <div className="h-20 w-20 rounded-3xl bg-[#25D366]/10 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500">
                <MessageCircle className="h-8 w-8 text-[#25D366] group-hover:text-white transition-colors" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#25D366] group-hover:text-white/80 mb-3 transition-colors">WhatsApp Business</p>
              <p className="font-bold text-lg md:text-xl tracking-tight uppercase text-foreground group-hover:text-white transition-colors">Inicie Agora</p>
              <p className="mt-4 text-[10px] font-medium opacity-60 text-muted-foreground group-hover:text-white/70 transition-colors">Resposta em tempo real</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
