import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FlaskConical, Leaf, Cpu } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const brands = [
  {
    id: "tulipia",
    name: "Tulípia",
    tagline: "Nanotecnologia Premium",
    description: "Tecnologia nano encapsulada para resultados profissionais.",
    icon: Sparkles,
    href: "/tulipia",
    color: "from-primary/20 to-primary/5",
    accentColor: "text-primary",
    productCount: 80,
  },
  {
    id: "mezzo",
    name: "Mezzo",
    tagline: "Alta Performance",
    description: "Tratamentos estéticos avançados com exossomas e ativos de alta tecnologia.",
    icon: FlaskConical,
    href: "/mezzo",
    color: "from-accent/20 to-accent/5",
    accentColor: "text-accent",
    productCount: 100,
  },
  {
    id: "extratos",
    name: "Extratos da Terra",
    tagline: "Natureza & Ciência",
    description: "Ingredientes naturais com tecnologia cosmética de resultados comprovados.",
    icon: Leaf,
    href: "/extratos-da-terra",
    color: "from-green-500/20 to-green-500/5",
    accentColor: "text-green-600",
    productCount: 60,
  },
  {
    id: "smartgr",
    name: "Smart GR",
    tagline: "Equipamentos Profissionais",
    description: "Aparelhos de última geração para clínicas e profissionais da estética.",
    icon: Cpu,
    href: "/smart-gr",
    color: "from-blue-500/20 to-blue-500/5",
    accentColor: "text-blue-600",
    productCount: 20,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const BrandsSection = () => {
  return (
    <section className="section-editorial bg-secondary/30">
      <div className="container-editorial">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
            Nossas Marcas
          </span>
          <h2 className="font-display text-display-sm md:text-display text-foreground mt-3">
            Marcas de Excelência
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mt-4">
            Trabalhamos com as melhores marcas do mercado de dermocosméticos profissionais
          </p>
        </AnimatedSection>

        {/* Brands Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {brands.map((brand) => (
            <motion.div key={brand.id} variants={itemVariants}>
              <Link
                to={brand.href}
                className="group block h-full bg-card border border-border hover:border-primary/40 hover:shadow-luxury transition-all duration-500 overflow-hidden"
              >
                {/* Brand Header with Gradient */}
                <div className={`relative p-6 pb-12 bg-gradient-to-br ${brand.color}`}>
                  <div className={`inline-flex p-3 rounded-xl bg-background/80 backdrop-blur-sm ${brand.accentColor}`}>
                    <brand.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-card" style={{ 
                    clipPath: "ellipse(60% 100% at 50% 100%)" 
                  }} />
                </div>

                {/* Brand Info */}
                <div className="p-6 pt-2">
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className={`text-sm font-medium ${brand.accentColor} mt-1`}>
                    {brand.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground font-body mt-3 line-clamp-2">
                    {brand.description}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground font-body">
                      {brand.productCount}+ produtos
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsSection;
