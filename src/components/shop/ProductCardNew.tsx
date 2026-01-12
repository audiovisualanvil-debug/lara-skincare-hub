import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Scale, Check, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
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
    
    // Animate button
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
    
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
      className="group bg-card rounded-lg border border-border/30 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/produto/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary/50">
        {/* Skeleton placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        <img
          src={isHovered && product.imageHover ? product.imageHover : (product.image || placeholderImage)}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-contain p-4 transition-all duration-700",
            isHovered && "scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Professional Badge */}
        {product.isProfessional && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] uppercase tracking-wider font-body font-semibold text-white bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              Profissional
            </span>
          </div>
        )}
        
        {/* Action buttons - Floating style */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm shadow-sm",
              isProductFavorite 
                ? "bg-primary text-primary-foreground" 
                : "bg-white/90 text-muted-foreground hover:text-primary hover:bg-white"
            )}
          >
            <Heart className={cn("h-4 w-4", isProductFavorite && "fill-current")} />
          </button>
          
          {/* Compare Button */}
          <button
            onClick={handleToggleCompare}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm shadow-sm",
              isProductInCompare 
                ? "bg-primary text-primary-foreground" 
                : "bg-white/90 text-muted-foreground hover:text-primary hover:bg-white"
            )}
          >
            <Scale className="h-4 w-4" />
          </button>
        </div>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            className={cn(
              "w-full h-11 rounded-full bg-primary hover:bg-primary/85 text-primary-foreground font-body font-medium uppercase tracking-wider text-xs transition-all duration-300 shadow-md",
              addedToCart && "bg-green-600 hover:bg-green-600"
            )}
            onClick={handleAddToCart}
          >
            {addedToCart ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Adicionado
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Adicionar
              </span>
            )}
          </Button>
        </div>
      </Link>

      {/* Content - Editorial Typography */}
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-body font-medium mb-2">
          {product.brand}
        </p>
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-display text-lg font-medium text-foreground line-clamp-2 min-h-[3.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-medium text-foreground">
            {product.price ? (product.price.startsWith("R$") ? product.price : `R$ ${product.price}`) : "Consultar"}
          </span>
          <Link 
            to={`/produto/${product.id}`}
            className="text-xs uppercase tracking-wider text-primary font-body font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Ver
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCardNew;