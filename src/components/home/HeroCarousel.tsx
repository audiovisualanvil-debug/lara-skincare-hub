import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import banner images
import heroSkincare from "@/assets/hero-skincare.jpg";
import sweetLipsCategoria from "@/assets/banners/sweet-lips-categoria.webp";
import lifeCNano from "@/assets/banners/life-c-nano.webp";
import miracleEyes from "@/assets/banners/miracle-eyes-1.webp";
import glamourPele from "@/assets/banners/glamour-pele.webp";

interface Slide {
  id: number;
  image: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondary?: { text: string; link: string };
  align?: "left" | "center" | "right";
}

const slides: Slide[] = [
  {
    id: 1,
    image: heroSkincare,
    title: "Tratamento para sua pele",
    titleHighlight: "com resultados",
    subtitle: "Consultoria especializada em dermocosméticos premium",
    ctaText: "Conhecer produtos",
    ctaLink: "/loja",
    ctaSecondary: { text: "Monte sua rotina ideal", link: "/monte-sua-rotina" },
    align: "left",
  },
  {
    id: 2,
    image: sweetLipsCategoria,
    title: "Sweet Lips",
    subtitle: "Lábios hidratados e irresistíveis com nossa linha completa de cuidados labiais",
    ctaText: "Conhecer Linha",
    ctaLink: "/tulipia",
    align: "left",
  },
  {
    id: 3,
    image: lifeCNano,
    title: "Life C Nano",
    subtitle: "Vitamina C de alta absorção para uma pele radiante e uniforme",
    ctaText: "Ver Produto",
    ctaLink: "/loja",
    align: "right",
  },
  {
    id: 4,
    image: miracleEyes,
    title: "Miracle Eyes",
    subtitle: "Tratamento intensivo para a área dos olhos com resultados visíveis",
    ctaText: "Descobrir",
    ctaLink: "/loja",
    align: "left",
  },
  {
    id: 5,
    image: glamourPele,
    title: "Glamour Pele",
    subtitle: "Revele sua beleza natural com nossa linha premium de skincare",
    ctaText: "Explorar",
    ctaLink: "/loja",
    align: "right",
  },
];

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const getAlignmentClasses = (align: string = "left") => {
    switch (align) {
      case "center":
        return "items-center text-center";
      case "right":
        return "items-end text-right";
      default:
        return "items-start text-left";
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0"
            >
              {/* Background Image */}
              <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
                  <div className="container mx-auto px-4">
                    <div className={cn(
                      "flex flex-col max-w-xl gap-4",
                      getAlignmentClasses(slide.align),
                      slide.align === "center" && "mx-auto",
                      slide.align === "right" && "ml-auto"
                    )}>
                      <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                        {slide.title}{" "}
                        {slide.titleHighlight && (
                          <span className="text-primary">{slide.titleHighlight}</span>
                        )}
                      </h2>
                      <p className="text-white/90 text-base md:text-lg max-w-md drop-shadow-md">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <Link to={slide.ctaLink}>
                          <Button 
                            size="lg" 
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            {slide.ctaText}
                          </Button>
                        </Link>
                        {slide.ctaSecondary && (
                          <Link to={slide.ctaSecondary.link}>
                            <Button 
                              size="lg" 
                              variant="outline"
                              className="border-white/50 text-white hover:bg-white/10"
                            >
                              {slide.ctaSecondary.text}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm h-10 w-10 rounded-full hidden md:flex"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm h-10 w-10 rounded-full hidden md:flex"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              selectedIndex === index 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
