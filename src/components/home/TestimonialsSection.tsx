import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image?: string;
  role?: string;
  product?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

// Warm color palette for initial avatars
const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-gold/20 text-gold-dark",
  "bg-terracotta/20 text-terracotta",
  "bg-champagne text-primary",
  "bg-rose/20 text-rose-dark",
  "bg-sage/20 text-sage-dark",
];

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Calculate items per view based on screen size (handled via CSS)
  const itemsPerView = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerView);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || totalPages <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, totalPages]);

  // Get visible testimonials for current page
  const getVisibleTestimonials = () => {
    const start = currentIndex * itemsPerView;
    return testimonials.slice(start, start + itemsPerView);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-champagne/30 to-background overflow-hidden">
      <div className="container-editorial">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-wider text-primary font-medium">
              Depoimentos
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-display-sm text-foreground">
            O que nossas clientes dizem
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Histórias reais de transformação e resultados comprovados
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="hidden md:flex absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border/50 items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="hidden md:flex absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border/50 items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={(currentIndex * itemsPerView) + index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-border w-2 hover:bg-primary/50'
                  }`}
                  aria-label={`Ir para página ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Mobile Navigation */}
          {totalPages > 1 && (
            <div className="flex md:hidden items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full w-10 h-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full w-10 h-10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Bottom stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <p className="font-display text-3xl md:text-4xl text-primary font-medium">98%</p>
            <p className="text-sm text-muted-foreground mt-1">Satisfação</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl md:text-4xl text-gold font-medium">10k+</p>
            <p className="text-sm text-muted-foreground mt-1">Clientes felizes</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl md:text-4xl text-terracotta font-medium">4.9</p>
            <p className="text-sm text-muted-foreground mt-1">Avaliação média</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Separate component for testimonial card
const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-card rounded-2xl p-6 md:p-8 border border-border/30 transition-all duration-500 ${
        isHovered 
          ? 'shadow-2xl shadow-primary/10 -translate-y-2 border-primary/30' 
          : 'shadow-lg hover:shadow-xl'
      }`}
    >
      {/* Quote icon */}
      <div className="absolute -top-4 left-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered 
            ? 'bg-primary text-white scale-110' 
            : 'bg-primary/10 text-primary'
        }`}>
          <Quote className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i}
              className={`h-4 w-4 transition-colors duration-300 ${
                i < testimonial.rating 
                  ? 'fill-gold text-gold' 
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Quote Text */}
        <p className="text-foreground text-base leading-relaxed font-body mb-6 line-clamp-4">
          "{testimonial.text}"
        </p>

        {/* Product mention if available */}
        {testimonial.product && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-xs font-medium rounded-full">
              Usou: {testimonial.product}
            </span>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-border/30">
          {/* Initial Avatar */}
          <div className="relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-lg font-medium ${avatarColors[index % avatarColors.length]}`}>
              {testimonial.name.charAt(0)}
            </div>
          </div>

          {/* Name & Role */}
          <div>
            <p className="font-display text-base font-medium text-foreground">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role || "Cliente verificada"}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-gold/5 transition-opacity duration-500 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </motion.div>
  );
};

export default TestimonialsSection;
