import { Product } from "@/components/shop/ProductCard";

// ============================================
// IMAGENS DOS PRODUTOS TULIPIA
// Linha exclusiva de dermocosméticos profissionais
// ============================================

// Importações das imagens dos banners existentes
import sweetLipsEsfoliante from "@/assets/banners/sweet-lips-esfoliante.webp";
import sweetLipsFluido from "@/assets/banners/sweet-lips-fluido.webp";
import lifeCNano from "@/assets/banners/life-c-nano.webp";
import miracleEyes from "@/assets/banners/miracle-eyes-1.webp";
import primaveraMask from "@/assets/banners/primavera-mask.webp";
import renotratGel from "@/assets/banners/renotrat-gel.webp";
import resilienceSerum from "@/assets/banners/resilience-serum.webp";

// Importações das novas imagens Tulipia
import exogeneticPdrn from "@/assets/products/tulipia/exogenetic-pdrn.jpg";
import niacineEspuma150ml from "@/assets/products/tulipia/niacine-espuma-150ml.jpg";
import niacineEspuma50ml from "@/assets/products/tulipia/niacine-espuma-150ml-new.jpg";
import blackSecretPeelingAntiacne from "@/assets/products/tulipia/black-secret-peeling-antiacne.jpg";
import blackSecretPeeling2Fases from "@/assets/products/tulipia/black-secret-peeling-2-fases.jpg";
import blackSecretSaboneteGlico from "@/assets/products/tulipia/black-secret-sabonete-glico.jpg";
import blackSecretSolucaoPrePeeling from "@/assets/products/tulipia/black-secret-solucao-pre-peeling.jpg";
import blackSecretClareador from "@/assets/products/tulipia/black-secret-clareador.jpg";
import blackSecretMicroSpikes from "@/assets/products/tulipia/black-secret-micro-spikes.jpg";
import blackBiowhiteLocao from "@/assets/products/tulipia/black-biowhite-locao.jpg";
import proskinSabonete from "@/assets/products/tulipia/proskin-sabonete.jpg";
import proskinBruma from "@/assets/products/tulipia/proskin-bruma.jpg";
import proskinCreme from "@/assets/products/tulipia/proskin-creme.jpg";
import dermoEsteticUltraemoliente from "@/assets/products/tulipia/dermo-estetic-ultraemoliente.jpg";
import dermoEsteticPosExtracao from "@/assets/products/tulipia/dermo-estetic-pos-extracao.jpg";
import niacineSerum from "@/assets/products/tulipia/niacine-serum.jpg";
import dermacosBooster from "@/assets/products/tulipia/dermacos-booster.jpg";
import dermacosEspuma from "@/assets/products/tulipia/dermacos-espuma.jpg";
import immortaliteCSerum from "@/assets/products/tulipia/immortalite-c-serum.jpg";
import hydrogenBruma from "@/assets/products/tulipia/hydrogen-bruma.jpg";
import firmFlaccid300ml from "@/assets/products/tulipia/firm-flaccid-300ml.jpg";
import firmFlaccid60ml from "@/assets/products/tulipia/firm-flaccid-60ml.jpg";
import lifeCMascaraImg from "@/assets/products/tulipia/life-c-mascara.jpg";
import lifeCPeelingImg from "@/assets/products/tulipia/life-c-peeling.jpg";
import lifeCSerum20Img from "@/assets/products/tulipia/life-c-serum-20.jpg";
import lifeCMonodoseImg from "@/assets/products/tulipia/life-c-monodose.jpg";
import lifeCTonicoImg from "@/assets/products/tulipia/life-c-tonico.jpg";
import lifeCsaboneteMouseImg from "@/assets/products/tulipia/life-c-sabonete-mousse.jpg";
import sweetLipsEsfolianteImg from "@/assets/products/tulipia/sweet-lips-esfoliante.jpg";
import sweetLipsGlossImg from "@/assets/products/tulipia/sweet-lips-gloss.jpg";
import chokolaMascaraImg from "@/assets/products/tulipia/chokola-mascara.jpg";
import ultimateEsteticMascaraImg from "@/assets/products/tulipia/ultimate-estetic-mascara.jpg";
import outonoMaskImg from "@/assets/products/tulipia/outono-mask.jpg";
import primaveraMaskImg from "@/assets/products/tulipia/primavera-mask.jpg";
import veraoMaskImg from "@/assets/products/tulipia/verao-mask.jpg";
import invernoMaskImg from "@/assets/products/tulipia/inverno-mask.jpg";
import stellarMaskEnzimaticaImg from "@/assets/products/tulipia/stellar-mask-enzimatica.jpg";
import stellarMaskMatificanteImg from "@/assets/products/tulipia/stellar-mask-matificante.jpg";
import stellarMaskRejuvenescedoraImg from "@/assets/products/tulipia/stellar-mask-rejuvenescedora.jpg";
import stellarMaskHidronutritivaImg from "@/assets/products/tulipia/stellar-mask-hidronutritiva.jpg";
import miracleEyesImg from "@/assets/products/tulipia/miracle-eyes.jpg";
import cilsLashesImg from "@/assets/products/tulipia/cils-lashes.jpg";
import hialuxSaboneteImg from "@/assets/products/tulipia/hialux-sabonete.jpg";
import hialuxSerumImg from "@/assets/products/tulipia/hialux-serum.jpg";
import hialuxCremeImg from "@/assets/products/tulipia/hialux-creme.jpg";
import hidrasolFps30Img from "@/assets/products/tulipia/hidrasol-fps30.jpg";
import citrogelClareadorImg from "@/assets/products/tulipia/citrogel-clareador.jpg";
import renotratGelImg from "@/assets/products/tulipia/renotrat-gel.jpg";

