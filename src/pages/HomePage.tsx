import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryCardHome from "@/components/home/CategoryCardHome";
import KitsSection from "@/components/home/KitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProductCarousel from "@/components/shop/ProductCarousel";
import RecentlyViewedSection from "@/components/shop/RecentlyViewedSection";
import QuizCTA from "@/components/home/QuizCTA";
import AnimatedSection from "@/components/home/AnimatedSection";
import BrandSection from "@/components/home/BrandSection";
import BrandsSection from "@/components/home/BrandsSection";
import BrandCollectionsSection from "@/components/home/BrandCollectionsSection";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";
import { allTulipiaWithImages } from "@/data/tulipiaProductsWithImages";
import { allSmartGRWithImages } from "@/data/smartGRProducts";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import Tulipia banners
import sweetLipsLayane from "@/assets/banners/sweet-lips-layane.jpg";
import sweetLipsCereja from "@/assets/banners/sweet-lips-cereja.jpg";
import sweetLipsEsfoliante from "@/assets/banners/sweet-lips-esfoliante.webp";
import sweetLipsFluido from "@/assets/banners/sweet-lips-fluido.webp";
import lifeCNano from "@/assets/banners/life-c-nano-hero.jpg";
import miracleEyes1 from "@/assets/banners/miracle-eyes-1.webp";
import miracleEyesHero from "@/assets/banners/miracle-eyes-hero.jpg";
import glamourPele from "@/assets/banners/glamour-pele.webp";
import primaveraMask from "@/assets/banners/primavera-mask.webp";
import resilienceSerum from "@/assets/banners/resilience-serum-hero.jpg";

// Mobile hero images
import heroMobile1 from "@/assets/banners/hero-mobile-1.png";
import heroMobile2 from "@/assets/banners/hero-mobile-2.png";

// Featured products - mix from both brands
const featuredProducts = [
  ...allMezzoWithImages.slice(0, 4),
  ...allExtratosWithImages.slice(0, 4),
];

// Categories data
const categories = [
  {
    title: "Clareamento",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=750&fit=crop",
    href: "/shop?categoria=clareamento",
  },
  {
    title: "Acne & Oleosidade",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=750&fit=crop",
    href: "/shop?categoria=acne",
  },
  {
    title: "Anti-idade",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=750&fit=crop",
    href: "/shop?categoria=anti-idade",
  },
  {
    title: "Hidratação",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=750&fit=crop",
    href: "/shop?categoria=hidratacao",
  },
  {
    title: "Capilar",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=750&fit=crop",
    href: "/shop?categoria=capilar",
  },
  {
    title: "Corpo & Firmador",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=750&fit=crop",
    href: "/shop?categoria=corpo",
  },
];

// Kits data with Tulipia banners
const kits = [
  {
    id: 1,
    name: "Life C Nano Sabonete",
    description: "Vitamina C estabilizada para luminosidade e uniformização do tom da pele.",
    image: lifeCNano,
    href: "/loja?categoria=facial",
  },
  {
    id: 2,
    name: "Miracle Eyes Nano Gel",
    description: "Tratamento intensivo para área dos olhos. Reduz olheiras e bolsas.",
    image: miracleEyes1,
    href: "/loja?categoria=olhos",
  },
  {
    id: 3,
    name: "Primavera Mask",
    description: "Máscara renovadora nanotecnológica para rejuvenescimento facial.",
    image: primaveraMask,
    href: "/loja?categoria=mascaras",
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    text: "Os produtos são incríveis! Em apenas 2 semanas já notei diferença nas manchas. Atendimento impecável e entrega super rápida.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ana Paula",
    text: "A consultoria personalizada fez toda a diferença. Finalmente encontrei a rotina perfeita para minha pele oleosa.",
    rating: 5,
  },
  {
    id: 3,
    name: "Carla Santos",
    text: "Uso a linha anti-idade há 3 meses e os resultados são surpreendentes. Minha pele está muito mais firme e luminosa.",
    rating: 5,
  },
];

