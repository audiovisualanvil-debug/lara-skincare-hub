import { useParams, Link } from "react-router-dom";
import { Check, Star, MessageCircle, ArrowRight, Sparkles, Droplets, Shield, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/shop/ProductCard";

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
  badges: string[];
  benefits: string[];
  actives: { name: string; description: string; icon: React.ElementType }[];
  usage: string;
  usageTip: string;
  indicatedFor: string[];
}> = {
  "1": {
    id: 1,
    name: "Sérum Clareador Intensivo",
    brand: "Tulípia",
    category: "manchas-melasma",
    categoryName: "Manchas e Melasma",
    isProfessional: false,
    shortBenefit: "Clareia manchas e uniformiza o tom da pele",
    price: "R$ 189,90",
    badges: ["Home Care", "Vegano"],
    benefits: [
      "Auxilia no clareamento e na uniformização do tom",
      "Reduz o aspecto de manchas escuras e melasma",
      "Melhora a textura e luminosidade da pele",
      "Potencializa resultados quando combinado com protetor solar"
    ],
    actives: [
      { name: "Vitamina C nanoencapsulada", description: "Ação antioxidante e iluminadora", icon: Sparkles },
      { name: "Ácido tranexâmico", description: "Reduz manchas", icon: Shield },
      { name: "Niacinamida", description: "Melhora textura e barreira cutânea", icon: Droplets },
      { name: "Ácido mandélico", description: "Clareia sem agredir", icon: Leaf },
    ],
    usage: "Aplicar sobre a pele limpa à noite, conforme orientação profissional.",
    usageTip: "Sempre usar protetor solar durante o dia.",
    indicatedFor: ["Manchas escuras", "Melasma", "Pós-acne", "Tom irregular", "Pele opaca"]
  },
  "2": {
    id: 2,
    name: "Vitamina C 20% Estabilizada",
    brand: "Tulípia",
    category: "vitamina-c",
    categoryName: "Vitamina C",
    isProfessional: false,
    shortBenefit: "Antioxidante poderoso para luminosidade",
    price: "R$ 159,90",
    badges: ["Home Care", "Sem Perfume"],
    benefits: [
      "Ação antioxidante potente contra radicais livres",
      "Promove luminosidade e viço à pele",
      "Estimula a produção de colágeno",
      "Uniformiza o tom da pele"
    ],
    actives: [
      { name: "Vitamina C 20%", description: "Alta concentração estabilizada", icon: Sparkles },
      { name: "Vitamina E", description: "Potencializa a ação antioxidante", icon: Shield },
      { name: "Ácido ferúlico", description: "Estabiliza e aumenta eficácia", icon: Droplets },
    ],
    usage: "Aplicar 3 a 4 gotas pela manhã, antes do protetor solar.",
    usageTip: "Para melhores resultados, usar diariamente.",
    indicatedFor: ["Pele sem viço", "Sinais de envelhecimento", "Tom irregular", "Prevenção de rugas"]
  },
};

// Related products
const relatedProducts: Product[] = [
  {
    id: 3,
    name: "Protetor Solar FPS 60",
    brand: "Mezzo",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Finalização essencial para qualquer rotina",
    price: "R$ 89,90",
  },
  {
    id: 4,
    name: "Gel de Limpeza Suave",
    brand: "Extratos da Terra",
    category: "limpeza",
    isProfessional: false,
    description: "Primeiro passo de toda rotina",
    price: "R$ 59,90",
  },
  {
    id: 5,
    name: "Hidratante Reparador",
    brand: "Mezzo",
    category: "hidratacao-reparacao",
    isProfessional: false,
    description: "Hidratação diária para todos os tipos de pele",
    price: "R$ 99,90",
  },
];