// Placeholder para produtos sem imagem
const placeholder = "/placeholder.svg";

// ============================================
// LANÇAMENTOS
// ============================================

export const tulipiaLancamentos: Product[] = [
  {
    id: 7001,
    name: "Exogenetic PDRN Creme Facial",
    brand: "Tulipia",
    category: "lancamentos",
    isProfessional: false,
    description: "Creme facial com tecnologia PDRN para regeneração celular profunda. Estimula a produção de colágeno e elastina",
    price: "R$ 139,90",
    image: exogeneticPdrn,
  },
  {
    id: 7002,
    name: "Niacine+ Espuma de Limpeza de Niacinamida 150ml",
    brand: "Tulipia",
    category: "lancamentos",
    isProfessional: false,
    description: "Espuma de limpeza facial com niacinamida. Limpa profundamente e controla a oleosidade",
    price: "R$ 94,90",
    image: niacineEspuma150ml,
  },
  {
    id: 7003,
    name: "Niacine+ Espuma de Limpeza de Niacinamida 50ml",
    brand: "Tulipia",
    category: "lancamentos",
    isProfessional: false,
    description: "Espuma de limpeza facial com niacinamida - versão travel size",
    price: "R$ 49,90",
    image: niacineEspuma50ml,
  },
];

// ============================================
// BLACK SECRET - Linha Clareamento
// ============================================

export const tulipiaBlackSecret: Product[] = [
  {
    id: 7010,
    name: "Black Secret Peeling Antiacne 30ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "Peeling profissional para tratamento de acne. Reduz inflamação e clareia manchas pós-inflamatórias",
    price: "R$ 199,86",
    image: blackSecretPeelingAntiacne,
  },
  {
    id: 7011,
    name: "Black Secret Peeling Facial 2 Fases",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "Peeling profissional de duas fases para renovação celular intensa e clareamento progressivo",
    price: "R$ 714,14",
    image: blackSecretPeeling2Fases,
  },
  {
    id: 7012,
    name: "Black Secret Sabonete Glico-Renovador 300ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Sabonete facial com ácido glicólico para renovação celular e preparo da pele",
    price: "R$ 180,00",
    image: blackSecretSaboneteGlico,
  },
  {
    id: 7013,
    name: "Black Secret Solução Pré-Peeling Desengordurante 120ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "Solução preparatória para peelings. Remove oleosidade e prepara a pele para tratamentos",
    price: "R$ 170,00",
    image: blackSecretSolucaoPrePeeling,
  },
  {
    id: 7014,
    name: "Black Secret Clareador Concentrado 60ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Sérum clareador concentrado para tratamento de manchas e uniformização do tom da pele",
    price: "R$ 199,00",
    image: blackSecretClareador,
  },
  {
    id: 7015,
    name: "Black Secret Micro Spikes Peeling 30g",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "Peeling com microagulhas naturais para renovação profunda e clareamento",
    price: "R$ 220,00",
    image: blackSecretMicroSpikes,
  },
  {
    id: 7016,
    name: "Black Biowhite Nano Loção Clareadora 60ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Loção clareadora com tecnologia nano para tratamento de manchas e melasma",
    price: "R$ 149,00",
    image: blackBiowhiteLocao,
  },
];

// ============================================
// PROSKIN REPAIR - Barreira Cutânea
// ============================================

export const tulipiaProskinRepair: Product[] = [
  {
    id: 7020,
    name: "ProSkin Repair Sabonete Restaurador 110ml",
    brand: "Tulipia",
    category: "barreira-cutanea",
    isProfessional: false,
    description: "Sabonete suave para restauração da barreira cutânea. Ideal para peles sensibilizadas",
    price: "R$ 79,90",
    image: proskinSabonete,
  },
  {
    id: 7021,
    name: "ProSkin Repair Bruma Dermatológica 55ml",
    brand: "Tulipia",
    category: "barreira-cutanea",
    isProfessional: false,
    description: "Bruma hidratante para proteção e restauração da barreira cutânea",
    price: "R$ 119,90",
    image: proskinBruma,
  },
  {
    id: 7022,
    name: "ProSkin Repair Creme Fortalecedor de Barreira 30g",
    brand: "Tulipia",
    category: "barreira-cutanea",
    isProfessional: false,
    description: "Creme concentrado para fortalecimento e recuperação da barreira cutânea",
    price: "R$ 119,90",
    image: proskinCreme,
  },
];

// ============================================
// DERMO ESTETIC - Profissional
// ============================================

export const tulipiaDermoEstetic: Product[] = [
  {
    id: 7030,
    name: "Dermo Estetic Solução Ultraemoliente de Trietanolamina 500ml",
    brand: "Tulipia",
    category: "profissional",
    isProfessional: true,
    description: "Solução emoliente profissional para procedimentos estéticos. Amacia e prepara a pele",
    price: "R$ 127,14",
    image: dermoEsteticUltraemoliente,
  },
  {
    id: 7031,
    name: "Dermo Estetic Solução Pós Extração 50ml",
    brand: "Tulipia",
    category: "profissional",
    isProfessional: true,
    description: "Solução calmante e antisséptica para uso após procedimentos de extração",
    price: "R$ 100,00",
    image: dermoEsteticPosExtracao,
  },
];

// ============================================
// MÁSCARAS
// ============================================

export const tulipiaMascaras: Product[] = [
  {
    id: 7040,
    name: "Outono Mask Nano Máscara Reequilibrante 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara facial com tecnologia nano para reequilíbrio da pele. Ideal para peles mistas",
    price: "R$ 141,43",
    image: outonoMaskImg,
  },
  {
    id: 7041,
    name: "Verão Mask Nano Máscara Energizante 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara energizante com vitaminas e antioxidantes. Revitaliza peles cansadas",
    price: "R$ 141,43",
    image: veraoMaskImg,
  },
  {
    id: 7042,
    name: "Inverno Mask Nano Máscara Hidronutritiva 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara ultra-hidratante para peles ressecadas. Nutrição profunda",
    price: "R$ 141,43",
    image: invernoMaskImg,
  },
  {
    id: 7043,
    name: "Primavera Mask Nano Máscara Renovadora 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Máscara renovadora com tecnologia nano. Promove renovação celular intensa e luminosidade",
    price: "Consultar",
    image: primaveraMaskImg,
  },
  {
    id: 7044,
    name: "Stellar Mask Enzimática 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara com enzimas naturais para esfoliação suave e renovação celular",
    price: "R$ 185,57",
    image: stellarMaskEnzimaticaImg,
  },
  {
    id: 7045,
    name: "Stellar Mask Matificante 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara matificante para controle de oleosidade. Reduz brilho excessivo",
    price: "R$ 185,57",
    image: stellarMaskMatificanteImg,
  },
  {
    id: 7046,
    name: "Stellar Mask Rejuvenescedora 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara anti-idade com peptídeos para firmeza e redução de rugas",
    price: "R$ 185,57",
    image: stellarMaskRejuvenescedoraImg,
  },
  {
    id: 7047,
    name: "Stellar Mask Hidronutritiva 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara nutritiva para hidratação profunda e recuperação da pele",
    price: "R$ 185,57",
    image: stellarMaskHidronutritivaImg,
  },
  {
    id: 7048,
    name: "Chokola Máscara de Chocolate 200g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara antioxidante de chocolate. Rica em flavonoides para proteção da pele",
    price: "R$ 157,00",
    image: chokolaMascaraImg,
  },
  {
    id: 7049,
    name: "Ultimate Estetic+ Nano Máscara Tensora de Ouro 250g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Máscara tensora com partículas de ouro. Efeito lifting imediato e rejuvenescedor",
    price: "R$ 140,00",
    image: ultimateEsteticMascaraImg,
  },
  {
    id: 7050,
    name: "Marezi Nano Máscara Hidrocalmante 200g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara calmante para peles sensíveis e irritadas. Reduz vermelhidão",
    price: "R$ 141,43",
    image: placeholder,
  },
];

// ============================================
// NIACINE+ - Linha Niacinamida
// ============================================

export const tulipiaNiacine: Product[] = [
  {
    id: 7060,
    name: "Niacine+ Sérum de Niacinamida 30ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum concentrado de niacinamida para controle de oleosidade, redução de poros e uniformização",
    price: "R$ 139,00",
    image: niacineSerum,
  },
];

// ============================================
// DERMACOS - Anti-idade
// ============================================

export const tulipiaDermacos: Product[] = [
  {
    id: 7070,
    name: "Dermacos Booster Rejuvenescedor 30ml",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Booster potencializador de tratamentos anti-idade. Intensifica resultados",
    price: "R$ 199,00",
    image: dermacosBooster,
  },
  {
    id: 7071,
    name: "Dermacos Espuma de Limpeza Rejuvenescedora 150ml",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Espuma de limpeza com ativos anti-idade. Limpa e trata simultaneamente",
    price: "R$ 120,00",
    image: dermacosEspuma,
  },
];

// ============================================
// IMMORTALITE-C - Vitamina C
// ============================================

