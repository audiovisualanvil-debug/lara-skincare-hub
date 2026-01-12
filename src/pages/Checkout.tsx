import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CreditCard, Truck, Check, ShoppingBag, Minus, Plus, X, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useBrandTheme, BrandThemeProvider, getBrandTheme, BrandName } from "@/contexts/BrandThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const CheckoutContent = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, total, appliedCoupon, updateQuantity, removeItem, applyCoupon, removeCoupon } = useCart();
  const { currentTheme, dominantBrand, allBrands, brandCounts } = useBrandTheme();
  
  const [couponCode, setCouponCode] = useState("");
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    if (result.success) {
      toast.success(result.message);
      setCouponCode("");
    } else {
      toast.error(result.message);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(currentTheme.microcopy.thankYou);
      // Would redirect to confirmation page
    }, 2000);
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
                      <div>
                        <Label htmlFor="name">Nome completo</Label>
                        <Input
                          id="name"
                          value={shippingData.name}
                          onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          value={shippingData.cep}
                          onChange={(e) => setShippingData({ ...shippingData, cep: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          value={shippingData.address}
                          onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          value={shippingData.number}
                          onChange={(e) => setShippingData({ ...shippingData, number: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={shippingData.complement}
                          onChange={(e) => setShippingData({ ...shippingData, complement: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          value={shippingData.neighborhood}
                          onChange={(e) => setShippingData({ ...shippingData, neighborhood: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            value={shippingData.city}
                            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">UF</Label>
                          <Input
                            id="state"
                            maxLength={2}
                            value={shippingData.state}
                            onChange={(e) => setShippingData({ ...shippingData, state: e.target.value.toUpperCase() })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping options */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Opções de Frete</h3>
                    <div className="space-y-2">
                      {[
                        { name: "PAC", price: 19.90, days: "8-12 dias úteis" },
                        { name: "SEDEX", price: 34.90, days: "3-5 dias úteis" },
                      ].map((option) => (
                        <label
                          key={option.name}
                          className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                          style={{ borderColor: `hsl(${currentTheme.colors.primary} / 0.2)` }}
                        >
                          <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{option.name}</p>
                              <p className="text-sm text-muted-foreground">{option.days}</p>
                            </div>
                          </div>
                          <span className="font-semibold">R$ {option.price.toFixed(2)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep("payment")}
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
                    <div 
                      className="p-6 border rounded-lg"
                      style={{ borderColor: `hsl(${currentTheme.colors.primary} / 0.2)` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="w-5 h-5" style={{ color: currentTheme.colors.primaryHex }} />
                        <h3 className="font-medium">Cartão de Crédito</h3>
                      </div>
                      
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Número do cartão</Label>
                          <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no cartão</Label>
                          <Input id="cardName" placeholder="Como está impresso no cartão" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Validade</Label>
                            <Input id="expiry" placeholder="MM/AA" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="p-4 border rounded-lg flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      style={{ borderColor: `hsl(${currentTheme.colors.primary} / 0.2)` }}
                    >
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-lg">
                        💳
                      </div>
                      <span className="font-medium">PIX</span>
                      <span className="ml-auto text-sm text-green-600">5% de desconto</span>
                    </div>

                    <div 
                      className="p-4 border rounded-lg flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      style={{ borderColor: `hsl(${currentTheme.colors.primary} / 0.2)` }}
                    >
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
                        {currentTheme.microcopy.processing}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        {currentTheme.microcopy.ctaText}
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
