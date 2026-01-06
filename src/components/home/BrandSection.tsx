import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCarousel from "@/components/shop/ProductCarousel";
import AnimatedSection from "./AnimatedSection";

interface Product {
  id: number;
  name: string;
  brand: string;
  price?: string;
  image?: string;
}

interface BrandSectionProps {
  brand: string;
  title: string;
  subtitle: string;
  products: Product[];
  linkTo: string;
  linkLabel: string;
  accentColor?: string;
  bgVariant?: "light" | "dark" | "gradient";
}

const BrandSection = ({
  brand,
  title,
  subtitle,
  products,
  linkTo,
  linkLabel,
  bgVariant = "light",
}: BrandSectionProps) => {
  const bgClasses = {
    light: "bg-background",
    dark: "bg-secondary/30",
    gradient: "bg-gradient-to-b from-secondary/20 to-background",
  };

  return (
    <section className={`section-editorial ${bgClasses[bgVariant]} relative overflow-hidden`}>
      {/* Decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
      />

      <div className="container-editorial relative z-10">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
              {brand}
            </span>
            <h2 className="font-display text-display-sm md:text-display text-foreground mt-3">
              {title}
            </h2>
            <p className="text-muted-foreground font-body mt-4 max-w-lg">
              {subtitle}
            </p>
          </div>
          <Link
            to={linkTo}
            className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors font-body font-medium group"
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ProductCarousel products={products} />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BrandSection;
