import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useCart } from "./CartContext";
import { useLocation } from "react-router-dom";

// Brand theme types
export type BrandName = "tulipia" | "mezzo" | "extratos" | "smartgr" | "neutral";

export interface BrandTheme {
  name: BrandName;
  displayName: string;
  colors: {
    primary: string; // HSL format for CSS variables
    primaryHex: string; // Hex for inline styles
    accent: string;
    background: string;
    foreground: string;
  };
  typography: {
    headingFont: string;
    headingClass: string;
    bodyClass: string;
  };
  button: {
    style: "elegant" | "bold" | "organic" | "technical";
    className: string;
  };
  icon: {
    style: "elegant" | "rounded" | "organic" | "sharp";
    strokeWidth: number;
  };
  cart: {
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    drawerAccent: string;
  };
  navigation: {
    style: "clean" | "gradient" | "bordered" | "minimal";
    activeClassName: string;
    hoverClassName: string;
  };
  microcopy: {
    ctaText: string;
    thankYou: string;
    processing: string;
    securityNote: string;
  };
}

// Theme definitions
const BRAND_THEMES: Record<BrandName, BrandTheme> = {
  tulipia: {
    name: "tulipia",
    displayName: "Tulípia",
    colors: {
      primary: "349 44% 63%", // #C97C8A rosé tecnológico
      primaryHex: "#C97C8A",
      accent: "349 30% 90%",
      background: "0 0% 98%",
      foreground: "0 0% 20%",
    },
    typography: {
      headingFont: "'Montserrat', sans-serif",
      headingClass: "font-montserrat",
      bodyClass: "font-sans",
    },
    button: {
      style: "elegant",
      className: "bg-[#C97C8A] hover:bg-[#B86B79] text-white font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md",
    },
    icon: {
      style: "elegant",
      strokeWidth: 1.5,
    },
    cart: {
      iconColor: "#C97C8A",
      badgeBg: "#C97C8A",
      badgeText: "#FFFFFF",
      drawerAccent: "#C97C8A",
    },
    navigation: {
      style: "minimal",
      activeClassName: "text-[#C97C8A] border-b-2 border-[#C97C8A]",
      hoverClassName: "hover:text-[#C97C8A] transition-colors",
    },
    microcopy: {
      ctaText: "Finalizar Compra",
      thankYou: "Agradecemos pela confiança em nossa tecnologia.",
      processing: "Processando seu pedido com cuidado...",
      securityNote: "Transação protegida por criptografia de ponta.",
    },
  },
  mezzo: {
    name: "mezzo",
    displayName: "Mezzo",
    colors: {
      primary: "338 75% 45%", // #C91E5B magenta/rosa
      primaryHex: "#C91E5B",
      accent: "338 50% 92%",
      background: "0 0% 100%",
      foreground: "0 0% 15%",
    },
    typography: {
      headingFont: "'Poppins', sans-serif",
      headingClass: "font-poppins",
      bodyClass: "font-poppins",
    },
    button: {
      style: "bold",
      className: "bg-[#C91E5B] hover:bg-[#A8184D] text-white font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]",
    },
    icon: {
      style: "rounded",
      strokeWidth: 2,
    },
    cart: {
      iconColor: "#C91E5B",
      badgeBg: "#C91E5B",
      badgeText: "#FFFFFF",
      drawerAccent: "#C91E5B",
    },
    navigation: {
      style: "clean",
      activeClassName: "text-[#C91E5B] font-semibold",
      hoverClassName: "hover:text-[#C91E5B] transition-colors",
    },
    microcopy: {
      ctaText: "Garantir Resultados",
      thankYou: "Seu caminho para resultados extraordinários começa agora.",
      processing: "Preparando sua experiência de alta performance...",
      securityNote: "Pagamento 100% seguro e garantido.",
    },
  },
  extratos: {
    name: "extratos",
    displayName: "Extratos da Terra",
    colors: {
      primary: "147 28% 56%", // #6FAF8E verde suave
      primaryHex: "#6FAF8E",
      accent: "147 40% 92%",
      background: "90 20% 98%",
      foreground: "150 10% 20%",
    },
    typography: {
      headingFont: "'Inter', sans-serif",
      headingClass: "font-inter",
      bodyClass: "font-inter",
    },
    button: {
      style: "organic",
      className: "bg-[#6FAF8E] hover:bg-[#5D9A7B] text-white font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md",
    },
    icon: {
      style: "organic",
      strokeWidth: 1.75,
    },
    cart: {
      iconColor: "#6FAF8E",
      badgeBg: "#6FAF8E",
      badgeText: "#FFFFFF",
      drawerAccent: "#6FAF8E",
    },
    navigation: {
      style: "bordered",
      activeClassName: "text-[#6FAF8E] border-b-2 border-[#6FAF8E]",
      hoverClassName: "hover:text-[#6FAF8E] transition-colors",
    },
    microcopy: {
      ctaText: "Completar Pedido",
      thankYou: "Obrigado por escolher o equilíbrio natural.",
      processing: "Cuidando do seu pedido com carinho...",
      securityNote: "Compra segura, naturalmente.",
    },
  },
  smartgr: {
    name: "smartgr",
    displayName: "Smart GR",
    colors: {
      primary: "217 56% 42%", // #2F5DA9 azul técnico
      primaryHex: "#2F5DA9",
      accent: "217 50% 92%",
      background: "210 10% 98%",
      foreground: "210 15% 15%",
    },
    typography: {
      headingFont: "'Roboto', sans-serif",
      headingClass: "font-roboto",
      bodyClass: "font-roboto",
    },
    button: {
      style: "technical",
      className: "bg-[#2F5DA9] hover:bg-[#254A8A] text-white font-medium rounded-none transition-colors duration-150",
    },
    icon: {
      style: "sharp",
      strokeWidth: 2,
    },
    cart: {
      iconColor: "#2F5DA9",
      badgeBg: "#2F5DA9",
      badgeText: "#FFFFFF",
      drawerAccent: "#2F5DA9",
    },
    navigation: {
      style: "gradient",
      activeClassName: "text-[#2F5DA9] font-medium",
      hoverClassName: "hover:text-[#2F5DA9] transition-colors",
    },
    microcopy: {
      ctaText: "Confirmar Pedido",
      thankYou: "Pedido confirmado. Você receberá os detalhes por e-mail.",
      processing: "Processando...",
      securityNote: "Transação criptografada SSL.",
    },
  },
  neutral: {
    name: "neutral",
    displayName: "DermoStore",
    colors: {
      primary: "16 45% 55%", // Terracotta
      primaryHex: "#C2785C",
      accent: "25 30% 92%",
      background: "30 20% 98%",
      foreground: "20 15% 12%",
    },
    typography: {
      headingFont: "'Cormorant Garamond', serif",
      headingClass: "font-display",
      bodyClass: "font-body",
    },
    button: {
      style: "elegant",
      className: "bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300",
    },
    icon: {
      style: "elegant",
      strokeWidth: 1.5,
    },
    cart: {
      iconColor: "#C2785C",
      badgeBg: "#C2785C",
      badgeText: "#FFFFFF",
      drawerAccent: "#C2785C",
    },
    navigation: {
      style: "minimal",
      activeClassName: "text-primary font-medium",
      hoverClassName: "hover:text-primary transition-colors",
    },
    microcopy: {
      ctaText: "Finalizar Compra",
      thankYou: "Obrigado pela sua compra!",
      processing: "Processando seu pedido...",
      securityNote: "Compra 100% segura.",
    },
  },
};

