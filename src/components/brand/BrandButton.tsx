import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useBrandTheme } from "@/contexts/BrandThemeContext";
import { cn } from "@/lib/utils";

interface BrandButtonProps extends Omit<ButtonProps, "variant"> {
  /** Use theme variant instead of standard variant */
  useTheme?: boolean;
}

/**
 * A button that automatically adapts to the current brand theme.
 * Uses the brand's button style and colors when on a brand page.
 */
const BrandButton = React.forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ className, useTheme = true, children, ...props }, ref) => {
    const { currentTheme, isOnBrandPage } = useBrandTheme();

    if (!isOnBrandPage || !useTheme) {
      return (
        <Button ref={ref} className={className} {...props}>
          {children}
        </Button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          "h-10 px-4 py-2",
          currentTheme.button.className,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BrandButton.displayName = "BrandButton";

export default BrandButton;