// Stagger animation for grid items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

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
        {/* Hero Banner with Parallax */}
        <motion.div 
          ref={heroRef}
          style={{ opacity: heroOpacity }}
          className="relative"
        >
          <motion.div style={{ scale: heroScale }}>
            <HeroBanner
              title="Sua pele merece o melhor tratamento"
              subtitle="Dermocosméticos de alta performance para resultados visíveis. Descubra a rotina ideal para sua pele."
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
                  subtitle: "Tratamento intensivo para área dos olhos com resultados visíveis.",
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
                  title: "Sua pele merece o melhor",
                  subtitle: "Dermocosméticos de alta performance para resultados visíveis.",
                  ctaPrimary: { label: "Monte sua Rotina", href: "/monte-sua-rotina" },
                  ctaSecondary: { label: "Ver Produtos", href: "/loja" },
                  image: sweetLipsLayane,
                  label: "Dermocosméticos",
                  stats: [
                    { value: "100+", label: "Produtos" },
                    { value: "10k+", label: "Clientes" },
                    { value: "5★", label: "Avaliação" }
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

        {/* 1. Quiz CTA - Primeiro engajamento após hero */}
        <AnimatedSection direction="fade" delay={0.1}>
          <QuizCTA />
        </AnimatedSection>

        {/* 2. Categorias por Preocupação - Navegação rápida */}
        <section className="section-editorial bg-background">
          <div className="container-editorial">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-14">
              <div>
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xs uppercase tracking-[0.3em] text-gold font-body font-medium"
                >
                  Explore
                </motion.span>
                <h2 className="font-display text-2xl md:text-display-sm lg:text-display text-foreground mt-3">
                  Qual sua Preocupação?
                </h2>
                <div className="w-12 h-px bg-gold/50 mt-4" />
              </div>
              <Link 
                to="/loja" 
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-foreground hover:text-gold transition-colors font-body font-medium group"
              >
                Ver todos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5"
            >
              {categories.map((category, index) => (
                <motion.div key={category.title} variants={itemVariants}>
                  <CategoryCardHome {...category} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. Best Sellers - Prova social */}
        <section className="section-editorial bg-champagne relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          />
          
          <div className="container-editorial relative z-10">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-body font-medium">
                  Best Sellers
                </span>
                <h2 className="font-display text-2xl md:text-display-sm lg:text-display text-foreground mt-3">
                  Mais Procurados
                </h2>
                <div className="w-12 h-px bg-gold/50 mt-4" />
              </div>
              <Link 
                to="/loja" 
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-foreground hover:text-gold transition-colors font-body font-medium group"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <ProductCarousel products={featuredProducts} />
            </AnimatedSection>
          </div>
        </section>

        {/* 4. Banner Tulipia - Destaque de marca */}
        <section className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[320px] md:h-[400px] lg:h-[550px]"
            >
              <img
                src={sweetLipsLayane}
                alt="Linha Tulipia - Dermocosméticos Premium"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-noir/30" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-noir flex items-center justify-center p-6 md:p-10 lg:p-16"
            >
              <div className="max-w-md text-center lg:text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-body font-medium">
                  Linha Exclusiva
                </span>
                <h2 className="font-display text-2xl md:text-display-sm lg:text-display text-ivory mt-4">
                  Tulipia <span className="text-gold">Nano</span>
                </h2>
                <div className="w-12 h-px bg-gold/50 mt-5 mb-5 mx-auto lg:mx-0" />
                <p className="text-ivory/70 font-body text-sm md:text-base leading-relaxed">
                  Tecnologia nano encapsulada para resultados profissionais.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { label: "Nano Tech", desc: "Ativos encapsulados" },
                    { label: "Premium", desc: "Alta concentração" },
                  ].map((item) => (
                    <div key={item.label} className="text-left">
                      <p className="text-gold text-sm font-medium">{item.label}</p>
                      <p className="text-ivory/50 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <motion.div 
                  className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    to="/tulipia"
                    className="inline-flex h-12 px-6 md:px-8 items-center justify-center bg-gold text-noir font-body font-medium uppercase tracking-widest text-xs hover:bg-gold-light transition-colors group"
                  >
                    Explorar
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. Marcas Principais */}
        <BrandsSection />

        {/* 6. Seções de Produtos por Marca */}
        <BrandSection
          brand="Tulipia"
          title="Nanotecnologia Premium"
          subtitle="Tecnologia nano encapsulada para resultados profissionais."
          products={allTulipiaWithImages}
          linkTo="/tulipia"
          linkLabel="Ver linha Tulipia"
          bgVariant="gradient"
        />

        <BrandSection
          brand="Mezzo"
          title="Alta Performance"
          subtitle="Produtos profissionais para tratamentos estéticos avançados."
          products={allMezzoWithImages}
          linkTo="/mezzo"
          linkLabel="Ver linha Mezzo"
          bgVariant="dark"
        />

        <BrandSection
          brand="Extratos da Terra"
          title="Natureza & Ciência"
          subtitle="Dermocosméticos com ingredientes naturais e tecnologia cosmética."
          products={allExtratosWithImages}
          linkTo="/extratos-da-terra"
          linkLabel="Ver linha Extratos"
          bgVariant="light"
        />

        <BrandSection
          brand="Smart GR"
          title="Equipamentos Profissionais"
          subtitle="Aparelhos de última geração para tratamentos estéticos."
          products={allSmartGRWithImages}
          linkTo="/smart-gr"
          linkLabel="Ver Smart GR"
          bgVariant="gradient"
        />

        {/* 7. Recentemente Visualizados */}
        {recentProducts.length > 0 && (
          <AnimatedSection delay={0.1}>
            <RecentlyViewedSection products={recentProducts} />
          </AnimatedSection>
        )}

        {/* 8. Depoimentos - Prova social final */}
        <AnimatedSection direction="up" delay={0.1}>
          <TestimonialsSection testimonials={testimonials} />
        </AnimatedSection>

        {/* 9. CTA Final - Consultoria */}
        <section className="bg-noir section-editorial overflow-hidden relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -top-20 -left-20 w-64 h-64 border border-gold/30 rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute -bottom-32 -right-32 w-96 h-96 border border-gold/30 rounded-full"
          />
          
          <AnimatedSection className="container-editorial text-center max-w-3xl mx-auto relative z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-body font-medium">
              Consultoria Grátis
            </span>
            <h2 className="font-display text-2xl md:text-display-sm lg:text-display text-ivory mt-4">
              Não sabe por onde começar?
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mt-6 mb-6" />
            <p className="text-base md:text-lg text-ivory/70 font-body">
              Faça uma consultoria gratuita e descubra os produtos ideais para sua pele.
            </p>
            <motion.a 
              href="https://wa.me/5511999999999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-8 md:mt-10 h-12 md:h-14 px-8 md:px-10 items-center justify-center bg-gold text-noir font-body font-medium uppercase tracking-widest text-xs md:text-sm hover:bg-gold-light transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Falar com Especialista
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </AnimatedSection>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default HomePage;
