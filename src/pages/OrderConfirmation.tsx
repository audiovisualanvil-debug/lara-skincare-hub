import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail, 
  Copy, 
  ShoppingBag,
  ArrowRight,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderData {
  orderId: string;
  items: OrderItem[];
  shipping: {
    name: string;
    email: string;
    phone: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  payment: {
    method: string;
    lastFourDigits?: string;
  };
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  estimatedDelivery: string;
  createdAt: string;
}

const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BE-${timestamp}${random}`;
};

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Get order data from navigation state or localStorage
    const stateData = location.state as Partial<OrderData> | null;
    
    if (stateData && stateData.items) {
      const order: OrderData = {
        orderId: generateOrderId(),
        items: stateData.items || [],
        shipping: stateData.shipping || {
          name: "",
          email: "",
          phone: "",
          address: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
          cep: "",
        },
        payment: stateData.payment || { method: "Cartão de Crédito" },
        subtotal: stateData.subtotal || 0,
        discount: stateData.discount || 0,
        shippingCost: stateData.shippingCost || 0,
        total: stateData.total || 0,
        estimatedDelivery: stateData.estimatedDelivery || "5-8 dias úteis",
        createdAt: new Date().toISOString(),
      };
      setOrderData(order);
    } else {
      // Demo order for direct access
      setOrderData({
        orderId: generateOrderId(),
        items: [
          {
            id: "1",
            name: "Sérum Vitamina C Nano",
            brand: "Tulípia",
            price: 189.90,
            quantity: 1,
          },
          {
            id: "2",
            name: "Hidratante Facial Intensivo",
            brand: "Mezzo",
            price: 129.90,
            quantity: 2,
          },
        ],
        shipping: {
          name: "Maria Silva",
          email: "maria@exemplo.com",
          phone: "(11) 99999-9999",
          address: "Rua das Flores",
          number: "123",
          complement: "Apto 45",
          neighborhood: "Jardim Primavera",
          city: "São Paulo",
          state: "SP",
          cep: "01234-567",
        },
        payment: {
          method: "Cartão de Crédito",
          lastFourDigits: "4567",
        },
        subtotal: 449.70,
        discount: 44.97,
        shippingCost: 0,
        total: 404.73,
        estimatedDelivery: "5-8 dias úteis",
        createdAt: new Date().toISOString(),
      });
    }
  }, [location.state]);

  const copyOrderId = () => {
    if (orderData) {
      navigator.clipboard.writeText(orderData.orderId);
      toast.success("Código do pedido copiado!");
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { icon: CheckCircle, label: "Pedido Confirmado", status: "completed" },
    { icon: Package, label: "Em Preparação", status: "current" },
    { icon: Truck, label: "Em Transporte", status: "pending" },
    { icon: MapPin, label: "Entregue", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-background">
      <MainHeader />
      
      <main className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Pedido Confirmado! 🎉
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Obrigado pela sua compra! Você receberá um e-mail com todos os detalhes.
          </p>
        </motion.div>

        {/* Order ID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-border/50 p-6 mb-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Número do Pedido</p>
              <p className="text-2xl font-mono font-bold text-foreground">{orderData.orderId}</p>
            </div>
            <Button variant="outline" onClick={copyOrderId} className="gap-2">
              <Copy className="w-4 h-4" />
              Copiar Código
            </Button>
          </div>
        </motion.div>

        {/* Order Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-border/50 p-6 mb-6 shadow-sm"
        >
          <h2 className="font-semibold text-lg mb-6">Acompanhe seu Pedido</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full hidden sm:block" />
            <div className="absolute top-6 left-0 h-1 bg-green-500 rounded-full w-[12.5%] hidden sm:block" />
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";
                
                return (
                  <div key={step.label} className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-primary/10 text-primary border-2 border-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <p className={`text-sm font-medium ${
                      isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-xl flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm">
              <span className="font-medium">Previsão de entrega:</span>{" "}
              <span className="text-primary font-semibold">{orderData.estimatedDelivery}</span>
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm"
          >
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Itens do Pedido
            </h2>
            
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-muted/30 rounded-xl">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Package className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Qtd: {item.quantity}</span>
                      <span className="font-semibold text-primary">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {orderData.subtotal.toFixed(2)}</span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span>- R$ {orderData.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className={orderData.shippingCost === 0 ? "text-green-600" : ""}>
                  {orderData.shippingCost === 0 ? "Grátis" : `R$ ${orderData.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping & Payment Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm"
            >
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Endereço de Entrega
              </h2>
              
              <div className="space-y-2 text-sm">
                <p className="font-medium">{orderData.shipping.name}</p>
                <p className="text-muted-foreground">
                  {orderData.shipping.address}, {orderData.shipping.number}
                  {orderData.shipping.complement && ` - ${orderData.shipping.complement}`}
                </p>
                <p className="text-muted-foreground">
                  {orderData.shipping.neighborhood}, {orderData.shipping.city} - {orderData.shipping.state}
                </p>
                <p className="text-muted-foreground">CEP: {orderData.shipping.cep}</p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{orderData.shipping.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{orderData.shipping.phone}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm"
            >
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Pagamento
              </h2>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{orderData.payment.method}</p>
                  {orderData.payment.lastFourDigits && (
                    <p className="text-xs text-muted-foreground">
                      Terminado em ****{orderData.payment.lastFourDigits}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 sm:p-8"
        >
          <h2 className="font-semibold text-lg mb-4">Próximos Passos</h2>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium text-sm">Confirmação por E-mail</p>
                <p className="text-xs text-muted-foreground">Você receberá um e-mail com os detalhes do pedido</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-sm">Rastreamento</p>
                <p className="text-xs text-muted-foreground">Enviaremos o código de rastreio assim que sair</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-sm">Receba em Casa</p>
                <p className="text-xs text-muted-foreground">Aguarde seu pedido no prazo estimado</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <Link to="/loja">
              Continuar Comprando
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
            <Link to="/faq">
              <HelpCircle className="w-4 h-4" />
              Precisa de Ajuda?
            </Link>
          </Button>
        </motion.div>
      </main>

      <MainFooter />
    </div>
  );
};

export default OrderConfirmation;
