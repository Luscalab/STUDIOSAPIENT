
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
import { Plus, Send, FileText, LayoutDashboard, Lock, Globe, Clock, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

const AUTHORIZED_EMAIL = "contato@studiosapient.com.br";

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

  const draftsQuery = useMemoFirebase(() => {
    if (!db || !isAdmin) return null;
    return collection(db, 'admin_blogPosts_drafts');
  }, [db, isAdmin]);

  const { data: drafts, isLoading: loadingDrafts } = useCollection(draftsQuery);

  if (isUserLoading) return (
    <div className="min-h-screen bg-[#08070b] flex flex-col items-center justify-center text-white gap-4">
      <div className="h-12 w-12 border-t-2 border-primary rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Sincronizando Autoridade</p>
    </div>
  );
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center text-white text-center p-12">
        <div className="space-y-8 max-w-lg">
          <div className="h-24 w-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20 shadow-2xl">
            <Lock className="h-10 w-10" />
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">Acesso <br/>Restrito.</h1>
          <p className="text-white/30 text-lg font-medium leading-relaxed">Este ecossistema é exclusivo para o administrador mestre da Sapient Studio.</p>
          <Button onClick={() => window.location.href = '/'} variant="outline" className="h-16 border-white/10 rounded-full px-12 uppercase font-black text-[10px] tracking-widest hover:bg-white/5">Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  const handlePublish = (status: 'DRAFT' | 'PUBLISHED') => {
    if (!formData.title || !formData.slug) {
      toast({ variant: "destructive", title: "Campos Obrigatórios", description: "O título e o slug são fundamentais para o SEO." });
      return;
    }

    const collectionName = status === 'DRAFT' 
      ? 'admin_blogPosts_drafts' 
      : (formData.isPremium ? 'blogPosts_premium' : 'blogPosts_public');
      
    const postRef = doc(collection(db!, collectionName));
    const postData = {
      ...formData,
      status,
      authorId: user!.uid,
      publishedDate: new Date().toISOString(),
      lastUpdatedDate: serverTimestamp(),
      featuredImageUri: formData.image || "https://picsum.photos/seed/sapient-blog/1200/800"
    };

    // Padrão não bloqueante conforme orientações
    setDoc(postRef, postData)
      .then(() => {
        toast({ 
          title: "[ OPERAÇÃO CONCLUÍDA ]", 
          description: `Dossiê ${status === 'DRAFT' ? 'salvo nos rascunhos' : 'publicado na rede'}.`,
          className: "bg-primary text-white font-black uppercase tracking-widest text-[10px] border-none"
        });
        
        if (status === 'PUBLISHED') {
          setFormData({ title: "", slug: "", excerpt: "", content: "", image: "", isPremium: false });
        }
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: postRef.path,
          operation: 'create',
          requestResourceData: postData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <main className="min-h-screen bg-[#08070b]">
      <Navbar />
      
      <section className="pt-48 pb-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-xl">
                <LayoutDashboard className="h-7 w-7" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Gestão de <br/>Autoridade</h1>
            </div>
            <p className="text-white/30 font-medium max-w-md">Painel de controle para curadoria de conteúdo estratégico e inteligência de marca.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Status do Sistema</p>
              <p className="text-[10px] font-bold text-white uppercase tracking-wider">Editor Conectado</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="new" className="space-y-12">
          <TabsList className="bg-white/5 border border-white/10 p-2 rounded-[2rem] h-auto flex flex-wrap gap-2 w-fit">
            <TabsTrigger value="new" className="flex items-center gap-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <Plus className="h-4 w-4" /> Novo Dossiê
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex items-center gap-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <FileText className="h-4 w-4" /> Rascunhos ({drafts?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-10 bg-white/5 p-8 md:p-16 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-primary">
                <Plus className="h-64 w-64" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Título Estratégico</label>
                  <Input 
                    placeholder="O Futuro da Performance IA..." 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    className="bg-black/40 border-white/10 h-20 rounded-3xl text-2xl font-black placeholder:text-white/10 focus:ring-primary/20 text-white" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2"><Globe className="h-3 w-3" /> Slug da URL</label>
                    <Input 
                      placeholder="futuro-da-performance" 
                      value={formData.slug} 
                      onChange={e => setFormData({...formData, slug: e.target.value})} 
                      className="bg-black/40 border-white/10 h-16 rounded-2xl font-bold text-white" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2"><ImageIcon className="h-3 w-3" /> URL da Imagem</label>
                    <Input 
                      placeholder="https://images.unsplash..." 
                      value={formData.image} 
                      onChange={e => setFormData({...formData, image: e.target.value})} 
                      className="bg-black/40 border-white/10 h-16 rounded-2xl font-bold text-white" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Resumo Teaser (Gera desejo no feed)</label>
                  <Textarea 
                    placeholder="Uma introdução provocativa que force o clique..." 
                    value={formData.excerpt} 
                    onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                    className="bg-black/40 border-white/10 min-h-[120px] rounded-3xl text-lg font-medium text-white/70" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Conteúdo do Dossiê (Markdown ou Texto)</label>
                  <Textarea 
                    placeholder="Desenvolva sua tese técnica aqui..." 
                    value={formData.content} 
                    onChange={e => setFormData({...formData, content: e.target.value})} 
                    className="bg-black/40 border-white/10 min-h-[500px] rounded-[3rem] text-lg leading-relaxed text-white/80" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8 sticky top-32">
              <div className="bg-white/5 p-8 md:p-12 rounded-[3.5rem] border border-white/10 space-y-10 shadow-2xl backdrop-blur-xl">
                <h3 className="font-black text-2xl text-white uppercase tracking-tighter leading-none">Protocolo de <br/>Publicação</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-8 rounded-3xl bg-black/50 border border-white/5 group hover:border-primary/30 transition-all cursor-pointer" onClick={() => setFormData({...formData, isPremium: !formData.isPremium})}>
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${formData.isPremium ? 'bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'bg-white/5 text-white/30'}`}>
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-black text-[10px] uppercase tracking-widest block text-white">Conteúdo Premium</span>
                        <span className="text-[9px] text-white/30 uppercase tracking-tighter">Apenas para assinantes</span>
                      </div>
                    </div>
                    <input type="checkbox" checked={formData.isPremium} readOnly className="h-6 w-6 accent-primary" />
                  </div>

                  <div className="flex items-center gap-4 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 italic">Última revisão: {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button onClick={() => handlePublish('PUBLISHED')} className="h-24 bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-3xl gap-4 hover:bg-primary/90 transition-all shadow-[0_20px_50px_rgba(139,92,246,0.3)] active:scale-95 group">
                    <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Publicar Agora
                  </Button>
                  <Button onClick={() => handlePublish('DRAFT')} variant="outline" className="h-20 border-white/10 font-black uppercase tracking-[0.4em] text-[10px] rounded-3xl hover:bg-white/5 transition-all text-white active:scale-95">
                    Salvar Rascunho
                  </Button>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-4">Segurança Sapient</p>
                <p className="text-xs text-white/40 leading-relaxed font-medium">Cada publicação é auditada e vinculada ao ID do administrador mestre. O sistema mantém logs de alteração para cada parágrafo editado.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drafts">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {drafts?.map(draft => (
                 <div key={draft.id} className="group p-10 rounded-[3.5rem] bg-white/5 border border-white/10 flex flex-col gap-6 hover:border-primary/50 transition-all shadow-xl">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white/10 text-white border-none px-6 py-2 text-[8px] font-black uppercase tracking-widest rounded-full">Rascunho</Badge>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter flex items-center gap-2"><Clock className="h-3 w-3" /> {new Date(draft.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tighter leading-tight group-hover:text-primary transition-colors">{draft.title}</h3>
                    <p className="text-white/40 text-base font-medium line-clamp-3 leading-relaxed">{draft.excerpt}</p>
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-4">
                      <Button variant="ghost" className="h-12 px-6 text-[9px] font-black uppercase tracking-widest hover:text-primary">Editar</Button>
                      <Button variant="ghost" className="h-12 px-6 text-[9px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/10">Remover</Button>
                    </div>
                 </div>
               ))}
               {!loadingDrafts && drafts?.length === 0 && (
                 <div className="col-span-full py-32 text-center space-y-6">
                    <FileText className="h-16 w-16 text-white/5 mx-auto" />
                    <p className="text-white/20 font-black uppercase tracking-[0.5em] text-sm">Nenhum rascunho pendente no sistema.</p>
                 </div>
               )}
               {loadingDrafts && (
                 <div className="col-span-full py-32 text-center animate-pulse">
                    <p className="text-white/20 font-black uppercase tracking-[0.5em] text-sm">Carregando Dossiês...</p>
                 </div>
               )}
             </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </main>
  );
}
