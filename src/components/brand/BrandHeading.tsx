import React from "react";
import { useBrandTheme, BrandName, getBrandTheme } from "@/contexts/BrandThemeContext";
import { cn } from "@/lib/utils";

interface BrandHeadingProps {
  /** Optional specific brand to use (overrides context) */
  brand?: BrandName;
  /** Heading level */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Content to display */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Use brand color for the heading */
  colored?: boolean;
}

/**
 * A heading component that uses the current brand's typography.
 * Automatically applies the brand's heading font.
 */
const BrandHeading = ({ 
  brand, 
  as: Component = "h2", 
  children, 
  className,
  colored = false,
}: BrandHeadingProps) => {
  const { currentTheme, isOnBrandPage } = useBrandTheme();
  
  const theme = brand ? getBrandTheme(brand) : currentTheme;

  const sizeClasses = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
    h2: "text-3xl md:text-4xl font-bold",
    h3: "text-2xl md:text-3xl font-semibold",
    h4: "text-xl md:text-2xl font-semibold",
    h5: "text-lg md:text-xl font-medium",
    h6: "text-base md:text-lg font-medium",
  };

  return (
    <Component
      className={cn(
        sizeClasses[Component],
        theme.typography.headingClass,
        "transition-colors duration-300",
        className
      )}
      style={{
        fontFamily: theme.typography.headingFont,
        color: colored && isOnBrandPage ? theme.colors.primaryHex : undefined,
      }}
    >
      {children}
    </Component>
  );
};

export default BrandHeading;
