import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Check, Sparkles, Droplets, Sun, Heart, Flower2, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard, { Product } from "@/components/shop/ProductCard";
import heroImage from "@/assets/hero-skincare.jpg";
import productsImage from "@/assets/products-display.jpg";
import consultationImage from "@/assets/consultation.jpg";

// Categories with icons
const categories = [
  { name: "Manchas e Melasma", slug: "manchas-melasma", icon: Sparkles },
  { name: "Acne e Oleosidade", slug: "acne-oleosidade", icon: Droplets },
  { name: "Anti-idade e Rejuvenescimento", slug: "anti-idade", icon: Heart },
  { name: "Hidratação e Reparação", slug: "hidratacao-reparacao", icon: Flower2 },
  { name: "Corpo e Estrias", slug: "corpo", icon: Sun },
  { name: "Capilar e Queda", slug: "capilar", icon: Scissors },
];

// Featured products
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Mellan Corrector | Sérum Clareador",
    brand: "Mezzo",
    category: "clareamento",
    isProfessional: false,
    description: "Sérum clareador para uniformização do tom da pele",
    price: "Consultar",
  },
  {
    id: 2,
    name: "Sérum Vitamina C",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: false,
    description: "Sérum iluminador e antioxidante com vitamina C",
    price: "Consultar",
  },
  {
    id: 3,
    name: "Skin Fill Xsome | Bioestimulador",
    brand: "Mezzo",
    category: "exossomas",
    isProfessional: true,
    description: "Bioestimulador facial com exossomas",
    price: "Consultar",
  },
  {
    id: 4,
    name: "Gel-Creme Antioleosidade",
    brand: "Extratos da Terra",
    category: "acne-oleosidade",
    isProfessional: false,
    description: "Gel-creme para controle de oleosidade",
    price: "Consultar",
  },
  {
    id: 5,
    name: "Reverse AH-10 | Sérum Anti-idade",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Sérum anti-idade com ácido hialurônico",
    price: "Consultar",
  },
  {
    id: 6,
    name: "Hidra-K | Hidratante Intensivo",
    brand: "Mezzo",
    category: "hidratacao-reparacao",
    isProfessional: false,
    description: "Hidratante intensivo para peles ressecadas",
    price: "Consultar",
  },
];

// Brands
const brands = [
  { name: "Extratos da Terra", slug: "extratos-da-terra" },
  { name: "Mezzo", slug: "mezzo" },
];

// Testimonials
const testimonials = [
  {
    name: "Ana Paula",
    city: "São Paulo, SP",
    text: "Minha pele nunca esteve tão bonita! A consultoria fez toda a diferença na escolha dos produtos.",
    image: null,
  },
  {
    name: "Fernanda Lima",
    city: "Curitiba, PR",
    text: "Produtos de qualidade e atendimento excepcional. Recomendo demais!",
    image: null,
  },
  {
    name: "Juliana Santos",
    city: "Belo Horizonte, MG",
    text: "Finalmente encontrei produtos que funcionam para minha pele sensível.",
    image: null,
  },
];

const Index = () => {
  return (
    <main className="pt-[104px] lg:pt-[136px]">
      {/* SEÇÃO 2 — BANNER PRINCIPAL (HERO) */}
      <section className="bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
            {/* Left - Model Image */}
            <div className="relative h-[300px] lg:h-auto overflow-hidden order-2 lg:order-1">
              <img 
                src={heroImage} 
                alt="Modelo com pele saudável"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right - Content + Product */}
            <div className="relative flex items-center order-1 lg:order-2">
              {/* Product background */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
                <img 
                  src={productsImage} 
                  alt="Produtos dermocosméticos"
                  className="w-full h-full object-cover opacity-20"
                />
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
      </section>

      {/* SEÇÃO 3 — CATEGORIAS POR DOR */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Cuidados para cada necessidade
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/loja?categoria=${category.slug}`}
                  className="group bg-card border border-border hover:border-primary p-6 lg:p-8 text-center transition-all duration-300 hover:shadow-luxury hover:-translate-y-1"
                >
                  <div className="w-12 h-12 mx-auto mb-4 border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                    <IconComponent className="w-5 h-5 text-primary stroke-[1.5]" />
                  </div>
                  <h3 className="font-display text-base lg:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 font-body text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver produtos
                    <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — PRODUTOS EM DESTAQUE */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Destaques
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Mais procurados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="gold-outline" size="lg" asChild>
              <Link to="/loja">
                Ver todos os produtos
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — MONTE SUA ROTINA */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Monte sua rotina de skincare
              </h2>
              <p className="font-body text-muted-foreground max-w-xl mx-auto">
                Responda algumas perguntas e descubra os produtos ideais para sua pele
              </p>
            </div>

            {/* Steps Icons */}
            <div className="flex items-center justify-center gap-4 lg:gap-8 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-primary/30 flex items-center justify-center bg-card">
                  <Droplets className="w-6 h-6 lg:w-8 lg:h-8 text-primary stroke-[1.5]" />
                </div>
                <span className="font-body text-xs mt-2 text-muted-foreground">Limpeza</span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary/40 stroke-[1.5]" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-primary/30 flex items-center justify-center bg-card">
                  <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-primary stroke-[1.5]" />
                </div>
                <span className="font-body text-xs mt-2 text-muted-foreground">Tratamento</span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary/40 stroke-[1.5]" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-primary/30 flex items-center justify-center bg-card">
                  <Sun className="w-6 h-6 lg:w-8 lg:h-8 text-primary stroke-[1.5]" />
                </div>
                <span className="font-body text-xs mt-2 text-muted-foreground">Proteção</span>
              </div>
            </div>

            <div className="text-center">
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

      {/* SEÇÃO 6 — CHAMADA CONSULTORIA */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Consultoria de pele especializada
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Atendimento personalizado para manchas, acne e rejuvenescimento
              </p>
              
              <ul className="space-y-3 py-4">
                {[
                  "Avaliação personalizada",
                  "Acompanhamento contínuo",
                  "Indicação de rotina completa",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary stroke-[2]" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button variant="gold-outline" size="lg" asChild>
                <Link to="/consultoria">
                  Quero minha avaliação
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={consultationImage} 
                  alt="Consultoria de pele"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border border-primary/30 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — MARCAS */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              Trabalhamos com marcas premium
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 mb-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/loja?marca=${brand.slug}`}
                className="font-display text-lg lg:text-2xl font-semibold text-foreground/40 hover:text-primary transition-colors"
              >
                {brand.name}
              </Link>
            ))}
          </div>
          
          <p className="text-center font-body text-sm text-muted-foreground">
            Selecione sua marca preferida e encontre seus produtos
          </p>
        </div>
      </section>

      {/* SEÇÃO 8 — DEPOIMENTOS */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              O que nossas clientes falam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className="p-6 border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <p className="font-body text-sm text-muted-foreground italic leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-display text-sm font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link 
              to="/sobre" 
              className="font-body text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Ver mais depoimentos
              <ArrowRight className="w-3 h-3 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9 — NEWSLETTER */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Receba novidades e promoções
            </h2>
            
            <form className="flex flex-col sm:flex-row gap-3 mt-6">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 h-12 font-body text-sm border-border bg-card"
              />
              <Button variant="gold" size="lg" type="submit">
                Assinar
              </Button>
            </form>
            
            <p className="font-body text-xs text-muted-foreground mt-4">
              Não enviamos spam. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
