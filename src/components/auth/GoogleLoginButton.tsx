
'use client';

import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { LogIn, LogOut } from "lucide-react";

export function GoogleLoginButton() {
  const auth = useAuth();
  const { user } = useUser();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (user) {
    return (
      <Button variant="ghost" onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest gap-2">
        <LogOut className="h-3 w-3" /> Sair
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={handleLogin} className="text-[10px] font-black uppercase tracking-widest gap-2 bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all">
      <LogIn className="h-3 w-3" /> Google Login
    </Button>
  );
}
