import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Leaf, Droplets, Sun, Shield } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductGrid from "@/components/shop/ProductGrid";
import AnimatedSection from "@/components/home/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";

// Import hero banner
import extratosHero from "@/assets/banners/extratos-hero-wide.jpg";

const categories = [
  { id: "all", label: "Todos", count: allExtratosWithImages.length },
  { id: "hidratacao", label: "Hidratação", icon: Droplets },
  { id: "clareamento", label: "Clareamento", icon: Sun },
  { id: "antioleosidade", label: "Antioleosidade", icon: Leaf },
  { id: "fotoprotecao", label: "Fotoproteção", icon: Shield },
  { id: "serum", label: "Séruns", icon: Droplets },
  { id: "limpeza", label: "Limpeza", icon: Leaf },
];

const ExtratosPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const filteredProducts = activeCategory === "all" 
    ? allExtratosWithImages 
    : allExtratosWithImages.filter(p => p.category === activeCategory);

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
              src={extratosHero}
              alt="Extratos da Terra - Natureza & Ciência"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/60 to-transparent"
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
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
                Natureza & Ciência
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
                <span className="font-semibold">Extratos</span>
                <br />
                <span className="text-green-400">da Terra</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Dermocosméticos que unem o poder dos ingredientes naturais à 
                tecnologia cosmética avançada. Resultados comprovados com fórmulas suaves.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
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
                { icon: Leaf, label: "Ingredientes Naturais", desc: "Extratos vegetais" },
                { icon: Droplets, label: "Hidratação Profunda", desc: "Pele saudável" },
                { icon: Sun, label: "Proteção Diária", desc: "FPS avançado" },
                { icon: Shield, label: "Dermatologicamente Testado", desc: "Segurança garantida" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-green-600" />
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

          {/* Category Filter */}
          <AnimatedSection direction="fade" className="mb-10">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const count = cat.id === "all" 
                  ? allExtratosWithImages.length 
                  : allExtratosWithImages.filter(p => p.category === cat.id).length;
                
                if (cat.id !== "all" && count === 0) return null;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      flex items-center gap-2
                      ${activeCategory === cat.id 
                        ? "bg-green-600 text-white shadow-md" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }
                    `}
                  >
                    {cat.icon && <cat.icon className="w-4 h-4" />}
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

export default ExtratosPage;
