import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, X, MessageCircle, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

const categories = [
  { name: "Todos", slug: "todos" },
  { name: "Manchas e Melasma", slug: "manchas-melasma" },
  { name: "Acne e Oleosidade", slug: "acne-oleosidade" },
  { name: "Anti-idade / Rejuvenescimento", slug: "anti-idade" },
  { name: "Hidratação e Reparação", slug: "hidratacao-reparacao" },
  { name: "Vitamina C", slug: "vitamina-c" },
  { name: "Área dos Olhos", slug: "area-olhos" },
  { name: "Corpo", slug: "corpo" },
  { name: "Capilar", slug: "capilar" },
  { name: "Fotoproteção", slug: "fotoprotecao" },
  { name: "Profissional", slug: "profissional" },
];

const brands = [
  { name: "Tulípia", slug: "tulipia" },
  { name: "Extratos da Terra", slug: "extratos-da-terra" },
  { name: "Mezzo", slug: "mezzo" },
];

const skinTypes = [
  { name: "Pele Oleosa", slug: "oleosa" },
  { name: "Pele Seca", slug: "seca" },
  { name: "Pele Mista", slug: "mista" },
  { name: "Pele Normal", slug: "normal" },
  { name: "Pele Sensível", slug: "sensivel" },
];

const productTypes = [
  { name: "Home Care", slug: "home-care" },
  { name: "Uso Profissional", slug: "profissional" },
];