export const tulipiaImmortaliteC: Product[] = [
  {
    id: 7080,
    name: "Immortalite-C Nano Sérum de Vitamina C 50ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sérum potente de vitamina C estabilizada. Antioxidante e clareador",
    price: "R$ 159,00",
    image: immortaliteCSerum,
  },
];

// ============================================
// HYDROGEN - Hidrogênio Molecular
// ============================================

export const tulipiaHydrogen: Product[] = [
  {
    id: 7090,
    name: "Hydrogen Bruma de Hidrogênio Molecular 50ml",
    brand: "Tulipia",
    category: "antioxidante",
    isProfessional: false,
    description: "Bruma facial com hidrogênio molecular. Potente antioxidante para proteção celular",
    price: "R$ 109,00",
    image: hydrogenBruma,
  },
];

// ============================================
// FIRM FLACCID - Firmeza
// ============================================

export const tulipiaFirmFlaccid: Product[] = [
  {
    id: 7100,
    name: "Firm Flaccid Nano Fluido Remineralizante 300ml",
    brand: "Tulipia",
    category: "firmeza",
    isProfessional: false,
    description: "Fluido corporal para firmeza e combate à flacidez. Rico em minerais",
    price: "R$ 169,00",
    image: firmFlaccid300ml,
  },
  {
    id: 7101,
    name: "Firm Flaccid Nano Fluido Remineralizante 60ml",
    brand: "Tulipia",
    category: "firmeza",
    isProfessional: false,
    description: "Fluido corporal para firmeza - versão facial/travel size",
    price: "R$ 69,00",
    image: firmFlaccid60ml,
  },
];

// ============================================
// LIFE C+ - Vitamina C
// ============================================

export const tulipiaLifeC: Product[] = [
  {
    id: 7110,
    name: "Life C+ Nano Sabonete Mousse Home Care 150ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sabonete mousse com vitamina C nano encapsulada. Limpa suavemente enquanto ilumina",
    price: "R$ 119,00",
    image: lifeCsaboneteMouseImg,
  },
  {
    id: 7111,
    name: "Life C+ Nano Máscara Iluminadora 150g",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Máscara facial com vitamina C para iluminação e uniformização do tom",
    price: "R$ 180,00",
    image: lifeCMascaraImg,
  },
  {
    id: 7112,
    name: "Life C+ Nano Peeling Abrasivo C 150g",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: true,
    description: "Peeling físico com vitamina C para renovação celular e luminosidade",
    price: "R$ 170,00",
    image: lifeCPeelingImg,
  },
  {
    id: 7113,
    name: "Life C+ Nano Sérum Clareador 20% 30ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sérum clareador com 20% de vitamina C estabilizada. Potente ação antioxidante",
    price: "R$ 212,86",
    image: lifeCSerum20Img,
  },
  {
    id: 7114,
    name: "Life C+ Monodose Clareadora de Vitamina C 4ml (5 amp)",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: true,
    description: "Ampolas de vitamina C pura para uso profissional. Máxima potência e eficácia",
    price: "R$ 257,00",
    image: lifeCMonodoseImg,
  },
  {
    id: 7115,
    name: "Life C+ Nano Tônico 110ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Tônico facial com vitamina C para preparação e potencialização de tratamentos",
    price: "R$ 89,00",
    image: lifeCTonicoImg,
  },
];

// ============================================
// SWEET LIPS - Cuidado Labial
// ============================================

export const tulipiaSweetLips: Product[] = [
  {
    id: 7120,
    name: "Sweet Lips Esfoliante Labial Cereja",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Esfoliante labial com microesferas de cereja. Remove células mortas e prepara os lábios",
    price: "R$ 49,00",
    image: sweetLipsEsfolianteImg,
  },
  {
    id: 7121,
    name: "Sweet Lips Esfoliante Labial Tutti Frutti 15g",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Esfoliante labial sabor tutti frutti. Remove células mortas e suaviza os lábios",
    price: "R$ 79,00",
    image: sweetLipsEsfolianteImg,
  },
  {
    id: 7122,
    name: "Sweet Lips Gloss Labial Cereja 10g",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Gloss hidratante sabor cereja. Hidrata e dá brilho natural aos lábios",
    price: "R$ 69,00",
    image: sweetLipsGlossImg,
  },
  {
    id: 7123,
    name: "Sweet Lips Gloss Labial Tutti Frutti 10g",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Gloss hidratante sabor tutti frutti. Hidrata e dá brilho natural",
    price: "R$ 69,00",
    image: sweetLipsGlossImg,
  },
  {
    id: 7124,
    name: "Sweet Lips Fluido Microagulhamento Labial",
    brand: "Tulipia",
    category: "labial",
    isProfessional: true,
    description: "Fluido para microagulhamento labial profissional. Estimula colágeno e volume natural",
    price: "Consultar",
    image: sweetLipsFluido,
  },
  {
    id: 7125,
    name: "Sweet Lips Fluido Ultra Concentrado Labial 5ml (3 amp)",
    brand: "Tulipia",
    category: "labial",
    isProfessional: true,
    description: "Ampolas concentradas para tratamento labial profissional. Preenchimento e rejuvenescimento",
    price: "R$ 347,00",
    image: sweetLipsFluido,
  },
];

