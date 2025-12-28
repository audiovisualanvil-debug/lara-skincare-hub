import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Scale } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { toast } from "sonner";

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

// Helper to extract numeric price from string
const extractPrice = (priceStr?: string): number | null => {
  if (!priceStr || priceStr === "Consultar") return null;
  const match = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(match) || null;
};

const ProductCardNew = ({ product }: ProductCardNewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  
  const placeholderImage = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop";
  const isProductFavorite = isFavorite(product.id);
  const isProductInCompare = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const price = extractPrice(product.price);
    if (price === null) {
      toast.error("Este produto não está disponível para compra online. Entre em contato para consultar.");
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: price,
      image: product.image,
    });
    
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    });
    
    if (isProductFavorite) {
      toast.success("Removido dos favoritos");
    } else {
      toast.success("Adicionado aos favoritos!");
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProductInCompare) {
      removeFromCompare(product.id);
      toast.success("Removido da comparação");
    } else {
      if (!canAddMore) {
        toast.error("Você pode comparar no máximo 3 produtos");
        return;
      }
      const added = addToCompare({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        isProfessional: product.isProfessional,
      });
      if (added) {
        toast.success("Adicionado para comparação!");
      }
    }
  };

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
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
        {product.isProfessional && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-heading">
            Profissional
          </Badge>
        )}
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isProductFavorite 
                ? "bg-primary text-primary-foreground" 
                : "bg-background/80 text-muted-foreground hover:text-primary hover:bg-background"
            }`}
          >
            <Heart className={`h-4 w-4 ${isProductFavorite ? "fill-current" : ""}`} />
          </button>
          
          {/* Compare Button */}
          <button
            onClick={handleToggleCompare}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isProductInCompare 
                ? "bg-primary text-primary-foreground" 
                : "bg-background/80 text-muted-foreground hover:text-primary hover:bg-background"
            }`}
          >
            <Scale className="h-4 w-4" />
          </button>
        </div>
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
        <div className="flex gap-2 mt-3">
          <Button 
            asChild
            variant="outline"
            className="flex-1 h-9 text-sm font-heading font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Link to={`/produto/${product.id}`}>
              Ver Detalhes
            </Link>
          </Button>
          <Button 
            variant="gold"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardNew;