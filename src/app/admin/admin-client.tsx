
'use client';

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  ChevronRight, 
  Loader2, 
  ShieldCheck, 
  ArrowLeft,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogOut,
  Zap,
  Mic,
  FileText,
  TrendingUp,
  Palette,
  Target,
  PieChart,
  UserCheck,
  Download,
  ExternalLink,
  UserCircle,
  Camera,
  Upload,
  Database,
  Edit3,
  Filter,
  Trash2,
  Star,
  Globe,
  Plus,
  CalendarDays,
  ShieldAlert
} from "lucide-react";
import { useFirebase, useFirestore, useCollection, useMemoFirebase, initiateSignOut, updateDocumentNonBlocking, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, orderBy, doc, serverTimestamp, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function AdminClient() {
  const { auth, user, isUserLoading } = useFirebase();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'candidates' | 'profiles' | 'leads'>('candidates');
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [editingLead, setEditingLead] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.email === "lucassouza.sou@gmail.com" || user?.email === "contato@studiosapient.com.br";

  // Queries
  const candidatesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'sales_candidates'), orderBy('timestamp', 'desc'));
  }, [db]);

  const profilesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'sales_profiles'), orderBy('consentTimestamp', 'desc'));
  }, [db]);

  const leadsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'commercial_leads'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: candidates, isLoading: isCandidatesLoading } = useCollection(candidatesQuery);
  const { data: profiles, isLoading: isProfilesLoading } = useCollection(profilesQuery);
  const { data: leads, isLoading: isLeadsLoading } = useCollection(leadsQuery);

  useEffect(() => {
    if (!isUserLoading && (!user || !isAdmin)) {
      router.push("/vendas/auth");
    }
  }, [user, isUserLoading, isAdmin, router]);

  const getInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSignOut = () => {
    initiateSignOut(auth);
    router.push("/vendas/auth");
  };

  const updateCandidateStatus = (id: string, status: string) => {
    const docRef = doc(db, 'sales_candidates', id);
    updateDocumentNonBlocking(docRef, { status });
    toast({ title: "Status Atualizado", description: `Candidato movido para ${status}.` });
  };

  const toggleLeadsAccess = (userId: string, currentStatus: boolean) => {
    const docRef = doc(db, 'sales_profiles', userId);
    updateDocumentNonBlocking(docRef, { leadsEnabled: !currentStatus });
    toast({ 
      title: !currentStatus ? "Acesso Liberado" : "Acesso Revogado", 
      description: `O colaborador ${!currentStatus ? 'agora' : 'não'} pode visualizar leads.` 
    });
  };

  const parseCSVLine = (text: string) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      if (lines.length < 2) {
        toast({ title: "Arquivo Inválido", description: "O CSV precisa ter pelo menos um cabeçalho e uma linha de dados.", variant: "destructive" });
        return;
      }

      // PREVENÇÃO DE DUPLICADOS: Criar Set de chaves (Nome + Região)
      const existingKeys = new Set(leads?.map(l => `${l.companyName?.toLowerCase().trim()}|${l.region?.toLowerCase().trim()}`) || []);

      const newLeadsData = lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        
        // Mapeamento Robusto de 12 Colunas
        const companyName = (values[0] || "Empresa Sem Nome").trim();
        const region = (values[1] || "Geral").trim();
        const rating = parseFloat(values[2]?.replace(',', '.')) || 4.0;
        const bottlenecks = values[3] || "";
        const rawServices = values[4] || "";
        const servicesArray = rawServices.split(/[;,]/).map(s => s.trim()).filter(Boolean);
        const scriptBase = values[5] || "";
        const socio = values[6]?.trim();
        const website = values[7] || "";
        const telefone = values[8]?.trim(); // Coluna 9
        const emailVal = values[9]?.trim();   // Coluna 10
        const decisor = values[10]?.trim(); // Coluna 11
        const dicasAdicionais = values[11] || ""; // Coluna 12 (Notas/Dicas)

        const combinedScript = `${scriptBase}${dicasAdicionais ? `\n\nAbordagem Estratégica: ${dicasAdicionais}` : ""}`.trim();

        return {
          companyName,
          region,
          address: region,
          googleRating: rating,
          bottlenecks,
          suggestedServices: servicesArray.length > 0 ? servicesArray : ["Sites Premium", "Performance Ads"],
          salesScript: combinedScript || "Foco na autoridade visual e ROI.",
          contactName: socio || decisor || "Responsável", 
          decisionMaker: decisor || socio || "", 
          website,
          phone: telefone || "-", 
          email: emailVal || "-",
          category: "Geral",
          status: "NOVO",
          notes: "",
          createdAt: new Date().toISOString()
        };
      });

      let countAdded = 0;
      let countIgnored = 0;

      for (const lead of newLeadsData) {
        const key = `${lead.companyName.toLowerCase()}|${lead.region.toLowerCase()}`;
        
        if (!existingKeys.has(key)) {
          await addDocumentNonBlocking(collection(db, 'commercial_leads'), lead);
          existingKeys.add(key);
          countAdded++;
        } else {
          countIgnored++;
        }
      }

      toast({ 
        title: countAdded > 0 ? "Importação Concluída" : "Importação Ignorada", 
        description: `${countAdded} novos leads adicionados. ${countIgnored} duplicados ignorados.`,
        variant: countAdded > 0 ? "default" : "destructive"
      });
      
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  const saveLeadEdits = () => {
    if (!editingLead) return;
    const docRef = doc(db, 'commercial_leads', editingLead.id);
    const { id, ...data } = editingLead;
    updateDocumentNonBlocking(docRef, data);
    setEditingLead(null);
    toast({ title: "Lead Atualizado", description: "Dados estratégicos salvos." });
  };

  const deleteLead = (id: string) => {
    if (confirm("Deseja realmente remover este lead estratégico?")) {
      const docRef = doc(db, 'commercial_leads', id);
      deleteDocumentNonBlocking(docRef);
      toast({ title: "Lead Removido", variant: "destructive" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONTATO_INICIADO': return 'bg-blue-500 text-white';
      case 'NEGOCIACAO': return 'bg-purple-500 text-white';
      case 'AGUARDANDO_RETORNO': return 'bg-amber-500 text-black';
      case 'REUNIAO_AGENDADA': return 'bg-green-500 text-white';
      case 'FECHADO': return 'bg-emerald-600 text-white';
      case 'PERDIDO': return 'bg-red-500 text-white';
      default: return 'bg-white/10 text-white/40';
    }
  };

  if (isUserLoading || isCandidatesLoading || isProfilesLoading || isLeadsLoading) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const filteredCandidates = candidates?.filter(c => 
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProfiles = profiles?.filter(p => 
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeads = leads?.filter(l => 
    (l.companyName || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (l.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#08070b] text-white selection:bg-primary/30 pb-32">
      <Navbar />
      
      <section className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-500">
                <ShieldAlert size={18} />
                <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-6 py-2 text-[9px] font-black uppercase tracking-widest">
                  Acesso Restrito - Admin Elite
                </Badge>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">
                Painel <span className="text-primary italic lowercase">admin.</span>
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Buscar na base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-6 rounded-2xl font-bold focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
              <button onClick={handleSignOut} className="h-14 w-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 mb-12 max-w-lg overflow-x-auto no-scrollbar">
            <button 
              onClick={() => { setActiveTab('candidates'); setSelectedCandidate(null); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeTab === 'candidates' ? "bg-primary text-white shadow-lg" : "text-white/30 hover:text-white"
              )}
            >
              <FileText size={14} /> Dossiês ({candidates?.length || 0})
            </button>
            <button 
              onClick={() => { setActiveTab('profiles'); setSelectedCandidate(null); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeTab === 'profiles' ? "bg-primary text-white shadow-lg" : "text-white/30 hover:text-white"
              )}
            >
              <Users size={14} /> Usuários ({profiles?.length || 0})
            </button>
            <button 
              onClick={() => { setActiveTab('leads'); setSelectedCandidate(null); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeTab === 'leads' ? "bg-primary text-white shadow-lg" : "text-white/30 hover:text-white"
              )}
            >
              <Database size={14} /> Leads ({leads?.length || 0})
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {activeTab === 'candidates' && (
              <>
                <div className={cn("space-y-4", selectedCandidate ? "lg:col-span-4 hidden lg:block" : "lg:col-span-12")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                    {filteredCandidates?.map((c) => (
                      <button key={c.id} onClick={() => setSelectedCandidate(c)} className={cn("w-full text-left p-6 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden", selectedCandidate?.id === c.id ? "bg-primary border-primary shadow-2xl shadow-primary/20" : "bg-white/5 border-white/10 hover:border-white/30")}>
                        <div className="relative z-10 flex justify-between items-start">
                          <div className="flex gap-4">
                            <div className="h-12 w-12 rounded-xl bg-black/20 overflow-hidden border border-white/10 shrink-0">
                              {c.photoUri ? <img src={c.photoUri} alt="" className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-black text-xs">{getInitials(c.name || "")}</div>}
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-black uppercase tracking-tight text-sm text-white truncate max-w-[150px]">{c.name || "Sem Nome"}</h3>
                              <p className={cn("text-[10px] font-bold uppercase tracking-widest", selectedCandidate?.id === c.id ? "text-white/60" : "text-white/30")}>{c.cityState || 'Sem Local'}</p>
                            </div>
                          </div>
                          <Badge className={cn("text-[7px] font-black px-2 py-0.5 uppercase border-none", c.status === 'APROVADO' ? "bg-green-500 text-white" : c.status === 'REPROVADO' ? "bg-red-500 text-white" : "bg-amber-500 text-black")}>
                            {c.status?.replace(/_/g, ' ') || 'PENDENTE'}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedCandidate ? (
                  <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-4">
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl space-y-12">
                      <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
                        <div className="flex flex-col sm:flex-row gap-8">
                          <div className="h-32 w-32 md:h-48 md:w-48 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden relative shadow-2xl">
                            {selectedCandidate.photoUri ? <img src={selectedCandidate.photoUri} alt={selectedCandidate.name} className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-black text-4xl">{getInitials(selectedCandidate.name || "")}</div>}
                          </div>
                          <div className="space-y-6">
                            <button onClick={() => setSelectedCandidate(null)} className="lg:hidden flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-4"><ArrowLeft size={14} /> Voltar</button>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">{selectedCandidate.name || 'Sem nome'}</h2>
                            <div className="flex flex-wrap gap-3">
                              <a href={`https://wa.me/${selectedCandidate.phone?.replace(/\D/g, '')}`} target="_blank" className="h-12 px-6 bg-green-500/10 text-green-500 rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-green-500 hover:text-white transition-all"><MessageCircle size={16} /> WhatsApp</a>
                              {selectedCandidate.resumeUri && <a href={selectedCandidate.resumeUri} download={`curriculo-${selectedCandidate.name}.pdf`} className="h-12 px-6 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-cyan-500 hover:text-white transition-all"><Download size={16} /> CV</a>}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-48">
                          <button onClick={() => updateCandidateStatus(selectedCandidate.id, 'APROVADO')} className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white transition-all text-[9px] font-black uppercase">Aprovar <CheckCircle2 size={14} /></button>
                          <button onClick={() => updateCandidateStatus(selectedCandidate.id, 'REPROVADO')} className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase">Reprovar <XCircle size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-8 hidden lg:flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-[3rem] p-20 text-center space-y-6">
                    <FileText size={40} className="text-white/10" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white/20">Selecione um dossiê</h3>
                  </div>
                )}
              </>
            )}

            {activeTab === 'profiles' && (
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
                {filteredProfiles?.map((p) => (
                  <div key={p.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 hover:bg-white/10 transition-all">
                    <div className="flex gap-4 items-center">
                      <div className="h-16 w-16 rounded-2xl bg-black/40 overflow-hidden border border-white/10">
                        {p.photoUri ? <img src={p.photoUri} alt="" className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-black text-xl">{getInitials(p.name || "")}</div>}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase tracking-tighter text-white truncate max-w-[180px]">{p.name || 'Sem nome'}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">{p.currentOccupation || 'Consultor Sapient'}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest">Acesso a Leads</span>
                        <Switch 
                          checked={p.leadsEnabled || false} 
                          onCheckedChange={() => toggleLeadsAccess(p.id, p.leadsEnabled || false)}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                      <a href={`https://wa.me/${p.phone?.replace(/\D/g, '')}`} target="_blank" className="w-full h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[9px] tracking-widest hover:bg-green-500 hover:text-white transition-all"><MessageCircle size={16} /> WhatsApp</a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="lg:col-span-12 space-y-8 animate-in fade-in">
                <div className="flex flex-col md:flex-row justify-between gap-6 bg-white/5 p-8 rounded-[3rem] border border-white/10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Prospecção Estratégica</h3>
                    <p className="text-white/40 text-xs font-medium">Formato: Empresa, Região, Nota, Gargalos, Serviços, Script, Sócio, Site, Telefone, Email, Decisor, Dicas.</p>
                  </div>
                  <div className="flex gap-4">
                    <input type="file" accept=".csv" ref={fileInputRef} onChange={handleCSVUpload} className="hidden" />
                    <Button onClick={() => fileInputRef.current?.click()} className="h-14 px-8 bg-primary rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">
                      <Upload size={16} className="mr-2" /> Importar 12 Colunas
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLeads?.map((l) => (
                    <div key={l.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4 hover:border-primary/30 transition-all group relative overflow-hidden">
                      <div className="flex justify-between items-start">
                        <Badge className={cn("border-none text-[8px] font-black uppercase", getStatusColor(l.status))}>
                          {l.status?.replace(/_/g, ' ') || 'NOVO'}
                        </Badge>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingLead(l)} className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"><Edit3 size={14}/></button>
                          <button onClick={() => deleteLead(l.id)} className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={14}/></button>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-black uppercase tracking-tight text-white text-lg">{l.companyName}</h4>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                          <UserCircle size={12} /> {l.decisionMaker || l.contactName || "Responsável"}
                        </div>
                      </div>

                      {l.status === 'REUNIAO_AGENDADA' && l.meetingDate && (
                        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                          <CalendarDays size={14} className="text-green-500" />
                          <div>
                            <p className="text-[7px] font-black text-green-500/60 uppercase">Reunião de Fechamento</p>
                            <p className="text-[10px] font-bold text-green-500">{new Date(l.meetingDate).toLocaleString('pt-BR')}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Badge className={cn("text-[8px] font-black py-1 px-3 border-none", (l.googleRating || 0) >= 4.5 ? "bg-green-500 text-white" : "bg-amber-500 text-black")}>
                          <Star size={8} className="mr-1 fill-current" /> {l.googleRating || "4.0"}
                        </Badge>
                        <div className="flex items-center gap-1 text-[9px] font-black text-white/20 uppercase">
                          <MapPin size={10} /> {l.region || "Geral"}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase truncate max-w-[150px]"><Mail size={12}/> {l.email}</div>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase"><MessageCircle size={12}/> {l.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {editingLead && (
        <Dialog open={!!editingLead} onOpenChange={() => setEditingLead(null)}>
          <DialogContent className="bg-[#0c0a1a] border-white/10 text-white rounded-[3rem] p-10 max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Dossiê Estratégico</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-white/30">Empresa</Label>
                  <Input value={editingLead.companyName} onChange={(e) => setEditingLead({...editingLead, companyName: e.target.value})} className="bg-white/5 border-white/10 h-12" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30">Decisor Principal</Label>
                    <Input value={editingLead.decisionMaker || ""} onChange={(e) => setEditingLead({...editingLead, decisionMaker: e.target.value})} className="bg-white/5 border-white/10 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30">Sócio / Dono</Label>
                    <Input value={editingLead.contactName} onChange={(e) => setEditingLead({...editingLead, contactName: e.target.value})} className="bg-white/5 border-white/10 h-12" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30">Telefone</Label>
                    <Input value={editingLead.phone} onChange={(e) => setEditingLead({...editingLead, phone: e.target.value})} className="bg-white/5 border-white/10 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30">E-mail</Label>
                    <Input value={editingLead.email} onChange={(e) => setEditingLead({...editingLead, email: e.target.value})} className="bg-white/5 border-white/10 h-12" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30">Nota Google</Label>
                    <Input type="number" step="0.1" value={editingLead.googleRating} onChange={(e) => setEditingLead({...editingLead, googleRating: parseFloat(e.target.value)})} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/30">Região</Label>
                    <Input value={editingLead.region} onChange={(e) => setEditingLead({...editingLead, region: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-white/30">Status Atual</Label>
                  <select 
                    value={editingLead.status} 
                    onChange={(e) => setEditingLead({...editingLead, status: e.target.value})}
                    className="w-full bg-white/5 border-white/10 h-12 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="NOVO">NOVO</option>
                    <option value="CONTATO_INICIADO">CONTATO INICIADO</option>
                    <option value="NEGOCIACAO">EM NEGOCIAÇÃO</option>
                    <option value="AGUARDANDO_RETORNO">AGUARDANDO RETORNO</option>
                    <option value="REUNIAO_AGENDADA">REUNIÃO AGENDADA</option>
                    <option value="FECHADO">FECHADO</option>
                    <option value="PERDIDO">PERDIDO</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-primary">Diagnóstico (Gargalos)</Label>
                  <Textarea value={editingLead.bottlenecks} onChange={(e) => setEditingLead({...editingLead, bottlenecks: e.target.value})} className="bg-white/5 border-white/10 min-h-[100px] text-sm" placeholder="Liste os problemas encontrados..." />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-primary">Script de Guerra (Dicas)</Label>
                  <Textarea value={editingLead.salesScript} onChange={(e) => setEditingLead({...editingLead, salesScript: e.target.value})} className="bg-white/5 border-white/10 min-h-[100px] text-sm" placeholder="Qual a melhor abordagem para este lead?" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-white/30">Notas Internas</Label>
                  <Textarea value={editingLead.notes} onChange={(e) => setEditingLead({...editingLead, notes: e.target.value})} className="bg-white/5 border-white/10 min-h-[80px] text-xs" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={saveLeadEdits} className="w-full h-14 bg-primary rounded-2xl font-black uppercase tracking-widest text-[10px]">Salvar Configurações de Elite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </main>
  );
}
