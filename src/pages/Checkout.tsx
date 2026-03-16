import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CreditCard, Truck, Check, ShoppingBag, Minus, Plus, X, Shield, AlertCircle, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useBrandTheme, BrandThemeProvider, getBrandTheme, BrandName } from "@/contexts/BrandThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { shippingSchema, paymentSchema } from "@/lib/validations/checkout";
import FormField from "@/components/checkout/FormField";
import { cn } from "@/lib/utils";
import { fetchAddressByCEP } from "@/lib/cep";

const CheckoutContent = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, total, appliedCoupon, updateQuantity, removeItem, applyCoupon, removeCoupon, clearCart } = useCart();
  const { currentTheme, dominantBrand, allBrands, brandCounts } = useBrandTheme();
  
  const [couponCode, setCouponCode] = useState("");
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<string>("PAC");
  const [selectedPayment, setSelectedPayment] = useState<"card" | "pix" | "boleto">("card");
  
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);

  const shippingOptions = [
    { name: "PAC", price: 19.90, days: "8-12 dias úteis" },
    { name: "SEDEX", price: 34.90, days: "3-5 dias úteis" },
  ];

  const selectedShippingOption = shippingOptions.find(o => o.name === selectedShipping) || shippingOptions[0];

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    if (result.success) {
      toast.success(result.message);
      setCouponCode("");
    } else {
      toast.error(result.message);
    }
  };

  const validateShipping = (): boolean => {
    const result = shippingSchema.safeParse(shippingData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = err.message;
        }
      });
      setShippingErrors(errors);
      toast.error("Por favor, corrija os campos destacados");
      return false;
    }
    setShippingErrors({});
    return true;
  };

  const validatePayment = (): boolean => {
    if (selectedPayment !== "card") {
      setPaymentErrors({});
      return true;
    }

    const result = paymentSchema.safeParse(paymentData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = err.message;
        }
      });
      setPaymentErrors(errors);
      toast.error("Por favor, corrija os dados do cartão");
      return false;
    }
    setPaymentErrors({});
    return true;
  };

  const handleShippingSubmit = () => {
    if (validateShipping()) {
      setStep("payment");
    }
  };

  const handleSubmit = async () => {
    if (selectedPayment === "card" && !validatePayment()) return;

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
          })),
          shippingData,
          shippingCost: selectedShippingOption.price,
          shippingMethod: selectedShipping,
          couponCode: appliedCoupon?.code,
          paymentMethod: selectedPayment,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.url) {
        // Clear cart before redirecting
        clearCart();
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("URL de pagamento não recebida");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      const msg = error?.message || "Erro ao processar pagamento. Tente novamente.";
      toast.error(msg);
      setIsProcessing(false);
    }
  };

  // Format phone number as user types
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
  };

  // Format CEP as user types
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{5})(\d{0,3})/, "$1-$2").trim();
  };

  // Handle CEP lookup
  const handleCEPChange = useCallback(async (value: string) => {
    const formattedCEP = formatCEP(value);
    setShippingData(prev => ({ ...prev, cep: formattedCEP }));
    if (shippingErrors.cep) setShippingErrors(prev => ({ ...prev, cep: "" }));

    const cleanCEP = value.replace(/\D/g, "");
    if (cleanCEP.length === 8) {
      setIsLoadingCEP(true);
      const address = await fetchAddressByCEP(cleanCEP);
      setIsLoadingCEP(false);

      if (address) {
        setShippingData(prev => ({
          ...prev,
          address: address.address,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
        }));
        setShippingErrors(prev => ({
          ...prev,
          address: "",
          neighborhood: "",
          city: "",
          state: "",
        }));
        toast.success("Endereço encontrado!");
      } else {
        toast.error("CEP não encontrado. Preencha o endereço manualmente.");
      }
    }
  }, [shippingErrors.cep]);

  // Format card number as user types
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  // Format expiry date as user types
  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return numbers.substring(0, 2) + "/" + numbers.substring(2, 4);
    }
    return numbers;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-display">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground">Adicione produtos para continuar</p>
          <Button asChild>
            <Link to="/shop">Ver Produtos</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Dynamic CSS variables based on theme
  const themeStyles = {
    "--checkout-primary": `hsl(${currentTheme.colors.primary})`,
    "--checkout-accent": `hsl(${currentTheme.colors.accent})`,
  } as React.CSSProperties;

  return (
    <motion.div 
      key={dominantBrand}
      initial={{ opacity: 0.8 }}
      animate={{ 
        opacity: 1,
        backgroundColor: `hsl(${currentTheme.colors.background})`,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen"
      style={{
        ...themeStyles,
        fontFamily: currentTheme.typography.headingFont,
      }}
    >
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        initial={false}
        animate={{ 
          borderColor: `hsl(${currentTheme.colors.primary} / 0.1)`,
          backgroundColor: `hsl(${currentTheme.colors.background} / 0.9)`,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm hover:opacity-70 transition-all duration-300"
            style={{ color: `hsl(${currentTheme.colors.foreground})` }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          
          <motion.div 
            className="flex items-center gap-3"
            initial={false}
            animate={{ color: currentTheme.colors.primaryHex }}
            transition={{ duration: 0.4 }}
          >
            <Lock className="w-4 h-4" />
            <motion.span 
              key={currentTheme.microcopy.securityNote}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium"
              style={{ color: `hsl(${currentTheme.colors.foreground} / 0.7)` }}
            >
              {currentTheme.microcopy.securityNote}
            </motion.span>
          </motion.div>
        </div>
      </motion.header>

      {/* Brand indicator - Shows all brands in cart */}
      {allBrands.length > 0 && dominantBrand !== "neutral" && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-3 px-4"
          style={{ 
            backgroundColor: `hsl(${currentTheme.colors.accent})`,
          }}
        >
          <div className="container max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
            <span 
              className="text-sm opacity-70"
              style={{ color: `hsl(${currentTheme.colors.foreground})` }}
            >
              Marcas no carrinho:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {allBrands.map((brand) => {
                const theme = getBrandTheme(brand);
                const count = brandCounts[brand] || 0;
                const isDominant = brand === dominantBrand;
                
                return (
                  <motion.div
                    key={brand}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
                      ${isDominant ? 'ring-2 ring-offset-1' : ''}
                    `}
                    style={{
                      backgroundColor: theme.colors.primaryHex,
                      color: 'white',
                      '--tw-ring-color': isDominant ? theme.colors.primaryHex : 'transparent',
                    } as React.CSSProperties}
                  >
                    <span className="font-medium">{theme.displayName}</span>
                    <span 
                      className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs font-semibold"
                    >
                      {count}
                    </span>
                    {isDominant && (
                      <Check className="w-3 h-3" />
                    )}
                  </motion.div>
                );
              })}
            </div>
            {allBrands.length > 1 && (
              <span 
                className="text-xs opacity-60 ml-2"
                style={{ color: `hsl(${currentTheme.colors.foreground})` }}
              >
                Tema: {currentTheme.displayName}
              </span>
            )}
          </div>
        </motion.div>
      )}

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Enhanced Progress Steps */}
        <div className="mb-12">
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full mx-16 hidden sm:block" />
            
            {/* Progress Bar Fill */}
            <motion.div 
              className="absolute top-6 left-0 h-1 rounded-full mx-16 hidden sm:block"
              style={{ backgroundColor: currentTheme.colors.primaryHex }}
              initial={{ width: "0%" }}
              animate={{ 
                width: step === "cart" ? "0%" : step === "shipping" ? "50%" : "100%"
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            
            <div className="relative flex items-center justify-between max-w-lg mx-auto">
              {[
                { key: "cart", label: "Carrinho", icon: ShoppingBag, description: "Revise seus itens" },
                { key: "shipping", label: "Entrega", icon: Truck, description: "Endereço e frete" },
                { key: "payment", label: "Pagamento", icon: CreditCard, description: "Finalize a compra" },
              ].map((s, i) => {
                const isActive = step === s.key;
                const isCompleted = ["cart", "shipping", "payment"].indexOf(step) > i;
                const Icon = s.icon;
                
                return (
                  <motion.div
                    key={s.key}
                    className="flex flex-col items-center z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        backgroundColor: isActive || isCompleted
                          ? currentTheme.colors.primaryHex
                          : "hsl(var(--background))",
                        borderColor: currentTheme.colors.primaryHex,
                        boxShadow: isActive 
                          ? `0 0 0 4px ${currentTheme.colors.primaryHex}30, 0 4px 12px ${currentTheme.colors.primaryHex}40`
                          : "none",
                      }}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        const steps = ["cart", "shipping", "payment"];
                        if (steps.indexOf(s.key) <= steps.indexOf(step)) {
                          setStep(s.key as "cart" | "shipping" | "payment");
                        }
                      }}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </motion.div>
                      ) : (
                        <Icon 
                          className="w-5 h-5 sm:w-6 sm:h-6 transition-colors"
                          style={{ 
                            color: isActive ? "white" : currentTheme.colors.primaryHex 
                          }}
                        />
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="mt-3 text-center"
                      animate={{ opacity: isActive ? 1 : 0.6 }}
                    >
                      <p 
                        className={`text-sm font-medium ${isActive ? '' : 'text-muted-foreground'}`}
                        style={{ color: isActive ? currentTheme.colors.primaryHex : undefined }}
                      >
                        {s.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                        {s.description}
                      </p>
                    </motion.div>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: currentTheme.colors.primaryHex }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === "cart" && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h1 
                    className="text-3xl font-medium"
                    style={{ 
                      fontFamily: currentTheme.typography.headingFont,
                      color: `hsl(${currentTheme.colors.foreground})`,
                    }}
                  >
                    Seu Carrinho
                  </h1>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 p-4 rounded-lg bg-white shadow-sm"
                        style={{ borderColor: `hsl(${currentTheme.colors.primary} / 0.1)` }}
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                          <h3 
                            className="font-medium text-sm truncate"
                            style={{ color: `hsl(${currentTheme.colors.foreground})` }}
                          >
                            {item.name}
                          </h3>
                          <p 
                            className="font-semibold mt-1"
                            style={{ color: currentTheme.colors.primaryHex }}
                          >
                            R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-2 border rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Cupom de desconto"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      style={{ borderColor: currentTheme.colors.primaryHex, color: currentTheme.colors.primaryHex }}
                    >
                      Aplicar
                    </Button>
                  </div>

                  {appliedCoupon && (
                    <div 
                      className="flex items-center justify-between p-3 rounded-md text-sm"
                      style={{ backgroundColor: `hsl(${currentTheme.colors.accent})` }}
                    >
                      <span>Cupom <strong>{appliedCoupon.code}</strong> aplicado!</span>
                      <button onClick={removeCoupon} className="text-destructive text-xs">Remover</button>
                    </div>
                  )}

                  <motion.div
                    key={`cta-${dominantBrand}`}
                    initial={{ scale: 0.98, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={() => setStep("shipping")}
                      className={`w-full h-12 transition-all duration-300 ${currentTheme.button.className}`}
                    >
                      Continuar para Entrega
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep("cart")} className="p-2 hover:bg-muted rounded-md">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h1 
                      className="text-3xl font-medium"
                      style={{ 
                        fontFamily: currentTheme.typography.headingFont,
                        color: `hsl(${currentTheme.colors.foreground})`,
                      }}
                    >
                      Dados de Entrega
                    </h1>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        id="name"
                        label="Nome completo *"
                        value={shippingData.name}
                        onChange={(value) => {
                          setShippingData({ ...shippingData, name: value });
                          if (shippingErrors.name) setShippingErrors({ ...shippingErrors, name: "" });
                        }}
                        error={shippingErrors.name}
                        placeholder="Seu nome completo"
                        maxLength={100}
                      />
                      <FormField
                        id="email"
                        label="E-mail *"
                        type="email"
                        value={shippingData.email}
                        onChange={(value) => {
                          setShippingData({ ...shippingData, email: value });
                          if (shippingErrors.email) setShippingErrors({ ...shippingErrors, email: "" });
                        }}
                        error={shippingErrors.email}
                        placeholder="seu@email.com"
                        maxLength={255}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        id="phone"
                        label="Telefone *"
                        value={shippingData.phone}
                        onChange={(value) => {
                          setShippingData({ ...shippingData, phone: formatPhone(value) });
                          if (shippingErrors.phone) setShippingErrors({ ...shippingErrors, phone: "" });
                        }}
                        error={shippingErrors.phone}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                      />
                      <div className="space-y-1.5">
                        <FormField
                          id="cep"
                          label="CEP *"
                          value={shippingData.cep}
                          onChange={handleCEPChange}
                          error={shippingErrors.cep}
                          placeholder="00000-000"
                          maxLength={9}
                        />
                        {isLoadingCEP && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Buscando endereço...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <FormField
                        id="address"
                        label="Endereço *"
                        className="sm:col-span-2"
                        value={shippingData.address}
                        onChange={(value) => {
                          setShippingData({ ...shippingData, address: value });
                          if (shippingErrors.address) setShippingErrors({ ...shippingErrors, address: "" });
                        }}
                        error={shippingErrors.address}
                        placeholder="Rua, Avenida..."
                        maxLength={200}
                      />
                      <FormField
                        id="number"
                        label="Número *"
                        value={shippingData.number}
                        onChange={(value) => {
                          setShippingData({ ...shippingData, number: value });
                          if (shippingErrors.number) setShippingErrors({ ...shippingErrors, number: "" });
                        }}
                        error={shippingErrors.number}
                        placeholder="123"
                        maxLength={10}
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <FormField
                        id="complement"
                        label="Complemento"
                        value={shippingData.complement}
                        onChange={(value) => setShippingData({ ...shippingData, complement: value })}
                        placeholder="Apto, bloco..."
                        maxLength={100}
                      />
                      <FormField
                        id="neighborhood"
                        label="Bairro *"
                        value={shippingData.neighborhood}
                        onChange={(value) => {
                          setShippingData({ ...shippingData, neighborhood: value });
                          if (shippingErrors.neighborhood) setShippingErrors({ ...shippingErrors, neighborhood: "" });
                        }}
                        error={shippingErrors.neighborhood}
                        placeholder="Seu bairro"
                        maxLength={100}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          id="city"
                          label="Cidade *"
                          value={shippingData.city}
                          onChange={(value) => {
                            setShippingData({ ...shippingData, city: value });
                            if (shippingErrors.city) setShippingErrors({ ...shippingErrors, city: "" });
                          }}
                          error={shippingErrors.city}
                          placeholder="Cidade"
                          maxLength={100}
                        />
                        <FormField
                          id="state"
                          label="UF *"
                          value={shippingData.state}
                          onChange={(value) => {
                            setShippingData({ ...shippingData, state: value.toUpperCase() });
                            if (shippingErrors.state) setShippingErrors({ ...shippingErrors, state: "" });
                          }}
                          error={shippingErrors.state}
                          placeholder="SP"
                          maxLength={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping options */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Opções de Frete</h3>
                    <div className="space-y-2">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.name}
                          className={cn(
                            "flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all",
                            selectedShipping === option.name 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => setSelectedShipping(option.name)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                              selectedShipping === option.name 
                                ? "border-primary" 
                                : "border-muted-foreground"
                            )}>
                              {selectedShipping === option.name && (
                                <motion.div 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2.5 h-2.5 rounded-full bg-primary"
                                />
                              )}
                            </div>
                            <Truck className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{option.name}</p>
                              <p className="text-sm text-muted-foreground">{option.days}</p>
                            </div>
                          </div>
                          <span className="font-semibold" style={{ color: currentTheme.colors.primaryHex }}>
                            R$ {option.price.toFixed(2)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleShippingSubmit}
                    className={`w-full h-12 ${currentTheme.button.className}`}
                  >
                    Continuar para Pagamento
                  </Button>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep("shipping")} className="p-2 hover:bg-muted rounded-md">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h1 
                      className="text-3xl font-medium"
                      style={{ 
                        fontFamily: currentTheme.typography.headingFont,
                        color: `hsl(${currentTheme.colors.foreground})`,
                      }}
                    >
                      Pagamento
                    </h1>
                  </div>

                  {/* Payment methods */}
                  <div className="space-y-4">
                    {/* Credit Card Option */}
                    <div 
                      className={cn(
                        "border-2 rounded-lg transition-all cursor-pointer",
                        selectedPayment === "card" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedPayment("card")}
                    >
                      <div className="p-4 flex items-center gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          selectedPayment === "card" ? "border-primary" : "border-muted-foreground"
                        )}>
                          {selectedPayment === "card" && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2.5 h-2.5 rounded-full bg-primary"
                            />
                          )}
                        </div>
                        <CreditCard className="w-5 h-5" style={{ color: currentTheme.colors.primaryHex }} />
                        <span className="font-medium">Cartão de Crédito</span>
                      </div>
                      
                      <AnimatePresence>
                        {selectedPayment === "card" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-2 grid gap-4 border-t">
                              <FormField
                                id="cardNumber"
                                label="Número do cartão *"
                                value={paymentData.cardNumber}
                                onChange={(value) => {
                                  setPaymentData({ ...paymentData, cardNumber: formatCardNumber(value) });
                                  if (paymentErrors.cardNumber) setPaymentErrors({ ...paymentErrors, cardNumber: "" });
                                }}
                                error={paymentErrors.cardNumber}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                              />
                              <FormField
                                id="cardName"
                                label="Nome no cartão *"
                                value={paymentData.cardName}
                                onChange={(value) => {
                                  setPaymentData({ ...paymentData, cardName: value.toUpperCase() });
                                  if (paymentErrors.cardName) setPaymentErrors({ ...paymentErrors, cardName: "" });
                                }}
                                error={paymentErrors.cardName}
                                placeholder="COMO ESTÁ IMPRESSO NO CARTÃO"
                                maxLength={100}
                              />
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  id="expiry"
                                  label="Validade *"
                                  value={paymentData.expiry}
                                  onChange={(value) => {
                                    setPaymentData({ ...paymentData, expiry: formatExpiry(value) });
                                    if (paymentErrors.expiry) setPaymentErrors({ ...paymentErrors, expiry: "" });
                                  }}
                                  error={paymentErrors.expiry}
                                  placeholder="MM/AA"
                                  maxLength={5}
                                />
                                <FormField
                                  id="cvv"
                                  label="CVV *"
                                  value={paymentData.cvv}
                                  onChange={(value) => {
                                    setPaymentData({ ...paymentData, cvv: value.replace(/\D/g, "") });
                                    if (paymentErrors.cvv) setPaymentErrors({ ...paymentErrors, cvv: "" });
                                  }}
                                  error={paymentErrors.cvv}
                                  placeholder="123"
                                  maxLength={4}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* PIX Option */}
                    <div 
                      className={cn(
                        "p-4 border-2 rounded-lg flex items-center gap-3 cursor-pointer transition-all",
                        selectedPayment === "pix" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedPayment("pix")}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedPayment === "pix" ? "border-primary" : "border-muted-foreground"
                      )}>
                        {selectedPayment === "pix" && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-primary"
                          />
                        )}
                      </div>
                      <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center text-lg">
                        💳
                      </div>
                      <span className="font-medium">PIX</span>
                      <span className="ml-auto text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                        5% de desconto
                      </span>
                    </div>

                    {/* Boleto Option */}
                    <div 
                      className={cn(
                        "p-4 border-2 rounded-lg flex items-center gap-3 cursor-pointer transition-all",
                        selectedPayment === "boleto" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedPayment("boleto")}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedPayment === "boleto" ? "border-primary" : "border-muted-foreground"
                      )}>
                        {selectedPayment === "boleto" && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-primary"
                          />
                        )}
                      </div>
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-lg">
                        📄
                      </div>
                      <span className="font-medium">Boleto Bancário</span>
                      <span className="ml-auto text-sm text-muted-foreground">Até 3 dias úteis</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className={`w-full h-14 text-lg ${currentTheme.button.className}`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Finalizar Pedido - R$ {(total + selectedShippingOption.price).toFixed(2)}
                      </span>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 p-6 rounded-xl bg-white shadow-sm"
              style={{ borderColor: `hsl(${currentTheme.colors.primary} / 0.1)` }}
            >
              <h2 
                className="text-xl font-medium mb-4"
                style={{ 
                  fontFamily: currentTheme.typography.headingFont,
                  color: `hsl(${currentTheme.colors.foreground})`,
                }}
              >
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-4">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate flex-1 mr-2">{item.name} x{item.quantity}</span>
                    <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-sm text-muted-foreground">+{items.length - 3} mais itens</p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-green-600">A calcular</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <motion.span 
                  key={`total-${dominantBrand}`}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: currentTheme.colors.primaryHex }}
                >
                  R$ {total.toFixed(2)}
                </motion.span>
              </div>

              {/* Security badges */}
              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span>Pagamento 100% seguro</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Dados protegidos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

const Checkout = () => {
  return (
    <BrandThemeProvider>
      <CheckoutContent />
    </BrandThemeProvider>
  );
};

export default Checkout;
