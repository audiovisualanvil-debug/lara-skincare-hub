import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, ShoppingBag, User, Search, 
  Sparkles, Droplets, Sun, FlaskConical, Leaf, Percent,
  ChevronDown, X, Filter
} from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductGrid from "@/components/shop/ProductGrid";
import { BrandPageLayout } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";

// Import banners
import obiomeBanner from "@/assets/banners/mezzo-obiome-banner.png";
import lhaExoBanner from "@/assets/banners/mezzo-lha-exo-banner.png";

// Mezzo brand color
const MEZZO_PINK = "#C91E5B";

// Navigation categories matching the official site
const navCategories = [
  { id: "all", label: "Todos" },
  { id: "corpo", label: "Corporal" },
  { id: "capilar", label: "Capilar" },
  { id: "exossomas", label: "Exossomas e PDRN" },
  { id: "fotoprotetor", label: "Proteção Solar" },
  { id: "vitaminac", label: "Vitamina C" },
  { id: "peeling", label: "Anti-Idade" },
  { id: "lancamentos", label: "Lançamento" },
];

// Main category buttons with icons
const mainCategories = [
  { id: "corpo", label: "Corporal", icon: Sparkles, color: MEZZO_PINK },
  { id: "all", label: "Facial", icon: Droplets, color: "#2D3748" },
  { id: "promocoes", label: "Promoções", icon: Percent, color: "#2D3748" },
];

// Skin type filters
const skinTypes = [
  { id: "all", label: "Todos os tipos" },
  { id: "oleosa", label: "Pele Oleosa" },
  { id: "seca", label: "Pele Seca" },
  { id: "sensivel", label: "Pele Sensível" },
  { id: "acneica", label: "Pele Acneica" },
  { id: "madura", label: "Pele Madura" },
  { id: "manchas", label: "Com Manchas" },
];

// All filter categories
const allCategories = [
  { id: "all", label: "Todos", icon: null },
  { id: "exossomas", label: "Exossomas" },
  { id: "capilar", label: "Capilar" },
  { id: "corpo", label: "Corporal" },
  { id: "fotoprotetor", label: "Fotoproteção" },
  { id: "homecare", label: "Home Care" },
  { id: "limpeza", label: "Limpeza" },
  { id: "vitaminac", label: "Vitamina C" },
  { id: "esfoliacao", label: "Esfoliação" },
  { id: "mascaras", label: "Máscaras" },
  { id: "hidratacao", label: "Hidratação" },
  { id: "peeling", label: "Peeling Ácidos" },
  { id: "acnediol", label: "Acnediol" },
  { id: "nutraceuticos", label: "Nutracêuticos" },
];

// Helper to check if product matches skin type
const matchesSkinType = (product: typeof allMezzoWithImages[0], skinType: string): boolean => {
  if (skinType === "all") return true;
  
  const indications = product.applicationIndications || [];
  const description = (product.description || "").toLowerCase();
  const fullDescription = (product.fullDescription || "").toLowerCase();
  const name = product.name.toLowerCase();
  
  const textToSearch = [...indications.map(i => i.toLowerCase()), description, fullDescription, name].join(" ");
  
  switch (skinType) {
    case "oleosa":
      return textToSearch.includes("oleosa") || textToSearch.includes("oleosidade") || 
             textToSearch.includes("controle de sebo") || textToSearch.includes("matific");
    case "seca":
      return textToSearch.includes("seca") || textToSearch.includes("ressecad") || 
             textToSearch.includes("hidratação") || textToSearch.includes("desidrat");
    case "sensivel":
      return textToSearch.includes("sensível") || textToSearch.includes("sensibiliz") || 
             textToSearch.includes("calmante") || textToSearch.includes("irritação");
    case "acneica":
      return textToSearch.includes("acne") || textToSearch.includes("acneic") || 
             textToSearch.includes("espinha") || textToSearch.includes("anti-acne");
    case "madura":
      return textToSearch.includes("anti-idade") || textToSearch.includes("rejuvenesc") || 
             textToSearch.includes("rugas") || textToSearch.includes("flacidez") || 
             textToSearch.includes("colágeno") || textToSearch.includes("madura");
    case "manchas":
      return textToSearch.includes("mancha") || textToSearch.includes("clarea") || 
             textToSearch.includes("melasma") || textToSearch.includes("pigment") ||
             textToSearch.includes("uniformiz");
    default:
      return true;
  }
};

const MezzoPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSkinType, setActiveSkinType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [obiomeBanner, lhaExoBanner];

  // Filter products
  const filteredProducts = useMemo(() => {
    return allMezzoWithImages.filter(product => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSkin = matchesSkinType(product, activeSkinType);
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSkin && matchesSearch;
    });
  }, [activeCategory, activeSkinType, searchQuery]);

  // Count products per skin type
  const skinTypeCounts = useMemo(() => {
    const baseProducts = activeCategory === "all" 
      ? allMezzoWithImages 
      : allMezzoWithImages.filter(p => p.category === activeCategory);
    
    return skinTypes.reduce((acc, type) => {
      acc[type.id] = type.id === "all" 
        ? baseProducts.length 
        : baseProducts.filter(p => matchesSkinType(p, type.id)).length;
      return acc;
    }, {} as Record<string, number>);
  }, [activeCategory]);

  const hasActiveFilters = activeCategory !== "all" || activeSkinType !== "all" || searchQuery !== "";

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveSkinType("all");
    setSearchQuery("");
  };

  return (
    <BrandPageLayout overrideBackground="#FFFFFF">
      <MainHeader />

      <main className="min-h-screen bg-white font-poppins">
        {/* Mezzo Sub-Header */}
        <div className="border-b border-gray-100 bg-white sticky top-16 z-40">
          <div className="container mx-auto px-4">
            {/* Category Navigation */}
            <nav className="flex items-center justify-center gap-6 py-3 overflow-x-auto scrollbar-hide">
              {navCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    whitespace-nowrap text-sm font-medium transition-colors
                    ${activeCategory === cat.id 
                      ? "text-[#C91E5B]" 
                      : "text-gray-600 hover:text-[#C91E5B]"
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Hero Banner Carousel */}
        <section className="relative overflow-hidden">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <img
              src={banners[currentBanner]}
              alt="Mezzo Banner"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          
          {/* Banner Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentBanner === index ? "bg-[#C91E5B] w-6" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Por Categoria Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-3">
              Por categoria
            </h2>
            <p className="text-gray-500 mb-8">
              Encontre os produtos que deseja através de nossas categorias
            </p>

            {/* Main Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {mainCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id === "promocoes" ? "all" : cat.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                    ${cat.id === "corpo" 
                      ? "bg-[#C91E5B] text-white hover:bg-[#A91850]" 
                      : "bg-gray-800 text-white hover:bg-gray-700"
                    }
                  `}
                >
                  <cat.icon className="w-5 h-5" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-12">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-2">
              Nossos Produtos
            </h2>
            <p className="text-gray-500">
              {filteredProducts.length} produtos disponíveis
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
            {/* Left: Category Pills */}
            <div className="flex flex-wrap gap-2">
              {allCategories.slice(0, 8).map((cat) => {
                const count = cat.id === "all" 
                  ? allMezzoWithImages.length 
                  : allMezzoWithImages.filter(p => p.category === cat.id).length;
                
                if (cat.id !== "all" && count === 0) return null;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${activeCategory === cat.id 
                        ? "bg-[#C91E5B] text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }
                    `}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Skin Type & Clear */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`gap-2 border-gray-200 ${
                      activeSkinType !== "all" 
                        ? "border-[#C91E5B] bg-pink-50 text-[#C91E5B]" 
                        : ""
                    }`}
                  >
                    <span>Tipo de Pele</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuLabel>Filtrar por tipo de pele</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {skinTypes.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type.id}
                      checked={activeSkinType === type.id}
                      onCheckedChange={() => setActiveSkinType(type.id)}
                      disabled={skinTypeCounts[type.id] === 0}
                    >
                      <span className="flex-1">{type.label}</span>
                      <span className="text-xs text-gray-400 ml-2">
                        ({skinTypeCounts[type.id]})
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-[#C91E5B]"
                >
                  <X className="w-4 h-4 mr-1" />
                  Limpar
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid 
            products={filteredProducts} 
            columns={4}
          />

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">
                Nenhum produto encontrado.
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-[#C91E5B] text-[#C91E5B] hover:bg-pink-50"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#C91E5B] to-[#E84A7F] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
              Precisa de ajuda para escolher?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Nossa equipe de especialistas pode recomendar os produtos ideais para seu tipo de pele.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-[#C91E5B] hover:bg-gray-100"
                asChild
              >
                <Link to="/loja">Ver Produtos</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/consultoria">Agendar Consultoria</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </BrandPageLayout>
  );
};

export default MezzoPage;
