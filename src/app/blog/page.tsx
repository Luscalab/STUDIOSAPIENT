
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useMemoFirebase, useUser, useDoc } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Settings } from "lucide-react";

const ADMIN_EMAIL = "sapientcontato@gmail.com";

export default function BlogPage() {
  const { user } = useUser();
  const db = useFirestore();

  const publicPostsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'blogPosts_public'), orderBy('publishedDate', 'desc'));
  }, [db]);

  const premiumCheckRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'premium_users', user.uid);
  }, [db, user]);

  const { data: premiumData } = useDoc(premiumCheckRef);
  
  const isAdmin = user?.email === ADMIN_EMAIL;
  const isPremiumOrAdmin = !!premiumData || isAdmin;

  const premiumPostsQuery = useMemoFirebase(() => {
    if (!db || !isPremiumOrAdmin) return null;
    return query(collection(db, 'blogPosts_premium'), orderBy('publishedDate', 'desc'));
  }, [db, isPremiumOrAdmin]);

  const { data: publicPosts, isLoading: loadingPublic } = useCollection(publicPostsQuery);
  const { data: premiumPosts, isLoading: loadingPremium } = useCollection(premiumPostsQuery);

  const allPosts = [
    ...(publicPosts || []).map(p => ({ ...p, isPremium: false })),
    ...(premiumPosts || []).map(p => ({ ...p, isPremium: true }))
  ].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return (
    <main className="min-h-screen bg-[#08070b]">
      <Navbar />
      
      <section className="relative pt-48 md:pt-64 pb-20 md:pb-32 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Dossiês de Conhecimento</Badge>
          <h1 className="font-headline text-5xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] mb-8 md:mb-12 text-balance">
            Insights <span className="text-primary italic">Estratégicos</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-tight tracking-tight mb-12 md:mb-16 text-balance">
            Análises técnicas sobre performance, design e o futuro da IA nos negócios.
          </p>

          {isAdmin && (
            <Link href="/admin" className="inline-flex items-center gap-4 bg-primary text-white px-10 md:px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:scale-105 transition-all shadow-2xl shadow-primary/30">
              <Settings className="h-4 w-4" /> Gerenciar Dossiês
            </Link>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 container mx-auto px-6">
        {(loadingPublic || (isPremiumOrAdmin && loadingPremium)) && (
          <div className="text-center text-white/20 font-black uppercase tracking-widest animate-pulse mb-12 flex flex-col items-center gap-4">
            <div className="h-8 w-8 border-t-2 border-primary rounded-full animate-spin" />
            Sincronizando Dossiês...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {allPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group relative bg-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all shadow-2xl flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image src={post.featuredImageUri || "https://picsum.photos/seed/sapient/800/600"} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                {post.isPremium && (
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-primary text-white px-5 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Lock className="h-2.5 w-2.5 md:h-3 md:w-3" /> Premium
                  </div>
                )}
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1 gap-5 md:gap-6">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto pt-6 md:pt-8 flex items-center justify-between border-t border-white/5">
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{new Date(post.publishedDate).toLocaleDateString('pt-BR')}</span>
                  <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest">
                    Ler <ArrowRight className="h-3 w-3 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!loadingPublic && allPosts.length === 0 && (
          <div className="text-center py-24 space-y-8">
            <Settings className="h-16 w-16 text-white/5 mx-auto" />
            <p className="text-white/20 font-black uppercase tracking-widest">Nenhum dossiê publicado no momento.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
