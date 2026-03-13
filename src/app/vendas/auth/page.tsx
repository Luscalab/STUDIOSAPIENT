
'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useFirebase, initiateEmailSignIn, initiateEmailSignUp, initiateGoogleSignIn } from "@/firebase";
import { useRouter } from "next/navigation";
import { Mail, Lock, Chrome, ArrowRight, Loader2, UserPlus, LogIn, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [mode, setStep] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth, user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push("/vendas/recrutamento");
    }
  }, [user, router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    try {
      if (mode === 'login') {
        initiateEmailSignIn(auth, email, password);
      } else {
        initiateEmailSignUp(auth, email, password);
      }
    } catch (err) {
      toast({ title: "Erro de Acesso", description: "Verifique suas credenciais.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    try {
      initiateGoogleSignIn(auth);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48 flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">
              Portal do Colaborador
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Sapient <span className="text-primary italic lowercase">studio.</span>
            </h1>
            <p className="text-white/40 text-sm font-medium">Acesse o ambiente de treinamento e recrutamento de elite.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl space-y-8">
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5">
              <button 
                onClick={() => setStep('login')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-primary text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
              >
                Entrar
              </button>
              <button 
                onClick={() => setStep('register')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'register' ? 'bg-primary text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="Seu e-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 h-14 pl-12 rounded-2xl font-bold focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    placeholder="Sua senha" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 h-14 pl-12 rounded-2xl font-bold focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <Button disabled={isLoading} className="w-full h-16 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                  <span className="flex items-center gap-2">
                    {mode === 'login' ? 'Acessar Dashboard' : 'Criar minha Conta'} 
                    <ArrowRight size={16} />
                  </span>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
                <span className="bg-[#0d0c14] px-4">Ou continue com</span>
              </div>
            </div>

            <Button 
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              variant="outline" 
              className="w-full h-16 border-white/10 hover:bg-white/5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3"
            >
              <Chrome size={18} className="text-primary" /> Login com Google
            </Button>
          </div>

          <p className="text-center text-[9px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">
            Ao acessar, você concorda com nossos termos de conduta comercial e proteção de dados proprietários da studiosapient.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
