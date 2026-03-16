import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Eye,
  Loader2,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  RefreshCw,
  ChevronDown,
  X,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { resolveProductImage } from "@/utils/resolveProductImage";

type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_sku: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  subtotal: number;
  shipping_amount: number;
  discount_amount: number;
  coupon_code: string | null;
  coupon_discount: number | null;
  total: number;
  payment_method: string | null;
  payment_status: string | null;
  shipping_address: any;
  notes: string | null;
  admin_notes: string | null;
  is_professional_order: boolean;
  professional_discount_percent: number | null;
  created_at: string;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pendente", icon: Clock, color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  paid: { label: "Pago", icon: CreditCard, color: "bg-blue-100 text-blue-800 border-blue-200" },
  processing: { label: "Processando", icon: Package, color: "bg-purple-100 text-purple-800 border-purple-200" },
  shipped: { label: "Enviado", icon: Truck, color: "bg-orange-100 text-orange-800 border-orange-200" },
  delivered: { label: "Entregue", icon: CheckCircle2, color: "bg-green-100 text-green-800 border-green-200" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "bg-red-100 text-red-800 border-red-200" },
};

const STATUS_FLOW: Record<string, OrderStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

const formatCurrency = (value: number) =>
  `R$ ${Number(value).toFixed(2).replace(".", ",")}`;