// ============================================
// HIDRASOL - Fotoprotetores
// ============================================

export const tulipiaHidrasol: Product[] = [
  {
    id: 7130,
    name: "Hidrasol Fotoprotetor Facial FPS 30 50g",
    brand: "Tulipia",
    category: "protetor-solar",
    isProfessional: false,
    description: "Fotoprotetor facial FPS 30 com textura leve. Proteção UVA/UVB",
    price: "R$ 119,00",
    image: placeholder,
  },
  {
    id: 7131,
    name: "Hidrasol Fotoprotetor Facial FPS 60 50g",
    brand: "Tulipia",
    category: "protetor-solar",
    isProfessional: false,
    description: "Fotoprotetor facial FPS 60 de alta proteção. Ideal para exposição intensa",
    price: "R$ 129,00",
    image: placeholder,
  },
];

// ============================================
// HIALUX - Ácido Hialurônico
// ============================================

export const tulipiaHialux: Product[] = [
  {
    id: 7140,
    name: "Hialux Sabonete Clareador 110ml",
    brand: "Tulipia",
    category: "acido-hialuronico",
    isProfessional: false,
    description: "Sabonete clareador com ácido hialurônico. Limpa e hidrata simultaneamente",
    price: "R$ 99,00",
    image: placeholder,
  },
  {
    id: 7141,
    name: "Hialux Sérum Preenchedor 30ml",
    brand: "Tulipia",
    category: "acido-hialuronico",
    isProfessional: false,
    description: "Sérum com ácido hialurônico de múltiplos pesos moleculares. Preenchimento e hidratação",
    price: "R$ 199,00",
    image: placeholder,
  },
  {
    id: 7142,
    name: "Hialux Creme Preenchedor 150g",
    brand: "Tulipia",
    category: "acido-hialuronico",
    isProfessional: false,
    description: "Creme facial com ácido hialurônico para preenchimento de linhas e rugas",
    price: "R$ 170,00",
    image: placeholder,
  },
];

// ============================================
// CLAREADORES
// ============================================

export const tulipiaClareadores: Product[] = [
  {
    id: 7150,
    name: "Citrogel Nano Gel Clareador da Pele 30g",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Gel clareador com tecnologia nano para tratamento de manchas localizadas",
    price: "R$ 149,00",
    image: placeholder,
  },
  {
    id: 7151,
    name: "Sepiwhite Gel Clareador 30g",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Gel clareador com Sepiwhite para uniformização e luminosidade da pele",
    price: "R$ 170,00",
    image: placeholder,
  },
];

// ============================================
// CILS & LASHES - Área dos Olhos
// ============================================

export const tulipiaCilsLashes: Product[] = [
  {
    id: 7160,
    name: "Cils & Lashes Sérum para Cílios e Sobrancelhas 8ml",
    brand: "Tulipia",
    category: "area-olhos",
    isProfessional: false,
    description: "Sérum fortalecedor e estimulante do crescimento de cílios e sobrancelhas",
    price: "R$ 109,00",
    image: placeholder,
  },
  {
    id: 7161,
    name: "Miracle Eyes Nano Gel Área dos Olhos",
    brand: "Tulipia",
    category: "area-olhos",
    isProfessional: false,
    description: "Gel com tecnologia nano para área dos olhos. Reduz olheiras, bolsas e linhas",
    price: "R$ 129,00",
    image: miracleEyes,
  },
];

// ============================================
// CORPORAL PROFISSIONAL
// ============================================

export const tulipiaCorporalPro: Product[] = [
  {
    id: 7170,
    name: "Corpus Máscara de Argila Amarela e Colágeno 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Máscara corporal de argila amarela com colágeno. Para firmeza e nutrição",
    price: "R$ 199,00",
    image: placeholder,
  },
  {
    id: 7171,
    name: "Elegance Body Nano Spray Lipotérmico 5 em 1 300ml",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Spray lipotérmico multifuncional. Aquece, tonifica e potencializa tratamentos",
    price: "R$ 212,86",
    image: placeholder,
  },
  {
    id: 7172,
    name: "Elegance Nano Dual-Peeling Esfoliante 500g",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Esfoliante corporal dual-action para renovação e preparo da pele",
    price: "R$ 212,86",
    image: placeholder,
  },
];

// ============================================
// FLORATY - Limpeza de Pele Profissional
// ============================================

export const tulipiaFloraty: Product[] = [
  {
    id: 7180,
    name: "Floraty Loção Amolecedora de Cravos 500ml",
    brand: "Tulipia",
    category: "limpeza-pele",
    isProfessional: true,
    description: "Loção profissional para amolecimento de cravos. Facilita a extração",
    price: "R$ 141,43",
    image: placeholder,
  },
  {
    id: 7181,
    name: "Floraty Creme Esfoliante Apricot 200g",
    brand: "Tulipia",
    category: "limpeza-pele",
    isProfessional: true,
    description: "Creme esfoliante com partículas de apricot. Renovação suave e eficaz",
    price: "R$ 141,43",
    image: placeholder,
  },
  {
    id: 7182,
    name: "Floraty Creme Emoliente para Cravos 200g",
    brand: "Tulipia",
    category: "limpeza-pele",
    isProfessional: true,
    description: "Creme emoliente para preparo da pele antes da extração de cravos",
    price: "R$ 141,43",
    image: placeholder,
  },
];

