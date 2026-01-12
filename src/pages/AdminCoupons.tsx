import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, Tag, Calendar, Percent, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_order_value: number;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  starts_at: string;
  expires_at: string | null;
  created_at: string;
}

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: "",
    min_order_value: "0",
    max_uses: "",
    is_active: true,
    expires_at: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const couponData = {
        code: formData.code.toUpperCase(),
        description: formData.description || null,
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        min_order_value: parseFloat(formData.min_order_value) || 0,
        max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
        is_active: formData.is_active,
        expires_at: formData.expires_at || null,
      };

      if (editingCoupon) {
        const { error } = await supabase
          .from("coupons")
          .update(couponData)
          .eq("id", editingCoupon.id);
        if (error) throw error;
        toast.success("Cupom atualizado!");
      } else {
        const { error } = await supabase
          .from("coupons")
          .insert(couponData);
        if (error) throw error;
        toast.success("Cupom criado!");
      }

      setDialogOpen(false);
      resetForm();
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar cupom");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cupom?")) return;

    try {
      const { error } = await supabase.from("coupons").delete().eq("id", id);
      if (error) throw error;
      toast.success("Cupom excluído!");
      fetchCoupons();
    } catch (error) {
      toast.error("Erro ao excluir cupom");
    }
  };

  const toggleActive = async (coupon: Coupon) => {
    try {
      const { error } = await supabase
        .from("coupons")
        .update({ is_active: !coupon.is_active })
        .eq("id", coupon.id);
      if (error) throw error;
      toast.success(coupon.is_active ? "Cupom desativado" : "Cupom ativado!");
      fetchCoupons();
    } catch (error) {
      toast.error("Erro ao atualizar cupom");
    }
  };

  const resetForm = () => {
    setEditingCoupon(null);
    setFormData({
      code: "",
      description: "",
      discount_type: "percentage",
      discount_value: "",
      min_order_value: "0",
      max_uses: "",
      is_active: true,
      expires_at: "",
    });
  };

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value.toString(),
      min_order_value: coupon.min_order_value.toString(),
      max_uses: coupon.max_uses?.toString() || "",
      is_active: coupon.is_active,
      expires_at: coupon.expires_at ? coupon.expires_at.split("T")[0] : "",
    });
    setDialogOpen(true);
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      
      <main className="flex-1 pt-32 md:pt-40 pb-24">
        <div className="container max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Cupons</h1>
              <p className="text-muted-foreground">Gerencie cupons de desconto</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Cupom
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCoupon ? "Editar Cupom" : "Novo Cupom"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Código *</Label>
                    <Input 
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      placeholder="DESCONTO10"
                      required
                    />
                  </div>
                  <div>
                    <Label>Descrição</Label>
                    <Input 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="10% de desconto em todas as compras"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo de Desconto</Label>
                      <Select 
                        value={formData.discount_type} 
                        onValueChange={(v: "percentage" | "fixed") => setFormData({...formData, discount_type: v})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                          <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Valor *</Label>
                      <Input 
                        type="number"
                        value={formData.discount_value}
                        onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                        placeholder={formData.discount_type === "percentage" ? "10" : "50"}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Valor Mínimo do Pedido</Label>
                      <Input 
                        type="number"
                        value={formData.min_order_value}
                        onChange={(e) => setFormData({...formData, min_order_value: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label>Máximo de Usos</Label>
                      <Input 
                        type="number"
                        value={formData.max_uses}
                        onChange={(e) => setFormData({...formData, max_uses: e.target.value})}
                        placeholder="Ilimitado"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Data de Expiração</Label>
                    <Input 
                      type="date"
                      value={formData.expires_at}
                      onChange={(e) => setFormData({...formData, expires_at: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                    />
                    <Label>Ativo</Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {editingCoupon ? "Salvar Alterações" : "Criar Cupom"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar cupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Coupons list */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredCoupons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum cupom encontrado</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCoupons.map((coupon) => (
                <Card key={coupon.id} className={!coupon.is_active || isExpired(coupon.expires_at) ? "opacity-60" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-lg font-bold text-primary">{coupon.code}</code>
                          {!coupon.is_active && <Badge variant="secondary">Inativo</Badge>}
                          {isExpired(coupon.expires_at) && <Badge variant="destructive">Expirado</Badge>}
                        </div>
                        {coupon.description && (
                          <p className="text-sm text-muted-foreground">{coupon.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEditDialog(coupon)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(coupon.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        {coupon.discount_type === "percentage" ? (
                          <Percent className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="font-semibold">
                          {coupon.discount_type === "percentage" 
                            ? `${coupon.discount_value}% de desconto`
                            : `R$ ${coupon.discount_value.toFixed(2)} de desconto`}
                        </span>
                      </div>
                      
                      {coupon.min_order_value > 0 && (
                        <p className="text-muted-foreground">
                          Mínimo: R$ {coupon.min_order_value.toFixed(2)}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>
                          Usos: {coupon.used_count}{coupon.max_uses ? `/${coupon.max_uses}` : ""}
                        </span>
                        {coupon.expires_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(coupon.expires_at).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Switch 
                          checked={coupon.is_active}
                          onCheckedChange={() => toggleActive(coupon)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default AdminCoupons;