// Map brand strings to theme keys
const BRAND_MAP: Record<string, BrandName> = {
  "Tulipia": "tulipia",
  "Tulípia": "tulipia",
  "tulipia": "tulipia",
  "Mezzo": "mezzo",
  "mezzo": "mezzo",
  "Extratos da Terra": "extratos",
  "extratos": "extratos",
  "Smart GR": "smartgr",
  "smartgr": "smartgr",
};

// Route to brand mapping
const ROUTE_BRAND_MAP: Record<string, BrandName> = {
  "/mezzo": "mezzo",
  "/tulipia": "tulipia",
  "/extratos-da-terra": "extratos",
  "/smart-gr": "smartgr",
};

interface BrandThemeContextType {
  currentTheme: BrandTheme;
  routeTheme: BrandTheme | null;
  dominantBrand: BrandName;
  brandCounts: Record<string, number>;
  allBrands: BrandName[];
  isOnBrandPage: boolean;
}

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(undefined);

export const BrandThemeProvider = ({ children }: { children: ReactNode }) => {
  const { items } = useCart();
  const location = useLocation();

  // Detect brand from current route
  const routeBrand = useMemo(() => {
    const pathname = location.pathname;
    for (const [route, brand] of Object.entries(ROUTE_BRAND_MAP)) {
      if (pathname.startsWith(route)) {
        return brand;
      }
    }
    return null;
  }, [location.pathname]);

  const { dominantBrand, brandCounts, allBrands } = useMemo(() => {
    const counts: Record<string, number> = {};
    
    items.forEach((item) => {
      const normalizedBrand = BRAND_MAP[item.brand] || "neutral";
      counts[normalizedBrand] = (counts[normalizedBrand] || 0) + item.quantity;
    });

    // Find dominant brand (most items)
    let dominant: BrandName = "neutral";
    let maxCount = 0;
    
    Object.entries(counts).forEach(([brand, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominant = brand as BrandName;
      }
    });

    const brands = Object.keys(counts).filter(b => b !== "neutral") as BrandName[];

    return {
      dominantBrand: dominant,
      brandCounts: counts,
      allBrands: brands.length > 0 ? brands : ["neutral" as BrandName],
    };
  }, [items]);

  // Use route brand if on a brand page, otherwise use dominant brand from cart
  const activeThemeName = routeBrand || dominantBrand;
  const currentTheme = BRAND_THEMES[activeThemeName];
  const routeTheme = routeBrand ? BRAND_THEMES[routeBrand] : null;

  return (
    <BrandThemeContext.Provider value={{ 
      currentTheme, 
      routeTheme,
      dominantBrand, 
      brandCounts, 
      allBrands,
      isOnBrandPage: routeBrand !== null,
    }}>
      {children}
    </BrandThemeContext.Provider>
  );
};

export const useBrandTheme = () => {
  const context = useContext(BrandThemeContext);
  if (!context) {
    throw new Error("useBrandTheme must be used within a BrandThemeProvider");
  }
  return context;
};

export const getBrandTheme = (brand: BrandName) => BRAND_THEMES[brand];
