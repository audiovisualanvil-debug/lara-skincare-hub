import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, X, ChevronDown, ArrowRight, MessageCircle, ChevronRight, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCardNew from "@/components/shop/ProductCardNew";
import { allTulipiaProducts, allMezzoProducts, allExtratosProducts } from "@/data/products";

// Category definitions with descriptions
const categoryDefinitions: Record<string, { title: string; description: string }> = {
  "todos": {
    title: "Nossa Loja",
    description: "Dermocosméticos de alta performance para profissionais e home care"
  },
  "clareamento": {
    title: "Clareamento",
    description: "Produtos selecionados para reduzir manchas, uniformizar o tom e iluminar a pele."
  },
  "manchas-melasma": {
    title: "Manchas e Melasma",
    description: "Produtos selecionados para reduzir manchas, uniformizar o tom e iluminar a pele."
  },
  "acne-oleosidade": {
    title: "Acne e Oleosidade",
    description: "Controle da oleosidade e tratamento para peles acneicas com ativos eficazes."
  },
  "anti-idade": {
    title: "Anti-idade e Rugas",
    description: "Tratamentos para rugas, linhas de expressão e perda de firmeza."
  },
  "hidratacao": {
    title: "Hidratação e Sensíveis",
    description: "Restauração da barreira cutânea e hidratação profunda para todos os tipos de pele."
  },
  "hidratacao-reparacao": {
    title: "Hidratação e Reparação",
    description: "Restauração da barreira cutânea e hidratação profunda para todos os tipos de pele."
  },
  "capilar": {
    title: "Capilar e Antiqueda",
    description: "Soluções para queda de cabelo, crescimento e saúde do couro cabeludo."
  },
  "corpo": {
    title: "Corpo e Firmador",
    description: "Tratamentos para celulite, estrias, flacidez e firmeza corporal."
  },
  "fotoprotecao": {
    title: "Proteção Solar",
    description: "Proteção solar de alta performance para uso diário."
  },
  "kits": {
    title: "Kits e Rotinas",
    description: "Kits completos para tratamentos específicos."
  },
};

// Filter options
const skinObjectives = [
  { name: "Clareamento", slug: "clareamento" },
  { name: "Manchas e Melasma", slug: "manchas-melasma" },
  { name: "Acne e Oleosidade", slug: "acne-oleosidade" },
  { name: "Anti-idade e Rugas", slug: "anti-idade" },
  { name: "Hidratação", slug: "hidratacao-reparacao" },
  { name: "Corpo e Estrias", slug: "corpo" },
  { name: "Capilar e Queda", slug: "capilar" },
  { name: "Proteção Solar", slug: "fotoprotecao" },
];

const productTypes = [
  { name: "Limpeza", slug: "limpeza" },
  { name: "Tônico", slug: "tonico" },
  { name: "Sérum", slug: "serum" },
  { name: "Máscara", slug: "mascara" },
  { name: "Peeling", slug: "peeling" },
  { name: "Protetor Solar", slug: "protetor" },
  { name: "Capilar", slug: "capilar" },
];

const brands = [
  { name: "Tulípia", slug: "tulípia" },
  { name: "Mezzo", slug: "mezzo" },
  { name: "Extratos da Terra", slug: "extratos da terra" },
];

const usageTypes = [
  { name: "Home Care", slug: "home-care" },
  { name: "Profissional", slug: "profissional" },
];

