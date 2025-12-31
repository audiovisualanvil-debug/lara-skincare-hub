import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
      {/* Background Image with Editorial Treatment */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Editorial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-24 h-px bg-gradient-to-r from-primary/30 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="container-editorial relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Editorial Label */}
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
                Dermocosméticos
              </span>
            </div>

            {/* Main Title - Editorial Typography */}
            <h1 className="font-display text-display-sm md:text-display lg:text-display-lg text-foreground leading-none animate-fade-up stagger-1">
              {title}
            </h1>
            
            {subtitle && (
              <p className="mt-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-lg animate-fade-up stagger-2">
                {subtitle}
              </p>
            )}

            {/* CTA Buttons - Editorial Style */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-up stagger-3">
              {ctaPrimary && (
                <Button 
                  asChild
                  size="lg"
                  className="h-14 px-8 bg-primary hover:bg-terracotta-dark text-primary-foreground font-body font-semibold uppercase tracking-wider text-sm group"
                >
                  <Link to={ctaPrimary.href} className="flex items-center gap-3">
                    {ctaPrimary.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
              {ctaSecondary && (
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary hover:bg-transparent font-body font-semibold uppercase tracking-wider text-sm"
                >
                  <Link to={ctaSecondary.href}>{ctaSecondary.label}</Link>
                </Button>
              )}
            </div>

            {/* Editorial Stats */}
            <div className="flex gap-12 mt-16 pt-8 border-t border-border/50 animate-fade-up stagger-4">
              <div>
                <p className="font-display text-3xl md:text-4xl text-foreground">100+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mt-1">Produtos</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl text-foreground">10k+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mt-1">Clientes</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl text-foreground">5★</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mt-1">Avaliação</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up stagger-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroBanner;