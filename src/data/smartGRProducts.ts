// ============================================
// PRODUTOS SMART GR - ATIVOS INTELIGENTES
// ============================================

// Importação das imagens dos produtos
import smartPeptideSkinPro from "@/assets/products/smartgr/smart-peptide-skin-pro.jpg";
import ozonedeepSkinPro from "@/assets/products/smartgr/ozonedeep-skin-pro.jpg";
import smartExoSkinPro from "@/assets/products/smartgr/smart-exo-skin-pro.jpg";
import smartPdrnSkinPro from "@/assets/products/smartgr/smart-pdrn-skin-pro.jpg";
import smartB12SkinPro from "@/assets/products/smartgr/smart-b12-skin-pro.jpg";
import smartBoosterNiacinamida from "@/assets/products/smartgr/smart-booster-niacinamida.jpg";
import smartVitac from "@/assets/products/smartgr/smart-vitac.jpg";
import smartTaBooster from "@/assets/products/smartgr/smart-ta-booster.jpg";
import smartHyaluclar from "@/assets/products/smartgr/smart-hyaluclar.jpg";
import flacipress from "@/assets/products/smartgr/flacipress.jpg";
import smartLipscare from "@/assets/products/smartgr/smart-lipscare.jpg";
import smartHair from "@/assets/products/smartgr/smart-hair.jpg";

export interface SmartGRProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  isProfessional: boolean;
  description: string;
  price: string;
  image?: string;
}

// Smart GR - Linha de Ativos Inteligentes
export const smartGRAtivos: SmartGRProduct[] = [
  {
    id: 6001,
    name: "Smart Peptide Skin Pro",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido facial e corporal que reduz oleosidade, rugas e linhas, promovendo uniformização da textura e tom da pele. Com Ácido Hialurônico, Ácido Tranexâmico e Hexapeptídeo.",
    price: "Consultar",
    image: smartPeptideSkinPro,
  },
  {
    id: 6002,
    name: "Ozonedeep Skin Pro",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido facial e corporal que reduz flacidez, rugas e linhas promovendo efeito lifting. Com Óleo Ozonizado de Girassol, DMAE e Extrato de Chá Verde.",
    price: "Consultar",
    image: ozonedeepSkinPro,
  },
  {
    id: 6003,
    name: "Smart EXO Skin Pro",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido facial e corporal anti-rugas com Exossomos, Ácido Hialurônico, Complexo de 15 aminoácidos e Hexapeptídeo-8.",
    price: "Consultar",
    image: smartExoSkinPro,
  },
  {
    id: 6004,
    name: "Smart PDRN Skin Pro",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido renovador cutâneo extraído do DNA do Salmão. Aumenta firmeza e hidratação, uniformiza tom e textura, reduz sinais de envelhecimento.",
    price: "Consultar",
    image: smartPdrnSkinPro,
  },
  {
    id: 6005,
    name: "Smart B12 Skin Pro",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido uniformizador cutâneo com Vitamina B12, Niacinamida (B3) e Extrato de Centella Asiática. Reduz rugas, controla poros e oleosidade.",
    price: "Consultar",
    image: smartB12SkinPro,
  },
  {
    id: 6006,
    name: "Smart Booster Niacinamida",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido antioxidante cutâneo com Niacinamida, Ácido Hialurônico, Ácido Tranexâmico e Resina de Copaíba. Hidratação profunda e controle de oleosidade.",
    price: "Consultar",
    image: smartBoosterNiacinamida,
  },
  {
    id: 6007,
    name: "Smart Vita C Bio Green",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido antioxidante facial e corporal com Vitamina C, Ácido Hialurônico e tecnologias Bio Green e Octahidro. Previne envelhecimento precoce.",
    price: "Consultar",
    image: smartVitac,
  },
  {
    id: 6008,
    name: "Smart TA Booster",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido anti-age facial e corporal com Hidroxiprolisilane, Alantoína e Complexo Hialurônico. Reduz rugas, aumenta firmeza e elasticidade.",
    price: "Consultar",
    image: smartTaBooster,
  },
  {
    id: 6009,
    name: "Smart Hyaluclar",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Uniformizador cutâneo com Ácido Hialurônico, Ácido Tranexâmico, Vitamina C e Glutationa. Estimula renovação e aumenta hidratação.",
    price: "Consultar",
    image: smartHyaluclar,
  },
  {
    id: 6010,
    name: "Flacipress",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido anti-flacidez facial e corporal com DMAE, Polipeptídeos e Extrato de Chá Verde. Tecnologias Ozonedeep e Octahidro.",
    price: "Consultar",
    image: flacipress,
  },
  {
    id: 6011,
    name: "Smart Lipscare",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Hidratante labial com Ácido Hialurônico e Hexapeptídeo-38. Devolve volume, promove hidratação e estimula rejuvenescimento labial.",
    price: "Consultar",
    image: smartLipscare,
  },
  {
    id: 6012,
    name: "Smart Hair",
    brand: "Smart GR",
    category: "ativos",
    isProfessional: true,
    description: "Fluido capilar anti-queda com Ácido Hialurônico, Peptídeo de Cobre e Colágeno. Reduz queda, estimula crescimento e revitaliza couro cabeludo.",
    price: "Consultar",
    image: smartHair,
  },
  // ========== LINHA CORPORAL ==========
  {
    id: 6013,
    name: "Lipo Reduce",
    brand: "Smart GR",
    category: "corporal",
    isProfessional: true,
    description: "Fluido lipolítico corporal com Fosfatidilcolina, Cafeína e L-Carnitina. Reduz gordura localizada, ativa lipólise e melhora contorno corporal.",
    price: "Consultar",
    image: flacipress, // Placeholder
  },
  {
    id: 6014,
    name: "Cellucare",
    brand: "Smart GR",
    category: "corporal",
    isProfessional: true,
    description: "Fluido anticelulite com Centella Asiática, Ginkgo Biloba e Silício Orgânico. Melhora microcirculação, reduz nódulos e uniformiza textura da pele.",
    price: "Consultar",
    image: flacipress, // Placeholder
  },
  {
    id: 6015,
    name: "Body Firm",
    brand: "Smart GR",
    category: "corporal",
    isProfessional: true,
    description: "Fluido tensor corporal com DMAE, Elastina e Colágeno Hidrolisado. Promove efeito lifting imediato, aumenta firmeza e elasticidade da pele.",
    price: "Consultar",
    image: flacipress, // Placeholder
  },
];

export const smartGRProducts = smartGRAtivos;
export const allSmartGRWithImages = smartGRProducts;
