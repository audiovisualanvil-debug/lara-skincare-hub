import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface PromoBanner {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  link: string;
  bgColor?: string;
  accentColor?: string;
}

interface PromoBannerCarouselProps {
  banners: PromoBanner[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const PromoBannerCarousel = ({ 
  banners, 
  title, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: PromoBannerCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.children[0]?.clientWidth || 400;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      const newIndex = direction === "left" 
        ? Math.max(0, activeIndex - 1)
        : Math.min(banners.length - 1, activeIndex + 1);
      
      setActiveIndex(newIndex);
      container.scrollTo({
        left: newIndex * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const goToSlide = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.children[0]?.clientWidth || 400;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      setActiveIndex(index);
      container.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {title && (
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">
          {title}
        </h2>
      )}
      
      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-background/90 shadow-lg border-border hover:bg-background"
        onClick={() => scroll("left")}
        disabled={activeIndex === 0}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-background/90 shadow-lg border-border hover:bg-background"
        onClick={() => scroll("right")}
        disabled={activeIndex === banners.length - 1}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {banners.map((banner, index) => (
          <motion.div 
            key={banner.id} 
            className="flex-shrink-0 w-full md:w-[calc(100%-2rem)] lg:w-[calc(50%-1rem)] snap-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={banner.link} className="block group">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
                style={{ backgroundColor: banner.bgColor || "#e8d5c4" }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  {/* Image Side */}
                  <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-square overflow-hidden">
                    <img 
                      src={banner.image}
                      alt={banner.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay for text visibility on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
                  </div>
                  
                  {/* Content Side */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 text-center md:text-left">
                    {/* Badge */}
                    <span 
                      className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                      style={{ 
                        backgroundColor: banner.accentColor || "#c9956c",
                        color: "white"
                      }}
                    >
                      {banner.badge}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">
                      Linha{" "}
                      <span 
                        className="font-semibold"
                        style={{ color: banner.accentColor || "#c9956c" }}
                      >
                        {banner.highlight}
                      </span>
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {banner.description}
                    </p>
                    
                    {/* CTA Arrow */}
                    <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-sm font-medium transition-colors"
                      style={{ color: banner.accentColor || "#c9956c" }}
                    >
                      Ver produtos
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "w-6 bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoBannerCarousel;
