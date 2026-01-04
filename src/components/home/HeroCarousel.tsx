import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import banner images
import heroImage from "@/assets/hero-skincare.jpg";
import productsImage from "@/assets/products-display.jpg";
import sweetLipsCategoria from "@/assets/banners/sweet-lips-categoria.webp";
import lifeCNano from "@/assets/banners/life-c-nano.webp";
import miracleEyes from "@/assets/banners/miracle-eyes-1.webp";
import glamourPele from "@/assets/banners/glamour-pele.webp";
interface BannerSlide {
  id: number;
  type: "banner";
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  align?: "left" | "center" | "right";
}
interface HeroSlide {
  id: number;
  type: "hero";
}
type Slide = BannerSlide | HeroSlide;
const slides: Slide[] = [{
  id: 1,
  type: "hero"
}, {
  id: 2,
  type: "banner",
  image: sweetLipsCategoria,
  title: "Sweet Lips",
  subtitle: "Lábios hidratados e irresistíveis com nossa linha completa de cuidados labiais",
  ctaText: "Conhecer Linha",
  ctaLink: "/tulipia",
  align: "left"
}, {
  id: 3,
  type: "banner",
  image: lifeCNano,
  title: "Life C Nano",
  subtitle: "Vitamina C de alta absorção para uma pele radiante e uniforme",
  ctaText: "Ver Produto",
  ctaLink: "/loja",
  align: "left"
}, {
  id: 4,
  type: "banner",
  image: miracleEyes,
  title: "Miracle Eyes",
  subtitle: "Tratamento intensivo para a área dos olhos com resultados visíveis",
  ctaText: "Descobrir",
  ctaLink: "/loja",
  align: "left"
}, {
  id: 5,
  type: "banner",
  image: glamourPele,
  title: "Glamour Pele",
  subtitle: "Revele sua beleza natural com nossa linha premium de skincare",
  ctaText: "Explorar",
  ctaLink: "/loja",
  align: "left"
}];
const HeroSlideContent = () => <div className="bg-card min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">
    <div className="container mx-auto px-4 lg:px-8 h-full">
      <div className="grid lg:grid-cols-2 min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">
        {/* Left - Model Image */}
        <div className="relative h-[300px] lg:h-auto overflow-hidden order-2 lg:order-1">
          <img alt="Modelo com pele saudável" src="/lovable-uploads/3d5dfb35-d007-4524-8f73-bee48237f192.jpg" className="w-full h-full object-contain" />
        </div>
        
        {/* Right - Content + Product */}
        <div className="relative flex items-center order-1 lg:order-2">
          {/* Product background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
            <img src={productsImage} alt="Produtos dermocosméticos" className="w-full h-full object-cover opacity-20" />
          </div>
          
          <div className="relative z-10 p-8 lg:p-16 space-y-6">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Tratamento para sua pele{" "}
              <span className="text-primary">com resultados</span>
            </h1>
            <p className="font-body text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
              Consultoria especializada em dermocosméticos premium
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="gold-outline" size="lg" asChild>
                <Link to="/loja">
                  Conhecer produtos
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild className="text-foreground hover:text-primary">
                <Link to="/monte-sua-rotina">
                  Monte sua rotina ideal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
const BannerSlideContent = ({
  slide
}: {
  slide: BannerSlide;
}) => {
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
  return <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
      <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className={cn("flex flex-col max-w-xl gap-4", getAlignmentClasses(slide.align), slide.align === "center" && "mx-auto", slide.align === "right" && "ml-auto")}>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-white/90 text-base md:text-lg max-w-md drop-shadow-md">
              {slide.subtitle}
            </p>
            <Link to={slide.ctaLink}>
              <Button size="lg" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                {slide.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
  return <section className="relative w-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map(slide => <div key={slide.id} className="relative flex-[0_0_100%] min-w-0">
              {slide.type === "hero" ? <HeroSlideContent /> : <BannerSlideContent slide={slide} />}
            </div>)}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm h-10 w-10 rounded-full hidden md:flex" onClick={scrollPrev}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm h-10 w-10 rounded-full hidden md:flex" onClick={scrollNext}>
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => <button key={index} onClick={() => scrollTo(index)} className={cn("w-2 h-2 rounded-full transition-all duration-300", selectedIndex === index ? "bg-primary w-8" : "bg-white/50 hover:bg-white/75")} aria-label={`Ir para slide ${index + 1}`} />)}
      </div>
    </section>;
};
export default HeroCarousel;