// Merge all products
const allProducts = [
  ...allTulipiaProducts,
  ...allMezzoProducts,
  ...allExtratosProducts,
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevancia");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Get category from URL
  const categoryParam = searchParams.get("categoria") || "todos";
  
  // Filter states
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(
    categoryParam !== "todos" ? [categoryParam] : []
  );
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("marca") ? [searchParams.get("marca")!] : []
  );
  const [selectedUsageTypes, setSelectedUsageTypes] = useState<string[]>([]);

  // Collapsible sections
  const [openSections, setOpenSections] = useState({
    objectives: true,
    productTypes: true,
    brands: true,
    usageTypes: true,
  });

  // Sync URL params with filters
  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat && cat !== "todos") {
      setSelectedObjectives([cat]);
    }
    const brand = searchParams.get("marca");
    if (brand) {
      setSelectedBrands([brand]);
    }
  }, [searchParams]);

  // Current category info
  const currentCategory = categoryDefinitions[categoryParam] || categoryDefinitions["todos"];

  // Toggle functions
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (value: string, state: string[], setState: (val: string[]) => void) => {
    setState(state.includes(value) ? state.filter(v => v !== value) : [...state, value]);
  };

  const clearFilters = () => {
    setSelectedObjectives([]);
    setSelectedProductTypes([]);
    setSelectedBrands([]);
    setSelectedUsageTypes([]);
    setSearchQuery("");
    setSearchParams({});
  };

  const hasActiveFilters = selectedObjectives.length > 0 || selectedProductTypes.length > 0 || 
    selectedBrands.length > 0 || selectedUsageTypes.length > 0 || searchQuery !== "";

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (selectedObjectives.length > 0 && !selectedObjectives.includes(product.category)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.toLowerCase())) return false;
      if (selectedUsageTypes.includes("profissional") && !product.isProfessional) return false;
      if (selectedUsageTypes.includes("home-care") && product.isProfessional) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedObjectives, selectedBrands, selectedUsageTypes, searchQuery]);

  // Filter section component
  const FilterSection = ({ 
    title, 
    isOpen, 
    onToggle, 
    children 
  }: { 
    title: string; 
    isOpen: boolean; 
    onToggle: () => void; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-detail/50 pb-4 mb-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full py-2 group">
        <h3 className="font-display text-sm font-medium text-foreground tracking-wide">
          {title}
        </h3>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pt-3" : "max-h-0"}`}>
        <div className="space-y-2.5">{children}</div>
      </div>
    </div>
  );

  // Checkbox item component
  const CheckboxItem = ({ 
    label, 
    checked, 
    onChange,
    count
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void;
    count?: number;
  }) => (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <Checkbox 
        checked={checked} 
        onCheckedChange={onChange}
        className="border-detail data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors flex-1">
        {label}
      </span>
      {count !== undefined && (
        <span className="font-body text-xs text-muted-foreground">({count})</span>
      )}
    </label>
  );

  return (
    <main className="pt-[140px] lg:pt-[160px] min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-cream border-b border-detail/30">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/loja" className="hover:text-primary transition-colors">Loja</Link>
            {categoryParam !== "todos" && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground">{currentCategory.title}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <section className="bg-cream border-b border-detail/30">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
            {currentCategory.title}
          </h1>
          <p className="font-body text-muted-foreground max-w-2xl">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar Filters - Desktop - FIXED */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-[180px]">
                <div className="bg-cream/50 border border-detail/30 p-6">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-detail/50">
                    <h2 className="font-display text-base font-semibold text-foreground">
                      Filtrar por
                    </h2>
                    {hasActiveFilters && (
                      <button 
                        onClick={clearFilters} 
                        className="font-body text-xs text-primary hover:underline"
                      >
                        Limpar tudo
                      </button>
                    )}
                  </div>

                  {/* Objetivo da Pele */}
                  <FilterSection 
                    title="Objetivo" 
                    isOpen={openSections.objectives}
                    onToggle={() => toggleSection("objectives")}
                  >
                    {skinObjectives.map((item) => (
                      <CheckboxItem
                        key={item.slug}
                        label={item.name}
                        checked={selectedObjectives.includes(item.slug)}
                        onChange={() => toggleFilter(item.slug, selectedObjectives, setSelectedObjectives)}
                      />
                    ))}
                  </FilterSection>

                  {/* Tipo de Produto */}
                  <FilterSection 
                    title="Tipo de Produto" 
                    isOpen={openSections.productTypes}
                    onToggle={() => toggleSection("productTypes")}
                  >
                    {productTypes.map((item) => (
                      <CheckboxItem
                        key={item.slug}
                        label={item.name}
                        checked={selectedProductTypes.includes(item.slug)}
                        onChange={() => toggleFilter(item.slug, selectedProductTypes, setSelectedProductTypes)}
                      />
                    ))}
                  </FilterSection>

                  {/* Marca */}
                  <FilterSection 
                    title="Marca" 
                    isOpen={openSections.brands}
                    onToggle={() => toggleSection("brands")}
                  >
                    {brands.map((item) => (
                      <CheckboxItem
                        key={item.slug}
                        label={item.name}
                        checked={selectedBrands.includes(item.slug)}
                        onChange={() => toggleFilter(item.slug, selectedBrands, setSelectedBrands)}
                      />
                    ))}
                  </FilterSection>

                  {/* Tipo de Uso */}
                  <FilterSection 
                    title="Tipo de Uso" 
                    isOpen={openSections.usageTypes}
                    onToggle={() => toggleSection("usageTypes")}
                  >
                    {usageTypes.map((item) => (
                      <CheckboxItem
                        key={item.slug}
                        label={item.name}
                        checked={selectedUsageTypes.includes(item.slug)}
                        onChange={() => toggleFilter(item.slug, selectedUsageTypes, setSelectedUsageTypes)}
                      />
                    ))}
                  </FilterSection>
                </div>

                {/* Sidebar CTA */}
                <div className="mt-6 p-6 bg-primary/5 border border-primary/20">
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                    Precisa de ajuda?
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mb-4">
                    Receba orientação profissional gratuita
                  </p>
                  <Button variant="gold" size="sm" className="w-full" asChild>
                    <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4" />
                      Falar com especialista
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-body text-sm border-detail bg-cream"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFilterOpen(true)}
                className="border-detail shrink-0"
              >
                <Filter className="w-4 h-4" />
                Filtros
                {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full ml-1" />}
              </Button>
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background shadow-xl overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-xl font-semibold">Filtrar por</h2>
                      <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-cream rounded-full">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="font-body text-sm text-primary hover:underline mb-6">
                        Limpar todos os filtros
                      </button>
                    )}

                    <div className="space-y-2">
                      <FilterSection title="Objetivo" isOpen={true} onToggle={() => {}}>
                        {skinObjectives.map((item) => (
                          <CheckboxItem
                            key={item.slug}
                            label={item.name}
                            checked={selectedObjectives.includes(item.slug)}
                            onChange={() => toggleFilter(item.slug, selectedObjectives, setSelectedObjectives)}
                          />
                        ))}
                      </FilterSection>

                      <FilterSection title="Tipo de Produto" isOpen={true} onToggle={() => {}}>
                        {productTypes.map((item) => (
                          <CheckboxItem
                            key={item.slug}
                            label={item.name}
                            checked={selectedProductTypes.includes(item.slug)}
                            onChange={() => toggleFilter(item.slug, selectedProductTypes, setSelectedProductTypes)}
                          />
                        ))}
                      </FilterSection>

                      <FilterSection title="Marca" isOpen={true} onToggle={() => {}}>
                        {brands.map((item) => (
                          <CheckboxItem
                            key={item.slug}
                            label={item.name}
                            checked={selectedBrands.includes(item.slug)}
                            onChange={() => toggleFilter(item.slug, selectedBrands, setSelectedBrands)}
                          />
                        ))}
                      </FilterSection>

                      <FilterSection title="Tipo de Uso" isOpen={true} onToggle={() => {}}>
                        {usageTypes.map((item) => (
                          <CheckboxItem
                            key={item.slug}
                            label={item.name}
                            checked={selectedUsageTypes.includes(item.slug)}
                            onChange={() => toggleFilter(item.slug, selectedUsageTypes, setSelectedUsageTypes)}
                          />
                        ))}
                      </FilterSection>
                    </div>

                    <Button variant="gold" className="w-full mt-8" onClick={() => setIsFilterOpen(false)}>
                      Ver {filteredProducts.length} resultado{filteredProducts.length !== 1 ? "s" : ""}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-detail/30">
                <p className="font-body text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredProducts.length}</span> produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                
                <div className="flex items-center gap-4">
                  {/* Search - Desktop */}
                  <div className="hidden lg:block relative w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 font-body text-sm border-detail bg-cream h-9"
                    />
                  </div>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 h-9 font-body text-sm border-detail bg-cream">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevancia">Relevância</SelectItem>
                      <SelectItem value="nome-az">Nome A-Z</SelectItem>
                      <SelectItem value="nome-za">Nome Z-A</SelectItem>
                      <SelectItem value="mais-vendidos">Mais Vendidos</SelectItem>
                      <SelectItem value="novidades">Novidades</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode - Desktop */}
                  <div className="hidden lg:flex items-center border border-detail rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-cream text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-cream text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters Tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="font-body text-xs text-muted-foreground">Filtros ativos:</span>
                  {selectedObjectives.map(slug => (
                    <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream border border-detail text-foreground font-body text-xs rounded-full">
                      {skinObjectives.find(o => o.slug === slug)?.name}
                      <button onClick={() => toggleFilter(slug, selectedObjectives, setSelectedObjectives)} className="hover:text-primary">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedBrands.map(slug => (
                    <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream border border-detail text-foreground font-body text-xs rounded-full">
                      {brands.find(b => b.slug === slug)?.name}
                      <button onClick={() => toggleFilter(slug, selectedBrands, setSelectedBrands)} className="hover:text-primary">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedUsageTypes.map(slug => (
                    <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream border border-detail text-foreground font-body text-xs rounded-full">
                      {usageTypes.find(u => u.slug === slug)?.name}
                      <button onClick={() => toggleFilter(slug, selectedUsageTypes, setSelectedUsageTypes)} className="hover:text-primary">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-4 md:gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {filteredProducts.map((product) => (
                    <ProductCardNew key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-cream/50 border border-detail/30 rounded-lg">
                  <div className="max-w-sm mx-auto">
                    <p className="font-body text-muted-foreground mb-4">
                      Nenhum produto encontrado com os filtros selecionados.
                    </p>
                    <Button variant="gold-outline" onClick={clearFilters}>
                      Limpar Filtros
                    </Button>
                  </div>
                </div>
              )}

              {/* Load More - Placeholder */}
              {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
                <div className="mt-12 text-center">
                  <Button variant="gold-outline" size="lg">
                    Carregar mais produtos
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-cream border-t border-detail/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Não sabe qual escolher?
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Receba uma indicação personalizada de rotina para sua pele através de nossa consultoria gratuita.
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

export default Shop;
