
'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

export default function BlogPage() {
  const db = useFirestore();

  const publicPostsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'blogPosts_public'), orderBy('publishedDate', 'desc'));
  }, [db]);

  const premiumPostsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'blogPosts_premium'), orderBy('publishedDate', 'desc'));
  }, [db]);

  const { data: publicPosts, isLoading: loadingPublic } = useCollection(publicPostsQuery);
  const { data: premiumPosts, isLoading: loadingPremium } = useCollection(premiumPostsQuery);

  const allPosts = [
    ...(publicPosts || []).map(p => ({ ...p, isPremium: false })),
    ...(premiumPosts || []).map(p => ({ ...p, isPremium: true }))
  ].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return (
    <main className="min-h-screen bg-[#08070b]">
      <Navbar />
      
      <section className="relative pt-64 pb-32 hero-purple-mesh overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-8 py-2 text-[10px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md">Dossiês de Conhecimento</Badge>
          <h1 className="font-headline text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] mb-12">
            Insights <span className="text-primary italic">Estratégicos</span>
          </h1>
          <p className="text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-tight tracking-tight">
            Análises técnicas sobre performance, design e o futuro da IA nos negócios.
          </p>
        </div>
      </section>

      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {allPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group relative bg-white/5 rounded-[3rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all shadow-2xl flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image src={post.featuredImageUri || "https://picsum.photos/seed/sapient/800/600"} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                {post.isPremium && (
                  <div className="absolute top-6 left-6 bg-primary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Lock className="h-3 w-3" /> Premium
                  </div>
                )}
              </div>
              <div className="p-10 flex flex-col flex-1 gap-6">
                <h2 className="text-3xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-white/40 text-lg font-medium leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/5">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{new Date(post.publishedDate).toLocaleDateString('pt-BR')}</span>
                  <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                    Ler Mais <ArrowRight className="h-3 w-3 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
