import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useCart } from "./CartContext";

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
  };
  button: {
    style: "elegant" | "bold" | "organic" | "technical";
    className: string;
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
    },
    button: {
      style: "elegant",
      className: "bg-[#C97C8A] hover:bg-[#B86B79] text-white font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md",
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
      primary: "34 40% 59%", // #C29A6A dourado claro
      primaryHex: "#C29A6A",
      accent: "34 50% 92%",
      background: "30 20% 98%",
      foreground: "30 10% 15%",
    },
    typography: {
      headingFont: "'Poppins', sans-serif",
      headingClass: "font-poppins",
    },
    button: {
      style: "bold",
      className: "bg-[#C29A6A] hover:bg-[#A88456] text-white font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]",
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
    },
    button: {
      style: "organic",
      className: "bg-[#6FAF8E] hover:bg-[#5D9A7B] text-white font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md",
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
    },
    button: {
      style: "technical",
      className: "bg-[#2F5DA9] hover:bg-[#254A8A] text-white font-medium rounded-none transition-colors duration-150",
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
    },
    button: {
      style: "elegant",
      className: "bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300",
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

interface BrandThemeContextType {
  currentTheme: BrandTheme;
  dominantBrand: BrandName;
  brandCounts: Record<string, number>;
  allBrands: BrandName[];
}

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(undefined);

export const BrandThemeProvider = ({ children }: { children: ReactNode }) => {
  const { items } = useCart();

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

  const currentTheme = BRAND_THEMES[dominantBrand];

  return (
    <BrandThemeContext.Provider value={{ currentTheme, dominantBrand, brandCounts, allBrands }}>
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
