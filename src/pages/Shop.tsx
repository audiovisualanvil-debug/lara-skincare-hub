import SEOHead from "@/components/seo/SEOHead";
import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage } from "@/utils/resolveProductImage";
import { Search, Filter, X, ChevronDown, ArrowRight, MessageCircle, ChevronRight, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCardNew from "@/components/shop/ProductCardNew";
import MobileFiltersSheet from "@/components/shop/MobileFiltersSheet";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import AnimatedSection from "@/components/home/AnimatedSection";

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
  { name: "Mezzo", slug: "mezzo" },
  { name: "Extratos da Terra", slug: "extratos da terra" },
  { name: "Tulipia", slug: "tulipia" },
  { name: "Smart GR", slug: "smart gr" },
];

const usageTypes = [
  { name: "Home Care", slug: "home-care" },
  { name: "Profissional", slug: "profissional" },
];

// Price range options
const priceRanges = [
  { name: "Até R$ 50", min: 0, max: 50 },
  { name: "R$ 50 - R$ 100", min: 50, max: 100 },
  { name: "R$ 100 - R$ 200", min: 100, max: 200 },
  { name: "R$ 200 - R$ 300", min: 200, max: 300 },
  { name: "Acima de R$ 300", min: 300, max: 9999 },
];

// Helper to extract numeric price from string
const extractPrice = (priceStr?: string): number | null => {
  if (!priceStr || priceStr === "Consultar") return null;
  const match = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(match) || null;
};

