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
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

// Kits data
const kits = [
  {
    id: 1,
    name: "Kit Clareamento Diário",
    description: "Uniformiza o tom e ilumina com proteção solar. Ideal para melasma e manchas.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=450&fit=crop",
    href: "/produto/701",
  },
  {
    id: 2,
    name: "Kit Anti-idade & Firmeza",
    description: "Melhora firmeza e linhas com proteção diária. Resultados visíveis em semanas.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=450&fit=crop",
    href: "/produto/703",
  },
  {
    id: 3,
    name: "Kit Acne e Oleosidade",
    description: "Reduz acne, controla oleosidade e trata pós-lesão com eficácia comprovada.",
    image: "https://images.unsplash.com/photo-1556228994-8a45e5ddb81f?w=600&h=450&fit=crop",
    href: "/produto/702",
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
              ctaSecondary={{ label: "Ver Clareamento", href: "/shop?categoria=clareamento" }}
              image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1920&h=1080&fit=crop"
            />
          </motion.div>
        </motion.div>

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
