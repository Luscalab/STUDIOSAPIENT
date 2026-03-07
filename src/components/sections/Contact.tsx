
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contato" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">Vamos conversar?</h2>
            <p className="text-muted-foreground mb-12 max-w-md">
              Estamos prontos para ouvir seus desafios e transformar sua visão em realidade. Entre em contato pelos canais oficiais ou preencha o formulário.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium text-lg">sapientcontato@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium text-lg">+55 (11) 98888-7777</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="h-14 w-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="h-6 w-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="font-medium text-lg">Inicie uma conversa agora</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 rounded-3xl bg-card border border-primary/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input placeholder="Seu nome" className="bg-background border-primary/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" className="bg-background border-primary/10 h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assunto</label>
                <Input placeholder="Como podemos ajudar?" className="bg-background border-primary/10 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensagem</label>
                <Textarea placeholder="Descreva seu projeto..." className="min-h-[120px] bg-background border-primary/10" />
              </div>
              <Button className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
