import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import HeroBanner from "@/components/home/HeroBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProductCarousel from "@/components/shop/ProductCarousel";
import RecentlyViewedSection from "@/components/shop/RecentlyViewedSection";
import AnimatedSection from "@/components/home/AnimatedSection";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";
import { allTulipiaWithImages } from "@/data/tulipiaProductsWithImages";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import banners
import sweetLipsLayane from "@/assets/banners/sweet-lips-layane.jpg";
import sweetLipsCereja from "@/assets/banners/sweet-lips-cereja.jpg";
import lifeCNano from "@/assets/banners/life-c-nano-hero.jpg";
import miracleEyesHero from "@/assets/banners/miracle-eyes-hero.jpg";
import resilienceSerum from "@/assets/banners/resilience-serum-hero.jpg";

// Mobile hero images
import heroMobile1 from "@/assets/banners/hero-mobile-1.png";
import heroMobile2 from "@/assets/banners/hero-mobile-2.png";

// Best Sellers - mix from brands
const bestSellers = [
  ...allTulipiaWithImages.slice(0, 2),
  ...allMezzoWithImages.slice(0, 2),
  ...allExtratosWithImages.slice(0, 2),
];

// Lançamentos - newest products
const lancamentos = [
  ...allTulipiaWithImages.slice(0, 4),
];

// Tendências
const tendencias = [
  ...allMezzoWithImages.slice(0, 4),
];

// Skin type categories
const skinTypes = [
  { 
    title: "Acne", 
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=500&fit=crop",
    href: "/loja?categoria=acne-oleosidade" 
  },
  { 
    title: "Manchas", 
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=500&fit=crop",
    href: "/loja?categoria=clareamento" 
  },
  { 
    title: "Mistas", 
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=500&fit=crop",
    href: "/loja?categoria=hidratacao-reparacao" 
  },
  { 
    title: "Oleosidade", 
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    href: "/loja?categoria=acne-oleosidade" 
  },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    text: "Os produtos são incríveis! Em apenas 2 semanas já notei diferença nas manchas.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ana Paula",
    text: "A consultoria personalizada fez toda a diferença. Finalmente encontrei a rotina perfeita.",
    rating: 5,
  },
  {
    id: 3,
    name: "Carla Santos",
    text: "Uso a linha anti-idade há 3 meses e os resultados são surpreendentes.",
    rating: 5,
  },
];

