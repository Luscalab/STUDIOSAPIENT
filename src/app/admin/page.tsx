'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useCollection } from "@/firebase";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Send, FileText, LayoutDashboard, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AUTHORIZED_EMAIL = "sapientcontato@gmail.com";

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    isPremium: false
  });

  const isAdmin = user?.email === AUTHORIZED_EMAIL;

  // Só consulta rascunhos se o usuário for o administrador autorizado
  const draftsQuery = useMemoFirebase(() => {
    if (!db || !isAdmin) return null;
    return collection(db, 'admin_blogPosts_drafts');
  }, [db, isAdmin]);

  const { data: drafts } = useCollection(draftsQuery);

  if (isUserLoading) return <div className="min-h-screen bg-[#08070b] flex items-center justify-center text-white">Verificando Credenciais...</div>;
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center text-white text-center p-12">
        <div className="space-y-6">
          <Lock className="h-16 w-16 text-primary mx-auto mb-8" />
          <h1 className="text-4xl font-black uppercase tracking-tighter">Acesso Restrito.</h1>
          <p className="text-white/20 text-lg font-medium">Área exclusiva para o administrador mestre Sapient Studio.</p>
          <Button onClick={() => window.location.href = '/'} variant="outline" className="mt-8 border-white/10 rounded-full px-12">Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  const handlePublish = async (status: 'DRAFT' | 'PUBLISHED') => {
    if (!formData.title || !formData.slug) {
      toast({ variant: "destructive", title: "Erro", description: "Título e Slug são obrigatórios." });
      return;
    }

    const collectionName = status === 'DRAFT' 
      ? 'admin_blogPosts_drafts' 
      : (formData.isPremium ? 'blogPosts_premium' : 'blogPosts_public');
      
    const postRef = doc(collection(db!, collectionName));

    try {
      await setDoc(postRef, {
        ...formData,
        status,
        authorId: user!.uid,
        publishedDate: new Date().toISOString(),
        lastUpdatedDate: serverTimestamp(),
        featuredImageUri: formData.image || "https://picsum.photos/seed/sapient-blog/1200/800"
      });
      
      toast({ title: "Sucesso!", description: `Post ${status === 'DRAFT' ? 'salvo' : 'publicado'} com sucesso.` });
      setFormData({ title: "", slug: "", excerpt: "", content: "", image: "", isPremium: false });
    } catch (e) {
      toast({ variant: "destructive", title: "Erro", description: "Falha ao processar postagem. Verifique suas permissões." });
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b]">
      <Navbar />
      
      <section className="pt-48 pb-24 container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Painel de Autoridade</h1>
        </div>

        <Tabs defaultValue="new" className="space-y-12">
          <TabsList className="bg-white/5 border border-white/10 p-2 rounded-2xl h-auto flex flex-wrap gap-2">
            <TabsTrigger value="new" className="flex items-center gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-primary"><Plus className="h-4 w-4" /> Nova Publicação</TabsTrigger>
            <TabsTrigger value="drafts" className="flex items-center gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-primary"><FileText className="h-4 w-4" /> Rascunhos ({drafts?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8 bg-white/5 p-12 rounded-[3.5rem] border border-white/10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Título Estratégico</label>
                <Input placeholder="O Futuro da Performance..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-black/50 border-white/10 h-16 rounded-2xl text-xl font-bold" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">Slug URL</label>
                  <Input placeholder="futuro-da-performance" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="bg-black/50 border-white/10 h-14 rounded-2xl" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">Imagem de Capa (URL)</label>
                  <Input placeholder="https://..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="bg-black/50 border-white/10 h-14 rounded-2xl" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Resumo Teaser</label>
                <Textarea placeholder="Breve introdução que gera desejo..." value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="bg-black/50 border-white/10 min-h-[100px] rounded-3xl" />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Conteúdo do Dossiê</label>
                <Textarea placeholder="Desenvolva sua tese aqui..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="bg-black/50 border-white/10 min-h-[400px] rounded-3xl" />
              </div>
            </div>

            <div className="space-y-8 sticky top-32">
              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-8">
                <h3 className="font-black text-xl text-white uppercase tracking-tighter">Status da Intervenção</h3>
                
                <div className="flex items-center justify-between p-6 rounded-2xl bg-black/50 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-primary" />
                    <span className="font-bold text-sm">Post Premium?</span>
                  </div>
                  <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({...formData, isPremium: e.target.checked})} className="h-6 w-6 accent-primary" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button onClick={() => handlePublish('PUBLISHED')} className="h-16 bg-primary text-white font-black uppercase tracking-widest rounded-2xl gap-3 hover:bg-primary/90 transition-all shadow-xl"><Send className="h-4 w-4" /> Publicar Dossiê</Button>
                  <Button onClick={() => handlePublish('DRAFT')} variant="outline" className="h-16 border-white/10 font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 transition-all text-white">Salvar Rascunho</Button>
                </div>
              </div>

              <div className="bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Protocolo de Segurança</p>
                <p className="text-xs text-white/40 leading-relaxed">Você está autenticado como administrador mestre. Cada publicação é auditada pelo sistema de e-mail exclusivo da Sapient Studio.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drafts">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {drafts?.map(draft => (
                 <div key={draft.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col gap-4">
                    <h3 className="text-2xl font-black text-white tracking-tighter">{draft.title}</h3>
                    <p className="text-white/40 text-sm line-clamp-2">{draft.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge className="bg-white/10 text-white border-none px-4 py-1">Rascunho</Badge>
                      <span className="text-[10px] font-black uppercase text-white/20">Editado em: {new Date(draft.publishedDate).toLocaleDateString()}</span>
                    </div>
                 </div>
               ))}
               {drafts?.length === 0 && <p className="text-white/20 font-black uppercase tracking-widest col-span-full py-12 text-center">Nenhum rascunho encontrado.</p>}
             </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </main>
  );
}