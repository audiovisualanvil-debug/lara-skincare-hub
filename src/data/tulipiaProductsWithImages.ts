import { Product } from "@/components/shop/ProductCard";

// ============================================
// IMAGENS DOS PRODUTOS TULIPIA
// Linha exclusiva de dermocosméticos profissionais
// ============================================

// Importações das imagens dos banners
import sweetLipsEsfoliante from "@/assets/banners/sweet-lips-esfoliante.webp";
import sweetLipsFluido from "@/assets/banners/sweet-lips-fluido.webp";
import lifeCNano from "@/assets/banners/life-c-nano.webp";
import miracleEyes from "@/assets/banners/miracle-eyes-1.webp";
import primaveraMask from "@/assets/banners/primavera-mask.webp";
import renotratGel from "@/assets/banners/renotrat-gel.webp";
import resilienceSerum from "@/assets/banners/resilience-serum.webp";

// ============================================
// PRODUTOS TULIPIA - SWEET LIPS (LABIAL)
// ============================================

export const tulipiaSweetLips: Product[] = [
  {
    id: 7001,
    name: "Sweet Lips Esfoliante Labial Cereja",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Esfoliante labial com microesferas de cereja. Remove células mortas e prepara os lábios para hidratação",
    price: "R$ 49,00",
    image: sweetLipsEsfoliante,
  },
  {
    id: 7002,
    name: "Sweet Lips Fluido Microagulhamento Labial",
    brand: "Tulipia",
    category: "labial",
    isProfessional: true,
    description: "Fluido para microagulhamento labial profissional. Estimula colágeno e volume natural dos lábios",
    price: "Consultar",
    image: sweetLipsFluido,
  },
];

// ============================================
// PRODUTOS TULIPIA - VITAMINA C
// ============================================

export const tulipiaVitaminaC: Product[] = [
  {
    id: 7101,
    name: "Life C Nano Sabonete Mousse",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sabonete mousse com vitamina C nano encapsulada. Limpa suavemente enquanto ilumina e protege a pele",
    price: "R$ 89,00",
    image: lifeCNano,
  },
];

// ============================================
// PRODUTOS TULIPIA - ÁREA DOS OLHOS
// ============================================

export const tulipiaAreaOlhos: Product[] = [
  {
    id: 7201,
    name: "Miracle Eyes Nano Gel Área dos Olhos",
    brand: "Tulipia",
    category: "area-olhos",
    isProfessional: false,
    description: "Gel com tecnologia nano para área dos olhos. Reduz olheiras, bolsas e linhas de expressão",
    price: "R$ 129,00",
    image: miracleEyes,
  },
];

// ============================================
// PRODUTOS TULIPIA - MÁSCARAS
// ============================================

export const tulipiaMascaras: Product[] = [
  {
    id: 7301,
    name: "Primavera Mask Nano Máscara Renovadora",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Máscara renovadora com tecnologia nano. Promove renovação celular intensa e luminosidade",
    price: "Consultar",
    image: primaveraMask,
  },
];

// ============================================
// PRODUTOS TULIPIA - ANTI-IDADE
// ============================================

export const tulipiaAntiIdade: Product[] = [
  {
    id: 7401,
    name: "Renotrat Gel Facial com DMAE",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Gel facial com DMAE para efeito tensor imediato. Firma e rejuvenesce a pele visivelmente",
    price: "R$ 149,00",
    image: renotratGel,
  },
  {
    id: 7402,
    name: "Resilience Nano Sérum Dermoprotetor",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Sérum dermoprotetor com tecnologia nano. Fortalece a barreira cutânea e protege contra agressões externas",
    price: "R$ 189,00",
    image: resilienceSerum,
  },
];

// ============================================
// EXPORTAÇÃO DE TODOS OS PRODUTOS TULIPIA
// ============================================

export const allTulipiaWithImages: Product[] = [
  ...tulipiaSweetLips,
  ...tulipiaVitaminaC,
  ...tulipiaAreaOlhos,
  ...tulipiaMascaras,
  ...tulipiaAntiIdade,
];
