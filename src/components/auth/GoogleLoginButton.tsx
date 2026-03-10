
'use client';

import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { LogIn, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function GoogleLoginButton() {
  const auth = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    
    // Forçar seleção de conta para evitar loops de erro automáticos
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "[ ACESSO AUTORIZADO ]",
        description: "Bem-vindo ao ecossistema Sapient Studio.",
        className: "bg-black border-primary text-white font-black uppercase tracking-widest text-[10px]"
      });
    } catch (error: any) {
      // Tratar cancelamento do usuário de forma silenciosa
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        setIsLoading(false);
        return;
      }

      console.error("Erro de Autenticação:", error.code);
      
      if (error.code === 'auth/operation-not-allowed') {
        toast({
          variant: "destructive",
          title: "[ ERRO DE CONFIGURAÇÃO ]",
          description: "O login via Google não está ativado no Firebase Console. Ative-o em 'Authentication > Sign-in method'.",
          className: "font-black uppercase tracking-widest text-[10px]"
        });
      } else if (error.code === 'auth/popup-blocked') {
        toast({
          variant: "destructive",
          title: "[ BLOQUEIO DE POPUP ]",
          description: "O seu navegador bloqueou a janela de login. Por favor, permita popups para este site.",
          className: "font-black uppercase tracking-widest text-[10px]"
        });
      } else {
        toast({
          variant: "destructive",
          title: "[ FALHA NO LOGIN ]",
          description: "Não foi possível completar a autenticação. Tente novamente mais tarde.",
          className: "font-black uppercase tracking-widest text-[10px]"
        });
      }
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
  };

  if (user) {
    return (
      <Button variant="ghost" onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest gap-2 hover:text-primary transition-colors">
        <LogOut className="h-3 w-3" /> Sair
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
          <Loader2 className="h-3 w-3 animate-spin" /> Conectando...
        </>
      ) : (
        <>
          <LogIn className="h-3 w-3" /> Google Login
        </>
      )}
    </Button>
  );
}
