import SEOHead from "@/components/seo/SEOHead";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import HeroBanner from "@/components/home/HeroBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProductCarousel from "@/components/shop/ProductCarousel";
import PromoBannerCarousel from "@/components/shop/PromoBannerCarousel";
import RecentlyViewedSection from "@/components/shop/RecentlyViewedSection";
import AnimatedSection from "@/components/home/AnimatedSection";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useHomeProducts } from "@/hooks/useHomeProducts";
import { promoBanners } from "@/data/promoBanners";
import { Link } from "react-router-dom";
import catAcne from "@/assets/products/mezzo/acne-xsome-official.png";
import catManchas from "@/assets/products/tulipia/black-secret-clareador-official.png";
import catMistas from "@/assets/products/tulipia/niacine-espuma-official.png";
import catOleosidade from "@/assets/products/tulipia/age-matte-serum-new.png";
import { ArrowRight, Percent, Sparkles } from "lucide-react";
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

// Skin type categories
const skinTypes = [
  { 
    title: "Acne", 
    image: catAcne,
    href: "/loja?categoria=acne-oleosidade" 
  },
  { 
    title: "Manchas", 
    image: catManchas,
    href: "/loja?categoria=clareamento" 
  },
  { 
    title: "Mistas", 
    image: catMistas,
    href: "/loja?categoria=hidratacao-reparacao" 
  },
  { 
    title: "Oleosidade", 
    image: catOleosidade,
    href: "/loja?categoria=acne-oleosidade" 
  },
];

// Testimonials - usando apenas iniciais, sem fotos de banco de imagem
const testimonials = [
  {
    id: 1,
    name: "Ana Paula M.",
    text: "Minha pele clareou visivelmente em 4 semanas! As manchas do melasma reduziram bastante e a textura ficou muito mais uniforme.",
    rating: 5,
    role: "São Paulo, SP",
    product: "Life C Nano Mousse",
  },
  {
    id: 2,
    name: "Fernanda L.",
    text: "Textura leve, absorve super rápido e não deixa a pele oleosa. Resultado visível desde a segunda semana de uso.",
    rating: 5,
    role: "Curitiba, PR",
    product: "Kit Rotina Completa",
  },
  {
    id: 3,
    name: "Juliana S.",
    text: "Uso a linha anti-idade há 3 meses e os resultados são surpreendentes. Minha esteticista também recomendou.",
    rating: 4,
    role: "Belo Horizonte, MG",
    product: "Resilience Serum Pro",
  },
  {
    id: 4,
    name: "Mariana C.",
    text: "Uso diariamente e minha pele nunca esteve tão bonita! A vitamina C faz toda diferença na luminosidade.",
    rating: 5,
    role: "Rio de Janeiro, RJ",
    product: "Linha Acne Control",
  },
  {
    id: 5,
    name: "Camila R.",
    text: "O atendimento é excepcional! Recebi recomendações que realmente funcionaram para minha pele sensível.",
    rating: 5,
    role: "Porto Alegre, RS",
    product: "Miracle Eyes",
  },
  {
    id: 6,
    name: "Patrícia O.",
    text: "Produtos profissionais de qualidade acessível. Uso no meu consultório e as pacientes amam os resultados.",
    rating: 5,
    role: "Florianópolis, SC",
    product: "Smart GR Peptide",
  },
];

const HomePage = () => {
  const { recentProducts } = useRecentlyViewed();
  const { bestSellers, lancamentos, promocoes, tendencias, isLoading } = useHomeProducts();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <SEOHead
        title="Multti Med Porto Alegre | Dermocosméticos Profissionais"
        description="Loja de dermocosméticos de alta performance em Porto Alegre. Mezzo, Tulípia, Extratos da Terra e Smart GR. Entrega para todo Brasil."
        canonical="/"
      />
      <OrganizationJsonLd />
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
                  loading="lazy"
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
        <section className="py-12 md:py-16 bg-gradient-to-b from-champagne to-background">
          <div className="container-editorial">
            <div className="text-center mb-8 md:mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-body font-medium">
                Encontre o ideal para você
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mt-2">
                Procure por tipo de pele
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {skinTypes.map((type) => (
                <Link 
                  key={type.title}
                  to={type.href}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img 
                    src={type.image} 
                    alt={type.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {type.title === "Acne" && <span className="text-white text-sm">💧</span>}
                        {type.title === "Manchas" && <span className="text-white text-sm">✨</span>}
                        {type.title === "Mistas" && <span className="text-white text-sm">🌿</span>}
                        {type.title === "Oleosidade" && <span className="text-white text-sm">💎</span>}
                      </div>
                    </div>
                    <h3 className="font-display text-lg md:text-xl text-ivory text-center mt-2">
                      {type.title}
                    </h3>
                    <p className="text-xs text-ivory/70 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver produtos →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Promoções */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-terracotta/10 via-background to-gold/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
          
          <div className="container-editorial relative z-10">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
                <Percent className="w-4 h-4 text-terracotta" />
                <span className="text-xs uppercase tracking-wider text-terracotta font-medium">
                  Ofertas Imperdíveis
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Promoções da Semana
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Até 40% OFF em produtos selecionados
              </p>
            </div>
            <ProductCarousel products={promocoes} />
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" asChild className="rounded-full border-terracotta/40 text-terracotta hover:bg-terracotta hover:text-white">
                <Link to="/loja?promocao=true">
                  Ver Todas as Ofertas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. Tendências */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-editorial">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-xs uppercase tracking-wider text-gold font-medium">
                  Em Alta
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Tendências
              </h2>
            </div>
            <ProductCarousel products={tendencias} />
          </div>
        </section>

        {/* Promo Banners Carousel */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-champagne/30 to-background">
          <div className="container-editorial">
            <PromoBannerCarousel 
              banners={promoBanners.slice(0, 4)} 
              title="Explore Nossas Linhas"
            />
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
                    loading="lazy"
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
                    loading="lazy"
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