// ============================================
// MAREZI - Peles Sensíveis
// ============================================

export const tulipiaMarezi: Product[] = [
  {
    id: 7190,
    name: "Marezi Nano Sabonete Hidratante 300ml",
    brand: "Tulipia",
    category: "pele-sensivel",
    isProfessional: true,
    description: "Sabonete hidratante suave para peles sensíveis e reativas",
    price: "R$ 141,43",
    image: placeholder,
  },
  {
    id: 7191,
    name: "Marezi Nano Loção Tônica Remineralizante 110ml",
    brand: "Tulipia",
    category: "pele-sensivel",
    isProfessional: false,
    description: "Loção tônica com minerais para fortalecimento de peles sensíveis",
    price: "R$ 79,00",
    image: placeholder,
  },
];

// ============================================
// CITRATA - Pele Oleosa
// ============================================

export const tulipiaCitrata: Product[] = [
  {
    id: 7200,
    name: "Citrata Nano Loção Tônica Adstringente 110ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: false,
    description: "Loção tônica adstringente para controle de oleosidade e fechamento de poros",
    price: "R$ 70,00",
    image: placeholder,
  },
  {
    id: 7201,
    name: "Citrata Nano Loção Tônica Adstringente 300ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: true,
    description: "Loção tônica adstringente - versão profissional",
    price: "R$ 129,00",
    image: placeholder,
  },
  {
    id: 7202,
    name: "Citrata Nano Sabonete Equilibrante 110ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: false,
    description: "Sabonete equilibrante para peles oleosas. Controla sem ressecar",
    price: "R$ 70,00",
    image: placeholder,
  },
  {
    id: 7203,
    name: "Citrata Nano Sabonete Equilibrante 300ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: true,
    description: "Sabonete equilibrante - versão profissional",
    price: "R$ 129,00",
    image: placeholder,
  },
];

// ============================================
// SÉRUNS
// ============================================

export const tulipiaSeruns: Product[] = [
  {
    id: 7210,
    name: "Age-Matte Sérum Antioleosidade 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum matificante para controle de oleosidade com efeito anti-idade",
    price: "R$ 149,00",
    image: placeholder,
  },
  {
    id: 7211,
    name: "Dermacoll Sérum Firmador de Colágeno 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum firmador com colágeno bioativo para combate à flacidez",
    price: "R$ 149,00",
    image: placeholder,
  },
  {
    id: 7212,
    name: "Miracle 4D Nano Sérum Multifuncional 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum 4 em 1: hidrata, firma, clareia e protege. Tecnologia nano",
    price: "R$ 169,00",
    image: placeholder,
  },
  {
    id: 7213,
    name: "Oligo-Nerox Nano Sérum Antirrugas 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum antirrugas com oligoelementos. Suaviza linhas de expressão",
    price: "R$ 169,00",
    image: placeholder,
  },
  {
    id: 7214,
    name: "Resilience Sérum Multirreparador Calmante 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum calmante e reparador para peles sensibilizadas e pós-procedimentos",
    price: "R$ 129,00",
    image: resilienceSerum,
  },
];

// ============================================
// KINELYN - Antiacne
// ============================================

export const tulipiaKinelyn: Product[] = [
  {
    id: 7220,
    name: "Kinelyn Nano Gel Seborregulador 30g",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Gel regulador de sebo para controle da acne e oleosidade",
    price: "R$ 99,00",
    image: placeholder,
  },
  {
    id: 7221,
    name: "Kinelyn Nano Loção Ultrassecativa 60ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Loção secativa para tratamento de acne ativa. Reduz inflamação",
    price: "R$ 99,00",
    image: placeholder,
  },
  {
    id: 7222,
    name: "Kinelyn Nano Máscara Ultrassecativa 200g",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Máscara secativa para tratamento intensivo de acne e oleosidade",
    price: "R$ 157,00",
    image: placeholder,
  },
  {
    id: 7223,
    name: "Kinelyn Sabonete Seborregulador 110ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Sabonete para peles acneicas. Limpa profundamente e controla oleosidade",
    price: "R$ 99,00",
    image: placeholder,
  },
  {
    id: 7224,
    name: "Kinelyn Sabonete Seborregulador 230ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: true,
    description: "Sabonete seborregulador - versão profissional",
    price: "R$ 170,00",
    image: placeholder,
  },
  {
    id: 7225,
    name: "Kinelyn Loção Ultrassecativa FPS30 Tonalizante 50ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Loção secativa com proteção solar e cobertura tonalizante. Trata e disfarça",
    price: "R$ 149,90",
    image: placeholder,
  },
];

