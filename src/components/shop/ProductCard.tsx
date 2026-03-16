import { Link } from "react-router-dom";
import { ShieldCheck, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfessional } from "@/contexts/ProfessionalContext";

export interface ProtocolStep {
  step: number;
  title: string;
  description: string;
  image?: string;
}

export interface BeforeAfterImage {
  before: string;
  after: string;
}

export interface Product {
  id: string | number;
  name: string;
  brand: string;
  category: string;
  isProfessional: boolean;
  description: string;
  image?: string;
  price?: string;
  gallery?: string[];
  video?: string;
  activeIngredients?: string[];
  fullDescription?: string;
  beforeAfterImages?: BeforeAfterImage[];
  protocolSteps?: ProtocolStep[];
  applicationIndications?: string[];
}

interface ProductCardProps {
  product: Product;
}

// Helper to extract numeric price from string
const extractPrice = (priceStr?: string): number | null => {
  if (!priceStr || priceStr === "Consultar") return null;
  const match = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(match) || null;
};

// Helper to format price in BRL
const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { isProfessional, discountPercentage } = useProfessional();

  // Calculate professional price
  const originalPrice = extractPrice(product.price);
  const professionalPrice = isProfessional && originalPrice && discountPercentage > 0
    ? originalPrice * (1 - discountPercentage / 100)
    : null;

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

        {/* Price display with professional pricing */}
        {professionalPrice ? (
          <div className="space-y-0.5">
            <div className="flex items-center gap-1">
              <BadgePercent className="w-3 h-3 text-espresso" />
              <span className="text-[10px] uppercase tracking-wider font-body font-semibold text-espresso">
                Preço Profissional
              </span>
            </div>
            <p className="font-display text-lg font-bold text-espresso">
              {formatPrice(professionalPrice)}
            </p>
            {product.price && (
              <p className="font-body text-xs text-muted-foreground line-through">
                {product.price}
              </p>
            )}
          </div>
        ) : (
          product.price && (
            <p className="font-display text-lg font-bold text-foreground">
              {product.price}
            </p>
          )
        )}

        {/* CTA */}
        <div className="pt-2">
          <Button variant="gold-outline" size="sm" className="w-full text-xs" asChild>
            <Link to={`/produto/${product.id}`}>
              Ver mais
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
