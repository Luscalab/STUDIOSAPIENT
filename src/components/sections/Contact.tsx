"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle } from "lucide-react";

export function Contact() {
  const whatsappNumber = "5511959631870";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section id="contato" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="font-headline text-5xl md:text-7xl font-bold mb-10 tracking-tighter">Vamos conversar?</h2>
            <p className="text-muted-foreground/70 text-xl mb-16 max-w-md font-medium leading-relaxed">
              Estamos prontos para ouvir seus desafios e transformar sua visão em realidade. Entre em contato pelos canais oficiais.
            </p>
            
            <div className="space-y-10">
              <a href="mailto:sapientcontato@gmail.com" className="flex items-center gap-8 group w-fit">
                <div className="h-16 w-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-1">E-mail Profissional</p>
                  <p className="font-bold text-2xl tracking-tight">sapientcontato@gmail.com</p>
                </div>
              </a>
              
              <a href={`tel:+5511959631870`} className="flex items-center gap-8 group w-fit">
                <div className="h-16 w-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-1">Telefone</p>
                  <p className="font-bold text-2xl tracking-tight">+55 11 95963-1870</p>
                </div>
              </a>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-8 group w-fit">
                <div className="h-16 w-16 rounded-[1.5rem] bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#25D366] mb-1">WhatsApp Business</p>
                  <p className="font-bold text-2xl tracking-tight">Inicie uma conversa agora</p>
                </div>
              </a>
            </div>
          </div>

          <div className="p-12 md:p-16 rounded-[3.5rem] bg-secondary/30 border border-primary/5 premium-shadow">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Nome</label>
                  <Input placeholder="Seu nome" className="bg-white border-transparent h-16 px-6 rounded-2xl shadow-sm focus:ring-primary/10" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" className="bg-white border-transparent h-16 px-6 rounded-2xl shadow-sm focus:ring-primary/10" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Assunto</label>
                <Input placeholder="Como podemos ajudar?" className="bg-white border-transparent h-16 px-6 rounded-2xl shadow-sm focus:ring-primary/10" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Mensagem</label>
                <Textarea placeholder="Descreva seu projeto em detalhes..." className="min-h-[160px] bg-white border-transparent p-6 rounded-2xl shadow-sm focus:ring-primary/10" />
              </div>
              <Button className="w-full h-20 text-xl font-black bg-primary hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/20 transition-all uppercase tracking-widest">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
