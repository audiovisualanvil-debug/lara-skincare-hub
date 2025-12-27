import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, X, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ProductCard, { Product } from "@/components/shop/ProductCard";

// Category definitions with descriptions
const categoryDefinitions: Record<string, { title: string; description: string }> = {
  "todos": {
    title: "Nossa Loja",
    description: "Dermocosméticos de alta performance para profissionais e home care"
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
    title: "Anti-idade e Rejuvenescimento",
    description: "Tratamentos para rugas, linhas de expressão e perda de firmeza."
  },
  "hidratacao-reparacao": {
    title: "Hidratação e Reparação",
    description: "Restauração da barreira cutânea e hidratação profunda para todos os tipos de pele."
  },
  "vitamina-c": {
    title: "Vitamina C",
    description: "Antioxidantes poderosos para luminosidade e proteção contra radicais livres."
  },
  "area-olhos": {
    title: "Área dos Olhos",
    description: "Cuidados específicos para olheiras, bolsas e linhas finas ao redor dos olhos."
  },
  "corpo": {
    title: "Corpo e Estrias",
    description: "Tratamentos para celulite, estrias, flacidez e firmeza corporal."
  },
  "capilar": {
    title: "Capilar e Queda",
    description: "Soluções para queda de cabelo, crescimento e saúde do couro cabeludo."
  },
  "fotoprotecao": {
    title: "Fotoproteção",
    description: "Proteção solar de alta performance para uso diário."
  },
  "profissional": {
    title: "Uso Profissional",
    description: "Produtos para uso em cabine por profissionais de estética."
  },
};

// Filter options
const skinObjectives = [
  { name: "Manchas e Melasma", slug: "manchas-melasma" },
  { name: "Acne e Oleosidade", slug: "acne-oleosidade" },
  { name: "Anti-idade e Rejuvenescimento", slug: "anti-idade" },
  { name: "Hidratação e Reparação", slug: "hidratacao-reparacao" },
  { name: "Corpo e Estrias", slug: "corpo" },
  { name: "Capilar e Queda", slug: "capilar" },
  { name: "Fotoproteção", slug: "fotoprotecao" },
];

const productTypes = [
  { name: "Limpeza", slug: "limpeza" },
  { name: "Tônico", slug: "tonico" },
  { name: "Sérum / Tratamento", slug: "serum" },
  { name: "Máscara", slug: "mascara" },
  { name: "Peeling", slug: "peeling" },
  { name: "Protetor", slug: "protetor" },
  { name: "Capilar", slug: "capilar" },
];

const brands = [
  { name: "Tulípia", slug: "tulipia" },
  { name: "Extratos da Terra", slug: "extratos-da-terra" },
  { name: "Mezzo", slug: "mezzo" },
];

const usageTypes = [
  { name: "Home Care", slug: "home-care" },
  { name: "Profissional", slug: "profissional" },
];

// Sample products
const allProducts: Product[] = [
  {
    id: 1,
    name: "Sérum Clareador Intensivo",
    brand: "Tulípia",
    category: "manchas-melasma",
    isProfessional: false,
    description: "Reduz manchas e uniformiza o tom da pele",
    price: "R$ 189,90",
  },
  {
    id: 2,
    name: "Vitamina C 20% Estabilizada",
    brand: "Tulípia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Antioxidante poderoso para luminosidade",
    price: "R$ 159,90",
  },
  {
    id: 3,
    name: "Protetor Solar FPS 60",
    brand: "Mezzo",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Alta proteção com toque seco e leve",
    price: "R$ 89,90",
  },
  {
    id: 4,
    name: "Gel de Limpeza Oil Control",
    brand: "Extratos da Terra",
    category: "acne-oleosidade",
    isProfessional: false,
    description: "Limpeza profunda sem ressecar",
    price: "R$ 69,90",
  },
  {
    id: 5,
    name: "Creme Anti-idade Retinol",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Reduz rugas e linhas de expressão",
    price: "R$ 199,90",
  },
  {
    id: 6,
    name: "Hidratante Reparador Intenso",
    brand: "Mezzo",
    category: "hidratacao-reparacao",
    isProfessional: false,
    description: "Restaura a barreira cutânea",
    price: "R$ 129,90",
  },
  {
    id: 7,
    name: "Peeling Enzimático",
    brand: "Extratos da Terra",
    category: "profissional",
    isProfessional: true,
    description: "Renovação celular suave",
    price: "R$ 249,90",
  },
  {
    id: 8,
    name: "Sérum Niacinamida 10%",
    brand: "Tulípia",
    category: "acne-oleosidade",
    isProfessional: false,
    description: "Controle de poros e oleosidade",
    price: "R$ 139,90",
  },
  {
    id: 9,
    name: "Contorno de Olhos Peptídeos",
    brand: "Mezzo",
    category: "area-olhos",
    isProfessional: false,
    description: "Reduz olheiras e linhas finas",
    price: "R$ 149,90",
  },
];