const PRODUCTS_PER_PAGE = 12;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevancia");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  // Fetch products from database
  useEffect(() => {
    const fetchDbProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true);
      if (data) {
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.category || "todos",
          isProfessional: false,
          description: p.short_description || p.description || "",
          price: `R$ ${Number(p.price).toFixed(2).replace(".", ",")}`,
          image: resolveProductImage(p.image_url),
          slug: p.slug,
          isDbProduct: true,
        }));
        setDbProducts(mapped);
      }
    };
    fetchDbProducts();
  }, []);

  const allProducts = dbProducts;
  const productPrices = allProducts.map(p => extractPrice(p.price)).filter((p): p is number => p !== null);
  const maxProductPrice = productPrices.length > 0 ? Math.max(...productPrices) : 999;
  
  // Get category from URL
  const categoryParam = searchParams.get("categoria") || "todos";
  
  // Filter states
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(
    categoryParam !== "todos" ? [categoryParam] : []
  );
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("marca") ? [searchParams.get("marca")!.toLowerCase()] : []
  );
  const [selectedUsageTypes, setSelectedUsageTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);

  // Collapsible sections
  const [openSections, setOpenSections] = useState({
    objectives: true,
    productTypes: true,
    brands: true,
    usageTypes: true,
    price: true,
  });

  // Sync URL params with filters
  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat && cat !== "todos") {
      setSelectedObjectives([cat]);
    }
    const brand = searchParams.get("marca");
    if (brand) {
      setSelectedBrands([brand.toLowerCase()]);
    }
    const busca = searchParams.get("busca");
    if (busca) {
      setSearchQuery(busca);
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
    setSelectedPriceRanges([]);
    setSearchQuery("");
    setSearchParams({});
  };

  const hasActiveFilters = selectedObjectives.length > 0 || selectedProductTypes.length > 0 || 
    selectedBrands.length > 0 || selectedUsageTypes.length > 0 || selectedPriceRanges.length > 0 || searchQuery !== "";

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(product => {
      if (selectedObjectives.length > 0 && !selectedObjectives.includes(product.category)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.toLowerCase())) return false;
      if (selectedUsageTypes.includes("profissional") && !product.isProfessional) return false;
      if (selectedUsageTypes.includes("home-care") && product.isProfessional) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Price filter
      if (selectedPriceRanges.length > 0) {
        const productPrice = extractPrice(product.price);
        if (productPrice === null) return false;
        const inRange = selectedPriceRanges.some(rangeIndex => {
          const range = priceRanges[rangeIndex];
          return productPrice >= range.min && productPrice < range.max;
        });
        if (!inRange) return false;
      }
      
      return true;
    });

    // Sort products
    if (sortBy === "nome-az") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    } else if (sortBy === "nome-za") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
    } else if (sortBy === "preco-menor") {
      result = [...result].sort((a, b) => {
        const priceA = extractPrice(a.price) ?? 9999;
        const priceB = extractPrice(b.price) ?? 9999;
        return priceA - priceB;
      });
    } else if (sortBy === "preco-maior") {
      result = [...result].sort((a, b) => {
        const priceA = extractPrice(a.price) ?? 0;
        const priceB = extractPrice(b.price) ?? 0;
        return priceB - priceA;
      });
    }

    return result;
  }, [allProducts, selectedObjectives, selectedBrands, selectedUsageTypes, searchQuery, selectedPriceRanges, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedObjectives, selectedBrands, selectedUsageTypes, searchQuery, selectedPriceRanges, sortBy]);

  // Pagination helpers
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

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
    <div className="border-b border-detail/30 pb-4 mb-4 last:border-b-0">
      <button onClick={onToggle} className="flex items-center justify-between w-full py-2 group">
        <h3 className="font-display text-sm font-medium text-foreground tracking-wide">
          {title}
        </h3>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-3 space-y-2.5">{children}</div>
      </motion.div>
    </div>
  );

  // Checkbox item component
  const CheckboxItem = ({ 
    label, 
    checked, 
    onChange,
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void;
  }) => (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <Checkbox 
        checked={checked} 
        onCheckedChange={onChange}
        className="border-detail data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <span className="font-body text-sm text-foreground/70 group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Loja | Multti Med Porto Alegre"
        description="Explore nossa linha completa de dermocosméticos profissionais. Clareamento, anti-idade, acne, hidratação e mais. Frete grátis acima de R$299."
        canonical="/loja"
      />
      <MainHeader />
      
      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />

      <main className="flex-1">
        {/* Category Header - Editorial Hero */}
        <section className="relative bg-cream overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="container-editorial py-16 lg:py-24 relative z-10">
            {/* Breadcrumb */}
            <motion.nav 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8"
            >
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Loja</span>
              {categoryParam !== "todos" && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary">{currentCategory.title}</span>
                </>
              )}
            </motion.nav>

            <AnimatedSection>
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
                Catálogo
              </span>
              <h1 className="font-display text-display-sm md:text-display text-foreground mt-3">
                {currentCategory.title}
              </h1>
              <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl">
                {currentCategory.description}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-editorial">
          <div className="container-editorial">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              {/* Sidebar Filters - Desktop */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-32">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-cream/50 border border-detail/30 p-6"
                  >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-detail/30">
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

                    {/* Faixa de Preço */}
                    <FilterSection 
                      title="Faixa de Preço" 
                      isOpen={openSections.price}
                      onToggle={() => toggleSection("price")}
                    >
                      {priceRanges.map((range, index) => (
                        <CheckboxItem
                          key={index}
                          label={range.name}
                          checked={selectedPriceRanges.includes(index)}
                          onChange={() => {
                            setSelectedPriceRanges(prev => 
                              prev.includes(index) 
                                ? prev.filter(i => i !== index) 
                                : [...prev, index]
                            );
                          }}
                        />
                      ))}
                    </FilterSection>
                  </motion.div>

                  {/* Sidebar CTA */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 p-6 bg-primary/5 border border-primary/20"
                  >
                    <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                      Precisa de ajuda?
                    </h3>
                    <p className="font-body text-xs text-muted-foreground mb-4">
                      Receba orientação profissional gratuita
                    </p>
                    <Button variant="gold" size="sm" className="w-full" asChild>
                      <a href="https://wa.me/5551995672101" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4" />
                        Falar com especialista
                      </a>
                    </Button>
                  </motion.div>
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
                    className="pl-10 font-body text-sm border-detail bg-cream h-11"
                  />
                </div>
                <MobileFiltersSheet
                  skinObjectives={skinObjectives}
                  productTypes={productTypes}
                  brands={brands}
                  usageTypes={usageTypes}
                  priceRanges={priceRanges}
                  selectedObjectives={selectedObjectives}
                  selectedProductTypes={selectedProductTypes}
                  selectedBrands={selectedBrands}
                  selectedUsageTypes={selectedUsageTypes}
                  selectedPriceRanges={selectedPriceRanges}
                  setSelectedObjectives={setSelectedObjectives}
                  setSelectedProductTypes={setSelectedProductTypes}
                  setSelectedBrands={setSelectedBrands}
                  setSelectedUsageTypes={setSelectedUsageTypes}
                  setSelectedPriceRanges={setSelectedPriceRanges}
                  resultsCount={filteredProducts.length}
                  onClearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>

              {/* Products Grid */}
              <div className="flex-1 min-w-0">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-detail/30">
                  <p className="font-body text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredProducts.length}</span> produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
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
                        className="pl-10 font-body text-sm border-detail bg-cream h-10"
                      />
                    </div>

                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 h-10 font-body text-sm border-detail bg-cream">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevancia">Relevância</SelectItem>
                        <SelectItem value="nome-az">Nome A-Z</SelectItem>
                        <SelectItem value="nome-za">Nome Z-A</SelectItem>
                        <SelectItem value="preco-menor">Menor preço</SelectItem>
                        <SelectItem value="preco-maior">Maior preço</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Mode - Desktop */}
                    <div className="hidden lg:flex items-center border border-detail overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-cream text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-cream text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Filters Tags */}
                {hasActiveFilters && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-2 mb-6"
                  >
                    <span className="font-body text-xs text-muted-foreground">Filtros ativos:</span>
                    {selectedObjectives.map(slug => (
                      <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-foreground font-body text-xs">
                        {skinObjectives.find(o => o.slug === slug)?.name}
                        <button onClick={() => toggleFilter(slug, selectedObjectives, setSelectedObjectives)} className="hover:text-primary">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedBrands.map(slug => (
                      <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-foreground font-body text-xs">
                        {brands.find(b => b.slug === slug)?.name}
                        <button onClick={() => toggleFilter(slug, selectedBrands, setSelectedBrands)} className="hover:text-primary">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedUsageTypes.map(slug => (
                      <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-foreground font-body text-xs">
                        {usageTypes.find(u => u.slug === slug)?.name}
                        <button onClick={() => toggleFilter(slug, selectedUsageTypes, setSelectedUsageTypes)} className="hover:text-primary">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedPriceRanges.map(index => (
                      <span key={`price-${index}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-foreground font-body text-xs">
                        {priceRanges[index]?.name}
                        <button onClick={() => setSelectedPriceRanges(prev => prev.filter(i => i !== index))} className="hover:text-primary">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Products */}
                {paginatedProducts.length > 0 ? (
                  <>
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      key={`${currentPage}-${sortBy}`}
                      className={`grid gap-4 md:gap-6 ${
                        viewMode === "grid" 
                          ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3" 
                          : "grid-cols-1"
                      }`}
                    >
                      {paginatedProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                          <ProductCardNew product={product} />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="border-detail"
                          >
                            Anterior
                          </Button>
                          
                          <div className="flex items-center gap-1 mx-2">
                            {getPageNumbers().map((page, index) => (
                              page === "..." ? (
                                <span key={`ellipsis-${index}`} className="px-2 font-body text-muted-foreground">...</span>
                              ) : (
                                <Button
                                  key={page}
                                  variant={currentPage === page ? "gold" : "outline"}
                                  size="sm"
                                  onClick={() => setCurrentPage(page)}
                                  className={`w-10 h-10 ${currentPage !== page ? "border-detail" : ""}`}
                                >
                                  {page}
                                </Button>
                              )
                            ))}
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="border-detail"
                          >
                            Próxima
                          </Button>
                        </div>
                        
                        <p className="font-body text-sm text-muted-foreground">
                          Mostrando {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length} produtos
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-cream/50 border border-detail/30"
                  >
                    <div className="max-w-sm mx-auto">
                      <p className="font-body text-muted-foreground mb-4">
                        Nenhum produto encontrado com os filtros selecionados.
                      </p>
                      <Button variant="gold-outline" onClick={clearFilters}>
                        Limpar Filtros
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary section-editorial overflow-hidden relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 border border-primary-foreground/10 rounded-full" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-primary-foreground/10 rounded-full" />
          
          <AnimatedSection className="container-editorial relative z-10">
            <div className="max-w-xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60 font-body font-semibold">
                Consultoria
              </span>
              <h2 className="font-display text-display-sm md:text-display text-primary-foreground mt-3">
                Não sabe qual escolher?
              </h2>
              <p className="font-body text-lg text-primary-foreground/70 mt-4">
                Receba uma indicação personalizada de rotina para sua pele através de nossa consultoria gratuita.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/monte-sua-rotina">
                    Monte sua Rotina
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="https://wa.me/5551995672101" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    Falar com especialista
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default Shop;
