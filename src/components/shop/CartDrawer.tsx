import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const freeShippingThreshold = 299;

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, subtotal, isCartOpen, closeCart, totalItems } = useCart();
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-detail">
          <SheetTitle className="font-display text-lg font-semibold text-foreground">
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
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-detail bg-cream">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl font-semibold text-foreground">R$ {subtotal.toFixed(2)}</span>
            </div>
            <Button variant="gold" className="w-full h-12 font-display font-medium" asChild>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                Finalizar via WhatsApp
              </a>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full mt-2 font-body text-sm text-muted-foreground"
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
