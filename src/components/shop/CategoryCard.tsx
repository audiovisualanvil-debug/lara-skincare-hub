import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
}

const CategoryCard = ({ name, slug, description, icon, image }: CategoryCardProps) => {
  return (
    <Link
      to={`/loja?categoria=${slug}`}
      className="group block bg-card border border-border hover:border-primary/40 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
    >
      {/* Category Image */}
      <div className="aspect-[4/3] bg-secondary/20 relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {icon ? (
              <span className="text-4xl">{icon}</span>
            ) : (
              <span className="font-body text-muted-foreground text-sm">Imagem</span>
            )}
          </div>
        )}
      </div>

      {/* Category Info */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          {description && (
            <p className="font-body text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity stroke-[1.5]" />
      </div>
    </Link>
  );
};

export default CategoryCard;