const AdminOrders = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Detail modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate("/auth", { state: { from: "/admin/pedidos" } });
      } else if (!isAdmin) {
        navigate("/");
        toast.error("Acesso não autorizado");
      } else {
        fetchOrders();
      }
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders((data || []) as Order[]);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  const openOrderDetail = async (order: Order) => {
    setSelectedOrder(order);
    setAdminNotes(order.admin_notes || "");
    setLoadingItems(true);

    try {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);

      if (error) throw error;
      setOrderItems((data || []) as OrderItem[]);
    } catch (error) {
      console.error("Error fetching order items:", error);
      toast.error("Erro ao carregar itens do pedido");
    } finally {
      setLoadingItems(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingStatus(true);
    try {
      const updateData: any = { status: newStatus };

      if (newStatus === "shipped") updateData.shipped_at = new Date().toISOString();
      if (newStatus === "delivered") updateData.delivered_at = new Date().toISOString();
      if (newStatus === "cancelled") updateData.cancelled_at = new Date().toISOString();

      const { error } = await supabase
        .from("orders")
        .update(updateData)
        .eq("id", orderId);

      if (error) throw error;

      toast.success(`Status atualizado para "${STATUS_CONFIG[newStatus].label}"`);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...updateData } : o))
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, ...updateData } : prev));
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error.message || "Erro ao atualizar status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const saveAdminNotes = async () => {
    if (!selectedOrder) return;
    try {
      const { error } = await supabase
        .from("orders")
        .update({ admin_notes: adminNotes || null })
        .eq("id", selectedOrder.id);

      if (error) throw error;
      toast.success("Observações salvas");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id ? { ...o, admin_notes: adminNotes || null } : o
        )
      );
    } catch (error) {
      toast.error("Erro ao salvar observações");
    }
  };

  const counts: Record<string, number> = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || o.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const StatusBadge = ({ status }: { status: OrderStatus }) => {
    const config = STATUS_CONFIG[status];
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />

      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                  Gerenciar Pedidos
                </h1>
                <p className="text-muted-foreground mt-1">
                  {orders.length} pedidos no total
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={fetchOrders}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número do pedido, nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="flex-wrap h-auto gap-1">
              <TabsTrigger value="all">Todos ({counts.all})</TabsTrigger>
              <TabsTrigger value="pending">Pendentes ({counts.pending})</TabsTrigger>
              <TabsTrigger value="paid">Pagos ({counts.paid})</TabsTrigger>
              <TabsTrigger value="processing">Processando ({counts.processing})</TabsTrigger>
              <TabsTrigger value="shipped">Enviados ({counts.shipped})</TabsTrigger>
              <TabsTrigger value="delivered">Entregues ({counts.delivered})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelados ({counts.cancelled})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground">Nenhum pedido encontrado</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/50">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pedido</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead className="w-32">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <div>
                                <p className="font-mono font-semibold text-sm">{order.order_number}</p>
                                {order.is_professional_order && (
                                  <Badge variant="secondary" className="text-xs mt-1">
                                    Profissional
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-sm">{order.customer_name}</p>
                                <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={order.status} />
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(order.total)}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {format(new Date(order.created_at), "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => openOrderDetail(order)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {STATUS_FLOW[order.status]?.length > 0 && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="sm" variant="outline" disabled={updatingStatus}>
                                        <ChevronDown className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {STATUS_FLOW[order.status].map((nextStatus) => {
                                        const config = STATUS_CONFIG[nextStatus];
                                        const Icon = config.icon;
                                        return (
                                          <DropdownMenuItem
                                            key={nextStatus}
                                            onClick={() => updateOrderStatus(order.id, nextStatus)}
                                          >
                                            <Icon className="w-4 h-4 mr-2" />
                                            Marcar como {config.label}
                                          </DropdownMenuItem>
                                        );
                                      })}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Pedido {selectedOrder.order_number}</span>
                  <StatusBadge status={selectedOrder.status} />
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-3">CLIENTE</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {selectedOrder.customer_name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedOrder.customer_email}
                    </div>
                    {selectedOrder.customer_phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {selectedOrder.customer_phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {format(new Date(selectedOrder.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shipping_address && (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />ENDEREÇO DE ENTREGA
                    </h3>
                    <p className="text-sm">
                      {selectedOrder.shipping_address.street}, {selectedOrder.shipping_address.number}
                      {selectedOrder.shipping_address.complement && ` - ${selectedOrder.shipping_address.complement}`}
                      <br />
                      {selectedOrder.shipping_address.neighborhood} - {selectedOrder.shipping_address.city}/{selectedOrder.shipping_address.state}
                      <br />
                      CEP: {selectedOrder.shipping_address.zip_code}
                    </p>
                  </div>
                )}

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-3">ITENS DO PEDIDO</h3>
                  {loadingItems ? (
                    <div className="flex justify-center py-6">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          {item.product_image ? (
                            <img
                              src={resolveProductImage(item.product_image)}
                              alt={item.product_name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                              <Package className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.product_name}</p>
                            {item.product_sku && (
                              <p className="text-xs text-muted-foreground">SKU: {item.product_sku}</p>
                            )}
                          </div>
                          <div className="text-right text-sm">
                            <p>{item.quantity}x {formatCurrency(item.unit_price)}</p>
                            <p className="font-semibold">{formatCurrency(item.total_price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  {selectedOrder.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto {selectedOrder.coupon_code && `(${selectedOrder.coupon_code})`}</span>
                      <span>-{formatCurrency(selectedOrder.discount_amount)}</span>
                    </div>
                  )}
                  {selectedOrder.professional_discount_percent && selectedOrder.professional_discount_percent > 0 && (
                    <div className="flex justify-between text-blue-600">
                      <span>Desconto Profissional ({selectedOrder.professional_discount_percent}%)</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span>{selectedOrder.shipping_amount > 0 ? formatCurrency(selectedOrder.shipping_amount) : "Grátis"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>

                {/* Status Actions */}
                {STATUS_FLOW[selectedOrder.status]?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">ALTERAR STATUS</h3>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_FLOW[selectedOrder.status].map((nextStatus) => {
                        const config = STATUS_CONFIG[nextStatus];
                        const Icon = config.icon;
                        return (
                          <Button
                            key={nextStatus}
                            variant={nextStatus === "cancelled" ? "destructive" : "outline"}
                            size="sm"
                            disabled={updatingStatus}
                            onClick={() => updateOrderStatus(selectedOrder.id, nextStatus)}
                          >
                            {updatingStatus ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Icon className="w-4 h-4 mr-2" />
                            )}
                            {config.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">OBSERVAÇÕES INTERNAS</Label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Notas internas sobre este pedido..."
                    className="mt-2"
                    rows={3}
                  />
                  <Button size="sm" variant="outline" className="mt-2" onClick={saveAdminNotes}>
                    Salvar Observações
                  </Button>
                </div>

                {/* Client Notes */}
                {selectedOrder.notes && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">OBSERVAÇÃO DO CLIENTE</p>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <MainFooter />
    </div>
  );
};

export default AdminOrders;
