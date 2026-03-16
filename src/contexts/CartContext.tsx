import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
}

// Available coupons
const AVAILABLE_COUPONS: Coupon[] = [
  { code: "BEMVINDO10", discountType: "percentage", discountValue: 10 },
  { code: "DESCONTO20", discountType: "percentage", discountValue: 20, minPurchase: 200 },
  { code: "FRETE50", discountType: "fixed", discountValue: 50, minPurchase: 150 },
  { code: "PROMO15", discountType: "percentage", discountValue: 15 },
];

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "dermostore-cart";
const COUPON_STORAGE_KEY = "dermostore-coupon";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed: CartItem[] = JSON.parse(savedCart);
        const valid = parsed.filter((item) => UUID_REGEX.test(item.id));
        if (valid.length < parsed.length) {
          console.warn(`Carrinho: removidos ${parsed.length - valid.length} itens com IDs inválidos`);
        }
        setItems(valid);
      }
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving coupon to localStorage:", error);
    }
  }, [appliedCoupon]);

  const addItem = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    const productId = String(product.id);
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, id: productId, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string | number) => {
    const sid = String(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== sid));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    const sid = String(id);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === sid ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const normalizedCode = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS.find((c) => c.code === normalizedCode);

    if (!coupon) {
      return { success: false, message: "Cupom inválido" };
    }

    if (coupon.minPurchase && subtotal < coupon.minPurchase) {
      return {
        success: false,
        message: `Compra mínima de R$ ${coupon.minPurchase.toFixed(2)} para este cupom`,
      };
    }

    setAppliedCoupon(coupon);
    return {
      success: true,
      message: coupon.discountType === "percentage"
        ? `Cupom de ${coupon.discountValue}% aplicado!`
        : `Cupom de R$ ${coupon.discountValue.toFixed(2)} aplicado!`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? (subtotal * appliedCoupon.discountValue) / 100
      : Math.min(appliedCoupon.discountValue, subtotal)
    : 0;

  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
