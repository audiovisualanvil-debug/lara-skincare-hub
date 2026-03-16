import SEOHead from "@/components/seo/SEOHead";
import ProductJsonLd from "@/components/seo/ProductJsonLd";
import { useParams, Link } from "react-router-dom";
import { Check, Star, MessageCircle, ArrowRight, Sparkles, Droplets, Shield, Leaf, ChevronRight, Minus, Plus, Heart, Share2, ShoppingCart, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCardNew from "@/components/shop/ProductCardNew";
import ProductReviews from "@/components/shop/ProductReviews";
import RecentlyViewedSection from "@/components/shop/RecentlyViewedSection";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useProductReviews } from "@/hooks/useProductReviews";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  short_description: string | null;
  category: string | null;
  subcategory: string | null;
  image_url: string | null;
  images: string[] | null;
  benefits: string[] | null;
  ingredients: string | null;
  how_to_use: string | null;
  tags: string[] | null;
  is_new: boolean;
  is_promotion: boolean;
  stock: number;
  sku: string | null;
}

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

const getDefaultProductInfo = () => ({
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

const formatPrice = (price: number) => {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<DbProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { recentProducts, addToRecentlyViewed, getRecentlyViewed } = useRecentlyViewed();

  // Fetch product from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);

      // Try by UUID first, then by slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

      let query = supabase.from("products").select("*");
      if (isUuid) {
        query = query.eq("id", id);
      } else {
        // Try slug match, or numeric ID in slug
        query = query.or(`slug.eq.${id},slug.ilike.%-${id}`);
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setProduct(data);

        // Fetch related products from same brand
        const { data: related } = await supabase
          .from("products")
          .select("*")
          .eq("brand", data.brand)
          .neq("id", data.id)
          .eq("is_active", true)
          .limit(4);

        setRelatedProducts(related || []);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Add to recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: formatPrice(product.price),
        image: product.image_url || undefined,
      });
    }
  }, [product]);

  const allImages = useMemo(() => {
    if (!product) return [];
    return [product.image_url, ...(product.images || [])].filter(Boolean) as string[];
  }, [product]);

  const recentlyViewedProducts = useMemo(() => {
    return getRecentlyViewed(product?.id, 4);
  }, [getRecentlyViewed, product?.id, recentProducts]);

  const productInfo = useMemo(() => {
    if (!product) return getDefaultProductInfo();
    const info = getDefaultProductInfo();
    // Use DB benefits if available
    if (product.benefits && product.benefits.length > 0) {
      info.benefits = product.benefits;
    }
    // Use DB how_to_use if available
    if (product.how_to_use) {
      info.usage = product.how_to_use.split("\n").filter(Boolean);
    }
    return info;
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <MainHeader />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <MainFooter />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <MainHeader />
        <main className="flex-1 pt-32 md:pt-40">
          <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
            <h1 className="font-display text-2xl font-semibold text-foreground mb-4">
              Produto não encontrado
            </h1>
            <p className="text-muted-foreground mb-8">
              O produto que você procura não está disponível.
            </p>
            <Button asChild>
              <Link to="/loja">Ver todos os produtos</Link>
            </Button>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }

  const categoryName = categoryNames[product.category || ""] || product.category || "Produtos";
  const priceFormatted = formatPrice(product.price);
  const isProfessional = product.tags?.includes("profissional");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={`${product.name} | Multti Med`}
        description={product.short_description || product.description || `${product.name} - Dermocosmético ${product.brand} disponível na Multti Med Porto Alegre.`}
        canonical={`/produto/${product.slug}`}
        ogImage={product.image_url || undefined}
      />
      <ProductJsonLd
        name={product.name}
        description={product.short_description || product.description || product.name}
        image={product.image_url || ""}
        price={product.price}
        brand={product.brand}
        sku={product.sku}
        inStock={product.stock > 0}
      />
      <MainHeader />

      <main className="flex-1 pt-28 md:pt-32">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/loja" className="hover:text-primary transition-colors">Loja</Link>
              <ChevronRight className="w-3 h-3" />
              {product.category && (
                <>
                  <Link to={`/loja?categoria=${product.category}`} className="hover:text-primary transition-colors">
                    {categoryName}
                  </Link>
                  <ChevronRight className="w-3 h-3" />
                </>
              )}
              <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Hero */}
        <section className="py-8 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-muted/30 border border-border flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={allImages[selectedImage] || product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                {allImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-20 h-20 shrink-0 bg-muted/30 border flex items-center justify-center overflow-hidden rounded-lg transition-all ${
                          selectedImage === idx
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <img src={img} alt={`${product.name} - ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="lg:pl-4">
                <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-3">
                  {product.brand}
                </span>

                <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
                  {product.name}
                </h1>

                {product.short_description && (
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    {product.short_description}
                  </p>
                )}

                {/* Rating summary from DB */}
                <ProductRatingSummary productId={product.id} />

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <p className="font-display text-3xl font-semibold text-foreground">
                      {priceFormatted}
                    </p>
                    {product.compare_at_price && product.compare_at_price > product.price && (
                      <p className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.compare_at_price)}
                      </p>
                    )}
                  </div>
                  {product.price > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ou 3x de {formatPrice(product.price / 3)} sem juros
                    </p>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1.5 bg-muted/50 border border-border text-xs text-foreground rounded-md">
                    {product.brand}
                  </span>
                  {isProfessional && (
                    <span className="px-3 py-1.5 bg-foreground text-background text-xs uppercase tracking-wide rounded-md">
                      Profissional
                    </span>
                  )}
                  {product.is_new && (
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs uppercase tracking-wide rounded-md">
                      Novo
                    </span>
                  )}
                  {product.is_promotion && (
                    <span className="px-3 py-1.5 bg-destructive text-destructive-foreground text-xs uppercase tracking-wide rounded-md">
                      Promoção
                    </span>
                  )}
                  <span className="px-3 py-1.5 bg-muted/50 border border-border text-xs text-foreground rounded-md">
                    {categoryName}
                  </span>
                </div>

                {/* Quantity + Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted/50 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted/50 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      addItem({
                        id: product.id,
                        name: product.name,
                        brand: product.brand,
                        price: product.price,
                        image: product.image_url || undefined,
                      }, quantity);
                      toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock > 0 ? "Adicionar ao Carrinho" : "Produto Indisponível"}
                  </Button>
                </div>

                {/* Secondary actions */}
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => {
                      toggleFavorite({
                        id: product.id,
                        name: product.name,
                        brand: product.brand,
                        price: priceFormatted,
                        image: product.image_url || undefined,
                      });
                      toast.success(isFavorite(product.id) ? "Removido dos favoritos" : "Adicionado aos favoritos!");
                    }}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      isFavorite(product.id) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                    {isFavorite(product.id) ? "Nos Favoritos" : "Favoritar"}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copiado!");
                    }}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </button>
                </div>

                {/* Quick Benefits */}
                <div className="p-6 bg-muted/30 border border-border rounded-xl">
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    Por que escolher este produto?
                  </h3>
                  <ul className="space-y-3">
                    {productInfo.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description & Details Tabs */}
        {(product.description || product.ingredients || product.how_to_use) && (
          <section className="py-12 lg:py-16 bg-muted/20 border-y border-border">
            <div className="container mx-auto px-4 lg:px-8">
              <Tabs defaultValue="descricao" className="w-full">
                <TabsList className="w-full justify-start border-b border-border bg-transparent h-auto p-0 mb-8 overflow-x-auto">
                  {product.description && (
                    <TabsTrigger value="descricao" className="text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent">
                      Descrição
                    </TabsTrigger>
                  )}
                  {product.ingredients && (
                    <TabsTrigger value="ingredientes" className="text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent">
                      Ingredientes
                    </TabsTrigger>
                  )}
                  {product.how_to_use && (
                    <TabsTrigger value="modo-uso" className="text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent">
                      Modo de Uso
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="resultados" className="text-sm font-medium px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent">
                    Resultados
                  </TabsTrigger>
                </TabsList>

                {product.description && (
                  <TabsContent value="descricao" className="mt-0">
                    <div className="max-w-3xl prose prose-sm text-foreground/80 whitespace-pre-line">
                      {product.description}
                    </div>
                  </TabsContent>
                )}

                {product.ingredients && (
                  <TabsContent value="ingredientes" className="mt-0">
                    <div className="max-w-3xl">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">Ingredientes</h3>
                      <p className="text-sm text-foreground/80 leading-relaxed">{product.ingredients}</p>
                    </div>
                  </TabsContent>
                )}

                {product.how_to_use && (
                  <TabsContent value="modo-uso" className="mt-0">
                    <div className="max-w-3xl">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">Modo de Uso</h3>
                      <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                        {product.how_to_use}
                      </div>
                    </div>
                  </TabsContent>
                )}

                <TabsContent value="resultados" className="mt-0">
                  <div className="max-w-3xl">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-6">Resultados Esperados</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {productInfo.results.map((result, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-background border border-border rounded-lg">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 lg:py-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  Complete sua Rotina
                </h2>
                <Link to="/loja" className="hidden sm:flex items-center gap-2 text-sm text-primary hover:underline">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((rp) => (
                  <ProductCardNew
                    key={rp.id}
                    product={{
                      id: rp.id,
                      name: rp.name,
                      brand: rp.brand,
                      price: formatPrice(rp.price),
                      image: rp.image_url || undefined,
                      category: rp.category || undefined,
                      isNew: rp.is_new,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewedProducts.length > 0 && (
          <RecentlyViewedSection products={recentlyViewedProducts} currentProductId={product.id} />
        )}

        {/* Reviews */}
        <section className="py-12 lg:py-16 bg-muted/20 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
                Avaliações de Clientes
              </h2>
              <ProductReviews productId={product.id} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Precisa de ajuda para escolher?
              </h2>
              <p className="text-muted-foreground mb-8">
                Receba uma indicação personalizada de rotina para sua pele
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link to="/monte-sua-rotina">
                    Monte sua Rotina <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://wa.me/5551995672101" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    Falar com especialista
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

// Small sub-component for rating summary using DB function
const ProductRatingSummary = ({ productId }: { productId: string }) => {
  const { stats } = useProductReviews(productId);

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= Math.round(stats.average) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {stats.average > 0 ? `${stats.average.toFixed(1)} (${stats.total} avaliações)` : "Sem avaliações ainda"}
      </span>
    </div>
  );
};

export default ProductDetail;
