
'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  ChevronRight, 
  Loader2, 
  ShieldCheck, 
  ArrowLeft,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogOut,
  Zap,
  Mic,
  Mail,
  Brain,
  Code,
  FileText,
  TrendingUp,
  Palette,
  Target,
  PieChart,
  UserCheck,
  Contact2,
  Download,
  ExternalLink
} from "lucide-react";
import { useFirebase, useFirestore, useCollection, useMemoFirebase, initiateSignOut, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminClient() {
  const { auth, user, isUserLoading } = useFirebase();
  const db = useFirestore();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'candidates' | 'profiles'>('candidates');
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = user?.email === "lucassouza.sou@gmail.com" || user?.email === "contato@studiosapient.com.br";

  // Query para Dossiês (Sales Candidates)
  const candidatesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'sales_candidates'), orderBy('timestamp', 'desc'));
  }, [db]);

  // Query para Usuários (Sales Profiles)
  const profilesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'sales_profiles'), orderBy('consentTimestamp', 'desc'));
  }, [db]);

  const { data: candidates, isLoading: isCandidatesLoading } = useCollection(candidatesQuery);
  const { data: profiles, isLoading: isProfilesLoading } = useCollection(profilesQuery);

  useEffect(() => {
    if (!isUserLoading && (!user || !isAdmin)) {
      router.push("/vendas/auth");
    }
  }, [user, isUserLoading, isAdmin, router]);

  if (isUserLoading || isCandidatesLoading || isProfilesLoading) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const filteredCandidates = candidates?.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProfiles = profiles?.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = (id: string, status: string) => {
    const docRef = doc(db, 'sales_candidates', id);
    updateDocumentNonBlocking(docRef, { status });
    if (selectedCandidate?.id === id) {
      setSelectedCandidate({ ...selectedCandidate, status });
    }
  };

  const handleSignOut = () => {
    initiateSignOut(auth);
    router.push("/vendas/auth");
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    try {
      if (typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toLocaleDateString('pt-BR');
      }
      return new Date(timestamp).toLocaleDateString('pt-BR');
    } catch (e) {
      return "-";
    }
  };

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">
                Gestão de Talentos Sapient
              </Badge>
              <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">
                Painel <span className="text-primary italic lowercase">administrativo.</span>
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'candidates' ? "Buscar dossiê..." : "Buscar usuário..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-6 rounded-2xl font-bold focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => router.push('/vendas/recrutamento')} variant="outline" className="h-14 px-6 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl font-black uppercase text-[9px] tracking-widest">
                  <Zap className="h-4 w-4 mr-2 text-primary" /> Treinamento
                </Button>
                <button onClick={handleSignOut} className="h-14 w-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* BARRA DE NAVEGAÇÃO INTERNA */}
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 mb-12 max-w-md">
            <button 
              onClick={() => { setActiveTab('candidates'); setSelectedCandidate(null); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === 'candidates' ? "bg-primary text-white shadow-lg" : "text-white/30 hover:text-white"
              )}
            >
              <FileText size={14} /> Dossiês ({candidates?.length || 0})
            </button>
            <button 
              onClick={() => { setActiveTab('profiles'); setSelectedCandidate(null); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === 'profiles' ? "bg-primary text-white shadow-lg" : "text-white/30 hover:text-white"
              )}
            >
              <Users size={14} /> Usuários ({profiles?.length || 0})
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {activeTab === 'candidates' ? (
              <>
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
                            <div className="flex gap-4">
                              <div className="h-12 w-12 rounded-xl bg-black/20 overflow-hidden border border-white/10 shrink-0">
                                {c.photoUri ? (
                                  <img src={c.photoUri} alt="" className="object-cover w-full h-full" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-white/10"><Users size={20} /></div>
                                )}
                              </div>
                              <div className="space-y-1">
                                <h3 className="font-black uppercase tracking-tight text-sm text-white truncate max-w-[150px]">{c.name || "Candidato sem nome"}</h3>
                                <p className={cn("text-[10px] font-bold uppercase tracking-widest", selectedCandidate?.id === c.id ? "text-white/60" : "text-white/30")}>
                                  {c.cityState || 'Sem localização'}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <ChevronRight className={cn("h-5 w-5 transition-transform", selectedCandidate?.id === c.id ? "translate-x-1" : "text-white/20")} />
                              <Badge className={cn(
                                "text-[7px] font-black px-2 py-0.5 uppercase border-none",
                                c.status === 'APROVADO' ? "bg-green-500 text-white" : 
                                c.status === 'REPROVADO' ? "bg-red-500 text-white" : "bg-amber-500 text-black"
                              )}>
                                {c.status?.replace(/_/g, ' ') || 'PENDENTE'}
                              </Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedCandidate ? (
                  <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-4">
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl space-y-12">
                      <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
                        <div className="flex flex-col sm:flex-row gap-8">
                          <div className="h-32 w-32 md:h-48 md:w-48 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden relative shadow-2xl">
                            {selectedCandidate.photoUri ? (
                              <img src={selectedCandidate.photoUri} alt={selectedCandidate.name} className="object-cover w-full h-full" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/5"><Camera size={48} /></div>
                            )}
                          </div>
                          
                          <div className="space-y-6">
                            <button onClick={() => setSelectedCandidate(null)} className="lg:hidden flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-4">
                              <ArrowLeft size={14} /> Voltar
                            </button>
                            <div className="space-y-2">
                              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">{selectedCandidate.name}</h2>
                              <div className="flex flex-wrap gap-4 text-white/40 text-xs font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Clock size={14} /> {formatDate(selectedCandidate.timestamp)}</span>
                                <span className="flex items-center gap-2"><MapPin size={14} /> {selectedCandidate.cityState || "-"}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                              <a href={`https://wa.me/${selectedCandidate.phone?.replace(/\D/g, '')}`} target="_blank" className="h-12 px-6 bg-green-500/10 text-green-500 rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-green-500 hover:text-white transition-all">
                                <MessageCircle size={16} /> WhatsApp
                              </a>
                              <a href={`mailto:${selectedCandidate.email}`} className="h-12 px-6 bg-primary/10 text-primary rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-primary hover:text-white transition-all">
                                <Mail size={16} /> E-mail
                              </a>
                              {selectedCandidate.resumeUri && (
                                <a 
                                  href={selectedCandidate.resumeUri} 
                                  download={`curriculo-${selectedCandidate.name}.pdf`}
                                  className="h-12 px-6 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-cyan-500 hover:text-white transition-all"
                                >
                                  <Download size={16} /> Baixar CV
                                </a>
                              )}
                            </div>
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
                            { label: "Performance Ads & GMN", val: selectedCandidate.ansAds, icon: <TrendingUp size={12}/> },
                            { label: "Engenharia de Sites", val: selectedCandidate.ansSites, icon: <Code size={12}/> },
                            { label: "Design & Semiótica", val: selectedCandidate.ansDesign, icon: <Palette size={12}/> },
                            { label: "IA & Atendimento", val: selectedCandidate.ansChat, icon: <Brain size={12}/> },
                            { label: "Social & Autoridade", val: selectedCandidate.ansSocial, icon: <Users size={12}/> },
                            { label: "Narrativa & Dossiês", val: selectedCandidate.ansNarrativa, icon: <FileText size={12}/> },
                            { label: "Estratégia de Nicho", val: selectedCandidate.ansNichos, icon: <Target size={12}/> },
                            { label: "Negociação de Valor", val: selectedCandidate.ansPreco, icon: <PieChart size={12}/> },
                          ].map((ans, i) => (
                            <div key={i} className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                              <div className="flex items-center gap-2">
                                <span className="text-primary">{ans.icon}</span>
                                <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">{ans.label}</p>
                              </div>
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
                                <p className="text-[10px] text-white/40 font-medium">Abordagem de diagnóstico imediato.</p>
                              </div>
                              {selectedCandidate.audioObjeçãoAds ? (
                                <audio controls className="w-full h-10 filter invert opacity-80">
                                  <source src={selectedCandidate.audioObjeçãoAds} type="audio/webm" />
                                </audio>
                              ) : <p className="text-xs text-red-400/50 font-bold uppercase italic">Sem áudio 01.</p>}
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-6">
                              <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase text-primary">02. Pitch Final de Elite</p>
                                <p className="text-[10px] text-white/40 font-medium">Venda do próprio perfil.</p>
                              </div>
                              {selectedCandidate.pitchAudioUri ? (
                                <audio controls className="w-full h-10 filter invert opacity-80">
                                  <source src={selectedCandidate.pitchAudioUri} type="audio/webm" />
                                </audio>
                              ) : <p className="text-xs text-red-400/50 font-bold uppercase italic">Sem áudio final.</p>}
                            </div>
                          </div>

                          <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 space-y-4">
                            <h5 className="flex items-center gap-2 text-amber-400 font-black uppercase text-[10px]"><AlertCircle size={14} /> Histórico</h5>
                            <div className="grid grid-cols-2 gap-4 text-[10px]">
                              <div>
                                <p className="text-white/20 font-bold uppercase">Experiência</p>
                                <p className="font-bold text-white">{selectedCandidate.experience || '-'}</p>
                              </div>
                              <div>
                                <p className="text-white/20 font-bold uppercase">Ocupação</p>
                                <p className="font-bold text-white">{selectedCandidate.currentOccupation || '-'}</p>
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
                      <FileText size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-white/20">Selecione um dossiê</h3>
                      <p className="text-white/10 font-bold uppercase tracking-widest text-[10px]">Para iniciar a auditoria técnica.</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="lg:col-span-12 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                {filteredProfiles?.length === 0 ? (
                  <div className="p-20 text-center bg-white/5 border border-white/10 rounded-[3rem] space-y-4">
                    <Users className="h-12 w-12 text-white/10 mx-auto" />
                    <p className="text-white/30 font-bold uppercase tracking-widest text-[10px]">Nenhum consultor registrado.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfiles?.map((p) => (
                      <div key={p.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 hover:bg-white/10 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                          <UserCheck size={80} />
                        </div>
                        <div className="space-y-4 relative z-10">
                          <div className="flex gap-4 items-center">
                            <div className="h-16 w-16 rounded-2xl bg-black/40 overflow-hidden border border-white/10">
                              {p.photoUri ? (
                                <img src={p.photoUri} alt="" className="object-cover w-full h-full" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/10"><UserCircle size={32} /></div>
                              )}
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white truncate max-w-[180px]">{p.name || 'Sem nome'}</h3>
                              <p className="text-[10px] font-black uppercase tracking-widest text-primary">{p.currentOccupation || 'Consultor Sapient'}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase">
                              <Mail size={14} className="text-primary" /> {p.email}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase">
                              <MapPin size={14} className="text-primary" /> {p.cityState || 'Local não informado'}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase">
                              <Clock size={14} className="text-primary" /> {formatDate(p.consentTimestamp)}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <a 
                              href={`https://wa.me/${p.phone?.replace(/\D/g, '')}`} 
                              target="_blank" 
                              className="flex-1 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-green-500 hover:text-white transition-all"
                            >
                              <MessageCircle size={16} /> WhatsApp
                            </a>
                            {p.resumeUri && (
                              <a 
                                href={p.resumeUri} 
                                download={`cv-${p.name}.pdf`}
                                className="h-12 w-12 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all"
                              >
                                <Download size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
