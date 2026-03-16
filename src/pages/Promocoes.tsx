import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductCardNew from "@/components/shop/ProductCardNew";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, Tag, Sparkles, Filter, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Extended product type with promo fields
interface PromoProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: number;
  image?: string;
  category?: string;
  description?: string;
  isProfessional?: boolean;
  isNew?: boolean;
}

// Create promotional products with discounts
const createPromoProducts = (): PromoProduct[] => {
  const allProducts = [
    ...allTulipiaWithImages,
    ...allMezzoWithImages,
    ...allExtratosWithImages,
    ...allSmartGRWithImages,
  ];

  // Simulate discounts for demonstration
  const promoItems: PromoProduct[] = [];
  
  allProducts.forEach((product, index) => {
    const discountOptions = [10, 15, 20, 25, 30, 35, 40, 50];
    const hasDiscount = index % 2 === 0 || index % 3 === 0; // ~66% of products have discount
    
    if (hasDiscount) {
      const discount = discountOptions[index % discountOptions.length];
      const originalPrice = product.price || "R$ 149,90";
      const priceMatch = originalPrice.match(/[\d,]+/);
      const numericPrice = priceMatch ? parseFloat(priceMatch[0].replace(",", ".")) : 149.90;
      const discountedPrice = numericPrice * (1 - discount / 100);
      
      promoItems.push({
        id: String(product.id),
        name: product.name,
        brand: product.brand,
        price: `R$ ${discountedPrice.toFixed(2).replace(".", ",")}`,
        originalPrice,
        discount,
        image: product.image,
        category: product.category,
        description: product.description,
        isProfessional: product.isProfessional,
      });
    }
  });
  
  return promoItems;
};

const promoProducts = createPromoProducts();

// Discount ranges for filtering
const discountRanges = [
  { id: "10-20", label: "10% - 20%", min: 10, max: 20 },
  { id: "20-30", label: "20% - 30%", min: 20, max: 30 },
  { id: "30-40", label: "30% - 40%", min: 30, max: 40 },
  { id: "40+", label: "40% ou mais", min: 40, max: 100 },
];

// Brand options
const brandOptions = [
  { id: "tulipia", label: "Tulipia" },
  { id: "mezzo", label: "Mezzo" },
  { id: "extratos da terra", label: "Extratos da Terra" },
  { id: "smart gr", label: "Smart GR" },
];

const Promocoes = () => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("maior-desconto");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleDiscount = (discountId: string) => {
    setSelectedDiscounts(prev =>
      prev.includes(discountId)
        ? prev.filter(d => d !== discountId)
        : [...prev, discountId]
    );
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(b => b !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedDiscounts([]);
    setSelectedBrands([]);
  };

  const filteredProducts = useMemo(() => {
    let result = promoProducts.filter(product => {
      // Filter by discount range
      if (selectedDiscounts.length > 0) {
        const inRange = selectedDiscounts.some(rangeId => {
          const range = discountRanges.find(r => r.id === rangeId);
          if (!range || !product.discount) return false;
          return product.discount >= range.min && product.discount <= range.max;
        });
        if (!inRange) return false;
      }

      // Filter by brand
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand.toLowerCase())) return false;
      }

      return true;
    });

    // Sort products
    if (sortBy === "maior-desconto") {
      result = [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sortBy === "menor-desconto") {
      result = [...result].sort((a, b) => (a.discount || 0) - (b.discount || 0));
    } else if (sortBy === "preco-menor") {
      result = [...result].sort((a, b) => {
        const priceA = parseFloat((a.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        const priceB = parseFloat((b.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        return priceA - priceB;
      });
    } else if (sortBy === "preco-maior") {
      result = [...result].sort((a, b) => {
        const priceA = parseFloat((a.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        const priceB = parseFloat((b.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        return priceB - priceA;
      });
    }

    return result;
  }, [selectedDiscounts, selectedBrands, sortBy]);

  const activeFiltersCount = selectedDiscounts.length + selectedBrands.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Discount Filters */}
      <div>
        <h3 className="font-body text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Percent className="w-4 h-4 text-terracotta" />
          Desconto
        </h3>
        <div className="space-y-2">
          {discountRanges.map(range => (
            <button
              key={range.id}
              onClick={() => toggleDiscount(range.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                selectedDiscounts.includes(range.id)
                  ? "bg-terracotta/10 border-terracotta/40 text-terracotta"
                  : "bg-card border-border/50 hover:border-terracotta/30 text-foreground"
              }`}
            >
              <span className="text-sm font-medium">{range.label}</span>
              {selectedDiscounts.includes(range.id) && (
                <div className="w-5 h-5 rounded-full bg-terracotta flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filters */}
      <div>
        <h3 className="font-body text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4 text-gold" />
          Marca
        </h3>
        <div className="space-y-2">
          {brandOptions.map(brand => (
            <button
              key={brand.id}
              onClick={() => toggleBrand(brand.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                selectedBrands.includes(brand.id)
                  ? "bg-gold/10 border-gold/40 text-gold-dark"
                  : "bg-card border-border/50 hover:border-gold/30 text-foreground"
              }`}
            >
              <span className="text-sm font-medium">{brand.label}</span>
              {selectedBrands.includes(brand.id) && (
                <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-noir text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full rounded-xl border-border/50"
        >
          <X className="w-4 h-4 mr-2" />
          Limpar Filtros ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      
      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24" />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-terracotta/20 via-primary/10 to-gold/20 py-12 md:py-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          
          <div className="container-editorial relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/20 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-terracotta" />
                <span className="text-sm uppercase tracking-wider text-terracotta font-semibold">
                  Ofertas Exclusivas
                </span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                Promoções
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Aproveite descontos de até <span className="text-terracotta font-semibold">50% OFF</span> em produtos selecionados
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                <div className="text-center">
                  <span className="block font-display text-3xl md:text-4xl text-terracotta font-medium">
                    {promoProducts.length}
                  </span>
                  <span className="text-sm text-muted-foreground">Produtos em oferta</span>
                </div>
                <div className="text-center">
                  <span className="block font-display text-3xl md:text-4xl text-gold font-medium">
                    50%
                  </span>
                  <span className="text-sm text-muted-foreground">Desconto máximo</span>
                </div>
                <div className="text-center">
                  <span className="block font-display text-3xl md:text-4xl text-primary font-medium">
                    4
                  </span>
                  <span className="text-sm text-muted-foreground">Marcas participantes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-10 md:py-16">
          <div className="container-editorial">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              {/* Sidebar Filters - Desktop */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-32">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card/50 border border-border/30 rounded-2xl p-6"
                  >
                    <h2 className="font-display text-xl text-foreground mb-6">Filtros</h2>
                    <FilterContent />
                  </motion.div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    {/* Mobile Filter Button */}
                    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="lg:hidden rounded-xl border-border/50"
                        >
                          <Filter className="w-4 h-4 mr-2" />
                          Filtros
                          {activeFiltersCount > 0 && (
                            <Badge className="ml-2 bg-terracotta text-white">
                              {activeFiltersCount}
                            </Badge>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80">
                        <SheetHeader>
                          <SheetTitle className="font-display text-xl">Filtros</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterContent />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <span className="text-sm text-muted-foreground">
                      {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-card border border-border/50 rounded-xl text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="maior-desconto">Maior Desconto</option>
                    <option value="menor-desconto">Menor Desconto</option>
                    <option value="preco-menor">Menor Preço</option>
                    <option value="preco-maior">Maior Preço</option>
                  </select>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedDiscounts.map(discountId => {
                      const range = discountRanges.find(r => r.id === discountId);
                      return (
                        <Badge
                          key={discountId}
                          variant="secondary"
                          className="bg-terracotta/10 text-terracotta border-terracotta/20 cursor-pointer hover:bg-terracotta/20"
                          onClick={() => toggleDiscount(discountId)}
                        >
                          {range?.label}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      );
                    })}
                    {selectedBrands.map(brandId => {
                      const brand = brandOptions.find(b => b.id === brandId);
                      return (
                        <Badge
                          key={brandId}
                          variant="secondary"
                          className="bg-gold/10 text-gold-dark border-gold/20 cursor-pointer hover:bg-gold/20"
                          onClick={() => toggleBrand(brandId)}
                        >
                          {brand?.label}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      );
                    })}
                  </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <ProductCardNew product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-16">
                    <Percent className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-display text-xl text-foreground mb-2">
                      Nenhum produto encontrado
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Tente ajustar os filtros selecionados
                    </p>
                    <Button variant="outline" onClick={clearFilters} className="rounded-full">
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default Promocoes;
