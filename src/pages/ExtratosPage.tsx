import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowLeft, Leaf, Droplets, Sun, Shield, 
  Sparkles, ChevronDown, Filter, X 
} from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductGrid from "@/components/shop/ProductGrid";
import { BrandPageLayout, BrandHeading } from "@/components/brand";
import AnimatedSection from "@/components/home/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";

// Import Hydra Vit C images
import hydraVitCWhite from "@/assets/products/extratos/hydra-vit-c-white.png";
import hydraVitCOrange from "@/assets/products/extratos/hydra-vit-c-orange-bg.png";
import hydraVitCModel1 from "@/assets/products/extratos/hydra-vit-c-model-1.png";
import hydraVitCModel2 from "@/assets/products/extratos/hydra-vit-c-model-2.png";

// Extratos brand color - green
const EXTRATOS_GREEN = "#6FAF8E";
const EXTRATOS_ORANGE = "#E8823A";

// Navigation categories
const navCategories = [
  { id: "all", label: "Todos" },
  { id: "hidratacao", label: "Hidratação" },
  { id: "clareamento", label: "Clareamento" },
  { id: "antioleosidade", label: "Antioleosidade" },
  { id: "fotoprotecao", label: "Fotoproteção" },
  { id: "serum", label: "Séruns" },
  { id: "limpeza", label: "Limpeza" },
  { id: "lancamentos", label: "Lançamentos" },
];

// Category filters with icons
const categories = [
  { id: "all", label: "Todos", icon: null },
  { id: "hidratacao", label: "Hidratação", icon: Droplets },
  { id: "clareamento", label: "Clareamento", icon: Sun },
  { id: "antioleosidade", label: "Antioleosidade", icon: Leaf },
  { id: "fotoprotecao", label: "Fotoproteção", icon: Shield },
  { id: "serum", label: "Séruns", icon: Droplets },
  { id: "limpeza", label: "Limpeza", icon: Sparkles },
];

// Skin type filters
const skinTypes = [
  { id: "all", label: "Todos os tipos" },
  { id: "oleosa", label: "Pele Oleosa" },
  { id: "seca", label: "Pele Seca" },
  { id: "sensivel", label: "Pele Sensível" },
  { id: "madura", label: "Pele Madura" },
  { id: "manchas", label: "Com Manchas" },
];

// Helper to check if product matches skin type
const matchesSkinType = (product: typeof allExtratosWithImages[0], skinType: string): boolean => {
  if (skinType === "all") return true;
  
  const description = (product.description || "").toLowerCase();
  const name = product.name.toLowerCase();
  const textToSearch = [description, name].join(" ");
  
  switch (skinType) {
    case "oleosa":
      return textToSearch.includes("oleosa") || textToSearch.includes("oleosidade") || 
             textToSearch.includes("antioleosidade") || textToSearch.includes("matific");
    case "seca":
      return textToSearch.includes("seca") || textToSearch.includes("hidrat") || 
             textToSearch.includes("nutritiv");
    case "sensivel":
      return textToSearch.includes("sensível") || textToSearch.includes("sensivel") || 
             textToSearch.includes("calmante");
    case "madura":
      return textToSearch.includes("anti-idade") || textToSearch.includes("lifting") || 
             textToSearch.includes("firmeza") || textToSearch.includes("rugas");
    case "manchas":
      return textToSearch.includes("claread") || textToSearch.includes("manch") || 
             textToSearch.includes("pigment") || textToSearch.includes("melasma");
    default:
      return true;
  }
};

const ExtratosPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSkinType, setActiveSkinType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allExtratosWithImages.filter(product => {
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
      ? allExtratosWithImages 
      : allExtratosWithImages.filter(p => p.category === activeCategory);
    
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

  // Featured banners with Hydra Vit C
  const banners = [
    {
      image: hydraVitCOrange,
      title: "Hydra Vit C",
      subtitle: "Hidratante Facial com Vitamina C",
      description: "Previne o envelhecimento e mantém a hidratação por 72h",
      cta: "Comprar Agora",
    },
    {
      image: hydraVitCModel1,
      title: "Pele Radiante",
      subtitle: "Resultados visíveis desde a primeira aplicação",
      description: "Fórmula com Vitamina C, Acquabio e Ômega Plus",
      cta: "Descubra",
    },
  ];

  return (
    <BrandPageLayout>
      <MainHeader />

      <main className="min-h-screen bg-[#FAFBF8] font-inter">
        {/* Extratos Sub-Header Navigation */}
        <div className="border-b border-[#6FAF8E]/20 bg-white sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center gap-6 py-3 overflow-x-auto scrollbar-hide">
              {navCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    whitespace-nowrap text-sm font-medium transition-colors
                    ${activeCategory === cat.id 
                      ? "text-[#6FAF8E]" 
                      : "text-gray-600 hover:text-[#6FAF8E]"
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Hero Section with Hydra Vit C */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#6FAF8E]/5 via-white to-[#E8823A]/5">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <Badge 
                  className="mb-4 border-0"
                  style={{ backgroundColor: `${EXTRATOS_GREEN}20`, color: EXTRATOS_GREEN }}
                >
                  <Leaf className="w-3 h-3 mr-1" />
                  Natureza & Ciência
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 tracking-tight">
                  <span className="font-semibold">Extratos</span>
                  <br />
                  <span style={{ color: EXTRATOS_GREEN }}>da Terra</span>
                </h1>
                
                <p className="text-lg text-gray-600 mb-6 max-w-lg leading-relaxed">
                  Dermocosméticos que unem o poder dos ingredientes naturais à 
                  tecnologia cosmética avançada. Resultados comprovados com fórmulas suaves.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="rounded-full"
                    style={{ backgroundColor: EXTRATOS_GREEN }}
                  >
                    Ver Produtos
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-gray-300"
                    asChild
                  >
                    <Link to="/quiz-pele">Quiz de Pele</Link>
                  </Button>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Leaf, text: "100% Vegano" },
                    { icon: Shield, text: "Dermatologicamente Testado" },
                    { icon: Droplets, text: "Hidratação 72h" },
                  ].map((feature) => (
                    <div 
                      key={feature.text}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm text-sm"
                    >
                      <feature.icon className="w-4 h-4" style={{ color: EXTRATOS_GREEN }} />
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right - Product Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 lg:order-2 relative"
              >
                <div className="relative">
                  {/* Orange Background Circle */}
                  <div 
                    className="absolute inset-0 rounded-full transform scale-90"
                    style={{ 
                      background: `linear-gradient(135deg, ${EXTRATOS_ORANGE} 0%, #F5A962 100%)`,
                      aspectRatio: '1/1',
                    }}
                  />
                  
                  {/* Main Product Image */}
                  <motion.img
                    src={hydraVitCWhite}
                    alt="Hydra Vit C - Hidratante Facial"
                    className="relative z-10 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500"
                    whileHover={{ rotate: 5 }}
                  />

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg z-20"
                  >
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Destaque</p>
                    <p className="font-semibold text-gray-900">Hydra Vit C</p>
                    <p className="text-sm" style={{ color: EXTRATOS_ORANGE }}>Vitamina C + Ômega</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Model Lifestyle Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl"
              >
                <img
                  src={hydraVitCModel1}
                  alt="Mulher usando Hydra Vit C"
                  className="w-full h-auto object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <Badge 
                  className="border-0"
                  style={{ backgroundColor: `${EXTRATOS_ORANGE}20`, color: EXTRATOS_ORANGE }}
                >
                  Vitamina C Pura
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                  Resultados Visíveis
                  <br />
                  <span style={{ color: EXTRATOS_GREEN }}>Desde a Primeira Aplicação</span>
                </h2>
                
                <p className="text-gray-600 leading-relaxed">
                  O Hydra Vit C combina o poder antioxidante da Vitamina C com a tecnologia
                  Acquabio para uma hidratação profunda que dura 72 horas. Previne o 
                  envelhecimento precoce e uniformiza o tom da pele.
                </p>

                <ul className="space-y-3">
                  {[
                    "Previne o envelhecimento precoce",
                    "Hidratação profunda por 72h",
                    "Ação antioxidante potente",
                    "Uniformiza o tom da pele",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${EXTRATOS_GREEN}20` }}
                      >
                        <Leaf className="w-3 h-3" style={{ color: EXTRATOS_GREEN }} />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  size="lg" 
                  className="rounded-full mt-4"
                  style={{ backgroundColor: EXTRATOS_GREEN }}
                >
                  Comprar Hydra Vit C
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-12">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              Todos os Produtos
            </h2>
            <p className="text-gray-600">
              Encontre o tratamento ideal para sua pele
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((cat) => {
                const count = cat.id === "all" 
                  ? allExtratosWithImages.length 
                  : allExtratosWithImages.filter(p => p.category === cat.id).length;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      flex items-center gap-2
                      ${activeCategory === cat.id 
                        ? "text-white shadow-md" 
                        : "bg-white text-gray-700 border border-gray-200 hover:border-[#6FAF8E]"
                      }
                    `}
                    style={{
                      backgroundColor: activeCategory === cat.id ? EXTRATOS_GREEN : undefined,
                    }}
                  >
                    {cat.icon && <cat.icon className="w-4 h-4" />}
                    {cat.label}
                    <span className={`
                      text-xs px-1.5 py-0.5 rounded-full
                      ${activeCategory === cat.id 
                        ? "bg-white/20 text-white" 
                        : "bg-gray-100 text-gray-500"
                      }
                    `}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Skin Type Filter */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 rounded-full"
                    style={{ 
                      borderColor: activeSkinType !== "all" ? EXTRATOS_GREEN : undefined,
                      color: activeSkinType !== "all" ? EXTRATOS_GREEN : undefined,
                    }}
                  >
                    <Filter className="w-4 h-4" />
                    {skinTypes.find(s => s.id === activeSkinType)?.label || "Tipo de pele"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {skinTypes.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type.id}
                      checked={activeSkinType === type.id}
                      onCheckedChange={() => setActiveSkinType(type.id)}
                    >
                      {type.label}
                      <span className="ml-auto text-xs text-gray-400">
                        {skinTypeCounts[type.id] || 0}
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
                  className="text-gray-500 hover:text-gray-700"
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
              <Leaf className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="rounded-full"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </section>

        {/* Second Model Section */}
        <section className="py-16 bg-gradient-to-br from-[#6FAF8E]/5 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 order-2 md:order-1"
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                  Sua Rotina de Cuidados
                  <br />
                  <span style={{ color: EXTRATOS_GREEN }}>Começa Aqui</span>
                </h2>
                
                <p className="text-gray-600 leading-relaxed">
                  Descubra a linha completa Extratos da Terra e monte uma rotina
                  personalizada para as necessidades da sua pele. Produtos que combinam
                  ingredientes naturais com alta tecnologia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="rounded-full"
                    style={{ backgroundColor: EXTRATOS_GREEN }}
                    asChild
                  >
                    <Link to="/quiz-pele">Fazer Quiz de Pele</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full"
                    asChild
                  >
                    <Link to="/consultoria">Consultoria Gratuita</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="order-1 md:order-2"
              >
                <img
                  src={hydraVitCModel2}
                  alt="Rotina de cuidados com Extratos da Terra"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16"
          style={{ background: `linear-gradient(135deg, ${EXTRATOS_GREEN} 0%, #5D9A7B 100%)` }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Precisa de ajuda para escolher?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Nossa equipe de especialistas pode recomendar os produtos ideais para seu tipo de pele e objetivos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 rounded-full"
                style={{ color: EXTRATOS_GREEN }}
                asChild
              >
                <Link to="/quiz-pele">Fazer Quiz de Pele</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 rounded-full"
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

export default ExtratosPage;