// Sample reviews
const reviews = [
  { name: "Ana Paula", city: "São Paulo, SP", rating: 5, text: "Minha pele clareou visivelmente em 4 semanas!" },
  { name: "Fernanda Lima", city: "Curitiba, PR", rating: 5, text: "Textura leve e resultado rápido. Amei!" },
  { name: "Juliana Santos", city: "Belo Horizonte, MG", rating: 4, text: "Excelente produto, superou minhas expectativas." },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsData[id || "1"] || productsData["1"];

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Loja", href: "/loja" },
    { label: product.categoryName, href: `/loja?categoria=${product.category}` },
    { label: product.name, href: "#" },
  ];

  return (
    <main className="pt-[104px] lg:pt-[136px] min-h-screen bg-card">
      {/* SEÇÃO 1 — HEADER DO PRODUTO */}
      <section className="bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-body text-sm">
              {breadcrumbItems.map((item, index) => (
                <li key={item.href} className="flex items-center gap-2">
                  {index > 0 && <span className="text-muted-foreground">/</span>}
                  {index === breadcrumbItems.length - 1 ? (
                    <span className="text-foreground">{item.label}</span>
                  ) : (
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Product Header - Two Columns */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left - Product Image */}
            <div className="aspect-square bg-background border border-border flex items-center justify-center shadow-soft">
              <span className="font-body text-muted-foreground">Imagem do Produto</span>
            </div>

            {/* Right - Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-widest">
                {product.brand}
              </span>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Short benefit */}
              <p className="font-body text-lg text-muted-foreground">
                {product.shortBenefit}
              </p>

              {/* Price */}
              <p className="font-display text-2xl font-bold text-foreground">
                {product.price}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <span 
                    key={badge} 
                    className="px-3 py-1 border border-primary/30 font-body text-xs text-primary uppercase tracking-wide"
                  >
                    {badge}
                  </span>
                ))}
                {product.isProfessional && (
                  <span className="px-3 py-1 bg-charcoal text-pearl font-body text-xs uppercase tracking-wide">
                    Profissional
                  </span>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button variant="gold" size="lg" asChild>
                  <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                    Comprar
                  </a>
                </Button>
                <Button variant="gold-outline" size="lg" asChild>
                  <Link to="/monte-sua-rotina">
                    Consultar rotina ideal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — BENEFÍCIOS */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Benefícios
          </h2>
          <ul className="space-y-4 max-w-2xl">
            {product.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 stroke-[2]" />
                <span className="font-body text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SEÇÃO 3 — ATIVOS PRINCIPAIS */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Ativos Principais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {product.actives.map((active) => {
              const IconComponent = active.icon;
              return (
                <div key={active.name} className="flex items-start gap-4 p-4 bg-cream border border-border">
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-primary stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground mb-1">
                      {active.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {active.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — MODO DE USO */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Modo de uso
          </h2>
          <div className="max-w-2xl space-y-4">
            <p className="font-body text-foreground">
              {product.usage}
            </p>
            <p className="font-body text-sm text-primary italic">
              Dica: {product.usageTip}
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — PARA QUEM É */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Indicado para
          </h2>
          <div className="flex flex-wrap gap-3 max-w-2xl">
            {product.indicatedFor.map((indication) => (
              <span 
                key={indication}
                className="flex items-center gap-2 px-4 py-2 bg-cream border border-border font-body text-sm text-foreground"
              >
                <Check className="w-4 h-4 text-primary stroke-[2]" />
                {indication}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — COMPLEMENTE SUA ROTINA */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Combine com
            </h2>
            <p className="font-body text-muted-foreground">
              Produtos que potencializam os resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — AVALIAÇÕES */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            O que clientes falam
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="p-6 bg-cream border border-border">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className={`w-4 h-4 ${starIndex < review.rating ? "text-primary fill-primary" : "text-border"}`} 
                    />
                  ))}
                </div>
                
                <p className="font-body text-sm text-foreground italic mb-4">
                  "{review.text}"
                </p>
                
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{review.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{review.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 8 — CTA FINAL */}
      <section className="py-16 lg:py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Precisa de ajuda para escolher?
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Receba indicação personalizada de rotina
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/monte-sua-rotina">
                Quero minha rotina
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
