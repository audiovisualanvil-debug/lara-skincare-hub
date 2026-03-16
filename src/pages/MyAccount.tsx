import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Package, MapPin, Heart, Star, Award, 
  Settings, LogOut, ChevronRight, Plus, Edit2, 
  Trash2, Crown, Gift, Loader2, ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { useAuth } from "@/hooks/useAuth";
import { useProfessionalStatus } from "@/hooks/useProfessionalStatus";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  items_count?: number;
}

interface Address {
  id: string;
  label: string;
  recipient_name: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  is_default: boolean;
}


const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Processando",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isProfessional, discountPercentage, request: professionalRequest } = useProfessionalStatus();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  const [profile, setProfile] = useState<{ full_name: string | null; email: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: "Casa",
    recipient_name: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zip_code: "",
    is_default: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { state: { from: "/minha-conta" } });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();
      setProfile(profileData);

      // Fetch orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("id, order_number, status, total, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setOrders(ordersData || []);

      // Fetch addresses
      const { data: addressesData } = await supabase
        .from("user_addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });
      setAddresses(addressesData || []);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingAddress) {
        await supabase
          .from("user_addresses")
          .update(addressForm)
          .eq("id", editingAddress.id);
        toast.success("Endereço atualizado!");
      } else {
        await supabase
          .from("user_addresses")
          .insert({ ...addressForm, user_id: user.id });
        toast.success("Endereço adicionado!");
      }
      
      setAddressDialogOpen(false);
      setEditingAddress(null);
      setAddressForm({
        label: "Casa",
        recipient_name: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zip_code: "",
        is_default: false,
      });
      fetchData();
    } catch (error) {
      toast.error("Erro ao salvar endereço");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await supabase.from("user_addresses").delete().eq("id", id);
      toast.success("Endereço removido!");
      fetchData();
    } catch (error) {
      toast.error("Erro ao remover endereço");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const currentTier = loyalty?.tier || "bronze";
  const TierIcon = tierInfo[currentTier as keyof typeof tierInfo]?.icon || Award;
  const tierColor = tierInfo[currentTier as keyof typeof tierInfo]?.color || "text-amber-700";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      
      <main className="flex-1 pt-32 md:pt-40 pb-24">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Minha Conta
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo(a), {profile?.full_name || user.email}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <TierIcon className={`w-8 h-8 mx-auto mb-2 ${tierColor}`} />
                <p className="text-sm text-muted-foreground">Nível</p>
                <p className="font-semibold capitalize">{tierInfo[currentTier as keyof typeof tierInfo]?.name}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Gift className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Pontos</p>
                <p className="font-semibold">{loyalty?.total_points || 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Pedidos</p>
                <p className="font-semibold">{orders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                {isProfessional ? (
                  <>
                    <Star className="w-8 h-8 mx-auto mb-2 text-gold fill-gold" />
                    <p className="text-sm text-muted-foreground">Profissional</p>
                    <p className="font-semibold text-gold">{discountPercentage}% OFF</p>
                  </>
                ) : (
                  <>
                    <Star className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Profissional</p>
                    <Link to="/solicitar-profissional" className="text-sm text-primary hover:underline">
                      Solicitar
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="orders" className="gap-2">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Endereços</span>
              </TabsTrigger>
              <TabsTrigger value="loyalty" className="gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Fidelidade</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Configurações</span>
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Pedidos</CardTitle>
                  <CardDescription>Acompanhe o status dos seus pedidos</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">Você ainda não fez nenhum pedido</p>
                      <Button asChild>
                        <Link to="/loja">Começar a Comprar</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div 
                          key={order.id} 
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold">{order.order_number}</span>
                              <Badge className={statusColors[order.status]}>
                                {statusLabels[order.status] || order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">R$ {order.total.toFixed(2)}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground ml-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Meus Endereços</CardTitle>
                    <CardDescription>Gerencie seus endereços de entrega</CardDescription>
                  </div>
                  <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => setEditingAddress(null)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {editingAddress ? "Editar Endereço" : "Novo Endereço"}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Apelido</Label>
                            <Input 
                              value={addressForm.label} 
                              onChange={(e) => setAddressForm({...addressForm, label: e.target.value})}
                              placeholder="Casa, Trabalho..."
                            />
                          </div>
                          <div>
                            <Label>CEP</Label>
                            <Input 
                              value={addressForm.zip_code} 
                              onChange={(e) => setAddressForm({...addressForm, zip_code: e.target.value})}
                              placeholder="00000-000"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Nome do destinatário</Label>
                          <Input 
                            value={addressForm.recipient_name} 
                            onChange={(e) => setAddressForm({...addressForm, recipient_name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <Label>Rua</Label>
                            <Input 
                              value={addressForm.street} 
                              onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label>Número</Label>
                            <Input 
                              value={addressForm.number} 
                              onChange={(e) => setAddressForm({...addressForm, number: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Complemento</Label>
                          <Input 
                            value={addressForm.complement} 
                            onChange={(e) => setAddressForm({...addressForm, complement: e.target.value})}
                            placeholder="Apto, Bloco..."
                          />
                        </div>
                        <div>
                          <Label>Bairro</Label>
                          <Input 
                            value={addressForm.neighborhood} 
                            onChange={(e) => setAddressForm({...addressForm, neighborhood: e.target.value})}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Cidade</Label>
                            <Input 
                              value={addressForm.city} 
                              onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label>Estado</Label>
                            <Input 
                              value={addressForm.state} 
                              onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                              placeholder="SP"
                              maxLength={2}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full">
                          {editingAddress ? "Salvar" : "Adicionar"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Nenhum endereço cadastrado</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {addresses.map((address) => (
                        <div key={address.id} className="p-4 border rounded-lg relative">
                          {address.is_default && (
                            <Badge className="absolute top-2 right-2" variant="secondary">Padrão</Badge>
                          )}
                          <p className="font-semibold mb-1">{address.label}</p>
                          <p className="text-sm text-muted-foreground">{address.recipient_name}</p>
                          <p className="text-sm">
                            {address.street}, {address.number}
                            {address.complement && ` - ${address.complement}`}
                          </p>
                          <p className="text-sm">{address.neighborhood}</p>
                          <p className="text-sm">{address.city} - {address.state}</p>
                          <p className="text-sm">{address.zip_code}</p>
                          <div className="flex gap-2 mt-3">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditingAddress(address);
                                setAddressForm({
                                  label: address.label,
                                  recipient_name: address.recipient_name,
                                  street: address.street,
                                  number: address.number,
                                  complement: address.complement || "",
                                  neighborhood: address.neighborhood,
                                  city: address.city,
                                  state: address.state,
                                  zip_code: address.zip_code,
                                  is_default: address.is_default,
                                });
                                setAddressDialogOpen(true);
                              }}
                            >
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Loyalty Tab */}
            <TabsContent value="loyalty">
              <Card>
                <CardHeader>
                  <CardTitle>Programa de Fidelidade</CardTitle>
                  <CardDescription>Ganhe pontos a cada compra e troque por descontos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Status */}
                  <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-primary/10 to-gold/10 rounded-xl">
                    <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
                      <TierIcon className={`w-10 h-10 ${tierColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Seu nível atual</p>
                      <h3 className="text-2xl font-bold capitalize">
                        {tierInfo[currentTier as keyof typeof tierInfo]?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {loyalty?.lifetime_points || 0} pontos acumulados
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">{loyalty?.total_points || 0}</p>
                      <p className="text-sm text-muted-foreground">pontos disponíveis</p>
                    </div>
                  </div>

                  {/* How it works */}
                  <div>
                    <h4 className="font-semibold mb-4">Como funciona</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="font-medium">Compre</p>
                        <p className="text-sm text-muted-foreground">Ganhe 1 ponto a cada R$ 1</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <Gift className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="font-medium">Acumule</p>
                        <p className="text-sm text-muted-foreground">Suba de nível e ganhe mais</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="font-medium">Troque</p>
                        <p className="text-sm text-muted-foreground">100 pontos = R$ 5</p>
                      </div>
                    </div>
                  </div>

                  {/* Tiers */}
                  <div>
                    <h4 className="font-semibold mb-4">Níveis</h4>
                    <div className="grid md:grid-cols-4 gap-4">
                      {Object.entries(tierInfo).map(([key, info]) => (
                        <div 
                          key={key} 
                          className={`p-4 border rounded-lg text-center ${currentTier === key ? 'border-primary bg-primary/5' : ''}`}
                        >
                          <info.icon className={`w-6 h-6 mx-auto mb-2 ${info.color}`} />
                          <p className="font-medium">{info.name}</p>
                          <p className="text-xs text-muted-foreground">{info.minPoints}+ pts</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>Gerencie sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Dados Pessoais</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {!isProfessional && (
                      <Link 
                        to="/solicitar-profissional"
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-gold" />
                          <div>
                            <p className="font-medium">Cadastro Profissional</p>
                            <p className="text-sm text-muted-foreground">
                              {professionalRequest?.status === "pending" 
                                ? "Solicitação em análise"
                                : "Solicite desconto especial"}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                    )}

                    <Link 
                      to="/favoritos"
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Favoritos</p>
                          <p className="text-sm text-muted-foreground">Produtos salvos</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </Link>
                  </div>

                  <Separator />

                  <Button variant="outline" className="w-full text-destructive" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default MyAccount;
