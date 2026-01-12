import { useParams, Link } from "react-router-dom";
import { Check, Star, MessageCircle, ArrowRight, Sparkles, Droplets, Shield, Leaf, ChevronRight, Minus, Plus, Heart, Share2, ShoppingCart, Scale, Play, Pause } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCardNew from "@/components/shop/ProductCardNew";
import ProductReviews from "@/components/shop/ProductReviews";
import RecentlyViewedSection from "@/components/shop/RecentlyViewedSection";
import PromoBannerCarousel from "@/components/shop/PromoBannerCarousel";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";
import { allTulipiaWithImages } from "@/data/tulipiaProductsWithImages";
import { allSmartGRWithImages } from "@/data/smartGRProducts";
import { getBannersForBrand } from "@/data/promoBanners";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { toast } from "sonner";

// Merge all products
const allProducts = [...allMezzoWithImages, ...allExtratosWithImages, ...allTulipiaWithImages, ...allSmartGRWithImages];

// Category name mapping
const categoryNames: Record<string, string> = {
  "exossomas": "Exossomas",
  "fotoprotetor": "Fotoprotetores",
  "capilar": "Linha Capilar",
  "home-care": "Home Care",
  "limpeza": "Limpeza",
  "vitamina-c": "Vitamina C",
  "esfoliacao": "Esfoliação",
  "mascaras": "Máscaras",
  "hidratacao": "Hidratação",
  "peeling": "Peelings Ácidos",
  "acnediol": "Tratamento Acne",
  "nutraceuticos": "Nutracêuticos",
  "corpo": "Linha Corpo",
  "niacinamida": "Niacinamida",
  "higienizacao": "Higienização",
  "acido-hialuronico": "Ácido Hialurônico",
  "esfoliante": "Esfoliantes",
  "peles-sensiveis": "Peles Sensíveis",
  "clareamento": "Clareamento",
  "oleosidade": "Controle de Oleosidade",
  "acne": "Tratamento Acne",
  "antiage": "Anti-idade",
};

// Default product info for tabs
const getDefaultProductInfo = (category: string) => ({
  benefits: [
    "Formulação dermatológica avançada",
    "Testado dermatologicamente",
    "Alta concentração de ativos",
    "Resultados visíveis com uso contínuo"
  ],
  actives: [
    { name: "Ativos Biotecnológicos", description: "Tecnologia de ponta para máxima eficácia", icon: Sparkles },
    { name: "Hidratação Profunda", description: "Mantém a pele nutrida e protegida", icon: Droplets },
    { name: "Proteção Cutânea", description: "Fortalece a barreira natural da pele", icon: Shield },
    { name: "Ingredientes Naturais", description: "Formulação com ativos da natureza", icon: Leaf },
  ],
  usage: [
    "Higienize a pele com seu limpador habitual",
    "Aplique o produto na área desejada",
    "Massageie suavemente até completa absorção",
    "Use conforme orientação profissional"
  ],
  usageTip: "Para melhores resultados, use diariamente e complemente com protetor solar.",
  indicatedFor: ["Todos os tipos de pele", "Uso profissional e home care"],
  results: [
    "Pele mais saudável e equilibrada",
    "Resultados visíveis com uso contínuo",
    "Melhora na textura e aparência",
    "Hidratação duradoura"
  ],
});

// Sample reviews
const reviews = [
  { 
    name: "Ana Paula M.", 
    city: "São Paulo, SP", 
    rating: 5, 
    text: "Produto incrível! Minha pele melhorou visivelmente em poucas semanas. Textura leve e absorção rápida.",
    date: "12/12/2024",
    verified: true
  },
  { 
    name: "Fernanda L.", 
    city: "Curitiba, PR", 
    rating: 5, 
    text: "Superou minhas expectativas. Uso diariamente e os resultados são visíveis. Recomendo!",
    date: "28/11/2024",
    verified: true
  },
  { 
    name: "Juliana S.", 
    city: "Belo Horizonte, MG", 
    rating: 4, 
    text: "Excelente produto! Qualidade profissional para uso em casa. Vale o investimento.",
    date: "15/11/2024",
    verified: true
  },
];

