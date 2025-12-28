import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryCardHome from "@/components/home/CategoryCardHome";
import KitsSection from "@/components/home/KitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProductCarousel from "@/components/shop/ProductCarousel";
import RecentlyViewedSection from "@/components/shop/RecentlyViewedSection";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";

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

const HomePage = () => {
  const { recentProducts } = useRecentlyViewed();

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      {/* Spacer for fixed header */}
      <div className="h-[120px] md:h-[132px]" />

      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner
          title="Sua pele merece o melhor tratamento"
          subtitle="Dermocosméticos de alta performance para resultados visíveis. Descubra a rotina ideal para sua pele."
          ctaPrimary={{ label: "Monte sua Rotina", href: "/monte-sua-rotina" }}
          ctaSecondary={{ label: "Ver Clareamento", href: "/shop?categoria=clareamento" }}
          image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1920&h=1080&fit=crop"
        />

        {/* Categories Section */}
        <section className="section-padding">
          <div className="container">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Categorias por preocupação
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <CategoryCardHome key={category.title} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Kits Section */}
        <KitsSection kits={kits} />

        {/* Featured Products */}
        <section className="section-padding">
          <div className="container">
            <ProductCarousel 
              products={featuredProducts} 
              title="Produtos mais procurados" 
            />
          </div>
        </section>

        {/* Recently Viewed - Only show if there are products */}
        {recentProducts.length > 0 && (
          <RecentlyViewedSection products={recentProducts} />
        )}

        {/* Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* CTA Banner */}
        <section className="bg-primary py-16">
          <div className="container text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-primary-foreground">
              Não sabe por onde começar?
            </h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">
              Faça uma consultoria gratuita e descubra os produtos ideais para sua pele.
            </p>
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 h-12 px-8 items-center justify-center rounded-md bg-background text-foreground font-heading font-medium hover:bg-background/90 transition-colors"
            >
              Falar com Especialista
            </a>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default HomePage;