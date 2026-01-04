import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface SlideData {
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
  label?: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

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
  slides?: SlideData[];
}

const HeroBanner = ({ 
  title, 
  subtitle, 
  ctaPrimary, 
  ctaSecondary, 
  image,
  align = "left",
  slides
}: HeroBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Create slides array from props or use single slide
  const allSlides: SlideData[] = slides || [{
    title,
    subtitle,
    ctaPrimary,
    ctaSecondary,
    image,
    label: "Dermocosméticos",
    stats: [
      { value: "100+", label: "Produtos" },
      { value: "10k+", label: "Clientes" },
      { value: "5★", label: "Avaliação" }
    ]
  }];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length);
  }, [allSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length);
  }, [allSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || allSlides.length <= 1) return;
    
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, allSlides.length]);

  const currentData = allSlides[currentSlide];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
      {/* Background Images with Transition */}
      {allSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.image && (
            <>
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Editorial gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </>
          )}
        </div>
      ))}

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
                {currentData.label || "Dermocosméticos"}
              </span>
            </div>

            {/* Main Title - Editorial Typography */}
            <h1 
              key={`title-${currentSlide}`}
              className="font-display text-display-sm md:text-display lg:text-display-lg text-foreground leading-none animate-fade-up stagger-1"
            >
              {currentData.title}
            </h1>
            
            {currentData.subtitle && (
              <p 
                key={`subtitle-${currentSlide}`}
                className="mt-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-lg animate-fade-up stagger-2"
              >
                {currentData.subtitle}
              </p>
            )}

            {/* CTA Buttons - Editorial Style */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-up stagger-3">
              {currentData.ctaPrimary && (
                <Button 
                  asChild
                  size="lg"
                  className="h-14 px-8 bg-primary hover:bg-terracotta-dark text-primary-foreground font-body font-semibold uppercase tracking-wider text-sm group"
                >
                  <Link to={currentData.ctaPrimary.href} className="flex items-center gap-3">
                    {currentData.ctaPrimary.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
              {currentData.ctaSecondary && (
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary hover:bg-transparent font-body font-semibold uppercase tracking-wider text-sm"
                >
                  <Link to={currentData.ctaSecondary.href}>{currentData.ctaSecondary.label}</Link>
                </Button>
              )}
            </div>

            {/* Editorial Stats */}
            {currentData.stats && (
              <div className="flex gap-12 mt-16 pt-8 border-t border-border/50 animate-fade-up stagger-4">
                {currentData.stats.map((stat, index) => (
                  <div key={index}>
                    <p className="font-display text-3xl md:text-4xl text-foreground">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Navigation - Bottom */}
      {allSlides.length > 1 && (
        <>
          {/* Dot Indicators */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {allSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary w-8' 
                    : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-foreground/10 flex items-center justify-center text-foreground hover:bg-background/40 transition-all duration-300"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-foreground/10 flex items-center justify-center text-foreground hover:bg-background/40 transition-all duration-300"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up stagger-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroBanner;
