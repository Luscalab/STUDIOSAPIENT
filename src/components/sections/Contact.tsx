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
    <section id="contato" className="py-16 md:py-32 bg-[#0c0a1a] text-white relative rounded-[2.5rem] md:rounded-[5rem] mx-4 mb-16 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 mb-2">Canais de Consultoria</p>
          <h2 className="font-headline text-2xl md:text-7xl font-black tracking-tighter leading-[0.85] text-white uppercase">
            Vamos <br />
            <span className="text-primary italic font-medium">Conversar.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1000px] mx-auto">
          {/* Card WhatsApp */}
          <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white text-black flex flex-col h-[240px] md:h-[350px] border-t-4 border-primary shadow-xl group transition-all">
            <div className="space-y-4 flex-1">
              <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <h4 className="font-headline text-lg md:text-2xl font-black tracking-tighter uppercase mb-2">WhatsApp</h4>
                <p className="text-black/50 font-medium text-[10px] md:text-base leading-relaxed">Diálogo imediato e consultoria técnica.</p>
              </div>
            </div>
            <a 
              href={whatsappUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 md:py-5 rounded-xl bg-primary text-white hover:bg-primary/90 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all"
            >
              <ExternalLink className="h-3 w-3" /> Iniciar
            </a>
          </div>

          {/* Card E-mail */}
          <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-[#121216] border border-white/5 text-white flex flex-col h-[240px] md:h-[350px] border-t-4 border-primary shadow-xl group transition-all">
            <div className="space-y-4 flex-1">
              <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <h4 className="font-headline text-lg md:text-2xl font-black tracking-tighter uppercase mb-2">E-mail</h4>
                <p className="text-white/40 font-medium text-[10px] md:text-base leading-relaxed">Solicitações e documentação de projetos.</p>
              </div>
            </div>
            <a 
              href={`mailto:${contactData.email}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 md:py-5 rounded-xl bg-white text-black hover:bg-white/90 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all"
            >
              <Send className="h-3 w-3" /> Enviar
            </a>
          </div>

          {/* Card Telefone */}
          <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white text-black flex flex-col h-[240px] md:h-[350px] border-t-4 border-black shadow-xl group transition-all">
            <div className="space-y-4 flex-1">
              <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <h4 className="font-headline text-lg md:text-2xl font-black tracking-tighter uppercase mb-2">Telefone</h4>
                <p className="text-black/50 font-medium text-[10px] md:text-base leading-relaxed">Conexão direta para estratégia e escala.</p>
              </div>
            </div>
            <a 
              href={`tel:${contactData.phoneDigits}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 md:py-5 rounded-xl bg-black text-white hover:bg-black/90 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all"
            >
              <Phone className="h-3 w-3" /> Ligar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}