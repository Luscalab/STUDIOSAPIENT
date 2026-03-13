
'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Search, 
  Filter, 
  Mic, 
  ChevronRight, 
  Loader2, 
  ShieldCheck, 
  ArrowLeft,
  Calendar,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useFirebase, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminClient() {
  const { user, isUserLoading } = useFirebase();
  const db = useFirestore();
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = user?.email === "lucassouza.sou@gmail.com" || user?.email === "contato@studiosapient.com.br";

  const candidatesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'sales_candidates'), orderBy('timestamp', 'desc'));
  }, [db]);

  const { data: candidates, isLoading: isCandidatesLoading } = useCollection(candidatesQuery);

  useEffect(() => {
    if (!isUserLoading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [user, isUserLoading, isAdmin, router]);

  if (isUserLoading || isCandidatesLoading) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const filteredCandidates = candidates?.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = async (id: string, status: string) => {
    try {
      const docRef = doc(db, 'sales_candidates', id);
      await updateDoc(docRef, { status });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">
                Central de Inteligência Sapient
              </Badge>
              <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Gestão de <span className="text-primary italic lowercase">talentos.</span>
              </h1>
            </div>
            
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar candidato..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-6 rounded-2xl font-bold focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LISTA DE CANDIDATOS */}
            <div className={cn("space-y-4", selectedCandidate ? "lg:col-span-4 hidden lg:block" : "lg:col-span-12")}>
              {filteredCandidates?.length === 0 ? (
                <div className="p-20 text-center bg-white/5 border border-white/10 rounded-[3rem] space-y-4">
                  <Users className="h-12 w-12 text-white/10 mx-auto" />
                  <p className="text-white/30 font-bold uppercase tracking-widest text-[10px]">Nenhum dossiê encontrado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {filteredCandidates?.map((c) => (
                    <button 
                      key={c.id}
                      onClick={() => setSelectedCandidate(c)}
                      className={cn(
                        "w-full text-left p-6 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden",
                        selectedCandidate?.id === c.id 
                          ? "bg-primary border-primary shadow-2xl shadow-primary/20" 
                          : "bg-white/5 border-white/10 hover:border-white/30"
                      )}
                    >
                      <div className="relative z-10 flex justify-between items-start">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <h3 className="font-black uppercase tracking-tight text-sm">{c.name}</h3>
                            <p className={cn("text-[10px] font-bold uppercase tracking-widest", selectedCandidate?.id === c.id ? "text-white/60" : "text-white/30")}>
                              {c.cityState || 'Localização não informada'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={cn(
                              "text-[8px] font-black px-3 py-1 uppercase border-none",
                              c.status === 'APROVADO' ? "bg-green-500 text-white" : 
                              c.status === 'REPROVADO' ? "bg-red-500 text-white" : "bg-amber-500 text-black"
                            )}>
                              {c.status?.replace('_', ' ') || 'PENDENTE'}
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className={cn("h-5 w-5 transition-transform", selectedCandidate?.id === c.id ? "translate-x-1" : "text-white/20")} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DETALHE DO CANDIDATO */}
            {selectedCandidate ? (
              <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-4">
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl space-y-12">
                  <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
                    <div className="space-y-6">
                      <button onClick={() => setSelectedCandidate(null)} className="lg:hidden flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-4">
                        <ArrowLeft size={14} /> Voltar para lista
                      </button>
                      <div className="space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{selectedCandidate.name}</h2>
                        <div className="flex flex-wrap gap-4 text-white/40 text-xs font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-2"><Clock size={14} /> {selectedCandidate.timestamp?.toDate().toLocaleDateString('pt-BR')}</span>
                          <span className="flex items-center gap-2"><MapPin size={14} /> {selectedCandidate.cityState}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <a href={`https://wa.me/${selectedCandidate.phone?.replace(/\D/g, '')}`} target="_blank" className="h-12 px-6 bg-green-500/10 text-green-500 rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-green-500 hover:text-white transition-all">
                          <MessageCircle size={16} /> WhatsApp
                        </a>
                        <a href={`mailto:${selectedCandidate.email}`} className="h-12 px-6 bg-primary/10 text-primary rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-primary hover:text-white transition-all">
                          <Clock size={16} /> E-mail
                        </a>
                        {selectedCandidate.instagram && (
                          <a href={`https://instagram.com/${selectedCandidate.instagram.replace('@', '')}`} target="_blank" className="h-12 px-6 bg-pink-500/10 text-pink-500 rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-pink-500 hover:text-white transition-all">
                            <Instagram size={16} /> Instagram
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-48">
                      <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.3em] mb-2">Alterar Status</p>
                      <button onClick={() => updateStatus(selectedCandidate.id, 'APROVADO')} className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white transition-all text-[9px] font-black uppercase">
                        Aprovar <CheckCircle2 size={14} />
                      </button>
                      <button onClick={() => updateStatus(selectedCandidate.id, 'REPROVADO')} className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase">
                        Reprovar <XCircle size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="space-y-6">
                      <h4 className="text-primary font-black uppercase text-[10px] tracking-[0.4em] flex items-center gap-3">
                        <ShieldCheck size={16} /> Respostas Técnicas
                      </h4>
                      {[
                        { label: "Performance Ads & GMN", val: selectedCandidate.ansAds },
                        { label: "Engenharia de Sites", val: selectedCandidate.ansSites },
                        { label: "Design & Semiótica", val: selectedCandidate.ansDesign },
                        { label: "IA & Atendimento", val: selectedCandidate.ansChat },
                        { label: "Social & Autoridade", val: selectedCandidate.ansSocial },
                        { label: "Estratégia de Nicho", val: selectedCandidate.ansNichos },
                        { label: "Negociação de Valor", val: selectedCandidate.ansPreco },
                      ].map((ans, i) => (
                        <div key={i} className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                          <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">{ans.label}</p>
                          <p className="text-sm font-medium leading-relaxed text-white/80">{ans.val || 'Não respondido.'}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-8">
                      <h4 className="text-primary font-black uppercase text-[10px] tracking-[0.4em] flex items-center gap-3">
                        <Mic size={16} /> Provas Vocais
                      </h4>
                      
                      <div className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                          <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase text-primary">01. O Desafio do Cirurgião</p>
                            <p className="text-[10px] text-white/40 font-medium">Resposta à objeção de site lento e GMN.</p>
                          </div>
                          {selectedCandidate.audioObjeçãoAds ? (
                            <audio controls className="w-full h-10 filter invert opacity-80">
                              <source src={selectedCandidate.audioObjeçãoAds} type="audio/webm" />
                            </audio>
                          ) : <p className="text-xs text-red-400/50 font-bold uppercase italic">Áudio não disponível.</p>}
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6">
                          <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase text-primary">02. Pitch Final de Elite</p>
                            <p className="text-[10px] text-white/40 font-medium">Por que deve ser contratado?</p>
                          </div>
                          {selectedCandidate.pitchAudioUri ? (
                            <audio controls className="w-full h-10 filter invert opacity-80">
                              <source src={selectedCandidate.pitchAudioUri} type="audio/webm" />
                            </audio>
                          ) : <p className="text-xs text-red-400/50 font-bold uppercase italic">Áudio não disponível.</p>}
                        </div>
                      </div>

                      <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 space-y-4">
                        <h5 className="flex items-center gap-2 text-amber-400 font-black uppercase text-[10px]"><AlertCircle size={14} /> Dados de Perfil</h5>
                        <div className="grid grid-cols-2 gap-4 text-[10px]">
                          <div>
                            <p className="text-white/20 font-bold uppercase">Ocupação Atual</p>
                            <p className="font-bold">{selectedCandidate.currentOccupation || '-'}</p>
                          </div>
                          <div>
                            <p className="text-white/20 font-bold uppercase">Experiência</p>
                            <p className="font-bold">{selectedCandidate.experience || '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-8 hidden lg:flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-[3rem] p-20 text-center space-y-6">
                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                  <Filter size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white/20">Selecione um candidato</h3>
                  <p className="text-white/10 font-bold uppercase tracking-widest text-[10px]">Para visualizar o dossiê completo e audições.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
