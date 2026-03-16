import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Building2, 
  Check, 
  X, 
  Clock, 
  Search, 
  Filter,
  Loader2,
  ShieldAlert,
  Phone,
  Mail,
  Calendar,
  Percent,
  FileText,
  Download,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import MainHeader from "@/components/layout/MainHeader";

interface ProfessionalRequest {
  id: string;
  user_id: string;
  company_name: string | null;
  cnpj: string | null;
  contact_name: string;
  phone: string;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  discount_percentage: number;
  reviewed_at: string | null;
  admin_notes: string | null;
  certificate_url: string | null;
  created_at: string;
  user_email?: string;
}

const AdminProfessionalRequests = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  
  const [requests, setRequests] = useState<ProfessionalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [downloadingCertificate, setDownloadingCertificate] = useState<string | null>(null);
  
  // Modal state
  const [selectedRequest, setSelectedRequest] = useState<ProfessionalRequest | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState([15]);
  const [adminNotes, setAdminNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);


  useEffect(() => {
    // Only redirect when BOTH loadings are complete
    if (!authLoading && !adminLoading) {
      console.log("AdminPanel - Check access: user=", !!user, "isAdmin=", isAdmin);
      if (!user) {
        navigate("/auth", { state: { from: "/admin/solicitacoes-profissionais" } });
      } else if (!isAdmin) {
        console.log("AdminPanel - NOT ADMIN, redirecting...");
        navigate("/");
        toast.error("Acesso não autorizado");
      } else {
        console.log("AdminPanel - IS ADMIN, fetching requests...");
        fetchRequests();
      }
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("professional_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch user emails from profiles
      const userIds = data?.map(r => r.user_id) || [];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", userIds);

      const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || []);
      
      const requestsWithEmail = data?.map(r => ({
        ...r,
        user_email: emailMap.get(r.user_id) || "N/A",
      })) as ProfessionalRequest[];

      setRequests(requestsWithEmail || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Erro ao carregar solicitações");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedRequest || !actionType || !user) return;
    
    setIsProcessing(true);
    
    try {
      const updateData: any = {
        status: actionType === "approve" ? "approved" : "rejected",
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        admin_notes: adminNotes || null,
      };
      
      if (actionType === "approve") {
        updateData.discount_percentage = discountPercentage[0];
      }

      const { error } = await supabase
        .from("professional_requests")
        .update(updateData)
        .eq("id", selectedRequest.id);

      if (error) throw error;

      toast.success(
        actionType === "approve" 
          ? `Solicitação aprovada com ${discountPercentage[0]}% de desconto!`
          : "Solicitação rejeitada"
      );
      
      // Update local state
      setRequests(prev => 
        prev.map(r => 
          r.id === selectedRequest.id 
            ? { ...r, ...updateData }
            : r
        )
      );
      
      closeModal();
    } catch (error: any) {
      console.error("Error updating request:", error);
      toast.error(error.message || "Erro ao processar solicitação");
    } finally {
      setIsProcessing(false);
    }
  };

  const openModal = (request: ProfessionalRequest, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setActionType(action);
    setDiscountPercentage([15]);
    setAdminNotes("");
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setActionType(null);
    setDiscountPercentage([15]);
    setAdminNotes("");
  };

  const handleDownloadCertificate = async (certificateUrl: string, requestId: string) => {
    setDownloadingCertificate(requestId);
    try {
      const { data, error } = await supabase.storage
        .from("professional-certificates")
        .createSignedUrl(certificateUrl, 3600);

      if (error) throw error;

      window.open(data.signedUrl, "_blank");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error("Erro ao abrir certificado");
    } finally {
      setDownloadingCertificate(null);
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = 
      r.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cnpj?.includes(searchTerm) ||
      r.user_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || r.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" /> Pendente</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Check className="w-3 h-3 mr-1" /> Aprovado</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><X className="w-3 h-3 mr-1" /> Rejeitado</Badge>;
    }
  };

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShieldAlert className="w-16 h-16 mx-auto text-destructive" />
          <h2 className="text-2xl font-bold">Acesso Negado</h2>
          <p className="text-muted-foreground">Você não tem permissão para acessar esta página.</p>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-muted rounded-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Solicitações de Cadastro Profissional</h1>
            <p className="text-muted-foreground">Gerencie as solicitações de clientes profissionais</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: counts.all, color: "bg-blue-50 text-blue-700" },
            { label: "Pendentes", value: counts.pending, color: "bg-yellow-50 text-yellow-700" },
            { label: "Aprovados", value: counts.approved, color: "bg-green-50 text-green-700" },
            { label: "Rejeitados", value: counts.rejected, color: "bg-red-50 text-red-700" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, empresa, CNPJ ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pendentes ({counts.pending})</TabsTrigger>
            <TabsTrigger value="approved">Aprovados ({counts.approved})</TabsTrigger>
            <TabsTrigger value="rejected">Rejeitados ({counts.rejected})</TabsTrigger>
            <TabsTrigger value="all">Todos ({counts.all})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma solicitação encontrada</p>
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Info */}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">{request.contact_name}</h3>
                                {request.company_name && (
                                  <p className="text-muted-foreground">{request.company_name}</p>
                                )}
                              </div>
                              {getStatusBadge(request.status)}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                {request.phone}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                {request.user_email}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(request.created_at).toLocaleDateString("pt-BR")}
                              </div>
                              {request.cnpj && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Building2 className="w-4 h-4" />
                                  {request.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                                </div>
                              )}
                            </div>
                            
                            {request.reason && (
                              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">{request.reason}</p>
                              </div>
                            )}
                            
                            {request.status === "approved" && (
                              <div className="mt-4 flex items-center gap-2 text-green-600">
                                <Percent className="w-4 h-4" />
                                <span className="font-medium">{request.discount_percentage}% de desconto</span>
                              </div>
                            )}
                            
                            {/* Certificate Button */}
                            {request.certificate_url && (
                              <div className="mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDownloadCertificate(request.certificate_url!, request.id)}
                                  disabled={downloadingCertificate === request.id}
                                  className="gap-2"
                                >
                                  {downloadingCertificate === request.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <FileText className="w-4 h-4" />
                                  )}
                                  Ver Certificado
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                            
                            {request.admin_notes && request.status !== "pending" && (
                              <div className="mt-3 text-sm text-muted-foreground">
                                <span className="font-medium">Observação:</span> {request.admin_notes}
                              </div>
                            )}
                          </div>
                          
                          {/* Actions */}
                          {request.status === "pending" && (
                            <div className="flex md:flex-col gap-2 p-4 bg-muted/30 border-t md:border-t-0 md:border-l">
                              <Button 
                                onClick={() => openModal(request, "approve")}
                                className="flex-1 bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Aprovar
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => openModal(request, "reject")}
                                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Rejeitar
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Action Modal */}
      <Dialog open={!!selectedRequest && !!actionType} onOpenChange={() => closeModal()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Aprovar Solicitação" : "Rejeitar Solicitação"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" 
                ? `Defina o percentual de desconto para ${selectedRequest?.contact_name}`
                : `Confirme a rejeição da solicitação de ${selectedRequest?.contact_name}`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {actionType === "approve" && (
              <div className="space-y-4">
                <Label>Desconto: {discountPercentage[0]}%</Label>
                <Slider
                  value={discountPercentage}
                  onValueChange={setDiscountPercentage}
                  min={5}
                  max={50}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="admin_notes">Observação (opcional)</Label>
              <Textarea
                id="admin_notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={
                  actionType === "approve" 
                    ? "Ex: Cliente VIP, desconto especial..."
                    : "Ex: Motivo da rejeição..."
                }
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeModal} disabled={isProcessing}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAction}
              disabled={isProcessing}
              className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : actionType === "approve" ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <X className="w-4 h-4 mr-2" />
              )}
              {actionType === "approve" ? "Aprovar" : "Rejeitar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProfessionalRequests;