const HomePage = () => {
  const { recentProducts } = useRecentlyViewed();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <MainHeader />
      
      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24" />

      <main className="flex-1">
        {/* 1. Hero Banner */}
        <motion.div 
          ref={heroRef}
          style={{ opacity: heroOpacity }}
          className="relative"
        >
          <motion.div style={{ scale: heroScale }}>
            <HeroBanner
              title="Sua pele merece o melhor tratamento"
              subtitle="Dermocosméticos de alta performance para resultados visíveis."
              ctaPrimary={{ label: "Monte sua Rotina", href: "/monte-sua-rotina" }}
              ctaSecondary={{ label: "Ver Produtos", href: "/loja" }}
              image={sweetLipsLayane}
              mobileImage={heroMobile1}
              slides={[
                {
                  title: "Life C+ Nano Mousse",
                  subtitle: "Vitamina C estabilizada para máxima absorção e luminosidade.",
                  ctaPrimary: { label: "Conhecer", href: "/tulipia" },
                  ctaSecondary: { label: "Ver Produtos", href: "/loja" },
                  image: lifeCNano,
                  mobileImage: heroMobile1,
                  label: "Linha Tulipia",
                  stats: [
                    { value: "20%", label: "Vit C Pura" },
                    { value: "Nano", label: "Absorção" },
                    { value: "12h", label: "Ação" }
                  ]
                },
                {
                  title: "Miracle Eyes Treatment",
                  subtitle: "Tratamento intensivo para área dos olhos.",
                  ctaPrimary: { label: "Explorar", href: "/tulipia" },
                  ctaSecondary: { label: "Ver Resultados", href: "/loja" },
                  image: miracleEyesHero,
                  mobileImage: heroMobile2,
                  label: "Área dos Olhos",
                  stats: [
                    { value: "-60%", label: "Olheiras" },
                    { value: "-45%", label: "Bolsas" },
                    { value: "4 sem", label: "Resultado" }
                  ]
                },
                {
                  title: "Sweet Lips Collection",
                  subtitle: "Lábios hidratados, macios e rejuvenescidos.",
                  ctaPrimary: { label: "Ver Coleção", href: "/tulipia" },
                  ctaSecondary: { label: "Saiba Mais", href: "/consultoria" },
                  image: sweetLipsCereja,
                  label: "Linha Tulipia",
                  stats: [
                    { value: "Nano", label: "Tecnologia" },
                    { value: "24h", label: "Hidratação" },
                    { value: "100%", label: "Natural" }
                  ]
                },
                {
                  title: "Resilience Serum Pro",
                  subtitle: "Sérum anti-idade com peptídeos e ácido hialurônico.",
                  ctaPrimary: { label: "Comprar", href: "/tulipia" },
                  ctaSecondary: { label: "Ingredientes", href: "/loja" },
                  image: resilienceSerum,
                  label: "Alta Performance",
                  stats: [
                    { value: "+80%", label: "Firmeza" },
                    { value: "3x", label: "Colágeno" },
                    { value: "Pro", label: "Fórmula" }
                  ]
                }
              ]}
            />
          </motion.div>
        </motion.div>

        {/* 2. Best Sellers */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-editorial">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Best Sellers
              </h2>
            </div>
            <ProductCarousel products={bestSellers} />
          </div>
        </section>

        {/* 3. Banner Promo - Rosa e Dourado */}
        <section className="py-8 md:py-10 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10">
          <div className="container-editorial">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary/20 shadow-lg">
              <div className="w-full md:w-1/4">
                <img 
                  src={lifeCNano} 
                  alt="Linha Life C Nano" 
                  className="w-full h-40 md:h-48 object-cover rounded-xl shadow-md"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider rounded-full mb-3">
                  Oferta Especial
                </span>
                <h3 className="font-display text-xl md:text-2xl text-foreground">
                  Linha <span className="text-gold font-semibold">Life C Nano</span>
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Tecnologia nano encapsulada para máxima absorção e luminosidade
                </p>
              </div>
              <Button variant="primary" size="lg" asChild className="rounded-full">
                <Link to="/tulipia">
                  Comprar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Lançamentos */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-editorial">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Lançamentos
              </h2>
            </div>
            <ProductCarousel products={lancamentos} />
          </div>
        </section>

        {/* 5. Procure por tipo de pele */}
        <section className="py-12 md:py-16 bg-champagne">
          <div className="container-editorial">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Procure por tipo de pele
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {skinTypes.map((type) => (
                <Link 
                  key={type.title}
                  to={type.href}
                  className="group relative overflow-hidden aspect-[3/4]"
                >
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="font-display text-lg md:text-xl text-ivory uppercase tracking-wide text-center">
                      {type.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Tendências */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-editorial">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-gold">
                Tendências
              </h2>
            </div>
            <ProductCarousel products={tendencias} />
          </div>
        </section>

        {/* 7. Banners Duplos - Promos Rosa/Dourado */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container-editorial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* Banner 1 - Rosa */}
              <Link 
                to="/tulipia" 
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="flex items-center p-5 md:p-7 gap-4 md:gap-6">
                  <img 
                    src={miracleEyesHero} 
                    alt="Miracle Eyes"
                    className="w-24 md:w-28 h-28 md:h-32 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-medium uppercase tracking-wider rounded-full mb-2">
                      Bestseller
                    </span>
                    <h3 className="font-display text-lg md:text-xl text-foreground">
                      Miracle Eyes
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tratamento intensivo para área dos olhos
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 rounded-full border-primary/40 text-primary hover:bg-primary hover:text-white">
                      Comprar
                    </Button>
                  </div>
                </div>
              </Link>

              {/* Banner 2 - Dourado */}
              <Link 
                to="/mezzo" 
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 group hover:shadow-xl hover:shadow-gold/10 transition-all duration-300"
              >
                <div className="flex items-center p-5 md:p-7 gap-4 md:gap-6">
                  <img 
                    src={resilienceSerum} 
                    alt="Resilience Serum"
                    className="w-24 md:w-28 h-28 md:h-32 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-1 bg-gold text-noir text-[10px] font-medium uppercase tracking-wider rounded-full mb-2">
                      Anti-idade
                    </span>
                    <h3 className="font-display text-lg md:text-xl text-foreground">
                      Resilience Pro
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sérum anti-idade com peptídeos
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 rounded-full border-gold/40 text-gold hover:bg-gold hover:text-noir">
                      Comprar
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Recomendados / Recentemente Visualizados */}
        {recentProducts.length > 0 && (
          <section className="py-12 md:py-16 bg-background">
            <div className="container-editorial">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  Recomendados para você
                </h2>
              </div>
              <ProductCarousel products={recentProducts} />
            </div>
          </section>
        )}

        {/* 9. Depoimentos */}
        <AnimatedSection direction="up" delay={0.1}>
          <TestimonialsSection testimonials={testimonials} />
        </AnimatedSection>

        {/* 10. CTA Final - Consultoria */}
        <section className="bg-noir py-16 md:py-24 overflow-hidden relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -top-20 -left-20 w-64 h-64 border border-gold/30 rounded-full"
          />
          
          <div className="container-editorial text-center max-w-3xl mx-auto relative z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-body font-medium">
              Consultoria Grátis
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ivory mt-4">
              Não sabe por onde começar?
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mt-6 mb-6" />
            <p className="text-base md:text-lg text-ivory/70 font-body">
              Faça uma consultoria gratuita e descubra os produtos ideais para sua pele.
            </p>
            <Button variant="gold" size="xl" asChild className="mt-8 md:mt-10">
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com Especialista
                <ArrowRight className="ml-3 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default HomePage;
