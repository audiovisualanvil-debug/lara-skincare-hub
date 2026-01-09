import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, FlaskConical, Sparkles, Zap, Shield, Filter, X, ChevronDown } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductGrid from "@/components/shop/ProductGrid";
import AnimatedSection from "@/components/home/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";

// Import banner for hero
import mezzoHero from "@/assets/banners/mezzo-hero-wide.jpg";

// Categories with icons
const categories = [
  { id: "all", label: "Todos", icon: null },
  { id: "exossomas", label: "Exossomas", icon: FlaskConical },
  { id: "capilar", label: "Capilar", icon: Sparkles },
  { id: "corpo", label: "Corporal", icon: Zap },
  { id: "fotoprotetor", label: "Fotoproteção", icon: Shield },
  { id: "homecare", label: "Home Care", icon: Sparkles },
  { id: "limpeza", label: "Limpeza", icon: FlaskConical },
  { id: "vitaminac", label: "Vitamina C", icon: Zap },
  { id: "esfoliacao", label: "Esfoliação", icon: Sparkles },
  { id: "mascaras", label: "Máscaras", icon: FlaskConical },
  { id: "hidratacao", label: "Hidratação", icon: Zap },
  { id: "peeling", label: "Peeling Ácidos", icon: Shield },
  { id: "acnediol", label: "Acnediol", icon: FlaskConical },
  { id: "nutraceuticos", label: "Nutracêuticos", icon: Sparkles },
];

// Skin type filters based on product indications
const skinTypes = [
  { id: "all", label: "Todos os tipos" },
  { id: "oleosa", label: "Pele Oleosa" },
  { id: "seca", label: "Pele Seca" },
  { id: "sensivel", label: "Pele Sensível" },
  { id: "acneica", label: "Pele Acneica" },
  { id: "madura", label: "Pele Madura" },
  { id: "manchas", label: "Com Manchas" },
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
  const [showFilters, setShowFilters] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Filter products based on category and skin type
  const filteredProducts = useMemo(() => {
    return allMezzoWithImages.filter(product => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSkin = matchesSkinType(product, activeSkinType);
      return matchesCategory && matchesSkin;
    });
  }, [activeCategory, activeSkinType]);

  // Count products per skin type for current category
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

  const hasActiveFilters = activeCategory !== "all" || activeSkinType !== "all";

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveSkinType("all");
  };

  return (
    <>
      <MainHeader />

      <main className="min-h-screen bg-background">
        {/* Hero Section with Parallax */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          {/* Background Image with Parallax */}
          <motion.div 
            className="absolute inset-0"
            style={{ y, scale }}
          >
            <img
              src={mezzoHero}
              alt="Linha Mezzo - Alta Performance"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-rose-950/85 via-rose-900/60 to-transparent"
            style={{ opacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <Badge className="mb-4 bg-rose-500/20 text-rose-300 border-rose-500/30 backdrop-blur-sm">
                Alta Performance
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
                <span className="font-semibold">Mezzo</span>
                <br />
                <span className="text-rose-400">Dermocosméticos</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Tratamentos estéticos avançados com exossomas, peptídeos e ativos 
                de última geração. Resultados profissionais garantidos.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white">
                  Ver Produtos
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/consultoria">Consultoria Gratuita</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Bar */}
        <AnimatedSection direction="fade" className="bg-card border-y border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: FlaskConical, label: "Exossomas", desc: "Regeneração celular" },
                { icon: Zap, label: "Peptídeos", desc: "Bioestimulação" },
                { icon: Sparkles, label: "Alta Concentração", desc: "Resultados rápidos" },
                { icon: Shield, label: "Uso Profissional", desc: "Clínicas e estéticas" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 bg-rose-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          {/* Back Link */}
          <Link 
            to="/loja" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a loja
          </Link>

          {/* Filters Section */}
          <AnimatedSection direction="fade" className="mb-10">
            <div className="flex flex-col gap-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Filtros</span>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="text-xs">
                      {filteredProducts.length} produtos
                    </Badge>
                  )}
                </div>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpar filtros
                  </Button>
                )}
              </div>

              {/* Skin Type Dropdown */}
              <div className="flex flex-wrap items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`gap-2 ${activeSkinType !== "all" ? "border-rose-500 bg-rose-500/10 text-rose-600" : ""}`}
                    >
                      <span>Tipo de Pele: {skinTypes.find(s => s.id === activeSkinType)?.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-popover z-50">
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
                        <span className="text-xs text-muted-foreground ml-2">
                          ({skinTypeCounts[type.id]})
                        </span>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const count = cat.id === "all" 
                    ? allMezzoWithImages.length 
                    : allMezzoWithImages.filter(p => p.category === cat.id).length;
                  
                  if (cat.id !== "all" && count === 0) return null;
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                        flex items-center gap-1.5
                        ${activeCategory === cat.id 
                          ? "bg-rose-600 text-white shadow-md" 
                          : "bg-secondary text-secondary-foreground hover:bg-rose-500/10"
                        }
                      `}
                    >
                      {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                      {cat.label}
                      <span className={`
                        text-xs px-1.5 py-0.5 rounded-full
                        ${activeCategory === cat.id 
                          ? "bg-white/20 text-white" 
                          : "bg-muted text-muted-foreground"
                        }
                      `}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Products Grid */}
          <AnimatedSection direction="up">
            <ProductGrid 
              products={filteredProducts} 
              columns={4}
            />
          </AnimatedSection>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <AnimatedSection direction="fade" className="bg-card border-t border-border">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Precisa de ajuda para escolher?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Nossa equipe de especialistas pode recomendar os produtos ideais para seu tipo de pele e objetivos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/quiz-pele">Fazer Quiz de Pele</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/consultoria">Agendar Consultoria</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <MainFooter />
    </>
  );
};

export default MezzoPage;