// Placeholder products - will be replaced with real data
const placeholderProducts = [
  {
    id: 1,
    name: "Sérum Clareador Intensivo",
    brand: "Tulípia",
    category: "manchas-melasma",
    isProfessional: false,
    description: "Sérum de alta concentração para tratamento de manchas e melasma",
    skinTypes: ["mista", "normal"],
  },
  {
    id: 2,
    name: "Gel de Limpeza Oil Control",
    brand: "Extratos da Terra",
    category: "acne-oleosidade",
    isProfessional: false,
    description: "Gel de limpeza profunda para peles oleosas e acneicas",
    skinTypes: ["oleosa", "mista"],
  },
  {
    id: 3,
    name: "Peeling Químico AHA 30%",
    brand: "Mezzo",
    category: "profissional",
    isProfessional: true,
    description: "Peeling químico para renovação celular - Uso exclusivo profissional",
    skinTypes: ["normal", "mista"],
  },
  {
    id: 4,
    name: "Vitamina C 20% Estabilizada",
    brand: "Tulípia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sérum antioxidante para luminosidade e uniformização",
    skinTypes: ["normal", "mista", "seca"],
  },
  {
    id: 5,
    name: "Creme Anti-idade Retinol 0.5%",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Creme noturno para tratamento de rugas e linhas de expressão",
    skinTypes: ["normal", "seca"],
  },
  {
    id: 6,
    name: "Protetor Solar FPS 60",
    brand: "Mezzo",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Proteção solar de alta performance com toque seco",
    skinTypes: ["oleosa", "mista", "normal", "seca", "sensivel"],
  },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoria") || "todos");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>(
    searchParams.get("tipo-pele") ? [searchParams.get("tipo-pele")!] : []
  );
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);

  // Collapsible filter sections
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    skinTypes: false,
    productType: false,
  });

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) setSelectedCategory(cat);
    
    const skinType = searchParams.get("tipo-pele");
    if (skinType) setSelectedSkinTypes([skinType]);
  }, [searchParams]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleBrand = (slug: string) => {
    setSelectedBrands(prev => 
      prev.includes(slug) ? prev.filter(b => b !== slug) : [...prev, slug]
    );
  };

  const toggleSkinType = (slug: string) => {
    setSelectedSkinTypes(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("todos");
    setSelectedBrands([]);
    setSelectedSkinTypes([]);
    setSelectedProductType(null);
    setSearchQuery("");
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== "todos" || selectedBrands.length > 0 || 
    selectedSkinTypes.length > 0 || selectedProductType !== null;

  // Filter products
  const filteredProducts = placeholderProducts.filter(product => {
    if (selectedCategory !== "todos" && product.category !== selectedCategory) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.toLowerCase().replace(/ /g, "-"))) return false;
    if (selectedSkinTypes.length > 0 && !product.skinTypes.some(st => selectedSkinTypes.includes(st))) return false;
    if (selectedProductType === "profissional" && !product.isProfessional) return false;
    if (selectedProductType === "home-care" && product.isProfessional) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const FilterSection = ({ title, isOpen, onToggle, children }: { 
    title: string; 
    isOpen: boolean; 
    onToggle: () => void; 
    children: React.ReactNode 
  }) => (
    <div className="border-b border-border pb-4">
      <button 
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2"
      >
        <h3 className="font-display text-sm font-semibold text-foreground tracking-wide uppercase">
          {title}
        </h3>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pt-2 space-y-2">{children}</div>}
    </div>
  );

  return (
    <main className="pt-20 min-h-screen bg-card">
      <BreadcrumbNav />
      
      {/* Header */}
      <section className="py-12 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-wide">
              Nossa <span className="text-gradient-gold">Loja</span>
            </h1>
            <p className="font-body text-muted-foreground">
              Dermocosméticos de alta performance para profissionais e home care
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground stroke-[1.5]" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-body text-sm border-border"
                  />
                </div>

                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="font-body text-xs text-primary hover:underline"
                  >
                    Limpar todos os filtros
                  </button>
                )}

                {/* Categories */}
                <FilterSection 
                  title="Categorias" 
                  isOpen={openSections.categories}
                  onToggle={() => toggleSection("categories")}
                >
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`block w-full text-left px-2 py-1.5 font-body text-sm transition-colors ${
                        selectedCategory === category.slug
                          ? "text-primary font-medium"
                          : "text-foreground/70 hover:text-primary"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </FilterSection>

                {/* Brands */}
                <FilterSection 
                  title="Marcas" 
                  isOpen={openSections.brands}
                  onToggle={() => toggleSection("brands")}
                >
                  {brands.map((brand) => (
                    <label 
                      key={brand.slug}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox 
                        checked={selectedBrands.includes(brand.slug)}
                        onCheckedChange={() => toggleBrand(brand.slug)}
                      />
                      <span className="font-body text-sm text-foreground/70">
                        {brand.name}
                      </span>
                    </label>
                  ))}
                </FilterSection>

                {/* Skin Types */}
                <FilterSection 
                  title="Tipo de Pele" 
                  isOpen={openSections.skinTypes}
                  onToggle={() => toggleSection("skinTypes")}
                >
                  {skinTypes.map((type) => (
                    <label 
                      key={type.slug}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox 
                        checked={selectedSkinTypes.includes(type.slug)}
                        onCheckedChange={() => toggleSkinType(type.slug)}
                      />
                      <span className="font-body text-sm text-foreground/70">
                        {type.name}
                      </span>
                    </label>
                  ))}
                </FilterSection>

                {/* Product Type */}
                <FilterSection 
                  title="Tipo de Produto" 
                  isOpen={openSections.productType}
                  onToggle={() => toggleSection("productType")}
                >
                  {productTypes.map((type) => (
                    <button
                      key={type.slug}
                      onClick={() => setSelectedProductType(
                        selectedProductType === type.slug ? null : type.slug
                      )}
                      className={`block w-full text-left px-2 py-1.5 font-body text-sm transition-colors ${
                        selectedProductType === type.slug
                          ? "text-primary font-medium"
                          : "text-foreground/70 hover:text-primary"
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </FilterSection>
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground stroke-[1.5]" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-body text-sm border-border"
                />
              </div>
              <Button
                variant="gold-outline"
                size="sm"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="w-4 h-4 stroke-[1.5]" />
                Filtros
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="absolute inset-0 bg-charcoal/50"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-card p-6 shadow-elevated animate-slide-down overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl font-semibold tracking-wide">Filtros</h2>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="w-6 h-6 stroke-[1.5]" />
                    </button>
                  </div>

                  {hasActiveFilters && (
                    <button 
                      onClick={clearFilters}
                      className="font-body text-sm text-primary hover:underline mb-4"
                    >
                      Limpar todos os filtros
                    </button>
                  )}

                  <div className="space-y-4">
                    {/* Mobile Categories */}
                    <FilterSection 
                      title="Categorias" 
                      isOpen={true}
                      onToggle={() => {}}
                    >
                      {categories.map((category) => (
                        <button
                          key={category.slug}
                          onClick={() => {
                            setSelectedCategory(category.slug);
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-2 py-1.5 font-body text-sm transition-colors ${
                            selectedCategory === category.slug
                              ? "text-primary font-medium"
                              : "text-foreground/70 hover:text-primary"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </FilterSection>

                    {/* Mobile Brands */}
                    <FilterSection 
                      title="Marcas" 
                      isOpen={true}
                      onToggle={() => {}}
                    >
                      {brands.map((brand) => (
                        <label 
                          key={brand.slug}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox 
                            checked={selectedBrands.includes(brand.slug)}
                            onCheckedChange={() => toggleBrand(brand.slug)}
                          />
                          <span className="font-body text-sm text-foreground/70">
                            {brand.name}
                          </span>
                        </label>
                      ))}
                    </FilterSection>

                    {/* Mobile Skin Types */}
                    <FilterSection 
                      title="Tipo de Pele" 
                      isOpen={true}
                      onToggle={() => {}}
                    >
                      {skinTypes.map((type) => (
                        <label 
                          key={type.slug}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox 
                            checked={selectedSkinTypes.includes(type.slug)}
                            onCheckedChange={() => toggleSkinType(type.slug)}
                          />
                          <span className="font-body text-sm text-foreground/70">
                            {type.name}
                          </span>
                        </label>
                      ))}
                    </FilterSection>
                  </div>

                  <Button 
                    variant="gold" 
                    className="w-full mt-6"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Ver Resultados
                  </Button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results count and active filters */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <p className="font-body text-sm text-muted-foreground">
                  {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedCategory !== "todos" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 border border-primary text-primary font-body text-xs">
                        {categories.find(c => c.slug === selectedCategory)?.name}
                        <button onClick={() => setSelectedCategory("todos")}>
                          <X className="w-3 h-3 stroke-[1.5]" />
                        </button>
                      </span>
                    )}
                    {selectedBrands.map(brand => (
                      <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 border border-primary text-primary font-body text-xs">
                        {brands.find(b => b.slug === brand)?.name}
                        <button onClick={() => toggleBrand(brand)}>
                          <X className="w-3 h-3 stroke-[1.5]" />
                        </button>
                      </span>
                    ))}
                    {selectedSkinTypes.map(type => (
                      <span key={type} className="inline-flex items-center gap-1 px-3 py-1 border border-primary text-primary font-body text-xs">
                        {skinTypes.find(s => s.slug === type)?.name}
                        <button onClick={() => toggleSkinType(type)}>
                          <X className="w-3 h-3 stroke-[1.5]" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-luxury transition-all duration-300"
                    >
                      {/* Product Image Placeholder */}
                      <div className="aspect-square bg-secondary/30 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-body text-muted-foreground text-sm">
                            Imagem
                          </span>
                        </div>
                        {product.isProfessional && (
                          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground font-body text-xs font-medium">
                            <ShieldCheck className="w-3 h-3 stroke-[1.5]" />
                            Profissional
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-2">
                        <span className="font-body text-xs text-primary font-medium uppercase tracking-widest">
                          {product.brand}
                        </span>
                        <h3 className="font-display text-base font-medium text-foreground group-hover:text-primary transition-colors tracking-wide line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>

                        {/* CTA */}
                        <div className="pt-2">
                          {product.isProfessional ? (
                            <Button variant="gold-outline" size="sm" className="w-full" asChild>
                              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                                Consultar
                              </a>
                            </Button>
                          ) : (
                            <Button variant="elegant" size="sm" className="w-full" asChild>
                              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                                Comprar
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-secondary/30 border border-border">
                  <p className="font-body text-muted-foreground mb-4">
                    Nenhum produto encontrado com os filtros selecionados.
                  </p>
                  <Button
                    variant="gold-outline"
                    onClick={clearFilters}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}

              {/* Info Notice */}
              <div className="mt-12 p-6 bg-secondary border border-border">
                <p className="font-body text-sm text-muted-foreground text-center">
                  <strong className="text-foreground">Catálogo em atualização:</strong> Estamos cadastrando todos os produtos 
                  das marcas Tulípia, Extratos da Terra e Mezzo. Em breve você encontrará nosso catálogo completo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
