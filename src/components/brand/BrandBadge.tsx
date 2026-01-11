import React from "react";
import { useBrandTheme, BrandName, getBrandTheme } from "@/contexts/BrandThemeContext";
import { cn } from "@/lib/utils";

interface BrandBadgeProps {
  /** Optional specific brand to use (overrides context) */
  brand?: BrandName;
  /** Content to display inside the badge */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

/**
 * A badge component that adapts to the current brand theme.
 * Can also be used with a specific brand override.
 */
const BrandBadge = ({ brand, children, className, size = "md" }: BrandBadgeProps) => {
  const { currentTheme } = useBrandTheme();
  
  const theme = brand ? getBrandTheme(brand) : currentTheme;

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-300",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: theme.cart.badgeBg,
        color: theme.cart.badgeText,
      }}
    >
      {children}
    </span>
  );
};

export default BrandBadge;
