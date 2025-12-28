import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import ProductCardNew from "./ProductCardNew";

interface Product {
  id: number;
  name: string;
  brand: string;
  price?: string;
  image?: string;
}

interface RecentlyViewedSectionProps {
  products: Product[];
  currentProductId?: number;
}

const RecentlyViewedSection = ({ products, currentProductId }: RecentlyViewedSectionProps) => {
  // Filter out current product and limit to 4
  const displayProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                Vistos Recentemente
              </h2>
              <p className="font-body text-sm text-muted-foreground hidden sm:block">
                Continue de onde parou
              </p>
            </div>
          </div>
          <Link 
            to="/loja" 
            className="hidden sm:flex items-center gap-2 font-body text-sm text-primary hover:underline"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product) => (
            <ProductCardNew key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedSection;
