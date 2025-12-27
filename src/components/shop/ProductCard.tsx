import { Link } from "react-router-dom";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  isProfessional: boolean;
  description: string;
  image?: string;
  price?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-card border border-border hover:border-primary/40 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="aspect-square bg-secondary/20 relative overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-body text-muted-foreground text-sm">Imagem</span>
          </div>
        )}
        
        {product.isProfessional && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-charcoal text-pearl font-body text-[10px] font-medium uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 stroke-[1.5]" />
            Profissional
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <span className="font-body text-[10px] text-primary font-semibold uppercase tracking-widest">
          {product.brand}
        </span>
        
        <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-tight min-h-[48px] line-clamp-2">
          {product.name}
        </h3>
        
        <p className="font-body text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
          {product.description}
        </p>

        {product.price && (
          <p className="font-display text-lg font-bold text-foreground">
            {product.price}
          </p>
        )}

        {/* CTA */}
        <div className="pt-2">
          {product.isProfessional ? (
            <Button variant="gold-outline" size="sm" className="w-full text-xs" asChild>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                Consultar
              </a>
            </Button>
          ) : (
            <Button variant="elegant" size="sm" className="w-full text-xs" asChild>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-3.5 h-3.5 stroke-[1.5]" />
                Comprar
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
