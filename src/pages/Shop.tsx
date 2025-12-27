import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, X, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "Todos", slug: "todos" },
  { name: "Anti-idade & Rejuvenescimento", slug: "anti-idade" },
  { name: "Clareamento & Manchas", slug: "clareamento" },
  { name: "Acne & Oleosidade", slug: "acne" },
  { name: "Hidratação & Reparação", slug: "hidratacao" },
  { name: "Área dos Olhos", slug: "olhos" },
  { name: "Vitamina C", slug: "vitamina-c" },
  { name: "Corpo", slug: "corpo" },
  { name: "Capilar", slug: "capilar" },
  { name: "Fotoproteção", slug: "fotoprotecao" },
  { name: "Profissional", slug: "profissional" },
];

const brands = [
  { name: "Todas", slug: "todas" },
  { name: "Tulípia", slug: "tulipia" },
  { name: "Extratos da Terra", slug: "extratos-da-terra" },
  { name: "Mezzo", slug: "mezzo" },
];

// Placeholder products - will be replaced with real data
const placeholderProducts = [
  {
    id: 1,
    name: "Exemplo de Produto Anti-idade",
    brand: "Tulípia",
    category: "anti-idade",
    isProfessional: false,
    description: "Descrição do produto será adicionada",
  },
  {
    id: 2,
    name: "Exemplo de Produto Clareador",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: false,
    description: "Descrição do produto será adicionada",
  },
  {
    id: 3,
    name: "Exemplo de Peeling Profissional",
    brand: "Mezzo",
    category: "profissional",
    isProfessional: true,
    description: "Uso exclusivo profissional",
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedBrand, setSelectedBrand] = useState("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-pearl">
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
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 space-y-8">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground stroke-[1.5]" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-body border-border"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
                    Categorias
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`block w-full text-left px-3 py-2 font-body text-sm transition-colors ${
                          selectedCategory === category.slug
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/70 hover:text-primary hover:bg-secondary"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
                    Marcas
                  </h3>
                  <div className="space-y-1">
                    {brands.map((brand) => (
                      <button
                        key={brand.slug}
                        onClick={() => setSelectedBrand(brand.slug)}
                        className={`block w-full text-left px-3 py-2 font-body text-sm transition-colors ${
                          selectedBrand === brand.slug
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/70 hover:text-primary hover:bg-secondary"
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground stroke-[1.5]" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-body border-border"
                />
              </div>
              <Button
                variant="gold-outline"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="w-5 h-5 stroke-[1.5]" />
                Filtros
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

                  {/* Categories */}
                  <div className="mb-8">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
                      Categorias
                    </h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category.slug}
                          onClick={() => {
                            setSelectedCategory(category.slug);
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 font-body text-sm transition-colors ${
                            selectedCategory === category.slug
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground/70 hover:text-primary hover:bg-secondary"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
                      Marcas
                    </h3>
                    <div className="space-y-1">
                      {brands.map((brand) => (
                        <button
                          key={brand.slug}
                          onClick={() => {
                            setSelectedBrand(brand.slug);
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 font-body text-sm transition-colors ${
                            selectedBrand === brand.slug
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground/70 hover:text-primary hover:bg-secondary"
                          }`}
                        >
                          {brand.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Active Filters */}
              {(selectedCategory !== "todos" || selectedBrand !== "todas") && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="font-body text-sm text-muted-foreground">Filtros ativos:</span>
                  {selectedCategory !== "todos" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 border border-primary text-primary font-body text-sm">
                      {categories.find(c => c.slug === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory("todos")}>
                        <X className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </span>
                  )}
                  {selectedBrand !== "todas" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 border border-primary text-primary font-body text-sm">
                      {brands.find(b => b.slug === selectedBrand)?.name}
                      <button onClick={() => setSelectedBrand("todas")}>
                        <X className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Products */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {placeholderProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-luxury transition-all duration-300"
                  >
                    {/* Product Image Placeholder */}
                    <div className="aspect-square bg-secondary/50 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-body text-muted-foreground text-sm">
                          Imagem do produto
                        </span>
                      </div>
                      {product.isProfessional && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground font-body text-xs font-medium">
                          <ShieldCheck className="w-3 h-3 stroke-[1.5]" />
                          Uso Profissional
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      <span className="font-body text-xs text-primary font-medium uppercase tracking-widest">
                        {product.brand}
                      </span>
                      <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors tracking-wide">
                        {product.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>

                      {/* CTA */}
                      {product.isProfessional ? (
                        <Button variant="gold-outline" size="sm" className="w-full" asChild>
                          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                            Consultar Disponibilidade
                          </a>
                        </Button>
                      ) : (
                        <Button variant="elegant" size="sm" className="w-full" asChild>
                          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                            Comprar pelo WhatsApp
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {placeholderProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-body text-muted-foreground mb-4">
                    Nenhum produto encontrado com os filtros selecionados.
                  </p>
                  <Button
                    variant="gold-outline"
                    onClick={() => {
                      setSelectedCategory("todos");
                      setSelectedBrand("todas");
                      setSearchQuery("");
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}

              {/* Info Notice */}
              <div className="mt-12 p-6 bg-secondary border border-border">
                <p className="font-body text-sm text-muted-foreground text-center">
                  <strong className="text-foreground">Produtos em atualização:</strong> Estamos cadastrando todos os produtos 
                  das marcas Tulípia, Extratos da Terra e Mezzo. Em breve você encontrará nosso catálogo completo aqui!
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
