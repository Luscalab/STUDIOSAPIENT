
"use client";

import { Mail, MessageCircle, Phone, Copy, Send, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    <section id="contato" className="py-16 md:py-32 bg-[#0c0a1a] text-white relative rounded-[3rem] md:rounded-[6rem] mx-4 mb-20 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-6 text-white">
            VAMOS <br />
            <span className="text-primary italic font-medium">CONVERSAR?</span>
          </h3>
          <p className="text-lg md:text-xl text-white/40 font-medium tracking-tight">Escolha o canal que faz mais sentido para o seu momento.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {/* Card WhatsApp */}
          <div className="p-10 rounded-[3rem] bg-white text-black flex flex-col h-full border-t-[6px] border-primary shadow-xl group hover:-translate-y-2 transition-all duration-500">
            <div className="space-y-6 flex-1">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h4 className="font-headline text-2xl font-black tracking-tighter">WhatsApp</h4>
              <p className="text-black/40 font-medium text-sm">Inicie um diálogo imediato e tire suas dúvidas em tempo real.</p>
            </div>
            <div className="mt-10 space-y-2">
              <a 
                href={whatsappUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary text-white hover:bg-primary/90 text-[9px] font-black uppercase tracking-[0.3em] transition-all shadow-md"
              >
                <ExternalLink className="h-3 w-3" /> Iniciar Conversa
              </a>
            </div>
          </div>

          {/* Card E-mail */}
          <div className="p-10 rounded-[3rem] bg-[#121216] border border-white/5 text-white flex flex-col h-full border-t-[6px] border-primary shadow-xl group hover:-translate-y-2 transition-all duration-500">
            <div className="space-y-6 flex-1">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <h4 className="font-headline text-2xl font-black tracking-tighter">E-mail</h4>
              <p className="text-white/40 font-medium text-sm">Para solicitações formais ou detalhes técnicos do seu projeto.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-2">
              <a 
                href={`mailto:${contactData.email}`}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-black hover:bg-white/90 text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <Send className="h-3 w-3" /> Enviar E-mail
              </a>
              <button 
                onClick={() => handleCopy(contactData.email, "E-mail")} 
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <Copy className="h-3 w-3" /> Copiar Endereço
              </button>
            </div>
          </div>

          {/* Card Telefone */}
          <div className="p-10 rounded-[3rem] bg-white text-black flex flex-col h-full border-t-[6px] border-black shadow-xl group hover:-translate-y-2 transition-all duration-500">
            <div className="space-y-6 flex-1">
              <div className="h-14 w-14 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6" />
              </div>
              <h4 className="font-headline text-2xl font-black tracking-tighter">Telefone</h4>
              <p className="text-black/40 font-medium text-sm">Conexão direta para consultoria estratégica imediata.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-2">
              <a 
                href={`tel:${contactData.phoneDigits}`}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-black text-white hover:bg-black/90 text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <Phone className="h-3 w-3" /> Ligar Agora
              </a>
              <button 
                onClick={() => handleCopy(contactData.phone, "Telefone")} 
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-black/5 border border-black/10 hover:bg-black/10 text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <Copy className="h-3 w-3" /> Copiar Número
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
