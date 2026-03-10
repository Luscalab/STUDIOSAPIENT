
'use client';

import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { LogIn, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AUTHORIZED_EMAIL = "sapientcontato@gmail.com";

export function GoogleLoginButton() {
  const auth = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      
      if (result.user.email === AUTHORIZED_EMAIL) {
        toast({
          title: "[ ACESSO AUTORIZADO ]",
          description: "Bem-vindo ao Painel de Autoridade Sapient.",
          className: "bg-black border-primary text-white font-black uppercase tracking-widest text-[10px]"
        });
        router.push('/admin');
      } else {
        toast({
          title: "[ ACESSO CLIENTE ]",
          description: "Redirecionando para o Blog.",
          className: "bg-black border-white/20 text-white font-black uppercase tracking-widest text-[10px]"
        });
        router.push('/blog');
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        setIsLoading(false);
        return;
      }
      
      toast({
        variant: "destructive",
        title: "[ FALHA NO LOGIN ]",
        description: "Não foi possível completar a autenticação.",
        className: "font-black uppercase tracking-widest text-[10px]"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    toast({
      title: "[ SESSÃO ENCERRADA ]",
      description: "Você saiu com segurança do painel.",
      className: "bg-black border-white/20 text-white font-black uppercase tracking-widest text-[10px]"
    });
    router.push('/');
  };

  if (user) {
    return (
      <Button variant="ghost" onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest gap-2 hover:text-primary transition-colors">
        <LogOut className="h-3 w-3" /> Encerrar Gestão
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleLogin} 
      disabled={isLoading}
      className="text-[10px] font-black uppercase tracking-widest gap-2 bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all min-w-[140px]"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" /> Autenticando...
        </>
      ) : (
        <>
          <LogIn className="h-3 w-3" /> Entrar com Google
        </>
      )}
    </Button>
  );
}
