import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  onClose: () => void;
}

// Placeholder cart items - will be replaced with real state management
const cartItems: any[] = [];
const freeShippingThreshold = 299;

const CartDrawer = ({ onClose }: CartDrawerProps) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="font-heading text-lg font-semibold">Seu Carrinho</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Free Shipping Progress */}
      {cartItems.length > 0 && (
        <div className="p-4 bg-secondary">
          {remainingForFreeShipping > 0 ? (
            <p className="text-sm text-center text-muted-foreground">
              Falta <span className="font-semibold text-primary">R$ {remainingForFreeShipping.toFixed(2)}</span> para frete grátis!
            </p>
          ) : (
            <p className="text-sm text-center text-primary font-medium">
              🎉 Você ganhou frete grátis!
            </p>
          )}
          <div className="mt-2 h-1.5 bg-accent rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-heading text-lg font-medium text-foreground mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Adicione produtos para começar suas compras
            </p>
            <Button onClick={onClose} className="bg-primary hover:bg-gold-hover text-primary-foreground">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-secondary rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-heading text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <p className="text-sm font-semibold text-primary mt-1">
                    R$ {item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-heading text-lg font-semibold">R$ {subtotal.toFixed(2)}</span>
          </div>
          <Button className="w-full h-12 bg-primary hover:bg-gold-hover text-primary-foreground font-heading font-medium">
            Finalizar Compra
          </Button>
          <Button 
            variant="ghost" 
            className="w-full mt-2 text-sm text-muted-foreground"
            onClick={onClose}
          >
            Continuar Comprando
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;