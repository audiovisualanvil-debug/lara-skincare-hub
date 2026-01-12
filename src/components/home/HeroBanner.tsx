import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [direction, setDirection] = useState(1);

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
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % allSlides.length);
  }, [allSlides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length);
  }, [allSlides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || allSlides.length <= 1) return;
    
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, allSlides.length]);

  const currentData = allSlides[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="relative min-h-[100svh] md:min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-espresso via-noir to-espresso">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
      </div>

      {/* Background Images with Transition */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {(currentData.image || currentData.mobileImage) && (
            <>
              {/* Desktop Image */}
              <img
                src={currentData.image}
                alt=""
                className="hidden md:block w-full h-full object-cover opacity-50"
              />
              {/* Mobile Image */}
              <img
                src={currentData.mobileImage || currentData.image}
                alt=""
                className="md:hidden w-full h-full object-cover object-[center_25%] opacity-40"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/20 md:bg-gradient-to-r md:from-espresso/95 md:via-espresso/50 md:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-transparent to-transparent" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-8 md:left-16 w-px h-24 md:h-40 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
      <div className="absolute top-32 left-8 md:left-16 w-12 h-px bg-gradient-to-r from-primary/40 to-transparent" />
      <div className="absolute bottom-40 right-8 md:right-20 w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
      <div className="absolute bottom-40 right-8 md:right-20 w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
      
      {/* Floating circles */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-primary/10 hidden md:block"
      />
      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full border border-gold/10 hidden md:block"
      />

      {/* Content */}
      <div className="container-editorial relative z-10 pt-20 pb-36 md:pt-32 md:pb-28 flex items-end md:items-center min-h-[100svh] md:min-h-[92vh]">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-end md:items-center w-full">
          <div className="max-w-2xl">
            {/* Label with pill style */}
            <motion.div 
              key={`label-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-body font-medium">
                  {currentData.label || "Dermocosméticos"}
                </span>
              </span>
            </motion.div>

            {/* Main Title with animation */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.h1 
                key={`title-${currentSlide}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-display text-[2.25rem] leading-[1.08] sm:text-display-sm md:text-display lg:text-display-lg text-ivory"
              >
                {currentData.title}
              </motion.h1>
            </AnimatePresence>
            
            {/* Decorative divider */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-primary via-gold to-transparent my-6 md:my-8 rounded-full"
            />
            
            {currentData.subtitle && (
              <AnimatePresence mode="wait">
                <motion.p 
                  key={`subtitle-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base leading-relaxed md:text-lg lg:text-xl text-ivory/80 font-body max-w-lg line-clamp-3 md:line-clamp-none"
                >
                  {currentData.subtitle}
                </motion.p>
              </AnimatePresence>
            )}

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10"
            >
              {currentData.ctaPrimary && (
                <Button 
                  asChild
                  size="xl"
                  className="h-14 px-8 text-sm bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/30 group"
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
                  variant="ghost"
                  size="xl"
                  className="h-14 px-8 text-sm rounded-full border-2 border-ivory/30 text-ivory hover:bg-ivory/10 hover:border-ivory/50"
                >
                  <Link to={currentData.ctaSecondary.href} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    {currentData.ctaSecondary.label}
                  </Link>
                </Button>
              )}
            </motion.div>

            {/* Stats with better styling */}
            {currentData.stats && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex gap-8 md:gap-12 mt-12 md:mt-16"
              >
                {currentData.stats.map((stat, index) => (
                  <div key={index} className="relative">
                    <p className="font-display text-2xl md:text-4xl lg:text-5xl text-ivory font-medium">
                      {stat.value}
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-wider text-ivory/50 font-body mt-1">
                      {stat.label}
                    </p>
                    {index < currentData.stats!.length - 1 && (
                      <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-px h-8 bg-ivory/20 hidden sm:block" />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right side decorative element on desktop */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="w-72 h-72 xl:w-96 xl:h-96 rounded-full border border-ivory/10 flex items-center justify-center">
                <div className="w-56 h-56 xl:w-72 xl:h-72 rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="w-40 h-40 xl:w-48 xl:h-48 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <span className="font-display text-5xl xl:text-6xl text-ivory font-medium">
                        {currentSlide + 1}
                      </span>
                      <span className="text-ivory/50 font-display text-2xl">/{allSlides.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Orbiting dots */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
              </motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4"
              >
                <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-gold" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      {allSlides.length > 1 && (
        <>
          {/* Progress dots */}
          <div className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {allSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative"
                aria-label={`Ir para slide ${index + 1}`}
              >
                <div className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'bg-primary w-10' 
                    : 'bg-ivory/30 w-2 group-hover:bg-ivory/50'
                }`} />
                {index === currentSlide && (
                  <motion.div
                    layoutId="activeSlide"
                    className="absolute inset-0 h-2 rounded-full bg-primary"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-ivory/5 backdrop-blur-sm border border-ivory/20 items-center justify-center text-ivory hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-ivory/5 backdrop-blur-sm border border-ivory/20 items-center justify-center text-ivory hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-ivory/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
