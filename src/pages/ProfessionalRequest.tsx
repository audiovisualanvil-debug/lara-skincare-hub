import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Building2, User, Phone, FileText, CheckCircle, Clock, XCircle, Loader2, Upload, X, FileImage, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useProfessionalStatus } from "@/hooks/useProfessionalStatus";
import MainHeader from "@/components/layout/MainHeader";

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
};

const formatCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const ProfessionalRequest = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { request, loading: statusLoading, submitRequest, hasExistingRequest } = useProfessionalStatus();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    company_name: "",
    cnpj: "",
    contact_name: "",
    phone: "",
    reason: "",
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { state: { from: "/solicitar-cadastro-profissional" } });
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.contact_name.trim()) {
      newErrors.contact_name = "Nome de contato é obrigatório";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone inválido";
    }
    
    if (formData.cnpj && formData.cnpj.replace(/\D/g, "").length !== 14) {
      newErrors.cnpj = "CNPJ inválido";
    }

    if (!certificateFile) {
      newErrors.certificate = "É obrigatório enviar um certificado ou documento comprobatório";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Formato não suportado. Use JPG, PNG, WebP ou PDF.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Arquivo muito grande. Máximo 10MB.");
      return;
    }

    setCertificateFile(file);

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificatePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCertificatePreview(null);
    }

    if (errors.certificate) {
      setErrors({ ...errors, certificate: "" });
    }
  };

  const removeFile = () => {
    setCertificateFile(null);
    setCertificatePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, corrija os campos destacados");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitRequest({
        company_name: formData.company_name || undefined,
        cnpj: formData.cnpj || undefined,
        contact_name: formData.contact_name,
        phone: formData.phone,
        reason: formData.reason || undefined,
        certificate_file: certificateFile || undefined,
      });
      
      toast.success("Solicitação enviada com sucesso! Aguarde a análise.");
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error(error.message || "Erro ao enviar solicitação");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || statusLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusInfo = () => {
    if (!request) return null;
    
    switch (request.status) {
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          title: "Solicitação em Análise",
          description: "Sua solicitação está sendo analisada pela nossa equipe. Você receberá uma resposta em breve.",
        };
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          title: "Cadastro Aprovado!",
          description: `Parabéns! Você tem ${request.discount_percentage}% de desconto em todas as compras.`,
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          title: "Solicitação Não Aprovada",
          description: request.admin_notes || "Sua solicitação não foi aprovada. Entre em contato para mais informações.",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Cadastro Profissional</CardTitle>
              <CardDescription>
                Solicite seu cadastro para ter acesso a preços especiais e descontos exclusivos.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {hasExistingRequest && statusInfo ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-lg border-2 ${statusInfo.bgColor} ${statusInfo.borderColor}`}
                >
                  <div className="flex items-start gap-4">
                    <statusInfo.icon className={`w-8 h-8 ${statusInfo.color} flex-shrink-0`} />
                    <div>
                      <h3 className={`text-lg font-semibold ${statusInfo.color}`}>
                        {statusInfo.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {statusInfo.description}
                      </p>
                      
                      {request?.status === "approved" && (
                        <div className="mt-4">
                          <Button asChild>
                            <Link to="/shop">Ver Produtos com Desconto</Link>
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-current/10">
                        <p className="text-sm text-muted-foreground">
                          Enviado em: {new Date(request!.created_at).toLocaleDateString("pt-BR")}
                        </p>
                        {request?.reviewed_at && (
                          <p className="text-sm text-muted-foreground">
                            Analisado em: {new Date(request.reviewed_at).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contact_name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nome de Contato *
                      </Label>
                      <Input
                        id="contact_name"
                        value={formData.contact_name}
                        onChange={(e) => {
                          setFormData({ ...formData, contact_name: e.target.value });
                          if (errors.contact_name) setErrors({ ...errors, contact_name: "" });
                        }}
                        placeholder="Seu nome completo"
                        className={errors.contact_name ? "border-destructive" : ""}
                      />
                      {errors.contact_name && (
                        <p className="text-sm text-destructive mt-1">{errors.contact_name}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Telefone/WhatsApp *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: formatPhone(e.target.value) });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="company_name" className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Nome da Empresa (opcional)
                      </Label>
                      <Input
                        id="company_name"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        placeholder="Nome da sua empresa ou salão"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => {
                          setFormData({ ...formData, cnpj: formatCNPJ(e.target.value) });
                          if (errors.cnpj) setErrors({ ...errors, cnpj: "" });
                        }}
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                        className={errors.cnpj ? "border-destructive" : ""}
                      />
                      {errors.cnpj && (
                        <p className="text-sm text-destructive mt-1">{errors.cnpj}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Não é obrigatório ter CNPJ para solicitar o cadastro profissional.
                      </p>
                    </div>
                    
                    {/* Certificate Upload */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Certificado Profissional *
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Envie uma foto ou PDF do seu certificado, diploma ou documento que comprove sua atuação na área de estética.
                      </p>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="certificate"
                      />
                      
                      {!certificateFile ? (
                        <label
                          htmlFor="certificate"
                          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5 ${
                            errors.certificate ? "border-destructive bg-destructive/5" : "border-muted-foreground/30"
                          }`}
                        >
                          <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Clique para enviar
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            JPG, PNG, WebP ou PDF (máx. 10MB)
                          </span>
                        </label>
                      ) : (
                        <div className="relative border-2 border-primary/30 rounded-xl p-4 bg-primary/5">
                          <button
                            type="button"
                            onClick={removeFile}
                            className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full hover:bg-destructive/80 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          {certificatePreview ? (
                            <div className="flex items-center gap-4">
                              <img 
                                src={certificatePreview} 
                                alt="Preview" 
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium text-sm">{certificateFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(certificateFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                <File className="w-8 h-8 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{certificateFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  PDF • {(certificateFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {errors.certificate && (
                        <p className="text-sm text-destructive">{errors.certificate}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="reason" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Conte-nos sobre você (opcional)
                      </Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="Descreva sua área de atuação, experiência, ou qualquer informação relevante..."
                        rows={4}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Solicitação"
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Ao enviar, você concorda com nossos termos de uso e política de privacidade.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfessionalRequest;