// Helper to extract numeric price from string
const extractPrice = (priceStr?: string): number | null => {
  if (!priceStr || priceStr === "Consultar") return null;
  const match = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(match) || null;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { recentProducts, addToRecentlyViewed, getRecentlyViewed } = useRecentlyViewed();

  // Find the product from our real data
  const product = useMemo(() => {
    const productId = parseInt(id || "0");
    return allProducts.find(p => p.id === productId);
  }, [id]);

  // Build gallery array: main image + gallery images
  const allImages = useMemo(() => {
    if (!product) return [];
    const gallery = (product as any).gallery as string[] | undefined;
    return [product.image, ...(gallery || [])].filter(Boolean) as string[];
  }, [product]);

  // Get product video if available
  const productVideo = useMemo(() => {
    if (!product) return null;
    return (product as any).video as string | undefined;
  }, [product]);

  // Get related products from the same brand
  const relatedProducts = useMemo(() => {
    if (!product) return allProducts.slice(0, 4);
    return allProducts
      .filter(p => p.brand === product.brand && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Get default info based on category
  const productInfo = useMemo(() => {
    return getDefaultProductInfo(product?.category || "");
  }, [product]);

  // Add to recently viewed when product changes
  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
      });
    }
  }, [product, addToRecentlyViewed]);

  // Get recently viewed products (excluding current)
  const recentlyViewedProducts = useMemo(() => {
    return getRecentlyViewed(product?.id, 4);
  }, [getRecentlyViewed, product?.id, recentProducts]);

  // If product not found, show message
  if (!product) {
    return (
      <main className="pt-[140px] lg:pt-[160px] min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground mb-4">
            Produto não encontrado
          </h1>
          <p className="font-body text-muted-foreground mb-8">
            O produto que você procura não está disponível.
          </p>
          <Button variant="gold" asChild>
            <Link to="/loja">Ver todos os produtos</Link>
          </Button>
        </div>
      </main>
    );
  }

  const categoryName = categoryNames[product.category || ""] || product.category || "Produtos";

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
              {categoryName}
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
              {/* Main Image or Video */}
              <div className="aspect-square bg-cream border border-detail/30 flex items-center justify-center overflow-hidden rounded-lg relative">
                {showVideo && productVideo ? (
                  <>
                    <video 
                      ref={videoRef}
                      src={productVideo}
                      className="w-full h-full object-cover"
                      loop
                      playsInline
                      muted
                      autoPlay
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    />
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          if (isVideoPlaying) {
                            videoRef.current.pause();
                          } else {
                            videoRef.current.play();
                          }
                        }
                      }}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                  </>
                ) : (
                  <img 
                    src={allImages[selectedImage] || product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {/* All images from gallery */}
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setShowVideo(false); }}
                    className={`w-20 h-20 shrink-0 bg-cream border flex items-center justify-center transition-all overflow-hidden rounded ${
                      selectedImage === idx && !showVideo
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-detail/30 hover:border-primary/50"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - imagem ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

                {/* Video thumbnail */}
                {productVideo && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className={`w-20 h-20 shrink-0 bg-black border flex items-center justify-center transition-all overflow-hidden rounded relative ${
                      showVideo
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-detail/30 hover:border-primary/50"
                    }`}
                  >
                    <Play className="w-8 h-8 text-white" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white font-medium">Vídeo</span>
                  </button>
                )}
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

              {/* Description */}
              {product.description && (
                <p className="font-body text-base text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>
              )}

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
                <p className="font-display text-3xl font-semibold text-foreground">
                  {product.price || "Consultar"}
                </p>
                {product.price && product.price !== "Consultar" && (
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    ou 3x sem juros
                  </p>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 bg-cream border border-detail/50 font-body text-xs text-foreground">
                  {product.brand}
                </span>
                {product.isProfessional && (
                  <span className="px-3 py-1.5 bg-foreground text-background font-body text-xs uppercase tracking-wide">
                    Profissional
                  </span>
                )}
                <span className="px-3 py-1.5 bg-cream border border-detail/50 font-body text-xs text-foreground">
                  {categoryName}
                </span>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center border border-detail rounded">
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
                
                <Button 
                  variant="gold" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    const price = extractPrice(product.price);
                    if (price === null) {
                      toast.error("Este produto não está disponível para compra online. Entre em contato para consultar.");
                      return;
                    }
                    addItem({
                      id: product.id,
                      name: product.name,
                      brand: product.brand,
                      price: price,
                      image: product.image,
                    }, quantity);
                    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar ao Carrinho
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => {
                    toggleFavorite({
                      id: product.id,
                      name: product.name,
                      brand: product.brand,
                      price: product.price,
                      image: product.image,
                    });
                    if (isFavorite(product.id)) {
                      toast.success("Removido dos favoritos");
                    } else {
                      toast.success("Adicionado aos favoritos!");
                    }
                  }}
                  className={`flex items-center gap-2 font-body text-sm transition-colors ${
                    isFavorite(product.id) 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                  {isFavorite(product.id) ? "Nos Favoritos" : "Adicionar aos Favoritos"}
                </button>
                <button className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>

              {/* Quick Benefits */}
              <div className="p-6 bg-cream border border-detail/30 rounded-lg">
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                  Por que escolher este produto?
                </h3>
                <ul className="space-y-3">
                  {productInfo.benefits.slice(0, 3).map((benefit, i) => (
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
                  {productInfo.results.map((result, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-background border border-detail/30 rounded-lg">
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
                  {productInfo.actives.map((active) => {
                    const IconComponent = active.icon;
                    return (
                      <div key={active.name} className="flex items-start gap-4 p-5 bg-background border border-detail/30 rounded-lg">
                        <div className="w-12 h-12 bg-cream border border-primary/20 flex items-center justify-center shrink-0 rounded">
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
                  {productInfo.usage.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-8 h-8 bg-primary text-background font-display text-sm font-semibold flex items-center justify-center shrink-0 rounded">
                        {i + 1}
                      </span>
                      <span className="font-body text-foreground pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="font-body text-sm text-foreground">
                    <strong className="text-primary">Dica:</strong> {productInfo.usageTip}
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
                  {productInfo.indicatedFor.map((indication) => (
                    <span 
                      key={indication}
                      className="flex items-center gap-2 px-4 py-2 bg-background border border-detail/30 font-body text-sm text-foreground rounded-lg"
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

      {/* Promo Banners Carousel */}
      <section className="py-12 lg:py-16 bg-cream/50 border-t border-detail/20">
        <div className="container mx-auto px-4 lg:px-8">
          <PromoBannerCarousel 
            banners={getBannersForBrand(product.brand)} 
            title="Explore Linhas Recomendadas"
          />
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

      {/* Recently Viewed Section */}
      {recentlyViewedProducts.length > 0 && (
        <RecentlyViewedSection 
          products={recentlyViewedProducts} 
          currentProductId={product.id} 
        />
      )}

      {/* Reviews Section */}
      <section className="py-12 lg:py-16 bg-cream border-t border-detail/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
              Avaliações de Clientes
            </h2>
            <ProductReviews productId={product.id} />
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