// ============================================
// BODY HD - Corporal
// ============================================

export const tulipiaBodyHD: Product[] = [
  {
    id: 7230,
    name: "Body HD Creme de Massagem Redutor 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Creme redutor para massagem modeladora. Auxilia na redução de medidas",
    price: "R$ 185,57",
    image: placeholder,
  },
  {
    id: 7231,
    name: "Body HD Gel Hiperemiante 500g",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Gel hiperemiante para aquecimento da pele. Potencializa tratamentos corporais",
    price: "R$ 157,00",
    image: placeholder,
  },
  {
    id: 7232,
    name: "Body HD Goma Esfoliante 500g",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Goma esfoliante corporal para renovação celular e preparo da pele",
    price: "R$ 157,00",
    image: placeholder,
  },
  {
    id: 7233,
    name: "Body HD Gel Crioterápico 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Gel crioterápico para tratamentos de celulite e gordura localizada",
    price: "R$ 199,00",
    image: placeholder,
  },
  {
    id: 7234,
    name: "Body HD Creme de Massagem Neutro 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Creme de massagem neutro para uso profissional. Base para associações",
    price: "R$ 141,43",
    image: placeholder,
  },
];

// ============================================
// MOOVY - Corporal Ozonizado
// ============================================

export const tulipiaMoovy: Product[] = [
  {
    id: 7240,
    name: "Moovy Creme de Massagem Ozonizado 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Creme de massagem com ozônio. Oxigena e revitaliza a pele",
    price: "R$ 199,00",
    image: placeholder,
  },
];

// ============================================
// TRICO GENETICIST - Capilar
// ============================================

export const tulipiaTricoGeneticist: Product[] = [
  {
    id: 7250,
    name: "Trico Geneticist Tônico Capilar Antiqueda 110ml",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Tônico capilar para prevenção e tratamento de queda de cabelos",
    price: "R$ 159,00",
    image: placeholder,
  },
  {
    id: 7251,
    name: "Trico Geneticist Shampoo Esfoliante 250ml",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Shampoo esfoliante para limpeza profunda do couro cabeludo",
    price: "R$ 141,43",
    image: placeholder,
  },
  {
    id: 7252,
    name: "Trico Geneticist Shampoo Revitalizante 250ml",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Shampoo revitalizante para cabelos fracos e danificados",
    price: "R$ 129,00",
    image: placeholder,
  },
  {
    id: 7253,
    name: "Trico Geneticist Nano Plasma Capilar 4ml (5 amp)",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: true,
    description: "Ampolas de plasma capilar para tratamento intensivo de queda",
    price: "R$ 227,14",
    image: placeholder,
  },
  {
    id: 7254,
    name: "Trico Geneticist Nano Máscara Regeneradora 200g",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Máscara regeneradora para recuperação de fios danificados",
    price: "R$ 141,43",
    image: placeholder,
  },
];

// ============================================
// DERMO GENETICIST C+ - Microagulhamento
// ============================================

export const tulipiaDermoGeneticist: Product[] = [
  {
    id: 7260,
    name: "Dermo Geneticist C+ Supreme Formula 4ml (5 amp)",
    brand: "Tulipia",
    category: "microagulhamento",
    isProfessional: true,
    description: "Ampolas para microagulhamento com vitamina C e ativos regeneradores",
    price: "R$ 285,57",
    image: placeholder,
  },
];

// ============================================
// CALMSKIN - Calmante
// ============================================

export const tulipiaCalmskin: Product[] = [
  {
    id: 7270,
    name: "Calmskin Pomada Multirreparadora 30g",
    brand: "Tulipia",
    category: "calmante",
    isProfessional: false,
    description: "Pomada multiuso para reparação de peles irritadas e pós-procedimentos",
    price: "R$ 69,00",
    image: placeholder,
  },
];

// ============================================
// OCEANOX - Magnésio
// ============================================

export const tulipiaOceanox: Product[] = [
  {
    id: 7280,
    name: "Oceanox Flocos de Magnésio Dérmico (3 x 50g)",
    brand: "Tulipia",
    category: "minerais",
    isProfessional: false,
    description: "Flocos de magnésio para banho ou uso tópico. Relaxante muscular e calmante",
    price: "R$ 127,14",
    image: placeholder,
  },
];

// ============================================
// ESSENCE - Limpeza
// ============================================

export const tulipiaEssence: Product[] = [
  {
    id: 7290,
    name: "Essence Cleansing Oil 150ml",
    brand: "Tulipia",
    category: "limpeza",
    isProfessional: false,
    description: "Óleo de limpeza para remoção de maquiagem e impurezas. Limpa sem agredir",
    price: "R$ 150,00",
    image: placeholder,
  },
];

// ============================================
// ANTI-IDADE (existentes atualizados)
// ============================================

