import { PromoBanner } from "@/components/shop/PromoBannerCarousel";
import promoVitaminC from "@/assets/banners/life-c-nano-hero.jpg";
import promoExossomas from "@/assets/banners/mezzo-lha-exo-banner.png";
import promoHidratacao from "@/assets/banners/proskin-repair-hero.jpg";
import promoAntiage from "@/assets/banners/resilience-serum-hero.jpg";

const CDN_HERO = "https://kmblagikmhbigsceyqjo.supabase.co/storage/v1/object/public/product-images/hero";
const promoClareamento = `${CDN_HERO}/black-secret-clareador-official.png`;
const promoAcne = `${CDN_HERO}/acne-xsome-promo.png`;

// Sample promo banners for different brands/product lines
export const promoBanners: PromoBanner[] = [
  {
    id: "life-c-nano",
    badge: "Oferta Especial",
    title: "Linha",
    highlight: "Life C Nano",
    description: "Tecnologia nano encapsulada para máxima absorção e luminosidade",
    image: promoVitaminC,
    link: "/shop?categoria=vitamina-c",
    bgColor: "#e8d5c4",
    accentColor: "#c9956c",
  },
  {
    id: "exossomas",
    badge: "Lançamento",
    title: "Linha",
    highlight: "Exossomas",
    description: "Regeneração celular avançada com biotecnologia de última geração",
    image: promoExossomas,
    link: "/shop?categoria=exossomas",
    bgColor: "#f0e6dc",
    accentColor: "#8b7355",
  },
  {
    id: "hidratacao",
    badge: "Mais Vendido",
    title: "Linha",
    highlight: "Hidratação Profunda",
    description: "Ácido hialurônico de múltiplos pesos moleculares para hidratação em todas as camadas",
    image: promoHidratacao,
    link: "/shop?categoria=hidratacao",
    bgColor: "#dce8e8",
    accentColor: "#5a8a8a",
  },
  {
    id: "clareamento",
    badge: "Resultado Comprovado",
    title: "Linha",
    highlight: "Clareamento",
    description: "Ação despigmentante com alfa-arbutin e vitamina C para uma pele uniforme",
    image: promoClareamento,
    link: "/shop?categoria=clareamento",
    bgColor: "#f5e6e0",
    accentColor: "#c48b76",
  },
  {
    id: "antiage",
    badge: "Premium",
    title: "Linha",
    highlight: "Anti-Idade",
    description: "Peptídeos e retinol para redução de rugas e firmeza da pele",
    image: promoAntiage,
    link: "/shop?categoria=antiage",
    bgColor: "#e8e0f0",
    accentColor: "#8b6b9e",
  },
  {
    id: "acne",
    badge: "Tratamento",
    title: "Linha",
    highlight: "Controle de Acne",
    description: "Ácido salicílico e niacinamida para peles oleosas e com tendência acneica",
    image: promoAcne,
    link: "/shop?categoria=acne",
    bgColor: "#e0e8e0",
    accentColor: "#5a7a5a",
  },
];

// Get banners for a specific category
export const getBannersForCategory = (category: string): PromoBanner[] => {
  const categoryBannerMap: Record<string, string[]> = {
    "vitamina-c": ["life-c-nano", "clareamento", "antiage"],
    "exossomas": ["exossomas", "antiage", "hidratacao"],
    "hidratacao": ["hidratacao", "exossomas", "antiage"],
    "clareamento": ["clareamento", "life-c-nano", "antiage"],
    "antiage": ["antiage", "exossomas", "hidratacao"],
    "acne": ["acne", "clareamento", "hidratacao"],
    "home-care": ["hidratacao", "life-c-nano", "clareamento"],
    "limpeza": ["acne", "hidratacao", "clareamento"],
  };

  const bannerIds = categoryBannerMap[category] || ["life-c-nano", "hidratacao", "antiage"];
  return bannerIds.map(id => promoBanners.find(b => b.id === id)!).filter(Boolean);
};

// Get banners for related products based on brand
export const getBannersForBrand = (brand: string): PromoBanner[] => {
  const brandBannerMap: Record<string, string[]> = {
    "Mezzo Dermocosmetics": ["life-c-nano", "hidratacao", "antiage"],
    "Tulipia": ["exossomas", "hidratacao", "clareamento"],
    "Extratos da Terra": ["clareamento", "acne", "hidratacao"],
    "Smart GR": ["antiage", "exossomas", "life-c-nano"],
  };

  const bannerIds = brandBannerMap[brand] || ["life-c-nano", "hidratacao", "antiage"];
  return bannerIds.map(id => promoBanners.find(b => b.id === id)!).filter(Boolean);
};

// Get random banners
export const getRandomBanners = (count: number = 3): PromoBanner[] => {
  const shuffled = [...promoBanners].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
