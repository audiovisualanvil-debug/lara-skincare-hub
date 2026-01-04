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
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";
import { allTulipiaWithImages } from "@/data/tulipiaProductsWithImages";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import Tulipia banners
import sweetLipsLayane from "@/assets/banners/sweet-lips-layane.jpg";
import sweetLipsCereja from "@/assets/banners/sweet-lips-cereja.jpg";
import sweetLipsEsfoliante from "@/assets/banners/sweet-lips-esfoliante.webp";
import sweetLipsFluido from "@/assets/banners/sweet-lips-fluido.webp";
import lifeCNano from "@/assets/banners/life-c-nano.webp";
import miracleEyes1 from "@/assets/banners/miracle-eyes-1.webp";
import miracleEyesHero from "@/assets/banners/miracle-eyes-hero.jpg";
import glamourPele from "@/assets/banners/glamour-pele.webp";
import primaveraMask from "@/assets/banners/primavera-mask.webp";
import resilienceSerum from "@/assets/banners/resilience-serum.webp";

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
              subtitle="Dermocosméticos de alta performance para resultados visíveis. Descubra a rotina ideal para sua pele com Mezzo, Extratos da Terra e Tulipia."
              ctaPrimary={{ label: "Monte sua Rotina", href: "/monte-sua-rotina" }}
              ctaSecondary={{ label: "Ver Produtos", href: "/loja" }}
              image={sweetLipsLayane}
              slides={[
                {
                  title: "Sua pele merece o melhor tratamento",
                  subtitle: "Dermocosméticos de alta performance para resultados visíveis. Descubra a rotina ideal para sua pele com Mezzo, Extratos da Terra e Tulipia.",
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
                  title: "Sweet Lips Collection",
                  subtitle: "Lábios hidratados, macios e rejuvenescidos. Tecnologia nano encapsulada para resultados visíveis desde a primeira aplicação.",
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
                  title: "Life C Nano Vitamina C",
                  subtitle: "Vitamina C estabilizada em nanocápsulas para máxima absorção. Ilumina, uniformiza e protege sua pele.",
                  ctaPrimary: { label: "Conhecer Produto", href: "/tulipia" },
                  ctaSecondary: { label: "Consultoria", href: "/consultoria" },
                  image: lifeCNano,
                  label: "Anti-idade",
                  stats: [
                    { value: "20%", label: "Vit C Pura" },
                    { value: "Nano", label: "Absorção" },
                    { value: "12h", label: "Ação" }
                  ]
                },
                {
                  title: "Miracle Eyes Tratamento",
                  subtitle: "Reduza olheiras, bolsas e linhas finas ao redor dos olhos. Resultados comprovados em tratamentos profissionais.",
                  ctaPrimary: { label: "Explorar", href: "/tulipia" },
                  ctaSecondary: { label: "Ver Resultados", href: "/loja" },
                  image: miracleEyesHero,
                  label: "Área dos Olhos",
                  stats: [
                    { value: "-60%", label: "Olheiras" },
                    { value: "-45%", label: "Bolsas" },
                    { value: "4 sem", label: "Resultado" }
                  ]
                },
                {
                  title: "Resilience Serum Pro",
                  subtitle: "Sérum anti-idade de alta potência com peptídeos e ácido hialurônico. Firmeza e elasticidade restauradas.",
                  ctaPrimary: { label: "Comprar Agora", href: "/tulipia" },
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

        {/* Featured Banners Carousel */}
        <section className="section-editorial bg-secondary/20">
          <div className="container-editorial">
            <AnimatedSection className="mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
                Linha Tulipia
              </span>
              <h2 className="font-display text-display-sm md:text-display text-foreground mt-3">
                Destaques Sweet Lips
              </h2>
            </AnimatedSection>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { image: sweetLipsCereja, title: "Sweet Lips Cereja", subtitle: "Gloss labial hidratante", href: "/loja?categoria=labial" },
                { image: sweetLipsEsfoliante, title: "Esfoliante Labial", subtitle: "Lábios hidratados e joviais", href: "/loja?categoria=labial" },
                { image: sweetLipsFluido, title: "Fluido Microagulhamento", subtitle: "Preenche, hidrata e rejuvenesce", href: "/loja?categoria=labial" },
              ].map((banner, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link to={banner.href} className="group block img-editorial">
                    <div className="aspect-[16/9] overflow-hidden bg-secondary relative">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="mt-4">
                      <h4 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {banner.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-body mt-1">
                        {banner.subtitle}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section - Editorial with Scroll Animation */}
        <section className="section-editorial">
          <div className="container-editorial">
            {/* Section Header - Animated */}
            <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold"
                >
                  Explore
                </motion.span>
                <h2 className="font-display text-display-sm md:text-display text-foreground mt-3">
                  Categorias por preocupação
                </h2>
              </div>
              <Link 
                to="/loja" 
                className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors font-body font-medium group"
              >
                Ver todos os produtos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
            
            {/* Categories Grid with Stagger */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
            >
              {categories.map((category, index) => (
                <motion.div key={category.title} variants={itemVariants}>
                  <CategoryCardHome {...category} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tulipia Promotional Banner */}
        <section className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[600px]"
            >
              <img
                src={sweetLipsLayane}
                alt="Linha Tulipia - Dermocosméticos Premium"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:hidden" />
            </motion.div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-espresso flex items-center justify-center p-8 lg:p-16"
            >
              <div className="max-w-md text-center lg:text-left">
                <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
                  Linha Exclusiva
                </span>
                <h2 className="font-display text-display-sm md:text-display text-white mt-4">
                  Tulipia <br />
                  <span className="text-primary">Dermocosméticos</span>
                </h2>
                <p className="mt-6 text-white/80 font-body leading-relaxed">
                  Tecnologia nano encapsulada e ingredientes premium para resultados profissionais. 
                  Sweet Lips, Life C Nano, Miracle Eyes e muito mais.
                </p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { label: "Nano Tech", desc: "Ativos encapsulados" },
                    { label: "Premium", desc: "Alta concentração" },
                    { label: "Resultados", desc: "Desde 1ª aplicação" },
                    { label: "Profissional", desc: "Clínicas e estéticas" },
                  ].map((item) => (
                    <div key={item.label} className="text-left">
                      <p className="text-primary text-sm font-semibold">{item.label}</p>
                      <p className="text-white/60 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <motion.div 
                  className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    to="/tulipia"
                    className="inline-flex h-12 px-8 items-center justify-center bg-primary text-primary-foreground font-body font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors group"
                  >
                    Explorar Linha
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link 
                    to="/consultoria"
                    className="inline-flex h-12 px-8 items-center justify-center border border-white/30 text-white font-body font-semibold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors"
                  >
                    Consultoria Grátis
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tulipia Products Carousel Section */}
        <section className="section-editorial bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-primary rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          />
          
          <div className="container-editorial relative z-10">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
                  Tulipia
                </span>
                <h2 className="font-display text-display-sm md:text-display text-foreground mt-3">
                  Produtos em destaque
                </h2>
                <p className="text-muted-foreground font-body mt-4 max-w-lg">
                  Tecnologia nano encapsulada para resultados profissionais. Descubra nossa linha exclusiva de dermocosméticos.
                </p>
              </div>
              <Link 
                to="/tulipia" 
                className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors font-body font-medium group"
              >
                Ver toda a linha Tulipia
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <ProductCarousel products={allTulipiaWithImages} />
            </AnimatedSection>
          </div>
        </section>

        {/* Kits Section - Animated */}
        <AnimatedSection delay={0.1}>
          <KitsSection kits={kits} />
        </AnimatedSection>

        {/* Quiz CTA - Animated */}
        <AnimatedSection direction="fade" delay={0.1}>
          <QuizCTA />
        </AnimatedSection>

        {/* Featured Products - Editorial with Parallax Background */}
        <section className="section-editorial bg-secondary/30 relative overflow-hidden">
          {/* Decorative parallax elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          />
          
          <div className="container-editorial relative z-10">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
                  Best Sellers
                </span>
                <h2 className="font-display text-display-sm md:text-display text-foreground mt-3">
                  Produtos mais procurados
                </h2>
              </div>
              <Link 
                to="/loja" 
                className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors font-body font-medium group"
              >
                Ver catálogo completo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <ProductCarousel products={featuredProducts} />
            </AnimatedSection>
          </div>
        </section>

        {/* Recently Viewed - Animated */}
        {recentProducts.length > 0 && (
          <AnimatedSection delay={0.1}>
            <RecentlyViewedSection products={recentProducts} />
          </AnimatedSection>
        )}

        {/* Testimonials - Animated */}
        <AnimatedSection direction="up" delay={0.1}>
          <TestimonialsSection testimonials={testimonials} />
        </AnimatedSection>

        {/* CTA Banner - Editorial with Animation */}
        <section className="bg-primary section-editorial overflow-hidden relative">
          {/* Animated decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -top-20 -left-20 w-64 h-64 border border-primary-foreground/30 rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute -bottom-32 -right-32 w-96 h-96 border border-primary-foreground/30 rounded-full"
          />
          
          <AnimatedSection className="container-editorial text-center max-w-3xl mx-auto relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 font-body font-semibold">
              Consultoria Grátis
            </span>
            <h2 className="font-display text-display-sm md:text-display text-primary-foreground mt-4">
              Não sabe por onde começar?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 font-body">
              Faça uma consultoria gratuita e descubra os produtos ideais para sua pele.
            </p>
            <motion.a 
              href="https://wa.me/5511999999999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-10 h-14 px-10 items-center justify-center bg-background text-foreground font-body font-semibold uppercase tracking-wider text-sm hover:bg-background/90 transition-colors group"
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
