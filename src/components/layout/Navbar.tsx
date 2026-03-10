
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, Settings } from "lucide-react";
import { useUser, useDoc, useFirestore } from "@/firebase";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { useMemoFirebase } from "@/firebase/provider";
import { doc } from "firebase/firestore";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const db = useFirestore();

  const adminRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'roles_admin', user.uid);
  }, [db, user]);

  const { data: adminData } = useDoc(adminRef);
  const isAdmin = !!adminData;

  const handleOpenChat = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  const navLinks = [
    { name: "Serviços", href: "/#servicos" },
    { name: "Blog", href: "/blog" },
    { name: "UrbeLudo", href: "/urbeludo" },
    { name: "Contato", href: "/#contato" },
  ];

  const logoUrl = "https://zyhfeonnlhucuhjvekid.supabase.co/storage/v1/object/sign/Images/sapient%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lOWZkYjhmNy01MDY3LTQzM2EtOTdjMi1iZjU4MmNiNjMyMTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2FwaWVudCBsb2dvLnBuZyIsImlhdCI6MTc3MjkzNDY0MSwiZXhwIjoxOTMwNjE0NjQxfQ.pkFq4jVl1iewAOv9apV1WAZkn4yA2Gv8CkEHaxUMPbM";

  return (
    <header className="absolute top-8 left-0 right-0 z-[150]" role="banner">
      <div className="container mx-auto px-6 flex items-center justify-between gap-8">
        <Link href="/" className="relative block w-[160px] h-[45px] lg:w-[320px] lg:h-[80px] transition-transform duration-700 hover:scale-105 shrink-0">
          <Image src={logoUrl} alt="studiosapient Logo" fill className="object-contain object-left drop-shadow-2xl" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 px-8 py-4 rounded-full glass-morphism border-white/5">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-[11px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-all relative group">
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          
          {isAdmin && (
            <Link href="/admin" className="text-[11px] uppercase tracking-[0.4em] font-black text-accent hover:text-white transition-all flex items-center gap-2">
              <Settings className="h-3 w-3" /> Painel
            </Link>
          )}

          <button onClick={handleOpenChat} className="text-[11px] uppercase tracking-[0.4em] font-black text-primary hover:text-white transition-all">Análise IA</button>
          
          <div className="w-px h-4 bg-white/10 mx-2" />
          <GoogleLoginButton />
        </nav>

        <button className="lg:hidden p-4 rounded-2xl bg-white/5 text-white border border-white/10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[160] bg-[#09080f] p-12 pt-48 hero-purple-mesh flex flex-col gap-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-3xl font-black text-white tracking-tighter uppercase" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>
          ))}
          {isAdmin && <Link href="/admin" className="text-3xl font-black text-accent tracking-tighter uppercase" onClick={() => setIsMobileMenuOpen(false)}>Painel</Link>}
          <GoogleLoginButton />
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-10 right-10 h-16 w-16 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10"><X size={32} /></button>
        </div>
      )}
    </header>
  );
}
