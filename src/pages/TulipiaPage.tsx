import SEOHead from "@/components/seo/SEOHead";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Sparkles, Leaf, FlaskConical, Star, Droplets } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import ProductGrid from "@/components/shop/ProductGrid";
import AnimatedSection from "@/components/home/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBrandProducts } from "@/hooks/useBrandProducts";

import tulipiaHero from "@/assets/banners/tulipia-hero-wide.jpg";

const categoryConfig: Record<string, { label: string; icon?: typeof Star }> = {
  lancamentos: { label: "Lançamentos", icon: Star },
  labial: { label: "Sweet Lips", icon: Sparkles },
  "vitamina-c": { label: "Vitamina C", icon: Star },
  "area-olhos": { label: "Área dos Olhos", icon: FlaskConical },
  mascara: { label: "Máscaras", icon: Leaf },
  "anti-idade": { label: "Anti-idade", icon: Sparkles },
  clareamento: { label: "Clareamento", icon: FlaskConical },
  serum: { label: "Séruns", icon: FlaskConical },
  antiacne: { label: "Antiacne", icon: Leaf },
  corporal: { label: "Corporal", icon: Droplets },
  capilar: { label: "Capilar", icon: Leaf },
  "protetor-solar": { label: "Proteção Solar", icon: Star },
  kit: { label: "Kits", icon: Sparkles },
};

const TulipiaPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const { products, isLoading, categories: catCounts } = useBrandProducts("Tulipia");

  const dynamicCategories = useMemo(() => {
    const cats = [{ id: "all", label: "Todos", count: products.length, icon: undefined as typeof Star | undefined }];
    catCounts.forEach((count, catId) => {
      const config = categoryConfig[catId];
      if (config && count > 0) {
        cats.push({ id: catId, label: config.label, count, icon: config.icon });
      } else if (!config && count > 0) {
        cats.push({ id: catId, label: catId.charAt(0).toUpperCase() + catId.slice(1).replace(/-/g, " "), count, icon: undefined });
      }
    });
    return cats;
  }, [products, catCounts]);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Tulípia Dermocosméticos | Multti Med Porto Alegre"
        description="Linha Tulípia: skincare de alta performance com vitamina C, tratamento labial Sweet Lips, área dos olhos e muito mais."
        canonical="/tulipia"
      />
      <MainHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section with Parallax */}
        <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y, scale }}>
            <img src={tulipiaHero} alt="Linha Tulipia - Dermocosméticos Premium" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" style={{ opacity }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">Linha Premium</Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
                <span className="font-semibold tracking-widest">TULÍPIA</span><br />
                <span className="text-white/80 text-2xl md:text-3xl font-light">Dermocosméticos Premium</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Tecnologia nano encapsulada e ingredientes premium para resultados profissionais. Desenvolvido por especialistas em dermocosmética.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-black hover:bg-black/80 text-white border border-white/20">Ver Produtos</Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
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
                { icon: FlaskConical, label: "Tecnologia Nano", desc: "Ativos encapsulados" },
                { icon: Leaf, label: "Ingredientes Premium", desc: "Alta concentração" },
                { icon: Sparkles, label: "Resultados Visíveis", desc: "Desde a 1ª aplicação" },
                { icon: Star, label: "Uso Profissional", desc: "Clínicas e estéticas" },
              ].map((feature, index) => (
                <motion.div key={feature.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="flex items-center gap-3">
                  <div className="p-2 bg-black/5 rounded-lg border border-black/10"><feature.icon className="w-5 h-5 text-black" /></div>
                  <div><p className="font-medium text-foreground text-sm">{feature.label}</p><p className="text-xs text-muted-foreground">{feature.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <Link to="/loja" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />Voltar para a loja
          </Link>

          <AnimatedSection direction="fade" className="mb-10">
            <div className="flex flex-wrap gap-3">
              {dynamicCategories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeCategory === cat.id ? "bg-black text-white shadow-md" : "bg-secondary text-secondary-foreground hover:bg-black/10"
                  }`}
                >
                  {cat.icon && <cat.icon className="w-4 h-4" />}
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>{cat.count}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up">
            <ProductGrid products={filteredProducts} columns={4} isLoading={isLoading} />
          </AnimatedSection>

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-16"><p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p></div>
          )}
        </section>

        <AnimatedSection direction="fade" className="bg-card border-t border-border">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Precisa de ajuda para escolher?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Nossa equipe de especialistas pode recomendar os produtos ideais para seu tipo de pele e objetivos.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild><Link to="/loja">Ver Produtos</Link></Button>
              <Button variant="outline" size="lg" asChild><Link to="/consultoria">Agendar Consultoria</Link></Button>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <MainFooter />
    </>
  );
};

export default TulipiaPage;
