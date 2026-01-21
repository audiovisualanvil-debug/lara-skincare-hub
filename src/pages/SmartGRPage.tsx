import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Droplets, Sparkles, Beaker, Leaf, Heart, Activity, FlaskConical, Syringe } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductGrid from "@/components/shop/ProductGrid";
import AnimatedSection from "@/components/home/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allSmartGRWithImages } from "@/data/smartGRProducts";

// Import hero banner
import smartgrHero from "@/assets/banners/smartgr-hero-wide.jpg";

// Contagem por categoria
const getCategoryCount = (category: string) => 
  category === "all" 
    ? allSmartGRWithImages.length 
    : allSmartGRWithImages.filter(p => p.category === category).length;

const categories = [
  { id: "all", label: "Todos", count: getCategoryCount("all") },
  { id: "ativos", label: "Ativos Skin Pro", icon: Droplets, count: getCategoryCount("ativos") },
  { id: "corporal", label: "Corporal", icon: Activity, count: getCategoryCount("corporal") },
  { id: "peelings", label: "Peelings", icon: FlaskConical, count: getCategoryCount("peelings") },
  { id: "microagulhamento", label: "Microagulhamento", icon: Syringe, count: getCategoryCount("microagulhamento") },
];

const SmartGRPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const filteredProducts = activeCategory === "all" 
    ? allSmartGRWithImages 
    : allSmartGRWithImages.filter(p => p.category === activeCategory);

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
              src={smartgrHero}
              alt="Smart GR - Ativos Inteligentes"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 via-indigo-900/60 to-transparent"
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
              <Badge className="mb-4 bg-indigo-500/20 text-indigo-300 border-indigo-500/30 backdrop-blur-sm">
                Estética Profissional
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
                <span className="font-semibold">Smart</span>
                <span className="text-indigo-400">GR</span>
                <br />
                <span className="text-indigo-300 text-3xl md:text-4xl">Estética Profissional</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed max-w-lg">
                Tecnologia Bio Green e Octahidro para resultados profissionais. 
                Ativos de alta performance para protocolos clínicos avançados.
              </p>

              {/* Eco Badges */}
              <div className="flex gap-3 mb-8">
                <Badge variant="outline" className="border-indigo-400/50 text-indigo-300 bg-indigo-500/10">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco Friendly
                </Badge>
                <Badge variant="outline" className="border-indigo-400/50 text-indigo-300 bg-indigo-500/10">
                  <Heart className="w-3 h-3 mr-1" />
                  Cruelty Free
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Ver Ativos
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/contato">Fale Conosco</Link>
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
                { icon: Beaker, label: "Bio Green", desc: "Tecnologia sustentável" },
                { icon: Droplets, label: "Octahidro", desc: "Máxima penetração" },
                { icon: Sparkles, label: "Skin Pro", desc: "Resultados profissionais" },
                { icon: Leaf, label: "Eco Friendly", desc: "Formulações verdes" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-indigo-600" />
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
                  ? allSmartGRWithImages.length 
                  : allSmartGRWithImages.filter(p => p.category === cat.id).length;
                
                if (cat.id !== "all" && count === 0) return null;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      flex items-center gap-2
                      ${activeCategory === cat.id 
                        ? "bg-indigo-600 text-white shadow-md" 
                        : "bg-secondary text-secondary-foreground hover:bg-indigo-500/10"
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
        <AnimatedSection direction="fade" className="bg-indigo-700">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Quer conhecer nossos ativos inteligentes?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Entre em contato para saber mais sobre nossas soluções dermatológicas 
              e como aplicá-las em seus protocolos profissionais.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90" asChild>
                <Link to="/contato">Entrar em Contato</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
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

export default SmartGRPage;