export const tulipiaAntiIdade: Product[] = [
  {
    id: 7300,
    name: "Renotrat Gel Facial com DMAE",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Gel facial com DMAE para efeito tensor imediato. Firma e rejuvenesce a pele",
    price: "R$ 149,00",
    image: renotratGel,
  },
  {
    id: 7301,
    name: "Resilience Nano Sérum Dermoprotetor",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Sérum dermoprotetor com tecnologia nano. Fortalece a barreira cutânea",
    price: "R$ 189,00",
    image: resilienceSerum,
  },
];

// ============================================
// KITS TULIPIA
// ============================================

export const tulipiaKits: Product[] = [
  {
    id: 7400,
    name: "Kit Stellar Mask Completo",
    brand: "Tulipia",
    category: "kit",
    isProfessional: false,
    description: "Kit com 4 máscaras Stellar: Enzimática, Matificante, Rejuvenescedora e Hidronutritiva",
    price: "R$ 649,00",
    image: placeholder,
  },
  {
    id: 7401,
    name: "Kit Sweet Lips Completo",
    brand: "Tulipia",
    category: "kit",
    isProfessional: false,
    description: "Kit labial com esfoliante e gloss. Cuidado completo para os lábios",
    price: "R$ 139,00",
    image: placeholder,
  },
  {
    id: 7402,
    name: "Kit Life C+ Home Care",
    brand: "Tulipia",
    category: "kit",
    isProfessional: false,
    description: "Kit de vitamina C com sabonete, tônico e sérum para uso diário",
    price: "R$ 389,00",
    image: placeholder,
  },
  {
    id: 7403,
    name: "Kit Kinelyn Antiacne",
    brand: "Tulipia",
    category: "kit",
    isProfessional: false,
    description: "Kit completo para tratamento de acne: sabonete, loção e gel seborregulador",
    price: "R$ 269,00",
    image: placeholder,
  },
];

// ============================================
// EXPORTAÇÃO DE TODOS OS PRODUTOS TULIPIA
// ============================================

export const allTulipiaWithImages: Product[] = [
  ...tulipiaLancamentos,
  ...tulipiaBlackSecret,
  ...tulipiaProskinRepair,
  ...tulipiaDermoEstetic,
  ...tulipiaMascaras,
  ...tulipiaNiacine,
  ...tulipiaDermacos,
  ...tulipiaImmortaliteC,
  ...tulipiaHydrogen,
  ...tulipiaFirmFlaccid,
  ...tulipiaLifeC,
  ...tulipiaSweetLips,
  ...tulipiaHidrasol,
  ...tulipiaHialux,
  ...tulipiaClareadores,
  ...tulipiaCilsLashes,
  ...tulipiaCorporalPro,
  ...tulipiaFloraty,
  ...tulipiaMarezi,
  ...tulipiaCitrata,
  ...tulipiaSeruns,
  ...tulipiaKinelyn,
  ...tulipiaBodyHD,
  ...tulipiaMoovy,
  ...tulipiaTricoGeneticist,
  ...tulipiaDermoGeneticist,
  ...tulipiaCalmskin,
  ...tulipiaOceanox,
  ...tulipiaEssence,
  ...tulipiaAntiIdade,
  ...tulipiaKits,
];

// Categorias disponíveis para filtros
export const tulipiaCategories = [
  { id: "lancamentos", label: "Lançamentos", count: tulipiaLancamentos.length },
  { id: "clareamento", label: "Clareamento", count: tulipiaBlackSecret.length + tulipiaClareadores.length },
  { id: "barreira-cutanea", label: "Barreira Cutânea", count: tulipiaProskinRepair.length },
  { id: "mascara", label: "Máscaras", count: tulipiaMascaras.length },
  { id: "vitamina-c", label: "Vitamina C", count: tulipiaLifeC.length + tulipiaImmortaliteC.length },
  { id: "labial", label: "Cuidado Labial", count: tulipiaSweetLips.length },
  { id: "serum", label: "Séruns", count: tulipiaSeruns.length + tulipiaNiacine.length },
  { id: "anti-idade", label: "Anti-idade", count: tulipiaAntiIdade.length + tulipiaDermacos.length },
  { id: "antiacne", label: "Antiacne", count: tulipiaKinelyn.length },
  { id: "acido-hialuronico", label: "Ácido Hialurônico", count: tulipiaHialux.length },
  { id: "protetor-solar", label: "Proteção Solar", count: tulipiaHidrasol.length },
  { id: "area-olhos", label: "Área dos Olhos", count: tulipiaCilsLashes.length },
  { id: "corporal", label: "Corporal", count: tulipiaBodyHD.length + tulipiaCorporalPro.length + tulipiaMoovy.length },
  { id: "capilar", label: "Capilar", count: tulipiaTricoGeneticist.length },
  { id: "pele-oleosa", label: "Pele Oleosa", count: tulipiaCitrata.length },
  { id: "pele-sensivel", label: "Pele Sensível", count: tulipiaMarezi.length },
  { id: "profissional", label: "Profissional", count: tulipiaDermoEstetic.length + tulipiaFloraty.length },
  { id: "kit", label: "Kits", count: tulipiaKits.length },
];
