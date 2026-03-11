
"use client";

import { Mail, MessageCircle, Phone, Copy, Send, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  
  const contactData = {
    email: "sapientcontato@gmail.com",
    phone: "+55 11 95963-1870",
    phoneDigits: "5511959631870",
    whatsappMsg: "Olá! Gostaria de saber mais sobre os serviços da studiosapient."
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `[ ${label.toUpperCase()} COPIADO ]`,
      description: "Pronto para uso na sua área de transferência.",
      className: "bg-black border-primary text-white font-black uppercase tracking-widest text-[9px]"
    });
  };

  const whatsappUrl = `https://wa.me/${contactData.phoneDigits}?text=${encodeURIComponent(contactData.whatsappMsg)}`;

  return (
    <section id="contato" className="py-10 md:py-24 bg-[#0c0a1a] text-white relative rounded-[2rem] md:rounded-[5rem] mx-4 mb-16 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h3 className="font-headline text-lg md:text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-3 md:mb-4 text-white uppercase">
            VAMOS <br />
            <span className="text-primary italic font-medium">CONVERSAR.</span>
          </h3>
          <p className="text-[8px] md:text-base text-white/30 font-medium tracking-[0.4em] uppercase px-4 text-balance">Canais Diretos de Estratégia</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 max-w-[1000px] mx-auto">
          {/* Card WhatsApp */}
          <div className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white text-black flex flex-col h-full border-t-[3px] md:border-t-[4px] border-primary shadow-xl group hover:-translate-y-1 transition-all duration-500">
            <div className="space-y-3 md:space-y-5 flex-1">
              <div className="h-8 w-8 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h4 className="font-headline text-base md:text-xl font-black tracking-tighter uppercase mb-1.5 md:mb-2">WhatsApp</h4>
                <p className="text-black/50 font-medium text-[9px] md:text-sm leading-relaxed">Diálogo imediato e consultoria técnica.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-8">
              <a 
                href={whatsappUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 md:py-4 rounded-lg md:rounded-xl bg-primary text-white hover:bg-primary/90 text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] transition-all shadow-md"
              >
                <ExternalLink className="h-2.5 w-2.5" /> Iniciar
              </a>
            </div>
          </div>

          {/* Card E-mail */}
          <div className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-[#121216] border border-white/5 text-white flex flex-col h-full border-t-[3px] md:border-t-[4px] border-primary shadow-xl group hover:-translate-y-1 transition-all duration-500">
            <div className="space-y-3 md:space-y-5 flex-1">
              <div className="h-8 w-8 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h4 className="font-headline text-base md:text-xl font-black tracking-tighter uppercase mb-1.5 md:mb-2">E-mail</h4>
                <p className="text-white/40 font-medium text-[9px] md:text-sm leading-relaxed">Solicitações e documentação de projetos.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-8 grid grid-cols-1 gap-1.5">
              <a 
                href={`mailto:${contactData.email}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 md:py-4 rounded-lg md:rounded-xl bg-white text-black hover:bg-white/90 text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <Send className="h-2.5 w-2.5" /> Enviar
              </a>
            </div>
          </div>

          {/* Card Telefone */}
          <div className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white text-black flex flex-col h-full border-t-[3px] md:border-t-[4px] border-black shadow-xl group hover:-translate-y-1 transition-all duration-500">
            <div className="space-y-3 md:space-y-5 flex-1">
              <div className="h-8 w-8 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                <Phone className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h4 className="font-headline text-base md:text-xl font-black tracking-tighter uppercase mb-1.5 md:mb-2">Telefone</h4>
                <p className="text-black/50 font-medium text-[9px] md:text-sm leading-relaxed">Conexão direta para estratégia e escala.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-8 grid grid-cols-1 gap-1.5">
              <a 
                href={`tel:${contactData.phoneDigits}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 md:py-4 rounded-lg md:rounded-xl bg-black text-white hover:bg-black/90 text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <Phone className="h-2.5 w-2.5" /> Ligar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
