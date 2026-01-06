// ============================================
// PRODUTOS SMART GR
// ============================================

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

// Smart GR - Linha de equipamentos e produtos profissionais
export const smartGRProducts: SmartGRProduct[] = [
  {
    id: 6001,
    name: "GR Nano Infusion Pen",
    brand: "Smart GR",
    category: "equipamentos",
    isProfessional: true,
    description: "Caneta de microagulhamento com tecnologia nano para infusão de ativos",
    price: "Consultar",
    image: "/placeholder.svg",
  },
  {
    id: 6002,
    name: "GR Ultrassom Facial",
    brand: "Smart GR",
    category: "equipamentos",
    isProfessional: true,
    description: "Equipamento de ultrassom para tratamentos faciais profissionais",
    price: "Consultar",
    image: "/placeholder.svg",
  },
  {
    id: 6003,
    name: "GR LED Therapy",
    brand: "Smart GR",
    category: "equipamentos",
    isProfessional: true,
    description: "Equipamento de LED terapia com múltiplas frequências",
    price: "Consultar",
    image: "/placeholder.svg",
  },
  {
    id: 6004,
    name: "GR Radiofrequência",
    brand: "Smart GR",
    category: "equipamentos",
    isProfessional: true,
    description: "Equipamento de radiofrequência para lifting e rejuvenescimento",
    price: "Consultar",
    image: "/placeholder.svg",
  },
  {
    id: 6005,
    name: "GR Peeling Ultrassônico",
    brand: "Smart GR",
    category: "equipamentos",
    isProfessional: true,
    description: "Espátula ultrassônica para limpeza de pele profunda",
    price: "Consultar",
    image: "/placeholder.svg",
  },
  {
    id: 6006,
    name: "GR Dermapen Pro",
    brand: "Smart GR",
    category: "equipamentos",
    isProfessional: true,
    description: "Dermapen profissional com controle de profundidade",
    price: "Consultar",
    image: "/placeholder.svg",
  },
];

export const allSmartGRWithImages = smartGRProducts;
