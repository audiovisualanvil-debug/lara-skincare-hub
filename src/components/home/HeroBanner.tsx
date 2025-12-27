import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  image?: string;
  align?: "left" | "center" | "right";
}

const HeroBanner = ({ 
  title, 
  subtitle, 
  ctaPrimary, 
  ctaSecondary, 
  image,
  align = "left" 
}: HeroBannerProps) => {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-secondary">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10">
        <div className={`flex flex-col ${alignmentClasses[align]} max-w-xl`}>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight animate-slide-up">
            {title}
          </h1>
          
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-md animate-slide-up stagger-1">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-slide-up stagger-2">
            {ctaPrimary && (
              <Button 
                asChild
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-gold-hover text-primary-foreground font-heading font-medium"
              >
                <Link to={ctaPrimary.href}>{ctaPrimary.label}</Link>
              </Button>
            )}
            {ctaSecondary && (
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-heading font-medium"
              >
                <Link to={ctaSecondary.href}>{ctaSecondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;