// Related products for CTA section
const relatedProducts: Product[] = [
  {
    id: 10,
    name: "Protetor Solar FPS 60",
    brand: "Mezzo",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Finalização essencial para qualquer rotina",
    price: "R$ 89,90",
  },
  {
    id: 11,
    name: "Gel de Limpeza Suave",
    brand: "Tulípia",
    category: "limpeza",
    isProfessional: false,
    description: "Primeiro passo de toda rotina",
    price: "R$ 59,90",
  },
  {
    id: 12,
    name: "Hidratante Facial",
    brand: "Extratos da Terra",
    category: "hidratacao-reparacao",
    isProfessional: false,
    description: "Hidratação diária para todos os tipos de pele",
    price: "R$ 99,90",
  },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.toLowerCase().replace(/ /g, "-"))) return false;
      if (selectedUsageTypes.includes("profissional") && !product.isProfessional) return false;
      if (selectedUsageTypes.includes("home-care") && product.isProfessional) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedObjectives, selectedBrands, selectedUsageTypes, searchQuery]);

  // Breadcrumb
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Loja", href: "/loja" },
    ...(categoryParam !== "todos" ? [{ label: currentCategory.title, href: `/loja?categoria=${categoryParam}` }] : []),
  ];

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
    <div className="border-b border-border pb-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full py-2">
        <h3 className="font-display text-sm font-semibold text-foreground tracking-wide">
          {title}
        </h3>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pt-3 space-y-2">{children}</div>}
    </div>
  );

  // Checkbox item component
  const CheckboxItem = ({ 
    label, 
    checked, 
    onChange 
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void;
  }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className="font-body text-sm text-foreground/70 group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  );

  return (
    <main className="pt-[104px] lg:pt-[136px] min-h-screen bg-card">
      {/* SEÇÃO 1 — HEADER DA CATEGORIA */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 font-body text-sm">
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

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {currentCategory.title}
          </h1>
          <p className="font-body text-muted-foreground max-w-2xl">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* SEÇÃO 2 & 3 — FILTROS + GRID */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-40 bg-cream p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Filtrar por
                  </h2>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="font-body text-xs text-primary hover:underline">
                      Limpar filtros
                    </button>
                  )}
                </div>

                {/* Objetivo da Pele */}
                <FilterSection 
                  title="Objetivo da Pele" 
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
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-4 mb-4">
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
              <Button variant="gold-outline" size="sm" onClick={() => setIsFilterOpen(true)}>
                <Filter className="w-4 h-4 stroke-[1.5]" />
                Filtros
                {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full ml-1" />}
              </Button>
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-charcoal/50" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-card p-6 shadow-elevated overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl font-semibold">Filtrar por</h2>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="w-6 h-6 stroke-[1.5]" />
                    </button>
                  </div>

                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="font-body text-sm text-primary hover:underline mb-4">
                      Limpar filtros
                    </button>
                  )}

                  <div className="space-y-4">
                    <FilterSection title="Objetivo da Pele" isOpen={true} onToggle={() => {}}>
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

                  <Button variant="gold" className="w-full mt-6" onClick={() => setIsFilterOpen(false)}>
                    Ver Resultados ({filteredProducts.length})
                  </Button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Desktop Search & Count */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="font-body text-sm text-muted-foreground">
                  {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground stroke-[1.5]" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-body text-sm border-border"
                  />
                </div>
              </div>

              {/* Active filters tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {selectedObjectives.map(slug => (
                    <span key={slug} className="inline-flex items-center gap-1 px-3 py-1 border border-primary text-primary font-body text-xs">
                      {skinObjectives.find(o => o.slug === slug)?.name}
                      <button onClick={() => toggleFilter(slug, selectedObjectives, setSelectedObjectives)}>
                        <X className="w-3 h-3 stroke-[1.5]" />
                      </button>
                    </span>
                  ))}
                  {selectedBrands.map(slug => (
                    <span key={slug} className="inline-flex items-center gap-1 px-3 py-1 border border-primary text-primary font-body text-xs">
                      {brands.find(b => b.slug === slug)?.name}
                      <button onClick={() => toggleFilter(slug, selectedBrands, setSelectedBrands)}>
                        <X className="w-3 h-3 stroke-[1.5]" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-cream border border-border">
                  <p className="font-body text-muted-foreground mb-4">
                    Nenhum produto encontrado com os filtros selecionados.
                  </p>
                  <Button variant="gold-outline" onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — CTA DE CONSULTORIA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Não sabe qual escolher?
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Receba uma indicação personalizada de rotina para sua pele.
            </p>
            <Button variant="gold" size="lg" asChild>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                Quero indicação profissional
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — PRODUTOS RELACIONADOS */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Combina com sua rotina
            </h2>
            <p className="font-body text-muted-foreground">
              Produtos que potencializam os resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/monte-sua-rotina" 
              className="inline-flex items-center gap-2 font-body text-sm text-primary hover:underline"
            >
              Monte sua rotina completa
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
