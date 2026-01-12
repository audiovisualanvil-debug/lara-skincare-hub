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
  mobileImage?: string;
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
  mobileImage?: string;
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
    <section className="relative min-h-[100svh] md:min-h-[90vh] flex items-center overflow-hidden bg-noir">
      {/* Background Images with Transition */}
      {allSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {(slide.image || slide.mobileImage) && (
            <>
              {/* Desktop Image */}
              <img
                src={slide.image}
                alt=""
                className="hidden md:block w-full h-full object-cover opacity-70"
              />
              {/* Mobile Image - Focused on product */}
              <img
                src={slide.mobileImage || slide.image}
                alt=""
                className="md:hidden w-full h-full object-cover object-[center_25%] opacity-60"
              />
              {/* Editorial Luxo gradient overlay - stronger for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/80 to-noir/30 md:bg-gradient-to-r md:from-noir/95 md:via-noir/60 md:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-noir/50 via-transparent to-transparent" />
            </>
          )}
        </div>
      ))}

      {/* Decorative Elements - Luxo */}
      <div className="absolute top-24 left-6 md:left-12 w-px h-20 md:h-32 bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />
      <div className="absolute bottom-32 right-6 md:right-16 w-16 md:w-24 h-px bg-gradient-to-r from-gold/40 to-transparent" />

      {/* Content - positioned at bottom on mobile */}
      <div className="container-editorial relative z-10 pt-16 pb-32 md:pt-32 md:pb-24 flex items-end md:items-center min-h-[100svh] md:min-h-[90vh]">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-end md:items-center w-full">
          <div className="max-w-2xl">
            {/* Editorial Label - Luxo */}
            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8 animate-fade-up">
              <div className="w-8 md:w-12 h-px bg-gold" />
              <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-gold font-body font-medium">
                {currentData.label || "Dermocosméticos"}
              </span>
            </div>

            {/* Main Title - Editorial Luxo Typography */}
            <h1 
              key={`title-${currentSlide}`}
              className="font-display text-[2rem] leading-[1.1] sm:text-display-sm md:text-display lg:text-display-lg text-ivory animate-fade-up stagger-1"
            >
              {currentData.title}
            </h1>
            
            {/* Divider - Luxo */}
            <div className="w-12 md:w-16 h-px bg-gold/50 my-5 md:my-8 animate-fade-up stagger-2" />
            
            {currentData.subtitle && (
              <p 
                key={`subtitle-${currentSlide}`}
                className="text-[15px] leading-relaxed md:text-lg lg:text-xl text-ivory/70 font-body max-w-lg animate-fade-up stagger-2 line-clamp-3 md:line-clamp-none"
              >
                {currentData.subtitle}
              </p>
            )}

            {/* CTA Buttons - Editorial Luxo Style */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-12 animate-fade-up stagger-3">
              {currentData.ctaPrimary && (
                <Button 
                  asChild
                  variant="gold"
                  size="lg"
                  className="h-13 md:h-14 text-xs md:text-sm group"
                >
                  <Link to={currentData.ctaPrimary.href} className="flex items-center gap-2 md:gap-3">
                    {currentData.ctaPrimary.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
              {currentData.ctaSecondary && (
                <Button 
                  asChild
                  variant="ghost"
                  size="lg"
                  className="h-13 md:h-14 text-xs md:text-sm border border-ivory/20 text-ivory hover:bg-ivory/10 hover:text-ivory"
                >
                  <Link to={currentData.ctaSecondary.href}>{currentData.ctaSecondary.label}</Link>
                </Button>
              )}
            </div>

            {/* Editorial Stats - Luxo */}
            {currentData.stats && (
              <div className="flex gap-6 md:gap-10 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-gold/20 animate-fade-up stagger-4">
                {currentData.stats.map((stat, index) => (
                  <div key={index}>
                    <p className="font-display text-xl md:text-3xl lg:text-4xl text-ivory">{stat.value}</p>
                    <p className="text-[10px] md:text-xs uppercase tracking-wider text-ivory/50 font-body mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Navigation - Luxo */}
      {allSlides.length > 1 && (
        <>
          {/* Dot Indicators */}
          <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-20">
            {allSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'bg-gold w-8 md:w-10' 
                    : 'bg-ivory/30 w-2 md:w-2 hover:bg-ivory/50'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation - Luxo style, visible on larger screens */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/30 items-center justify-center text-ivory hover:bg-gold/10 hover:border-gold transition-all duration-400"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/30 items-center justify-center text-ivory hover:bg-gold/10 hover:border-gold transition-all duration-400"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Scroll Indicator - Luxo */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 animate-fade-up stagger-5">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 font-body">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroBanner;
