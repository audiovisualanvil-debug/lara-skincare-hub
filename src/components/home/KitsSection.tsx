import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Kit {
  id: number;
  name: string;
  description: string;
  image: string;
  href: string;
}

interface KitsSectionProps {
  kits: Kit[];
}

const KitsSection = ({ kits }: KitsSectionProps) => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Kits & Rotinas
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Descubra sua rotina ideal com nossos kits personalizados para cada tipo de pele
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kits.map((kit) => (
            <div 
              key={kit.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover-lift"
            >
              <div className="aspect-[4/3] overflow-hidden bg-accent">
                <img
                  src={kit.image}
                  alt={kit.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {kit.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {kit.description}
                </p>
                <Button 
                  asChild
                  variant="outline"
                  className="mt-4 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link to={kit.href}>Ver Kit</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-gold-hover text-primary-foreground font-heading"
          >
            <Link to="/monte-sua-rotina">Monte sua Rotina</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KitsSection;