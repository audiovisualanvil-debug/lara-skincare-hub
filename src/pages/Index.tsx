import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Check, Sparkles, Droplets, Sun, Heart, Flower2, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard, { Product } from "@/components/shop/ProductCard";
import ProfessionalBanner from "@/components/home/ProfessionalBanner";
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
    name: "Ana Paula M.",
    city: "São Paulo, SP",
    text: "Minha pele nunca esteve tão bonita! A consultoria fez toda a diferença na escolha dos produtos.",
    image: null,
  },
  {
    name: "Fernanda L.",
    city: "Curitiba, PR",
    text: "Produtos de qualidade e atendimento excepcional. Recomendo demais!",
    image: null,
  },
  {
    name: "Juliana S.",
    city: "Belo Horizonte, MG",
    text: "Finalmente encontrei produtos que funcionam para minha pele sensível.",
    image: null,
  },
];

const Index = () => {
  return (
    <main className="pt-[104px] lg:pt-[136px]">
      {/* Professional Banner */}
      <ProfessionalBanner />
      {/* HERO - Editorial Luxo */}
      <section className="relative bg-noir overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modelo com pele saudável"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/70 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="container-editorial relative z-10">
          <div className="max-w-2xl py-20 lg:py-0">
            {/* Eyebrow */}
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold mb-8">
              Dermocosméticos Premium
            </span>
            
            {/* Headline */}
            <h1 className="text-display-sm md:text-display lg:text-display-lg text-ivory mb-8">
              Resultados visíveis.
              <br />
              <span className="text-gold">Pele transformada.</span>
            </h1>
            
            {/* Divider */}
            <div className="divider-luxo mb-8" />
            
            {/* Description */}
            <p className="font-body text-lg lg:text-xl text-ivory/70 leading-relaxed max-w-lg mb-10">
              Consultoria especializada e produtos de alta performance para tratamentos personalizados.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="xl" asChild className="group">
                <Link to="/loja">
                  Explorar Produtos
                  <ArrowRight className="w-5 h-5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" asChild className="text-ivory border border-ivory/20 hover:bg-ivory/10 hover:text-ivory">
                <Link to="/monte-sua-rotina">
                  Monte sua Rotina
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS - Editorial Luxo Grid */}
      <section className="section-editorial bg-background">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold mb-4">
              Tratamentos
            </span>
            <h2 className="text-display-sm md:text-display text-foreground">
              Cuidados Personalizados
            </h2>
            <div className="divider-luxo mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/loja?categoria=${category.slug}`}
                  className="group relative bg-card border border-border hover:border-gold/40 p-8 lg:p-12 text-center transition-all duration-500 hover:shadow-luxury hover:-translate-y-2"
                >
                  <div className="w-14 h-14 mx-auto mb-6 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500">
                    <IconComponent className="w-6 h-6 text-gold stroke-[1.5]" />
                  </div>
                  <h3 className="font-display text-lg lg:text-xl text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 font-body text-xs tracking-wide uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explorar
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE - Editorial Luxo */}
      <section className="section-editorial bg-champagne">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold mb-4">
                Curadoria
              </span>
              <h2 className="text-display-sm md:text-display text-foreground">
                Mais Procurados
              </h2>
            </div>
            <Link 
              to="/loja" 
              className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-foreground hover:text-gold transition-colors editorial-underline"
            >
              Ver Coleção Completa
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* MONTE SUA ROTINA - Editorial Luxo */}
      <section className="section-editorial bg-noir relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img 
            src={productsImage} 
            alt="Produtos dermocosméticos Multti Med"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold mb-6">
              Rotina Personalizada
            </span>
            <h2 className="text-display-sm md:text-display text-ivory mb-8">
              Monte sua Rotina de Skincare
            </h2>
            <div className="divider-luxo mx-auto mb-8" />
            <p className="font-body text-lg text-ivory/60 max-w-xl mx-auto mb-12">
              Responda algumas perguntas e descubra os produtos ideais para transformar sua pele.
            </p>

            {/* Steps */}
            <div className="flex items-center justify-center gap-6 lg:gap-12 mb-14">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 border border-gold/40 flex items-center justify-center bg-ivory/5 backdrop-blur-sm">
                  <Droplets className="w-8 h-8 lg:w-10 lg:h-10 text-gold stroke-[1]" />
                </div>
                <span className="font-body text-xs tracking-wide uppercase mt-4 text-ivory/50">Limpeza</span>
              </div>
              <div className="w-12 h-px bg-gold/30" />
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 border border-gold/40 flex items-center justify-center bg-ivory/5 backdrop-blur-sm">
                  <Sparkles className="w-8 h-8 lg:w-10 lg:h-10 text-gold stroke-[1]" />
                </div>
                <span className="font-body text-xs tracking-wide uppercase mt-4 text-ivory/50">Tratamento</span>
              </div>
              <div className="w-12 h-px bg-gold/30" />
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 border border-gold/40 flex items-center justify-center bg-ivory/5 backdrop-blur-sm">
                  <Sun className="w-8 h-8 lg:w-10 lg:h-10 text-gold stroke-[1]" />
                </div>
                <span className="font-body text-xs tracking-wide uppercase mt-4 text-ivory/50">Proteção</span>
              </div>
            </div>

            <Button variant="gold" size="xl" asChild className="group">
              <Link to="/monte-sua-rotina">
                Iniciar Diagnóstico
                <ArrowRight className="w-5 h-5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CONSULTORIA - Editorial Luxo */}
      <section className="section-editorial bg-background">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold">
                Especialistas
              </span>
              <h2 className="text-display-sm md:text-display text-foreground">
                Consultoria de Pele Especializada
              </h2>
              <div className="divider-luxo" />
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Atendimento personalizado para manchas, acne e rejuvenescimento. Resultados comprovados com acompanhamento contínuo.
              </p>
              
              <ul className="space-y-4 py-4">
                {[
                  "Avaliação personalizada",
                  "Acompanhamento contínuo",
                  "Indicação de rotina completa",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 font-body text-foreground">
                    <div className="w-6 h-6 border border-gold/50 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-gold stroke-[2.5]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button variant="gold-outline" size="xl" asChild className="group">
                <Link to="/consultoria">
                  Agendar Avaliação
                  <ArrowRight className="w-5 h-5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] overflow-hidden img-editorial">
                <img 
                  src={consultationImage} 
                  alt="Consultoria de pele"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* MARCAS - Editorial Luxo */}
      <section className="section-editorial-sm bg-champagne">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold mb-4">
              Parceiros
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              Marcas Premium Selecionadas
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/loja?marca=${brand.slug}`}
                className="font-display text-xl lg:text-3xl text-foreground/30 hover:text-gold transition-colors duration-500"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS - Editorial Luxo */}
      <section className="section-editorial bg-background">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold mb-4">
              Histórias
            </span>
            <h2 className="text-display-sm md:text-display text-foreground">
              O Que Dizem Nossas Clientes
            </h2>
            <div className="divider-luxo mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className="p-8 lg:p-10 border border-border bg-card hover:border-gold/30 transition-all duration-500 hover:shadow-luxury"
              >
                <p className="font-display text-lg lg:text-xl text-foreground italic leading-relaxed mb-8">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center">
                    <span className="font-display text-lg text-gold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground tracking-wide">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER - Editorial Luxo */}
      <section className="section-editorial-sm bg-noir">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] uppercase text-gold mb-6">
              Exclusivo
            </span>
            <h2 className="text-display-sm text-ivory mb-6">
              Receba Novidades e Ofertas Exclusivas
            </h2>
            <div className="divider-luxo mx-auto mb-8" />
            
            <form className="flex flex-col sm:flex-row gap-4 mt-10">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 h-14 font-body text-base border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40 focus-visible:ring-gold focus-visible:border-gold"
              />
              <Button variant="gold" size="xl" type="submit">
                Inscrever-se
              </Button>
            </form>
            
            <p className="font-body text-xs text-ivory/40 mt-6 tracking-wide">
              Não enviamos spam. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
