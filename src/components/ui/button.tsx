import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-body tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/85",
        outline: "border border-border bg-transparent hover:bg-primary/10 hover:border-primary/50 hover:text-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        // Elegante com borda
        elegant: "bg-transparent border border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary font-body tracking-widest",
        // Botão dourado sólido
        gold: "bg-gold text-noir hover:bg-gold-light hover:shadow-md font-body tracking-widest",
        // Botão transparente com borda dourada
        "gold-outline": "bg-transparent border border-gold/50 text-gold hover:bg-gold/10 hover:border-gold font-body tracking-widest",
        // Rosa primário sólido - CTA principal
        primary: "bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-lg shadow-sm font-body uppercase tracking-widest",
        // Rosa outline
        "primary-outline": "bg-transparent border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-body tracking-widest",
        // WhatsApp
        whatsapp: "bg-[#25D366] text-white hover:bg-[#20BD5A] hover:shadow-md",
      },
      size: {
        default: "h-11 px-7 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-12 px-8 text-sm",
        xl: "h-14 px-10 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
