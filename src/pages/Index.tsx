import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/shop/ProductCard";
import Newsletter from "@/components/home/Newsletter";
import heroImage from "@/assets/hero-skincare.jpg";
import productsImage from "@/assets/products-display.jpg";

// Categories - simplified for inline display
const categories = [
  { name: "Manchas", slug: "manchas-melasma" },
  { name: "Acne", slug: "acne-oleosidade" },
  { name: "Anti-idade", slug: "anti-idade" },
  { name: "Corpo", slug: "corpo" },
  { name: "Capilar", slug: "capilar" },
  { name: "Fotoproteção", slug: "fotoprotecao" },
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

// Highlights
const highlights: Product[] = [
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
    price: "R$ 249,90",
  },
];

const Index = () => {
  return (
    <main className="pt-[104px] lg:pt-[136px]">
      {/* Hero Banner - Model + Product side by side */}
      <section className="bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[500px] lg:min-h-[600px]">
            {/* Left - Model Image */}
            <div className="relative h-[300px] lg:h-auto overflow-hidden">
              <img 
                src={heroImage} 
                alt="Skincare profissional"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right - Product + Content */}
            <div className="relative bg-cream flex items-center">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
                <img 
                  src={productsImage} 
                  alt="Produtos dermocosméticos"
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
              <div className="relative z-10 p-8 lg:p-16 space-y-6">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-wide">
                  Dermocosméticos{" "}
                  <span className="text-primary">premium</span>{" "}
                  para sua pele
                </h1>
                <p className="font-body text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                  Tratamentos profissionais e produtos de alta performance 
                  para resultados reais.
                </p>
                <div className="pt-2">
                  <Button variant="gold-outline" size="lg" asChild>
                    <Link to="/loja">
                      Explorar Produtos
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Horizontal Row */}
      <section className="py-8 lg:py-12 bg-background border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/loja?categoria=${category.slug}`}
                className="px-6 py-3 border border-border hover:border-primary bg-card hover:bg-primary/5 font-body text-sm text-foreground hover:text-primary transition-all duration-300"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid - 3 Columns */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Mais Vendidos
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
              Produtos em destaque
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="gold-outline" asChild>
              <Link to="/loja">
                Ver todos os produtos
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Monte sua Rotina - Interactive Section */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <span className="inline-block font-script text-2xl lg:text-3xl text-primary mb-3">
                Personalizado
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-wide">
                Monte sua rotina de skincare
              </h2>
            </div>
            
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Responda 3 perguntas simples e descubra os produtos ideais 
              para o seu tipo de pele e suas necessidades.
            </p>

            {/* 3 Steps Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="p-6 bg-card border border-border">
                <span className="inline-flex items-center justify-center w-10 h-10 border border-primary text-primary font-display font-bold text-lg mb-4">
                  1
                </span>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  Tipo de pele
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Oleosa, seca, mista ou sensível?
                </p>
              </div>
              <div className="p-6 bg-card border border-border">
                <span className="inline-flex items-center justify-center w-10 h-10 border border-primary text-primary font-display font-bold text-lg mb-4">
                  2
                </span>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  Sua preocupação
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Manchas, acne, rugas ou hidratação?
                </p>
              </div>
              <div className="p-6 bg-card border border-border">
                <span className="inline-flex items-center justify-center w-10 h-10 border border-primary text-primary font-display font-bold text-lg mb-4">
                  3
                </span>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  Sua rotina
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Manhã, noite ou completa?
                </p>
              </div>
            </div>

            <Button variant="gold" size="xl" asChild>
              <Link to="/monte-sua-rotina">
                Começar agora
                <ArrowRight className="w-5 h-5 stroke-[1.5]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights / Destaques */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Novidades
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
              Destaques
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultoria CTA - Simplified */}
      <section className="py-12 lg:py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide">
                Precisa de ajuda para escolher?
              </h3>
              <p className="font-body text-muted-foreground mt-1">
                Faça sua consultoria de pele personalizada pelo WhatsApp.
              </p>
            </div>
            <Button variant="elegant" size="lg" asChild>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                Falar com especialista
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Brands - Clean */}
      <section className="py-10 bg-background border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {["Tulípia", "Extratos da Terra", "Mezzo"].map((brand) => (
              <span 
                key={brand} 
                className="font-display text-lg lg:text-xl font-semibold text-foreground/40 hover:text-primary transition-colors cursor-pointer"
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
