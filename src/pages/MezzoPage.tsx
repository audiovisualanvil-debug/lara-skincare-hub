import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, Sparkles, Zap, Shield } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductGrid from "@/components/shop/ProductGrid";
import AnimatedSection from "@/components/home/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";

// Import a banner image
import resilienceSerum from "@/assets/banners/resilience-serum-hero.jpg";

// Get unique categories from products
const getCategories = () => {
  const categorySet = new Set<string>();
  allMezzoWithImages.forEach(p => {
    if (p.category) categorySet.add(p.category);
  });
  return Array.from(categorySet);
};

const categories = [
  { id: "all", label: "Todos", count: allMezzoWithImages.length },
  { id: "exossomas", label: "Exossomas", icon: FlaskConical },
  { id: "clareamento", label: "Clareamento", icon: Sparkles },
  { id: "antiacne", label: "Antiacne", icon: Shield },
  { id: "anti-idade", label: "Anti-idade", icon: Zap },
  { id: "corporal", label: "Corporal", icon: Sparkles },
  { id: "capilar", label: "Capilar", icon: FlaskConical },
  { id: "fotoprotecao", label: "Fotoproteção", icon: Shield },
];

const MezzoPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? allMezzoWithImages 
    : allMezzoWithImages.filter(p => p.category === activeCategory);

  return (
    <>
      <MainHeader />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={resilienceSerum}
              alt="Linha Mezzo - Alta Performance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 backdrop-blur-sm">
                Alta Performance
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
                <span className="font-semibold">Mezzo</span>
                <br />
                <span className="text-accent">Dermocosméticos</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Tratamentos estéticos avançados com exossomas, peptídeos e ativos 
                de última geração. Resultados profissionais garantidos.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
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
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-accent" />
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
                  ? allMezzoWithImages.length 
                  : allMezzoWithImages.filter(p => p.category === cat.id).length;
                
                if (cat.id !== "all" && count === 0) return null;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      flex items-center gap-2
                      ${activeCategory === cat.id 
                        ? "bg-accent text-accent-foreground shadow-md" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }
                    `}
                  >
                    {cat.icon && <cat.icon className="w-4 h-4" />}
                    {cat.label}
                    <span className={`
                      text-xs px-1.5 py-0.5 rounded-full
                      ${activeCategory === cat.id 
                        ? "bg-accent-foreground/20 text-accent-foreground" 
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

export default MezzoPage;
