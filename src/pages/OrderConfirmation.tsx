import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  ShoppingBag,
  ArrowRight,
  Clock,
  MapPin,
  CreditCard,
  HelpCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { supabase } from "@/integrations/supabase/client";

interface OrderInfo {
  order_number: string;
  customer_name: string;
  customer_email: string;
  payment_status: string;
  order_status: string;
  items: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product_image?: string;
  }>;
  subtotal: number;
  discount_amount: number;
  shipping_amount: number;
  total: number;
}

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("Sessão de pagamento não encontrada");
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke('verify-payment', {
          body: { session_id: sessionId },
        });

        if (fnError) throw new Error(fnError.message);
        if (data?.error) throw new Error(data.error);

        setOrderInfo({
          order_number: data.order?.order_number || "—",
          customer_name: data.customer_name || "",
          customer_email: data.customer_email || "",
          payment_status: data.payment_status,
          order_status: data.order_status,
          items: data.order?.order_items || [],
          subtotal: data.order?.subtotal || 0,
          discount_amount: data.order?.discount_amount || 0,
          shipping_amount: data.order?.shipping_amount || 0,
          total: data.order?.total || 0,
        });
      } catch (err) {
        console.error("Error verifying payment:", err);
        setError(err instanceof Error ? err.message : "Erro ao verificar pagamento");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (error || !orderInfo) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader />
        <main className="container max-w-lg mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Ops!</h1>
          <p className="text-muted-foreground mb-6">{error || "Pedido não encontrado"}</p>
          <Button asChild>
            <Link to="/loja">Voltar à Loja</Link>
          </Button>
        </main>
        <MainFooter />
      </div>
    );
  }

  const isPaid = orderInfo.payment_status === "paid";

  const steps = [
    { icon: CheckCircle, label: "Pedido Confirmado", status: isPaid ? "completed" : "current" },
    { icon: Package, label: "Em Preparação", status: isPaid ? "current" : "pending" },
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
            {isPaid ? "Pedido Confirmado! 🎉" : "Pagamento Pendente"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            {isPaid 
              ? "Obrigado pela sua compra! Você receberá um e-mail com todos os detalhes."
              : "Seu pedido foi registrado. Aguardando confirmação do pagamento."}
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
              <p className="text-2xl font-mono font-bold text-foreground">{orderInfo.order_number}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {isPaid ? "✅ Pago" : "⏳ Pendente"}
            </div>
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
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

          <div className="mt-6 p-4 bg-primary/5 rounded-xl flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm">
              <span className="font-medium">Previsão de entrega:</span>{" "}
              <span className="text-primary font-semibold">5-12 dias úteis</span>
            </p>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-border/50 p-6 mb-6 shadow-sm"
        >
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Itens do Pedido
          </h2>
          
          <div className="space-y-4">
            {orderInfo.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-3 bg-muted/30 rounded-xl">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  {item.product_image ? (
                    <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Package className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.product_name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Qtd: {item.quantity}</span>
                    <span className="font-semibold text-primary">R$ {item.total_price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R$ {orderInfo.subtotal.toFixed(2)}</span>
            </div>
            {orderInfo.discount_amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Desconto</span>
                <span>- R$ {orderInfo.discount_amount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frete</span>
              <span className={orderInfo.shipping_amount === 0 ? "text-green-600" : ""}>
                {orderInfo.shipping_amount === 0 ? "Grátis" : `R$ ${orderInfo.shipping_amount.toFixed(2)}`}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">R$ {orderInfo.total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
