import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useBrandTheme } from "@/contexts/BrandThemeContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const freeShippingThreshold = 299;

const CartDrawer = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    subtotal, 
    discount, 
    total, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    isCartOpen, 
    closeCart, 
    totalItems 
  } = useCart();
  const { toast } = useToast();
  const { currentTheme } = useBrandTheme();
  const [couponCode, setCouponCode] = useState("");
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const result = applyCoupon(couponCode);
    toast({
      title: result.success ? "Cupom aplicado!" : "Erro",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
    
    if (result.success) {
      setCouponCode("");
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Cupom removido",
      description: "O cupom foi removido do seu carrinho",
    });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader 
          className="p-6 border-b transition-colors duration-300"
          style={{ borderColor: `${currentTheme.cart.drawerAccent}30` }}
        >
          <SheetTitle 
            className="font-display text-lg font-semibold transition-colors duration-300"
            style={{ color: currentTheme.cart.drawerAccent }}
          >
            Seu Carrinho ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-cream border-b border-detail/30">
            {remainingForFreeShipping > 0 ? (
              <p className="font-body text-sm text-center text-muted-foreground">
                Falta <span className="font-semibold text-primary">R$ {remainingForFreeShipping.toFixed(2)}</span> para frete grátis!
              </p>
            ) : (
              <p className="font-body text-sm text-center text-primary font-medium">
                🎉 Você ganhou frete grátis!
              </p>
            )}
            <div className="mt-2 h-1.5 bg-detail/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-detail mb-4" />
              <h3 className="font-display text-lg font-medium text-foreground mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Adicione produtos para começar suas compras
              </p>
              <Button variant="gold" onClick={closeCart} asChild>
                <Link to="/loja">Continuar Comprando</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-cream border border-detail/30 rounded-lg">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-md bg-background p-1"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-detail/20 rounded-md flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-detail" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-medium text-foreground line-clamp-2">{item.name}</h4>
                    <p className="font-body text-xs text-muted-foreground">{item.brand}</p>
                    <p className="font-display text-sm font-semibold text-primary mt-1">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 border-detail"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-body text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 border-detail"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Coupon and Total */}
        {items.length > 0 && (
          <div className="p-6 border-t border-detail bg-cream space-y-4">
            {/* Coupon Section */}
            {!appliedCoupon ? (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Código do cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className="pl-10 font-body text-sm uppercase"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleApplyCoupon}
                  className="font-display"
                >
                  Aplicar
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="font-display text-sm font-medium text-primary">
                    {appliedCoupon.code}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    (-{appliedCoupon.discountType === "percentage" 
                      ? `${appliedCoupon.discountValue}%` 
                      : `R$ ${appliedCoupon.discountValue.toFixed(2)}`})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={handleRemoveCoupon}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Price Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-body text-sm text-foreground">R$ {subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-primary">Desconto</span>
                  <span className="font-body text-sm text-primary">-R$ {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-detail/30">
                <span className="font-display text-base font-medium text-foreground">Total</span>
                <span className="font-display text-xl font-semibold text-foreground">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <Button variant="gold" className="w-full h-12 font-display font-medium" asChild>
              <Link to="/checkout" onClick={closeCart}>
                Finalizar Compra
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full font-body text-sm text-muted-foreground"
              onClick={closeCart}
            >
              Continuar Comprando
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
