import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useBrandTheme } from "@/contexts/BrandThemeContext";

interface BrandPageLayoutProps {
  children: React.ReactNode;
  /** Override theme colors for this page */
  overrideBackground?: string;
}

/**
 * A layout wrapper that provides smooth transitions when navigating between brand pages.
 * Automatically applies the current brand's background and foreground colors with animation.
 */
const BrandPageLayout = ({ children, overrideBackground }: BrandPageLayoutProps) => {
  const location = useLocation();
  const { currentTheme, isOnBrandPage, dominantBrand } = useBrandTheme();

  // Add brand-specific class to body for global styling
  useEffect(() => {
    if (isOnBrandPage) {
      document.body.setAttribute('data-brand', currentTheme.name);
      document.body.classList.add('brand-transition');
    } else {
      document.body.removeAttribute('data-brand');
    }
    
    return () => {
      document.body.removeAttribute('data-brand');
      document.body.classList.remove('brand-transition');
    };
  }, [isOnBrandPage, currentTheme.name]);

  const backgroundColor = overrideBackground || `hsl(${currentTheme.colors.background})`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + dominantBrand}
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: 1,
          backgroundColor,
        }}
        exit={{ opacity: 0.8 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1],
        }}
        className="min-h-screen brand-transition"
        style={{
          color: `hsl(${currentTheme.colors.foreground})`,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BrandPageLayout;
