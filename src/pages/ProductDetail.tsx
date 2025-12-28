import { useParams, Link } from "react-router-dom";
import { Check, Star, MessageCircle, ArrowRight, Sparkles, Droplets, Shield, Leaf, ChevronRight, Minus, Plus, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCardNew from "@/components/shop/ProductCardNew";

// Sample product data - would come from database/API
const productsData: Record<string, {
  id: number;
  name: string;
  brand: string;
  category: string;
  categoryName: string;
  isProfessional: boolean;
  shortBenefit: string;
  price: string;
  originalPrice?: string;
  badges: string[];
  benefits: string[];
  actives: { name: string; description: string; icon: React.ElementType }[];
  usage: string[];
  usageTip: string;
  indicatedFor: string[];
  results: string[];
  images: string[];
}> = {
  "1": {
    id: 1,
    name: "Mellan Corrector | Sérum Clareador",
    brand: "Mezzo",
    category: "clareamento",
    categoryName: "Clareamento",
    isProfessional: false,
    shortBenefit: "Clareia manchas e uniformiza o tom da pele",
    price: "Consultar",
    badges: ["Home Care", "Vegano", "Cruelty Free"],
    benefits: [
      "Auxilia no clareamento e na uniformização do tom",
      "Reduz o aspecto de manchas escuras e melasma",
      "Melhora a textura e luminosidade da pele",
      "Potencializa resultados quando combinado com protetor solar"
    ],
    actives: [
      { name: "Vitamina C", description: "Ação antioxidante potente e iluminadora", icon: Sparkles },
      { name: "Ácido Tranexâmico", description: "Inibe a produção de melanina, reduzindo manchas existentes", icon: Shield },
      { name: "Niacinamida", description: "Melhora textura, fortalece a barreira cutânea e uniformiza o tom", icon: Droplets },
      { name: "Ácido Mandélico", description: "Esfolia suavemente sem agredir, promove renovação celular", icon: Leaf },
    ],
    usage: [
      "Higienize a pele com seu limpador habitual",
      "Aplique o tônico e aguarde secar",
      "Aplique 3 a 4 gotas do sérum no rosto e pescoço",
      "Espalhe com movimentos suaves até completa absorção",
      "Finalize com protetor solar durante o dia"
    ],
    usageTip: "Para melhores resultados, use preferencialmente à noite e sempre complemente com protetor solar FPS 50+ durante o dia.",
    indicatedFor: ["Manchas escuras", "Melasma", "Pós-acne", "Tom irregular", "Pele opaca", "Sardas"],
    results: [
      "Clareamento visível em 4 semanas de uso contínuo",
      "Pele mais luminosa e uniforme",
      "Redução de manchas em até 70%",
      "Textura mais lisa e radiante"
    ],
    images: []
  },
  "2": {
    id: 2,
    name: "Sérum Vitamina C",
    brand: "Extratos da Terra",
    category: "clareamento",
    categoryName: "Clareamento",
    isProfessional: false,
    shortBenefit: "Antioxidante poderoso para luminosidade e proteção",
    price: "Consultar",
    badges: ["Home Care", "Sem Perfume"],
    benefits: [
      "Ação antioxidante potente contra radicais livres",
      "Promove luminosidade e viço à pele",
      "Estimula a produção de colágeno",
      "Uniformiza o tom da pele"
    ],
    actives: [
      { name: "Vitamina C", description: "Alta concentração estabilizada para máxima eficácia", icon: Sparkles },
      { name: "Vitamina E", description: "Potencializa a ação antioxidante e protege a pele", icon: Shield },
      { name: "Ácido Ferúlico", description: "Estabiliza a Vitamina C e aumenta sua eficácia", icon: Droplets },
    ],
    usage: [
      "Aplique pela manhã na pele limpa",
      "Use 3 a 4 gotas no rosto, pescoço e colo",
      "Aguarde a absorção completa",
      "Finalize sempre com protetor solar"
    ],
    usageTip: "Para melhores resultados, usar diariamente pela manhã.",
    indicatedFor: ["Pele sem viço", "Sinais de envelhecimento", "Tom irregular", "Prevenção de rugas"],
    results: [
      "Pele mais luminosa desde a primeira semana",
      "Redução de linhas finas em 8 semanas",
      "Proteção antioxidante diária",
      "Tom mais uniforme e radiante"
    ],
    images: []
  },
};

// Related products
const relatedProducts = [
  {
    id: 3,
    name: "Protetor Solar FPS 60 Toque Seco",
    brand: "Mezzo",
    price: "R$ 89,90",
  },
  {
    id: 4,
    name: "Gel de Limpeza Suave",
    brand: "Extratos da Terra",
    price: "R$ 59,90",
  },
  {
    id: 5,
    name: "Hidratante Reparador Intensivo",
    brand: "Mezzo",
    price: "R$ 99,90",
  },
  {
    id: 6,
    name: "Sérum Niacinamida",
    brand: "Extratos da Terra",
    price: "Consultar",
  },
];

// Sample reviews
const reviews = [
  { 
    name: "Ana Paula M.", 
    city: "São Paulo, SP", 
    rating: 5, 
    text: "Minha pele clareou visivelmente em 4 semanas! As manchas do melasma reduziram bastante e a textura ficou muito mais uniforme.",
    date: "12/12/2024",
    verified: true
  },
  { 
    name: "Fernanda L.", 
    city: "Curitiba, PR", 
    rating: 5, 
    text: "Textura leve, absorve super rápido e não deixa a pele oleosa. Resultado visível desde a segunda semana de uso.",
    date: "28/11/2024",
    verified: true
  },
  { 
    name: "Juliana S.", 
    city: "Belo Horizonte, MG", 
    rating: 4, 
    text: "Excelente produto! Superou minhas expectativas. Uso junto com o protetor solar e os resultados são incríveis.",
    date: "15/11/2024",
    verified: true
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsData[id || "1"] || productsData["1"];
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <main className="pt-[140px] lg:pt-[160px] min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-detail/30">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/loja" className="hover:text-primary transition-colors">Loja</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/loja?categoria=${product.category}`} className="hover:text-primary transition-colors">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="py-8 lg:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left - Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-cream border border-detail/30 flex items-center justify-center overflow-hidden">
                <span className="font-body text-muted-foreground">Imagem do Produto</span>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-cream border flex items-center justify-center transition-all ${
                      selectedImage === index 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-detail/30 hover:border-primary/50"
                    }`}
                  >
                    <span className="font-body text-xs text-muted-foreground">{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="lg:pl-4">
              {/* Brand */}
              <span className="inline-block font-body text-xs font-medium text-primary uppercase tracking-widest mb-3">
                {product.brand}
              </span>

              {/* Title */}
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
                {product.name}
              </h1>

              {/* Short benefit */}
              <p className="font-body text-base text-muted-foreground mb-6 leading-relaxed">
                {product.shortBenefit}
              </p>

              {/* Rating Summary */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">
                  4.9 ({reviews.length} avaliações)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.originalPrice && (
                  <p className="font-body text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </p>
                )}
                <p className="font-display text-3xl font-semibold text-foreground">
                  {product.price}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  ou 3x de R$ 63,30 sem juros
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.badges.map((badge) => (
                  <span 
                    key={badge} 
                    className="px-3 py-1.5 bg-cream border border-detail/50 font-body text-xs text-foreground"
                  >
                    {badge}
                  </span>
                ))}
                {product.isProfessional && (
                  <span className="px-3 py-1.5 bg-foreground text-background font-body text-xs uppercase tracking-wide">
                    Profissional
                  </span>
                )}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center border border-detail">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-cream transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-body">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-cream transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <Button variant="gold" size="lg" className="flex-1" asChild>
                  <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    Comprar via WhatsApp
                  </a>
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-4 mb-8">
                <button className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-4 h-4" />
                  Adicionar à Lista
                </button>
                <button className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>

              {/* Quick Benefits */}
              <div className="p-6 bg-cream border border-detail/30">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                  Por que escolher este produto?
                </h3>
                <ul className="space-y-3">
                  {product.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 lg:py-16 bg-cream border-y border-detail/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="resultados" className="w-full">
            <TabsList className="w-full justify-start border-b border-detail/50 bg-transparent h-auto p-0 mb-8 overflow-x-auto">
              <TabsTrigger 
                value="resultados" 
                className="font-display text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent"
              >
                Resultados
              </TabsTrigger>
              <TabsTrigger 
                value="ativos" 
                className="font-display text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent"
              >
                Ativos Principais
              </TabsTrigger>
              <TabsTrigger 
                value="modo-uso" 
                className="font-display text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent"
              >
                Modo de Uso
              </TabsTrigger>
              <TabsTrigger 
                value="indicacoes" 
                className="font-display text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent"
              >
                Indicações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resultados" className="mt-0">
              <div className="max-w-3xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Resultados Esperados
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.results.map((result, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-background border border-detail/30">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-body text-foreground">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ativos" className="mt-0">
              <div className="max-w-3xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Ativos Principais
                </h3>
                <div className="space-y-4">
                  {product.actives.map((active) => {
                    const IconComponent = active.icon;
                    return (
                      <div key={active.name} className="flex items-start gap-4 p-5 bg-background border border-detail/30">
                        <div className="w-12 h-12 bg-cream border border-primary/20 flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-display text-base font-semibold text-foreground mb-1">
                            {active.name}
                          </h4>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed">
                            {active.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="modo-uso" className="mt-0">
              <div className="max-w-3xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Modo de Uso
                </h3>
                <ol className="space-y-4 mb-8">
                  {product.usage.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-8 h-8 bg-primary text-background font-display text-sm font-semibold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-body text-foreground pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20">
                  <p className="font-body text-sm text-foreground">
                    <strong className="text-primary">Dica:</strong> {product.usageTip}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="indicacoes" className="mt-0">
              <div className="max-w-3xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Indicado Para
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.indicatedFor.map((indication) => (
                    <span 
                      key={indication}
                      className="flex items-center gap-2 px-4 py-2 bg-background border border-detail/30 font-body text-sm text-foreground"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      {indication}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Complete sua Rotina
            </h2>
            <Link 
              to="/loja" 
              className="hidden sm:flex items-center gap-2 font-body text-sm text-primary hover:underline"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCardNew key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 lg:py-16 bg-cream border-t border-detail/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Avaliações de Clientes
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <span className="font-body text-muted-foreground">
                  4.9 baseado em {reviews.length} avaliações
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review, i) => (
                <div key={i} className="p-6 bg-background border border-detail/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-body text-sm font-medium text-foreground">{review.name}</p>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary font-body text-xs">
                            <Check className="w-3 h-3" />
                            Compra verificada
                          </span>
                        )}
                      </div>
                      <p className="font-body text-xs text-muted-foreground">{review.city}</p>
                    </div>
                    <span className="font-body text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className={`w-4 h-4 ${starIndex < review.rating ? "text-primary fill-primary" : "text-detail"}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-20 bg-background border-t border-detail/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Precisa de ajuda para escolher?
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Receba uma indicação personalizada de rotina para sua pele
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="gold" size="lg" asChild>
                <Link to="/monte-sua-rotina">
                  Monte sua Rotina
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="gold-outline" size="lg" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Falar com especialista
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
