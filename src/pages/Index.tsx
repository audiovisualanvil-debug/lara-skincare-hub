import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/shop/ProductCard";
import CategoryCard from "@/components/shop/CategoryCard";
import Newsletter from "@/components/home/Newsletter";
import heroImage from "@/assets/hero-skincare.jpg";

// Categories
const categories = [
  { name: "Manchas e Melasma", slug: "manchas-melasma", icon: "🎯", description: "Clareamento e uniformização" },
  { name: "Acne e Oleosidade", slug: "acne-oleosidade", icon: "💧", description: "Controle e tratamento" },
  { name: "Anti-idade", slug: "anti-idade", icon: "✨", description: "Rugas e firmeza" },
  { name: "Hidratação", slug: "hidratacao-reparacao", icon: "💦", description: "Reparação e nutrição" },
  { name: "Corpo", slug: "corpo", icon: "🌸", description: "Celulite e firmador" },
  { name: "Capilar", slug: "capilar", icon: "💇", description: "Queda e crescimento" },
  { name: "Fotoproteção", slug: "fotoprotecao", icon: "☀️", description: "Proteção solar" },
  { name: "Profissional", slug: "profissional", icon: "⚕️", description: "Uso em cabine" },
];

// Featured products
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Sérum Clareador Intensivo",
    brand: "Tulípia",
    category: "manchas-melasma",
    isProfessional: false,
    description: "Sérum de alta concentração para tratamento de manchas",
    price: "R$ 189,90",
  },
  {
    id: 2,
    name: "Vitamina C 20% Estabilizada",
    brand: "Tulípia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sérum antioxidante para luminosidade",
    price: "R$ 159,90",
  },
  {
    id: 3,
    name: "Protetor Solar FPS 60",
    brand: "Mezzo",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Alta proteção com toque seco",
    price: "R$ 89,90",
  },
  {
    id: 4,
    name: "Gel de Limpeza Oil Control",
    brand: "Extratos da Terra",
    category: "acne-oleosidade",
    isProfessional: false,
    description: "Limpeza profunda para peles oleosas",
    price: "R$ 69,90",
  },
  {
    id: 5,
    name: "Creme Anti-idade Retinol",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Tratamento noturno com retinol 0.5%",
    price: "R$ 199,90",
  },
  {
    id: 6,
    name: "Hidratante Reparador Intenso",
    brand: "Mezzo",
    category: "hidratacao-reparacao",
    isProfessional: false,
    description: "Restauração profunda da barreira cutânea",
    price: "R$ 129,90",
  },
];

// New arrivals
const newArrivals: Product[] = [
  {
    id: 7,
    name: "Sérum Niacinamida 10%",
    brand: "Tulípia",
    category: "acne-oleosidade",
    isProfessional: false,
    description: "Controle de poros e oleosidade",
    price: "R$ 139,90",
  },
  {
    id: 8,
    name: "Contorno de Olhos Peptídeos",
    brand: "Mezzo",
    category: "area-olhos",
    isProfessional: false,
    description: "Reduz olheiras e linhas finas",
    price: "R$ 149,90",
  },
  {
    id: 9,
    name: "Peeling Enzimático",
    brand: "Extratos da Terra",
    category: "profissional",
    isProfessional: true,
    description: "Renovação celular suave - Uso profissional",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Dermocosméticos Premium",
    description: "Marcas de alta qualidade e eficácia comprovada"
  },
  {
    icon: Users,
    title: "Consultoria Personalizada",
    description: "Análise individual para o tratamento ideal"
  },
  {
    icon: ShieldCheck,
    title: "Profissional & Home Care",
    description: "Produtos para cabine e uso doméstico"
  },
];

const Index = () => {
  return (
    <main className="pt-[104px] lg:pt-[136px] bg-card">
      {/* Hero Section */}
      <section className="relative bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-20">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              <span className="inline-block font-script text-2xl lg:text-3xl text-primary">
                Multti Med Cosméticos
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-wide">
                Dermocosméticos{" "}
                <span className="text-gradient-gold">premium</span>{" "}
                para sua pele
              </h1>
              <p className="font-body text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Tratamentos profissionais e produtos de alta performance 
                para resultados reais e duradouros.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="elegant" size="lg" asChild>
                  <Link to="/loja">
                    Explorar Produtos
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </Link>
                </Button>
                <Button variant="gold-outline" size="lg" asChild>
                  <Link to="/consultoria">
                    Agendar Consultoria
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] lg:aspect-square overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="Dermocosméticos premium"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-primary/30 hidden lg:block" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Categorias
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
              Encontre o tratamento ideal
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-background border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
                <div className="w-12 h-12 border border-primary flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                Mais Vendidos
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
                Produtos em destaque
              </h2>
            </div>
            <Link 
              to="/loja" 
              className="hidden sm:flex items-center gap-2 font-body text-sm text-primary hover:underline"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="gold-outline" asChild>
              <Link to="/loja">
                Ver todos os produtos
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Build Your Routine CTA */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-block font-script text-2xl text-primary">
              Personalizado para você
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-wide">
              Monte sua rotina de skincare
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Descubra os produtos ideais para seu tipo de pele e preocupações. 
              Nossa ferramenta ajuda você a criar uma rotina completa e eficaz.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/monte-sua-rotina">
                  Começar agora
                  <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                Novidades
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
                Lançamentos
              </h2>
            </div>
            <Link 
              to="/loja" 
              className="hidden sm:flex items-center gap-2 font-body text-sm text-primary hover:underline"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block font-script text-2xl text-primary">
                Atendimento especializado
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
                Consultoria de pele personalizada
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Precisa de ajuda para escolher os produtos certos? Nossa consultoria 
                analisa seu tipo de pele e cria uma rotina sob medida para você.
              </p>
              <ul className="space-y-3">
                {[
                  "Análise completa do seu tipo de pele",
                  "Rotina diurna e noturna personalizada",
                  "Indicação de produtos específicos",
                  "Acompanhamento por 30 dias",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button variant="elegant" size="lg" asChild>
                  <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                    Agendar pelo WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center">
                <span className="font-body text-muted-foreground">Imagem consultoria</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-primary/30 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Brands */}
      <section className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="font-body text-xs text-center text-muted-foreground uppercase tracking-widest mb-8">
            Marcas que trabalhamos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {["Tulípia", "Extratos da Terra", "Mezzo"].map((brand) => (
              <span 
                key={brand} 
                className="font-display text-xl lg:text-2xl font-semibold text-foreground/40 hover:text-primary transition-colors cursor-pointer"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
