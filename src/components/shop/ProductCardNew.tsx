import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  brand: string;
  price?: string;
  image?: string;
  imageHover?: string;
  isProfessional?: boolean;
  category?: string;
  description?: string;
}

interface ProductCardNewProps {
  product: Product;
}

const ProductCardNew = ({ product }: ProductCardNewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const placeholderImage = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop";

  return (
    <div 
      className="group bg-card rounded-lg border border-border overflow-hidden hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary">
        <img
          src={isHovered && product.imageHover ? product.imageHover : (product.image || placeholderImage)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isProfessional && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-heading">
            Profissional
          </Badge>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-heading text-sm font-medium text-foreground line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-heading text-base font-semibold text-foreground">
            {product.price ? (product.price.startsWith("R$") ? product.price : `R$ ${product.price}`) : "Consultar"}
          </span>
        </div>
        <Button 
          asChild
          variant="outline"
          className="w-full mt-3 h-9 text-sm font-heading font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Link to={`/produto/${product.id}`}>
            Ver Detalhes
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCardNew;